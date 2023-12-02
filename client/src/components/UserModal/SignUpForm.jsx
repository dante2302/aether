import { useState, useEffect } from "react"
import styles from './styles/SignUpForm.module.css'
import * as userApi from '../apis/userApi.js'
import * as formUtils from '../utils/formUtils.js'
import UilArrowRight from '@iconscout/react-unicons/icons/uil-arrow-right'
import UilArrowLeft from '@iconscout/react-unicons/icons/uil-arrow-left'

const SignUpForm = ({setUserData,toggleUserModal,setCurrentMode}) => {

  const initialFormState = {
    username: '',
    email: '',
    password: '',
    passwordCopy: '',
  }

  const [formState,setFormState] = useState(initialFormState)
  const [shownPassword,setShownPassword] = useState(false)
  const [chooseUsername,setChooseUsername] = useState(false)
  const [isDisabled,setDisabled] = useState(true)

  useEffect(() => {
        formState.email===''||
        formState.password===''||
        formState.password!=formState.passwordCopy
      ? setDisabled(true) : setDisabled(false)

  },[formState])


  const submitHandler = async (e,{username,email,password}) => {
    e.preventDefault()
    setDisabled(true)
    setShownPassword(false)
    try{
      const data = await userApi.signUp({username,email,password})
      setUserData(data)
      toggleUserModal(false)
    }
    catch(error){
      alert(error)
    }
  }
  
  return(
    <form className={styles['input-form']} onSubmit={(e) => submitHandler(e,formState)}>
      {chooseUsername 
        ?
      <div className={styles['input-container']}>
        <input 
          type='text'
          id='username'
          name='username'
          value={formState.username}
          onChange={(e) => {
            formUtils.changeHandler(e,setFormState)
          }}
          className={styles['username']}
        />
        {!formState.username&&<label htmlFor='username'>Username</label>}
      </div>
        :
        <>
      <div className={styles['input-container']}>
        <input 
          type='email'
          id='email'
          name='email'
          value={formState.email}
          onChange={(e) => {
            formUtils.changeHandler(e,setFormState)
          }}
          className={styles['username']}
        />
        {!formState.email&&<label htmlFor='email'>Email</label>}
      </div>

      <div className={styles['input-container']}>
        <input 
          type={shownPassword?'text':'password'}
          id='password'
          name='password'
          value={formState.password}
          onChange={(e) => formUtils.changeHandler(e,setFormState)}
          className={styles['password']}
        />
        {!formState.password
          ?
          <label htmlFor='password'>Password</label>
          :
          <button type='button' onClick={() => setShownPassword(!shownPassword) }>Show Password</button>
        }

      </div>
      <div className={styles['input-container']}>
        <input 
          type={shownPassword?'text':'password'}
          id='password-copy'
          name='passwordCopy'
          value={formState.passwordCopy}
          onChange={(e) => formUtils.changeHandler(e,setFormState)}
          className={styles['password']}
        />
      </div>
        </>
        }
      <button  
        type='button'
        disabled={isDisabled}
        onClick={() => setChooseUsername(!chooseUsername)}>
        {chooseUsername ? <UilArrowLeft size={25} /> : <UilArrowRight size={25} />}
      </button>
      {chooseUsername 
        ? 
        <button 
          disabled={formState.username===''}
          className={`${styles['log-in-btn']} ${!isDisabled && styles['enabled']}`}
        >Sign Up</button>
        :
        <>
          <p className={styles['link']}>Already have an account? </p>
          <button type='button' onClick={() =>setCurrentMode('logIn')}>Log In</button>
        </>
      }
      </form>
  )
}

export default SignUpForm
