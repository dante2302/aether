import { BookA } from 'lucide-react'
import styles from './styles/Navbar.module.css'

const NavBar = ({isLogged, setLogged, toggleModal}) => {
  
  return(
    <div className={styles["nav-container"]}>
      <div className={styles["logo-container"]}>
        <img src="../../public/images/logo-text.jpeg" alt="aether"/>
        <BookA size={48}/>
      </div>
      {/* search bar */}

      <button className={styles['.log-in-btn']}onClick={toggleModal}>Log In</button>

      {/*isLogged 
        ? 

        <Account /> 

        : 

        <LogInButton />
      */}
    </div>
  )

}
export default NavBar
