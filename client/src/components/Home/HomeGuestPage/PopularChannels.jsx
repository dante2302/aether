
import { useEffect, useState } from 'react'
import { getPopularChannels } from '../../../services/popularApi'
import { getChannelData } from '../../../services/channelService'

import ChannelList from '../../Channel/ChannelList'
import useLoading from '../../../hooks/useLoading'

const PopularChannels = () => {
  const [visibleChannels,setVisibleChannels] = useState([])
  const fetchPopularChannels = async () => {
    const channelIds = await getPopularChannels()
    const channelData = []
    for(let channelId of channelIds){
      channelData.push(await getChannelData(channelId))
    }
    setVisibleChannels(channelData)
  }
  const [Spinner, fetchWithLoading,isLoading] = useLoading(fetchPopularChannels)
  useEffect(() => {
    fetchWithLoading()
  },[])

  return (
      isLoading 
      ?
      <Spinner size={40} />
      :
      <ChannelList visibleChannels={visibleChannels}>
        <h6>Popular Channels</h6>
      </ChannelList>
  )
}

export default PopularChannels 
