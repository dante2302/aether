import { useState } from 'react'
import styles from './styles/UserModal.module.css'
import LogInForm from './LogInForm.jsx'
import SignUpForm from './SignUpForm.jsx'
import UilX from '@iconscout/react-unicons/icons/uil-x'

const Modal = ({setUserData,toggleUserModal,modalMode}) => {
  const [currentMode,setCurrentMode] = useState(modalMode)
  return (

    <div className='modal'>
      <div className='overlay' onClick={toggleUserModal}>
      </div>
      <div className={styles['content']}>
        <div className={styles['close-btn-wrap']}>
            <UilX size={30} className={styles['x']} onClick={() => toggleUserModal()} />
        </div>
        <div className={styles['inner-content']}>

          {currentMode === 'logIn'&&
            <h2>Log In </h2>
          }
          {currentMode === 'signUp' &&
            <h2>Sign Up</h2>
          }

          <p className={styles["user-policy-text"]}>By continuing you agree to our <a className={styles['link']}>User Agreement </a>  
            and acknowledge that you understand our <a className={styles['link']}>Privacy Policy</a>.</p>

          <button className={styles['google-btn']}>
            <img src='../../public/images/google_icon.svg' className={styles['google-icon']}/>
            <div className={styles['google-text']}>Continue with Google</div>
          </button>

          { currentMode === 'logIn'&&
            <LogInForm setUserData={setUserData} toggleUserModal={toggleUserModal} setCurrentMode={setCurrentMode}/>}
          {
            currentMode === 'signUp'&&
            <SignUpForm setUserData={setUserData} toggleUserModal={toggleUserModal} setCurrentMode={setCurrentMode}/>
          }
        </div>
      </div>
    </div>

  )
}

export default Modal
