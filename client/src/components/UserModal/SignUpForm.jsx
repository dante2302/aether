import {changeHandler, validatePassword, validateUsername, validateEmail} from '../../utils/formUtils.js'
import {signUp} from '../../services/authService.js'
import { useState, useEffect, useContext } from "react"
import useDisabled from '../../hooks/useDisabled.jsx'
import UserDataContext from '../../contexts/UserDataContext'
import { useNavigate } from 'react-router-dom'
import useLoading from '../../hooks/useLoading.jsx'
import UilArrowRight from '@iconscout/react-unicons/icons/uil-arrow-right'
import UilArrowLeft from '@iconscout/react-unicons/icons/uil-arrow-left'
import UilEye from '@iconscout/react-unicons/icons/uil-eye.js'
import UilEyeSlash from '@iconscout/react-unicons/icons/uil-eye-slash.js'
import UilSad from '@iconscout/react-unicons/icons/uil-sad.js'
import styles from './styles/SignUpForm.module.css'

const SignUpForm = ({toggleUserModal,setCurrentMode}) => {

  const {setUserData} = useContext(UserDataContext)
  const navigate = useNavigate();
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
    submissionError: ''
  }

  const [formState,setFormState] = useState(initialFormState)
  const [formErrors,setFormErrors] = useState(initialFormErrors)
  const [shownPassword,setShownPassword] = useState(false)
  const [chooseUsername,setChooseUsername] = useState(false)
  const [submissionError, setSubmissionError] = useState({});

  useEffect(() => {
    let hasError = false;
    if(formErrors.submissionError || formState.email == submissionError.email)
    {
        if(formState.email == submissionError.email)
        {
          setFormErrors({...formErrors, submissionError: submissionError.message})
          setDisabled(true)
          hasError = true
        }
        else{
          setFormErrors({...formErrors, submissionError: ""})
          hasError = false;
        }
    }

    if(Object.entries(formState).some(e => e[0] != 'username' && e[1] == '') || formState.password != formState.passwordCopy){
      setDisabled(true)
      hasError = true;
    }

    for(let error of Object.values(formErrors)){
      if(error){
        setDisabled(true) 
        hasError = true;
      }
    }
    !hasError && setDisabled(false);
    return;
  },[formState, formErrors])

  const blurHandler = (e) => {
    e.preventDefault()

    const newFormErrors = {...formErrors}  
    const field = e.target.name

    switch(field){
      case 'password': {
        newFormErrors.password = validatePassword(formState.password);
        (formState.password == formState.passwordCopy) && (newFormErrors.passwordCopy = '')
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
    try {
      const response = await signUp(formState)
      if (!response.ok) {
        if (response.status == 409) {
          const errorMessage = (await response.json()).error
          setSubmissionError({email: formState.email, message: errorMessage})
          setFormErrors({...formErrors, submissionError: errorMessage})
          setChooseUsername(false);
        }
        else {
          navigate("/error");
        }
      }
      else
      {
        setUserData(await response.json());
        toggleUserModal(false)
      }
    }
    catch(error){
      alert(error)
    }
  }
  
  const [isDisabled,submitWithDisable,setDisabled] = useDisabled(submitHandler)
  const [LoadingSpinner, submitWithLoading, isLoading] = useLoading(submitWithDisable);

  return(
    <form className={styles['input-form']} onSubmit={(e) => submitWithLoading(e,formState)}>
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
          {formErrors.submissionError &&
            <div className={styles['error-container']}>
              <UilSad size={20} color={'red'}/>
              <p className={styles['error']}>{formErrors.submissionError}</p>
            </div>}
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
        >{isLoading ? <LoadingSpinner size="20px"/> : "Sign Up" }</button>
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