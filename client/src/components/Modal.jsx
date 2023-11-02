import styles from './styles/Modal.module.css'

const Modal = ({toggleModal}) => {
  return (

    <div className = {styles['modal']}>
      <div className={styles['overlay']} onClick={toggleModal}>
      </div>
      <div className={styles['content']}>
        <h2>Log In</h2>
        <p>By continuing you agree to our <a>User Agreement </a>  
         and acknowledge that you understand our <a>Privacy Policy</a>.</p>
        <form>
          <input type={styles['search']}/>
          <input type={styles['password']}/>
        </form>
        <button>Continue with Google</button>
        <h6>New to Aether?<span>Sign Up</span></h6>
        <button type={styles['submit']}>Log In</button>
      </div>
        <button className={styles['close-btn']}onClick={toggleModal}>X</button>
    </div>

  )
}

export default Modal
