import { useState,useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import * as channelApi from '../apis/channelApi.js'
import * as dateUtils from '../utils/dateUtils.js'
import PostRender from '../Post/PostRender.jsx'
import CreatePostBar from '../Post/CreatePostBar.jsx'
import * as postApi from '../apis/postApi.js'
import UserDataContext from "../contexts/UserDataContext.js"
import styles from './styles/ChannelPage.module.css' 
import UilHospital from "@iconscout/react-unicons/icons/uil-hospital.js"

const ChannelPage = () => {
  const {userData} = useContext(UserDataContext)
  const {channelName} = useParams()
  const [channelData,setChannelData] = useState({})
  const [isJoined,setJoined] = useState(false)
  const [visiblePosts,setVisiblePosts] = useState([])
  let posts
  useEffect(()=>{
      channelApi.getChannelDataByName(channelName)
      .then(val => {
        setChannelData(val[0])
        userData&&setJoined(val[0].members.includes(userData.userId))
        console.log(val[0])
      })
  },[])

  useEffect(()=>{
    if(channelData.posts){
      posts = channelData.posts.map(postId => <PostRender postData={postApi.getPostData(postId)} />)}
  },[channelData])
  const joinHandler = () => {

  } 

  return(
    <>
      <header className={styles['header']}>
            <h1>{channelData.name}</h1>
            <h6>c/{channelData.name}</h6>
          <button onClick={joinHandler}>
            {isJoined
              ?
              'Join'
              :
              'Joined'
            }
          </button>
      </header>
      <main className={styles['main']}>
        <div>
          <CreatePostBar />
          {posts}
        </div>
        <div>
          <h6>About Channel</h6>
          <div className={styles['date-container']}>
            <UilHospital size={20}/>
            <div>Created {dateUtils.getFullDateFormat(channelData._createdOn)}</div>
          </div>
          <button>Create Post</button>
          <p>{channelData.description||'No Description'}</p>
        </div>
      </main>
    </>
  )
}

export default ChannelPage
