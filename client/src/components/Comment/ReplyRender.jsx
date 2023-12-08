import { useContext, useState, useEffect } from "react"
import UserDataContext from "../contexts/UserDataContext"
import CommentCreateForm from "./CommentCreateForm"
import CommentEditForm from "./CommentEditForm"
import UilPen from '@iconscout/react-unicons/icons/uil-pen'
import DumbCommentRender from './DumbCommentRender'

const ReplyRender = ({data}) => {

  const [replyData,setReplyData] = useState(data)
  const [isReplying,setReplying] = useState(false)
  const [isEditing,setEditing] = useState(false)
  const [isDeleting,setDeleting] = useState()

  const [isOwner] = useState([])

  const {userData} = useContext(UserDataContext)

  return (
    <div>
      <DumbCommentRender data={replyData}/>

      {isOwner && 
        <button onClick={() => {
          if(isReplying) setReplying(false)
          setEditing(!isEditing)
        }}>
          {!isEditing ? <UilPen size={15}/> : 'Cancle'}
        </button>}

      {isEditing && 
        <CommentEditForm 
          commentData={replyData}
          setCommentData={setReplyData} 
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
          postId={replyData.postId}
          parentCommentId={replyData.parentCommentId }
          isReply={true}
          replyTo={replyData.ownerUsername}
        />
      }
  </div>
  )
}
export default ReplyRender
