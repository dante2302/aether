
import { getPopularChannels, getPopularArray } from '../../apis/popularApi'
import { getChannelData } from '../../apis/channelApi'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const PopularChannels = () => {
  const [visibleChannels,setVisibleChannels] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    const asyncFunc = async () => {
      const channelEntries = await getPopularChannels()
      const channelIds = getPopularArray(channelEntries)
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
      <h6>POPULAR CHANNELS</h6>
      <ul>
        {visibleChannels.map(singleChannelData => 
          <li key={singleChannelData._id} onClick={() => navigate(`/c/${singleChannelData.name}`)}>
            <div> c/{singleChannelData.name}</div>
            <div> {singleChannelData.members.length} members</div>
          </li>)
        }
      </ul>
    </div>
  )
}

export default PopularChannels 
