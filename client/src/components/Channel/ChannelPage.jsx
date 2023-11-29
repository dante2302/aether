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

const ChannelPage = () => {

  const [channelData,setChannelData] = useState({})

  const navigate = useNavigate()
  const {channelName} = useParams()


  const {userData} = useContext(UserDataContext)
  const {toggleUserModal} = useContext(UserModalContext)

  useEffect(() => {
    getChannelDataByProp('name',channelName).then((channel) => {
      setChannelData(channel)
    })
  },[])


  const createPostHandler = () => userData ? navigate('/submit') :  toggleUserModal()

  return(
    <div className={styles['container']} >
      <div className={styles['content']}>
        <header className={styles['header']}>
          <div>
            <h1>{channelData.name}</h1>
            <h6>c/{channelData.name}</h6>
          </div>
          <JoinButton channelData={channelData} setChannelData={setChannelData}/>
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
