import UserPageSidebar from './UserPageSidebar'
import { useState, useEffect, useContext } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import UserDataContext from '../contexts/UserDataContext'
import { getUserDataByUsername } from '../apis/userApi'

const UserPage = () => {
  const {userData} = useContext(UserDataContext)
  const [pageUserData,setPageUserData] = useState({})
  const [isOwner,setIsOwner] = useState(false)
  const {username} = useParams()

  useEffect(() => {
    const asyncFunc = async () => {
      const response = await getUserDataByUsername(username) 
      setIsOwner(userData && userData.userId === response.userId)
      setPageUserData(response)
    }
    asyncFunc()
  },[])

  return (
    pageUserData &&
    <div>
      <UserPageSidebar pageUserData={pageUserData} isOwner={isOwner}/>
      <Outlet context={[isOwner,pageUserData]}/>
    </div>
  )
}

export default UserPage
