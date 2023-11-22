
import { useState, useEffect, useContext } from 'react'

import UserDataContext from '../contexts/UserDataContext'

import * as dateUtils from '../utils/dateUtils.js'

import UilArrowUp from '@iconscout/react-unicons/icons/uil-arrow-up'
import UilArrowDown from '@iconscout/react-unicons/icons/uil-arrow-down'
import UilComment from '@iconscout/react-unicons/icons/uil-comment.js' 
import UilShare from '@iconscout/react-unicons/icons/uil-share.js'
import UilBookmark from '@iconscout/react-unicons/icons/uil-bookmark.js'
import styles from './styles/PostRender.module.css'

const PostRender = ({postData}) => {
  const {userData} = useContext(UserDataContext)
  const [isLiked,setLiked] = useState()
  const [isDisliked,setDisliked] = useState() 
  
  useEffect(() => {
    if(userData){
      postData.usersLiked.includes(userData._id) && setLiked(true)
      postData.usersDisliked.includes(userData._id) && setDisliked(true)
    }
  },[])

  const likeHandler = (e) => {
    setLiked(!isLiked)
    if(isDisliked)setDisliked(false)
    e.stopPropagation()
  }

  const dislikeHandler = (e) => {
    if(!userData)
    setDisliked(!isDisliked)
    if(isLiked)setLiked(false)
    e.stopPropagation()
  }

  return(
    <div className={styles['content']}>
      <div className={styles['rating']}>
        <UilArrowUp size={35} onClick={e => likeHandler(e)} className={styles[isLiked&&'liked']}/>
        <div className={
        `${styles['likes-count']} 
         ${styles[isDisliked&&'disliked']} 
         ${styles[isLiked&&'liked']}`
        }>{postData.likesCount}</div>
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
          <div>
            <UilBookmark />
            <span>Save</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostRender
