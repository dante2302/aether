import * as channelApi from '../apis/channelApi.js'
import { useNavigate } from 'react-router-dom'
import { useEffect,useRef,useState } from 'react'
const PopularChannels = () => {
  const navigate = useNavigate()
  const popChannels = useRef()
  const [popChannelElements,setPopChannelElements] = useState([])
  useEffect(() => {
    async function getChannels(){
      popChannels.current = await channelApi.getPopularChannels()
      setPopChannelElements(popChannels.current.map((channel) =>
        <li key={channel._id} onClick={() => navigate(`/c/${channel.name}`)}>
          <div> c/{channel.name}</div>
          <div> {channel.memberCount} members</div>
        </li>
    ))}
    getChannels()
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
