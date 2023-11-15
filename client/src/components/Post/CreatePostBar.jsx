import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"
import UilImage from '@iconscout/react-unicons/icons/uil-image'
import UilLink from '@iconscout/react-unicons/icons/uil-link'
import styles from './styles/CreatePostBar.module.css'

const CreatePostBar = ({userData}) => {
  const location = useLocation()
  return(
    <div className={styles['container']}>
      <img /> 
      <Link to={`${location.pathname.slice(1)}/submit`} className={styles['create-post-link']}>Create Post</Link>
      <UilImage size={30} />
      <UilLink size={30} />
    </div>
  )
}
export default CreatePostBar
