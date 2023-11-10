
const ChannelForm = (userData) => {
  initialFormState = {
    'name': '',
    
  }

  const submitHandler = (e,formState,userData) => {
    e.preventDefault()
    channelApi.createChannel({
      accessToken: userData.accessToken,
      id: userData._id,
      name: formState.name,
      description: formState.description
    })
  }
  return (
    <form onSubmit={(e) => submitHandler(e,formState,userData)}>

      <input 
        type='text'
        id='name'
        name='name'
        value={formState.title}
        onChange={(e) => formUtils.changeHandler(e,setFormState)}
        className={styles['title']}
      />

      <input 
        type='text'
        id='description'
        name='description'
        value={formState.title}
        onChange={(e) => formUtils.changeHandler(e,setFormState)}
        className={styles['description']}
      />
      <button>Create Channel</button>
    </form>
  )
}

export default ChannelForm
