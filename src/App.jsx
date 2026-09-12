import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router"
import React, { useRef } from 'react';
import { Container } from '@mui/material'
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import theme from './theme.js'
import useStyles from './styles'
import AppNavbar from './components/Navbar/AppNavbar';
import Home from './pages/Home/Home';
import Auth from './pages/Auth/Auth';
import PostDetails from './pages/PostDetails/PostDetails';
import { socket } from './app/socket.js'
import { useSelector } from 'react-redux';
import { selectProfileExists } from './features/auth/authSlice.js';
import UserDetails from './pages/UserDetails/UserDetails';
import { selectShowChat } from './features/chat/chatSlice.js';
import Chat from './components/Chat/Chat';

function App() {
  const appRef = useRef(null);
  const { classes } = useStyles()
  const signedIn = useSelector(selectProfileExists)
  const chatShowing = useSelector(selectShowChat)
  React.useEffect(()=>{
    const handleConnect = () => {
      console.log('connected to server')
    }
    socket.on('connect', handleConnect)

    if(socket.connected){
      handleConnect()
    }
    
    

    return () => { socket.off('connect'), handleConnect }
  },[])

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AppNavbar/>
          <Container maxWidth='xl' className={classes.appContainer} ref={appRef}>
          <Routes>
            {/* <Route path='/' exact component={Home} /> */}
            <Route path='/' exact element={<Navigate to='/posts' replace/>} />
            <Route path='/posts' exact element={<Home/>} />
            <Route path='/posts/search' exact element={<Home/>} />
            <Route path='/posts/:id' element={<PostDetails/>} />
            <Route path='/auth' exact element={(()=> !signedIn ? <Auth /> : <Navigate to='/posts' replace />)()} />
            <Route path='/users/:id' element={<UserDetails/>} />
          </Routes>
          { chatShowing ? <Chat appRef={appRef} /> : '' }
          </Container>
        </BrowserRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App
