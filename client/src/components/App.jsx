import NavBar from './NavBar'
import { useState } from 'react'

const App = () => {
  const [isLogged,setLogged] = useState(false)

  return (
    <>
      <NavBar 
        isLogged={isLogged} 
        setLogged={setLogged}
      />


    </>
  )
}

export default App
