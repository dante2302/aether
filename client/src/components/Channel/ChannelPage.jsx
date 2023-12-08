import CreatePostBar from '../Post/CreatePostBar.jsx'
import InfiniteScrollPosts from '../InfiniteScroll/InfiniteScrollPosts.jsx'
import JoinButton from './JoinButton.jsx'

import { getChannelDataByProp } from '../apis/channelApi.js' 
import { getFullDateFormat } from '../utils/dateUtils.js'

import { useState, useEffect, useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"

import UserModalContext from "../contexts/UserModalContext"
import UserDataContext from "../contexts/UserDataContext"

import UilHospital from "@iconscout/react-unicons/icons/uil-hospital.js"
import styles from './styles/ChannelPage.module.css' 
import ChannelPageCompact from './ChannelPageCompact.jsx'

const ChannelPage = ({isCompact}) => {
  const [isJoined,setJoined] = useState(false)
  const [channelData,setChannelData] = useState({})

  const navigate = useNavigate()
  const {channelName} = useParams()


  const {userData} = useContext(UserDataContext)
  const {toggleUserModal} = useContext(UserModalContext)

  useEffect(() => {
    getChannelDataByProp('name',channelName).then((data) => {
      console.log(data)
      setChannelData(data)
      document.title = `c/${data.name}`
    })
    return(() => {
      document.title = 'Aether'
    })
  },[])


  const createPostHandler = () => userData && isJoined ? navigate('/submit') :  toggleUserModal()

  return(
    isCompact
      ? 
      <ChannelPageCompact channelData={channelData} setChannelData={setChannelData}/>
      :
      <div className={styles['container']} >
        <div className={styles['content']}>
          <header className={styles['header']}>
            <div></div>
            <div>
              <img src='/images/channel.svg' />
              <div className={styles['heading-div']}> 
                <h1>{channelData.name}</h1>
                <h6>c/{channelData.name}</h6>
              </div>
              <JoinButton channelData={channelData} setChannelData={setChannelData} isJoined={isJoined} setJoined={setJoined}/>
            </div>
          </header>
          <main className={styles['main']} >
          <CreatePostBar />
          {channelData.posts?.length 
            ? 
            <InfiniteScrollPosts posts={channelData.posts.reverse()}/>
          :
            <>
              <div>
                <h3>'There are no posts in this channel'</h3>
                <h6>Be the chosen one</h6>
              </div>
            </>
          }
        </main>
      </div>
      <div className={styles['side']}>
        <h6>About Channel</h6>
        <p>{channelData.description||'No Description'}</p>
        <div className={styles['date-container']}>
          <UilHospital size={20}/>
          <div>Created {getFullDateFormat(channelData._createdOn)}</div>
        </div>
        <button onClick={createPostHandler}>Create Post</button>
      </div>
    </div>
  )
}

export default ChannelPage
