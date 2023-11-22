import UserModal from '../UserModal/UserModal'
import { createContext, useState } from 'react'

const UserModalContext = createContext()
export default UserModalContext

export const UserModalProvider = ({
  children,
  value
}) => {

  const [userModal,setUserModal] = useState()
  const toggleUserModal = () => {
    setUserModal(!userModal)
  }

  return(
    <UserModalContext.Provider value={{userModal, toggleUserModal}} >
      {children}            
      {userModal&& <UserModal modalMode={'logIn'}/>}
    </ UserModalContext.Provider >
  )
}
