import { useEffect, useState } from 'react'
import InfiniteScrollPosts from '../../InfiniteScrollPosts/InfiniteScrollPosts.jsx'
import PopularChannels from './PopularChannels.jsx'
import styles from './styles/HomeGuest.module.css'
import { getPopularPosts } from '../../apis/postApi.js'

const HomeGuest = () => {
  const [posts,setPosts] = useState()
  useEffect(() => {
   getPopularPosts().then(
      allPosts => {
        setPosts(Object.values(allPosts).map((postObject)=>postObject._id))})
  },[])
  return(
    <div className={styles['container']}>
      {posts&&
        <InfiniteScrollPosts channelPosts={posts}/>}
      <PopularChannels /> 
    </div>
  )
}
export default HomeGuest
