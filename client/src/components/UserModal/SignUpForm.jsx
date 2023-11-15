import { useState, useEffect } from "react"
import styles from './styles/SignUpForm.module.css'
import * as userApi from '../apis/userApi.js'
import * as formUtils from '../utils/formUtils.js'
const SignUpForm = ({setUserData,toggleUserModal,setCurrentMode}) => {

  const initialFormState = {
    email: '',
    password: '',
    passwordCopy: '',
  }

  const [formState,setFormState] = useState(initialFormState)
  const [shownPassword,setShownPassword] = useState(false)
  const [isDisabled,setDisabled] = useState(true)

  useEffect(() => {
    
    (formState.name===''||
     formState.password===''||
     formState.password!=formState.passwordCopy)
      ? setDisabled(true) : setDisabled(false)

  },[formState])

  
  const submitHandler = async (e,{email, password}) => {
    e.preventDefault()
    setDisabled(true)
    try{
      const data = await userApi.signUp(email,password)
      setUserData(data)
      toggleUserModal(false)
      console.log(data)
    }
    catch(error){
      alert(error)
    }
  }
  
  return(
      <form className={styles['input-form']}>
        <div className={styles['input-container']}>
          <input 
            type='text'
            id='email'
            name='email'
            value={formState.email}
            onChange={(e) => {
              formUtils.changeHandler(e,setFormState)
            }}
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
            onChange={(e) => formUtils.changeHandler(e,setFormState)}
            className={styles['password']}
            // onBlur = {validateInout}
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
            // onBlur = {validateInout}
          />

        </div>

        <button 
          onClick={(e) => submitHandler(e,formState)}
          disabled={isDisabled}
          className={`${styles['log-in-btn']} ${!isDisabled && styles['enabled']}`}
        >Sign Up</button>

      <p className={styles['link']}>Already have an account? </p>
      <button onClick={() =>setCurrentMode('logIn')}>Log In</button>
      </form>
  )
}

export default SignUpForm
