import InfiniteScrollPosts from '../InfiniteScroll/InfiniteScrollPosts'

import { useOutletContext } from "react-router-dom"

const UserPageFeed = ({type}) => {
  const [pageUserData,isOwner] = useOutletContext()
  let propertyName = (type === 'posted') ? 'posts': `${type}Posts`
  console.log(propertyName)
  console.log(pageUserData)
  return(
    Object.keys(pageUserData).length>0 && pageUserData[propertyName].length > 0
      ?
      <InfiniteScrollPosts posts={pageUserData[propertyName]}/>  
      :
      <div>hmmm... u/{pageUserData.username} hasn't {type} anything </div>
  )
}

export default UserPageFeed
