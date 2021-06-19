import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary'
import useStyles from './styles'
import decode from 'jwt-decode'
import {Link, useHistory} from 'react-router-dom'
import { Avatar, Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { auth, authLogout, selectProfile, selectProfileExists } from '../../features/auth/authSlice'
import { socketAddPost, socketDeletePost, socketUpdatePost, socketAddComment, socketDeleteComment, socketUpdateComment } from '../../features/posts/postsSlice'
import { socket } from '../../app/socket'

const AppNavbar = () => {
    const profile = useSelector(selectProfile)
    const exists = useSelector(selectProfileExists)
    const history = useHistory()
    const classes = useStyles()
    const [user, setUser] = React.useState(profile)
    const dispatch = useDispatch();
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
    }
    

    return (
        <AppBar className={classes.appBar} color='background' position='fixed' >
            <Link className={classes.brandContainer} to='/'>
            <PhotoLibraryIcon className={classes.image} color='secondary'  />
            <Typography className={classes.heading} color='secondary' variant='h2' align='center'>PostPlace</Typography>
            </Link>
            <Toolbar className={classes.toolbar}>
                {user.result ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageURL} >{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant='h6' >{user.result.name}</Typography>
                        <Button variant='contained' className={classes.logout} color='secondary' onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    
                        <Button component={Link} to='/auth' variant='contained' color='secondary'>Sign in</Button>
                    
                )}

            </Toolbar>
        </AppBar>
    )
}

export default AppNavbar
