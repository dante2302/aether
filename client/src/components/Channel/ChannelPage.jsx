import { useEffect } from "react"
import { useState } from "react"
import { useLocation } from "react-router-dom"
import * as channelApi from '../apis/channelApi.js'
import styles from './styles/ChannelPage.module.css' 

const ChannelPage = ({userData,isLogged}) => {
  const location = useLocation()
  const channelName = location.pathname.slice(3) 
  const [channelData,setChannelData] = useState({})
  const [isJoined,setIsJoined] = useState(false)

  useEffect(()=>{
      console.log(userData)
      channelApi.getChannelDataByName(channelName)
      .then(val => {
        setChannelData(val[0])
        setIsJoined(val[0].members.includes(userData._id))
      })
  },[])

  useEffect(() => {
  },[channelData])
  
  return(
    <>
      <header className={styles['header']}>
        <div>
          <h1>{channelData.name}</h1>
          <h6>r/{channelData.name}</h6>
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
            <div>Post1</div>
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
          <h6>Created{channelData.creationDate}</h6>
        </div>
      </main>
    </>
  )
}

export default ChannelPage
