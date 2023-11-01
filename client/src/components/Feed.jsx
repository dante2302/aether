import Post from "./Post.jsx" 

const commName = "bulgaria"
const Feed = () => {
  return(
    <div>
      <h1>Your Feed</h1>
      <Post
        communityName={commName}
        postHeading="Halloween is for kids not for whores"
        postDescription="asdasgunjas"
        numberOfVotes={5}
        communityIsPublic={true}
      />
    </div>
  )
}

export default Feed
