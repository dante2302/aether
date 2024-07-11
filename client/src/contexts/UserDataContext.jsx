import { createContext, useState } from 'react'
import { useEffect } from 'react'

const UserDataContext = createContext()
export default UserDataContext
export  const UserDataProvider = ({
  children
}) => {
  const [userData, setUserData] = useState(() => {
    // Initialize state from local storage if available
    const storedUserData = localStorage.getItem('userData');
    return storedUserData ? JSON.parse(storedUserData) : null;
  });
  useEffect(() => {
    if (userData) {
      localStorage.setItem('userData', JSON.stringify(userData));
    } else {
      localStorage.removeItem('userData');
    }
  }, [userData]);
  return <UserDataContext.Provider value={{userData, setUserData}}>
      {children}
    </UserDataContext.Provider>
}
