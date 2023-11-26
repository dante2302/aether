import UserPageSidebar from './UserPageSidebar'
import { useState, useEffect, useContext } from 'react'
import { Link, Outlet, useParams } from 'react-router-dom'
import UserDataContext from '../contexts/UserDataContext'
import { getUserDataByUsername, getUserDataProp } from '../apis/userApi'

const UserPage = () => {
  const {userData} = useContext(UserDataContext)
  const [pageUserData,setPageUserData] = useState({})
  const [isOwner,setIsOwner] = useState(false)
  const {username} = useParams()

  useEffect(() => {
      getUserDataByUsername(username).then(response => { 
        setIsOwner(userData && userData.userId === response.userId)
        const createdOn = getUserDataProp(response.userId,'_createdOn')
        setPageUserData({...response,createdOn})
      })
  },[])

  return (
    pageUserData &&
    <div>
      <UserPageSidebar pageUserData={pageUserData} isOwner={isOwner}/>
      <div>
        <Link to='./liked'>LIKED</Link>
        <Link to='./disliked'>DISLIKED</Link>
        <Link to='./saved'>SAVED</Link>
      </div>
      <Outlet context={[pageUserData,isOwner]}/>
    </div>
  )
}

export default UserPage
