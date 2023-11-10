import NavBar from './NavBar'
import { useState } from 'react'
import HomeSidebar from './HomeSidebar'

const App = () => {
    
  const [isLogged,setLogged] = useState(false)  
  const [userData,setUserData] = useState({})

  return (
    <>
      <div>
        <NavBar 
          userData={userData}
          setUserData={setUserData}
          isLogged={isLogged} 
          setLogged={setLogged}
        />
      </div>

      <HomeSidebar />
    </>
  )
}

export default App
