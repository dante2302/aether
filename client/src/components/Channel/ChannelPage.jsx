import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"
import * as channelApi from '../apis/channelApi.js'
import * as dateUtils from '../utils/dateUtils.js'
import styles from './styles/ChannelPage.module.css' 
import PostRender from '../Post/PostRender.jsx'
import * as postApi from '../apis/postApi.js'

const ChannelPage = ({userData}) => {
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
  
  return(
    <>
      <header className={styles['header']}>
        <div>
            <h1>{channelData.name}</h1>
            <h6>c/{channelData.name}</h6>
          <button>
            {isJoined
              ?
              'Join'
              :
              'Joined'
            }
          </button>
        </div>
      </header>
      <main className={styles['main']}>
        <div>
            {// <CreatePostBar />
            }
          {channelData.posts?
            <div>
              {posts}
            </div>
            :
            <>
              <h4>There are no posts in this channel</h4>
              <h6>Be the first to till this fertile land.</h6>
                {//<button>Create Post</button>
                }
            </>
          }
        </div>
        <div>
          {
            channelData.description&&
            <div>
                <h6>Description</h6>
                <p>{channelData.description}</p>
            </div>
          }
        </div>
        <div>
          <a>asd</a>
          <h6>Created on {dateUtils.getFullDateFormat(channelData._createdOn)}</h6>
        </div>
      </main>
    </>
  )
}

export default ChannelPage
