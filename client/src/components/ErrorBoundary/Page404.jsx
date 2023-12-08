import { useNavigate } from 'react-router-dom'
import styles from './styles/Page404.module.css'

const Page404 = () => {
  const navigate = useNavigate()
  return (
  <div className={styles['container']}>
      <img src='/images/404.svg' width={600}/>
      <h1>Page not found.</h1>
      <button onClick={() => navigate('/')}>Home</button>
  </div>
  )  
}

export default Page404
