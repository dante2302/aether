
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'

import UserDataContext from '../contexts/UserDataContext'
import UserModalContext from '../contexts/UserModalContext'

import  UilSearch from '@iconscout/react-unicons/icons/uil-search.js'
import styles from './styles/Navbar.module.css'

const NavBar = () => {
  const navigate = useNavigate()
  const { userData } = useContext(UserDataContext)
  const {toggleUserModal } = useContext(UserModalContext)

  return(
    <div className={styles["nav-container"]}>
        <img className={styles['logo']} src='/images/pegasus.svg' onClick={()=>navigate('/')}/>
      <div className={styles['search-container']}>
        <form>
          <button className={styles['search-btn']}><UilSearch /></button>
          <input type='search'
            defaultValue='Search Aether'
            className={styles['search-bar']}
          />
        </form>

    </div>

      {
        userData
        ?
            <p>{userData.username}</p>
        :
        <button className={styles['log-in-btn']} onClick={toggleUserModal}>Log In</button>
      }

    </div>
  )

}
export default NavBar
