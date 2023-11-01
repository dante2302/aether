import './styles/Modal.css'

const Modal = ({toggleModal}) => {
  return (
    <div className = 'modal'>
      <div className='overlay' onClick={toggleModal}>
      </div>
      <div className='content'>
        <h1>ASD</h1>
        <p>Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.</p>
        <button onClick={toggleModal}>X</button>
      </div>
    </div>
  )
}

export default Modal
