
import { useContext, useEffect, useState } from 'react'
import { createComment } from '../../services/commentService'
import useDisabled from '../../hooks/useDisabled'
import userDataContext from '../../contexts/UserDataContext'
import styles from './styles/CommentCreateForm.module.css'
import UserModalContext from '../../contexts/UserModalContext'
import { useNavigate } from 'react-router-dom'

const CommentCreateForm = ({
  postId,
  setComments,
  setCommentCount
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
      const response = await createComment(userData, { postId, text })
      const commentData = (await response.json()).commentData
      setComments(comments => [{...commentData, ownerUsername: userData.username}, ...comments]);
      setCommentCount(count => count + 1);
      setText("");
    }
    catch(e){
      console.log(e)
      navigate("/error");
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
        <textarea id='text' name='text' onChange={(e) => changeHandler(e)} value={text}/>
        {!text && <label htmlFor='text'>What are your thoughts?</label>}
      </div>
      <button disabled={disabled}>Comment</button>
    </form>
  )
}

export default CommentCreateForm