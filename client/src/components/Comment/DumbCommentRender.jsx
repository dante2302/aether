
const DumbCommentRender = ({data}) => {
  return(
    <>
      <h6>{data.ownerUsername}</h6>
      <p>
        {data.replyTo &&
          <span>@{data.replyTo}  </span>}
        {data.text}
      </p>
    </>)
}

export default DumbCommentRender
