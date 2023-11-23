import CreatePostBar from '../Post/CreatePostBar.jsx'
import InfiniteScrollPosts from '../InfiniteScrollPosts/InfiniteScrollPosts.jsx'

import * as channelApi from '../apis/channelApi.js'
import * as dateUtils from '../utils/dateUtils.js'

import { useState, useEffect, useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"

import UserModalContext from "../contexts/UserModalContext"
import UserDataContext from "../contexts/UserDataContext"

import UilHospital from "@iconscout/react-unicons/icons/uil-hospital.js"
import styles from './styles/ChannelPage.module.css' 

const ChannelPage = () => {

  const [channelData,setChannelData] = useState({})
  const [isJoined,setJoined] = useState(false)

  const navigate = useNavigate()
  const {channelName} = useParams()

  const {userData} = useContext(UserDataContext)
  const {toggleUserModal} = useContext(UserModalContext)

  useEffect(() => {
    channelApi.getChannelDataByName(channelName).then((channel) => {
      setChannelData(channel)
      userData && setJoined(channel.members.includes(userData.userId))
    })
  },[])

  const joinHandler = () => {
    if(!userData){
      toggleUserModal();
      return
    }
    setJoined(!isJoined)
  } 


  const createPostHandler = () => {
    console.log(userData)
    userData ? navigate('/submit') : toggleUserModal()
  }

  return(
    <div className={styles['container']} >
      <div className={styles['content']}>
        <header className={styles['header']}>
          <div>
            <h1>{channelData.name}</h1>
            <h6>c/{channelData.name}</h6>
          </div>
          <button onClick={joinHandler}>
            {!isJoined
              ?
              'Join'
              :
              'Joined'
            }
          </button>
        </header>
        <main className={styles['main']} >
          <CreatePostBar />
          {channelData.posts&&
          <InfiniteScrollPosts channelPosts={channelData.posts}/>}
        </main>
      </div>
      <div className={styles['side']}>
        <h6>About Channel</h6>
        <div className={styles['date-container']}>
          <UilHospital size={20}/>
          <div>Created {dateUtils.getFullDateFormat(channelData._createdOn)}</div>
        </div>
        <button onClick={createPostHandler}>Create Post</button>
        <p>{channelData.description||'No Description'}</p>
      </div>
    </div>
  )
}

export default ChannelPage
