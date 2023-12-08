
import { useEffect, useState } from 'react'
import {getLinkData} from './linkPreview.js'
import useLoading from '../../hooks/useLoading.jsx'

import UilLink from '@iconscout/react-unicons/icons/uil-link.js'
import styles from './LinkPreview.module.css'
const LinkPreview = ({url}) => {
  const [linkData,setLinkData] = useState({})
  const getLinkDataWithState = () => getLinkData(url).then(data => setLinkData(data))
  const [Spinner,getLinkWithLoading] = useLoading(getLinkDataWithState)


  useEffect(() => {getLinkWithLoading()},[])

  return (
    linkData 
    ? 
    <a href={url} target='_blank' className={styles['preview']}>
      <div>
        <h3>{linkData.title}</h3>
        <img src={linkData.image}/>
      </div>
      <UilLink size={100}/>
    </a>
    :
      <>
        <Spinner size={15}/>
        <a href={url} target='_blank'>{url.slice(0,15)}...</a>
      </>
  )
}

export default LinkPreview
