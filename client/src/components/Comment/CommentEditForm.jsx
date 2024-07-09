import useDisabled from "../../hooks/useDisabled"
import { updateComment } from "../../services/commentService"
import userDataContext from '../../contexts/UserDataContext'
import { useContext, useState } from "react"

const CommentEditForm = ({commentData,setCommentData,setEditing}) => {

  const { userData } = useContext(userDataContext)
  const [text,setText] = useState(commentData.text)

  const changeHandler = e => setText(e.target.value)
  const submitHandler = async (e) => {
    e.preventDefault()
    if (text == commentData.text) return
    await updateComment({ accessToken: userData.accessToken, newData: { ...commentData, text } })
    setCommentData({...commentData, text});
    setEditing(false);
  } 

  const [disabled,submitHandlerWithDisable] = useDisabled(submitHandler)


return (
    <form onSubmit={submitHandlerWithDisable}>
      <textarea 
        id='text' 
        name='text' 
        value={text}
        onChange={(e) => changeHandler(e)}
      />
      <button>Edit</button>
    </form>
  )
}

export default CommentEditForm
