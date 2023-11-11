import { useState } from 'react'
import ChannelCreationModal from './Channel/ChannelCreationModal.jsx'

const HomeSidebar = ({userData}) => {
  const [channelModal,setChannelModal] = useState(false)
  const toggleChannelModal = () => {
    setChannelModal(!channelModal)
  }

  return(
    <div>
      <h3>Home</h3>
      <p>Your personal Aether frontpage. Come here to check in with your favourite communities</p>
      <button>Create Post</button>
      <button onClick={toggleChannelModal}>Create Channel</button>
      {channelModal&&<ChannelCreationModal userData = {userData}/>}
    </div>

  )
}
export default HomeSidebar
