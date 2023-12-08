import {  useEffect, useState } from "react"
import CommentRender from "./CommentRender"
import { getCommentReplies } from "../apis/commentApi"
import styles from './styles/CommentBlockRender.module.css'
import ReplyRender from "./ReplyRender"

const CommentBlockRender = ({commentData}) => {
  const [data,setCommentData] = useState(commentData)
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

        <CommentRender 
          commentData={data} 
          setCommentData={setCommentData}
          setCommentReplies={setCommentReplies}
        />

        <ul className={styles['replies']}>
          {commentReplies.map((replyData) => 
            <li key={replyData._id}>
              <ReplyRender data={replyData} />
            </li> 
          )}

        </ul>
    </div>
    :
      <CommentRender 
        commentData={commentData} 
        setCommentData={setCommentData}
        setCommentReplies={setCommentReplies}
      />
  )
}
export default CommentBlockRender
