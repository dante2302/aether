import { useContext } from 'react'
import { getRelatedPosts } from '../../../services/userService'
import InfiniteScrollPosts from '../../InfiniteScroll/InfiniteScrollPosts'
import CreatePostBar from '../../Post/CreatePostBar'
import styles from './styles/HomeFeed.module.css'
import UserDataContext from '../../../contexts/UserDataContext'
import { getAdditionalPostData } from '../../../services/postService'

const HomeFeed = () => {
  const { userData } = useContext(UserDataContext);
  return (
    <div className={styles['container']}>
      <CreatePostBar />
      <InfiniteScrollPosts 
        fetchFunction={(limit, offset) => getRelatedPosts(userData, limit, offset)} 
        fetchAdditionalFunction={getAdditionalPostData}
        limit={5}
        Fallback={() => <div>Welcome</div>}
      />
    </div>
  )
}
export default HomeFeed