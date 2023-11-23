import PostRender from '../Post/PostRender.jsx'

import { getPostData } from '../apis/postApi.js'

import { useState, useEffect } from "react"

const InfiniteScrollPosts = ({channelPosts}) => {

  const [visiblePosts,setVisiblePosts] = useState([])
  const [visiblePostsCount,setVisiblePostsCount] = useState(0)
  const [isLoading,setIsLoading] = useState(true)

  const scrollHandler = async () => {
    const { clientHeight, scrollTop, scrollHeight } = document.documentElement
    const isBottom = scrollTop + clientHeight >= scrollHeight
    if( !isBottom || isLoading){
      return
    }
    fetchVisiblePosts(channelPosts)
  }

  const fetchVisiblePosts = async (channelPosts) => {
    setIsLoading(true)
    let i = visiblePostsCount
    const newPostsCount = 2
    let newPosts = []

    while(i < channelPosts.length && i - visiblePostsCount < newPostsCount){
      newPosts.push(await getPostData(channelPosts[i]))
      i++
    }

    newPosts = newPosts.map(postData => <li key={postData._id}><PostRender postData={postData} /></li>)
    setVisiblePostsCount(count => count + newPostsCount)
    setVisiblePosts(visiblePosts => [...visiblePosts,...newPosts])
    setIsLoading(false)
  }

  useEffect(() => { 
    window.addEventListener('scroll',scrollHandler)
    return () => window.removeEventListener('scroll',scrollHandler)
  },[isLoading])

  useEffect(() => {
    fetchVisiblePosts(channelPosts)
  },[])

  return (

    visiblePosts
      ?
      <ul> 
        {visiblePosts}
        {isLoading&&<p>Loading</p>}
      </ul>
      :
      <div>
        <h3>'There are no posts in this channel'</h3>
        <h6>Be the chosen one</h6>
        <button onClick={createPostHandler}>Create a Post</button>
      </div>
  )
}
export default InfiniteScrollPosts
