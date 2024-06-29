import { useEffect, useState } from 'react'
import InfiniteScrollPosts from '../../InfiniteScroll/InfiniteScrollPosts.jsx'
import PopularChannels from './PopularChannels.jsx'
import styles from './styles/HomeGuest.module.css'
import { getAdditionalPostData, getPopularPosts } from '../../../services/postService.js'

const HomeGuest = () => {
  return(
    <div className={styles['container']}>
        <InfiniteScrollPosts 
          fetchFunction={getPopularPosts} 
          fetchAdditionalFunction={getAdditionalPostData}
          limit={3} 
          Fallback={() => <></>}/>
      <PopularChannels /> 
    </div>
  )
}
export default HomeGuest
