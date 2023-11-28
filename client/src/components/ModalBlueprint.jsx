
const ModalPrototype = ({children,toggleModal}) => {
  return (     
    <div className='modal'>
      <div className='overlay' onClick={toggleModal}>
      </div>
      {children}
    </div>
  )

}

export default ModalPrototype
