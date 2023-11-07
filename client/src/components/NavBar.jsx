
import styles from './styles/Navbar.module.css'
import { useState } from 'react'
import LogInModal from './LogInModal'

const NavBar = ({isLogged,setLogged}) => {
  const [modal,setModal] = useState(false)

  const toggleModal = () => {
    setModal(!modal)
  } 

  return(
    <div className={styles["nav-container"]}>
      <div className={styles["logo-container"]}>
        {// <img src="../../public/images/logo-text.jpeg" alt="aether"/>
        }
      </div>
      {/* search bar */}

      <button className={styles['.log-in-btn']}onClick={toggleModal}>Log In</button>

      {/*isLogged 
        ? 

        <Account /> 

        : 

        <LogInButton />
      */}
      {modal&&<LogInModal 

        isLogged={isLogged} 
        setLogged={setLogged} 
        toggleModal={toggleModal}

      />}
    </div>
  )

}
export default NavBar
