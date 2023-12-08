import { useEffect, useState } from "react"
import CommentRender from "./CommentRender"
import { getCommentReplies } from "../apis/commentApi"
import styles from './styles/CommentBlockRender.module.css'

const CommentBlockRender = ({commentData}) => {

  const [commentReplies,setCommentReplies]  = useState([])

  useEffect(() => {
    const asyncFunc = async () => {        
      const replies = await getCommentReplies(commentData._id)
      setCommentReplies(replies)
    }
    asyncFunc()
  },[])

  return(
    commentReplies.length > 0 
    ? 
    <div className={styles['comment-container']}>
        <CommentRender commentData={commentData} setCommentReplies={setCommentReplies}/>
        <ul className={styles['replies']}>
        {commentReplies.map((replyData) => 
            <li key={replyData._id}>
              <CommentRender commentData={replyData} setCommentReplies={setCommentReplies}/>
            </li> )}
        </ul>
    </div>
    :
    <CommentRender commentData={commentData} setCommentReplies={setCommentReplies}/>
  )
}
export default CommentBlockRender
