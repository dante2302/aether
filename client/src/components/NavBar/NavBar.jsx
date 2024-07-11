import Searchbar from '../Search/Searchbar'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'

import UserDataContext from '../../contexts/UserDataContext'
import UserModalContext from '../../contexts/UserModalContext'

import styles from './Navbar.module.css'
import UilStar from '@iconscout/react-unicons/icons/uil-star'
import UilUser from '@iconscout/react-unicons/icons/uil-user'
import logo from "/images/logo.svg";
import logoSmall from "/images/logo_small.png";

const NavBar = () => {
  const navigate = useNavigate()
  const { userData, setUserData } = useContext(UserDataContext)
  const {toggleUserModal } = useContext(UserModalContext)
  const size = window.innerWidth
  return(
    <div className={styles["nav-container"]}>
      <div className={styles['logo-container']}>
        <img 
          className={styles['logo']} 
          src={size>768 ? logo : logoSmall} 
          onClick={()=>navigate('/')}
        />

        {userData &&
          <Link to="/popular" className={styles['popular-btn']}><UilStar size={35}/></Link>
        }
      </div>

      <Searchbar />  

      {
        userData
          ?
          <div className={styles['log-in-container']}>
            <Link to={`/u/${userData.username}`}>
              <UilUser size={30} />
              {size > 800 && <p>{userData.username}</p>}
            </Link>
            <button 
              className={styles['log-out-btn']} 
              onClick={()=>setUserData(undefined)}
            >Log Out</button>
          </div>
          :
          <button className={styles['log-in-btn']} onClick={toggleUserModal}>Log In</button>
      }

    </div>
  )

}
export default NavBar
