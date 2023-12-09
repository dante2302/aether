import ModalPrototype from "../ModalPrototype.jsx"
import ChannelCreateForm from './ChannelCreateForm.jsx'


const ChannelCreateModal = ({toggleChannelModal}) => {

  return (
    <ModalPrototype toggleModal={toggleChannelModal}>
    <ChannelCreateForm toggleChannelModal={toggleChannelModal} />
    </ModalPrototype>
  )
}

export default ChannelCreateModal
