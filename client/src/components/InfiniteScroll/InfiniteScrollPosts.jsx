import PostRender from '../Post/PostRender.jsx'

import { getPostData } from '../../services/postService.js'

import { useState, useEffect } from "react"

import useLoading from '../../hooks/useLoading.jsx'

import styles from './InfiniteScrollPosts.module.css'
import { useNavigate } from 'react-router-dom'


const InfiniteScrollPosts = ({ fetchFunction, fetchAdditionalFunction, limit, Fallback }) => {
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
      const resultList = [];
      for(let i = 0; i < dataList.length; i++)
      {
        const additionalData = await fetchAdditionalFunction(dataList[i])
        console.log(additionalData)
        if(!additionalData)
          throw("INTERNAL ERROR");

        resultList.push(
          {
            postData: dataList[i],
            additionalData
          }
        )
      }
      setPostDataList(curr => [...curr,...resultList]);
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

  return (
    postDataList.length > 0
    ?
    <div className={styles['container']}>
      <ul className={styles['post-container']}> 
      {
      postDataList.map(postDataContainer =>
        <li key={postDataContainer.postData.id}> 
          <PostRender 
            postData={postDataContainer.postData} 
            additionalPostData={postDataContainer.additionalData} 
            isCompact={true} 
          />
        </li>)}
      </ul>
      <Spinner size={50}/>
    </div>
    :
    <Fallback />
  )
}
export default InfiniteScrollPosts