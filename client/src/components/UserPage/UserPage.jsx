import UserPageSidebar from './UserPageSidebar'
import { useState, useEffect, useContext } from 'react'
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom'
import UserDataContext from '../contexts/UserDataContext'
import { getUserDataByUsername, getUserDataProp } from '../apis/userApi'

const UserPage = () => {
  const [pageUserData,setPageUserData] = useState({})
  const [isOwner,setIsOwner] = useState(false)
  const {userData} = useContext(UserDataContext) 
  const {username} = useParams()
  const navigate = useNavigate()

  useEffect(() => {
      getUserDataByUsername(username).then(response => { 
        setIsOwner(userData && userData.userId === response.userId)
        const createdOn = getUserDataProp(response.userId,'_createdOn')
        setPageUserData({...response,createdOn})
      })
  },[])

  return (
    Object.keys(pageUserData).length>0
    ? 
    <div>
      <UserPageSidebar pageUserData={pageUserData} isOwner={isOwner}/>
      <div>
        <Link to='./submitted'>POSTS</Link>
        <Link to='./saved'>SAVED</Link>
        <Link to='./liked'>LIKED</Link>
        <Link to='./disliked'>DISLIKED</Link>
        <Link to='./comments'>COMMENTS</Link>
      </div>
      <Outlet context={[pageUserData,isOwner]}/>
    </div>
    :
      <div>
      <h1>Sorry, nobody on Aether goes by that name.</h1>
      <h3>The person may have been banned or the username is incorrect.</h3>
      <button onClick={()=>navigate('/')}>GO HOME</button> </div>
  )
}

export default UserPage
