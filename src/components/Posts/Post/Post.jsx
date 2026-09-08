import React from 'react'
import useStyles from './styles'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@mui/material'

import DeleteIcon from '@mui/icons-material/Delete'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import dayjs from '../../../app/dayjs-config.js'
import { useDispatch, useSelector } from 'react-redux'
import { editPost, deleteOldPost, likeOldPost } from '../../../features/posts/postsSlice.js'
import { selectProfile, selectProfileExists } from '../../../features/auth/authSlice'
import { useNavigate } from 'react-router'
import imgArr from '../../../imgArr.js'
import Likes from '../../Likes/Likes'

const Post = ({ post, userPage }) => {
    const profile = useSelector(selectProfile)
    const signedIn = useSelector(selectProfileExists)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { classes } = useStyles()
    const handleSelect = (e) => {
        e.preventDefault()
        e.stopPropagation()
        dispatch(editPost(post._id))
    }
    

const openPost = () => {
    navigate(`/posts/${post._id}`)
}

const didCreateThisPost = post.creator === profile?.result?.googleId || post.creator === profile?.result?._id
    
    return (
        <Card className={classes.card}>
            <ButtonBase className={classes.cardAction} onClick={openPost} component={userPage ? 'div' : 'button'}>

            <CardMedia className={classes.media} image={post.selectedFile || imgArr[Math.floor(Math.random()*5)]} title={post.title}/>
            <div className={classes.overlay}  >
                <Typography variant='h6' >{post.name}</Typography>
                <Typography variant='body2' >{dayjs(post.createdAt).fromNow()}</Typography>
            </div>
            {didCreateThisPost && !userPage && (<div className={classes.overlay2} >
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
                <Button color='secondary' size='small' disabled={!signedIn} component={userPage ? 'div' : 'button'} onClick={()=>{dispatch(likeOldPost({id:post._id, editor: profile?.result?.googleId || profile?.result?._id}))}} > <Likes item={post} /> </Button>
                {didCreateThisPost && (<Button color='secondary' size='small' disabled={!signedIn} onClick={()=>{dispatch(deleteOldPost({id:post._id, editor: profile?.result?.googleId || profile?.result?._id}))}} > <DeleteIcon fontSize='small' /> &nbsp; Delete  </Button>)}
            </CardActions>
        </Card>
    )
}

export default Post
