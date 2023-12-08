
import { useContext, useState } from 'react'

import { createComment } from '../../apis/commentApi'
import useDisabled from '../../hooks/useDisabled'
import userDataContext from '../../contexts/UserDataContext'
import styles from './styles/CommentCreateForm.module.css'

const CommentCreateForm = ({
  postId,
  replyTo,
  isReply,
  parentCommentId,
  setCommentReplies,
  setReplying
}) => {
  const { userData } = useContext(userDataContext)
  const [text,setText] = useState('')

  const changeHandler = e => setText(e.target.value)

  const submitHandler = async (e,text) => {
    e.preventDefault()
    const result = await createComment(userData,{replyTo,parentCommentId,postId,text})        
    if(isReply && result){
      setCommentReplies((replies) => [...replies,result])
      setReplying(false)
    }
  } 

  const [disabled,submitHandlerWithDisable] = useDisabled(submitHandler)
  

  return (
    <form 
      onSubmit={(e) => submitHandlerWithDisable(e,text)} 
      className={`${styles['form']} ${isReply ? styles['isReply'] : ''}`}
    >
      {isReply && <h6>Comment as {userData.username}</h6>}
        <div>
          <textarea id='text' name='text' onChange={(e) => changeHandler(e)}/>
          {!text && <label htmlFor='text'>What are your thoughts?</label>}
        </div>
      <button disabled={disabled}>{ isReply ? 'Reply' : 'Comment' }</button>
    </form>
  )
}

export default CommentCreateForm
