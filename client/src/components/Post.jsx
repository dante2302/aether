import styles from './styles/Post.module.css'

const Post = (props) => {
  return(
    <div className={styles['post-container']}>
      <div>

        <h1>r/{props.communityName}</h1>
        {props.communityIsPublic&&<button>Join</button>}

      </div>
      <h1>{props.postHeading}</h1>
      <p>{props.postDescription}</p>

      <div className={styles['buttons-row']}>

        <div className={styles['voting-container']}>
          <button>Upvote</button>
          <span>{props.numberOfVotes||Vote}</span>
          <button>Downvote</button>
        </div>

        <div className={styles['comment-container']}>
          <p>Comment</p>
        </div>

        <div className={styles['share-container']}>
          <p>Share</p>
        </div>
      
      </div>

    </div>
  )
}

export default Post
