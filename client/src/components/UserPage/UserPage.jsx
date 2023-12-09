import UserPageSidebar from './UserPageSidebar'

import { getUserDataByProp } from '../../apis/userApi'

import { useState, useEffect, useContext } from 'react'

import useLoading from '../../hooks/useLoading'

import { Link, Outlet, useNavigate, useParams } from 'react-router-dom'

import UserDataContext from '../../contexts/UserDataContext'

import styles from './styles/UserPage.module.css'

const UserPage = () => {
  const [pageUserData,setPageUserData] = useState({})
  const [isOwner,setIsOwner] = useState(false)

  const {userData} = useContext(UserDataContext) 

  const {username} = useParams()
  const navigate = useNavigate()

  const fetchData = async () => {
    const response  = await getUserDataByProp('username',username)
    setIsOwner(userData && userData._ownerId === response._ownerId)
    setPageUserData(response)
    document.title = `u/${response.username}`
  }

  const [Spinner,fetchWithLoading,isLoading] = useLoading(fetchData)

  useEffect(() => {
    fetchWithLoading()
    return(() => {
      document.title = 'Aether'
    })
  },[userData])
  
  return (
    isLoading 
      ?
    <Spinner size={40}/>
      :
    pageUserData && Object.keys(pageUserData).length>0
    ? 
    <div>
        <div className={styles['nav']}>
          <UserPageSidebar pageUserData={pageUserData} isOwner={isOwner}/>
          <div className={styles['links']}>
            <Link to='./submitted'>POSTS</Link>
            {isOwner && <Link to='./saved'>SAVED</Link>}
            {isOwner &&<Link to='./liked'>LIKED</Link>}
            {isOwner &&<Link to='./disliked'>DISLIKED</Link>}
          </div>
        </div>
      <Outlet context={[pageUserData,isOwner]}/>
    </div>
    :
      <div >
      <h1>Sorry, nobody on Aether goes by that name.</h1>
      <h3>The person may have been banned or the username is incorrect.</h3>
      <button onClick={()=>navigate('/')}>GO HOME</button> </div>
  )
}

export default UserPage
