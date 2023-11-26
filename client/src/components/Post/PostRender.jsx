import * as dateUtils from '../utils/dateUtils.js'

import { useState, useEffect, useContext } from 'react'

import UserDataContext from '../contexts/UserDataContext'
import UserModalContext from '../contexts/UserModalContext'

import UilArrowUp from '@iconscout/react-unicons/icons/uil-arrow-up'
import UilArrowDown from '@iconscout/react-unicons/icons/uil-arrow-down'
import UilComment from '@iconscout/react-unicons/icons/uil-comment.js' 
import UilShare from '@iconscout/react-unicons/icons/uil-share.js'
import UilBookmark from '@iconscout/react-unicons/icons/uil-bookmark.js'
import styles from './styles/PostRender.module.css'
import { updateUserData } from '../apis/userApi.js'
import { updatePostData } from '../apis/postApi.js'

const PostRender = ({postData}) => {


  const [likesCount,setLikesCount] = useState(postData.likesCount)
  const [isLiked,setLiked] = useState(false)
  const [isDisliked,setDisliked] = useState(false) 
  const [saved,setSaved] = useState()
  const {userData, setUserData} = useContext(UserDataContext)
  const {userModal,toggleUserModal} = useContext(UserModalContext)

  const checkPost = () => {
    if(!userData)return
    if(userData.likedPosts.includes(postData._id))setLiked(true)
    else if(userData.dislikedPosts.includes(postData._id))setDisliked(true)
    if(userData.savedPosts.includes(postData._id))setSaved(true)
  }

  useEffect(() => {
    checkPost()
  },[])

  useEffect(() => {
    checkPost()
  },[userModal]) 


  useEffect(() => {
    updatePostData(postData._id,{...postData,likesCount})
  }, [likesCount])

  const likeHandler = (e) => {
    e.stopPropagation()
    if(!userData){toggleUserModal();return}

    let likedPosts = []
    let dislikedPosts = []

    if(isLiked){
      setLikesCount(likes => likes - 1)
      setLiked(false)
      likedPosts = userData.likedPosts.filter((_id) => _id !== postData._id)
      updateUserData(userData,{...userData,likedPosts})
        .then((result) => {setUserData(result)})
    }

    else if(isDisliked){
      setDisliked(false)
      setLiked(true)
      setLikesCount(likes => likes + 2)
      likedPosts = [...userData.likedPosts,postData._id]
      dislikedPosts = userData.dislikedPosts.filter((posts) => {posts !== postData._id})
      updateUserData(userData,{...userData,dislikedPosts,likedPosts}).then(result => setUserData(result))
    }

    else {
      setLiked(true)
      setLikesCount( likes => likes + 1)
      likedPosts = [...userData.likedPosts,postData._id]
      updateUserData(userData,{...userData,likedPosts})
        .then((result) => {setUserData(result)})
    }
  
  }

  const dislikeHandler = (e) => {
    e.stopPropagation()
    if(!userData){toggleUserModal();return}

    let likedPosts = []
    let dislikedPosts = []

    if(isDisliked){
      setLikesCount(likes => likes + 1)
      setDisliked(false)
      dislikedPosts = userData.dislikedPosts.filter((_id) => _id !== postData._id)
      updateUserData(userData,{...userData,dislikedPosts})
        .then((result) => {setUserData(result)})
    }

    else if(isLiked){
      setLiked(false)
      setDisliked(true)
      setLikesCount(likes => likes - 2)
      dislikedPosts = [...userData.dislikedPosts,postData._id]
      likedPosts = userData.likedPosts.filter((posts) => {posts !== postData._id})
      updateUserData(userData,{...userData,dislikedPosts,likedPosts}).then(result => setUserData(result))
    }

    else{
      setDisliked(true)
      setLikesCount(likes => likes - 1)
      dislikedPosts = [...userData.dislikedPosts,postData._id]
      updateUserData(userData,{...userData,dislikedPosts}).then()
        .then((result) => {setUserData(result)})
    }
  }

  const saveHandler = (e) => {
    e.stopPropagation()
    updateUserData(userData,{savedPosts: [...userData.savedPosts, postData._id]})
      .then(result => {
        setUserData(result)
    })
  }

  return(
    <div className={styles['content']}>
      <div className={styles['rating']}>

        <UilArrowUp 
          onClick={e => likeHandler(e)} 
          size={35} 
          className={styles[(isLiked && 'liked')]}/>

        <div className={
          `${styles['likes-count']} 
            ${styles[(isDisliked && 'disliked')]} 
            ${styles[(isLiked && 'liked')]}`
        }>{likesCount}</div>

        <UilArrowDown 
          onClick = {e => dislikeHandler(e)} 
          size={35} 
          className={styles[(isDisliked && 'disliked')]}/>
      </div>

      <div className={styles['inner-content']}>
        <div>
          <span>c/{postData.channelName}</span> 
          Posted by u\{postData.ownerUsername} 
          {dateUtils.getTimeDifference(postData._createdOn)} ago
        </div>
        <h3>{postData.title}</h3>
        <p>{postData.text}</p>
        <div className={styles['options-container']}>
          <div>
            <UilComment size={25}/> 
            <span>{postData.commentCount} {postData.commentCount>1?'comment':'comments'}</span>
          </div>
          <div>
            <UilShare />
            <span>Share</span>
          </div>
          {userData&&
            <div onClick={e => 
              saveHandler(e)
            }>
              <UilBookmark />
              <span>Save</span>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default PostRender
