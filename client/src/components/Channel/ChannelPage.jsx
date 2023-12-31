import ChannelSidebar from './ChannelSidebar.jsx'
import JoinButton from './JoinButton.jsx'
import InfiniteScrollPosts from '../InfiniteScroll/InfiniteScrollPosts.jsx'
import CreatePostBar from '../Post/CreatePostBar.jsx'

import { getChannelDataByProp } from '../../apis/channelApi.js' 

import { useState, useEffect, useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"

import UserModalContext from "../../contexts/UserModalContext"
import UserDataContext from "../../contexts/UserDataContext"

import styles from './styles/ChannelPage.module.css' 

const ChannelPage = ({isCompact}) => {
  const [isJoined,setJoined] = useState(false)
  const [channelData,setChannelData] = useState({})
  const navigate = useNavigate()
  const {channelName} = useParams()


  const {userData} = useContext(UserDataContext)
  const {toggleUserModal} = useContext(UserModalContext)

  useEffect(() => {
    getChannelDataByProp('name',channelName)
      .then((data) => {
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
      <ChannelSidebar channelData={channelData}>
        <JoinButton 
          channelData={channelData} 
          setChannelData= {setChannelData} 
          isJoined={isJoined} 
          setJoined={setJoined}
        />
      </ChannelSidebar>
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
              <JoinButton 
                channelData={channelData} 
                setChannelData={setChannelData} 
                isJoined={isJoined} 
                setJoined={setJoined}
              />
            </div>
          </header>
          <main className={styles['main']} >
          {isJoined && <CreatePostBar />}
          {channelData.posts?.length 
            ? 
            <InfiniteScrollPosts posts={channelData.posts}/>
          :
            <>
              <div className={styles['noposts']}>
                <h1>There are no posts in this channel</h1>
                <h3>Be the chosen one</h3>
              </div>
            </>
          }
        </main>
      </div>
        <ChannelSidebar channelData={channelData}> 
          <button onClick={createPostHandler} className={styles['create-btn']}>Create Post</button>
        </ChannelSidebar>
    </div>
  )
}

export default ChannelPage
