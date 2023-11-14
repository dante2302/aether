import ChannelCreationForm from "./ChannelCreationForm"
import styles from './styles/ChannelCreation.module.css'

const ChannelCreationModal = ({userData,toggleChannelModal}) => {
  return (
    <div className='modal'>
      <div className='overlay'>
        <div className={styles['content']}>
          <h3>Name</h3>
          <h6>Community names including capitalization cannot be changed.</h6>
          <ChannelCreationForm 
            userData = {userData}
            toggleChannelModal={toggleChannelModal}
          />
        </div>
      </div>
    </div>
  )
}

export default ChannelCreationModal
