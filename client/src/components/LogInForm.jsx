
import {useState} from 'react'
import styles from './styles/LogInForm.module.css'

const LogInForm = () => {

  return(
    <>
      <form className={styles['input-form']}>
        <input className={styles['username']}/>
        <input className={styles['password']}/>

        <h6>New to Aether?<span className={styles['link']}>Sign Up</span></h6>

        <button type={styles['submit']} className={styles['log-in-btn']}>Log In</button>

      </form>
    </>
  )
}

export default LogInForm
