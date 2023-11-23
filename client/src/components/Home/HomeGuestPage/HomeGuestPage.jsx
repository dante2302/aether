import InfiniteScrollPosts from '../../InfiniteScrollPosts/InfiniteScrollPosts.jsx'
import PopularChannels from './PopularChannels.jsx'
import styles from './styles/HomeGuest.module.css'

const HomeGuest = () => {
  return(
    <div className={styles['container']}>
      <InfiniteScrollPosts />
      <PopularChannels /> 
    </div>
  )
}
export default HomeGuest
