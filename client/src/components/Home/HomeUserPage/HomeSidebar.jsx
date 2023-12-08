import ChannelCreationModal from '../../Channel/ChannelCreationModal.jsx'

import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import UilHouseUser from '@iconscout/react-unicons/icons/uil-house-user.js'
import styles from './styles/HomeSidebar.module.css'
import ChannelSidebar from '../../Channel/ChannelSidebar.jsx'
import { getChannelData } from '../../apis/channelApi.js'
import useLoading from '../../hooks/useLoading.jsx'

const HomeSidebar = ({userData}) => {

  const [channelModal,setChannelModal] = useState()
  const [visibleChannels,setVisibleChannels] = useState([])
  const navigate = useNavigate()

  const fetchChannels = async () => {
    const channels = []
    for(let channelId of userData.channels) {
      channels.push(await getChannelData(channelId))
    }
    setVisibleChannels(channels)
  }

  const [Spinner, fetchChannelsWithLoading] = useLoading(fetchChannels)

  useEffect(() => {fetchChannelsWithLoading()},[])

  const toggleChannelModal = () => {
    setChannelModal(!channelModal)
  }

  return(
    <div>
      <div className={styles['wrapper']}>
        <div></div>
        <div className={styles['header']}>
          <UilHouseUser size={50}/>
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
      <h1> Your Channels: </h1>
      <Spinner />
      <ChannelSidebar visibleChannels={visibleChannels}/>
    </div>
  )
}
export default HomeSidebar
