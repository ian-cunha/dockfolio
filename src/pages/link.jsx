/* eslint-disable react-hooks/exhaustive-deps */
import { storeApp } from "../config/firebase";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { ResumeDisplay } from "../components/resumeDisplay";
import logo404 from '../assets/404.svg';

export const Link = () => {
  const [dataBase, setDataBase] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const { uid } = useParams();

  useEffect(() => {
    const getDataBase = async () => {
      if (!uid) { setError(true); setLoading(false); return; }
      try {
        const docRef = doc(storeApp, "profiles", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setDataBase(docSnap.data());
        } else {
          setError(true);
        }
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getDataBase();
  }, [uid]);

  const clipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setMessage("Copiado para a área de transferência!");
    setTimeout(() => setMessage(null), 2500);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <span className="loader animate-spin border-4 border-t-indigo-500 rounded-full w-12 h-12 inline-block"></span>
          <h2 className="mt-4 text-xl text-gray-700 dark:text-gray-300">Carregando currículo...</h2>
        </div>
      </div>
    );
  }

  if (error || !dataBase) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-center p-4">
        <img className="w-64 mb-6" src={logo404} alt="Não encontrado" />
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Perfil não encontrado</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">O link que você tentou acessar não existe ou foi removido.</p>
        <button onClick={() => navigate('/')} className="cursor-pointer mt-6 px-6 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors">
          Voltar ao Início
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 py-10 pb-28 print:bg-white print:py-0 print:pb-0">
      {message && <div className="fixed top-5 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white bg-green-500 print:hidden">{message}</div>}

      <main>
        <ResumeDisplay profileData={dataBase} />
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 p-3 shadow-t-lg print:hidden">
        <div className="container mx-auto flex items-center justify-center gap-4">
          <button onClick={() => navigate('/')} className="cursor-pointer px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"><i className="bi bi-box-arrow-up-left"></i> <span className="hidden sm:inline">Criar o seu</span></button>
          <button onClick={clipboard} className="cursor-pointer px-4 py-2 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 transition-colors flex items-center gap-2"><i className="bi bi-copy"></i> <span className="hidden sm:inline">Copiar Link</span></button>
          <button onClick={() => window.print()} className="cursor-pointer px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"><i className="bi bi-cloud-arrow-down"></i> <span className="hidden sm:inline">Download</span></button>
        </div>
      </div>
    </div>
  );
};