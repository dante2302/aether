
import { logIn } from '../../services/authService.js'
import { changeHandler } from '../../utils/formUtils.js'
import useLoading from '../../hooks/useLoading.jsx'
import { useState, useEffect, useContext } from 'react'
import UserDataContext from '../../contexts/UserDataContext.jsx'
import UserModalContext from '../../contexts/UserModalContext.jsx'
import UilExclamationCircle from '@iconscout/react-unicons/icons/uil-exclamation-circle.js'
import styles from './styles/LogInForm.module.css'
import UilEyeSlash from '@iconscout/react-unicons/icons/uil-eye-slash.js'
import UilEye from '@iconscout/react-unicons/icons/uil-eye.js'
import { useNavigate } from 'react-router-dom'

const LogInForm = ({setCurrentMode}) => {
  const { setUserData } = useContext(UserDataContext)
  const { toggleUserModal } = useContext(UserModalContext)
  const navigate = useNavigate();

  const initialFormState = {
    email: '',
    password: '',
  }

  const [formState,setFormState] = useState(initialFormState)
  const [shownPassword,setShownPassword] = useState(false)
  const [isDisabled,setDisabled] = useState(true)
  const [authError, setAuthError] = useState("");

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
    const response = await logIn(formState)
    if(!response.ok)
    {
      if(response.status == 404){
        let a = await response.json();
        setAuthError(a.error);
      }
      else if(response.status == 401){
        setAuthError("Wrong Password");
      }
      else{
        navigate("/error");
      }
    }
    else{
      setUserData(await response.json());
      toggleUserModal(false)
    }
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
        />
        {!formState.email&&<label htmlFor='email'>Email</label>}
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
          <button type='button' onClick={() => setShownPassword(!shownPassword) }>
            {shownPassword ? <UilEye size={20} /> : <UilEyeSlash size={20}/>}
          </button>
        }

      </div>

      <button 
        onClick={(e) => submitWithLoading(e,formState)}
        disabled={isDisabled}
        className={`${styles['log-in-btn']} ${!isDisabled && styles['enabled']}`}
      >{isLoading ? <Spinner size={15}/> : 'Log In'}</button>

      {authError && 
        <div className={styles['error-container']}>
        <UilExclamationCircle size={20}/>
        <p>{authError}</p>
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