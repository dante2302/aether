import * as channelApi from '../apis/channelApi.js'
import { useNavigate } from 'react-router-dom'
import { useEffect,useState } from 'react'
const PopularChannels = () => {
  const [popChannelElements,setPopChannelElements] = useState()
  const navigate = useNavigate()

  useEffect(() => {
      channelApi.getPopularChannels()
      .then(channels => {
        setPopChannelElements(channels.map((channelData) =>
         <li key={channelData._id} onClick={() => navigate(`/c/${channelData.name}`)}>
            <div> c/{channelData.name}</div>
            <div> {channelData.memberCount} members</div>
          </li>
      ))})
},[])
  return (
    <div>
      <h6>POPULAR CHANNELS</h6>
      <ul>
        {popChannelElements}
      </ul>
    </div>
  )
}

export default PopularChannels 
