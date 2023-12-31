
import * as formUtils from '../../utils/formUtils.js'
import * as channelApi from '../../apis/channelApi.js'

import { useNavigate } from "react-router-dom"
import { useState, useContext, useEffect } from "react"

import UserDataContext from "../../contexts/UserDataContext.jsx"

import styles from './styles/ChannelCreateForm.module.css'

const ChannelCreateForm = ({toggleChannelModal}) => {
  const {userData, setUserData} = useContext(UserDataContext) 
  const [isDisabled,setDisabled] = useState(true)
  const navigate = useNavigate()

  const initialFormState = {
    'name': '',
    'description': ''
  }

  const [formState,setFormState] = useState(initialFormState)
  useEffect(() => {
    if(!formState.name)setDisabled(true)
    else setDisabled(false)

  },[formState])
  const submitHandler = async (e) => {
    e.preventDefault()
    const response = await channelApi.createChannel(userData,formState)
    setUserData(response[1])
    toggleChannelModal(false)
    navigate(`/c/${formState.name}`)
  }

  return (
    <form onSubmit={(e) => submitHandler(e)} className={styles['form']}>
      <h2>Create A Channel</h2>
      <label htmlFor='name'>Name</label>
      <input 
        type='text'
        id='name'
        name='name'
        value={formState.title}
        onChange={(e) => formUtils.changeHandler(e,setFormState)}
        className={styles['title']}
      />
      <label htmlFor='description'>Description</label>
      <input 
        type='text'
        id='description'
        name='description'
        value={formState.title}
        onChange={(e) => formUtils.changeHandler(e,setFormState)}
        className={styles['description']}
      />
      <button disabled={isDisabled}>Create Channel</button>
    </form>
  )
}

export default ChannelCreateForm
