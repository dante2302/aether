import styles from './styles/PostRender.module.css'
import { useState, useEffect, useContext } from "react"

import UserDataContext from '../contexts/UserDataContext'
import UserModalContext from '../contexts/UserModalContext'

import { updatePostData } from '../apis/postApi.js'

import UilArrowUp from '@iconscout/react-unicons/icons/uil-arrow-up'
import UilArrowDown from '@iconscout/react-unicons/icons/uil-arrow-down'
const PostRating = ({postData}) => {

  const {userData, setUserData} = useContext(UserDataContext)
  const {userModal,toggleUserModal} = useContext(UserModalContext)

  const [likesCount,setLikesCount] = useState(postData.likesCount)
  const [isLiked,setLiked] = useState(false)
  const [isDisliked,setDisliked] = useState(false) 

  useEffect(() => {
    updatePostData(postData._id,{...postData,likesCount})
  }, [likesCount])

  const checkRating = () => {
    if(!userData)return
    if(userData.likedPosts.includes(postData._id))setLiked(true)
    else if(userData.dislikedPosts.includes(postData._id))setDisliked(true)
  }

  useEffect(() => {
    checkRating()
  },[])

  useEffect(() => {
    checkRating()
  },[userModal]) 

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
  return(
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
  )
}
export default PostRating
