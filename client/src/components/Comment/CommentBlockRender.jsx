import { useEffect, useState } from "react"
import CommentRender from "./CommentRender"
import { getCommentReplies } from "../apis/commentApi"

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
    <div>
        <CommentRender commentData={commentData} />
        <ul>
        {commentReplies.map((replyData) => <li key={replyData._id}><CommentRender commentData={replyData} /></li> )}
        </ul>
    </div>
    :
    <CommentRender commentData={commentData}/>
  )
}
export default CommentBlockRender
