import NavBar from './NavBar'
import Modal from './Modal.jsx'
import { useState } from 'react'
const App = () => {
  const [isLogged,setLogged] = useState(false)
  const [modal,setModal] = useState(false)

  const toggleModal = () => {
    setModal(!modal)
  }

  return (
    <>
      <NavBar 
        isLogged={isLogged} 
        setIsLogged={setLogged}
        modal={modal}
        toggleModal={toggleModal}
      />
      {modal&&<Modal toggleModal={toggleModal}/>}

    </>
  )
}

export default App
