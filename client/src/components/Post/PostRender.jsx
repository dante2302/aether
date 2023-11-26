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

const PostRender = ({postData}) => {
  const [likesCount,setLikesCount] = useState(postData.likesCount)
  const [isLiked,setLiked] = useState()
  const [isDisliked,setDisliked] = useState() 

  const {userData} = useContext(UserDataContext)
  const {toggleUserModal} = useContext(UserModalContext)
  
  useEffect(() => {
    if(userData){
      postData.usersLiked.includes(userData._id) && setLiked(true)
      postData.usersDisliked.includes(userData._id) && setDisliked(true)
    }
    return (() => {
      if(isLiked)likePost(userData._id)
      else if(isDisliked)dislikePost(userData._id)
    })
  },[])

  const likeHandler = (e) => {
    if(!userData){toggleUserModal();return}
    let diff = 1
    if(isLiked){
      setLikesCount(likes => likes - 1)
      setLiked(false)
      return
    }
    if(isDisliked){
      setDisliked(false)
      diff = 2
    }
    setLiked(true)
    setLikesCount(likes => likes + diff)
    e.stopPropagation()
  }

  const dislikeHandler = (e) => {
    if(!userData){toggleUserModal();return}
    let diff = 1
    if(isDisliked){
      setLikesCount(likes => likes + 1)
      setDisliked(false)
      return
    }
    if(isLiked){
      setLiked(false)
      diff = 2
    }
    setDisliked(true)
    setLikesCount(likes => likes - diff)
    e.stopPropagation()
  }

  const saveHandler = (e) => {
  }

  return(
    <div className={styles['content']}>
      <div className={styles['rating']}>
        <UilArrowUp size={35} onClick={e => likeHandler(e)} className={styles[isLiked&&'liked']}/>
        <div className={
        `${styles['likes-count']} 
         ${styles[isDisliked&&'disliked']} 
         ${styles[isLiked&&'liked']}`
        }>{likesCount}</div>
        <UilArrowDown size={35} onClick = {e => dislikeHandler(e)} className={styles[isDisliked&&'disliked']}/>
      </div>
      <div className={styles['inner-content']}>
        <div><span>c/{postData.channelName}</span> Posted by u\{postData.ownerUsername} {dateUtils.getTimeDifference(postData._createdOn)} ago</div>
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
          <div onClick={e => {
            e.stopPropagation()
          }}>
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
