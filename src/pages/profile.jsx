import { auth } from "../config/firebase"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { NavBar } from "../components/navbar";

export const Profile = () => {

  const [displayName, setDisplayName] = useState('')
  const [photoURL, setPhotoURL] = useState('')

  const handleDisplayName = (event) => setDisplayName(event.target.value)
  const handlePhotoURL = (event) => setPhotoURL(event.target.value)

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

        <form>
          <h2>Dados do perfil</h2>
          <div>
            <label className="labelHome" htmlFor="name">Nome</label><br />
            <input className="inputHome" type="name" id="name" placeholder="Nome do usuário (obrigatório)" onChange={handleDisplayName} />
          </div>
          <div>
            <label className="labelHome" htmlFor="photo">Foto</label><br />
            <input className="inputHome" type="text" id="photo" placeholder="URL da foto de perfil" onChange={handlePhotoURL} />
          </div>
        </form>
        <button className="btn-nav" onClick={handleUpdate}>Confirmar</button>
        <button className="btn-nav" onClick={() => navigate('/private')}>Voltar</button>
      </div>
    </section>
  )
}