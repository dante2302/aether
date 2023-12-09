import CommentCreateForm from "./CommentCreateForm"
import CommentEditForm from "./CommentEditForm"
import DumbCommentRender from "./DumbCommentRender"
import DeleteConfirmation from "../DeleteConfirmation/DeleteConfirmation"

import { useContext, useState, useEffect } from "react"

import UserDataContext from "../../contexts/UserDataContext"

import UilPen from '@iconscout/react-unicons/icons/uil-pen'
import UilX from '@iconscout/react-unicons/icons/uil-x'

import styles from './styles/CommentRender.module.css'

const CommentRender = ({data, setCommentReplies,setComments}) => {
  const [commentData,setCommentData] = useState(data)
  const [isReplying,setReplying] = useState(false)
  const [isEditing,setEditing] = useState(false)
  const [isDeleting,setDeleting] = useState(false)
  const [isOwner,setIsOwner] = useState(false)


  const {userData} = useContext(UserDataContext)

  const deleteComment = () => {
    setComments((comments) => comments.filter((comment) => comment === commentData._id))
  }
  console.log(data)
  console.log(userData)

  useEffect(() => {
    if(commentData._ownerId === userData._ownerId)setIsOwner(true)
    else setIsOwner(false)
  },[userData])

  return (
    <div>
      <DumbCommentRender data={commentData} />
      {isOwner && 
        <div className={styles['container']}>

          <button onClick={() => {
            if(isReplying) setReplying(false)
            setEditing(!isEditing)
          }}
          className={styles['btn']}
          >
            {!isEditing ? <UilPen size={15}/> : 'Cancle'}
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


      {isEditing && 
        <CommentEditForm 
          commentData={commentData} 
          setCommentData={setCommentData} 
          setEditing={setEditing}
        />
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
      {isDeleting &&
        <DeleteConfirmation id={commentData._id} type={'comment'} setDeleting={setDeleting} setAsset={deleteComment}/>
      }
      {userData && 
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
