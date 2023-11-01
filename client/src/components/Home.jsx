import styles from './styles/Home.module.css'

const Home = () => {
  return(
    <div className={styles['home-container']}>

      <div className={styles['home-top']}>
        <a>icon</a>
        <h6>Home</h6>
      </div>

      <div className={styles['home-info']}>
        <p> Your personal Aether page. Come here to check in with your favourite communities. </p>
      </div>

      <button className={styles['create-comm-btn']}>Create Community</button>

    </div>
  )
}

export default Home
