
import { useNavigate } from "react-router-dom"

const ChannelList = ({visibleChannels}) => {
  const navigate = useNavigate()
  return (
      <ul>
        {visibleChannels.map(singleChannelData => 
          <li key={singleChannelData._id} onClick={() => navigate(`/c/${singleChannelData.name}`)}>
            <div> c/{singleChannelData.name}</div>
            <div> {singleChannelData.members.length} members</div>
          </li>)
        }
      </ul>
  )
}

export default ChannelList 
