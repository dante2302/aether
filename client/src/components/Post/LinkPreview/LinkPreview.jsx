import { useEffect, useState } from 'react'
import {getLinkData} from './linkPreview.js'
import UilLink from '@iconscout/react-unicons/icons/uil-link.js'
const LinkPreview = ({url}) => {
  const [linkData,setLinkData] = useState({})
  useEffect(() => {
    getLinkData(url).then((data) => {
      setLinkData(data)
    })
  },[])
  return (
    linkData 
    ? 
    <a href={url} target='_blank'>
      <UilLink />
      <h3>{linkData.title}</h3>
      <img src={linkData.image} className='linkPreviewImage'/>
    </a>
    :
    <a href={url} target='_blank'>{url}</a>
  )
}

export default LinkPreview
