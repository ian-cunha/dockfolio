/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import { storeApp } from "../config/firebase"
import { useState } from "react"
import { useEffect } from "react"
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom"

export const Link = () => {

  const [message, setMessage] = useState(true);
  const navigate = useNavigate();
  let { uid } = useParams()
  const copyUrl = window.location.href.toString()
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

  const clipboard = () => {
    navigator.clipboard.writeText(copyUrl)
    setMessage(
      <div className="message">
        <p><i className="bi bi-share"></i> Copiado!</p>
      </div>
    )
    setTimeout(function () {
      setMessage(false)
    }, 2000)
  }

  return (
    <section className="structure-link">
      {message}
      <div className="structure">
        <div className='printme container'>
          <div className="top">
            {dataBase.photoLink != 0 &&
              <img className="photo" width='150' height='150' src={dataBase.photoLink} alt="Foto de perfil" />
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
                {dataBase.skill != 0 &&
                  <p>{dataBase.skill}</p>
                }
                <p>{dataBase.skill2}</p>
                {dataBase.skill3 != 0 &&
                  <p>{dataBase.skill3}</p>
                }
                {dataBase.skill4 != 0 &&
                  <p>{dataBase.skill4}</p>
                }
                {dataBase.skill5 != 0 &&
                  <p>{dataBase.skill5}</p>
                }
              </div>
            </div>

            <div className="structure-style">
              {dataBase.language != 0 &&
                <h3>Idiomas</h3>
              }
              {dataBase.language != 0 &&
                <p>{dataBase.language}</p>
              }
              {dataBase.language2 != 0 &&
                <p>{dataBase.language2}</p>
              }
              {dataBase.language3 != 0 &&
                <p>{dataBase.language3}</p>
              }
            </div>

          </div>

        </div>
      </div>
      <div className="linkDown">
        <button className="btn-nav no-printme back-profile" onClick={() => navigate('/')}><i className="bi bi-box-arrow-up-left"></i> App</button>
        <button className="btn-nav no-printme back-profile" onClick={clipboard}><i className="bi bi-copy"></i> Copiar</button>
        <button className="btn-nav no-printme back-profile" onClick={() => window.print()}><i className="bi bi-cloud-arrow-down"></i> Download</button>
      </div>
    </section>
  )
}