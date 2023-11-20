import { useState } from 'react'
import { Routes, Route} from 'react-router-dom'
import NavBar from './NavBar/NavBar.jsx'
import HomeGuest from './HomeGuest/HomeGuest.jsx'
import ChannelPage from './Channel/ChannelPage'
import PostForm from './Post/PostForm.jsx' 
import HomeUserPage from './HomeUser/HomeUserPage.jsx'
import UserModal from './UserModal/UserModal.jsx'
import UserDataContext from './contexts/UserDataContext.js' 
import UserModalContext from './contexts/UserModalContext.js'

const App = () => {
  const [userData,setUserData] = useState(undefined)
  const [userModal,setUserModal] = useState(false)
  const toggleUserModal = () => {
    setUserModal(!userModal)
  } 

  return (
    <>
      <UserDataContext.Provider value={{userData, setUserData}}>
        <UserModalContext.Provider value={{userModal, toggleUserModal}}>
        <NavBar />
      <div className='canvas'>
            {userModal&&<UserModal
              modalMode={'logIn'}
            />}
        <Routes>
          <Route path={`c/:channelName`}>
            <Route index element={<ChannelPage />} />
            <Route path='submit' element={<PostForm />} />
          </Route>
          <Route path='submit' element={<PostForm />} />
          <Route path='/' element={
            userData
              ?
              <HomeUserPage />
              :
              <HomeGuest />
          } />
        </Routes>
      </div>
        </UserModalContext.Provider>
      </UserDataContext.Provider>
    </>
  )
}

export default App
