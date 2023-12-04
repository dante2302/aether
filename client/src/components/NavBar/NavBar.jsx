import Searchbar from '../Search/Searchbar'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'

import UserDataContext from '../contexts/UserDataContext'
import UserModalContext from '../contexts/UserModalContext'

import styles from './Navbar.module.css'
import UilStar from '@iconscout/react-unicons/icons/uil-star'
import UilUserMd from '@iconscout/react-unicons/icons/uil-user-md'

const NavBar = () => {
  const navigate = useNavigate()
  const { userData, setUserData } = useContext(UserDataContext)
  const {toggleUserModal } = useContext(UserModalContext)
  const size = window.innerWidth
  return(
    <div className={styles["nav-container"]}>
      <img 
        className={styles['logo']} 
        src={size>768 ? '/images/logo.svg' : 'images/logo_small.png'} 
        onClick={()=>navigate('/')}
      />

      {userData &&
        <div onClick={() => navigate('/popular')}><UilStar size={35}/></div>
      }

      <Searchbar />  

      {
        userData
          ?
          <div className={styles['log-in-container']}>
            <div onClick={() => navigate(`./u/${userData.username}`)}>
              <UilUserMd size={30} />
              <p>{userData.username}</p>
            </div>
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
