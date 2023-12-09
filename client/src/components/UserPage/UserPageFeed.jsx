import InfiniteScrollPosts from '../InfiniteScroll/InfiniteScrollPosts'

import { useOutletContext } from "react-router-dom"
import styles from './styles/UserPageFeed.module.css'

const UserPageFeed = ({type}) => {
  const [pageUserData,isOwner] = useOutletContext()
  let propertyName = (type === 'posted') ? 'posts': `${type}Posts`
  return(
    Object.keys(pageUserData).length>0 && pageUserData[propertyName].length > 0
      ?
      <div className={styles['container']}>
      <InfiniteScrollPosts posts={pageUserData[propertyName]}/>  
      </div>
      :
      <div className={styles['nodata']}>hmmm... u/{pageUserData.username} hasn't {type} anything </div>
  )
}

export default UserPageFeed
