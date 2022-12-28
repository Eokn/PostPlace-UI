import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary'
import useStyles from './styles'
import decode from 'jwt-decode'
import {Link, useHistory, useLocation, matchPath} from 'react-router-dom'
import { Avatar, Button, ButtonBase, IconButton } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { auth, authLogout, selectProfile, selectProfileExists } from '../../features/auth/authSlice'
import { socketAddPost, socketDeletePost, socketUpdatePost, socketAddComment, socketDeleteComment, socketUpdateComment, selectOnPostDetails, updateOnPostDetails } from '../../features/posts/postsSlice'
import { socket } from '../../app/socket'
import UserMenu from './UserMenu/UserMenu'
import { toggleChat } from '../../features/chat/chatSlice'
import ChatIcon from '@material-ui/icons/Chat';
import { useRef } from 'react'

const AppNavbar = () => {
    const currentLoc = useLocation()
    const profile = useSelector(selectProfile)
    const exists = useSelector(selectProfileExists)
    const onPostDetails = useSelector(selectOnPostDetails)
    const history = useHistory()
    const classes = useStyles()
    const [user, setUser] = React.useState(profile)
    const dispatch = useDispatch();
    const navRef = useRef(null);

    React.useEffect(()=>{
        console.log(currentLoc.pathname, '/posts/:id', matchPath(currentLoc.pathname, '/posts/:id'), matchPath(currentLoc.pathname, '/posts/:id')?.isExact )
        if ( matchPath(currentLoc.pathname, '/posts/:id')?.isExact !== onPostDetails ) {
            if(onPostDetails === ''){
                console.log('update the value because first time on site', matchPath(currentLoc.pathname, '/posts/:id')?.isExact, onPostDetails)
                dispatch(updateOnPostDetails(matchPath(currentLoc.pathname, '/posts/:id') !== null))
            } else if( matchPath(currentLoc.pathname, '/posts/:id')?.isExact !== onPostDetails ){
                console.log('update the state because the current page is different than the stored value', matchPath(currentLoc.pathname, '/posts/:id')?.isExact, onPostDetails)
                dispatch(updateOnPostDetails(!onPostDetails))
            }
        }
    },[currentLoc])
    React.useEffect(()=>{
        const token = profile.token

        if(token){
            const decodedToken = decode(token)
            if(decodedToken.exp*1000 < new Date().getTime()) logout()
        }

        setUser({...JSON.parse(localStorage.getItem('profile'))})
        dispatch(auth({...JSON.parse(localStorage.getItem('profile'))}))
    },[exists])
    React.useEffect(()=>{
    socket.off('updatedPost')
    socket.off('deletedPost')
    socket.off('addedPost')
    socket.off('addedComment')
    socket.off('deletedComment')
    socket.off('updatedComment')
    socket.on('updatedPost', (data)=>{
        if((data.editor !== user?.result?._id) && (data.editor !== user?.result?.googleId) ) {
            dispatch(socketUpdatePost(data.data))
        } 
    })
    socket.on('deletedPost', (data)=>{
        if((data.editor !== user?.result?._id) && (data.editor !== user?.result?.googleId) ) {
            dispatch(socketDeletePost(data.data))
        } 
    })
    socket.on('addedPost', (data)=>{
        if((data.editor !== user?.result?._id) && (data.editor !== user?.result?.googleId) ) {
            dispatch(socketAddPost(data.data))
        } 
    })
    socket.on('addedComment', (data)=>{
        if((data.editor !== user?.result?._id) && (data.editor !== user?.result?.googleId) ) {
            dispatch(socketAddComment(data.data))
        } 
    })
    socket.on('updatedComment', (data)=>{
        if((data.editor !== user?.result?._id) && (data.editor !== user?.result?.googleId) ) {
            dispatch(socketUpdateComment(data.data))
        } 
    })
    socket.on('deletedComment', (data)=>{
        if((data.editor !== user?.result?._id) && (data.editor !== user?.result?.googleId) ) {
            dispatch(socketDeleteComment(data.data))
        } 
    })
    

  },[exists, user])
    const logout = () => {
        dispatch(authLogout())
        history.push('/')
        setUser({})
        dispatch(toggleChat())
    }
    

    return (
        <AppBar className={classes.appBar} color='background' position='fixed' ref={navRef}>
            <Link className={classes.brandContainer} to='/'>
            <PhotoLibraryIcon className={classes.image} color='secondary'  />
            <Typography className={classes.heading} color='secondary' variant='h2' align='center'>PostPlace</Typography>
            </Link>
            <Toolbar className={classes.toolbar}>
                {user.result ? (
                    <div className={classes.profile}>
                        <Typography className={classes.userName} variant='h6' onClick={() => history.push(`/users/${user.result.googleId || user.result._id}`)} >{user.result.name}</Typography>
                        <UserMenu user={user.result} logout={logout} navRef={navRef.current}/>
                    </div>
                ) : (
                    <div className={classes.notLoggedIn}>
                        <IconButton className={classes.chatOpener} >

                        <ChatIcon color='secondary' fontSize='large' onClick={()=>dispatch(toggleChat())} />
                        </IconButton>
                        <Button component={Link} to='/auth' variant='contained' color='secondary'>Sign in</Button>
                    </div>
                    
                )}

            </Toolbar>
        </AppBar>
    )
}

export default AppNavbar
