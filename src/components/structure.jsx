/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { auth, storeApp } from "../config/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

// --- COMPONENTES DE RENDERIZAÇÃO ---

// Componente para renderizar um item de Projeto
const ProjectListItem = ({ item }) => (
  <div className="mb-4 break-inside-avoid">
    <div className="flex items-center gap-4">
      <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">{item.name}</h4>
      {item.link && (
        <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:underline">
          Ver Projeto <i className="bi bi-box-arrow-up-right text-xs"></i>
        </a>
      )}
    </div>
    {item.description && <p className="mt-1 text-gray-700 dark:text-gray-300">{item.description}</p>}
  </div>
);

// Componente para renderizar um item de Experiência ou Formação
const StructuredListItem = ({ item }) => (
  <div className="mb-4 break-inside-avoid">
    <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">{item.title}</h4>
    <p className="font-semibold text-indigo-600 dark:text-indigo-400">{item.subtitle}</p>
    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
      <span>{item.period}</span>
      {item.location && <span> &middot; {item.location}</span>}
    </div>
    {item.description && <p className="mt-2 text-gray-700 dark:text-gray-300">{item.description}</p>}
  </div>
);

// Componente principal para renderizar as seções
const RenderListSection = ({ title, items, isGrid, isStructured, isProject }) => {
  if (!items || items.length === 0 || items.every(item => !item)) return null;

  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-200 dark:border-indigo-800 pb-2 mb-4">{title}</h3>

      {isProject ? (
        <div className="space-y-4">{items.map((item, index) => item.name && <ProjectListItem key={index} item={item} />)}</div>
      ) : isStructured ? (
        <div className="space-y-4">{items.map((item, index) => item.title && <StructuredListItem key={index} item={item} />)}</div>
      ) : title === "Links" ? (
        <div className="space-y-2">{items.map((item, index) => item && (<a href={item} target="_blank" rel="noopener noreferrer" key={index} className="flex items-center text-gray-700 dark:text-gray-300 hover:text-indigo-500 transition-colors group"> <i className="bi bi-link-45deg mr-3 text-indigo-500"></i> <span className="group-hover:underline break-words">{item}</span> </a>))}</div>
      ) : isGrid ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3">{items.map((item, index) => item && (<div key={index} className="flex items-center bg-indigo-50 dark:bg-gray-700 p-2 rounded-lg"> <i className="bi bi-check-circle-fill text-indigo-500 mr-3"></i> <p className="flex-1 text-gray-800 dark:text-gray-200">{item}</p> </div>))}</div>
      ) : (
        <ul className="list-disc pl-5 space-y-2">{items.map((item, index) => item && (<li key={index} className="text-gray-700 dark:text-gray-300">{item}</li>))}</ul>
      )}
    </div>
  );
};

const RenderTextSection = ({ title, content }) => {
  if (!content) return null;
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-200 dark:border-indigo-800 pb-2 mb-4">{title}</h3>
      <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{content}</p>
    </div>
  );
};

export const Structure = () => {
  const [dataBase, setDataBase] = useState(null);
  const uid = auth.currentUser?.uid;

  useEffect(() => {
    if (!uid) return;
    const unsubscribe = onSnapshot(doc(storeApp, "profiles", uid), (docSnap) => {
      if (docSnap.exists()) setDataBase(docSnap.data());
    });
    return () => unsubscribe();
  }, [uid]);

  const personalInfo = [
    { icon: 'bi-briefcase-fill', value: dataBase?.func },
    { icon: 'bi-telephone-fill', value: dataBase?.number },
    { icon: 'bi-envelope-fill', value: dataBase?.emailData },
    { icon: 'bi-geo-alt-fill', value: dataBase?.address }
  ];

  if (!dataBase) {
    return (
      <div className="text-center p-10">
        <span className="loader animate-spin border-4 border-t-indigo-500 rounded-full w-8 h-8 inline-block"></span>
        <p className="mt-3 text-gray-500">Carregando dados do currículo...</p>
      </div>
    );
  }

  return (
    <>
      <style>{` @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } .print-container { box-shadow: none !important; margin: 0 !important; } .break-inside-avoid { break-inside: avoid; } } `}</style>
      <div className="print-container container mx-auto max-w-4xl bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-10">
        <header className="flex flex-col sm:flex-row items-center space-y-5 sm:space-y-0 sm:space-x-8 mb-10">
          {dataBase.photoLink && (<img className="w-32 h-32 rounded-full object-cover ring-4 ring-offset-4 ring-offset-gray-100 dark:ring-offset-gray-900 ring-indigo-500" src={dataBase.photoLink} alt="Foto de perfil" />)}
          <div className="text-center sm:text-left">
            <h2 className="text-4xl font-extrabold text-gray-800 dark:text-white">{dataBase.fullName || "Seu Nome Completo"}</h2>
            <div className="mt-3 space-y-1">
              {personalInfo.map(({ icon, value }) => value && (
                <p key={icon} className="text-gray-600 dark:text-gray-400 flex items-center justify-center sm:justify-start gap-3">
                  <i className={`${icon} text-indigo-500`}></i>
                  <span>{value}</span>
                </p>
              ))}
            </div>
          </div>
        </header>

        <div className="data-container">
          <RenderTextSection title="Resumo" content={dataBase.resume} />
          <RenderListSection title="Experiência" items={dataBase.experiences} isStructured={true} />
          <RenderListSection title="Formação" items={dataBase.formations} isStructured={true} />
          <RenderListSection title="Projetos" items={dataBase.projects} isProject={true} />
          <RenderListSection title="Links" items={dataBase.links} />
          <RenderListSection title="Competências" items={dataBase.skills} isGrid={true} />
          <RenderListSection title="Idiomas" items={dataBase.languages} isGrid={true} />
        </div>
      </div>
    </>
  );
};