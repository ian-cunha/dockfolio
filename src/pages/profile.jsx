import { auth, storeApp } from "../config/firebase"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { NavBar } from "../components/navbar";

import { doc, setDoc } from "firebase/firestore";

export const Profile = () => {

  const [displayName, setDisplayName] = useState('')
  const [photoURL, setPhotoURL] = useState('')

  const [func, setFunction] = useState('')
  const [number, setNumber] = useState('')
  const [address, setAddress] = useState('')

  const [resume, setResume] = useState('')
  const [experience, setExperience] = useState('')
  const [experience2, setExperience2] = useState('')
  const [experience3, setExperience3] = useState('')
  const [formation, setFormation] = useState('')
  const [formation2, setFormation2] = useState('')
  const [formation3, setFormation3] = useState('')

  const handleDisplayName = (event) => setDisplayName(event.target.value)
  const handlePhotoURL = (event) => setPhotoURL(event.target.value)

  const handleFunction = (event) => setFunction(event.target.value)
  const handleNumber = (event) => setNumber(event.target.value)
  const handleAddress = (event) => setAddress(event.target.value)

  const handleResume = (event) => setResume(event.target.value)
  const handleExperience = (event) => setExperience(event.target.value)
  const handleExperience2 = (event) => setExperience2(event.target.value)
  const handleExperience3 = (event) => setExperience3(event.target.value)
  const handleFormation = (event) => setFormation(event.target.value)
  const handleFormation2 = (event) => setFormation2(event.target.value)
  const handleFormation3 = (event) => setFormation3(event.target.value)

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
      function: func,
      number: number,
      address: address,
      resume: resume,
      experience: experience,
      experience2: experience2,
      experience3: experience3,
      formation: formation,
      formation2: formation2,
      formation3: formation3,
    });

    alert('Atualizado')

  }

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
          <p className="email-top">{email}</p>
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
              <input className="inputProfile" type="text" id="function" placeholder="Função" onChange={handleFunction} />
            </div>
            <div>
              <label className="labelHome" htmlFor="number">Número</label><br />
              <input className="inputProfile" type="number" id="number" placeholder="Número" onChange={handleNumber} />
            </div>
            <div>
              <label className="labelHome" htmlFor="address">Endereço</label><br />
              <input className="inputProfile" type="text" id="address" placeholder="Endereço" onChange={handleAddress} />
            </div>
            <div>
              <label className="labelHome" htmlFor="title">Resumo</label><br />
              <input className="inputProfile" type="text" id="title" placeholder="Resumo" onChange={handleResume} />
            </div>
            <div>
              <label className="labelHome" htmlFor="experience">Experiência</label><br />
              <input className="inputProfile" type="text" id="experience" placeholder="Experiência" onChange={handleExperience} />
            </div>
            <div>
              <label className="labelHome" htmlFor="experience">Experiência 2</label><br />
              <input className="inputProfile" type="text" id="experience" placeholder="Experiência" onChange={handleExperience2} />
            </div>
            <div>
              <label className="labelHome" htmlFor="experience">Experiência 3</label><br />
              <input className="inputProfile" type="text" id="experience" placeholder="Experiência" onChange={handleExperience3} />
            </div>
            <div>
              <label className="labelHome" htmlFor="formation">Formação</label><br />
              <input className="inputProfile" type="text" id="formation" placeholder="Formação" onChange={handleFormation} />
            </div>
            <div>
              <label className="labelHome" htmlFor="formation">Formação 2</label><br />
              <input className="inputProfile" type="text" id="formation" placeholder="Formação" onChange={handleFormation2} />
            </div>
            <div>
              <label className="labelHome" htmlFor="formation">Formação 3</label><br />
              <input className="inputProfile" type="text" id="formation" placeholder="Formação" onChange={handleFormation3} />
            </div>
            <button className="btn-nav" type="submit" onClick={newDoc}><i className="bi bi-check-lg"></i> Confirmar</button>
          </form>
        </div>

        <button className="btn-nav back-profile" onClick={() => navigate('/private')}><i className="bi bi-arrow-left-circle"></i> Voltar</button>
      </div>
    </section>
  )
}