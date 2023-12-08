
import { useContext, useState, useEffect } from "react"
import UserDataContext from "../contexts/UserDataContext"
import CommentCreateForm from "./CommentCreateForm"
import CommentEditForm from "./CommentEditForm"
import UilPen from '@iconscout/react-unicons/icons/uil-pen'
import UilX from '@iconscout/react-unicons/icons/uil-x'

const CommentRender = ({commentData, setCommentData, setCommentReplies}) => {

  const [isReplying,setReplying] = useState(false)
  const [isEditing,setEditing] = useState(false)
  const [isDeleting,setDeleting] = useState()
  const [isOwner,setIsOwner] = useState([])

  const {userData} = useContext(UserDataContext)

  useEffect(() => {
    if(userData?.comments.includes(commentData._id))setIsOwner(true)
    else setIsOwner(false)
  },[userData])

  return (
    <div>
      <h6>{commentData.ownerUsername}</h6>
      <p>
        {commentData.replyTo &&
          <span>@{commentData.replyTo}  </span>}
        {commentData.text}
      </p>

      {isOwner && 
        <button onClick={() => {
          if(isReplying) setReplying(false)
          setEditing(!isEditing)
        }}>
          {!isEditing ? <UilPen size={15}/> : 'Cancle'}
        </button>}
        <button onClick={() => {
          if(isReplying) setReplying(false)
          if(isEditing) setEditing(false)
          setDeleting(true)
        }}>
          <UilX size={15} />

        </button>


      {isEditing && 
        <CommentEditForm 
          commentData={commentData} 
          setCommentData={setCommentData} 
          setEditing={setEditing}
        />
      } 
        
      {userData && 
        <button onClick={() => 
          setReplying(!isReplying)}>
          {isReplying ? 'Cancle' : 'Reply'}
        </button> 
      }

      {isReplying && 
        <CommentCreateForm 
          postId={commentData.postId}
          parentCommentId={commentData.parentCommentId }
          isReply={true}
          replyTo={commentData.ownerUsername}
          setReplying={setReplying}
          setCommentReplies={setCommentReplies}
        />
      }

    </div>
  )
}

export default CommentRender
