import PostRender from '../Post/PostRender.jsx'

import { getPostData } from '../../services/postService.js'

import { useState, useEffect } from "react"

import useLoading from '../../hooks/useLoading.jsx'

import styles from './InfiniteScrollPosts.module.css'


const InfiniteScrollPosts = ({fetchFunction, limit}) => {
  const [postDataList,setPostDataList] = useState([])
  const [offset, setOffset] = useState(0);
  const [endOfPosts, setEndOfPosts] = useState(false);

  const scrollHandler = async () => {
    const { clientHeight, scrollTop, scrollHeight } = document.documentElement
    const isBottom = scrollTop + clientHeight >= scrollHeight

    if(!isBottom || isLoading || endOfPosts){
      return
    }

    fetchWithLoading(posts)
  }

  async function fetchPosts()
  {
    let dataList = await fetchFunction(limit, offset);
    if(dataList.length < offset)
    {
      setEndOfPosts(true);
    }
    setPostDataList(curr => [...curr,dataList]);
    setOffset(o => o+limit);
  }

  const [Spinner,fetchWithLoading,isLoading] = useLoading(fetchPosts)

  useEffect(() => { 
    window.addEventListener('scroll',scrollHandler)
    return () => window.removeEventListener('scroll',scrollHandler)
  },[isLoading])

  useEffect(() => {fetchWithLoading()},[])

  return (
    <div className={styles['container']}>
      <ul className={styles['post-container']}> 
      {postDataList.map(postData =>
        <li key={postData._id}> <PostRender postData={postData} isCompact={true} />
      </li>)}
      </ul>
      <Spinner size={50}/>
    </div>
  )
}
export default InfiniteScrollPosts
