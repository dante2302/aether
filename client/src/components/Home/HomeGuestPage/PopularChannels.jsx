
import { useEffect, useState } from 'react'
import { getPopularChannels } from '../../apis/popularApi'
import { getChannelData } from '../../apis/channelApi'

import styles from './styles/PopularChannels.module.css'
import ChannelList from '../../Channel/ChannelList'

const PopularChannels = () => {
  const [visibleChannels,setVisibleChannels] = useState([])

  useEffect(() => {
    const asyncFunc = async () => {
      const channelIds = await getPopularChannels()
      const channelData = []
      for(let channelId of channelIds){
        channelData.push(await getChannelData(channelId))
      }
      setVisibleChannels(channelData)
    }
    asyncFunc()
  },[])

  return (
    <div>
      <h6>Popular Channels</h6>
      <ChannelList visibleChannels={visibleChannels} />
    </div>
  )
}

export default PopularChannels 
