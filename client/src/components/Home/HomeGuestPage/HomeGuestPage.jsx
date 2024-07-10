import InfiniteScrollPosts from '../../InfiniteScroll/InfiniteScrollPosts.jsx'
import PopularChannels from './PopularChannels.jsx'
import styles from './styles/HomeGuest.module.css'
import { getAdditionalPostData, getPopularPosts } from '../../../services/postService.js'

const HomeGuest = () => {
  const size = window.innerWidth
  return (
    <div className={styles['container']}>
      {/* {size > 800
        ? */}
        <>
          <InfiniteScrollPosts
            fetchFunction={getPopularPosts}
            fetchAdditionalFunction={getAdditionalPostData}
            limit={3}
            Fallback={() => <div></div>}
          />
          <PopularChannels />
        </>
        {/* :
        <>
          <PopularChannels />
          <InfiniteScrollPosts
            fetchFunction={getPopularPosts}
            fetchAdditionalFunction={getAdditionalPostData}
            limit={3}
            Fallback={() => <div></div>}
          />
        </>
      } */}
    </div>
  )
}
export default HomeGuest