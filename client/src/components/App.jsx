import NavBar from './NavBar/NavBar.jsx'
import { useState } from 'react'
import { Routes, Route} from 'react-router-dom'
import ChannelPage from './Channel/ChannelPage'
import PostForm from './Post/PostForm.jsx' 
import HomeGuest from './HomeGuest/HomeGuest.jsx'
import HomeUserPage from './HomeUser/HomeUserPage.jsx'
import UserModal from './UserModal/UserModal.jsx'
import CreatePostBar from './Post/CreatePostBar.jsx'

const App = () => {
  const [userData,setUserData] = useState(undefined)

  return (
    <>
        <NavBar 
          userData={userData}
          setUserData={setUserData}
        />
      <div className='canvas'>
        <Routes>
          <Route path={`c/:channelName`}>
            <Route index element={<ChannelPage userData={userData} />} />
            <Route path='submit' element={<PostForm userData={userData} />} />
          </Route>
          <Route path='submit' element={<PostForm userData={userData} />} />
          <Route path='/' element={
            userData
              ?
              <HomeUserPage userData={userData}/>
              :
              <HomeGuest />
          } />
        </Routes>
      </div>

    </>
  )
}

export default App
