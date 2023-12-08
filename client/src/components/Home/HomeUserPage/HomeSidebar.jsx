import ChannelCreateModal from '../../Channel/ChannelCreateModal'
import ChannelList from '../../Channel/ChannelList.jsx'

import { getChannelData } from '../../../apis/channelApi.js'

import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import useLoading from '../../../hooks/useLoading.jsx'

import UilHouseUser from '@iconscout/react-unicons/icons/uil-house-user.js'
import styles from './styles/HomeSidebar.module.css'

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
          <ChannelCreateModal userData={userData} toggleChannelModal={toggleChannelModal}/>}
      </div>
      <Spinner />
      <ChannelList visibleChannels={visibleChannels}> 
        <h1> Your Channels: </h1>
      </ChannelList>
    </div>
  )
}
export default HomeSidebar
