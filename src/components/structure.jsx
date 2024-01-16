/* eslint-disable react/prop-types */
import { auth } from "../config/firebase"

export const Structure = () => {

  const user = auth.currentUser;
  const email = user.email;
  const name = user.displayName;
  const photo = user.photoURL;

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
        <p>Em breve você poderá ter seu currículo atualizado e de fácil acesso.</p>

        <div>
          <div>
            <h3>Resumo</h3>
            <p>...</p>
          </div>

          <div>
            <h3>Experiência</h3>
            <p>...</p>
          </div>

          <div>
            <h3>Formação</h3>
            <p>...</p>
          </div>
        </div>

      </div>
    </div>
  )
}