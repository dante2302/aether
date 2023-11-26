import { useState, useEffect, useContext } from 'react'
import * as userApi from '../apis/userApi.js'
import styles from './styles/LogInForm.module.css'
import * as formUtils from '../utils/formUtils.js'
import UserDataContext from '../contexts/UserDataContext.jsx'
import UserModalContext from '../contexts/UserModalContext.jsx'

const LogInForm = ({setCurrentMode}) => {
  const {setUserData} = useContext(UserDataContext)
  const { toggleUserModal } = useContext(UserModalContext)
  const initialFormState = {
    username: '',
    password: '',
  }

  const [formState,setFormState] = useState(initialFormState)
  const [shownPassword,setShownPassword] = useState(false)
  const [isDisabled,setDisabled] = useState(true)

  useEffect(() => {
    (formState.name===''||formState.password==='')?setDisabled(true):setDisabled(false)
  },[formState])

  
  const submitHandler = async (e,email,password) => {
    setDisabled(true)
    e.preventDefault()

    try{
      const data = await userApi.logIn(email,password)
      console.log(data)
      setUserData(data)
      toggleUserModal(false)
    }
    catch(error){
      alert(error)
    }
  }
  
  return(
    <>
      <form className={styles['input-form']}>
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

        <div className={styles['input-container']}>
          <input 
            type={shownPassword?'text':'password'}
            id='password'
            name='password'
            value={formState.password}
            onChange={(e) => {
              e.preventDefault()
              formUtils.changeHandler(e,setFormState)}}
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

        <button 
          onClick={(e) => submitHandler(e,formState.username,formState.password)}
          disabled={isDisabled}
          className={`${styles['log-in-btn']} ${!isDisabled && styles['enabled']}`}
        >Log In</button>

        <p className={styles['link']}>New to Aether? </p>
        <button onClick={()=>setCurrentMode('signUp')}>Sign Up</button>
      </form>
    </>
  )
}

export default LogInForm
