import CommentBlockRender from "../Comment/CommentBlockRender"
import PostRender from "./PostRender"

import { getPostData } from "../apis/postApi"
import { getPostComments } from "../apis/commentApi"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import CommentForm from "../Comment/CommentForm"

const PostPage = () => {
  const [postData,setPostData] = useState()
  const [comments,setComments] = useState()

  const postId = useParams().postId

  useEffect(() => {

    const asyncFunc = async () => {
      const data = await getPostData(postId)
      const commentList = await getPostComments(postId)
      'code' in commentList
        ? setComments([]) 
        : setComments(commentList)
      //check if the post has any comments

      document.title = `${data.title}`
      setPostData(data)
    }
    asyncFunc()
    return () => {
      document.title = 'Aether'
    }
  },[])

  return (
    postData && 
    <div style={{display:'flex','flexDirection':'column'}}>
      <PostRender postData={postData} isRedirect={true} isCompact={false}/>
      <ul>
      {
        comments.length > 0 
        ? 
        comments.map((commentData) => 
          <li key={commentData._id}>
            <CommentBlockRender commentData={commentData} />
          </li>)
        :
        <div>
          <p>There are no comments on this post. Be the first one to express their thoughts</p>
          <CommentForm 
            postId={postId}
            parentCommentId={''}
            isReply={false}
            replyTo={''}
          />
        </div>
      }
      </ul>
    </div>
  ) 
}

export default PostPage
