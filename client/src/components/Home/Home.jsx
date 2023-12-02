import HomeUserPage from "./HomeUserPage/HomeUserPage.jsx"
import HomeGuestPage from "./HomeGuestPage/HomeGuestPage.jsx"
import { useContext } from "react"
import UserDataContext from "../contexts/UserDataContext.jsx"

const Home = () => {
  const { userData } = useContext(UserDataContext)
  return(
    userData
    ?
    <HomeUserPage />
    :
    <HomeGuestPage />
  )
}

export default Home
