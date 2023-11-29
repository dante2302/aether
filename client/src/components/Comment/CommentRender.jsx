
import { useContext, useEffect, useState } from "react"
// import { getCommentData } from "../apis/commentApi"
import UserDataContext from "../contexts/UserDataContext"
// import { getUserDataByProp } from '../apis/userApi'
import CommentForm from "./CommentForm"

const CommentRender = ({commentData}) => {
const [isReplying,setReplying] = useState(false)
const { userData } = useContext(UserDataContext)
  return (
    <div>
      <h6>{commentData.ownerUsername}</h6>
      <p><span>{commentData.replyTo}</span>   {commentData.text}</p>

      {userData && 
          <button onClick={() => setReplying(!isReplying)}>{isReplying ? 'Cancle' : 'Reply'}</button> 
      }

      {isReplying && 
        <CommentForm 
          postId={commentData.postId}
          parentCommentId={commentData.parentCommentId || commentData._id}
          isReply={true}
          replyTo={commentData.ownerUsername}
        />
      }

    </div>
  )
}

export default CommentRender
