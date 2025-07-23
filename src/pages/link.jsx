/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import { storeApp } from "../config/firebase";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import logo404 from '../assets/404.svg';

// --- COMPONENTES DE RENDERIZAÇÃO (IDÊNTICOS AO STRUCTURE.JSX) ---

const ProjectListItem = ({ item }) => (
  <div className="mb-4 break-inside-avoid">
    <div className="flex items-center gap-4">
      <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">{item.name}</h4>
      {item.link && (
        <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:underline">
          Ver Projeto <i className="bi bi-box-arrow-up-right text-xs"></i>
        </a>
      )}
    </div>
    {item.description && <p className="mt-1 text-gray-700 dark:text-gray-300">{item.description}</p>}
  </div>
);

const StructuredListItem = ({ item }) => (
  <div className="mb-4 break-inside-avoid">
    <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">{item.title}</h4>
    <p className="font-semibold text-indigo-600 dark:text-indigo-400">{item.subtitle}</p>
    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
      <span>{item.period}</span>
      {item.location && <span> &middot; {item.location}</span>}
    </div>
    {item.description && <p className="mt-2 text-gray-700 dark:text-gray-300">{item.description}</p>}
  </div>
);

const RenderListSection = ({ title, items, isGrid, isStructured, isProject }) => {
  if (!items || items.length === 0 || items.every(item => !item)) return null;
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-200 dark:border-indigo-800 pb-2 mb-4">{title}</h3>
      {isProject ? (
        <div className="space-y-4">{items.map((item, index) => item.name && <ProjectListItem key={index} item={item} />)}</div>
      ) : isStructured ? (
        <div className="space-y-4">{items.map((item, index) => item.title && <StructuredListItem key={index} item={item} />)}</div>
      ) : title === "Links" ? (
        <div className="space-y-2">{items.map((item, index) => item && (<a href={item} target="_blank" rel="noopener noreferrer" key={index} className="flex items-center text-gray-700 dark:text-gray-300 hover:text-indigo-500 transition-colors group"> <i className="bi bi-link-45deg mr-3 text-indigo-500"></i> <span className="group-hover:underline break-words">{item}</span> </a>))}</div>
      ) : isGrid ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3">{items.map((item, index) => item && (<div key={index} className="flex items-center bg-indigo-50 dark:bg-gray-700 p-2 rounded-lg"> <i className="bi bi-check-circle-fill text-indigo-500 mr-3"></i> <p className="flex-1 text-gray-800 dark:text-gray-200">{item}</p> </div>))}</div>
      ) : (
        <ul className="list-disc pl-5 space-y-2">{items.map((item, index) => item && (<li key={index} className="text-gray-700 dark:text-gray-300">{item}</li>))}</ul>
      )}
    </div>
  );
};

const RenderTextSection = ({ title, content }) => {
  if (!content) return null;
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-200 dark:border-indigo-800 pb-2 mb-4">{title}</h3>
      <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{content}</p>
    </div>
  );
};

export const Link = () => {
  const [dataBase, setDataBase] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const { uid } = useParams();

  useEffect(() => {
    const getDataBase = async () => {
      if (!uid) { setError(true); setLoading(false); return; }
      try {
        const docRef = doc(storeApp, "profiles", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setDataBase(docSnap.data());
        } else {
          setError(true);
        }
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getDataBase();
  }, [uid]);

  const clipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setMessage("Copiado para a área de transferência!");
    setTimeout(() => setMessage(null), 2500);
  };

  const personalInfo = [
    { icon: 'bi-briefcase-fill', value: dataBase?.func },
    { icon: 'bi-telephone-fill', value: dataBase?.number },
    { icon: 'bi-envelope-fill', value: dataBase?.emailData },
    { icon: 'bi-geo-alt-fill', value: dataBase?.address }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <span className="loader animate-spin border-4 border-t-indigo-500 rounded-full w-12 h-12 inline-block"></span>
          <h2 className="mt-4 text-xl text-gray-700 dark:text-gray-300">Carregando currículo...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-center p-4">
        <img className="w-64 mb-6" src={logo404} alt="Não encontrado" />
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Perfil não encontrado</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">O link que você tentou acessar não existe ou foi removido.</p>
        <button onClick={() => navigate('/')} className="cursor-pointer mt-6 px-6 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors">
          Voltar ao Início
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 py-10 pb-28 print:bg-white print:py-0 print:pb-0">
      {message && <div className="fixed top-5 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white bg-green-500 print:hidden">{message}</div>}
      <style>{`@media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } .print-container { box-shadow: none !important; margin: 0 !important; } .break-inside-avoid { break-inside: avoid; } }`}</style>

      <main className="print-container container mx-auto max-w-4xl bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-10">
        <header className="flex flex-col sm:flex-row items-center space-y-5 sm:space-y-0 sm:space-x-8 mb-10">
          {dataBase.photoLink && <img className="w-32 h-32 rounded-full object-cover ring-4 ring-offset-4 ring-offset-gray-100 dark:ring-offset-gray-900 ring-indigo-500" src={dataBase.photoLink} alt="Foto de perfil" />}
          <div className="text-center sm:text-left">
            <h2 className="text-4xl font-extrabold text-gray-800 dark:text-white">{dataBase.fullName}</h2>
            <div className="mt-3 space-y-1">
              {personalInfo.map(({ icon, value }) => value && (
                <p key={icon} className="text-gray-600 dark:text-gray-400 flex items-center justify-center sm:justify-start gap-3">
                  <i className={`${icon} text-indigo-500`}></i> <span>{value}</span>
                </p>
              ))}
            </div>
          </div>
        </header>

        <div className="data-container">
          <RenderTextSection title="Resumo" content={dataBase.resume} />
          <RenderListSection title="Experiência" items={dataBase.experiences} isStructured={true} />
          <RenderListSection title="Formação" items={dataBase.formations} isStructured={true} />
          <RenderListSection title="Projetos" items={dataBase.projects} isProject={true} />
          <RenderListSection title="Links" items={dataBase.links} />
          <RenderListSection title="Competências" items={dataBase.skills} isGrid={true} />
          <RenderListSection title="Idiomas" items={dataBase.languages} isGrid={true} />
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 p-3 shadow-t-lg print:hidden">
        <div className="container mx-auto flex items-center justify-center gap-4">
          <button onClick={() => navigate('/')} className="cursor-pointer px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"><i className="bi bi-box-arrow-up-left"></i> <span className="hidden sm:inline">Criar o seu</span></button>
          <button onClick={clipboard} className="cursor-pointer px-4 py-2 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 transition-colors flex items-center gap-2"><i className="bi bi-copy"></i> <span className="hidden sm:inline">Copiar Link</span></button>
          <button onClick={() => window.print()} className="cursor-pointer px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"><i className="bi bi-cloud-arrow-down"></i> <span className="hidden sm:inline">Download</span></button>
        </div>
      </div>
    </div>
  );
};