import useDisabled from "../../hooks/useDisabled"
import { updateCommentData } from "../../services/commentService"
import userDataContext from '../../contexts/UserDataContext'
import { useContext, useState } from "react"

const CommentEditForm = ({commentData,setCommentData,setEditing}) => {

  const { userData } = useContext(userDataContext)
  const [text,setText] = useState(commentData.text)

  const changeHandler = e => setText(e.target.value)
  const submitHandler = async (e) => {
    e.preventDefault()
    if(text == commentData.text)return
    updateCommentData(
      userData,
      commentData._id,
      {text,edited:true}
    ).then((data) => setCommentData(data))
     .finally(setEditing(false))
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
