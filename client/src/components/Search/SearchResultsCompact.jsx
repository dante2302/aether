import { memo } from "react"

const SearchResulstCompact = memo(({postResults,channelResults}) => {
  return (
    <div>
        {channelResults.length > 0 &&
      <div>
        <h5>Channels:</h5>
        <ul>
          {channelResults.map((channelData) => 
            <li key={`${channelData._id}res`}>
              <h6>c/{channelData.name}</h6>
            </li>)}
        </ul>
      </div>
    }
      {postResults.length > 0 &&
        <div>
          <h5>Posts:</h5>
          <ul>
            {postResults.map((postData) => 
              <li key={`${postData._id}res`}>
                <div>
                  <h6>{postData.ownerUsername}</h6>
                  <h6>{postData.title}</h6>
                </div>
              </li>)}
          </ul>
        </div>
      }
    </div>
  )
})

export default SearchResulstCompact
