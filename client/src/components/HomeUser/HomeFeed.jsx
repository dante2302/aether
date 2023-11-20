import CreatePostBar from '../Post/CreatePostBar'
import styles from './styles/HomeFeed.module.css'
const HomeFeed = () => {
  return(
      <div className={styles['container']}>
        <CreatePostBar />
      </div>
  )
}
export default HomeFeed
