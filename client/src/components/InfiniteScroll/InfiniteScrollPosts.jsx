import PostRender from '../Post/PostRender.jsx'

import { getPostData } from '../../services/postService.js'

import { useState, useEffect } from "react"

import useLoading from '../../hooks/useLoading.jsx'

import styles from './InfiniteScrollPosts.module.css'
import { useNavigate } from 'react-router-dom'


const InfiniteScrollPosts = ({fetchFunction, limit, Fallback}) => {
  const [postDataList,setPostDataList] = useState([])
  const [offset, setOffset] = useState(0);
  const [endOfPosts, setEndOfPosts] = useState(false);
  const navigate = useNavigate();

  const scrollHandler = async () => {
    const { clientHeight, scrollTop, scrollHeight } = document.documentElement
    const isBottom = scrollTop + clientHeight >= scrollHeight

    if(!isBottom || isLoading || endOfPosts){
      return
    }
  }

  async function fetchPosts()
  {
    try{
      let response = await fetchFunction(limit, offset);
      const deserialized = await response.json();
      const dataList = deserialized.postList;
      if(dataList.length < offset)
      {
        setEndOfPosts(true);
      }
      setPostDataList(curr => [...curr,...dataList]);
      setOffset(o => o+limit);
    }
    catch(e){
      console.log(e);
      navigate("/error");
    }
  }

  const [Spinner,fetchWithLoading,isLoading] = useLoading(fetchPosts)

  useEffect(() => { 
    window.addEventListener('scroll',scrollHandler)
    return () => window.removeEventListener('scroll',scrollHandler)
  },[isLoading])

  useEffect(() => {fetchWithLoading()},[])
console.log("asd", postDataList);
  return (
    postDataList.length > 0
    ?
    <div className={styles['container']}>
      <ul className={styles['post-container']}> 
      {
      postDataList.map(postData =>
        <li key={postData.id}> <PostRender postData={postData} isCompact={true} />
      </li>)}
      </ul>
      <Spinner size={50}/>
    </div>
    :
    <Fallback />
  )
}
export default InfiniteScrollPosts