/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'
import logo from '../assets/404.svg'

export const Fail = () => {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-center p-4">
      <img className="w-64 mb-6" src={logo} alt="Página não encontrada" />
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Ops! Acho que você se perdeu.</h2>
      <p className="text-gray-600 dark:text-gray-400 mt-2">A página que você está procurando não existe ou foi movida.</p>
      <button
        className="cursor-pointer mt-8 px-6 py-3 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
        onClick={() => navigate('/')}
      >
        <i className="bi bi-arrow-left"></i> Voltar para o Dockfolio
      </button>
    </section>
  )
}