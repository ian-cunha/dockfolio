import { auth, storeApp } from "../config/firebase"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { NavBar } from "../components/navbar";

import { doc, setDoc } from "firebase/firestore";

export const Profile = () => {

  const [displayName, setDisplayName] = useState('')
  const [photoURL, setPhotoURL] = useState('')
  const [resume, setResume] = useState('')
  const [experience, setExperience] = useState('')
  const [formation, setFormation] = useState('')

  const handleDisplayName = (event) => setDisplayName(event.target.value)
  const handlePhotoURL = (event) => setPhotoURL(event.target.value)
  const handleResume = (event) => setResume(event.target.value)
  const handleExperience = (event) => setExperience(event.target.value)
  const handleFormation = (event) => setFormation(event.target.value)

  const handleUpdate = () => {
    updateProfile(auth.currentUser, {
      displayName: displayName, photoURL: photoURL
    }).then(() => {
      alert('Atualizado')
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
      resume: resume,
      experience: experience,
      formation: formation,
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
          <p>Email: {email}</p>
        </div>

        <h2>Dados do perfil</h2>

        <div className="updateProfile">
          <form className="formTop">
            <h3>Perfil</h3>
            <div>
              <label className="labelHome" htmlFor="name">Nome</label><br />
              <input className="inputHome" type="name" id="name" placeholder="Nome do usuário (obrigatório)" onChange={handleDisplayName} />
            </div>
            <div>
              <label className="labelHome" htmlFor="photo">Foto</label><br />
              <input className="inputHome" type="text" id="photo" placeholder="URL da foto de perfil" onChange={handlePhotoURL} />
            </div>
            <button className="btn-nav" type="submit" onClick={handleUpdate}>Aplicar</button>
          </form>

          <form className="formData">
            <h3>Dados</h3>
            <div>
              <label className="labelHome" htmlFor="title">Resumo</label><br />
              <input className="inputHome" type="text" id="title" placeholder="Resumo" onChange={handleResume} />
            </div>
            <div>
              <label className="labelHome" htmlFor="experience">Experiência</label><br />
              <input className="inputHome" type="text" id="experience" placeholder="Resumo" onChange={handleExperience} />
            </div>
            <div>
              <label className="labelHome" htmlFor="formation">Formação</label><br />
              <input className="inputHome" type="text" id="formation" placeholder="Resumo" onChange={handleFormation} />
            </div>
            <button className="btn-nav" type="submit" onClick={newDoc}>Confirmar</button>
          </form>
        </div>

        <button className="btn-nav" onClick={() => navigate('/private')}>Voltar</button>
      </div>
    </section>
  )
}