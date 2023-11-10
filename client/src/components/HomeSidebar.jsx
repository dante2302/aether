import { useState } from 'react'
import * as channelApi from './apis/channelApi.js'

const HomeSidebar = () => {
  const [channelModal,setChannelModal] = useState(false)
  const toggleChannelModal = () => {
    setChannelModal(!channelModal)
  }

  return(
    <div>
      <h3>Home</h3>
      <p>Your personal Aether frontpage. Come here to check in with your favourite communities</p>
      <button>Create Post</button>
      <button onClick={() => toggleChannelModal}>Create Channel</button>
    </div>

  )
}
export default HomeSidebar
