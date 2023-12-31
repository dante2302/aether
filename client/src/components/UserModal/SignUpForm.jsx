import {changeHandler, validatePassword, validateUsername, validateEmail} from '../../utils/formUtils.js'
import {signUp} from '../../apis/userApi.js'

import { useState, useEffect } from "react"

import useDisabled from '../../hooks/useDisabled.jsx'


import UilArrowRight from '@iconscout/react-unicons/icons/uil-arrow-right'
import UilArrowLeft from '@iconscout/react-unicons/icons/uil-arrow-left'
import UilEye from '@iconscout/react-unicons/icons/uil-eye.js'
import UilEyeSlash from '@iconscout/react-unicons/icons/uil-eye-slash.js'
import UilSad from '@iconscout/react-unicons/icons/uil-sad.js'
import styles from './styles/SignUpForm.module.css'

const SignUpForm = ({setUserData,toggleUserModal,setCurrentMode}) => {

  const initialFormState = {
    username: '',
    email: '',
    password: '',
    passwordCopy: '',
  }

  const initialFormErrors = {
    username: '',
    email: '',
    password: '',
    passwordCopy: '',
  }

  const [formState,setFormState] = useState(initialFormState)
  const [formErrors,setFormErrors] = useState(initialFormErrors)
  const [shownPassword,setShownPassword] = useState(false)
  const [chooseUsername,setChooseUsername] = useState(false)

  useEffect(() => {
    if(formState === initialFormState){
      setDisabled(true)
      return
    }

    for(let error of Object.values(formErrors)){
      if(error){
        setDisabled(true) 
        return
      }
    }

    setDisabled(false)

  },[formState])

  const blurHandler = (e) => {
    e.preventDefault()

    const newFormErrors = {...formErrors}  
    const field = e.target.name

    switch(field){
      case 'password': {
        newFormErrors.password = validatePassword(formState.password);
        break;
      }

      case 'passwordCopy':{  
          (formState.password !== formState.passwordCopy) 
            && (newFormErrors.passwordCopy = 'Passwords are not matching!')
        break;
      }

      case 'email':{ 
        newFormErrors.email = validateEmail(formState.email);
        break;
      }

      case 'username':{
        chooseUsername && 
          (newFormErrors.username =  validateUsername(formState.username))
        break;
      }
    }
    setFormErrors({...newFormErrors})
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    try{
      const data = await signUp(formState)
      if(!data)throw new Error
      setUserData(data)
      toggleUserModal(false)
    }
    catch(error){
      alert(error)
    }
  }
  
  const [isDisabled,submitWithDisable,setDisabled] = useDisabled(submitHandler)

  return(
    <form className={styles['input-form']} onSubmit={(e) => submitWithDisable(e,formState)}>

      {
      chooseUsername 
        ?

        <>
          <h3> Choose a Username </h3>
          <div className={`${styles['input-container']} `}>
            <input 
              type='text'
              id='username'
              name='username'
              value={formState.username}
              onChange={(e) => changeHandler(e,setFormState,setFormErrors)}
              onBlur={(e) => blurHandler(e)}
              className={`${styles['input']} ${formErrors.username ? styles['error-input'] : ''}`}
            />

            {!formState.username && 
              <label htmlFor='username'>Username</label>}
          </div>
          {
            formErrors.username &&
              <div className={styles['error-container']}>
                <UilSad size={20} color={'red'}/>
                <p className={styles['error']}>{formErrors.username}</p>
              </div>
          }
        </>

        :

        <>
          <div className={styles['input-container']}>
            <input 
              type='email'
              id='email'
              name='email'
              value={formState.email}
              onChange={(e) => changeHandler(e,setFormState,setFormErrors)}
              onBlur={(e) => {blurHandler(e)}}
              className={`${styles['input']} ${formErrors.email ? styles['error-input'] : ''}`}
            />

            {!formState.email && 
              <label htmlFor='email'>Email</label>}

          </div>

          {formErrors.email &&
              <div className={styles['error-container']}>
              <UilSad size={20} color={'red'}/>
            <p className={styles['error']}>{formErrors.email}</p>
            </div>
          }

          <div className={styles['input-container']}>
            <input 
              type={shownPassword?'text':'password'}
              id='password'
              name='password'
              value={formState.password}
              onChange={(e) => changeHandler(e,setFormState,setFormErrors)}
              onBlur={(e) => {blurHandler(e)}}
              className={`${styles['input']} ${formErrors.password ? styles['error-input'] : ''}`}
            />

            {
            !formState.password
              ?

              <label htmlFor='password'>Password</label>

              :

              <button type='button' onClick={() => setShownPassword(!shownPassword) }>
                {shownPassword 
                  ? 
                  <UilEye size={20} />
                  :
                  <UilEyeSlash size={20} />
                }
              </button>
            }

          </div>

          {
          formErrors.password &&
            <div className={styles['error-container']}>
              <UilSad size={20} color={'red'}/>
              <p className={styles['error']}>{formErrors.password}</p>
            </div>
          }

          <div className={styles['input-container']}>
            <input 
              type={shownPassword?'text':'password'}
              id='password-copy'
              name='passwordCopy'
              value={formState.passwordCopy}
              onChange={(e) => changeHandler(e,setFormState,setFormErrors)}
              onBlur={(e) => {blurHandler(e)}}
              className={`${styles['input']} ${formErrors.passwordCopy ? styles['error-input'] : ''}`}
            />

            {
            !formState.passwordCopy
              ?

              <label htmlFor='passwordCopy'>Retype Password</label>

              :

              <button type='button' onClick={() => setShownPassword(!shownPassword) }>

              {shownPassword ? 
                <UilEye size={20} />
                :
                <UilEyeSlash size={20} />
              }
              </button>
            }

          </div>

          {
          formErrors.passwordCopy &&
            <div className={styles['error-container']}>
              <UilSad size={20} color={'red'}/>
              <p className={styles['error']}>{formErrors.passwordCopy}</p>
            </div>
          }

        </>
      }

      <button  
        type='button'
        disabled={isDisabled}
        onClick={() => setChooseUsername(!chooseUsername)}
        className={styles['arrow']} 
      >{chooseUsername ? <UilArrowLeft size={40} /> : <UilArrowRight size={40} />}
      </button>

      {
      chooseUsername 
        ? 

        <button 
          disabled={formState.username===''}
          className={styles['sign-up-btn']}
        >Sign Up</button>

        :

        <>
          <p className={styles['link']}>Already have an account? </p>
          <button 
              type='button' 
              onClick={() =>setCurrentMode('logIn')}
              className={styles['log-in-btn']}
            >Log In</button>
        </>
      }
      </form>
  )
}

export default SignUpForm
