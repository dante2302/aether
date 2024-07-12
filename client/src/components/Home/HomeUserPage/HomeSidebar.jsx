import ChannelCreateModal from '../../Channel/ChannelCreateModal'
import ChannelList from '../../Channel/ChannelList.jsx'
import info from "/images/info.svg"
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import useLoading from '../../../hooks/useLoading.jsx'
import UilHouseUser from '@iconscout/react-unicons/icons/uil-house-user.js'
import styles from './styles/HomeSidebar.module.css'
import UserDataContext from '../../../contexts/UserDataContext.jsx'

const HomeSidebar = ({fetchChannels, visibleChannels}) => {
  const navigate = useNavigate()
  const [channelModal,setChannelModal] = useState()
  const {userData} = useContext(UserDataContext);

  const [Spinner, fetchChannelsWithLoading,isLoading] = useLoading(fetchChannels)

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
      {!isLoading &&
        visibleChannels.length > 0 
        ?
        <ChannelList visibleChannels={visibleChannels}>
          <h1 className={styles['channel-h1']}> Your Channels: </h1>
        </ChannelList>
        :
        <div className={styles['no-channel-div']}>
          <img src={info} />
          <p>You do <span className={styles['red-span']}>not</span> seem to have joined a channel.</p>
          <p>Check out our <Link to="/popular">Popular Page</Link>!</p>
        </div>
        }
    </div>
  )
}
export default HomeSidebar