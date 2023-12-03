import UilShare from '@iconscout/react-unicons/icons/uil-share.js'
import styles from './styles/PostSharing.module.css/'
import { useState } from 'react'

const PostSharing = ({postData}) => {
  const [copied,setCopied] = useState(false)

  const shareHandler = (e) => {
    e.stopPropagation()
    navigator.clipboard.writeText(
      `http://localhost:5173/c/${postData.channelName}/${postData._id}/`)
    setCopied(true)
  }

  return(
    <div className={styles['tooltip']}>
    <button 
        onClick={(e) => shareHandler(e)}
        onBlur={()=>setCopied(false)}
        onMouseOut={()=>setCopied(false)}
    >
      <UilShare />
      <span>Share</span>
      <span className={styles['tooltiptext']}>{ copied ? 'Copied' : 'Copy'} to clipboard</span>
    </button>
    </div>
  )
}
export default PostSharing
