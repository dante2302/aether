import PostRender from '../Post/PostRender.jsx'

import { getPostData } from '../apis/postApi.js'

import { useState, useEffect } from "react"

import styles from './InfiniteScrollPosts.module.css'
import useLoading from '../hooks/useLoading.jsx'

const InfiniteScrollPosts = ({posts,setPageSizeEnded}) => {

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
    setIsLoading(true)

    let newPostsCount = 3
    // Number of posts to render

    if(newPostsCount > posts[visiblePostsCount]){
      newPostsCount = posts.length - visiblePostsCount
      // If there arent that many posts -> render what's left
    }

    let i = visiblePostsCount
    let newPosts = []

    while(i < posts.length && i - visiblePostsCount < newPostsCount){
      newPosts.push(await getPostData(posts[i]))
      i++
    }
    //check to see if there are posts

    if(newPosts.length > 0){
      if(typeof(setPageSizeEnded) == 'function')setPageSizeEnded(true)
      // setPageSizeEnded is a function for communicating with the parent
      // (only available for the HomeFeed component)

      setVisiblePostsCount(count => count + newPosts.length)
      setVisiblePosts(visiblePosts => [...visiblePosts,...newPosts])
    }
    setIsLoading(false)
  }

  const [spinner,fetchPostsWithLoading] = useLoading(fetchVisiblePosts,15)

  useEffect(() => { 
    window.addEventListener('scroll',scrollHandler)
    return () => window.removeEventListener('scroll',scrollHandler)
  },[isLoading])

  useEffect(() => {
    fetchPostsWithLoading(posts)
  },[])

  return (

    visiblePosts.length 
      &&
      <ul className={styles['container']}> 
        {visiblePosts.map(postData => 
          <li key={postData._id}><PostRender postData={postData} isCompact={true} /></li>)
        }
        {isLoading&&<p>Loading</p>}
        {spinner}
      </ul>
  )
}
export default InfiniteScrollPosts
