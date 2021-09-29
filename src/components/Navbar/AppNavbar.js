import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary'
import useStyles from './styles'
import decode from 'jwt-decode'
import {Link, useHistory, useLocation} from 'react-router-dom'
import { Avatar, Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { auth, authLogout, selectProfile, selectProfileExists } from '../../features/auth/authSlice'
import { socketAddPost, socketDeletePost, socketUpdatePost, socketAddComment, socketDeleteComment, socketUpdateComment } from '../../features/posts/postsSlice'
import { socket } from '../../app/socket'

const AppNavbar = () => {
    const currentLoc = useLocation()
    const profile = useSelector(selectProfile)
    const exists = useSelector(selectProfileExists)
    const history = useHistory()
    const classes = useStyles()
    const [user, setUser] = React.useState(profile)
    const dispatch = useDispatch();
    React.useEffect(()=>{
        console.log(currentLoc)
        //If I just sent the new currentLocation to the redux store as a value I keep track of, I can just pull from that and don't have to reupdate the sockets every time.
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
            //Checks if editor is not current user, then deletes post. I want it to have a special interaction when someone is visiting a post and the post gets deleted while they are still there. The interaction I want is for 1. it to replace the info of the post with something like 'The post ___ has been deleted, see below for posts like this one or >Return to the homepage<' 2. take away commenting ability. 3. Replace the picture with an error picture.
            //The best way I can see for all of them is to make the sockets update when a new page is loaded.
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
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageURL || ''} onClick={() => history.push(`/users/${user.result._id}`)} >{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant='h6' onClick={() => history.push(`/users/${user.result._id}`)} >{user.result.name}</Typography>
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
