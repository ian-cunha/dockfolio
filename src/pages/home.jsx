/* eslint-disable react/prop-types */
import { useState } from "react"
import { Navigate } from 'react-router-dom'

import logo from '../assets/logo.svg'

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth"
import { auth } from "../config/firebase"

export const Home = ({ user }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSignUpActive, setIsSignUpActive] = useState(false)
  const handleMethodChange = () => {
    setIsSignUpActive(!isSignUpActive)
  }

  const [message, setMessage] = useState(true);

  const handleSignUp = () => {
    if (!email || !password || password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user)
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage)
          setMessage(
            <div className="messageError">
              <p>Email ou Senha inválido!</p>
            </div>
          )
          setTimeout(function () {
            setMessage(false)
          }, 2000)
        });
    } else {
      setMessage(
        <div className="messageError">
          <p>Email ou Senha inválido!</p>
        </div>
      )
      setTimeout(function () {
        setMessage(false)
      }, 2000)
    }
  }

  const handleSignIn = () => {
    if (!email || !password) return
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
        setMessage(
          <div className="messageError">
            <p>Email ou Senha inválido!</p>
          </div>
        )
        setTimeout(function () {
          setMessage(false)
        }, 2000)
      });
  }

  const handleEmailChange = (event) => setEmail(event.target.value)
  const handlePasswordChange = (event) => setPassword(event.target.value)
  const handleConfirmPasswordChange = (event) => setConfirmPassword(event.target.value)

  if (user) {
    return <Navigate to='/private'></Navigate>
  }
  return (
    <section className="home">
      {message}
      <div className="container-logo">
        <img width={150} src={logo} />
        <h1 className="title">Dockfolio</h1>
        <h4>Simples, rápido e prático.</h4>
      </div>
      <form className="formBase">
        {isSignUpActive && <legend>Criar conta</legend>}
        {!isSignUpActive && <legend>Login</legend>}
        <fieldset className="field">
          <div>
            <label className="labelHome" htmlFor="email">Email<br /></label>
            <input className="inputHome" type="email" id="email" placeholder="Email" onChange={handleEmailChange} />
          </div>
          <div>
            <label className="labelHome" htmlFor="password">Senha<br /></label>
            <input className="inputHome" type="password" id="password" placeholder="Senha" onChange={handlePasswordChange} />
          </div>
          {isSignUpActive &&
            <div>
              <label className="labelHome" htmlFor="password">Repetir senha<br /></label>
              <input className="inputHome" type="password" id="password" placeholder="Repetir senha" onChange={handleConfirmPasswordChange} />
            </div>}
          {isSignUpActive && <button onClick={handleSignUp} type="button">Cadastrar-se</button>}
          {!isSignUpActive && <button onClick={handleSignIn} type="button">Entrar</button>}
        </fieldset>
        {isSignUpActive && <a onClick={handleMethodChange} className="aLink">Fazer Login</a>}
        {!isSignUpActive && <a onClick={handleMethodChange} className="aLink">Ainda não tem conta? Crie a sua agora!</a>}
      </form>
    </section>
  )
}