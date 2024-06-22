import PostRender from '../Post/PostRender.jsx'

import { getPostData } from '../../services/postService.js'

import { useState, useEffect } from "react"

import useLoading from '../../hooks/useLoading.jsx'

import styles from './InfiniteScrollPosts.module.css'


const InfiniteScrollPosts = ({posts,setPageSizeEnded}) => {
  let newPostsCount = 3
  // Number of posts to render

  const [visiblePosts,setVisiblePosts] = useState([])
  const [visiblePostsCount,setVisiblePostsCount] = useState(0)

  const fetchVisiblePosts = async (posts) => {

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

    newPosts = newPosts.map(postData => 
      <li key={postData._id}> <PostRender postData={postData} isCompact={true} /></li>)
      // Violating the rule of state shouldn't store a component 
      // so we dont have to map over the entire list every time we fetch new posts.

    if(newPosts.length > 0){
      if(typeof(setPageSizeEnded) == 'function')setPageSizeEnded(true)
      // setPageSizeEnded is a function for communicating with the parent
      // (only available for the HomeFeed component)

      setVisiblePostsCount(count => count + newPosts.length)
      setVisiblePosts(visiblePosts => [...visiblePosts,...newPosts])
    }
  }

  const scrollHandler = async () => {
    const { clientHeight, scrollTop, scrollHeight } = document.documentElement
    const isBottom = scrollTop + clientHeight >= scrollHeight

    if(!isBottom || isLoading){
      return
    }

    fetchWithLoading(posts)
  }

  const [Spinner,fetchWithLoading,isLoading] = useLoading(fetchVisiblePosts,undefined,true)

  useEffect(() => { 
    window.addEventListener('scroll',scrollHandler)
    return () => window.removeEventListener('scroll',scrollHandler)
  },[isLoading])

  useEffect(() => {
    fetchWithLoading(posts)
  },[])

  return (
    <div className={styles['container']}>
      <ul className={styles['post-container']}> 
        {visiblePosts}
      </ul>
      <Spinner size={50}/>
    </div>
  )
}
export default InfiniteScrollPosts
