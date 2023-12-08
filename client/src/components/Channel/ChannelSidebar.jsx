import { getFullDateFormat } from '../utils/dateUtils.js'
import UilHospital from "@iconscout/react-unicons/icons/uil-hospital.js"
import styles from './styles/ChannelSidebar.module.css'

const ChannelSidebar = ({channelData,children}) => {
  return(
    <div className={styles['side']}>
      <h6>About Channel</h6>
      <p>{channelData.description||'No Description'}</p>
      <div className={styles['date-container']}>
        <UilHospital size={20}/>
        <div>Created {getFullDateFormat(channelData._createdOn)}</div>
      </div>
      {children}
    </div>
  )
}

export default ChannelSidebar
