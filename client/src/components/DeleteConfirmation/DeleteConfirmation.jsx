import ModalPrototype from '../ModalPrototype'
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
      <div className={styles['button-container']}>
        <button onClick={deleteHandler} className={styles['yes-btn']}>Yes</button>
        <button onClick={() => setDeleting(false)} className={styles['no-btn']}>No</button>
      </div>
      </div>
    </ModalPrototype>
  )
}

export default DeleteConfirmation