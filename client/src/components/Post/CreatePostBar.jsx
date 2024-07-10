import { Link } from "react-router-dom"

import { useContext } from "react"

import UserDataContext from "../../contexts/UserDataContext"
import UserModalContext from "../../contexts/UserModalContext"

import UilImage from '@iconscout/react-unicons/icons/uil-image'
import UilLink from '@iconscout/react-unicons/icons/uil-link'
import UilPen from '@iconscout/react-unicons/icons/uil-pen'
import styles from './styles/CreatePostBar.module.css'

const CreatePostBar = ({userChannels}) => {
  const {userData} = useContext(UserDataContext)
  const {toggleUserModal} = useContext(UserModalContext)

  return(
    <Link className={styles['container']} 
      to={userData ? `./submit` : '#'} 
      onClick={() => {if(!userData) toggleUserModal()}}
      state={{userChannels}}
    >
      <UilPen size={28} />
      <div  className={styles['create-post-link']}>Create Post</div>
      <UilImage size={30} />
      <UilLink size={30} />
    </Link>
  )
}
export default CreatePostBar
