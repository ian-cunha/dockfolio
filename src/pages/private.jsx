/* eslint-disable no-undef */
import { signOut } from "firebase/auth"
import { auth } from "../config/firebase"
import { useNavigate } from "react-router-dom";
import { NavBar } from "../components/navbar";
import { Navigate } from 'react-router-dom'

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
      <div className='printme'>
        <h2>Dados do Usuário</h2>
        <p>Em breve você poderá ter seu currículo atualizado e de fácil acesso.</p>
      </div>
      <button className="btn-nav no-printme" onClick={() => navigate('/profile')}>Configurar perfil</button>
      <button className="btn-nav no-printme" onClick={handleSignOut}>Sair</button>
    </section>
  )
}