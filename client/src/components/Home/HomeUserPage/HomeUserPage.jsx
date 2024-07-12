import HomeSidebar from "./HomeSidebar"
import HomeFeed from "./HomeFeed"
import { useWindowSize } from '@uidotdev/usehooks'
import UserDataContext from '../../../contexts/UserDataContext'
import { useContext, useState } from "react"
import { getRelatedChannels } from '../../../services/userService.js'
import styles from './styles/HomeUserPage.module.css'
import { getMemberCount } from "../../../services/channelService.js"

const HomeUserPage = () => {
  const windowSize = useWindowSize()
  const [visibleChannels,setVisibleChannels] = useState([])
  const {userData} = useContext(UserDataContext);
  const fetchChannels = async () => {
    try{
      const response  = await getRelatedChannels(userData);
      const channelList = (await response.json()).channelList;
      const result = [];
      for (let i = 0; i < channelList.length; i++)
      {
          const memberCountResponse = await getMemberCount(channelList[i].id);
          const memberCount = await memberCountResponse.json();
          result.push({...channelList[i], memberCount})
      }
      setVisibleChannels(result);
    }
    catch{
      navigate("/error");
    }
  }
  return(
    <div className={styles['container']}>
      {windowSize.width<800&&
        <div className={styles['content']}>
          <HomeSidebar fetchChannels={fetchChannels} visibleChannels={visibleChannels}/>
        </div>
      }
      <HomeFeed userChannels={visibleChannels}/>
      {windowSize.width>=800&&
        <div className={styles['content']}>
          <HomeSidebar fetchChannels={fetchChannels} visibleChannels={visibleChannels}/>
        </div>
      }
    </div>
  )
}
export default HomeUserPage