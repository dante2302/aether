import { useContext, useEffect, useState } from "react"

import * as formUtils from '../../utils/formUtils.js'

import * as postApi from '../../apis/postApi.js'
import {getChannelData} from '../../apis/channelService.js'

import { useNavigate } from "react-router-dom"

import UserDataContext from "../../contexts/UserDataContext"

import UilImage from "@iconscout/react-unicons/icons/uil-image.js"
import UilLink from "@iconscout/react-unicons/icons/uil-link.js"
import styles from './styles/PostCreateForm.module.css'

const PostCreateForm = () => {
  const initialFormState = {
    title: '',
    text: '',
    imgUrl: '',
    link: '',
  }

  const navigate = useNavigate()
  const [channels,setChannels] = useState([])
  const [selectedChannel,setSelectedChannel] = useState({})
  const {userData} = useContext(UserDataContext)

  useEffect(() => {
    if (!userData){navigate('../');return}
    const asyncFunc = async () => {
      let availableChannels = []
      for(const channel of userData.channels){
        const data = await  getChannelData(channel)
        availableChannels.push(data)
      }
      if(availableChannels.length>0){
        setChannels(availableChannels)
        setSelectedChannel(availableChannels[0]._id)
      }
      else {alert('You need a channel');navigate('../')}
    }
    asyncFunc()
  },[userData])



  const [formState,setFormState] = useState(initialFormState)

  const checkImgUrl = async (imgUrl) => {
    if(imgUrl === '')return true
    const httpRegex = new RegExp('^http://|^https://')
    const formatRegex = new RegExp('(.jpg|.jpeg|.png|.svg|.webp|.gif)$')

    if(httpRegex.test(imgUrl) && formatRegex.test(imgUrl)){
        const response = await fetch(imgUrl)
        return response.ok
    }
    return false
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    if(formState.title && await checkImgUrl(formState.imgUrl)){
      const channelData = await getChannelData(selectedChannel)
      const channelName = channelData.name
      await postApi.createPost(userData,{...formState , channelId: selectedChannel, channelName})
      navigate('../')
    }
  }

  return(
    <form onSubmit={(e) => submitHandler(e)} className={styles['form']}>
      <label htmlFor="channel">Choose a channel</label>
      <select
        id='channel'
        name='channel'
        value={selectedChannel._id}
        onChange={(e) => setSelectedChannel(e.target.value)}
      >
        {channels && 
          channels.map((channelData) => 
            <option key={channelData._id} value={channelData._id}>{channelData.name}</option>)
        }
      </select>
      <div className={styles['input-container']}>

        <label htmlFor="title">Title</label>
        <input 
          id='title'
          name='title'
          type='text'
          value={formState.title}
          onChange={(e) => formUtils.changeHandler(e,setFormState)} 
        />

        <label htmlFor="text">Text</label>
        <textarea
          id='text'
          name='text'
          value={formState.text}
          onChange={(e) => formUtils.changeHandler(e,setFormState)}
        />

        <label htmlFor="imgUrl"><UilImage size={15}/>Img</label>
        <input 
          id='imgUrl'
          name='imgUrl'
          type='text'
          value={formState.imgUrl}
          onChange={(e) => formUtils.changeHandler(e,setFormState)} 
        />

        <label htmlFor="link"><UilLink size={15}/>Link</label>
        <input
          id='link'
          name='link'
          type='text'
          value={formState.link}
          onChange={(e) => formUtils.changeHandler(e,setFormState)}
        />

      </div>

      <button>Post</button>

    </form>
  )
}

export default PostCreateForm
