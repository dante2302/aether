import { useEffect, useState } from "react"
import * as formUtils from '../utils/formUtils.js'
import * as postApi from '../apis/postApi.js'
import { useNavigate } from "react-router-dom"
//
const PostForm = ({userData}) => {
  const navigate = useNavigate()
  useEffect(() => {!userData&&navigate('../')} ,[])

  const initialFormState = {
    title: '',
    text: '',
    image: '',
    link: '',
    channel: ''
  }


  const [formState,setFormState] = useState(initialFormState)
  
  const submitHandler = async (e) => {
    e.preventDefault()
    const response = await postApi.createPost(userData,formState)
    navigate('../')
  }

  return(
    <form onSubmit={(e) => submitHandler(e)}>
      <select
        id='channel'
        name='channel'
        onChange={(e) => formUtils.changeHandler(e,setFormState)}
      >
        
      </select>
      <label htmlFor="title">Title</label>
      <input 
        id='title'
        name='title'
        type='text'
        value={formState.title}
        onChange={(e) => formUtils.changeHandler(e,setFormState)} 
      />
      <label htmlFor="text">Text</label>
      <textarea
        id='text'
        name='text'
        value={formState.text}
        onChange={(e) => formUtils.changeHandler(e,setFormState)}
      />
      <button>Post</button>
    </form>
  )
}

export default PostForm
