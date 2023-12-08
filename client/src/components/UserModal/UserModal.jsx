import LogInForm from './LogInForm.jsx'
import SignUpForm from './SignUpForm.jsx'
import ModalPrototype from '../ModalPrototype.jsx'

import { useState, useContext } from 'react'

import UserModalContext from '../contexts/UserModalContext'
import UserDataContext from '../contexts/UserDataContext'

import UilX from '@iconscout/react-unicons/icons/uil-x'
import styles from './styles/UserModal.module.css'

const Modal = ({modalMode}) => {
  const [currentMode,setCurrentMode] = useState(modalMode)
  const { toggleUserModal } = useContext(UserModalContext)
  const {setUserData} = useContext(UserDataContext)

  return (
    <ModalPrototype toggleModal={toggleUserModal}>
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


          { currentMode === 'logIn'&&
            <LogInForm setUserData={setUserData} toggleUserModal={toggleUserModal} setCurrentMode={setCurrentMode}/>}
          {
            currentMode === 'signUp'&&
            <SignUpForm setUserData={setUserData} toggleUserModal={toggleUserModal} setCurrentMode={setCurrentMode}/>
          }
        </div>
      </div>
    </ModalPrototype>
  )
}

export default Modal
