import UserPageSidebar from './UserPageSidebar'

import { getByUsername, getPersonalPosts, getUserDataByProp } from '../../services/userService'

import { useState, useEffect, useContext } from 'react'

import useLoading from '../../hooks/useLoading'

import { Link, Outlet, useNavigate, useParams } from 'react-router-dom'

import UserDataContext from '../../contexts/UserDataContext'

import styles from './styles/UserPage.module.css'

const UserPage = () => {
  const [pageUserData,setPageUserData] = useState({})
  const [isOwner,setIsOwner] = useState(false)
  const [notFound, setNotFound] = useState(false)

  const {userData} = useContext(UserDataContext) 

  const {username} = useParams()
  const navigate = useNavigate()

  const fetchData = async () => {
    // try{
      const response = await getByUsername(username);
      console.log(response)
      if(response.status == 404)
      {
        setNotFound(true)
        return;
      }
      const data = await response.json()
      console.log(data)
      setPageUserData(data);
    // }
    // catch(err)
    // {
    //   navigate("/error")
    // }
  }

  const [Spinner,fetchWithLoading,isLoading] = useLoading(fetchData)

  useEffect(() => {
    if(!userData || userData.username != username)
    {
      setIsOwner(false);
    }
    else{
      setIsOwner(true)
    }

    fetchWithLoading()
    document.title = `u/${username}`
    return(() => {
      document.title = 'Aether'
    })
  },[userData])
  
  return (
    isLoading
      ?
      <Spinner size={40} />
      :
      !notFound ?
        <div>
          <div className={styles['nav']}>
            <UserPageSidebar pageUserData={pageUserData} isOwner={isOwner} />
            <div className={styles['links']}>
              <Link to='./submitted'>SUBMITTED</Link>
              {isOwner && <Link to='./saved'>SAVED</Link>}
              {isOwner && <Link to='./liked'>LIKED</Link>}
              {isOwner && <Link to='./disliked'>DISLIKED</Link>}
            </div>
          </div>
          <Outlet context={pageUserData} />
        </div>
        :
        <div >
          <h1>Sorry, nobody on Aether goes by that name.</h1>
          <h3>The person may have been banned or the username is incorrect.</h3>
          <button onClick={() => navigate('/')}>GO HOME</button> </div>
  )
}

export default UserPage
