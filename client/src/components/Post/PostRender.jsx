import * as dateUtils from '../utils/dateUtils.js'
import UilArrowUp from '@iconscout/react-unicons/icons/uil-arrow-up'
import UilArrowDown from '@iconscout/react-unicons/icons/uil-arrow-down'
import UilComment from '@iconscout/react-unicons/icons/uil-comment.js' 
import UilShare from '@iconscout/react-unicons/icons/uil-share.js'
import UilBookmark from '@iconscout/react-unicons/icons/uil-bookmark.js'
import styles from './styles/PostRender.module.css'


const PostRender = ({postData}) => {
  return(
    <div className={styles['content']}>
      <div className={styles['rating']}>
        <UilArrowUp size={35} onClick={(event)=>{console.log('a');event.stopPropagation()}}/>
        <div>{postData.likesCount}</div>
        <UilArrowDown size={35}/>
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
