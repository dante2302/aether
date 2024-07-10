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
export default function ReplyRender({replies, data, parentCommentData, setReplies}){

  const [replyData,setReplyData] = useState(data)
  const [isReplying,setReplying] = useState(false)
  const [isEditing,setEditing] = useState(false)
  const [isDeleting,setDeleting] = useState(false)
  const [isOwner,setIsOwner] = useState(false)

  const {userData} = useContext(UserDataContext)

  async function handleDelete(){
    await deleteReply(userData.accessToken, replyData.id);
    setReplies(replies => replies.filter(r => r.id != replyData.id))
  }

  useEffect(() => {
    setIsOwner(userData && replyData.ownerId === userData.id)
  },[userData])

  return (
    <div>
      <div className={styles['top-container']}>
      <h6 className={styles['username']}>{replyData.ownerUsername}</h6>

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

      <p>{`@${replyData.replyToUsername} ${replyData.text}`}</p>

      {isEditing && 
        <CommentEditForm 
          commentData={replyData} 
          setCommentData={setReplyData} 
          setEditing={setEditing}
        />
      } 

      {isReplying && 
        <ReplyCreateForm 
          parentCommentData={parentCommentData}
          replyData={replyData}
          setReplying={setReplying}
          replies={replies}
          setReplies={setReplies}
        />
      }
      {isDeleting &&
        <DeleteConfirmation 
            setDeleting={setDeleting} 
            message={"Are you sure you want to delete this reply?"}
            deleteRequest={handleDelete}
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