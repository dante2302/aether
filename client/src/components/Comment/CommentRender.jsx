import CommentCreateForm from "./CommentCreateForm"
import CommentEditForm from "./CommentEditForm"
import DeleteConfirmation from "../DeleteConfirmation/DeleteConfirmation"

import { useContext, useState, useEffect } from "react"

import UserDataContext from "../../contexts/UserDataContext"

import { getFullDateFormat } from '../../utils/dateUtils.js'
import UilPen from '@iconscout/react-unicons/icons/uil-pen'
import UilX from '@iconscout/react-unicons/icons/uil-x'

import styles from './styles/CommentRender.module.css'
import ReplyCreateForm from "./ReplyCreateForm"
import { deleteComment } from "../../services/commentService"

const CommentRender = ({data, setComments, setCommentReplies, setCommentCount}) => {
  const [commentData,setCommentData] = useState(data)
  const [isReplying,setReplying] = useState(false)
  const [isEditing,setEditing] = useState(false)
  const [isDeleting,setDeleting] = useState(false)
  const [isOwner,setIsOwner] = useState(false)

  const {userData} = useContext(UserDataContext)
  async function handleDelete(){
    await deleteComment(userData.accessToken, commentData.id);
    setCommentReplies(replies => {
      setComments(comments => comments.filter(c => c.id != commentData.id));
      const replyCount = replies.filter(r => r.parentCommentId == commentData.id).length
      setCommentCount(count => {
        return (count - replyCount - 1)});
      return replies;
    })
  }
  useEffect(() => {
    setIsOwner(userData && commentData.ownerId === userData.id)
  },[userData])

  return (
    <div className={styles['outer']}>
      <div className={styles['container']}>

      <h6 className={styles['username']}>{data.ownerUsername}</h6>
      <h6 className={styles['date']}>{getFullDateFormat(data.dateOfCreation)}</h6>
      {(isOwner && !isEditing) &&
        <>
          <button onClick={() => {
            if(isReplying) setReplying(false)
            setEditing(!isEditing)
          }}
          className={styles['edit-btn']}
          ><UilPen size={15}/>
          </button>

          {!isEditing &&
            <button 
              onClick={() => {
                if(isReplying) setReplying(false)
                if(isEditing) setEditing(false)
                setDeleting(true)
              }}
          className={styles['del-btn']}
            > <UilX size={15} /> </button>
          }
        </>
      }
      </div>
    <div className={styles['bottom-container']}>
      {isEditing ?
        <CommentEditForm 
          commentData={commentData} 
          setCommentData={setCommentData} 
          setEditing={setEditing}
        >
          <button onClick={() => {
            setEditing(false)
          }}
          className={styles['cancel-btn']}
          >Cancle
          </button>
        </CommentEditForm>
        :
        <p>{commentData.text}</p>
      } 

      {isReplying && 
        <ReplyCreateForm 
          parentCommentData={commentData}
          setCommentCount={setCommentCount}
          replyData={commentData}
          setReplying={setReplying}
          setReplies={setCommentReplies}
        >
          <button onClick={() => 
            setReplying(!isReplying)}
            className={styles['cancel-btn']}
          >Cancel</button> 
        </ReplyCreateForm>
      }
      {isDeleting &&
        <DeleteConfirmation 
          setDeleting={setDeleting} 
          deleteRequest={handleDelete}
          message={`Are you sure you want to delete this comment: \n\n"${commentData.text}"?`}
          />
      }
      {(userData && !isEditing && !isReplying) &&
        <button onClick={() => 
          setReplying(!isReplying)}
          className={styles['reply-btn']}
        >Reply</button> 
      }
    </div>
    </div>
  )
}

export default CommentRender
