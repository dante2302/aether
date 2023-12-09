import CommentBlockRender from "../Comment/CommentBlockRender"
import PostRender from "./PostRender"
import CommentCreateForm from "../Comment/CommentCreateForm"

import { getPostData } from "../../apis/postApi"
import { getPostComments } from "../../apis/commentApi"
import useLoading from "../../hooks/useLoading"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styles from './styles/PostPage.module.css'
import ChannelPage from "../Channel/ChannelPage"
import UserDataContext from "../../contexts/UserDataContext"

const PostPage = () => {
  const [postData,setPostData] = useState()
  const [comments,setComments] = useState()

  const {userData} = useContext(UserDataContext)

  const postId = useParams().postId
  
  const fetchPosts = async () => {
    const data = await getPostData(postId)
    const commentList = await getPostComments(postId)
    'code' in commentList
      ? setComments([]) 
      : setComments(commentList)
    //check if the post has any comments

    document.title = `${data.title}`
    setPostData(data)
  }

  const [Spinner,fetchWithLoading] = useLoading(fetchPosts)
  useEffect(() => {
    fetchWithLoading()
    return () => document.title = 'Aether'
  },[])

  return (
    <>
    <Spinner size={35} />
    {postData && 
      <div className={styles['outer-container']}>
        <div className={styles['inner-container']}>
          <div className={styles['post-container']}>
          <PostRender postData={postData} isRedirect={true} isCompact={false}/>
              {comments.length > 0 &&
              <CommentCreateForm 
                postId={postId}
                parentCommentId={''}
                isReply={false}
                replyTo={''}
                setComments={setComments}
              />
              }
          <ul className={styles['comments']}>
            {comments.length > 0 
              ? 
              comments.map((commentData) => 
                <li key={commentData._id}>
                  <CommentBlockRender 
                        commentData={commentData} 
                        setComments={setComments}
                      />
                </li>)
              :
                <div className={styles['no-comments']}>
                  <p>There are no comments on this post. Be the first one to express their thoughts</p>
                  {userData 
                  && 
                  <CommentCreateForm 
                    postId={postId}
                    parentCommentId={''}
                    isReply={false}
                    replyTo={''}
                    setComments={setComments}
                  />}
                </div> 
            }
          </ul>
          </div>
          <ChannelPage isCompact={true} />
        </div>
      </div>
      }
    </>
  ) 
}

export default PostPage
