import { useEffect, useState } from 'react'
import InfiniteScrollPosts from '../../InfiniteScroll/InfiniteScrollPosts.jsx'
import PopularChannels from './PopularChannels.jsx'
import styles from './styles/HomeGuest.module.css'

const HomeGuest = () => {
  const [posts,setPosts] = useState()
  return(
    <div className={styles['container']}>
      {posts&&
        <InfiniteScrollPosts />}
      <PopularChannels /> 
    </div>
  )
}
export default HomeGuest
