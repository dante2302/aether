
import PostRating from './PostRating.jsx'
import PostSaving from './PostSaving.jsx'
import PostSharing from './PostSharing.jsx'
import LinkPreview from './LinkPreview/LinkPreview.jsx'
import {getTimeDifference} from '../../utils/dateUtils.js'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserDataContext from '../../contexts/UserDataContext'
import UilComment from '@iconscout/react-unicons/icons/uil-comment.js' 
import styles from './styles/PostRender.module.css'
import { useWindowScroll, useWindowSize } from '@uidotdev/usehooks'

const PostRender = ({
  postData, 
  additionalPostData,
  isCompact, 
  isRedirect
}) => {

  //In case the post data changes
  const [postDataState,setPostDataState] = useState(postData)
  const [additionalPostDataState, setAdditionalPostDataState] = useState(additionalPostData);
  const { userData } = useContext(UserDataContext)
  const navigate = useNavigate()

  const redirectToPage = (e) =>{ 
    e.stopPropagation()
    navigate(`/c/${additionalPostData.channelName}/${postData.id}`)
  }

  return(
    <div className={
     `${styles['content']} 
      ${isRedirect ? styles['redirect'] : ''}`} 
      // onClick={e => redirectToPage(e)}
    >
      <PostRating 
        postData={{...additionalPostDataState, id: postDataState.id}} 
      />

      <div 
        className={
         `${styles['inner-content']} 
          ${isRedirect ? styles['redirect'] : ''}`} 
        onClick={(e) => redirectToPage(e)}
      >
        <div>

          <span 
            className={styles['channel-name']} 
            onClick={(e) => {
            e.stopPropagation();
            navigate(`/c/${additionalPostData.channelName}`)
            }}
          >c/{additionalPostData.channelName} </span> 

          <span> Posted by </span> 

          <span className={styles['username']} 
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/u/${additionalPostData.ownerUsername}`)
            }}
          >u\{additionalPostData.ownerUsername}</span> 

          <span> {getTimeDifference(postData.dateOfCreation)} ago</span>
        </div>

        <h1>{postData.title}</h1>


        {postData.imgUrl && 
          <img src={postData.imgUrl} className={styles['post-image']}/>
        }
        {postData.text &&(
         isCompact 
          ? 
          <p>{postData.text.substring(0,150)}...</p>
          :
          <p>{postData.text}</p>)
        }
        {!isCompact && <LinkPreview url={postData.linkUrl} isCompact={isCompact}/>}

        <div className={styles['options-container']}>
            <div>
              <UilComment size={20}/> 
              <span>{additionalPostData.commentCount} Comments</span>
            </div>

          <PostSharing postId={postData.id} channelName={additionalPostData.channelName}/>

          {userData && 
            <PostSaving postData={postData}/>
          }
        </div>
      </div>
    </div>
  )
}

export default PostRender