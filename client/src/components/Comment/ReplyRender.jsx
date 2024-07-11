import CommentCreateForm from "./CommentCreateForm"
import CommentEditForm from "./CommentEditForm"
import DeleteConfirmation from "../DeleteConfirmation/DeleteConfirmation"

import { useContext, useState, useEffect } from "react"

import UserDataContext from "../../contexts/UserDataContext"

import UilPen from '@iconscout/react-unicons/icons/uil-pen'
import UilX from '@iconscout/react-unicons/icons/uil-x'

import styles from './styles/CommentRender.module.css'
import ReplyCreateForm from "./ReplyCreateForm"
import { deleteReply } from "../../services/replyService"
export default function ReplyRender({replies, data, parentCommentData, setReplies, setCommentCount}){

  const [replyData,setReplyData] = useState(data)
  const [isReplying,setReplying] = useState(false)
  const [isEditing,setEditing] = useState(false)
  const [isDeleting,setDeleting] = useState(false)
  const [isOwner,setIsOwner] = useState(false)

  const {userData} = useContext(UserDataContext)

  async function handleDelete(){
    await deleteReply(userData.accessToken, replyData.id);
    setReplies(replies => replies.filter(r => r.id != replyData.id && r.replyToComment != replyData.id))
    setCommentCount(count => count - 1);
  }

  useEffect(() => {
    setIsOwner(userData && replyData.ownerId === userData.id)
  },[userData])

  return (
    <div>
      <div className={styles['container']}>
      <h6 className={styles['username']}>{replyData.ownerUsername}</h6>

      {isOwner && 
        <>

          <button onClick={() => {
            if(isReplying) setReplying(false)
            setEditing(!isEditing)
          }}
          className={styles['edit-btn']}
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
          className={styles['del-btn']}
            > <UilX size={15} /> </button>
          }
        </>
      }
      </div>
      <div className={styles['bottom-container']}>

      {isEditing ? 
        <CommentEditForm 
          commentData={replyData} 
          setCommentData={setReplyData} 
          setEditing={setEditing}
          isReply={true}
        />
          :
          <p>{`@${replyData.replyToUsername} ${replyData.text}`}</p>
      } 

      {isReplying && 
        <ReplyCreateForm 
          parentCommentData={parentCommentData}
          replyData={replyData}
          setReplying={setReplying}
          replies={replies}
          setReplies={setReplies}
          setCommentCount={setCommentCount}
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
            message={"Are you sure you want to delete this reply?"}
            deleteRequest={handleDelete}
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