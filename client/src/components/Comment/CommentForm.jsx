
import { useContext, useState } from 'react'

import { createComment } from '../apis/commentApi'
import useDisabled from '../hooks/useDisabled'
import userDataContext from '../contexts/UserDataContext'

const CommentForm = ({postId,replyTo,isReply,parentCommentId}) => {
  const { userData } = useContext(userDataContext)
  const [text,setText] = useState('')

  const changeHandler = (e) => setText(e.target.value)

  const submitHandler = async (e,text) => {
    console.log(replyTo)
    e.preventDefault()
    const result = await createComment(userData,{replyTo,parentCommentId,postId,text})        
    console.log(result)
  } 

  const [disabled,submitHandlerWithDisable] = useDisabled(submitHandler)
  

  return (
    <form onSubmit={(e) => submitHandlerWithDisable(e,text)}>
      <div>
        <textarea id='text' name='text' onChange={(e) => changeHandler(e)}/>
        {!text && <label htmlFor='text'>What are your thoughts?</label>}
      </div>
      <button disabled={disabled}>{ isReply ? 'Reply' : 'Comment' }</button>
    </form>
  )
}

export default CommentForm
