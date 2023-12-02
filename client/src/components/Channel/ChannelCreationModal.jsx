import ModalPrototype from "../ModalBlueprint"
import ChannelCreationForm from "./ChannelCreationForm"
import styles from './styles/ChannelCreationModal.module.css'

const ChannelCreationModal = ({userData,toggleChannelModal}) => {

  return (
    <ModalPrototype toggleModal={toggleChannelModal}>
        <div className={styles['content']}>
          <h3>Name</h3>
          <h6>Community names including capitalization cannot be changed.</h6>
          <ChannelCreationForm 
            userData = {userData}
            toggleChannelModal={toggleChannelModal}
          />
        </div>
    </ModalPrototype>
  )
}

export default ChannelCreationModal
