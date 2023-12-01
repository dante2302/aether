import Searchbar from '../Search/Searchbar'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'

import UserDataContext from '../contexts/UserDataContext'
import UserModalContext from '../contexts/UserModalContext'

import styles from './Navbar.module.css'


const NavBar = () => {
  const navigate = useNavigate()
  const { userData, setUserData } = useContext(UserDataContext)
  const {toggleUserModal } = useContext(UserModalContext)

  return(
    <div className={styles["nav-container"]}>
        <img className={styles['logo']} src='/images/pegasus.svg' onClick={()=>navigate('/')}/>
        {userData &&
        <div onClick={() => navigate('/popular')}>Popular</div>}
      <div className={styles['search-container']}>
        <Searchbar />  
      </div>

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
