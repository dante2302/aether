import PostRating from './PostRating.jsx'

import * as dateUtils from '../utils/dateUtils.js'

import { useState, useEffect, useContext } from 'react'

import UserDataContext from '../contexts/UserDataContext'
import UserModalContext from '../contexts/UserModalContext'

import UilComment from '@iconscout/react-unicons/icons/uil-comment.js' 
import UilShare from '@iconscout/react-unicons/icons/uil-share.js'
import UilBookmark from '@iconscout/react-unicons/icons/uil-bookmark.js'
import styles from './styles/PostRender.module.css'
import { updateUserData } from '../apis/userApi.js'

const PostRender = ({postData}) => {
  const [isSaved,setSaved] = useState()
  const {userData, setUserData} = useContext(UserDataContext)
  const {userModal,toggleUserModal} = useContext(UserModalContext)

  const checkSaved = () => {
    if(!userData)return
    if(userData.savedPosts.includes(postData._id))setSaved(true);
  }

  useEffect(() => {
    checkSaved()
  },[])

  useEffect(() => {
    checkSaved()
  },[userModal]) 

  const saveHandler = (e) => {
    e.stopPropagation()

    const savedPosts =
      isSaved  
        ?
        userData.savedPosts.filter((postId) => postId !== postData._id)
        :
        [...userData.savedPosts,postData._id]

    updateUserData(userData,{...userData,savedPosts})
      .then(result => {
        setUserData(result)
      })
    setSaved(!isSaved)
  }

  return(
    <div className={styles['content']}>
      <PostRating postData={postData} />
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
