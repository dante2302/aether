import { useContext, useEffect, useState } from 'react'
import { createComment } from '../../services/commentService'
import useDisabled from '../../hooks/useDisabled'
import userDataContext from '../../contexts/UserDataContext'
import styles from './styles/CommentCreateForm.module.css'
import UserModalContext from '../../contexts/UserModalContext'
import { createReply } from '../../services/replyService'

const ReplyCreateForm = ({
  parentCommentData,
  replyData,
  setReplies,
  setReplying
}) => {
  const { userData } = useContext(userDataContext)
  const { toggleUserModal } = useContext(UserModalContext)
  const [text, setText] = useState('')

  const changeHandler = e => setText(e.target.value)

  const submitHandler = async (e, text) => {
    e.preventDefault()
    if (!userData) {
      toggleUserModal();
      return;
    }
    try{
      const response = await createReply(userData, { 
        parentCommentId: parentCommentData.id,
        replyToComment: replyData.id,
        text 
    })
      const replyd = (await response.json()).replyData
      console.log(replyd)
      setReplies(reply => [...reply, replyd]);
      setReplying(false);
    }
    catch(e){
      console.log(e)
    }
  }
  useEffect(() => { setDisabled(text === '') }, [text])

  const [disabled, submitHandlerWithDisable, setDisabled] = useDisabled(submitHandler)


  return (
    <form
      onSubmit={(e) => submitHandlerWithDisable(e, text)}
      className={`${styles['form']}`}
    >
      <div className={styles['input-container']}>
        <textarea id='text' name='text' onChange={(e) => changeHandler(e)} />
        {!text && <label htmlFor='text'>Reply to {replyData.ownerUsername}</label>}
      </div>
      <button disabled={disabled}>Reply</button>
    </form>
  )
}

export default ReplyCreateForm