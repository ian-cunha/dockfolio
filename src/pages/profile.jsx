/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { auth, storeApp } from "../config/firebase";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfile as updateAuthProfile } from "firebase/auth";
import { NavBar } from "../components/navbar";
import { doc, updateDoc, setDoc, getDoc } from "firebase/firestore";

// Hook customizado para "debounce" (atrasar a execução de uma função)
const useDebounce = (callback, delay) => {
  const [timer, setTimer] = useState(null);
  return (...args) => {
    clearTimeout(timer);
    setTimer(setTimeout(() => callback(...args), delay));
  };
};

// Componente de Input Genérico
const FormInput = ({ value, onChange, placeholder, type = "text" }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors cursor-pointer"
  />
);

// Componente de Textarea
const FormTextarea = ({ value, onChange, placeholder }) => (
  <textarea
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    rows="4"
    className="w-full px-4 py-2 mt-4 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors cursor-pointer"
  />
);

// Componente para Seção Dinâmica (Links, Competências, etc.)
const DynamicSection = ({ title, items, field, onUpdate, placeholder }) => (
  <div className="p-6 border-t border-gray-200 dark:border-gray-700">
    <label className="text-xl font-semibold mb-3 block">{title}</label>
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <input className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer" type="text" value={item} placeholder={placeholder}
            onChange={(e) => { const newItems = [...items]; newItems[index] = e.target.value; onUpdate(field, newItems); }} />
          <button type="button" onClick={() => onUpdate(field, items.filter((_, i) => i !== index))} className="cursor-pointer px-3 py-1 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"><i className="bi bi-trash"></i></button>
        </div>
      ))}
      <button type="button" onClick={() => onUpdate(field, [...items, ''])} className="cursor-pointer mt-2 px-4 py-2 text-sm text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 transition-colors"><i className="bi bi-plus-circle mr-2"></i>Adicionar {title.slice(0, -1)}</button>
    </div>
  </div>
);

// Componente para Seções Estruturadas (Experiências, Formações)
const StructuredSection = ({ title, items, field, onUpdate }) => {
  const newItem = { title: "", subtitle: "", period: "", location: "", description: "" };

  const handleItemChange = (index, itemField, value) => {
    const newItems = [...items];
    newItems[index][itemField] = value;
    onUpdate(field, newItems);
  };

  return (
    <div className="p-6 border-t border-gray-200 dark:border-gray-700">
      <label className="text-xl font-semibold mb-3 block">{title}</label>
      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={index} className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border dark:border-gray-600 relative">
            <button type="button" onClick={() => onUpdate(field, items.filter((_, i) => i !== index))} className="cursor-pointer absolute -top-3 -right-3 w-8 h-8 text-white bg-red-500 rounded-full hover:bg-red-600 transition-colors flex items-center justify-center">&times;</button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput value={item.title} onChange={(e) => handleItemChange(index, 'title', e.target.value)} placeholder={field === 'experiences' ? "Cargo (ex: Desenvolvedor)" : "Curso (ex: Ciência da Computação)"} />
              <FormInput value={item.subtitle} onChange={(e) => handleItemChange(index, 'subtitle', e.target.value)} placeholder={field === 'experiences' ? "Empresa (ex: Dockfolio)" : "Instituição (ex: Universidade)"} />
              <FormInput value={item.period} onChange={(e) => handleItemChange(index, 'period', e.target.value)} placeholder="Período (ex: 2020 - 2024)" />
              <FormInput value={item.location} onChange={(e) => handleItemChange(index, 'location', e.target.value)} placeholder="Localização (ex: Recife, PE)" />
            </div>
            <FormTextarea value={item.description} onChange={(e) => handleItemChange(index, 'description', e.target.value)} placeholder="Descrição das suas atividades e responsabilidades..." />
          </div>
        ))}
        <button type="button" onClick={() => onUpdate(field, [...items, newItem])} className="cursor-pointer mt-2 px-4 py-2 text-sm text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 transition-colors"><i className="bi bi-plus-circle mr-2"></i>Adicionar {title.slice(0, -1)}</button>
      </div>
    </div>
  );
};

// Componente para Seção de Projetos
const ProjectsSection = ({ items, onUpdate }) => {
  const newItem = { name: "", link: "", description: "" };

  const handleItemChange = (index, itemField, value) => {
    const newItems = [...items];
    newItems[index][itemField] = value;
    onUpdate('projects', newItems);
  };

  return (
    <div className="p-6 border-t border-gray-200 dark:border-gray-700">
      <label className="text-xl font-semibold mb-3 block">Projetos</label>
      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={index} className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border dark:border-gray-600 relative">
            <button type="button" onClick={() => onUpdate('projects', items.filter((_, i) => i !== index))} className="cursor-pointer absolute -top-3 -right-3 w-8 h-8 text-white bg-red-500 rounded-full hover:bg-red-600 transition-colors flex items-center justify-center">&times;</button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput value={item.name} onChange={(e) => handleItemChange(index, 'name', e.target.value)} placeholder="Nome do Projeto (ex: Dockfolio)" />
              <FormInput value={item.link} onChange={(e) => handleItemChange(index, 'link', e.target.value)} placeholder="Link do Projeto (opcional)" />
            </div>
            <FormTextarea value={item.description} onChange={(e) => handleItemChange(index, 'description', e.target.value)} placeholder="Descrição do projeto, tecnologias utilizadas, etc." />
          </div>
        ))}
        <button type="button" onClick={() => onUpdate('projects', [...items, newItem])} className="cursor-pointer mt-2 px-4 py-2 text-sm text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 transition-colors"><i className="bi bi-plus-circle mr-2"></i>Adicionar Projeto</button>
      </div>
    </div>
  );
};

