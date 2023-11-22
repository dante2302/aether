import PostRender from '../../Post/PostRender'

import { getPopularPosts } from "../../apis/postApi"

import { useEffect, useState } from "react"

const PopularPosts = () => {
  const [popPostElements,setPopPostElements] = useState()

  useEffect(() => {
    getPopularPosts().then(posts => {
      setPopPostElements(posts.map(postData => {
          return(
            <li key={postData._id}>
             <PostRender postData={postData} />
            </li>
          )
      }))
    })
  },[])

  return(
    <ul>
      {popPostElements}
    </ul>
  )
}

export default PopularPosts
