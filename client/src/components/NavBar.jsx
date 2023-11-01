import styles from './styles/Navbar.module.css'
import { BookA } from 'lucide-react'
import LogInButton from './LogInButton'

const NavBar = ({isLogged, setLogged, toggleModal}) => {
  
  return(
    <div className={styles["nav-container"]}>
      <div className={styles["icon-container"]}>
        <p>Aether</p>
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
