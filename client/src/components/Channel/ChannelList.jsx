import { useNavigate } from "react-router-dom"
import styles from './styles/ChannelList.module.css'

const ChannelList = ({visibleChannels,children}) => {
  const navigate = useNavigate()
  return (
    <div className={styles['container']}>
      {children}
      <ul className={styles['list']}>
        {visibleChannels.map(singleChannelData => 
          <li key={singleChannelData.id} onClick={() => navigate(`/c/${singleChannelData.name}`)}>
            <div> c/{singleChannelData.name}</div>
            <div>Members: {singleChannelData.memberCount}</div>
          </li>)
        }
      </ul>
    </div>
  )
}

export default ChannelList 