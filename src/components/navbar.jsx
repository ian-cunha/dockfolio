/* eslint-disable no-undef */
import { signOut } from "firebase/auth"
import { auth } from "../config/firebase"
import { useNavigate } from "react-router-dom";

import logo from '../assets/logo-white.svg'

export const NavBar = () => {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => console.log('Sign Out'))
      .catch((error) => console.log(error))
  }

  const navigate = useNavigate();

  return (
    <nav className="no-printme">
      <div className="logo">
        <img width='40' src={logo} />
        <h2 className="title-nav">Dockfolio</h2>
      </div>
      <div className="nav-bar">
        <button className="btn-nav" onClick={() => navigate('/private')}><i className="bi bi-house"></i> Estrutura</button>
        <button className="btn-nav" onClick={() => navigate('/profile')}><i className="bi bi-person-circle"></i> Perfil</button>
        <button className="btn-nav" onClick={() => alert('Ferramenta em desenvolvimento.')}><i className="bi bi-link-45deg"></i> Link</button>
        <button className="btn-nav" onClick={handleSignOut}><i className="bi bi-x-circle"></i> Sair</button>
      </div>
    </nav>
  )
}