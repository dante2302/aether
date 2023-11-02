import { BookA } from 'lucide-react'
import LogInButton from './LogInButton'
import styles from './styles/Navbar.module.css'

const NavBar = ({isLogged, setLogged, toggleModal}) => {
  
  return(
    <div className={styles["nav-container"]}>
      <div className={styles["logo-container"]}>
        <img src="../../public/images/logo-text.jpeg" alt="aether"/>
        <BookA size={48}/>
      </div>
      {/* search bar */}
      {!isLogged&&
        <LogInButton toggleModal={toggleModal}
        />
      }
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
