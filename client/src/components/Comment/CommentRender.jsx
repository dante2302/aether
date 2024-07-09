import CommentCreateForm from "./CommentCreateForm"
import CommentEditForm from "./CommentEditForm"
import DeleteConfirmation from "../DeleteConfirmation/DeleteConfirmation"

import { useContext, useState, useEffect } from "react"

import UserDataContext from "../../contexts/UserDataContext"

import UilPen from '@iconscout/react-unicons/icons/uil-pen'
import UilX from '@iconscout/react-unicons/icons/uil-x'

import styles from './styles/CommentRender.module.css'
import ReplyCreateForm from "./ReplyCreateForm"
import { deleteComment } from "../../services/commentService"

const CommentRender = ({data, setComments, setCommentReplies}) => {
  const [commentData,setCommentData] = useState(data)
  const [isReplying,setReplying] = useState(false)
  const [isEditing,setEditing] = useState(false)
  const [isDeleting,setDeleting] = useState(false)
  const [isOwner,setIsOwner] = useState(false)

  const {userData} = useContext(UserDataContext)
  async function handleDelete(){
    await deleteComment(userData.accessToken, commentData.id);
    setComments(comments => comments.filter(c => c.id != commentData.id))
  }

  useEffect(() => {
    setIsOwner(userData && commentData.ownerId === userData.id)
  },[userData])

  return (
    <div>
      <div className={styles['top-container']}>

      <h6 className={styles['username']}>{data.ownerUsername}</h6>

      {isOwner && 
        <div className={styles['container']}>

          <button onClick={() => {
            if(isReplying) setReplying(false)
            setEditing(!isEditing)
          }}
          className={styles['btn']}
          >
            {!isEditing ? <UilPen size={15}/> : 'Cancel'}
          </button>

          {!isEditing &&
            <button 
              onClick={() => {
                if(isReplying) setReplying(false)
                if(isEditing) setEditing(false)
                setDeleting(true)
              }}
          className={styles['btn']}
            > <UilX size={15} /> </button>
          }
        </div>
      }
      </div>

      {isEditing ?
        <CommentEditForm 
          commentData={commentData} 
          setCommentData={setCommentData} 
          setEditing={setEditing}
        />
        :
        <p>{commentData.text}</p>
      } 

      {isReplying && 
        <ReplyCreateForm 
          parentCommentData={commentData}
          replyData={commentData}
          setReplying={setReplying}
          setReplies={setCommentReplies}
        />
      }
      {isDeleting &&
        <DeleteConfirmation 
          setDeleting={setDeleting} 
          deleteRequest={handleDelete}
          message={`Are you sure you want to delete this comment: ${commentData.text}`}
          />
      }
      {(userData && !isEditing) &&
        <button onClick={() => 
          setReplying(!isReplying)}
          className={styles['btn']}
        >
          {isReplying ? 'Cancle' : 'Reply'}
        </button> 
      }

    </div>
  )
}

export default CommentRender
