
import styles from './styles/Navbar.module.css'
import { useState } from 'react'
import UserModal from './UserModal/UserModal.jsx'

const NavBar = ({userData,setUserData,isLogged,setLogged}) => {
  const [userModal,setUserModal] = useState(false)

  const toggleUserModal = () => {
    setUserModal(!userModal)
  } 

  return(
    <div className={styles["nav-container"]}>
      <div className={styles["logo-container"]}>
        {// <img src="../../public/images/logo-text.jpeg" alt="aether"/>
        }
      </div>
      {/* search bar */}

      {
        isLogged
        ?
        <>
            <p>{userData.email}</p>
        </>
        :
        <button className={styles['.log-in-btn']}onClick={toggleUserModal}>Log In</button>
      }

      {userModal&&<UserModal
        setUserData={setUserData}
        setLogged={setLogged} 
        toggleUserModal={toggleUserModal}
        modalMode={'logIn'}

      />}
    </div>
  )

}
export default NavBar