export const Profile = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const { email, uid } = user;

  const [profile, setProfile] = useState({
    displayName: user.displayName || "", fullName: "", photoLink: "", emailData: "", func: "", number: "", address: "", resume: "",
    links: [], projects: [], experiences: [], formations: [], skills: [], languages: []
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  const debouncedUpdate = useDebounce((field, value) => handleUpdate(field, value), 1500);

  const showMessage = (text, isError = false) => {
    setMessage({ text, isError });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleUpdate = async (field, value) => {
    try {
      if (field === 'displayName' && user.displayName !== value) {
        await updateAuthProfile(user, { displayName: value });
      }
      await updateDoc(doc(storeApp, "profiles", uid), { [field]: value });
      showMessage("Atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      showMessage("Erro ao salvar as alterações.", true);
    }
  };

  const handleFieldChange = (field, value) => {
    setProfile(p => ({ ...p, [field]: value }));
    debouncedUpdate(field, value);
  };

  useEffect(() => {
    const setupProfile = async () => {
      const docSnap = await getDoc(doc(storeApp, "profiles", uid));
      if (docSnap.exists()) {
        const data = docSnap.data();
        setProfile(p => ({
          ...p, ...data,
          links: data.links || [],
          projects: data.projects || [],
          experiences: data.experiences || [],
          formations: data.formations || [],
          skills: data.skills || [],
          languages: data.languages || [],
        }));
      } else if (!user.displayName) {
        await setDoc(doc(storeApp, "profiles", uid), profile);
        showMessage("Bem-vindo ao Dockfolio! Complete seu perfil.");
      }
      setLoading(false);
    };
    setupProfile();
  }, [uid, user.displayName]);

  const handlePhotoUpload = e => {
    const file = e.target.files[0];
    if (file && file.size < 2097152) { // Limite de 2MB para a foto
      const reader = new FileReader();
      reader.onloadend = () => handleFieldChange('photoLink', reader.result);
      reader.readAsDataURL(file);
    } else if (file) {
      showMessage("O arquivo de imagem é muito grande (máx 2MB).", true);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <span className="loader animate-spin border-4 border-t-indigo-500 rounded-full w-12 h-12 inline-block"></span>
        <h2 className="mt-4 text-xl text-gray-700 dark:text-gray-300">Carregando perfil...</h2>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen">
      <NavBar />

      {message && <div className={`fixed top-20 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white ${message.isError ? 'bg-red-500' : 'bg-green-500'}`}>{message.text}</div>}

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <header className="text-center mb-10">
            <h2 className="text-4xl font-bold">Configurações do Perfil</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Mantenha seus dados sempre atualizados para um currículo de sucesso.</p>
          </header>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <img className="w-32 h-32 rounded-full object-cover ring-4 ring-indigo-300 dark:ring-indigo-600" src={profile.photoLink || 'https://via.placeholder.com/150'} alt="Foto de perfil" />
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold">{profile.displayName || "Nome de Usuário"}</h3>
              <p className="text-gray-500 dark:text-gray-400">{email}</p>
              <div className="mt-3 flex gap-2 justify-center md:justify-start">
                <label htmlFor="photo-upload" className="cursor-pointer px-4 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors">
                  <i className="bi bi-upload mr-2"></i>{profile.photoLink ? 'Trocar Foto' : 'Enviar Foto'}
                </label>
                <input id="photo-upload" type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                {profile.photoLink && <button onClick={() => handleFieldChange('photoLink', '')} className="cursor-pointer px-4 py-2 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"><i className="bi bi-trash mr-2"></i>Remover</button>}
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-4">Dados Pessoais</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput value={profile.displayName} onChange={e => handleFieldChange('displayName', e.target.value)} placeholder="Nome de usuário (Obrigatório)" />
                <FormInput value={profile.fullName} onChange={e => handleFieldChange('fullName', e.target.value)} placeholder="Nome completo (para o CV)" />
                <FormInput value={profile.func} onChange={e => handleFieldChange('func', e.target.value)} placeholder="Sua função ou cargo" />
                <FormInput type="email" value={profile.emailData} onChange={e => handleFieldChange('emailData', e.target.value)} placeholder="E-mail de contato" />
                <FormInput type="tel" value={profile.number} onChange={e => handleFieldChange('number', e.target.value)} placeholder="Telefone de contato" />
                <FormInput value={profile.address} onChange={e => handleFieldChange('address', e.target.value)} placeholder="Cidade e Estado" />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-semibold mb-4">Resumo Profissional</h3>
              <FormTextarea value={profile.resume} onChange={e => handleFieldChange('resume', e.target.value)} placeholder="Fale um pouco sobre sua trajetória e objetivos." />
            </div>

            <StructuredSection title="Experiências" items={profile.experiences} field="experiences" onUpdate={handleFieldChange} />
            <StructuredSection title="Formações" items={profile.formations} field="formations" onUpdate={handleFieldChange} />
            <ProjectsSection items={profile.projects} onUpdate={handleFieldChange} />
            <DynamicSection title="Links" items={profile.links} field="links" onUpdate={handleFieldChange} placeholder="Ex: https://linkedin.com/in/seu-perfil" />
            <DynamicSection title="Competências" items={profile.skills} field="skills" onUpdate={handleFieldChange} placeholder="Ex: React.js" />
            <DynamicSection title="Idiomas" items={profile.languages} field="languages" onUpdate={handleFieldChange} placeholder="Ex: Inglês - Fluente" />
          </div>

          <div className="mt-8 text-center">
            <button className="cursor-pointer px-8 py-3 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors" onClick={() => navigate("/private")}>
              <i className="bi bi-arrow-left-circle mr-2"></i>Ver meu Currículo
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};