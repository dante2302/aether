import {  useEffect, useState } from "react"
import CommentRender from "./CommentRender"
import { getCommentReplies } from "../apis/commentApi"
import styles from './styles/CommentBlockRender.module.css'


const CommentBlockRender = ({commentData,setComments}) => {
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
          data={commentData}
          setCommentReplies={setCommentReplies}
          setComments={setComments}
        />
        
        <ul className={styles['replies']}>
          {commentReplies.map((replyData) => 
            <li key={replyData._id}>
              <CommentRender 
                data={replyData} 
                isReply={true}
                setCommentReplies={setCommentReplies}
                setComments={setComments}
              />
            </li> 
          )}

        </ul>
    </div>
    :
      <CommentRender 
        data={commentData} 
        setCommentReplies={setCommentReplies}
        setComments={setComments}
      />
  )
}
export default CommentBlockRender
