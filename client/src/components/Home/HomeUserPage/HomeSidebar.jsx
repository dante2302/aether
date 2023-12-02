import ChannelCreationModal from '../../Channel/ChannelCreationModal.jsx'

import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import UilHouseUser from '@iconscout/react-unicons/icons/uil-house-user.js'
import styles from './styles/HomeSidebar.module.css'

const HomeSidebar = ({userData}) => {

  const [channelModal,setChannelModal] = useState()
  const navigate = useNavigate()

  const toggleChannelModal = () => {
    setChannelModal(!channelModal)
  }

  return(
    <div className={styles['wrapper']}>
      <div className={styles['header']}>
      <UilHouseUser size={40}/>

      <h3>Home</h3>
      </div>
      <p>Your personal Aether frontpage. Come here to check in with your favourite channels.</p>

      <button 
        className={styles['create-post-btn']} 
        onClick={() => navigate('/submit')}>Create post</button>

      <button 
        className={styles['create-channel-btn']} 
        onClick={toggleChannelModal}>Create Channel</button>
      {channelModal&&
        <ChannelCreationModal userData={userData} toggleChannelModal={toggleChannelModal}/>}
    </div>

  )
}
export default HomeSidebar
