import React from 'react';
import { Container } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './theme.js'
import useStyles from './styles'
import {BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import AppNavbar from './components/Navbar/AppNavbar.js';
import Home from './pages/Home/Home.js';
import Auth from './pages/Auth/Auth.js';
import PostDetails from './pages/PostDetails/PostDetails.js';
import { socket } from './app/socket.js'
import { useSelector } from 'react-redux';
import { selectProfileExists } from './features/auth/authSlice.js';
import UserDetails from './pages/UserDetails/UserDetails.js';

function App() {
  const classes = useStyles()
  const signedIn = useSelector(selectProfileExists)
  React.useEffect(()=>{
    socket.on('connect', ()=>{
      console.log('connected to server')
    })
    
    

    return () => { socket.disconnect() }
  },[])

  return (
        
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <AppNavbar />
            <Container maxWidth='xl' className={classes.appContainer}>
            <Switch>
              <Route path='/' exact component={()=> <Redirect to='/posts' /> } />
              <Route path='/posts' exact component={Home} />
              <Route path='/posts/search' exact component={Home} />
              <Route path='/posts/:id' component={PostDetails} />
              <Route path='/auth' exact component={()=> !signedIn ? <Auth /> : <Redirect to='/posts' />} />
              <Route path='/users/:id' component={UserDetails} />
            </Switch>
            </Container>
          </BrowserRouter>
        </ThemeProvider>
        
  );
}

export default App;
