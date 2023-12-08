import HomeSidebar from "./HomeSidebar"
import HomeFeed from "./HomeFeed"
import styles from './styles/HomeUserPage.module.css'
import { useWindowSize } from '@uidotdev/usehooks'
import UserDataContext from '../../contexts/UserDataContext'
import { useContext } from "react"

const HomeUserPage = () => {
  const windowSize = useWindowSize()
  const {userData} = useContext(UserDataContext)

  return(
    <div className={styles['container']}>
      <HomeFeed userData={userData}/>
      {windowSize.width>900&&
        <div className={styles['content']}>
          <HomeSidebar userData={userData}/>
        </div>
      }
    </div>
  )
}
export default HomeUserPage
