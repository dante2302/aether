import  UilSearch from '@iconscout/react-unicons/icons/uil-search.js'
import styles from './styles/Navbar.module.css'
import { useState } from 'react'
import UserModal from '../UserModal/UserModal.jsx'
import { useNavigate } from 'react-router-dom'

const NavBar = ({userData,setUserData}) => {
  const navigate = useNavigate()
  const [userModal,setUserModal] = useState(false)
  const toggleUserModal = () => {
    setUserModal(!userModal)
  } 

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

      {userModal&&<UserModal
        setUserData={setUserData}
        toggleUserModal={toggleUserModal}
        modalMode={'logIn'}
      />}
    </div>
  )

}
export default NavBar
