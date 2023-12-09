import styles from './styles/DumbCommentRender.module.css'

const DumbCommentRender = ({data}) => {
  return(
    <>
      <h6 className={styles['username']}>{data.ownerUsername}</h6>
      <p>
        {data.replyTo &&
          <span className={styles['replyUsername']}>@{data.replyTo}  </span>}
        {data.text}
      </p>
    </>)
}

export default DumbCommentRender
