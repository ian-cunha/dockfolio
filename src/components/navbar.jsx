/* eslint-disable react/prop-types */
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import logo from '../assets/logo-white.svg';

export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = auth.currentUser;
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth).catch((error) => console.log(error));
  };

  const NavButton = ({ to, icon, children }) => (
    <button
      className="flex items-center w-full px-4 py-2 text-left text-gray-200 hover:bg-indigo-700 rounded-md transition-colors cursor-pointer"
      onClick={() => {
        navigate(to);
        setIsMenuOpen(false);
      }}
    >
      <i className={`bi ${icon} mr-3`}></i>
      {children}
    </button>
  );

  return (
    // 'print:hidden' é uma classe do Tailwind que esconde o elemento ao imprimir
    <div className="fixed top-0 left-0 right-0 bg-indigo-600 shadow-md z-50 print:hidden">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo e Título */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/private')}>
            <img width='40' src={logo} alt="Dockfolio Logo" />
            <h1 className="text-2xl font-bold text-white">Dockfolio</h1>
          </div>

          {/* Menu para telas grandes */}
          <div className="hidden md:flex items-center space-x-2">
            <NavButton to="/private" icon="bi-house">Estrutura</NavButton>
            <NavButton to="/profile" icon="bi-person-circle">Perfil</NavButton>
            {user && <NavButton to={`/share/${user.uid}`} icon="bi-link-45deg">Link</NavButton>}
            <button
              className="flex items-center px-4 py-2 text-gray-200 hover:bg-indigo-700 rounded-md transition-colors cursor-pointer"
              onClick={handleSignOut}
            >
              <i className="bi bi-x-circle mr-3"></i>
              Sair
            </button>
          </div>

          {/* Botão para menu mobile */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white text-2xl cursor-pointer">
              <i className="bi bi-three-dots"></i>
            </button>
          </div>
        </div>

        {/* Menu Mobile Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <NavButton to="/private" icon="bi-house">Estrutura</NavButton>
            <NavButton to="/profile" icon="bi-person-circle">Perfil</NavButton>
            {user && <NavButton to={`/share/${user.uid}`} icon="bi-link-45deg">Link</NavButton>}
            <button
              className="flex items-center w-full px-4 py-2 text-left text-gray-200 hover:bg-indigo-700 rounded-md transition-colors cursor-pointer"
              onClick={handleSignOut}
            >
              <i className="bi bi-x-circle mr-3"></i>
              Sair
            </button>
          </div>
        )}
      </nav>
    </div>
  );
};