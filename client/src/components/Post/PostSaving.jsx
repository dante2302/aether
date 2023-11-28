import { updateUserData } from '../apis/userApi.js'

import { useState, useEffect, useContext } from 'react'

import UserDataContext from '../contexts/UserDataContext'
import UserModalContext from '../contexts/UserModalContext'


import UilBookmark from '@iconscout/react-unicons/icons/uil-bookmark.js'

const PostSaving = ({postData}) => {
  const [isSaved,setSaved] = useState()
  const {userData, setUserData} = useContext(UserDataContext)
  const {toggleUserModal} = useContext(UserModalContext)

  const checkSaved = () => {
    console.log(userData)
    if(!userData || Object.keys(userData).length === 0){setSaved(false) ; return}
    if(userData.savedPosts.includes(postData._id))setSaved(true);
  }

  useEffect(() => {checkSaved()},[])

  useEffect(() => {checkSaved()},[userData]) 

  const saveHandler = (e) => {
    if(!userData){toggleUserModal();return}
    e.stopPropagation()

    const savedPosts =
      isSaved  
        ?
        userData.savedPosts.filter((postId) => postId !== postData._id)
        :
        [...userData.savedPosts,postData._id]

    updateUserData(userData,{...userData,savedPosts})
      .then(result => {
        setUserData(result)
      })
    setSaved(!isSaved)
  }

  return(
    <div onClick={e => saveHandler(e)}>
      <UilBookmark />
      <span>Save</span>
    </div>
  )
}

export default PostSaving
