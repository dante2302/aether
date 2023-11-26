import NavBar from './NavBar/NavBar.jsx'
import Home from './Home/Home.jsx'
import ChannelPage from './Channel/ChannelPage'
import PostCreationForm from './Post/PostCreationForm.jsx'
import { Routes, Route} from 'react-router-dom'
import { UserDataProvider } from './contexts/UserDataContext.jsx'
import { UserModalProvider } from './contexts/UserModalContext.jsx'

const App = () => {
  return (
      <UserDataProvider>
        <UserModalProvider> 
          <NavBar />
          <div className='canvas'>
            <Routes>
              <Route path={`c/:channelName`}>
                <Route index element={<ChannelPage />} />
                <Route path='submit' element={<PostCreationForm />} />
              </Route>
              <Route path='submit' element={<PostCreationForm />} />
              <Route path='/' element={<Home />}/>
            </Routes>
          </div>
        </ UserModalProvider> 
      </ UserDataProvider>
  )
}

export default App
