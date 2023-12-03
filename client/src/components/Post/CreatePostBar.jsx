import { Link } from "react-router-dom"

import { useContext } from "react"

import UserDataContext from "../contexts/UserDataContext"
import UserModalContext from "../contexts/UserModalContext"

import UilImage from '@iconscout/react-unicons/icons/uil-image'
import UilLink from '@iconscout/react-unicons/icons/uil-link'
import UilUser from '@iconscout/react-unicons/icons/uil-user'
import UilPen from '@iconscout/react-unicons/icons/uil-pen'
import styles from './styles/CreatePostBar.module.css'

const CreatePostBar = () => {
  const {userData} = useContext(UserDataContext)
  const {toggleUserModal} = useContext(UserModalContext)
  return(
    <div className={styles['container']} onClick={() => !userData?toggleUserModal():undefined}>
      <UilPen size={28} />
      <Link to={`./submit`} className={styles['create-post-link']} onClick={(e) => !userData&&e.preventDefault()}>Create Post</Link>
      <UilImage size={30} />
      <UilLink size={30} />
    </div>
  )
}
export default CreatePostBar
