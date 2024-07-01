import {  useEffect, useState } from "react"
import CommentRender from "./CommentRender"
import { getCommentReplies } from "../../services/replyService"
import styles from './styles/CommentBlockRender.module.css'
import ReplyRender from "./ReplyRender"
import { getUsername } from "../../services/userService"


const CommentBlockRender = ({commentData,setComments}) => {
  const [commentReplies,setCommentReplies]  = useState([])

  useEffect(() => {
    const asyncFunc = async () => {        
      // console.log(commentData);
      const replies = await getCommentReplies(commentData.id)
      for(let i = 0; i < replies.length; i++)
        {
          const ownerUsername = await getUsername(replies[i].ownerId)  ;
          replies[i] = {
            ...replies[i],
            ownerUsername
          }
      }
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
            <li key={replyData.id}>
              <ReplyRender
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
