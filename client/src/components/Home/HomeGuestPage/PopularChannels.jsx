import ChannelSidebar from '../../Channel/ChannelSidebar'

import { getPopularChannels } from '../../apis/popularApi'
import { getChannelData } from '../../apis/channelApi'

import { useEffect, useState } from 'react'

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

  return <ChannelSidebar visibleChannels={visibleChannels} />
}

export default PopularChannels 
