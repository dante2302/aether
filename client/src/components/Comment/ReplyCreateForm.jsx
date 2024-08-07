import { useContext, useEffect, useState } from 'react'
import { createComment } from '../../services/commentService'
import useDisabled from '../../hooks/useDisabled'
import userDataContext from '../../contexts/UserDataContext'
import styles from './styles/ReplyCreateForm.module.css'
import UserModalContext from '../../contexts/UserModalContext'
import { createReply, getAdditionalReplyData } from '../../services/replyService'
import { useNavigate } from 'react-router-dom'

const ReplyCreateForm = ({
  parentCommentData,
  replyData,
  replies,
  setReplies,
  setReplying,
  setCommentCount,
  children
}) => {
  const { userData } = useContext(userDataContext)
  const { toggleUserModal } = useContext(UserModalContext)
  const [text, setText] = useState('')
  const navigate = useNavigate();

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
      let replyd = (await response.json()).replyData;
      replyd =  await getAdditionalReplyData(replyd, replies, parentCommentData)
      setReplies(replies => [...replies, replyd])
      setCommentCount(count => count + 1);
      setReplying(false);
    }
    catch(e){
      console.log(e)
      navigate("/error")
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
      <div className={styles['button-container']}>
        <button disabled={disabled} className={styles['reply-btn']}>Reply</button>
        {children}
      </div>
    </form>
  )
}

export default ReplyCreateForm