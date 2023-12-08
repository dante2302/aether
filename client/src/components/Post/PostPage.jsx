import CommentBlockRender from "../Comment/CommentBlockRender"
import PostRender from "./PostRender"

import { getPostData } from "../apis/postApi"
import { getPostComments } from "../apis/commentApi"

import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import CommentForm from "../Comment/CommentForm"
import styles from './styles/PostPage.module.css'
import ChannelPage from "../Channel/ChannelPage"
import UserDataContext from "../contexts/UserDataContext"

const PostPage = () => {
  const [postData,setPostData] = useState()
  const [comments,setComments] = useState()
  const {userData} = useContext(UserDataContext)

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
    return () => document.title = 'Aether'
  },[])

  return (
    postData && 
      <div className={styles['outer-container']}>
        <div className={styles['inner-container']}>
          <div className={styles['post-container']}>
          <PostRender postData={postData} isRedirect={true} isCompact={false}/>
          <ul>
            {comments.length > 0 
              ? 
              comments.map((commentData) => 
                <li key={commentData._id}>
                  <CommentBlockRender commentData={commentData} setComments={setComments}/>
                </li>)
              :
                <div>
                  <p>There are no comments on this post. Be the first one to express their thoughts</p>
                  {userData 
                  && 
                  <CommentForm 
                    postId={postId}
                    parentCommentId={''}
                    isReply={false}
                    replyTo={''}
                  />}
                </div> 
            }
          </ul>
          </div>
          <ChannelPage isCompact={true} />
        </div>
      </div>
  ) 
}

export default PostPage
