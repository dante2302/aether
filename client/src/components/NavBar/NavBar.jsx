
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'

import UserDataContext from '../contexts/UserDataContext'
import UserModalContext from '../contexts/UserModalContext'

import  UilSearch from '@iconscout/react-unicons/icons/uil-search.js'
import styles from './Navbar.module.css'

import { createComment } from '../apis/commentApi'

const NavBar = () => {
  const navigate = useNavigate()
  const { userData, setUserData } = useContext(UserDataContext)
  const {toggleUserModal } = useContext(UserModalContext)

  const createCommentNow = async () =>{ 
    const response = await 
      createComment(userData,
        {postId:"acef6fe4-7376-4d2a-bf85-65113e311452",text:'firstComment',replyTo:'',parentComment:''}
      )
      createReply(userData,
        {postId:"acef6fe4-7376-4d2a-bf85-65113e311452",text:'secondComment',replyTo:'',parentComment:''}
    )
  }

  return(
    <div className={styles["nav-container"]}>
        <img className={styles['logo']} src='/images/pegasus.svg' onClick={()=>navigate('/')}/>
        <div onClick={() => navigate('/popular')}>Popular</div>
        <button onClick={createCommentNow}>createComment</button>
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
