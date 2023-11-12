import { Link } from "react-router-dom"
import * as dateUtils from '../utils/dateUtils.js'

const PostRender = (postData) => {
  return(
    <Link>
      <div>
        <button>Upvote</button>
        <div>{postData.likesCount}</div>
        <button>Downvote</button>
      </div>
      <div>
        <div><span>ac/{channelName}</span> Posted by au\User1 {dateUtils.getTimeDifference(postData._createdOn)}ago</div>
        <h3>{title}</h3>
        <p>{text}</p>
        <div>
          <div>
            {postData.commentCount} {postData.commentCount>1?comment:comments}
          </div>
          <div>
            Share
         </div>
        </div>
      </div>
    </Link>
  )
}

export default PostRender
