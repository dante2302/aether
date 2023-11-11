import { useState, useEffect } from "react"
import styles from './styles/SignUpForm.module.css'
import * as userApi from '../apis/userApi.js'
const SignUpForm = ({setUserData,toggleUserModal,setLogged,setCurrentMode}) => {

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

  const changeHandler = (e) => {
    e.preventDefault()
    setFormState(state => ({
      ...state,[e.target.name]:`${e.target.value}`
    }))
  }
  
  const submitHandler = async (e,{email, password}) => {
    e.preventDefault()
    setDisabled(true)
    try{
      const data = await userApi.signUp(email,password)
      setUserData(data)
      setLogged(true)
      toggleUserModal(false)
      console.table(data)
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
              changeHandler(e)
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
            onChange={(e) => changeHandler(e)}
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
            onChange={(e) => changeHandler(e)}
            className={styles['password']}
            // onBlur = {validateInout}
          />

        </div>

        <button 
          onClick={(e) => submitHandler(e,formState)}
          disabled={isDisabled}
          className={`${styles['log-in-btn']} ${!isDisabled && styles['enabled']}`}
        >Log In</button>

      <p className={styles['link']}>Already have an account? </p>
      <button onClick={() =>setCurrentMode('logIn')}>Log In</button>
      </form>
  )
}

export default SignUpForm
