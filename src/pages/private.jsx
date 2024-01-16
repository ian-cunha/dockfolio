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
      <h3 className="printme">Olá, {name}.</h3>
      <Structure />
      <button className="btn-nav no-printme" onClick={() => navigate('/profile')}>Configurar perfil</button>
      <button className="btn-nav no-printme" onClick={() => window.print()}>Baixar estrutura</button>
      <button className="btn-nav no-printme" onClick={handleSignOut}>Sair</button>
    </section>
  )
}