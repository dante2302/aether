
import * as formUtils from '../../utils/formUtils.js'
import { createChannel } from '../../services/channelService.js'

import { useNavigate } from "react-router-dom"
import { useState, useContext, useEffect } from "react"

import UserDataContext from "../../contexts/UserDataContext.jsx"

import styles from './styles/ChannelCreateForm.module.css'

const ChannelCreateForm = ({toggleChannelModal}) => {
  const { userData } = useContext(UserDataContext) 
  const [isDisabled,setDisabled] = useState(true)
  const navigate = useNavigate()
  const initialFormState = {
    'name': '',
    'description': ''
  }
  const initialErrorState ={
    name: "",
    description: ""
  }

  const [formState,setFormState] = useState(initialFormState)
  const [errorState, setErrorState] = useState(initialErrorState)

  useEffect(() => {
    if(!formState.name)setDisabled(true)
    else setDisabled(false)
  },[formState])
  function nameCheck(){
    if(formState.name == ""){
      setErrorState(e => ({...e,name: "Need A Name To Create A Channel"}))
      return false
    }
    if(formState.name.length > 80){
      setErrorState(e => ({ ...e, name: "Name Too Long (80 MAX)" }))
      return false
    }
    return true;
  }
  function descCheck(){
    if(formState.description > 300){
      setErrorState(e => ({...e, description: "Description Too Long (300 MAX)"}))
      return false
    }
    return true;
  }
  const submitHandler = async (e) => {
    e.preventDefault()
    if(!nameCheck())return;
    if(!descCheck())return;
    const response = await createChannel(userData,formState)
    if(response.status == 409){
      const error = (await response.json()).error;
      setErrorState(e => ({...e, name: error}))
      return;
    }
    toggleChannelModal(false)
    navigate(`/c/${formState.name}`)
  }
  useEffect(() => {
    if (descCheck())
      setErrorState(e => ({ ...e, description: "" }))
    if (nameCheck())
      setErrorState(e => ({ ...e, name: "" }))
  },[formState])

  return (
    <form onSubmit={(e) => submitHandler(e)} className={styles['form']}>
      <h2>Create A Channel</h2>
      <label htmlFor='name'>Name</label>
      <input 
        type='text'
        id='name'
        name='name'
        value={formState.name}
        onChange={(e) => formUtils.changeHandler(e,setFormState)}
        onBlur={() => {if(nameCheck()){
          setErrorState(e => ({...e, name: ""}))
        }}}
        className={styles['title']}
      />
      {errorState.name && <p>{errorState.name}</p>}
      <label htmlFor='description'>Description</label>
      <input 
        type='text'
        id='description'
        name='description'
        value={formState.title}
        onChange={(e) => formUtils.changeHandler(e,setFormState)}
        onBlur={() => {
          if(descCheck())
            setErrorState(e => ({...e, description: ""}))}}
        className={styles['description']}
      />
      {errorState.description && <p>{errorState.description}</p>}
      <button disabled={isDisabled}>Create Channel</button>
    </form>
  )
}

export default ChannelCreateForm
