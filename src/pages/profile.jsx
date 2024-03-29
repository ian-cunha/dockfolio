/* eslint-disable react-hooks/exhaustive-deps */
import { auth, storeApp } from "../config/firebase"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { NavBar } from "../components/navbar";
import { useEffect } from "react"
import { doc, updateDoc, setDoc, getDoc } from "firebase/firestore";

export const Profile = () => {

  const bugMsg = ' Erro, sem dados ou dados iguais.'
  const sucessMsg = ' Atualizado com sucesso!'

  const [displayName, setDisplayName] = useState('')

  const [fullName, setFullName] = useState('')
  const [photoLink, setPhotoLink] = useState('')
  const [emailData, setEmailData] = useState('')
  const [func, setFunction] = useState('')
  const [number, setNumber] = useState('')
  const [address, setAddress] = useState('')

  const [resume, setResume] = useState('')

  const [experience, setExperience] = useState('')
  const [experience2, setExperience2] = useState('')
  const [experience3, setExperience3] = useState('')
  const [experience4, setExperience4] = useState('')
  const [experience5, setExperience5] = useState('')

  const [formation, setFormation] = useState('')
  const [formation2, setFormation2] = useState('')
  const [formation3, setFormation3] = useState('')
  const [formation4, setFormation4] = useState('')
  const [formation5, setFormation5] = useState('')

  const [skill, setSkill] = useState('')
  const [skill2, setSkill2] = useState('')
  const [skill3, setSkill3] = useState('')
  const [skill4, setSkill4] = useState('')
  const [skill5, setSkill5] = useState('')

  const [language, setLanguage] = useState('')
  const [language2, setLanguage2] = useState('')
  const [language3, setLanguage3] = useState('')

  const handleDisplayName = (event) => setDisplayName(event.target.value)

  const handleFullName = (event) => setFullName(event.target.value)
  const handlePhotoLink = (event) => setPhotoLink(event.target.value)
  const handleEmailData = (event) => setEmailData(event.target.value)
  const handleFunction = (event) => setFunction(event.target.value)
  const handleNumber = (event) => setNumber(event.target.value)
  const handleAddress = (event) => setAddress(event.target.value)

  const handleResume = (event) => setResume(event.target.value)
  const handleExperience = (event) => setExperience(event.target.value)
  const handleExperience2 = (event) => setExperience2(event.target.value)
  const handleExperience3 = (event) => setExperience3(event.target.value)
  const handleExperience4 = (event) => setExperience4(event.target.value)
  const handleExperience5 = (event) => setExperience5(event.target.value)
  const handleFormation = (event) => setFormation(event.target.value)
  const handleFormation2 = (event) => setFormation2(event.target.value)
  const handleFormation3 = (event) => setFormation3(event.target.value)
  const handleFormation4 = (event) => setFormation4(event.target.value)
  const handleFormation5 = (event) => setFormation5(event.target.value)

  const handleSkill = (event) => setSkill(event.target.value)
  const handleSkill2 = (event) => setSkill2(event.target.value)
  const handleSkill3 = (event) => setSkill3(event.target.value)
  const handleSkill4 = (event) => setSkill4(event.target.value)
  const handleSkill5 = (event) => setSkill5(event.target.value)

  const handleLanguage = (event) => setLanguage(event.target.value)
  const handleLanguage2 = (event) => setLanguage2(event.target.value)
  const handleLanguage3 = (event) => setLanguage3(event.target.value)

  const [message, setMessage] = useState(true);

  const handleUpdateName = async (event) => {
    if (displayName != 0) {
      event.preventDefault()

      updateProfile(auth.currentUser, {
        displayName: displayName,
      }).then(() => {
        setMessage(
          <div className="message">
            <p><i className="bi bi-patch-check"></i>{sucessMsg}</p>
          </div>
        )
        setTimeout(function () {
          setMessage(false)
        }, 2000)
      }).catch((error) => {
        alert(error)
      });
    } else {
      event.preventDefault()

      setMessage(
        <div className="messageError">
          <p><i className="bi bi-bug"></i>{bugMsg}</p>
        </div>
      )
      setTimeout(function () {
        setMessage(false)
      }, 2000)
    }
  }

  const navigate = useNavigate();
  const user = auth.currentUser;
  const email = user.email;
  const name = user.displayName;
  const uid = user.uid;

  const updateFullName = async (event) => {
    if (fullName != 0) {
      event.preventDefault()

      await updateDoc(doc(storeApp, "profiles", uid), {
        fullName: fullName,
      });
      setMessage(
        <div className="message">
          <p><i className="bi bi-patch-check"></i>{sucessMsg}</p>
        </div>
      )
      setTimeout(function () {
        setMessage(false)
      }, 2000)
    } else {
      event.preventDefault()

      setMessage(
        <div className="messageError">
          <p><i className="bi bi-bug"></i>{bugMsg}</p>
        </div>
      )
      setTimeout(function () {
        setMessage(false)
      }, 2000)
    }
  }

  const updatePhotoLink = async (event) => {
    event.preventDefault()

    await updateDoc(doc(storeApp, "profiles", uid), {
      photoLink: photoLink,
    });
    setMessage(
      <div className="message">
        <p><i className="bi bi-patch-check"></i>{sucessMsg}</p>
      </div>
    )
    setTimeout(function () {
      setMessage(false)
    }, 2000)
  }

  const updateFunc = async (event) => {
    if (func != 0) {
      event.preventDefault()

      await updateDoc(doc(storeApp, "profiles", uid), {
        func: func,
      });
      setMessage(
        <div className="message">
          <p><i className="bi bi-patch-check"></i>{sucessMsg}</p>
        </div>
      )
      setTimeout(function () {
        setMessage(false)
      }, 2000)
    } else {
      event.preventDefault()

      setMessage(
        <div className="messageError">
          <p><i className="bi bi-bug"></i>{bugMsg}</p>
        </div>
      )
      setTimeout(function () {
        setMessage(false)
      }, 2000)
    }

  }

  const updateEmail = async (event) => {
    if (emailData != 0) {
      event.preventDefault()

      await updateDoc(doc(storeApp, "profiles", uid), {
        email: emailData,
      });
      setMessage(
        <div className="message">
          <p><i className="bi bi-patch-check"></i>{sucessMsg}</p>
        </div>
      )
      setTimeout(function () {
        setMessage(false)
      }, 2000)
    } else {
      event.preventDefault()

      setMessage(
        <div className="messageError">
          <p><i className="bi bi-bug"></i>{bugMsg}</p>
        </div>
      )
      setTimeout(function () {
        setMessage(false)
      }, 2000)
    }
  }

  const updateNumber = async (event) => {
    if (number != 0) {
      event.preventDefault()

      await updateDoc(doc(storeApp, "profiles", uid), {
        number: number,
      });
      setMessage(
        <div className="message">
          <p><i className="bi bi-patch-check"></i>{sucessMsg}</p>
        </div>
      )
      setTimeout(function () {
        setMessage(false)
      }, 2000)
    } else {
      event.preventDefault()

      setMessage(
        <div className="messageError">
          <p><i className="bi bi-bug"></i>{bugMsg}</p>
        </div>
      )
      setTimeout(function () {
        setMessage(false)
      }, 2000)
    }

  }

  const updateAdress = async (event) => {
    if (address != 0) {
      event.preventDefault()

      await updateDoc(doc(storeApp, "profiles", uid), {
        address: address,
      });
      setMessage(
        <div className="message">
          <p><i className="bi bi-patch-check"></i>{sucessMsg}</p>
        </div>
      )
      setTimeout(function () {
        setMessage(false)
      }, 2000)
    } else {
      event.preventDefault()

      setMessage(
        <div className="messageError">
          <p><i className="bi bi-bug"></i>{bugMsg}</p>
        </div>
      )
      setTimeout(function () {
        setMessage(false)
      }, 2000)
    }
  }

  const updateResume = async (event) => {
    if (resume != 0) {
      event.preventDefault()

      await updateDoc(doc(storeApp, "profiles", uid), {
        resume: resume,
      });
      setMessage(
        <div className="message">
          <p><i className="bi bi-patch-check"></i>{sucessMsg}</p>
        </div>
      )
      setTimeout(function () {
        setMessage(false)
      }, 2000)
    } else {
      event.preventDefault()

      setMessage(
        <div className="messageError">
          <p><i className="bi bi-bug"></i>{bugMsg}</p>
        </div>
      )
      setTimeout(function () {
        setMessage(false)
      }, 2000)
    }
  }

  const updateExperience = async (event) => {
    if (experience != 0) {
      event.preventDefault()

      await updateDoc(doc(storeApp, "profiles", uid), {
        experience: experience,
      });
      setMessage(
        <div className="message">
          <p><i className="bi bi-patch-check"></i>{sucessMsg}</p>
        </div>
      )
      setTimeout(function () {
        setMessage(false)
      }, 2000)
    } else {
      event.preventDefault()

      setMessage(
        <div className="messageError">
          <p><i className="bi bi-bug"></i>{bugMsg}</p>
        </div>
      )
      setTimeout(function () {
        setMessage(false)
      }, 2000)
    }

  }

  const updateExperience2 = async (event) => {
    if (experience2 != 0) {
      event.preventDefault()

      await updateDoc(doc(storeApp, "profiles", uid), {
        experience2: experience2,
      });
      setMessage(
        <div className="message">
          <p><i className="bi bi-patch-check"></i>{sucessMsg}</p>
        </div>
      )
      setTimeout(function () {
        setMessage(false)
      }, 2000)
    } else {
      event.preventDefault()

      setMessage(
        <div className="messageError">
          <p><i className="bi bi-bug"></i>{bugMsg}</p>
        </div>
      )
      setTimeout(function () {
        setMessage(false)
      }, 2000)
    }
  }

  const updateExperience3 = async (event) => {
    if (experience3 != 0) {
      event.preventDefault()

      await updateDoc(doc(storeApp, "profiles", uid), {
        experience3: experience3,
      });
      setMessage(
        <div className="message">
          <p><i className="bi bi-patch-check"></i>{sucessMsg}</p>
        </div>
      )
      setTimeout(function () {
        setMessage(false)
      }, 2000)
    } else {
      event.preventDefault()

      setMessage(
        <div className="messageError">
          <p><i className="bi bi-bug"></i>{bugMsg}</p>
        </div>
      )
      setTimeout(function () {
        setMessage(false)
      }, 2000)
    }
  }

  const updateExperience4 = async (event) => {
    if (experience4 != 0) {
      event.preventDefault()

      await updateDoc(doc(storeApp, "profiles", uid), {
        experience4: experience4,
      });
      setMessage(
        <div className="message">
          <p><i className="bi bi-patch-check"></i>{sucessMsg}</p>
        </div>
      )
      setTimeout(function () {
        setMessage(false)
      }, 2000)
    } else {
      event.preventDefault()

      setMessage(
        <div className="messageError">
          <p><i className="bi bi-bug"></i>{bugMsg}</p>
        </div>
      )
      setTimeout(function () {
        setMessage(false)
      }, 2000)
    }
  }

  const updateExperience5 = async (event) => {
    if (experience5 != 0) {
      event.preventDefault()

      await updateDoc(doc(storeApp, "profiles", uid), {
        experience5: experience5,
      });
      setMessage(
        <div className="message">
          <p><i className="bi bi-patch-check"></i>{sucessMsg}</p>
        </div>
      )
      setTimeout(function () {
        setMessage(false)
      }, 2000)
    } else {
      event.preventDefault()

      setMessage(
        <div className="messageError">
          <p><i className="bi bi-bug"></i>{bugMsg}</p>
        </div>
      )
      setTimeout(function () {
        setMessage(false)
      }, 2000)
    }
  }

  const updateFormation = async (event) => {
    if (formation != 0) {
      event.preventDefault()

      await updateDoc(doc(storeApp, "profiles", uid), {
        formation: formation,
      });
      setMessage(
        <div className="message">
          <p><i className="bi bi-patch-check"></i>{sucessMsg}</p>
        </div>
      )
      setTimeout(function () {
        setMessage(false)
      }, 2000)
    } else {
      event.preventDefault()

      setMessage(
        <div className="messageError">
          <p><i className="bi bi-bug"></i>{bugMsg}</p>
        </div>
      )
      setTimeout(function () {
        setMessage(false)
      }, 2000)
    }

  }

  const updateFormation2 = async (event) => {
    if (formation2 != 0) {
      event.preventDefault()

      await updateDoc(doc(storeApp, "profiles", uid), {
        formation2: formation2,
      });
      setMessage(
        <div className="message">
          <p><i className="bi bi-patch-check"></i>{sucessMsg}</p>
        </div>
      )
      setTimeout(function () {
        setMessage(false)
      }, 2000)
    } else {
      event.preventDefault()

      setMessage(
        <div className="messageError">
          <p><i className="bi bi-bug"></i>{bugMsg}</p>
        </div>
      )
      setTimeout(function () {
        setMessage(false)
      }, 2000)
    }

  }

  const updateFormation3 = async (event) => {
    if (formation3 != 0) {
      event.preventDefault()

      await updateDoc(doc(storeApp, "profiles", uid), {
        formation3: formation3,
      });
      setMessage(
        <div className="message">
          <p><i className="bi bi-patch-check"></i>{sucessMsg}</p>
        </div>
      )
      setTimeout(function () {
        setMessage(false)
      }, 2000)
    } else {
      event.preventDefault()

      setMessage(
        <div className="messageError">
          <p><i className="bi bi-bug"></i>{bugMsg}</p>
        </div>
      )
      setTimeout(function () {
        setMessage(false)
      }, 2000)
    }
  }

  const updateFormation4 = async (event) => {
    if (formation4 != 0) {
      event.preventDefault()

      await updateDoc(doc(storeApp, "profiles", uid), {
        formation4: formation4,
      });
      setMessage(
        <div className="message">
          <p><i className="bi bi-patch-check"></i>{sucessMsg}</p>
        </div>
      )
      setTimeout(function () {
        setMessage(false)
      }, 2000)
    } else {
      event.preventDefault()

      setMessage(
        <div className="messageError">
          <p><i className="bi bi-bug"></i>{bugMsg}</p>
        </div>
      )
      setTimeout(function () {
        setMessage(false)
      }, 2000)
    }

  }

  const updateFormation5 = async (event) => {
    event.preventDefault()

    await updateDoc(doc(storeApp, "profiles", uid), {
      formation5: formation5,
    });
    setMessage(
      <div className="message">
        <p><i className="bi bi-patch-check"></i>{sucessMsg}</p>
      </div>
    )
    setTimeout(function () {
      setMessage(false)
    }, 2000)
  }

  const updateSkill = async (event) => {
    if (skill != 0) {
      event.preventDefault()

      await updateDoc(doc(storeApp, "profiles", uid), {
        skill: skill,
      });
      setMessage(
        <div className="message">
          <p><i className="bi bi-patch-check"></i>{sucessMsg}</p>
        </div>
      )
      setTimeout(function () {
        setMessage(false)
      }, 2000)
    } else {
      event.preventDefault()

      setMessage(
        <div className="messageError">
          <p><i className="bi bi-bug"></i>{bugMsg}</p>
        </div>
      )
      setTimeout(function () {
        setMessage(false)
      }, 2000)
    }
  }

  const updateSkill2 = async (event) => {
    if (skill2 != 0) {
      event.preventDefault()

      await updateDoc(doc(storeApp, "profiles", uid), {
        skill2: skill2,
      });
      setMessage(
        <div className="message">
          <p><i className="bi bi-patch-check"></i>{sucessMsg}</p>
        </div>
      )
      setTimeout(function () {
        setMessage(false)
      }, 2000)
    } else {
      event.preventDefault()

      setMessage(
        <div className="messageError">
          <p><i className="bi bi-bug"></i>{bugMsg}</p>
        </div>
      )
      setTimeout(function () {
        setMessage(false)
      }, 2000)
    }
  }

  const updateSkill3 = async (event) => {
    if (skill3 != 0) {
      event.preventDefault()

      await updateDoc(doc(storeApp, "profiles", uid), {
        skill3: skill3,
      });
      setMessage(
        <div className="message">
          <p><i className="bi bi-patch-check"></i>{sucessMsg}</p>
        </div>
      )
      setTimeout(function () {
        setMessage(false)
      }, 2000)
    } else {
      event.preventDefault()

      setMessage(
        <div className="messageError">
          <p><i className="bi bi-bug"></i>{bugMsg}</p>
        </div>
      )
      setTimeout(function () {
        setMessage(false)
      }, 2000)
    }

  }

  const updateSkill4 = async (event) => {
    if (skill4 != 0) {
      event.preventDefault()

      await updateDoc(doc(storeApp, "profiles", uid), {
        skill4: skill4,
      });
      setMessage(
        <div className="message">
          <p><i className="bi bi-patch-check"></i>{sucessMsg}</p>
        </div>
      )
      setTimeout(function () {
        setMessage(false)
      }, 2000)
    } else {
      event.preventDefault()

      setMessage(
        <div className="messageError">
          <p><i className="bi bi-bug"></i>{bugMsg}</p>
        </div>
      )
      setTimeout(function () {
        setMessage(false)
      }, 2000)
    }
  }

  const updateSkill5 = async (event) => {
    if (skill5 != 0) {
      event.preventDefault()

      await updateDoc(doc(storeApp, "profiles", uid), {
        skill5: skill5,
      });
      setMessage(
        <div className="message">
          <p><i className="bi bi-patch-check"></i>{sucessMsg}</p>
        </div>
      )
      setTimeout(function () {
        setMessage(false)
      }, 2000)
    } else {
      event.preventDefault()

      setMessage(
        <div className="messageError">
          <p><i className="bi bi-bug"></i>{bugMsg}</p>
        </div>
      )
      setTimeout(function () {
        setMessage(false)
      }, 2000)
    }

  }

  const updateLanguage = async (event) => {
    if (language != 0) {
      event.preventDefault()

      await updateDoc(doc(storeApp, "profiles", uid), {
        language: language,
      });
      setMessage(
        <div className="message">
          <p><i className="bi bi-patch-check"></i>{sucessMsg}</p>
        </div>
      )
      setTimeout(function () {
        setMessage(false)
      }, 2000)
    } else {
      event.preventDefault()

      setMessage(
        <div className="messageError">
          <p><i className="bi bi-bug"></i>{bugMsg}</p>
        </div>
      )
      setTimeout(function () {
        setMessage(false)
      }, 2000)
    }
  }

  const updateLanguage2 = async (event) => {
    if (language2 != 0) {
      event.preventDefault()

      await updateDoc(doc(storeApp, "profiles", uid), {
        language2: language2,
      });
      setMessage(
        <div className="message">
          <p><i className="bi bi-patch-check"></i>{sucessMsg}</p>
        </div>
      )
      setTimeout(function () {
        setMessage(false)
      }, 2000)
    } else {
      event.preventDefault()

      setMessage(
        <div className="messageError">
          <p><i className="bi bi-bug"></i>{bugMsg}</p>
        </div>
      )
      setTimeout(function () {
        setMessage(false)
      }, 2000)
    }
  }

  const updateLanguage3 = async (event) => {
    if (language3 != 0) {
      event.preventDefault()

      await updateDoc(doc(storeApp, "profiles", uid), {
        language3: language3,
      });
      setMessage(
        <div className="message">
          <p><i className="bi bi-patch-check"></i>{sucessMsg}</p>
        </div>
      )
      setTimeout(function () {
        setMessage(false)
      }, 2000)
    } else {
      event.preventDefault()

      setMessage(
        <div className="messageError">
          <p><i className="bi bi-bug"></i>{bugMsg}</p>
        </div>
      )
      setTimeout(function () {
        setMessage(false)
      }, 2000)
    }

  }

  {/*
  const newDoc = async (event) => {
    event.preventDefault()

    await updateDoc(doc(storeApp, "profiles", uid), {
      skill: skill,
    });
    alert('Atualizado')
  }
*/}

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

  const newUser = async () => {
    if (name === null) {
      await setDoc(doc(storeApp, "profiles", uid), {
        lastUpdate: new Date(),
        fullName: '',
        photoLink: '',
        resume: '',
        language: '',
        number: '',
        func: '',
        formation: '',
        experience: '',
        email: '',
        address: '',
        skill: '',
      });
      setMessage(
        <div className="message">
          <h2>Bem-vindo ao Dockfolio!</h2>
          <p className="messageWelcome">Adicone pelo menos seu apelido para liberar acesso ao aplicativo.</p>
        </div>
      )
      setTimeout(function () {
        setMessage(false)
      }, 8000)
    }
  }

  useEffect(() => {
    getDataBase()
    newUser()
  }, [])

  return (
    <section>
      <NavBar />
      <div className="dockfolioPage">
        <h2>Configurações do perfil</h2>
        <div>
          {dataBase.photoLink != 0 &&
            <img className="photo" width='150' src={dataBase.photoLink} alt="Foto de perfil" />
          }
          <p className="name">{name}</p>
          <p className="email-top">Conta: {email}</p>
        </div>

        {message}

        <h2>Dados do perfil</h2>

        <div className="updateProfile">
          <form className="formData">
            <div className="areaStyle">
              <br />
              <label className="labelHome" htmlFor="name">Apelido</label><br />
              <input className="inputProfile" type="name" id="name" defaultValue={name} placeholder="Nome do usuário (obrigatório)" onChange={handleDisplayName} />
              <button className="btn-profile" type="submit" onClick={handleUpdateName}><i className="bi bi-check-lg"></i> Aplicar</button>
              <br />
            </div>
            <div className="areaStyle">
              <br />
              <label className="labelHome" htmlFor="fullName">Nome completo</label><br />
              <input className="inputProfile" type="name" id="fullName" defaultValue={dataBase.fullName} placeholder="Nome do usuário (obrigatório)" onChange={handleFullName} />
              <button className="btn-profile" type="submit" onClick={updateFullName}><i className="bi bi-check-lg"></i> Aplicar</button>
              <br />
            </div>
            <div className="areaStyle">
              <br />
              <label className="labelHome" htmlFor="photo">Foto</label><br />
              <input className="inputProfile" type="text" id="photo" defaultValue={dataBase.photoLink} placeholder="URL da foto de perfil" onChange={handlePhotoLink} />
              <button className="btn-profile" type="submit" onClick={updatePhotoLink}><i className="bi bi-check-lg"></i> Aplicar</button>
              <br />
            </div>
            <div className="areaStyle">
              <br />
              <label className="labelHome" htmlFor="function">Função</label><br />
              <input className="inputProfile" type="text" id="function" defaultValue={dataBase.func} placeholder="Função" onChange={handleFunction} />
              <button className="btn-profile" type="submit" onClick={updateFunc}><i className="bi bi-check-lg"></i> Aplicar</button>
              <br />
            </div>
            <div className="areaStyle">
              <br />
              <label className="labelHome" htmlFor="emailData">E-mail</label><br />
              <input className="inputProfile" type="email" id="emailData" defaultValue={dataBase.email} placeholder="E-mail" onChange={handleEmailData} />
              <button className="btn-profile" type="submit" onClick={updateEmail}><i className="bi bi-check-lg"></i> Aplicar</button>
              <br />
            </div>
            <div className="areaStyle">
              <br />
              <label className="labelHome" htmlFor="number">Número</label><br />
              <input className="inputProfile" type="tel" id="number" defaultValue={dataBase.number} placeholder="(99) 9999-9999" onChange={handleNumber} />
              <button className="btn-profile" type="submit" onClick={updateNumber}><i className="bi bi-check-lg"></i> Aplicar</button>
              <br />
            </div>
            <div className="areaStyle">
              <br />
              <label className="labelHome" htmlFor="address">Endereço</label><br />
              <input className="inputProfile" type="text" id="address" defaultValue={dataBase.address} placeholder="Endereço" onChange={handleAddress} />
              <button className="btn-profile" type="submit" onClick={updateAdress}><i className="bi bi-check-lg"></i> Aplicar</button>
              <br />
            </div>
            <div className="areaStyle">
              <br />
              <label className="labelHome" htmlFor="title">Resumo</label>
              <br />
              <textarea className="inputProfile" type="text" id="title" defaultValue={dataBase.resume} placeholder="Resumo" onChange={handleResume} />
              <button className="btn-profile" type="submit" onClick={updateResume}><i className="bi bi-check-lg"></i> Aplicar</button>
            </div>
            <div className="areaStyle">
              <br />
              <label className="labelHome" htmlFor="experience">Experiência</label>
              <br />
              <textarea className="inputProfile" type="text" id="experience" defaultValue={dataBase.experience} placeholder="Experiência" onChange={handleExperience} />
              <button className="btn-profile" type="submit" onClick={updateExperience}><i className="bi bi-check-lg"></i> Aplicar</button>
            </div>
            <div className="areaStyle">
              <br />
              <label className="labelHome" htmlFor="experience">Experiência 2</label>
              <br />
              <textarea className="inputProfile" type="text" id="experience" defaultValue={dataBase.experience2} placeholder="Experiência 2" onChange={handleExperience2} />
              <button className="btn-profile" type="submit" onClick={updateExperience2}><i className="bi bi-check-lg"></i> Aplicar</button>
            </div>
            <div className="areaStyle">
              <br />
              <label className="labelHome" htmlFor="experience">Experiência 3</label>
              <br />
              <textarea className="inputProfile" type="text" id="experience" defaultValue={dataBase.experience3} placeholder="Experiência 3" onChange={handleExperience3} />
              <button className="btn-profile" type="submit" onClick={updateExperience3}><i className="bi bi-check-lg"></i> Aplicar</button>
            </div>
            <div className="areaStyle">
              <label className="labelHome" htmlFor="experience">Experiência 4</label><br />
              <textarea className="inputProfile" type="text" id="experience" defaultValue={dataBase.experience4} placeholder="Experiência 4" onChange={handleExperience4} />
              <button className="btn-profile" type="submit" onClick={updateExperience4}><i className="bi bi-check-lg"></i> Aplicar</button>
            </div>
            <div className="areaStyle">
              <br />
              <label className="labelHome" htmlFor="experience">Experiência 5</label>
              <br />
              <textarea className="inputProfile" type="text" id="experience" defaultValue={dataBase.experience5} placeholder="Experiência 5" onChange={handleExperience5} />
              <button className="btn-profile" type="submit" onClick={updateExperience5}><i className="bi bi-check-lg"></i> Aplicar</button>
            </div>
            <div className="areaStyle">
              <br />
              <label className="labelHome" htmlFor="formation">Formação</label>
              <br />
              <textarea className="inputProfile" type="text" id="formation" defaultValue={dataBase.formation} placeholder="Formação" onChange={handleFormation} />
              <button className="btn-profile" type="submit" onClick={updateFormation}><i className="bi bi-check-lg"></i> Aplicar</button>
            </div>
            <div className="areaStyle">
              <br />
              <label className="labelHome" htmlFor="formation">Formação 2</label>
              <br />
              <textarea className="inputProfile" type="text" id="formation" defaultValue={dataBase.formation2} placeholder="Formação 2" onChange={handleFormation2} />
              <button className="btn-profile" type="submit" onClick={updateFormation2}><i className="bi bi-check-lg"></i> Aplicar</button>
            </div>
            <div className="areaStyle">
              <br />
              <label className="labelHome" htmlFor="formation">Formação 3</label>
              <br />
              <textarea className="inputProfile" type="text" id="formation" defaultValue={dataBase.formation3} placeholder="Formação 3" onChange={handleFormation3} />
              <button className="btn-profile" type="submit" onClick={updateFormation3}><i className="bi bi-check-lg"></i> Aplicar</button>
            </div>
            <div className="areaStyle">
              <br />
              <label className="labelHome" htmlFor="formation">Formação 4</label>
              <br />
              <textarea className="inputProfile" type="text" id="formation" defaultValue={dataBase.formation4} placeholder="Formação 4" onChange={handleFormation4} />
              <button className="btn-profile" type="submit" onClick={updateFormation4}><i className="bi bi-check-lg"></i> Aplicar</button>
            </div>
            <div className="areaStyle">
              <br />
              <label className="labelHome" htmlFor="formation">Formação 5</label>
              <br />
              <textarea className="inputProfile" type="text" id="formation" defaultValue={dataBase.formation5} placeholder="Formação 5" onChange={handleFormation5} />
              <button className="btn-profile" type="submit" onClick={updateFormation5}><i className="bi bi-check-lg"></i> Aplicar</button>
            </div>
            <div className="areaStyle">
              <br />
              <label className="labelHome" htmlFor="skill">Competência</label>
              <br />
              <input className="inputProfile" type="text" id="skill" defaultValue={dataBase.skill} placeholder="Competência" onChange={handleSkill} />
              <button className="btn-profile" type="submit" onClick={updateSkill}><i className="bi bi-check-lg"></i> Aplicar</button>
            </div>
            <div className="areaStyle">
              <br />
              <label className="labelHome" htmlFor="skill">Competência 2</label>
              <br />
              <input className="inputProfile" type="text" id="skill" defaultValue={dataBase.skill2} placeholder="Competência 2" onChange={handleSkill2} />
              <button className="btn-profile" type="submit" onClick={updateSkill2}><i className="bi bi-check-lg"></i> Aplicar</button>
            </div>
            <div className="areaStyle">
              <br />
              <label className="labelHome" htmlFor="skill">Competência 3</label>
              <br />
              <input className="inputProfile" type="text" id="skill" defaultValue={dataBase.skill3} placeholder="Competência 3" onChange={handleSkill3} />
              <button className="btn-profile" type="submit" onClick={updateSkill3}><i className="bi bi-check-lg"></i> Aplicar</button>
            </div>
            <div className="areaStyle">
              <br />
              <label className="labelHome" htmlFor="skill">Competência 4</label>
              <br />
              <input className="inputProfile" type="text" id="skill" defaultValue={dataBase.skill4} placeholder="Competência 4" onChange={handleSkill4} />
              <button className="btn-profile" type="submit" onClick={updateSkill4}><i className="bi bi-check-lg"></i> Aplicar</button>
            </div>
            <div className="areaStyle">
              <br />
              <label className="labelHome" htmlFor="skill">Competência 5</label>
              <br />
              <input className="inputProfile" type="text" id="skill" defaultValue={dataBase.skill5} placeholder="Competência 5" onChange={handleSkill5} />
              <button className="btn-profile" type="submit" onClick={updateSkill5}><i className="bi bi-check-lg"></i> Aplicar</button>
            </div>
            <div className="areaStyle">
              <br />
              <label className="labelHome" htmlFor="language">Idioma</label>
              <br />
              <input className="inputProfile" type="text" id="language" defaultValue={dataBase.language} placeholder="Idioma" onChange={handleLanguage} />
              <button className="btn-profile" type="submit" onClick={updateLanguage}><i className="bi bi-check-lg"></i> Aplicar</button>
            </div>
            <div className="areaStyle">
              <br />
              <label className="labelHome" htmlFor="language">Idioma 2</label>
              <br />
              <input className="inputProfile" type="text" id="language" defaultValue={dataBase.language2} placeholder="Idioma 2" onChange={handleLanguage2} />
              <button className="btn-profile" type="submit" onClick={updateLanguage2}><i className="bi bi-check-lg"></i> Aplicar</button>
            </div>
            <div className="areaStyle">
              <br />
              <label className="labelHome" htmlFor="language">Idioma 3</label>
              <br />
              <input className="inputProfile" type="text" id="language" defaultValue={dataBase.language3} placeholder="Idioma 3" onChange={handleLanguage3} />
              <button className="btn-profile" type="submit" onClick={updateLanguage3}><i className="bi bi-check-lg"></i> Aplicar</button>
              <br /><br /><br />
            </div>
          </form>
        </div>

        <button className="btn-profile back-profile" onClick={() => navigate('/private')}><i className="bi bi-arrow-left-circle"></i> Voltar</button>
      </div>
    </section>
  )
}