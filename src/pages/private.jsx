/* eslint-disable no-undef */
import { signOut } from "firebase/auth"
import { auth } from "../config/firebase"
import { useNavigate } from "react-router-dom";
import { NavBar } from "../components/navbar";
import { Navigate } from 'react-router-dom'
import { Structure } from "../components/structure";

export const Private = () => {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => console.log('Sign Out'))
      .catch((error) => console.log(error))
  }

  const navigate = useNavigate();
  const user = auth.currentUser;
  const name = user.displayName;

  if (name === null) {
    return <Navigate to='/profile'></Navigate>
  }

  return (
    <section className="dockfolioPage">
      <NavBar />
      <Structure />
      <div className="nav-back">
        <button className="btn-nav no-printme back-profile" onClick={() => navigate('/profile')}><i className="bi bi-arrow-clockwise"></i> Atualizar</button>
        <button className="btn-nav no-printme back-profile" onClick={() => window.print()}><i className="bi bi-cloud-arrow-down"></i> Download</button>
        <button className="btn-nav no-printme back-profile" onClick={handleSignOut}><i className="bi bi-x-circle"></i> Sair</button>
      </div>
    </section>
  )
}