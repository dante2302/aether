import React from 'react'
import styles from './styles/App.module.css'
import Nav from './Nav.jsx'
import Feed from './Feed.jsx'
import Home from './Home.jsx'

const App = () => {
  return (
    <>
      <div className={styles['nav-wrap']}>
        <Nav />
      </div>

      <div className={styles['content-wrap']}>
        <Feed />
        <Home />
      </div>
    </>
  )
}

export default App
