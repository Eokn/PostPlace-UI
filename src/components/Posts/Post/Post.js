import React from 'react'
import useStyles from './styles'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core'

import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { editPost, deleteOldPost, likeOldPost } from '../../../features/posts/postsSlice.js'
import { selectProfile, selectProfileExists } from '../../../features/auth/authSlice'
import { useHistory } from 'react-router'
import imgArr from '../../../imgArr.js'
import Likes from '../../Likes/Likes'

const Post = ({ post }) => {
    const profile = useSelector(selectProfile)
    const signedIn = useSelector(selectProfileExists)
    const history = useHistory()
    const dispatch = useDispatch()
    const classes = useStyles()
    const handleSelect = (e) => {
        e.preventDefault()
        e.stopPropagation()
        dispatch(editPost(post._id))
    }
    

const openPost = () => {
    history.push(`/posts/${post._id}`)
}

const didCreateThisPost = post.creator === profile?.result?.googleId || post.creator === profile?.result?._id
    
    return (
        <Card className={classes.card}>
            <ButtonBase className={classes.cardAction} onClick={openPost} >

            <CardMedia className={classes.media} image={post.selectedFile || imgArr[Math.floor(Math.random()*5)]} title={post.title}/>
            <div className={classes.overlay}  >
                <Typography variant='h6' >{post.name}</Typography>
                <Typography variant='body2' >{moment(post.createdAt).fromNow()}</Typography>
            </div>
            {didCreateThisPost && (<div className={classes.overlay2} >
                <Button color='primary' size='small' onClick={handleSelect} > <MoreHorizIcon /> </Button>
            </div>)}
            
            <div className={classes.details} >
                <Typography variant='body2' >{post.tags.map(tag => `#${tag} `)}</Typography>
            </div>
            <Typography className={classes.title} variant='h5' gutterBottom >{post.title}</Typography>
            <CardContent className={classes.message}>
            <Typography variant='body2' gutterBottom >{post.message}</Typography>
            </CardContent>
                </ButtonBase>
            <CardActions className={classes.cardActions} >
                <Button color='secondary' size='small' disabled={!signedIn} onClick={()=>{dispatch(likeOldPost({id:post._id, editor: profile?.result?.googleId || profile?.result?._id}))}} > <Likes item={post} /> </Button>
                {didCreateThisPost && (<Button color='secondary' size='small' disabled={!signedIn} onClick={()=>{dispatch(deleteOldPost({id:post._id, editor: profile?.result?.googleId || profile?.result?._id}))}} > <DeleteIcon fontSize='small' /> &nbsp; Delete  </Button>)}
            </CardActions>
        </Card>
    )
}

export default Post
