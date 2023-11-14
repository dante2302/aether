import { useState } from "react"
import styles from './styles/ChannelCreationForm.module.css'
import * as formUtils from '../utils/formUtils.js'
import * as channelApi from '../apis/channelApi.js'
import { useNavigate } from "react-router-dom"

const ChannelCreationForm = ({userData,toggleChannelModal}) => {
  const navigate = useNavigate()
  const initialFormState = {
    'name': '',
    'description': ''
  }

  const [formState,setFormState] = useState(initialFormState)

  const submitHandler = async (e) => {
    e.preventDefault()
    const response = await channelApi.createChannel({
      accessToken: userData.accessToken,
      userId: userData._id,
      name: formState.name,
      description: formState.description
    })
    toggleChannelModal(false)
    navigate(`/c/${formState.name}`)
  }

  return (
    <form onSubmit={(e) => submitHandler(e)}>

      <input 
        type='text'
        id='name'
        name='name'
        value={formState.title}
        onChange={(e) => formUtils.changeHandler(e,setFormState)}
        className={styles['title']}
      />

      <input 
        type='text'
        id='description'
        name='description'
        value={formState.title}
        onChange={(e) => formUtils.changeHandler(e,setFormState)}
        className={styles['description']}
      />
      <button>Create Channel</button>
    </form>
  )
}

export default ChannelCreationForm
