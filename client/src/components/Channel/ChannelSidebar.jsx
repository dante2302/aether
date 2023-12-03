import { useNavigate } from "react-router-dom"

const ChannelSidebar = ({visibleChannels}) => {
  const navigate = useNavigate()
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

export default ChannelSidebar
