import {  useEffect, useState } from "react"
import CommentRender from "./CommentRender"
import { getAdditionalReplyListData, getCommentReplies } from "../../services/replyService"
import styles from './styles/CommentBlockRender.module.css'
import ReplyRender from "./ReplyRender"

const CommentBlockRender = ({commentData,setComments, setCommentCount}) => {
  const [commentReplies,setCommentReplies]  = useState([])

  useEffect(() => {
    const asyncFunc = async () => {        
      const response = await getCommentReplies(commentData.id)
      let replies = await response.json();
      replies = await getAdditionalReplyListData(replies, commentData);
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
          setCommentCount={setCommentCount}
        />
        
        <ul className={styles['replies']}>
          {commentReplies.map((replyData) => 
            <li key={replyData.id}>
              <ReplyRender
                replies={commentReplies}
                data={replyData} 
                parentCommentData={commentData}
                setReplies={setCommentReplies}
                setCommentCount={setCommentCount}
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
        setCommentCount={setCommentCount}
      />
  )
}
export default CommentBlockRender