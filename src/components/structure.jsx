/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { auth, storeApp } from "../config/firebase"
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react"

export const Structure = () => {

  const user = auth.currentUser;
  const uid = user.uid;

  const [dataBase, setDataBase] = useState('')

  const getDataBase = async () => {
    const docRef = doc(storeApp, "profiles", uid)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      setDataBase(docSnap.data())
    } else {
      console.log("Sem dados!")
    }
  }

  useEffect(() => {
    getDataBase()
  }, [])

  return (
    <div className="structure">
      <div className='printme container'>
        <h2 className='dataDisplay no-printme'><i className="bi bi-person-bounding-box"></i> Dados do Usuário</h2>
        <div className="top">
          {dataBase.photoLink != 0 &&
            <img className="photo" width='150' src={dataBase.photoLink} alt="Foto de perfil" />
          }
          {dataBase.photoLink != 0 &&
            <div className="structure-top">
              <p className="name-top">{dataBase.fullName}</p>
              {dataBase.func != 0 &&
                <p className="title-top"><i className="bi bi-briefcase"></i> {dataBase.func}</p>
              }
              {dataBase.email != 0 &&
                <p className="title-top"><i className="bi bi-envelope"></i> {dataBase.email}</p>
              }
              {dataBase.number != 0 &&
                <p className="title-top"><i className="bi bi-telephone"></i> {dataBase.number}</p>
              }
              {dataBase.address != 0 &&
                <p className="title-top"><i className="bi bi-geo-alt"></i> {dataBase.address}</p>
              }
            </div>
          }
          {dataBase.photoLink == 0 &&
            <div className="structure-top-center">
              <p className="name-top">{dataBase.fullName}</p>
              {dataBase.func != 0 &&
                <p className="title-top"><i className="bi bi-briefcase"></i> {dataBase.func}</p>
              }
              {dataBase.number != 0 &&
                <p className="title-top"><i className="bi bi-telephone"></i> {dataBase.number}</p>
              }
              {dataBase.email != 0 &&
                <p className="title-top"><i className="bi bi-envelope"></i> {dataBase.email}</p>
              }
              {dataBase.address != 0 &&
                <p className="title-top"><i className="bi bi-geo-alt"></i> {dataBase.address}</p>
              }
            </div>
          }
        </div>

        <div className="data">

          <div className="structure-style">
            {dataBase.resume != 0 &&
              <h3>Resumo</h3>
            }
            <p>{dataBase.resume}</p>
          </div>

          <div className="structure-style">
            {dataBase.experience != 0 &&
              <h3>Experiência</h3>
            }
            <p>{dataBase.experience}</p>
            <p>{dataBase.experience2}</p>
            <p>{dataBase.experience3}</p>
            <p>{dataBase.experience4}</p>
            <p>{dataBase.experience5}</p>
          </div>

          <div className="structure-style">
            {dataBase.formation != 0 &&
              <h3>Formação</h3>
            }
            <p>{dataBase.formation}</p>
            <p>{dataBase.formation2}</p>
            <p>{dataBase.formation3}</p>
            <p>{dataBase.formation4}</p>
            <p>{dataBase.formation5}</p>
          </div>

          <div className="structure-style">
            {dataBase.skill != 0 &&
              <h3>Competências</h3>
            }
            <div className="skill">
              <p>{dataBase.skill}</p>
              <p>{dataBase.skill2}</p>
              <p>{dataBase.skill3}</p>
              <p>{dataBase.skill4}</p>
              <p>{dataBase.skill5}</p>
            </div>
          </div>

          <div className="structure-style">
            {dataBase.language != 0 &&
              <h3>Idiomas</h3>
            }
            <p>{dataBase.language}</p>
            <p>{dataBase.language2}</p>
            <p>{dataBase.language3}</p>
          </div>

        </div>

      </div>
    </div>
  )
}