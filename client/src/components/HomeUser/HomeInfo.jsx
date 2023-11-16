import { Link } from "react-router-dom"
import styles from './styles/HomeInfo.module.css'

const HomeInfo = () => {
  return(
    <div className={styles['content']}>
      <div className={styles['links']}>
      <Link>User Agreement</Link>
      <Link>Privacy Policy</Link>
      <Link>Content Policy</Link>
      </div>
      <div className={styles['copyright']}>Aether, Inc. &copy;2023 All rights reserved.</div>
    </div>
  )
}
export default HomeInfo
