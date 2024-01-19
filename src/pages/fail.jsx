/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'

import logo from '../assets/404.svg'

export const Fail = () => {

  const navigate = useNavigate();

  return (
    <section className="fail">
      <img className="logoFail" src={logo} />
      <h2>Ops!!!, acho que você se perdeu.</h2>
      <button className="btn-nav" onClick={() => navigate('/')}><i className="bi bi-arrow-left"></i> Voltar para o Dockfolio</button>
    </section>
  )
}