
import PostRating from './PostRating.jsx'
import PostSaving from './PostSaving.jsx'
import LinkPreview from './LinkPreview/LinkPreview.jsx'

import {getTimeDifference} from '../utils/dateUtils.js'

import { useContext, useState } from 'react'

import UserDataContext from '../contexts/UserDataContext'

import UilComment from '@iconscout/react-unicons/icons/uil-comment.js' 
import UilShare from '@iconscout/react-unicons/icons/uil-share.js'
import styles from './styles/PostRender.module.css'
import { useNavigate } from 'react-router-dom'

const PostRender = ({postData,setPostData,redirect}) => {

  const [postDataState,setPostDataState] = useState(postData)
  const {userData} = useContext(UserDataContext)
  const navigate = useNavigate()
  return(
    <div className={styles['content']} >
      <PostRating postDataState={postDataState} setPostDataState={setPostDataState} />
      <div className={`${styles['inner-content']} ${styles['redirect']}`} onClick={() => navigate(`/c/react/${postData._id}`)}>
        <div>
          <span>c/{postData.channelName}</span> 
          <span>Posted by u\{postData.ownerUsername} </span> 
          <span>{getTimeDifference(postData._createdOn)} ago</span>
        </div>
        <h3>{postData.title}</h3>
        {postData.linkUrl && 
          <LinkPreview url={postData.linkUrl} />
        }
        <p>{postData.text}</p>
        {postData.imgUrl && 
          <img src={postData.imgUrl} alt='Image Not Found!' className={styles['post-image']}/>}
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
