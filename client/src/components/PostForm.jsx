import { useState } from "react"
import * as channelApi from './apis/channelApi.js'

const ChannelForm = ({userData}) => {
  const initialFormState = {
    'title': '',
    'description': '',
    // 'link': '',
    // 'image': ''
  }
  
  const [formState,setFormState] = useState(initialFormState)
  const [isDisabled,setDisabled] = useState(true)

  const submitHandler = () => {
    setDisabled(true)  
  }

  return(
    <form>

      <input 
        type='text'
        id='title'
        name='title'
        value={formState.title}
        onChange={(e) => formUtils.changeHandler(e,setFormState)}
        className={styles['title']}
      />

      <textarea
        type='text'
        id='description'
        name='description'
        value={formState.description}
        onChange = {(e) => formUtils.changeHandler(e,setFormState)}
        className={styles['description']}
      />

      <button onClick = {(e) => submitHandler(e)}>Post</button>
    </form>
  )
} 

export default PostForm 
