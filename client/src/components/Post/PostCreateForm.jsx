import { useContext, useEffect, useState } from "react"

import * as formUtils from '../../utils/formUtils.js'

import { Link, useLocation, useNavigate } from "react-router-dom"
import { getRelatedChannels } from "../../services/userService.js"

import UserDataContext from "../../contexts/UserDataContext"
import useLoading from "../../hooks/useLoading.jsx"
import UilImage from "@iconscout/react-unicons/icons/uil-image.js"
import UilLink from "@iconscout/react-unicons/icons/uil-link.js"
import styles from './styles/PostCreateForm.module.css'
import noChannelImg from "/images/nochannelimg.png"
import { createPost } from "../../services/postService.js"

const PostCreateForm = () => {
  const initialFormState = {
    title: '',
    text: '',
    imgUrl: '',
    linkUrl: '',
  }
  const userChannels = useLocation().state?.userChannels
  const navigate = useNavigate()
  const [channels,setChannels] = useState(userChannels || [])
  const [selectedChannel,setSelectedChannel] = useState({})
  const { userData } = useContext(UserDataContext)

  async function fetchChannels() {
    if (!userData) { navigate('../'); return }
    const response = await getRelatedChannels(userData);

    if (!response.ok) navigate('../');

    let availableChannels = (await response.json()).channelList;
    if (availableChannels.length > 0) {
      setChannels(availableChannels)
      setSelectedChannel(availableChannels[0].id)
    }
  }
  const [LoadingSpinner, fetchWithLoading, isLoading ] = useLoading(fetchChannels)
  useEffect(() => {fetchWithLoading()},[userData])

  const [formState,setFormState] = useState(initialFormState)
  const [errorState, setErrorState] = useState({
    "imgUrl": "",
    "title": ""
  })

  const checkImgUrl = async (imgUrl) => {
    if(imgUrl === '')return true
    console.log(imgUrl)
    const regex =/^https?:\/\/.*\.(png|jpg|jpeg|gif|bmp|webp)$/i;
    if(regex.test(imgUrl)){
        const response = await fetch(imgUrl)
        return response.ok
    }
    return false
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    if(!await checkImgUrl(formState.imgUrl))
    {
      setErrorState(s => ({ ...s, imgUrl: "Invalid Img Url" }))
      return;
    }
    if(!formState.title)
      {
      setErrorState(s => ({ ...s, title: "Your post needs a title" }))
    }
      await createPost(userData,{...formState , channelId: selectedChannel})
      navigate('../')
  }

  return(
    isLoading ?
    <LoadingSpinner size={50} />
    :
    channels.length > 0 ?
    <form className={styles['form']}>
      <label htmlFor="channel">Choose a channel</label>
      <select
        id='channel'
        name='channel'
        value={selectedChannel._id}
        onChange={(e) => setSelectedChannel(e.target.value)}
      >
        {channels && 
          channels.map((channelData) => 
            <option key={channelData.id} value={channelData.id}>{channelData.name}</option>)
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
          onBlur={(e) => { 
            !formState.title && setErrorState(
              s => ({ ...s, title: "Your post needs a title" })
            ) 
          }}
        />

        {errorState.title && <div>{errorState.title}</div>}

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
          onBlur={async (e) => {
              if(!await checkImgUrl(formState.imgUrl)) 
                setErrorState(s => ({...s, imgUrl: "Invalid Img Url"}))
              else
                setErrorState(s => ({...s, imgUrl: ""}))
          }}
        />
        {errorState.imgUrl && <div>{errorState.imgUrl}</div>}

        <label htmlFor="linkUrl"><UilLink size={15}/>Link</label>
        <input
          id='linkUrl'
          name='linkUrl'
          type='text'
          value={formState.link}
          onChange={(e) => formUtils.changeHandler(e,setFormState)}
        />

      </div>

      <button onClick={(e) => submitHandler(e)}>Post</button>

    </form>
    :
    <div className={styles["no-channel-container"]}>
    <img src={noChannelImg} />
    <p>
       To create a post you need to join a channel.
       You can have a look at some channels at our {<Link to="/popular">Popular Page</Link>}
    </p>
    </div>
  )
}

export default PostCreateForm