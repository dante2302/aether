import HomeSidebar from "./HomeSidebar"
import HomeFeed from "./HomeFeed"
import HomeInfo from "./HomeInfo"
import styles from './styles/HomeUser.module.css'

const HomeUser = ({userData}) => {
  return(
    <>
      <HomeFeed />
      <div className={styles['content']}>
        <HomeSidebar />
        <HomeInfo />
      </div>
    </>
  )
}
export default HomeUser
