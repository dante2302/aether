import ModalPrototype from '../ModalPrototype'

import { deleteComment } from '../apis/commentApi'
import { deletePost } from '../apis/postApi'

import { useContext } from 'react'
import styles from './DeleteConfirmation.module.css'

import UserDataContext from '../contexts/UserDataContext'

const DeleteConfirmation = ({id,type,setDeleting, setAsset}) => {

  const {userData} = useContext(UserDataContext)
  console.log(userData) 
  const deleteHandler = () => {
    console.log('a')
    switch(type){
      case 'comment':{ 
        deleteComment(userData,id);
        break;
      }
      case 'post':{
        deletePost(userData,id);
        break;
      }
    }
    setDeleting(false)
    setAsset((assets) => assets.filter(id))
  }

  return(
    <ModalPrototype>
      <div className={styles['container']}>
      <div>Are you sure you want to delete this {type}</div>
      <button onClick={deleteHandler}>Yes</button>
      <button onClick={() => setDeleting(false)}>No</button>
      </div>
    </ModalPrototype>
  )
}

export default DeleteConfirmation
