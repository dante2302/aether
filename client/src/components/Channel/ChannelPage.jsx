import { useState,useEffect, useContext, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import * as channelApi from '../apis/channelApi.js'
import * as dateUtils from '../utils/dateUtils.js'
import PostRender from '../Post/PostRender.jsx'
import CreatePostBar from '../Post/CreatePostBar.jsx'
import * as postApi from '../apis/postApi.js'
import UserDataContext from "../contexts/UserDataContext.js"
import styles from './styles/ChannelPage.module.css' 
import UilHospital from "@iconscout/react-unicons/icons/uil-hospital.js"
import UserModalContext from "../contexts/UserModalContext.js"

const ChannelPage = () => {
  const [channelData,setChannelData] = useState({})
  const [isJoined,setJoined] = useState(false)
  const [visiblePosts,setVisiblePosts] = useState([])
  const [visiblePostsCount,setVisiblePostsCount] = useState(0)
  const [isLoading,setIsLoading] = useState(true)

  const {userData} = useContext(UserDataContext)
  const {toggleUserModal} = useContext(UserModalContext)

  const navigate = useNavigate()
  const {channelName} = useParams()

  useEffect(() => { 
    window.addEventListener('scroll',scrollHandler)
    return () => window.removeEventListener('scroll',scrollHandler)
  },[isLoading])

  useEffect(() => {
    const asyncFunc = async () => {
      const channel = await channelApi.getChannelDataByName(channelName)
      setChannelData(channel)
      userData && setJoined(channel.members.includes(userData.userId))
      fetchVisiblePosts(channel.posts)
    }
    asyncFunc()
  },[])

  const joinHandler = () => {

  } 

  const scrollHandler = async () => {
    const { clientHeight, scrollTop, scrollHeight } = document.documentElement
    const isBottom = scrollTop + clientHeight >= scrollHeight
    if(!isBottom || isLoading){
      return
    }
    fetchVisiblePosts(channelData.posts)
  }

  const fetchVisiblePosts = async (channelPosts) => {
    setIsLoading(true)
    let i = visiblePostsCount
    let newPosts = []
    while(i<channelPosts.length && i-visiblePostsCount<2){
      newPosts.push(await postApi.getPostData(channelPosts[i]))
      i++
    }

    newPosts = newPosts.map(postData => <li key={postData._id}><PostRender postData={postData} /></li>)
    setVisiblePostsCount(count => count + 2)
    setVisiblePosts(visiblePosts => [...visiblePosts,...newPosts])
    setIsLoading(false)
  }

  const createPostHandler = () => {
    userData
    ?
      navigate('./submit')
    :
      toggleUserModal()
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
          {
            // visiblePosts
            //   ?
              <ul> 
                {visiblePosts}
                {isLoading&&<p>Loading</p>}
              </ul>
          //     :
          // <div>
          //   <h3>'There are no posts in this channel'</h3>
          //   <h6>Be the chosen one</h6>
          //   <button onClick={createPostHandler}>Create a Post</button>
          // </div>
          }
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
