import { useState } from 'react'
import ChannelCreationModal from '../Channel/ChannelCreationModal.jsx'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import UilHouseUser from '@iconscout/react-unicons/icons/uil-house-user.js'
import styles from './styles/HomeSidebar.module.css'

const HomeSidebar = ({userData}) => {
  const location = useLocation()
  console.log(location.pathname)
  const [channelModal,setChannelModal] = useState(false)
  const toggleChannelModal = () => {
    setChannelModal(!channelModal)
  }
  const navigate = useNavigate()

  return(
    <div className={styles['wrapper']}>
      <UilHouseUser />

      <h3>Home</h3>
      <p>Your personal Aether frontpage. Come here to check in with your favourite communities</p>
      <button onClick={toggleChannelModal}>Create Channel</button>
      {channelModal&&<ChannelCreationModal userData = {userData} toggleChannelModal={toggleChannelModal}/>}
      <button onClick={() => navigate('/submit')}>Create post</button>
    </div>

  )
}
export default HomeSidebar
