import CreatePostBar from '../Post/CreatePostBar'
import styles from './styles/HomeFeed.module.css'
const HomeFeed = ({userData}) => {
  return(
      <div className={styles['container']}>
        <CreatePostBar />
      </div>
  )
}
export default HomeFeed
