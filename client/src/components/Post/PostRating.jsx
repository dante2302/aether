import styles from './styles/PostRender.module.css'
import { useState, useEffect, useContext } from "react"

import UserDataContext from '../contexts/UserDataContext'
import UserModalContext from '../contexts/UserModalContext'

import { updatePostData } from '../apis/postApi.js'
import { updateUserData } from '../apis/userApi'

import UilArrowUp from '@iconscout/react-unicons/icons/uil-arrow-up'
import UilArrowDown from '@iconscout/react-unicons/icons/uil-arrow-down'

const PostRating = ({postDataState,setPostDataState}) => {

  const {userData, setUserData} = useContext(UserDataContext)
  const {userModal,toggleUserModal} = useContext(UserModalContext)

  const [likesCount,setLikesCount] = useState(postDataState.likesCount)
  const [isLiked,setLiked] = useState(false)
  const [isDisliked,setDisliked] = useState(false) 

  const checkRating = () => {
    if(!userData || Object.keys(userData).length === 0){setLiked(false) ; setDisliked(false) ; return}
    if(userData.likedPosts.includes(postDataState._id))setLiked(true);
    else if(userData.dislikedPosts.includes(postDataState._id))setDisliked(true);
  }

  useEffect(() => {checkRating()},[])

  useEffect(() => {checkRating()},[userData]) 


  const likeHandler = (e) => {
    e.stopPropagation()
    if(!userData){toggleUserModal();return}

    let likedPosts = []
    let dislikedPosts = []

    if(isLiked){
      setLikesCount(likes => likes - 1)
      setLiked(false)
      likedPosts = userData.likedPosts.filter((_id) => _id !== postDataState._id)
      updateUserData(userData,{likedPosts})
        .then((result) => {setUserData({...userData,...result})})
        .then(() => updatePostData(postDataState._id,{likesCount:likesCount-1})
          .then((data) =>{
            setPostDataState(data)
          }))
    }

    else if(isDisliked){
      setDisliked(false)
      setLiked(true)
      setLikesCount(likes => likes + 2)
      likedPosts = [...userData.likedPosts,postDataState._id]
      dislikedPosts = userData.dislikedPosts.filter((posts) => posts !== postDataState._id)
      updateUserData(userData,{dislikedPosts,likedPosts})
        .then(result => setUserData(result))
        .then(() => updatePostData(postDataState._id,{likesCount:likesCount+2})
          .then((data) =>{
            setPostDataState(data)
          }))
    }

    else {
      setLiked(true)
      setLikesCount( likes => likes + 1)
      likedPosts = [...userData.likedPosts,postDataState._id]
      updateUserData(userData,{likedPosts})
        .then((result) => {setUserData(result)})
        .then(() => updatePostData(postDataState._id,{likesCount:likesCount+1})
          .then((data) =>{
            setPostDataState(data)
          }))
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
      dislikedPosts = userData.dislikedPosts.filter((_id) => _id !== postDataState._id)
      updateUserData(userData,{dislikedPosts})
        .then((result) => {setUserData(result)})
        .then(() => updatePostData(postDataState._id,{likesCount:likesCount+1})
          .then((data) =>{
            setPostDataState(data)
          }))
    }

    else if(isLiked){
      setLiked(false)
      setDisliked(true)
      setLikesCount(likes => likes - 2)
      dislikedPosts = [...userData.dislikedPosts,postDataState._id]
      likedPosts = userData.likedPosts.filter((posts) => posts !== postDataState._id)
      updateUserData(userData,{dislikedPosts,likedPosts})
        .then(result => setUserData(result))
        .then(() => updatePostData(postDataState._id,{likesCount:likesCount-2})
          .then((data) =>{
            setPostDataState(data)
           setPostData && setPostData(data)
          }))
    }

    else{
      setDisliked(true)
      setLikesCount(likes => likes - 1)
      dislikedPosts = [...userData.dislikedPosts,postDataState._id]
      updateUserData(userData,{dislikedPosts}).then()
        .then((result) => {setUserData(result)})
        .then(() => updatePostData(postDataState._id,{likesCount:likesCount-1})
          .then((data) =>{
            setPostDataState(data)
          }))
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
