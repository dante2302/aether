import { useEffect, useState } from 'react'
import InfiniteScrollPosts from '../../InfiniteScroll/InfiniteScrollPosts.jsx'
import PopularChannels from './PopularChannels.jsx'
import styles from './styles/HomeGuest.module.css'
import { getPopularPosts } from '../../apis/popularApi.js'

const HomeGuest = () => {
  const [posts,setPosts] = useState()

  useEffect(() => {
   getPopularPosts().then(
      allPosts => {
        setPosts(allPosts)})
  },[])

  return(
    <div className={styles['container']}>
      {posts&&
        <InfiniteScrollPosts posts={posts}/>}
      <PopularChannels /> 
    </div>
  )
}
export default HomeGuest
