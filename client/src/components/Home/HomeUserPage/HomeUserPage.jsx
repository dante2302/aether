import HomeSidebar from "./HomeSidebar"
import HomeFeed from "./HomeFeed"

import { useWindowSize } from '@uidotdev/usehooks'

import UserDataContext from '../../../contexts/UserDataContext'
import { useContext } from "react"

import styles from './styles/HomeUserPage.module.css'

const HomeUserPage = () => {
  const windowSize = useWindowSize()

  return(
    <div className={styles['container']}>
      <HomeFeed />
      {windowSize.width>800&&
        <div className={styles['content']}>
          <HomeSidebar />
        </div>
      }
    </div>
  )
}
export default HomeUserPage
