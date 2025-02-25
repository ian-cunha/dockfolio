/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { auth, storeApp } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const RenderSection = ({ title, fields, data, isGrid }) => {
  const hasContent = fields.some(field => data[field]);
  return hasContent && (
    <div className={`structure-style ${isGrid ? 'grid-layout' : ''}`}>
      <h3>{title}</h3>
      <div className={isGrid ? 'grid-container' : ''}>
        {fields.map(field => data[field] && <p key={field}>{data[field]}</p>)}
      </div>
    </div>
  );
};

export const Structure = () => {
  const [dataBase, setDataBase] = useState({});
  const uid = auth.currentUser?.uid;

  useEffect(() => {
    const getDataBase = async () => {
      const docSnap = await getDoc(doc(storeApp, "profiles", uid));
      docSnap.exists() && setDataBase(docSnap.data());
    };
    uid && getDataBase();
  }, [uid]);

  const personalInfo = [
    { icon: 'briefcase', value: dataBase.func },
    { icon: 'telephone', value: dataBase.number },
    { icon: 'envelope', value: dataBase.email },
    { icon: 'geo-alt', value: dataBase.address }
  ];

  const sections = [
    { title: 'Resumo', field: 'resume' },
    { 
      title: 'Experiência', 
      fields: Array.from({ length: 5 }, (_, i) => `experience${i || ''}`) 
    },
    { 
      title: 'Formação', 
      fields: Array.from({ length: 5 }, (_, i) => `formation${i || ''}`) 
    },
    { 
      title: 'Competências', 
      fields: Array.from({ length: 5 }, (_, i) => `skill${i || ''}`),
      isGrid: true
    },
    { 
      title: 'Idiomas', 
      fields: Array.from({ length: 3 }, (_, i) => `language${i || ''}`),
      isGrid: true
    }
  ];

  return (
    <div className="structure">
      <div className='printme container'>
        <h2 className='dataDisplay no-printme'>
          <i className="bi bi-person-bounding-box"></i> Dados do Usuário
        </h2>

        <div className={`top ${dataBase.photoLink ? 'with-photo' : 'no-photo'}`}>
          {dataBase.photoLink && (
            <img className="photo" width='150' height='150' 
              src={dataBase.photoLink} alt="Foto de perfil" />
          )}
          
          <div className="structure-top">
            <p className="name-top">{dataBase.fullName}</p>
            {personalInfo.map(({ icon, value }) => value && (
              <p key={icon} className="title-top">
                <i className={`bi bi-${icon}`}></i> {value}
              </p>
            ))}
          </div>
        </div>

        <div className="data">
          {sections.map((section, i) => section.field ? (
            dataBase[section.field] && (
              <div key={i} className="structure-style">
                <h3>{section.title}</h3>
                <p>{dataBase[section.field]}</p>
              </div>
            )
          ) : (
            <RenderSection key={i} {...section} data={dataBase} />
          ))}
        </div>
      </div>
    </div>
  );
};

