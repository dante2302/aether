import PopularChannels from './PopularChannels.jsx'
import PopularPosts from './PopularPosts.jsx'
import styles from './styles/HomeGuest.module.css'

const HomeGuest = () => {
  return(
    <div className={styles['container']}>
      <PopularPosts />
      <PopularChannels /> 
    </div>
  )
}
export default HomeGuest
