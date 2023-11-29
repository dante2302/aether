import CommentBlockRender from "../Comment/CommentBlockRender"
import PostRender from "./PostRender"

import { getPostData } from "../apis/postApi"
import { getPostComments } from "../apis/commentApi"

import { useEffect, useState } from "react"

const PostPage = ({postId}) => {
  const [postData,setPostData] = useState()
  const [comments,setComments] = useState()
  useEffect(() => {

    const asyncFunc = async () => {
      const data = await getPostData(postId)
      const commentList = await getPostComments(123)
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
          comments && comments.map((commentData) => <li key={commentData._id}><CommentBlockRender commentData={commentData} /></li>)
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

