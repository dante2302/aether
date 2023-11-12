import NavBar from './NavBar'
import { useState } from 'react'
import { Routes, Route} from 'react-router-dom'
import ChannelPage from './Channel/ChannelPage'
import HomeSidebar from './HomeSidebar.jsx'
import PostForm from './Post/PostForm.jsx'
const App = () => {
  const [isLogged,setLogged] = useState(false)  
  const [userData,setUserData] = useState({})
  const userDataTest = {
    'accessToken': "15065dbbca6dd5f53caa7c581f955b9ec6fc4b9bf9fbecfda876fad4f1faf52d",
     _id: "847ec027-f659-4086-8032-5173e2f9c93a"
  }
  return (
    <>
        <NavBar 
          userData={userData}
          setUserData={setUserData}
          isLogged={isLogged} 
          setLogged={setLogged}
        />

      <Routes>
        <Route path={`r/:channelName`}>
          <Route index element={<ChannelPage userData={userData} isLogged={isLogged}/>} />
          <Route path='submit' element={<PostForm userData={userDataTest} isLogged={true}/>} />
        </Route>
        <Route path={'/'} element={<HomeSidebar userData={userData} />} />
      </Routes>
    </>
  )
}

export default App
