
import styles from './styles/Modal.module.css'
import { XIcon } from 'lucide-react'
import LogInForm from './LogInForm.jsx'

const Modal = ({isLogged,setIsLogged,toggleModal}) => {
  return (

    <div className = {styles['modal']}>
      <div className={styles['overlay']} onClick={toggleModal}>
      </div>
      <div className={styles['content']}>
        <div className={styles['close-btn-wrap']}>
          <button className={styles['close-btn']}onClick={toggleModal}>
            <XIcon size={16}/>
          </button>
        </div>
        <div className={styles['inner-content']}>

          <h2>Log In</h2>

          <p className={styles["user-policy-text"]}>By continuing you agree to our <a className={styles['link']}>User Agreement </a>  
            and acknowledge that you understand our <a className={styles['link']}>Privacy Policy</a>.</p>

          <button className={styles['google-btn']}>
            <img src='../../public/images/google_icon.svg' className={styles['google-icon']}/>
            <div className={styles['google-text']}>Continue with Google</div>
          </button>

          <LogInForm isLogged={isLogged} setIsLogged={setIsLogged} />

        </div>
      </div>
    </div>

  )
}

export default Modal
