/* eslint-disable react/prop-types */
import { useState } from "react"
import { Navigate } from 'react-router-dom'
import logo from '../assets/logo.svg'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth"
import { auth } from "../config/firebase"

const Message = ({ text, isError }) => (
  <div className={`fixed top-24 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white ${isError ? 'bg-red-500' : 'bg-indigo-500'}`}>
    <p>{text}</p>
  </div>
);

export const Home = ({ user }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSignUpActive, setIsSignUpActive] = useState(false)
  const [message, setMessage] = useState(null);

  const handleMethodChange = () => setIsSignUpActive(!isSignUpActive);

  const showMessage = (text, isError = false) => {
    setMessage({ text, isError });
    setTimeout(() => setMessage(null), 2500);
  };

  const handleSignUp = () => {
    if (!email || !password) return showMessage("Preencha todos os campos.", true);
    if (password !== confirmPassword) return showMessage("As senhas não conferem.", true);

    createUserWithEmailAndPassword(auth, email, password)
      .catch((error) => showMessage(error.message, true));
  }

  const handleSignIn = () => {
    if (!email || !password) return showMessage("Preencha todos os campos.", true);

    signInWithEmailAndPassword(auth, email, password)
      .catch((error) => showMessage(error.message, true));
  }

  if (user) {
    return <Navigate to='/private' />;
  }

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4">
      {message && <Message text={message.text} isError={message.isError} />}
      <div className="text-center">
        <img width={120} src={logo} alt="Dockfolio Logo" className="mx-auto mb-4" />
        <h1 className="text-5xl font-bold text-indigo-600 dark:text-indigo-500">Dockfolio</h1>
        <h4 className="mt-2 text-lg text-gray-600 dark:text-gray-400">Simples, rápido e prático.</h4>
      </div>
      <form className="w-full max-w-sm mt-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
        <legend className="text-2xl font-semibold text-center mb-6">{isSignUpActive ? 'Criar Conta' : 'Login'}</legend>
        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-medium" htmlFor="email">Email</label>
            <input className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" type="email" id="email" placeholder="seu@email.com" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="block mb-1 font-medium" htmlFor="password">Senha</label>
            <input className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" type="password" id="password" placeholder="••••••••" onChange={(e) => setPassword(e.target.value)} />
          </div>
          {isSignUpActive &&
            <div>
              <label className="block mb-1 font-medium" htmlFor="confirm-password">Repetir Senha</label>
              <input className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" type="password" id="confirm-password" placeholder="••••••••" onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>}
        </div>
        <button onClick={isSignUpActive ? handleSignUp : handleSignIn} type="button" className="w-full mt-6 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300 cursor-pointer">
          {isSignUpActive ? 'Cadastrar-se' : 'Entrar'}
        </button>
        <p className="text-center mt-4">
          <a onClick={handleMethodChange} className="text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer">
            {isSignUpActive ? 'Já tem uma conta? Fazer Login' : 'Ainda não tem conta? Crie agora!'}
          </a>
        </p>
      </form>
    </section>
  )
}