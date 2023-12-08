
import { logIn } from '../apis/userApi.js'
import { changeHandler } from '../utils/formUtils.js'
import useLoading from '../hooks/useLoading.jsx'


import { useState, useEffect, useContext } from 'react'

import UserDataContext from '../contexts/UserDataContext.jsx'
import UserModalContext from '../contexts/UserModalContext.jsx'

import UilExclamationCircle from '@iconscout/react-unicons/icons/uil-exclamation-circle.js'
import styles from './styles/LogInForm.module.css'

const LogInForm = ({setCurrentMode}) => {

  const {setUserData} = useContext(UserDataContext)
  const { toggleUserModal } = useContext(UserModalContext)

  const initialFormState = {
    email: '',
    password: '',
  }

  const [formState,setFormState] = useState(initialFormState)
  const [shownPassword,setShownPassword] = useState(false)
  const [isDisabled,setDisabled] = useState(true)
  const [error, setError] = useState('')
  console.log('error:',error)
  useEffect(() => {
    (formState.email==='' || formState.password==='')
      ?
      setDisabled(true)
      :
      setDisabled(false)
  },[formState])
  
  const submitHandler = async (e) => {
    e.preventDefault()
    setDisabled(true)
    const data = await logIn(formState)
    
    if(data.hasOwnProperty('code')){
      console.log('in conditional',data.message)
      setError(data.message)
      setDisabled(false)
      return
    }
    setUserData(data)
    setDisabled(false)
    toggleUserModal(false)
  }

  const [Spinner,submitWithLoading,isLoading] = useLoading(submitHandler,undefined,15)

  return(
    <form className={styles['input-form']}>
      <div className={styles['input-container']}>
        <input 
          type='text'
          id='email'
          name='email'
          value={formState.email}
          onChange={(e) => changeHandler(e,setFormState)}
          className={styles['username']}
        />
        {!formState.username&&<label htmlFor='email'>Email</label>}
      </div>

      <div className={styles['input-container']}>
        <input 
          type={shownPassword?'text':'password'}
          id='password'
          name='password'
          value={formState.password}
          onChange={(e) => changeHandler(e,setFormState)}
        />

        {!formState.password
          ?
          <label htmlFor='password'>Password</label>
          :
          <button type='button' onClick={() => setShownPassword(!shownPassword) }>Show Password</button>
        }

      </div>

      <button 
        onClick={(e) => submitWithLoading(e,formState)}
        disabled={isDisabled}
        className={`${styles['log-in-btn']} ${!isDisabled && styles['enabled']}`}
      >{isLoading ? <Spinner size={15}/> : 'Log In'}</button>

      {error && 
        <div className={styles['error-container']}>
        <UilExclamationCircle size={20}/>
        <p>{error}!</p>
        </div>}

      <p className={styles['link']}>New to Aether? </p>
      <button 
        type='button'
        onClick={()=>setCurrentMode('signUp')}
        className={styles['sign-up-btn']}
      >Sign Up</button>
    </form>
  )
}

export default LogInForm
