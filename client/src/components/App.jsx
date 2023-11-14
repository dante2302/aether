import NavBar from './NavBar/NavBar.jsx'
import { useState } from 'react'
import { Routes, Route} from 'react-router-dom'
import ChannelPage from './Channel/ChannelPage'
import PostForm from './Post/PostForm.jsx' 
import HomeSidebar from './HomeSidebar.jsx'
import HomeGuest from './HomeGuest/HomeGuest.jsx'
import UserModal from './UserModal/UserModal.jsx'
import CreatePostBar from './Post/CreatePostBar.jsx'
const App = () => {
  const [userData,setUserData] = useState(undefined)
  // const userDataTest = {
  //   'accessToken': "15065dbbca6dd5f53caa7c581f955b9ec6fc4b9bf9fbecfda876fad4f1faf52d",
  //    _id: "847ec027-f659-4086-8032-5173e2f9c93a"
  // }
        // <Route path={'/'} element={
        //   userData
        //   ?
        //   <HomeUser />
        //   :
        //   <HomeGuest />
        // } />

  return (
    <>
      <CreatePostBar />
        <NavBar 
          userData={userData}
          setUserData={setUserData}
        />

      <Routes>
        <Route path={`c/:channelName`}>
          <Route index element={<ChannelPage userData={userData} />} />
          <Route path='submit' element={<PostForm userData={userData} />} />
        </Route>
        <Route path='submit' element={<PostForm userData={userData} />} />
        <Route path='/' element={
          userData
            ?
            <HomeSidebar userData={userData} />
            :
            <HomeGuest />
        } />
      </Routes>

    </>
  )
}

export default App
