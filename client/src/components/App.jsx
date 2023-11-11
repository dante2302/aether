import NavBar from './NavBar'
import { useState } from 'react'
import { Routes, Route} from 'react-router-dom'
import ChannelPage from './Channel/ChannelPage'
import HomeSidebar from './HomeSidebar.jsx'

const App = () => {
  const [isLogged,setLogged] = useState(false)  
  const [userData,setUserData] = useState({})
  return (
    <>
        <NavBar 
          userData={userData}
          setUserData={setUserData}
          isLogged={isLogged} 
          setLogged={setLogged}
        />
        
      <Routes>
        <Route path={`r/:name`} element={
          <ChannelPage 
            userData={userData} 
            isLogged={isLogged}
          />}
        />
        <Route path='/' element={
          isLogged&&
          <HomeSidebar userData={userData} />}/>
      </Routes>
    </>
  )
}

export default App
