import HomeSidebar from "./HomeSidebar"
import HomeFeed from "./HomeFeed"

import { useWindowSize } from '@uidotdev/usehooks'

import UserDataContext from '../../../contexts/UserDataContext'
import { useContext, useState } from "react"

import { getRelatedChannels } from '../../../services/userService.js'
import styles from './styles/HomeUserPage.module.css'

const HomeUserPage = () => {
  const windowSize = useWindowSize()
  const [visibleChannels,setVisibleChannels] = useState([])
  const {userData} = useContext(UserDataContext);
  const fetchChannels = async () => {
    try{
      const response  = await getRelatedChannels(userData);
      setVisibleChannels((await response.json()).channelList);
    }
    catch{
      navigate("/error");
    }
  }
  return(
    <div className={styles['container']}>
      <HomeFeed userChannels={visibleChannels}/>
      {windowSize.width>800&&
        <div className={styles['content']}>
          <HomeSidebar fetchChannels={fetchChannels} visibleChannels={visibleChannels}/>
        </div>
      }
    </div>
  )
}
export default HomeUserPage
