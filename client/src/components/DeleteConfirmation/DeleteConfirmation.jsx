import ModalPrototype from '../ModalPrototype'

import { deleteComment } from '../../services/commentService'
import { deletePost } from '../../services/postService'

import { useContext } from 'react'
import UserDataContext from '../../contexts/UserDataContext'

import styles from './DeleteConfirmation.module.css'


const DeleteConfirmation = ({deleteRequest, setDeleting, message}) => {

  const deleteHandler = async  () => {
    await deleteRequest();
    setDeleting(false)
  }

  return(
    <ModalPrototype>
      <div className={styles['container']}>
      <div>{message}</div>
      <button onClick={deleteHandler}>Yes</button>
      <button onClick={() => setDeleting(false)}>No</button>
      </div>
    </ModalPrototype>
  )
}

export default DeleteConfirmation
