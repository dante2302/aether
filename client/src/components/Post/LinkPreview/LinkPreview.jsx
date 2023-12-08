
import { useEffect, useState } from 'react'
import {getLinkData} from './linkPreview.js'
import useLoading from '../../hooks/useLoading.jsx'

import styles from './LinkPreview.module.css'
const LinkPreview = ({url, isCompact}) => {
  const [linkData,setLinkData] = useState({})
  const getLinkDataWithState = () => getLinkData(url).then(data => setLinkData(data))
  const [Spinner,getLinkWithLoading] = useLoading(getLinkDataWithState)


  useEffect(() => {getLinkWithLoading()},[])

  return (
    linkData 
    ? 
    <a 
        href={isCompact ? "" : url} 
        target='_blank' 
        className={styles['preview']} 
        role='link'
        aria-disabled={isCompact}>
      <div>
        <h3>{linkData.title}</h3>
        <img src={linkData.image}/>
      </div>
    </a>
    :
      <>
        <Spinner size={15}/>
        <a 
          href={url} 
          target={'_blank'} 
          className={`${styles['link']} ${isCompact ? 'disabled' : ''}`}
        >
          {isCompact ? `${url.slice(0,15)}...` : url}
        </a>
      </>
  )
}

export default LinkPreview
