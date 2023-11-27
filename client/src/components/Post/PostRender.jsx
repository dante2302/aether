import PostRating from './PostRating.jsx'
import PostSaving from './PostSaving.jsx'

import {getTimeDifference} from '../utils/dateUtils.js'

import { useState, useEffect, useContext } from 'react'

import UserDataContext from '../contexts/UserDataContext'

import UilComment from '@iconscout/react-unicons/icons/uil-comment.js' 
import UilShare from '@iconscout/react-unicons/icons/uil-share.js'
import styles from './styles/PostRender.module.css'

const PostRender = ({postData}) => {
  const {userData} = useContext(UserDataContext)

  return(
    <div className={styles['content']}>
      <PostRating postData={postData} />
      <div className={styles['inner-content']}>
        <div>
          <span>c/{postData.channelName}</span> 
          Posted by u\{postData.ownerUsername} 
          {getTimeDifference(postData._createdOn)} ago
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
          {userData && <PostSaving postData={postData}/>}
        </div>
      </div>
    </div>
  )
}

export default PostRender
