import CommentBlockRender from "../Comment/CommentBlockRender"
import PostRender from "./PostRender"
import CommentCreateForm from "../Comment/CommentCreateForm"

import { getAdditionalPostData, getPostData } from "../../services/postService"
import { getPostComments } from "../../services/commentService"
import useLoading from "../../hooks/useLoading"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styles from './styles/PostPage.module.css'
import ChannelPage from "../Channel/ChannelPage"
import UserDataContext from "../../contexts/UserDataContext"

const PostPage = () => {
  const [postData,setPostData] = useState()
  const [additionalPostData, setAdditionalPostData] = useState();
  const [comments,setComments] = useState([])
  const navigate = useNavigate()
  const { userData } = useContext(UserDataContext)

  const { postId } = useParams()

  const fetchPost = async () => {
    try{
      const response = await getPostData(postId)
      const deserialized = await response.json();
      const data = deserialized.postData;
      const additionalData = await getAdditionalPostData(data);
      setAdditionalPostData(additionalData);
      // const commentList = await getPostComments(postId)
      // 'code' in commentList
      //   ? setComments([]) 
      //   : setComments(commentList)
      //check if the post has any comments

      document.title = `${data.title}`
      setPostData(data)
    }
    catch(e)
    {
      console.log(e);
      navigate("/error");
    }
  }

  const [Spinner,fetchWithLoading, isLoading] = useLoading(fetchPost)
  useEffect(() => {
    fetchWithLoading()
    return () => document.title = 'Aether'
  },[])

  return (
    isLoading ? 
    <Spinner size={35} />
    :
    postData && 
      <div className={styles['outer-container']}>
        <div className={styles['inner-container']}>
          <div className={styles['post-container']}>
          <PostRender 
            postData={postData} 
            additionalPostData={additionalPostData}
            isRedirect={true} 
            isCompact={false}
          />
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
                  {userData && 
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
  ) 
}

export default PostPage
