import ModalPrototype from "../ModalPrototype.jsx"
import ChannelCreateForm from './ChannelCreateForm.jsx'
import styles from './styles/ChannelCreateModal.module.css'

const ChannelCreateModal = ({toggleChannelModal}) => {

  return (
    <ModalPrototype toggleModal={toggleChannelModal}>
        <div className={styles['content']}>
          <h3>Name</h3>
          <h6>Community names including capitalization cannot be changed.</h6>
          <ChannelCreateForm toggleChannelModal={toggleChannelModal} />
        </div>
    </ModalPrototype>
  )
}

export default ChannelCreateModal
