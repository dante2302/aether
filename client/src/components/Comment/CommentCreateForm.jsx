
import { useContext, useEffect, useState } from 'react'

import { createComment } from '../../services/commentService'
import useDisabled from '../../hooks/useDisabled'
import userDataContext from '../../contexts/UserDataContext'
import styles from './styles/CommentCreateForm.module.css'
import UserModalContext from '../../contexts/UserModalContext'

const CommentCreateForm = ({
  postId,
  replyTo,
  isReply,
  parentCommentId,
  setCommentReplies,
  setReplying,
  setComments
}) => {
  const { userData } = useContext(userDataContext)
  const {toggleUserModal} = useContext(UserModalContext)
  const [text,setText] = useState('')

  const changeHandler = e => setText(e.target.value)

  const submitHandler = async (e,text) => {
    e.preventDefault()
    if(!userData)
    {
      toggleUserModal();
      return;
    }
    const result = await createComment(userData,{replyTo,parentCommentId,postId,text})        
    if(setComments)setComments((comments) => {
     return [...comments,result]
    })
    if(isReply && result){
      setCommentReplies((replies) => [...replies,result])
      setReplying(false)
    }
  } 
  useEffect(() => {
    if(text == '')setDisabled(true)
    else setDisabled(false)
  },[text])

  const [disabled,submitHandlerWithDisable,setDisabled] = useDisabled(submitHandler)
  

  return (
    <form 
      onSubmit={(e) => submitHandlerWithDisable(e,text)} 
      className={`${styles['form']} ${isReply ? styles['isReply'] : ''}`}
    >
      {isReply && <h6>Comment as {userData.username}</h6>}
        <div  className={styles['input-container']}>
          <textarea id='text' name='text' onChange={(e) => changeHandler(e)}/>
          {!text && <label htmlFor='text'>What are your thoughts?</label>}
        </div>
      <button disabled={disabled}>{ isReply ? 'Reply' : 'Comment' }</button>
    </form>
  )
}

export default CommentCreateForm
