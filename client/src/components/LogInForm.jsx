import { useState } from 'react'
import * as userApi from './apis/userApi.js'
import styles from './styles/LogInForm.module.css'

const LogInForm = () => {

  const initialFormState = {
    username: '',
    password: '',
  }

  const [formState,setFormState] = useState(initialFormState)
  const [shownPassword,setShownPassword] = useState(false)

  const changeHandler = (e) => {
    setFormState(state => ({
      ...state,[e.target.name]:`${e.target.value}`
    }))
  }
  
  const submitHandler = async (e,id) => {
    e.preventDefault()
    const data = await userApi.getUser(id)
    console.table(data)
  }
  
  const showPasswordHandler = (e) => {
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
              changeHandler(e)
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
              changeHandler(e)}}
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
        <p className={styles['link']}>Sign Up</p>

        <button 
          className={styles['log-in-btn']}
          onClick={(e) => submitHandler(e,id)}
        >Log In</button>

      </form>
    </>
  )
}

export default LogInForm
