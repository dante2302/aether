import { useOutletContext } from "react-router-dom"
import InfiniteScrollPosts from '../InfiniteScroll/InfiniteScrollPosts'

const UserPageFeed = ({type}) => {
  const [pageUserData,isOwner] = useOutletContext()
  let propertyName = (type === 'posted') ? 'posts': `${type}Posts`
  return(
    Object.keys(pageUserData).length>0 && pageUserData[propertyName].length > 0
      ?
      <InfiniteScrollPosts posts={pageUserData[propertyName]}/>  
      :
      <div>hmmm... u/{pageUserData.username} hasn't {type} anything </div>
  )
}

export default UserPageFeed
