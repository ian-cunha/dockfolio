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

  function dotBar() {
    var barBtn = document.getElementById('nav')
    if (barBtn.style.display === 'block') {
      barBtn.style.display = 'none'
    } else {
      barBtn.style.display = 'block'
    }
  }

  return (
    <div className="nav-base">
    <nav className="no-printme">
      <div className="logo">
        <div className="logo-title">
          <img width='40' src={logo} />
          <h1 className="title-nav">Dockfolio</h1>
        </div>
        <button className="dot-btn" onClick={dotBar}><i className="bi bi-three-dots"></i></button>
      </div>
      <div id="nav" className="nav-bar">
        <div className="navContainer">
          <button className="btn-nav" onClick={() => navigate('/private')}><i className="bi bi-house"></i> Estrutura</button>
          <button className="btn-nav" onClick={() => navigate('/profile')}><i className="bi bi-person-circle"></i> Perfil</button>
          <button className="btn-nav" onClick={() => alert('Ferramenta em desenvolvimento.')}><i className="bi bi-link-45deg"></i> Link</button>
          <button className="btn-nav" onClick={handleSignOut}><i className="bi bi-x-circle"></i> Sair</button>
        </div>
      </div>
    </nav>
    </div>
  )
}