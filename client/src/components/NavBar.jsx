import { BookA } from 'lucide-react'
import LogInButton from './LogInButton'
import './styles/Navbar.css'

const NavBar = ({isLogged, setLogged, toggleModal}) => {
  
  return(
    <div className="nav-container">
      <div className="logo-container">
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
