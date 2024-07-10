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
import { getUsername } from "../../services/userService"

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
      setPostData(data)

      const additionalData = await getAdditionalPostData(data);
      setAdditionalPostData(additionalData);

      const commentResponse = await getPostComments(postId)
      const commentList = (await commentResponse.json()).commentList;
      for(let i = 0;i < commentList.length; i++)
      {
        const response = await getUsername(commentList[i].ownerId);
        const ownerUsername = await response.json();
          commentList[i] = {
            ...commentList[i], 
            ownerUsername 
          }
      }
      setComments(commentList)

      document.title = `${data.title}`
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
        <div className={styles['inner-container']}>
          <div className={styles['post-container']}>
          <PostRender 
            postData={postData} 
            additionalPostData={additionalPostData}
            isRedirect={true} 
            isCompact={false}
          />
              {(comments.length > 0 && userData) &&
              <CommentCreateForm 
                postId={postId}
                setComments={setComments}
              />
              }
          <ul className={styles['comments']}>
            {comments.length > 0 
              ? 
              comments.map((commentData) => 
                <li key={commentData.id}>
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
  ) 
}

export default PostPage
