import { Link } from "react-router-dom"
import * as dateUtils from '../utils/dateUtils.js'
import UilArrowUp from '@iconscout/react-unicons/icons/uil-arrow-up'
import UilArrowDown from '@iconscout/react-unicons/icons/uil-arrow-down'
import UilComment from '@iconscout/react-unicons/icons/uil-comment.js' 
import UilShare from '@iconscout/react-unicons/icons/uil-share.js'
import styles from './styles/PostRender.module.css'

const PostRender = ({postData}) => {
  console.log(postData)
  return(
    <Link>
      <div>
        <UilArrowUp size={25}/>
        <div>{postData.likesCount}</div>
        <UilArrowDown size={25}/>
      </div>
      <div>
        <div><span>c/</span> Posted by u\User1 {dateUtils.getTimeDifference(postData._createdOn)} ago</div>
        <h3>{postData.title}</h3>
        <p>{postData.text}</p>
        <div>
          <div className={styles['comments-container']}>
            <UilComment size={25}/> {postData.commentCount} {postData.commentCount>1?'comment':'comments'}
          </div>
          <div className={styles['share-container']}>
            <UilShare />
            Share
         </div>
        </div>
      </div>
    </Link>
  )
}

export default PostRender
