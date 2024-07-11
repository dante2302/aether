import useDisabled from "../../hooks/useDisabled"
import { updateComment } from "../../services/commentService"
import userDataContext from '../../contexts/UserDataContext'
import { useContext, useEffect, useState } from "react"
import { updateReply } from "../../services/replyService"
import styles from "./styles/CommentEditForm.module.css"

const CommentEditForm = ({commentData,setCommentData,setEditing, isReply, children}) => {

  const { userData } = useContext(userDataContext)
  const [text,setText] = useState(commentData.text)
  useEffect(() => {
    if(text == commentData.text || text == "") 
      setDisabled(true) 
    else
      setDisabled(false)
    }, [text])

  const changeHandler = e => setText(e.target.value)
  const submitHandler = async (e) => {
    e.preventDefault()
    if (text == commentData.text) return
    isReply ?
      await updateReply({ accessToken: userData.accessToken, newData: { ...commentData, text } })
      :
      await updateComment({ accessToken: userData.accessToken, newData: { ...commentData, text } })
    setCommentData({...commentData, text});
    setEditing(false);
  } 
  const [disabled,submitHandlerWithDisable, setDisabled] = useDisabled(submitHandler)

return (
    <form onSubmit={submitHandlerWithDisable} className={styles['form']}>
      <textarea 
        id='text' 
        name='text' 
        value={text}
        onChange={(e) => changeHandler(e)}
      />
      <div className={styles['button-container']}>
        <button disabled={disabled} className={styles['edit-btn']}>Edit</button>
        {children}
      </div>
    </form>
  )
}

export default CommentEditForm
