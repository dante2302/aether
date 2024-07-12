import { useState, useEffect, useContext } from 'react'

import UserDataContext from '../../contexts/UserDataContext'
import UserModalContext from '../../contexts/UserModalContext'

import styles from './styles/PostSaving.module.css'
import UilBookmark from '@iconscout/react-unicons/icons/uil-bookmark.js'
import { getUserSaves, removeSave, savePost } from '../../services/userInteractionService'

const PostSaving = ({postData}) => {
  const [isSaved,setSaved] = useState(false)
  const { userData } = useContext(UserDataContext)
  const { toggleUserModal } = useContext(UserModalContext)

  const checkSaved = async () => {
    const response = await getUserSaves(userData);
    const userSaves = (await response.json()).saveList;
    if(userSaves.some(s => s.postId == postData.id))
      setSaved(true);
  }

  useEffect(() => {(async () => await checkSaved())()},[])

  useEffect(() => {(async () => await checkSaved())()},[userData])

  const saveHandler = async (e) => {
    if (!userData) { toggleUserModal(); return }
    e.stopPropagation()
    setSaved(!isSaved);
    isSaved ?
      await removeSave(userData, postData.id) :
      await savePost(userData, postData.id);
  }

  return(
    <button onClick={e => saveHandler(e)} className={
      `${isSaved && styles['saved']} 
       ${styles['save-container']}`}
    >
      <UilBookmark className={isSaved ? styles['saved'] : ''} size={23}/>
      <span>{isSaved ? 'Saved' : 'Save'}</span>
    </button>
  )
}

export default PostSaving