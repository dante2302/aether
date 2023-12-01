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
      setPostData(data)
      setComments(commentList)
    }
    asyncFunc()

  },[])

  return (
    postData && 
    <div style={{display:'flex','flexDirection':'column'}}>
      <PostRender postData={postData}/>
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

  // const { userData } = useContext(UserDataContext)
  // const [commentData,setCommentData] = useState({})
  //
  // useEffect(() => {
  //   const asyncFunc = async () => {
  //     const data = await getCommentData(commentId) 
  //     const ownerData = await getUserDataByProp('_ownerId',data._ownerId)
  //     setCommentData({...data,ownerUsername:ownerData.username})
  //   }
  //   asyncFunc()
  // },[])

