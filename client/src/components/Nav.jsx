import styles from './styles/Nav.module.css'

const Nav = () => {
  return (
    <div className={styles["nav-container"]}>
      <p>Logo</p>
      <input name='search'/>
      <button>Log in</button>
    </div>
  )
}
export default Nav
