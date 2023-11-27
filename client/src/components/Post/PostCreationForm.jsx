import { useContext, useEffect, useState } from "react"
import * as formUtils from '../utils/formUtils.js'
import * as postApi from '../apis/postApi.js'
import {getChannelData} from '../apis/channelApi.js'
import { useNavigate } from "react-router-dom"

import UserDataContext from "../contexts/UserDataContext"

const PostForm = () => {
  const initialFormState = {
    title: '',
    text: '',
    imgUrl: '',
    link: '',
  }

  const navigate = useNavigate()
  const [channels,setChannels] = useState([])
  const [selectedChannel,setSelectedChannel] = useState()
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
        setSelectedChannel(availableChannels[0])
      }
      else {alert('You need a channel');navigate('../')}
    }
    asyncFunc()
  },[])



  const [formState,setFormState] = useState(initialFormState)

  const checkImgUrl = async (imgUrl) => {
    const img = new Image()
    img.src = imgUrl
    if(img.complete){
      return true
    }
    else{
      img.onload = () => true
      img.onerror = () => false
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    if(formState.title && await checkImgUrl(formState.imgUrl)){
      await postApi.createPost(userData,{...formState , channelId:selectedChannel._id})
      navigate('../')
    }
  }

  return(
    <form onSubmit={(e) => submitHandler(e)}>
      <select
        id='channel'
        name='channel'
        value={selectedChannel && selectedChannel._id}
        onChange={(e) => setSelectedChannel(e.target.value)}
      >
        {channels && 
          channels.map((channelData) => 
            <option key={channelData._id} value={channelData._id}>{channelData.name}</option>)
        }
      </select>

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
      <label htmlFor="imgUrl">Img:</label>
      <input 
        id='imgUrl'
        name='imgUrl'
        type='text'
        value={formState.imgUrl}
        onChange={(e) => formUtils.changeHandler(e,setFormState)} 
      />

      <button>Post</button>
    </form>
  )
}

export default PostForm
