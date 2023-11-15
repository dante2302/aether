import HomeSidebar from "./HomeSidebar"
import HomeFeed from "./HomeFeed"
import HomeInfo from "./HomeInfo"
import styles from './styles/HomeUserPage.module.css'

const HomeUser = ({userData}) => {
  return(
    <div className={styles['container']}>
      <HomeFeed />
      <div className={styles['content']}>
        <HomeSidebar />
        <HomeInfo />
      </div>
    </div>
  )
}
export default HomeUser
