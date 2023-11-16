import { useEffect, useState } from "react"
import PostRender from '../Post/PostRender'
import * as postApi from '../apis/postApi'
const PopularPosts = () => {
  const [popPostElements,setPopPostElements] = useState()

  useEffect(() => {
    postApi.getPopularPosts().then(posts => {
      setPopPostElements(posts.map(postData => {
          return(
        <li key={postData._id}>
          <PostRender postData={postData} />
        </li>
        )
      }
      ))
    })
  },[])

  return(
    <ul>
      {popPostElements}
    </ul>
  )
}

export default PopularPosts
