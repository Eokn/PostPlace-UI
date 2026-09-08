import React from 'react'



import dayjs from '../../app/dayjs-config'

import useStyles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { getSinglePostReco, likeOldPost, selectLoading, selectPosts, } from '../../features/posts/postsSlice'
import { useNavigate, useParams } from 'react-router'
import { Button, ButtonBase, CircularProgress, Divider, Paper, Typography } from '@mui/material'
import imgArr from '../../imgArr'
import Comments from '../../components/Comments/Comments'
import Likes from '../../components/Likes/Likes'
import { selectProfile, selectProfileExists } from '../../features/auth/authSlice'

const PostDetails = () => {
    const { classes } = useStyles()
    const loading = useSelector(selectLoading)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const posts = useSelector(selectPosts)
    const signedIn = useSelector(selectProfileExists)
    const profile = useSelector(selectProfile)
    const {id} = useParams()
    const post = posts.find(x => x._id === id)



    React.useEffect(()=>{
        
            if(!loading){dispatch(getSinglePostReco(id))}

    }, [id])

    /* Make sure post exists, render component. Could alternatively check for loading once for both comments and recommended posts,
    but I prefer to have the two sections have their own circles. */
    if(!post && !loading) return (<Paper elevation={6} > Sorry, we couldn't find that post in our database. </Paper> )
    if(!post) return (<Paper className={classes.loadingPaper} elevation={6} > <CircularProgress size='7rem' color='secondary' /> </Paper> )
    return (
        
        <Paper className={classes.paperContainer} elevation={6}>
        <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="h6">Created by: <span className={classes.userLink} onClick={()=> navigate(`/users/${post.creator}`)}>{post.name}</span></Typography>
          <Typography variant="body1">{dayjs(post.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
          <Button className={classes.button} color='secondary' size='small' disabled={!signedIn} onClick={()=>{dispatch(likeOldPost({id:post._id, editor: profile?.result?.googleId || profile?.result?._id}))}} > <Likes item={post} /> </Button>
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={post.selectedFile || imgArr[Math.floor(Math.random()*5)]} alt={post.title} />
        </div>
      </div>

        { loading ? <CircularProgress size='7rem' color='secondary' /> : <Comments /> }
          <div className={`${classes.section} ${classes.smallSection}`}>
              <Divider style={{ margin: '8px 0' }} />
              <div className={classes.recommendedPosts}>
                  { loading ? <CircularProgress size='7rem' color='secondary' /> : (posts.filter(p => p._id !== id).map(({ title, message, name, likes, selectedFile, createdAt, _id }) => (
                      <ButtonBase key={_id} className={classes.post} onClick={() => navigate(`/posts/${_id}`)} >
                          <Typography gutterBottom variant='h6'>{title}</Typography>
                          <div className={classes.nameAndDate}>
                          <Typography variant='body2' className={classes.name} >{name}</Typography>
                          <Typography variant='body2' className={classes.date} >{dayjs(createdAt).fromNow()}</Typography>
                          </div>
                          <Typography gutterBottom variant='subtitle2'>{message}</Typography>
                          <Typography gutterBottom variant='subtitle1' className={classes.nameAndDate} > <Likes item={{ likes }} /> </Typography>
                          <img className={`${classes.cardPic} ${classes.media}`} src={selectedFile || imgArr[Math.floor(Math.random()*5)]} alt={title} />
                          </ButtonBase>
                  )))}
              </div>
          </div>
      
      
      </Paper>
      
    )
}

export default PostDetails
