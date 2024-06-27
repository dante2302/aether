import ChannelSidebar from './ChannelSidebar.jsx'
import NewJoinButton from './NewJoinButton.jsx'
// import InfiniteScrollPosts from '../InfiniteScroll/InfiniteScrollPosts.jsx'
// import CreatePostBar from '../Post/CreatePostBar.jsx'

import { getChannelDataByName, isJoinedBy } from '../../services/channelService.js' 

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
  const {userModal, toggleUserModal} = useContext(UserModalContext)

  async function handleChannelMembership(channelId)
  {
    let response2 = await isJoinedBy(channelId, userData.id);
    const isJoinedData = await response2.json();
    setJoined(isJoinedData);
  }

  useEffect(() => {
    if (userData && Object.keys(channelData).length !== 0) {
      console.log(channelData);
      handleChannelMembership(channelData.id)
    }
  }, [userModal]);

  useEffect(() => {
    (async () => {
      try{
        const response = await getChannelDataByName(channelName);
        const data = await response.json()
        setChannelData(data.channelData);
        if(userData){
          handleChannelMembership(data.channelData.id);
        }
      }
      catch{}
    })();
    return(() => {
      document.title = 'Aether'
    })
  },[])
  function createPostHandler()
  {
    if(!userData){
      toggleUserModal();
      return;
    }
    navigate("/submit");
  }

  return(
    // isCompact
    //   ? 
    //   <ChannelSidebar channelData={channelData}>
    //     <JoinButton 
    //       channelData={channelData} 
    //       setChannelData= {setChannelData} 
    //       isJoined={isJoined} 
    //       setJoined={setJoined}
    //     />
    //   </ChannelSidebar>
    //   :
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
              <NewJoinButton 
                channelData={channelData} 
                setChannelData={setChannelData} 
                isJoined={isJoined} 
                setJoined={setJoined}
              />
            </div>
          </header>
          <main className={styles['main']} >
          {/* {isJoined && <CreatePostBar />} */}
          {/* {channelData.posts?.length 
            ? 
            <InfiniteScrollPosts posts={channelData.posts}/>
          : */}
            <>
              <div className={styles['noposts']}>
                <h1>There are no posts in this channel</h1>
                <h3>Be the chosen one</h3>
              </div>
            </>
          {/* } */}
        </main>
      </div>
        <ChannelSidebar channelData={channelData}> 
          {isJoined && <button onClick={createPostHandler} className={styles['create-btn']}>Create Post</button>}
        </ChannelSidebar>
    </div>
  )
}

export default ChannelPage
