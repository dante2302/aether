import Searchbar from '../Search/Searchbar'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'

import UserDataContext from '../contexts/UserDataContext'
import UserModalContext from '../contexts/UserModalContext'

import styles from './Navbar.module.css'
import UilStar from '@iconscout/react-unicons/icons/uil-star'

const NavBar = () => {
  const navigate = useNavigate()
  const { userData, setUserData } = useContext(UserDataContext)
  const {toggleUserModal } = useContext(UserModalContext)

  return(
    <div className={styles["nav-container"]}>
        <img className={styles['logo']} src='/images/pegasus.svg' onClick={()=>navigate('/')}/>
        {userData &&
        <div onClick={() => navigate('/popular')}><UilStar size={35}/></div>}
        <Searchbar />  

      {
        userData
        ?
          <>
            <p onClick={() => navigate(`./u/${userData.username}`)}>{userData.username}</p>
            <button onClick={()=>setUserData(undefined)}>Log Out</button>
          </>
        :
        <button className={styles['log-in-btn']} onClick={toggleUserModal}>Log In</button>
      }

    </div>
  )

}
export default NavBar
