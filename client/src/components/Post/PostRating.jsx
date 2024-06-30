import { useState, useEffect, useContext } from "react"

import UserDataContext from '../../contexts/UserDataContext'
import UserModalContext from '../../contexts/UserModalContext'

import UilArrowUp from '@iconscout/react-unicons/icons/uil-arrow-up'
import UilArrowDown from '@iconscout/react-unicons/icons/uil-arrow-down'

import styles from './styles/PostRating.module.css'
import { useNavigate } from "react-router-dom"
import { dislikePost, getUserDislikes, getUserLikes, likePost, removeDislike, removeLike } from "../../services/userInteractionService"

const PostRating = ({postData}) => {
  const { userData } = useContext(UserDataContext)
  const { toggleUserModal } = useContext(UserModalContext)
  const [likesCount, setLikesCount] = useState(postData.likesCount)
  const [dislikesCount, setDislikesCount] = useState(postData.dislikesCount);
  const [isLiked, setLiked] = useState(false)
  const [isDisliked, setDisliked] = useState(false) 
  const navigate = useNavigate();

  useEffect(() => {
    (async () => checkInitialRating())();
  }, [userData])

  useEffect(() => {
    (async () => checkInitialRating())();
  }, [])

  async function checkInitialRating()
  {
    if (!userData) return;
    try{
      const responseLikes = await getUserLikes(userData.id)
      const responseDislikes = await getUserDislikes(userData.id)
      const likes = (await responseLikes.json()).likeList;
      const dislikes = (await responseDislikes.json()).dislikeList;
      if (likes.some(el => el.postId == postData.id && el.ownerId == userData.id))
        setLiked(true);

      else if(dislikes.some(el => el.postId == postData.id && el.ownerId == userData.id))
        setDisliked(true)
    }
    catch(e){
      console.log(e);
      // navigate("/error");
    }
  }

  const likeHandler = async (e) => {
    e.stopPropagation()
    if (!userData) { toggleUserModal(); return }

    if(isLiked){
      setLiked(false);
      setLikesCount(likes => likes - 1);
      await removeLike(userData, postData.id)
    }

    else if(isDisliked){
      setDisliked(false);
      setDislikesCount(dislikes => dislikes - 1);
      setLiked(true);
      setLikesCount(likes => likes + 1)
      await removeDislike(userData, postData.id)
      await likePost(userData, postData.id)
    }

    else {
      setLiked(true);
      setLikesCount(likes => likes + 1);
      await likePost(userData, postData.id)
    }
  }

  const dislikeHandler = async (e) => {
    e.stopPropagation()
    if (!userData) { toggleUserModal(); return }

    if (isDisliked) {
      setDisliked(false);
      setDislikesCount(dislikes => dislikes - 1);
      await removeDislike(userData, postData.id)
    }

    else if (isLiked) {
        setLiked(false);
        setLikesCount(likes => likes - 1);
        setDisliked(true)
        setDislikesCount(dislikes => dislikes + 1);
        await removeLike(userData, postData.id)
        await dislikePost(userData, postData.id)
    }

    else {
      setDisliked(true);
      setDislikesCount(dislikes => dislikes + 1);
      await dislikePost(userData, postData.id)
    }
  }

  return(
      <div className={styles['rating']}>

        <UilArrowUp 
          onClick={e => likeHandler(e)} 
          size={35} 
          className={styles[(isLiked && 'liked')]}/>

        <div className={
          `${styles['likes-count']} 
            ${styles[(isDisliked && 'disliked')]} 
            ${styles[(isLiked && 'liked')]}`
        }>{likesCount - dislikesCount}</div>

        <UilArrowDown 
          onClick = {e => dislikeHandler(e)} 
          size={35} 
          className={styles[(isDisliked && 'disliked')]}/>
      </div>
  )
}
export default PostRating
