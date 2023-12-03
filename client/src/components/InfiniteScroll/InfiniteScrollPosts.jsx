import PostRender from '../Post/PostRender.jsx'

import { getPostData } from '../apis/postApi.js'

import { useState, useEffect } from "react"

const InfiniteScrollPosts = ({posts}) => {

  const [visiblePosts,setVisiblePosts] = useState([])
  const [visiblePostsCount,setVisiblePostsCount] = useState(0)
  const [isLoading,setIsLoading] = useState(true)

  const scrollHandler = async () => {
    const { clientHeight, scrollTop, scrollHeight } = document.documentElement
    const isBottom = scrollTop + clientHeight >= scrollHeight
    if(!isBottom || isLoading){
      return
    }
    fetchVisiblePosts(posts)
  }

  const fetchVisiblePosts = async (posts) => {
    let newPostsCount = 3
    // Number of posts to render

    if(newPostsCount > posts[visiblePostsCount]){
      newPostsCount = posts.length - visiblePostsCount
      // If there arent that many posts -> render what's left
    }

    setIsLoading(true)
    let i = visiblePostsCount
    let newPosts = []
    while(i < posts.length && i - visiblePostsCount < newPostsCount){
      newPosts.push(await getPostData(posts[i]))
      i++
    }

    setVisiblePostsCount(count => count + newPosts.length)
    setVisiblePosts(visiblePosts => [...visiblePosts,...newPosts])
    setIsLoading(false)
  }

  useEffect(() => { 
    window.addEventListener('scroll',scrollHandler)
    return () => window.removeEventListener('scroll',scrollHandler)
  },[isLoading])

  useEffect(() => {
    fetchVisiblePosts(posts)
  },[])

  return (

    visiblePosts.length 
      &&
      <ul> 
        {visiblePosts.map(postData => 
          <li key={postData._id}><PostRender postData={postData} isCompact={true} /></li>)
        }
        {isLoading&&<p>Loading</p>}
      </ul>
  )
}
export default InfiniteScrollPosts
