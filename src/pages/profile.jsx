/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { auth, storeApp } from "../config/firebase";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { NavBar } from "../components/navbar";
import { doc, updateDoc, setDoc, getDoc } from "firebase/firestore";

const FieldGroup = ({ label, type, value, placeholder, onChange, onBlur, isTextArea }) => (
  <div className="areaStyle">
    <br />
    <label className="labelHome">{label}</label>
    <br />
    {isTextArea ? (
      <textarea
        className="inputProfile"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />
    ) : (
      <input
        className="inputProfile"
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />
    )}
  </div>
);

export const Profile = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const { email, displayName: name = "", uid } = user;
  const successMsg = "Atualizado com sucesso!";

  const initialFields = {
    displayName: name,
    fullName: "", photoLink: "", emailData: "", func: "", number: "", address: "", resume: "",
    ...Array.from({ length: 5 }, (_, i) => ({
      [`experience${i || ""}`]: "",
      [`formation${i || ""}`]: "",
      [`skill${i || ""}`]: "",
      [`language${i || ""}`]: ""
    })).reduce((a, b) => ({ ...a, ...b }))
  };

  const [profile, setProfile] = useState(initialFields);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  const fieldGroups = [
    { id: 'name', label: 'Nome de usuário', field: 'displayName', required: true },
    { id: 'fullName', label: 'Nome completo (CV)', field: 'fullName', required: true },
    { id: 'function', label: 'Função', field: 'func' },
    { id: 'emailData', label: 'E-mail', field: 'emailData', type: 'email' },
    { id: 'number', label: 'Número', field: 'number', type: 'tel' },
    { id: 'address', label: 'Endereço', field: 'address' },
  ];

  const textAreas = [
    { label: 'Resumo', field: 'resume' },
    ...Array.from({ length: 5 }, (_, i) => ({
      label: `Experiência${i ? ` ${i + 1}` : ''}`,
      field: `experience${i || ''}`
    })),
    ...Array.from({ length: 5 }, (_, i) => ({
      label: `Formação${i ? ` ${i + 1}` : ''}`,
      field: `formation${i || ''}`
    }))
  ];

  const skillsLanguages = [
    ...Array.from({ length: 5 }, (_, i) => ({
      label: `Competência${i ? ` ${i + 1}` : ''}`,
      field: `skill${i || ''}`
    })),
    ...Array.from({ length: 3 }, (_, i) => ({
      label: `Idioma${i ? ` ${i + 1}` : ''}`,
      field: `language${i || ''}`
    }))
  ];

  useEffect(() => {
    const setupProfile = async () => {
      const docSnap = await getDoc(doc(storeApp, "profiles", uid));
      if (docSnap.exists()) setProfile(p => ({ ...p, ...docSnap.data() }));
      else if (!name) {
        await setDoc(doc(storeApp, "profiles", uid), initialFields);
        setMessage(<div className="message"><h2>Bem-vindo ao Dockfolio!</h2>...</div>);
      }
      setLoading(false);
    };
    setupProfile();
  }, []);

  const handleUpdate = async (field, value) => {
    try {
      if (field === 'displayName') await updateProfile(auth.currentUser, { displayName: value });
      else await updateDoc(doc(storeApp, "profiles", uid), { [field]: value });
      setMessage(<div className="message"><p><i className="bi bi-patch-check"></i>{successMsg}</p></div>);
      setTimeout(() => setMessage(null), 2000);
    } catch (error) {
      alert(error.message);
    }
  };

  const handlePhotoUpload = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(p => ({ ...p, photoLink: reader.result }));
        handleUpdate('photoLink', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) return (
    <section>
      <NavBar />
      <div className="dockfolioPage"><p>Carregando...</p></div>
    </section>
  );

  return (
    <section>
      <NavBar />
      <div className="dockfolioPage">
        <h2>Configurações do perfil</h2>
        <div>
          {profile.photoLink && <img className="photo" width="150" src={profile.photoLink} alt="Foto de perfil" />}
          <div className="file-upload">
            <label htmlFor="photo-upload" className="custom-file-label">
              Escolher Foto
            </label>
            <input id="photo-upload" type="file" accept="image/*" onChange={handlePhotoUpload} />
          </div>
          <p className="name">{name}</p>
          <p className="email-top">Conta: {email}</p>
        </div>

        {message}

        <h2>Dados do perfil</h2>
        <div className="updateProfile">
          <form className="formData">

            {fieldGroups.map(({ id, label, field, type = 'text', required }) => (
              <FieldGroup key={id}
                label={label}
                type={type}
                value={profile[field]}
                placeholder={`${label}${required ? ' (Obrigatório)' : ''}`}
                onChange={e => setProfile(p => ({ ...p, [field]: e.target.value }))}
                onBlur={() => handleUpdate(field, profile[field])}
              />
            ))}

            {textAreas.map(({ label, field }, i) => (
              <FieldGroup key={i}
                label={label}
                value={profile[field]}
                isTextArea={true}
                onChange={e => setProfile(p => ({ ...p, [field]: e.target.value }))}
                onBlur={() => handleUpdate(field, profile[field])}
              />
            ))}

            {skillsLanguages.map(({ label, field }, i) => (
              <FieldGroup key={i}
                label={label}
                value={profile[field]}
                onChange={e => setProfile(p => ({ ...p, [field]: e.target.value }))}
                onBlur={() => handleUpdate(field, profile[field])}
              />
            ))}
          </form>
        </div>

        <button className="btn-profile back-profile" onClick={() => navigate("/private")}>
          <i className="bi bi-arrow-left-circle"></i> Voltar
        </button>
      </div>
    </section>
  );
};