import './styles/Modal.css'

const Modal = ({toggleModal}) => {
  return (

    <div className = 'modal'>
      <div className='overlay' onClick={toggleModal}>
      </div>
      <div className='content'>
        <h2>Log In</h2>
        <p>By continuing you agree to our <a>User Agreement </a>  
         and acknowledge that you understand our <a>Privacy Policy</a>.</p>
        <form>
          <input type='search' />
          <input type='password'/>
        </form>
        <button>Continue with Google</button>
        <h6>New to Aether?<span>Sign Up</span></h6>
        <button type='submit'>Log In</button>
      </div>
        <button className='close-btn' onClick={toggleModal}>X</button>
    </div>

  )
}

export default Modal
