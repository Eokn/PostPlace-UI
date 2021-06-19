import React from 'react'
import Post from './Post/Post.js'
import { useSelector } from 'react-redux'
import { selectLoading, selectPosts } from '../../features/posts/postsSlice.js'
import { Grid, CircularProgress, Paper, Typography } from '@material-ui/core'
import useStyles from './styles'

const Posts = () => {
    const posts = useSelector(selectPosts)
    const loading = useSelector(selectLoading)
    const classes = useStyles()
    
    
    if (!posts.length && !loading) return (<Paper className={classes.loadingPaper}> <Typography variant='h3' >No posts found.</Typography>  </Paper>)


    return (
        loading ? (<Paper className={classes.loadingPaper} ><CircularProgress size='7em' color='secondary' /></Paper>  ) : (
        <Grid className={classes.container} container alignItems='stretch' spacing={2}>
            {posts.map(post => (
            <Grid key={post._id} item xs={12} sm={6} md={4} lg={3}  >
                <Post post={post}/>
            </Grid>))}
        </Grid>)
    )
}

export default Posts
