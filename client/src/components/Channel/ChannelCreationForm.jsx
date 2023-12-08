import { useEffect, useState } from "react"
import styles from './styles/ChannelCreationForm.module.css'
import * as formUtils from '../utils/formUtils.js'
import * as channelApi from '../apis/channelApi.js'
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import UserDataContext from "../contexts/UserDataContext.jsx"

const ChannelCreationForm = ({toggleChannelModal}) => {
  const {userData, setUserData} = useContext(UserDataContext) 
  const navigate = useNavigate()

  const initialFormState = {
    'name': '',
    'description': ''
  }

  const [formState,setFormState] = useState(initialFormState)

  const submitHandler = async (e) => {
    e.preventDefault()
    const response = await channelApi.createChannel(userData,formState)
    setUserData(response[1])
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
