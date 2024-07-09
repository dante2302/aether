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
      const response = await getCommentReplies(commentData.id)
      const replies = await response.json();
      for(let i = 0; i < replies.length; i++)
        {
          const ownerUsername = await(await getUsername(replies[i].ownerId)).json()  ;
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
                parentCommentData={commentData}
                setReplies={setCommentReplies}
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
