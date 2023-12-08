import UilHospital from "@iconscout/react-unicons/icons/uil-hospital"
import { getFullDateFormat } from "../utils/dateUtils"
import JoinButton from "./JoinButton"

const ChannelPageCompact = ({channelData, setChannelData}) => {
  return (
    <div> 
      <h1>c/{channelData.name}</h1>
      <p>{channelData.description}</p>
      <div>
        <UilHospital size={15} />
        <p>Created {getFullDateFormat(channelData._createdOn)}</p>
      </div>
      <JoinButton channelData={channelData} setChannelData={setChannelData}/>
    </div>
  )
}
export default ChannelPageCompact

