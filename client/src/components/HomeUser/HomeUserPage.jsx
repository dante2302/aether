import HomeSidebar from "./HomeSidebar"
import HomeFeed from "./HomeFeed"
import HomeInfo from "./HomeInfo"
import styles from './styles/HomeUserPage.module.css'
import { useWindowSize } from '@uidotdev/usehooks'

const HomeUserPage = () => {
  const windowSize = useWindowSize()

  return(
    <div className={styles['container']}>
      <HomeFeed />
      {windowSize.width>900&&
        <div className={styles['content']}>
          <HomeSidebar />
          <HomeInfo />
        </div>
      }
    </div>
  )
}
export default HomeUserPage
