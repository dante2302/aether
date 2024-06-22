import InfiniteScrollPosts from '../../InfiniteScroll/InfiniteScrollPosts'
import CreatePostBar from '../../Post/CreatePostBar'
import { getChannelData } from '../../../services/channelService'
import styles from './styles/HomeFeed.module.css'
import { useEffect, useRef, useState } from 'react'

const HomeFeed = ({userData}) => {
  const [userPosts,setUserPosts] = useState([])
  const [pageSizeEnded,setPageSizeEnded] = useState(false)
  const pageSize =  useRef()

  useEffect(() => {
    getRelatedPosts().then((posts) => {
      setUserPosts(posts)
    })
    pageSize.current = 3
  }, [])

  useEffect(() => {
    if(pageSizeEnded){
      pageSize.current += 3
      getRelatedPosts().then((posts) => {
        setUserPosts(posts)
      })
      setPageSizeEnded(false)
    }
  },[pageSizeEnded])

  const getRelatedPosts = async () => {
    let posts = []
    for(let channelId of userData.channels){
      let channelData = await getChannelData(channelId)
      for(let i = pageSize.current-2; i<pageSize.current+1 ;i++){
      //initial page size is 10, so we get the latest posts, after that we get the 10 posts after that
        posts.push(channelData.posts[channelData.posts.length-i])
      }
    }
    return  posts 
  }


  return(
      <div className={styles['container']}>
        <CreatePostBar />
      {userPosts.length > 0 
        ? 
        <InfiniteScrollPosts posts={userPosts} setPageSizeEnded={pageSizeEnded}/>
        :
        <div>
          Welcome
        </div>
      }
      </div>
  )
}
export default HomeFeed
