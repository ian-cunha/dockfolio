/* eslint-disable react-hooks/exhaustive-deps */
import { auth, storeApp } from "../config/firebase"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { NavBar } from "../components/navbar";
import { useEffect } from "react"
import { doc, setDoc, getDoc } from "firebase/firestore";

export const Profile = () => {

  const [displayName, setDisplayName] = useState('')
  const [photoURL, setPhotoURL] = useState('')
  const [emailData, setEmailData] = useState('')
  const [func, setFunction] = useState('')
  const [number, setNumber] = useState('')
  const [address, setAddress] = useState('')

  const [resume, setResume] = useState('')

  const [experience, setExperience] = useState('')
  const [experience2, setExperience2] = useState('')
  const [experience3, setExperience3] = useState('')
  const [experience4, setExperience4] = useState('')
  const [experience5, setExperience5] = useState('')

  const [formation, setFormation] = useState('')
  const [formation2, setFormation2] = useState('')
  const [formation3, setFormation3] = useState('')
  const [formation4, setFormation4] = useState('')
  const [formation5, setFormation5] = useState('')

  const [skill, setSkill] = useState('')
  const [skill2, setSkill2] = useState('')
  const [skill3, setSkill3] = useState('')
  const [skill4, setSkill4] = useState('')
  const [skill5, setSkill5] = useState('')

  const [language, setLanguage] = useState('')
  const [language2, setLanguage2] = useState('')
  const [language3, setLanguage3] = useState('')

  const handleDisplayName = (event) => setDisplayName(event.target.value)
  const handlePhotoURL = (event) => setPhotoURL(event.target.value)

  const handleEmailData = (event) => setEmailData(event.target.value)
  const handleFunction = (event) => setFunction(event.target.value)
  const handleNumber = (event) => setNumber(event.target.value)
  const handleAddress = (event) => setAddress(event.target.value)

  const handleResume = (event) => setResume(event.target.value)
  const handleExperience = (event) => setExperience(event.target.value)
  const handleExperience2 = (event) => setExperience2(event.target.value)
  const handleExperience3 = (event) => setExperience3(event.target.value)
  const handleExperience4 = (event) => setExperience4(event.target.value)
  const handleExperience5 = (event) => setExperience5(event.target.value)
  const handleFormation = (event) => setFormation(event.target.value)
  const handleFormation2 = (event) => setFormation2(event.target.value)
  const handleFormation3 = (event) => setFormation3(event.target.value)
  const handleFormation4 = (event) => setFormation4(event.target.value)
  const handleFormation5 = (event) => setFormation5(event.target.value)

  const handleSkill = (event) => setSkill(event.target.value)
  const handleSkill2 = (event) => setSkill2(event.target.value)
  const handleSkill3 = (event) => setSkill3(event.target.value)
  const handleSkill4 = (event) => setSkill4(event.target.value)
  const handleSkill5 = (event) => setSkill5(event.target.value)

  const handleLanguage = (event) => setLanguage(event.target.value)
  const handleLanguage2 = (event) => setLanguage2(event.target.value)
  const handleLanguage3 = (event) => setLanguage3(event.target.value)

  const handleUpdateName = () => {
    updateProfile(auth.currentUser, {
      displayName: displayName
    }).then(() => {
      alert('Nome atualizado')
    }).catch((error) => {
      alert(error)
    });
  }

  const handleUpdatePhoto = () => {
    updateProfile(auth.currentUser, {
      photoURL: photoURL
    }).then(() => {
      alert('Foto atualizada')
    }).catch((error) => {
      alert(error)
    });
  }

  const navigate = useNavigate();
  const user = auth.currentUser;
  const email = user.email;
  const name = user.displayName;
  const photo = user.photoURL;
  const uid = user.uid;

  const newDoc = async (event) => {
    event.preventDefault()

    await setDoc(doc(storeApp, "profiles", uid), {
      func: func,
      email: emailData,
      number: number,
      address: address,
      resume: resume,
      experience: experience,
      experience2: experience2,
      experience3: experience3,
      experience4: experience4,
      experience5: experience5,
      formation: formation,
      formation2: formation2,
      formation3: formation3,
      formation4: formation4,
      formation5: formation5,
      skill: skill,
      skill2: skill2,
      skill3: skill3,
      skill4: skill4,
      skill5: skill5,
      language: language,
      language2: language2,
      language3: language3
    });
    alert('Atualizado')
  }

  const [dataBase, setDataBase] = useState('')

  const getDataBase = async () => {
    const docRef = doc(storeApp, "profiles", uid)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      setDataBase(docSnap.data())
    } else {
      console.log("Sem dados!")
    }
  }

  useEffect(() => {
    getDataBase()
  }, [])

  return (
    <section>
      <NavBar />
      <div className="dockfolioPage">
        <h2>Configurações do perfil</h2>
        <div>
          {photo != null &&
            <img className="photo" width='150' src={photo} />
          }
          <p className="name">{name}</p>
          <p className="email-top">Conta: {email}</p>
        </div>

        <h2>Dados do perfil</h2>

        <div className="updateProfile">
          <form className="formTop">
            <h3>Perfil</h3>
            <div className="formOrganizer">
              <label className="labelHome" htmlFor="name">Nome</label>
              <input className="inputProfile" type="name" id="name" defaultValue={name} placeholder="Nome do usuário (obrigatório)" onChange={handleDisplayName} />
              <button className="btn-nav" type="submit" onClick={handleUpdateName}><i className="bi bi-check-lg"></i> Aplicar nome</button>
            </div>
            <div className="formOrganizer">
              <label className="labelHome" htmlFor="photo">Foto</label>
              <input className="inputProfile" type="text" id="photo" defaultValue={photo} placeholder="URL da foto de perfil" onChange={handlePhotoURL} />
              <button className="btn-nav" type="submit" onClick={handleUpdatePhoto}><i className="bi bi-check-lg"></i> Aplicar foto</button>
            </div>
          </form>

          <form className="formData">
            <h3>Dados</h3>
            <div>
              <label className="labelHome" htmlFor="function">Função</label><br />
              <input className="inputProfile" type="text" id="function" defaultValue={dataBase.func} placeholder="Função" onChange={handleFunction} />
            </div>
            <div>
              <label className="labelHome" htmlFor="emailData">E-mail</label><br />
              <input className="inputProfile" type="email" id="emailData" defaultValue={dataBase.email} placeholder="E-mail" onChange={handleEmailData} />
            </div>
            <div>
              <label className="labelHome" htmlFor="number">Número</label><br />
              <input className="inputProfile" type="number" id="number" defaultValue={dataBase.number} placeholder="(99) 9999-9999" onChange={handleNumber} />
            </div>
            <div>
              <label className="labelHome" htmlFor="address">Endereço</label><br />
              <input className="inputProfile" type="text" id="address" defaultValue={dataBase.address} placeholder="Endereço" onChange={handleAddress} />
            </div>
            <div>
              <label className="labelHome" htmlFor="title">Resumo</label><br />
              <textarea className="inputProfile" type="text" id="title" defaultValue={dataBase.resume} placeholder="Resumo" onChange={handleResume} />
            </div>
            <div>
              <label className="labelHome" htmlFor="experience">Experiência</label><br />
              <textarea className="inputProfile" type="text" id="experience" defaultValue={dataBase.experience} placeholder="Experiência" onChange={handleExperience} />
            </div>
            <div>
              <label className="labelHome" htmlFor="experience">Experiência 2</label><br />
              <textarea className="inputProfile" type="text" id="experience" defaultValue={dataBase.experience2} placeholder="Experiência 2" onChange={handleExperience2} />
            </div>
            <div>
              <label className="labelHome" htmlFor="experience">Experiência 3</label><br />
              <textarea className="inputProfile" type="text" id="experience" defaultValue={dataBase.experience3} placeholder="Experiência 3" onChange={handleExperience3} />
            </div>
            <div>
              <label className="labelHome" htmlFor="experience">Experiência 4</label><br />
              <textarea className="inputProfile" type="text" id="experience" defaultValue={dataBase.experience4} placeholder="Experiência 4" onChange={handleExperience4} />
            </div>
            <div>
              <label className="labelHome" htmlFor="experience">Experiência 5</label><br />
              <textarea className="inputProfile" type="text" id="experience" defaultValue={dataBase.experience5} placeholder="Experiência 5" onChange={handleExperience5} />
            </div>
            <div>
              <label className="labelHome" htmlFor="formation">Formação</label><br />
              <textarea className="inputProfile" type="text" id="formation" defaultValue={dataBase.formation} placeholder="Formação" onChange={handleFormation} />
            </div>
            <div>
              <label className="labelHome" htmlFor="formation">Formação 2</label><br />
              <textarea className="inputProfile" type="text" id="formation" defaultValue={dataBase.formation2} placeholder="Formação 2" onChange={handleFormation2} />
            </div>
            <div>
              <label className="labelHome" htmlFor="formation">Formação 3</label><br />
              <textarea className="inputProfile" type="text" id="formation" defaultValue={dataBase.formation3} placeholder="Formação 3" onChange={handleFormation3} />
            </div>
            <div>
              <label className="labelHome" htmlFor="formation">Formação 4</label><br />
              <textarea className="inputProfile" type="text" id="formation" defaultValue={dataBase.formation4} placeholder="Formação 4" onChange={handleFormation4} />
            </div>
            <div>
              <label className="labelHome" htmlFor="formation">Formação 5</label><br />
              <textarea className="inputProfile" type="text" id="formation" defaultValue={dataBase.formation5} placeholder="Formação 5" onChange={handleFormation5} />
            </div>
            <div>
              <label className="labelHome" htmlFor="skill">Competência</label><br />
              <input className="inputProfile" type="text" id="skill" defaultValue={dataBase.skill} placeholder="Competência" onChange={handleSkill} />
            </div>
            <div>
              <label className="labelHome" htmlFor="skill">Competência 2</label><br />
              <input className="inputProfile" type="text" id="skill" defaultValue={dataBase.skill2} placeholder="Competência 2" onChange={handleSkill2} />
            </div>
            <div>
              <label className="labelHome" htmlFor="skill">Competência 3</label><br />
              <input className="inputProfile" type="text" id="skill" defaultValue={dataBase.skill3} placeholder="Competência 3" onChange={handleSkill3} />
            </div>
            <div>
              <label className="labelHome" htmlFor="skill">Competência 4</label><br />
              <input className="inputProfile" type="text" id="skill" defaultValue={dataBase.skill4} placeholder="Competência 4" onChange={handleSkill4} />
            </div>
            <div>
              <label className="labelHome" htmlFor="skill">Competência 5</label><br />
              <input className="inputProfile" type="text" id="skill" defaultValue={dataBase.skill5} placeholder="Competência 5" onChange={handleSkill5} />
            </div>
            <div>
              <label className="labelHome" htmlFor="language">Idioma</label><br />
              <input className="inputProfile" type="text" id="language" defaultValue={dataBase.language} placeholder="Idioma" onChange={handleLanguage} />
            </div>
            <div>
              <label className="labelHome" htmlFor="language">Idioma 2</label><br />
              <input className="inputProfile" type="text" id="language" defaultValue={dataBase.language2} placeholder="Idioma 2" onChange={handleLanguage2} />
            </div>
            <div>
              <label className="labelHome" htmlFor="language">Idioma 3</label><br />
              <input className="inputProfile" type="text" id="language" defaultValue={dataBase.language3} placeholder="Idioma 3" onChange={handleLanguage3} />
            </div>
            <button className="btn-nav" type="submit" onClick={newDoc}><i className="bi bi-check-lg"></i> Confirmar</button>
          </form>
        </div>

        <button className="btn-nav back-profile" onClick={() => navigate('/private')}><i className="bi bi-arrow-left-circle"></i> Voltar</button>
      </div>
    </section>
  )
}