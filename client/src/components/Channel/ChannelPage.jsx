import CreatePostBar from '../Post/CreatePostBar.jsx'
import InfiniteScrollPosts from '../InfiniteScrollPosts/InfiniteScrollPosts.jsx'

import { updateChannelData, getChannelDataByProp } from '../apis/channelApi.js' 
import {getFullDateFormat} from '../utils/dateUtils.js'

import { useState, useEffect, useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"

import UserModalContext from "../contexts/UserModalContext"
import UserDataContext from "../contexts/UserDataContext"

import UilHospital from "@iconscout/react-unicons/icons/uil-hospital.js"
import styles from './styles/ChannelPage.module.css' 
import { updateUserData } from '../apis/userApi.js'

const ChannelPage = () => {

  const [channelData,setChannelData] = useState({})
  const [isJoined,setJoined] = useState(false)

  const navigate = useNavigate()
  const {channelName} = useParams()

  const {userData,setUserData} = useContext(UserDataContext)
  const {userModal,toggleUserModal} = useContext(UserModalContext)

  useEffect(() => {
    getChannelDataByProp('name',channelName).then((channel) => {
      setChannelData(channel)
    })
  },[])

  useEffect(() => {
    if(userData&&channelData.members){
      setJoined(channelData.members.includes(userData._ownerId))
    }
  },[channelData,userModal])

  const joinHandler = () => {
    if(!userData){
      toggleUserModal();
      return
    }
    let newChannels = []
    let newMembers = []

    if(isJoined){
      newChannels = [...userData.channels.filter((channelId) => channelId !== channelData._id )]
      newMembers = channelData.members.filter((member) => member !== userData._ownerId)
      updateUserData(userData, {channels:newChannels})
        .then((data) => {
        setUserData(data)
      })
      updateChannelData(channelData._id,{members: newMembers})
      .then((data) => {
          setChannelData(data)
      })
      setJoined(false)
    }

    else{
      newChannels = [...userData.channels, channelData._id]
      newMembers = [...channelData.members, userData._ownerId]
      updateUserData(userData, {channels: newChannels})
        .then((data) => {
        setUserData(data)
      })
      updateChannelData(channelData._id,{members: newMembers})
      .then((data) => {
          setChannelData(data)
      })
      setJoined(true)
    }
  } 

  const createPostHandler = () => {
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
          <InfiniteScrollPosts posts={channelData.posts.reverse()}/>}
        </main>
      </div>
      <div className={styles['side']}>
        <h6>About Channel</h6>
        <div className={styles['date-container']}>
          <UilHospital size={20}/>
          <div>Created {getFullDateFormat(channelData._createdOn)}</div>
        </div>
        <button onClick={createPostHandler}>Create Post</button>
        <p>{channelData.description||'No Description'}</p>
      </div>
    </div>
  )
}

export default ChannelPage
