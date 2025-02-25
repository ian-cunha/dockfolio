/* eslint-disable react-hooks/exhaustive-deps */
import { auth, storeApp } from "../config/firebase"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { NavBar } from "../components/navbar";
import { doc, updateDoc, setDoc, getDoc } from "firebase/firestore";

export const Profile = () => {
  const sucessMsg = 'Atualizado com sucesso!';

  const [displayName, setDisplayName] = useState('');
  const [fullName, setFullName] = useState('');
  const [photoLink, setPhotoLink] = useState('');
  const [emailData, setEmailData] = useState('');
  const [func, setFunction] = useState('');
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');
  const [resume, setResume] = useState('');
  const [experience, setExperience] = useState('');
  const [experience2, setExperience2] = useState('');
  const [experience3, setExperience3] = useState('');
  const [experience4, setExperience4] = useState('');
  const [experience5, setExperience5] = useState('');
  const [formation, setFormation] = useState('');
  const [formation2, setFormation2] = useState('');
  const [formation3, setFormation3] = useState('');
  const [formation4, setFormation4] = useState('');
  const [formation5, setFormation5] = useState('');
  const [skill, setSkill] = useState('');
  const [skill2, setSkill2] = useState('');
  const [skill3, setSkill3] = useState('');
  const [skill4, setSkill4] = useState('');
  const [skill5, setSkill5] = useState('');
  const [language, setLanguage] = useState('');
  const [language2, setLanguage2] = useState('');
  const [language3, setLanguage3] = useState('');

  const [message, setMessage] = useState(true);

  const navigate = useNavigate();
  const user = auth.currentUser;
  const email = user.email;
  const name = user.displayName;
  const uid = user.uid;

  const handleUpdateName = async () => {
    try {
      await updateProfile(auth.currentUser, { displayName });
      setMessage(
        <div className="message">
          <p><i className="bi bi-patch-check"></i>{sucessMsg}</p>
        </div>
      );
      setTimeout(() => setMessage(false), 2000);
    } catch (error) {
      alert(error);
    }
  };
  
  const updateField = async (field, value) => {
    try {
      await updateDoc(doc(storeApp, "profiles", uid), { [field]: value });
      setMessage(
        <div className="message">
          <p><i className="bi bi-patch-check"></i>{sucessMsg}</p>
        </div>
      );
      setTimeout(() => setMessage(false), 2000);
    } catch (error) {
      alert(error);
    }
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoLink(reader.result);
        updateField('photoLink', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const [dataBase, setDataBase] = useState('');

  const getDataBase = async () => {
    const docRef = doc(storeApp, "profiles", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setDataBase(docSnap.data());
    } else {
      console.log("Sem dados!");
    }
  };

  const newUser = async () => {
    if (name === null) {
      await setDoc(doc(storeApp, "profiles", uid), {
        lastUpdate: new Date(),
        fullName: '',
        photoLink: '',
        resume: '',
        language: '',
        number: '',
        func: '',
        formation: '',
        experience: '',
        email: '',
        address: '',
        skill: '',
      });
      setMessage(
        <div className="message">
          <h2>Bem-vindo ao Dockfolio!</h2>
          <p className="messageWelcome">Adicone pelo menos seu apelido para liberar acesso ao aplicativo.</p>
        </div>
      );
      setTimeout(() => setMessage(false), 8000);
    }
  };

  useEffect(() => {
    getDataBase();
    newUser();
  }, []);

  return (
    <section>
      <NavBar />
      <div className="dockfolioPage">
        <h2>Configurações do perfil</h2>
        <div>
          {photoLink &&
            <img className="photo" width='150' src={photoLink} alt="Foto de perfil" />
          }
          <p className="name">{name}</p>
          <p className="email-top">Conta: {email}</p>
        </div>

        {message}

        <h2>Dados do perfil</h2>

        <div className="updateProfile">
          <form className="formData">
            <div className="areaStyle">
              <br />
              <label className="labelHome" htmlFor="name">Nome de usuário</label><br />
              <input
                className="inputProfile"
                type="name"
                id="name"
                defaultValue={name}
                placeholder="Nome do usuário (obrigatório)"
                onChange={(e) => setDisplayName(e.target.value)}
                onBlur={handleUpdateName}
              />
              <br />
            </div>
            <div className="areaStyle">
              <br />
              <label className="labelHome" htmlFor="fullName">Nome completo (CV)</label><br />
              <input
                className="inputProfile"
                type="name"
                id="fullName"
                defaultValue={dataBase.fullName}
                placeholder="Nome do usuário (obrigatório)"
                onChange={(e) => setFullName(e.target.value)}
                onBlur={() => updateField('fullName', fullName)}
              />
              <br />
            </div>
            <div className="areaStyle">
              <br />
              <label className="labelHome" htmlFor="photo">Foto</label><br />
              <input
                className="inputProfile"
                type="file"
                id="photo"
                accept="image/*"
                onChange={handlePhotoUpload}
              />
              <br />
            </div>
            <div className="areaStyle">
              <br />
              <label className="labelHome" htmlFor="function">Função</label><br />
              <input
                className="inputProfile"
                type="text"
                id="function"
                defaultValue={dataBase.func}
                placeholder="Função"
                onChange={(e) => setFunction(e.target.value)}
                onBlur={() => updateField('func', func)}
              />
              <br />
            </div>
            <div className="areaStyle">
              <br />
              <label className="labelHome" htmlFor="emailData">E-mail</label><br />
              <input
                className="inputProfile"
                type="email"
                id="emailData"
                defaultValue={dataBase.email}
                placeholder="E-mail"
                onChange={(e) => setEmailData(e.target.value)}
                onBlur={() => updateField('email', emailData)}
              />
              <br />
            </div>
            <div className="areaStyle">
              <br />
              <label className="labelHome" htmlFor="number">Número</label><br />
              <input
                className="inputProfile"
                type="tel"
                id="number"
                defaultValue={dataBase.number}
                placeholder="(99) 9999-9999"
                onChange={(e) => setNumber(e.target.value)}
                onBlur={() => updateField('number', number)}
              />
              <br />
            </div>
            <div className="areaStyle">
              <br />
              <label className="labelHome" htmlFor="address">Endereço</label><br />
              <input
                className="inputProfile"
                type="text"
                id="address"
                defaultValue={dataBase.address}
                placeholder="Endereço"
                onChange={(e) => setAddress(e.target.value)}
                onBlur={() => updateField('address', address)}
              />
              <br />
            </div>
            <div className="areaStyle">
              <br />
              <label className="labelHome" htmlFor="title">Resumo</label>
              <br />
              <textarea
                className="inputProfile"
                type="text"
                id="title"
                defaultValue={dataBase.resume}
                placeholder="Resumo"
                onChange={(e) => setResume(e.target.value)}
                onBlur={() => updateField('resume', resume)}
              />
            </div>
            <div className="areaStyle">
              <br />
              <label className="labelHome" htmlFor="experience">Experiência</label>
              <br />
              <textarea
                className="inputProfile"
                type="text"
                id="experience"
                defaultValue={dataBase.experience}
                placeholder="Experiência"
                onChange={(e) => setExperience(e.target.value)}
                onBlur={() => updateField('experience', experience)}
              />
            </div>
            <div className="areaStyle">
              <br />
              <label className="labelHome" htmlFor="experience">Experiência 2</label>
              <br />
              <textarea
                className="inputProfile"
                type="text"
                id="experience"
                defaultValue={dataBase.experience2}
                placeholder="Experiência 2"
                onChange={(e) => setExperience2(e.target.value)}
                onBlur={() => updateField('experience2', experience2)}
              />
            </div>
            <div className="areaStyle">
              <br />
              <label className="labelHome" htmlFor="experience">Experiência 3</label>
              <br />
              <textarea
                className="inputProfile"
                type="text"
                id="experience"
                defaultValue={dataBase.experience3}
                placeholder="Experiência 3"
                onChange={(e) => setExperience3(e.target.value)}
                onBlur={() => updateField('experience3', experience3)}
              />
            </div>
            <div className="areaStyle">
              <label className="labelHome" htmlFor="experience">Experiência 4</label><br />
              <textarea
                className="inputProfile"
                type="text"
                id="experience"
                defaultValue={dataBase.experience4}
                placeholder="Experiência 4"
                onChange={(e) => setExperience4(e.target.value)}
                onBlur={() => updateField('experience4', experience4)}
              />
            </div>
            <div className="areaStyle">
              <br />
              <label className="labelHome" htmlFor="experience">Experiência 5</label>
              <br />
              <textarea
                className="inputProfile"
                type="text"
                id="experience"
                defaultValue={dataBase.experience5}
                placeholder="Experiência 5"
                onChange={(e) => setExperience5(e.target.value)}
                onBlur={() => updateField('experience5', experience5)}
              />
            </div>
            <div className="areaStyle">
              <br />
              <label className="labelHome" htmlFor="formation">Formação</label>
              <br />
              <textarea
                className="inputProfile"
                type="text"
                id="formation"
                defaultValue={dataBase.formation}
                placeholder="Formação"
                onChange={(e) => setFormation(e.target.value)}
                onBlur={() => updateField('formation', formation)}
              />
            </div>
            <div className="areaStyle">
              <br />
              <label className="labelHome" htmlFor="formation">Formação 2</label>
              <br />
              <textarea
                className="inputProfile"
                type="text"
                id="formation"
                defaultValue={dataBase.formation2}
                placeholder="Formação 2"
                onChange={(e) => setFormation2(e.target.value)}
                onBlur={() => updateField('formation2', formation2)}
              />
            </div>
            <div className="areaStyle">
              <br />
              <label className="labelHome" htmlFor="formation">Formação 3</label>
              <br />
              <textarea
                className="inputProfile"
                type="text"
                id="formation"
                defaultValue={dataBase.formation3}
                placeholder="Formação 3"
                onChange={(e) => setFormation3(e.target.value)}
                onBlur={() => updateField('formation3', formation3)}
              />
            </div>
            <div className="areaStyle">
              <br />
              <label className="labelHome" htmlFor="formation">Formação 4</label>
              <br />
              <textarea
                className="inputProfile"
                type="text"
                id="formation"
                defaultValue={dataBase.formation4}
                placeholder="Formação 4"
                onChange={(e) => setFormation4(e.target.value)}
                onBlur={() => updateField('formation4', formation4)}
              />
            </div>
            <div className="areaStyle">
              <br />
              <label className="labelHome" htmlFor="formation">Formação 5</label>
              <br />
              <textarea
                className="inputProfile"
                type="text"
                id="formation"
                defaultValue={dataBase.formation5}
                placeholder="Formação 5"
                onChange={(e) => setFormation5(e.target.value)}
                onBlur={() => updateField('formation5', formation5)}
              />
            </div>
            <div className="areaStyle">
              <br />
              <label className="labelHome" htmlFor="skill">Competência</label>
              <br />
              <input
                className="inputProfile"
                type="text"
                id="skill"
                defaultValue={dataBase.skill}
                placeholder="Competência"
                onChange={(e) => setSkill(e.target.value)}
                onBlur={() => updateField('skill', skill)}
              />
            </div>
            <div className="areaStyle">
              <br />
              <label className="labelHome" htmlFor="skill">Competência 2</label>
              <br />
              <input
                className="inputProfile"
                type="text"
                id="skill"
                defaultValue={dataBase.skill2}
                placeholder="Competência 2"
                onChange={(e) => setSkill2(e.target.value)}
                onBlur={() => updateField('skill2', skill2)}
              />
            </div>
            <div className="areaStyle">
              <br />
              <label className="labelHome" htmlFor="skill">Competência 3</label>
              <br />
              <input
                className="inputProfile"
                type="text"
                id="skill"
                defaultValue={dataBase.skill3}
                placeholder="Competência 3"
                onChange={(e) => setSkill3(e.target.value)}
                onBlur={() => updateField('skill3', skill3)}
              />
            </div>
            <div className="areaStyle">
              <br />
              <label className="labelHome" htmlFor="skill">Competência 4</label>
              <br />
              <input
                className="inputProfile"
                type="text"
                id="skill"
                defaultValue={dataBase.skill4}
                placeholder="Competência 4"
                onChange={(e) => setSkill4(e.target.value)}
                onBlur={() => updateField('skill4', skill4)}
              />
            </div>
            <div className="areaStyle">
              <br />
              <label className="labelHome" htmlFor="skill">Competência 5</label>
              <br />
              <input
                className="inputProfile"
                type="text"
                id="skill"
                defaultValue={dataBase.skill5}
                placeholder="Competência 5"
                onChange={(e) => setSkill5(e.target.value)}
                onBlur={() => updateField('skill5', skill5)}
              />
            </div>
            <div className="areaStyle">
              <br />
              <label className="labelHome" htmlFor="language">Idioma</label>
              <br />
              <input
                className="inputProfile"
                type="text"
                id="language"
                defaultValue={dataBase.language}
                placeholder="Idioma"
                onChange={(e) => setLanguage(e.target.value)}
                onBlur={() => updateField('language', language)}
              />
            </div>
            <div className="areaStyle">
              <br />
              <label className="labelHome" htmlFor="language">Idioma 2</label>
              <br />
              <input
                className="inputProfile"
                type="text"
                id="language"
                defaultValue={dataBase.language2}
                placeholder="Idioma 2"
                onChange={(e) => setLanguage2(e.target.value)}
                onBlur={() => updateField('language2', language2)}
              />
            </div>
            <div className="areaStyle">
              <br />
              <label className="labelHome" htmlFor="language">Idioma 3</label>
              <br />
              <input
                className="inputProfile"
                type="text"
                id="language"
                defaultValue={dataBase.language3}
                placeholder="Idioma 3"
                onChange={(e) => setLanguage3(e.target.value)}
                onBlur={() => updateField('language3', language3)}
              />
              <br /><br /><br />
            </div>
          </form>
        </div>

        <button className="btn-profile back-profile" onClick={() => navigate('/private')}><i className="bi bi-arrow-left-circle"></i> Voltar</button>
      </div>
    </section>
  );
};
