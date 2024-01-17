/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { auth, storeApp } from "../config/firebase"
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react"

export const Structure = () => {

  const user = auth.currentUser;
  const email = user.email;
  const name = user.displayName;
  const photo = user.photoURL;
  const uid = user.uid;

  const [dataBase, setDataBase] = useState('')

  const getDataBase = async () => {
    const docRef = doc(storeApp, "profiles", uid)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data())
      setDataBase(docSnap.data())
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!")
    }
  }

  useEffect(() => {
    getDataBase()
  }, [])

  return (
    <div className="structure">
      <div className='printme'>
        <h2 className='no-printme'>Dados do Usuário</h2>
        <div className="top">
          {photo != null &&
            <img className="photo" width='150' src={photo} />
          }
          <div>
            <p className="name-top">{name}</p>
            <p className="email-top">{email}</p>
          </div>
        </div>

        <div className="data">
          <div className="resume">
            <h3>Resumo</h3>
            <p>{dataBase.resume}</p>
          </div>

          <div>
            <h3>Experiência</h3>
            <p>{dataBase.experience}</p>
          </div>

          <div>
            <h3>Formação</h3>
            <p>{dataBase.formation}</p>
          </div>
        </div>

      </div>
    </div>
  )
}