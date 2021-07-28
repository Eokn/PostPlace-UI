

import React from 'react'
import { useHistory, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleUserInfo, selectLoading, selectUserInfo } from '../../features/posts/postsSlice'
import { ButtonBase, CircularProgress, Divider, Paper, Typography } from '@material-ui/core'
import Post from '../../components/Posts/Post/Post.js'
import useStyles from './styles'
import moment from 'moment'
import { selectProfile } from '../../features/auth/authSlice'

const UserDetails = () => {
    const classes = useStyles()
    const profile = useSelector(selectProfile)
    const loading = useSelector(selectLoading)
    const userInfo = useSelector(selectUserInfo)
    const dispatch = useDispatch()
    const history = useHistory()
    const {id} = useParams()
    const ownPage = userInfo?.name !== undefined && userInfo?.name === profile?.result?.name 
    React.useEffect(()=>{
            console.log(userInfo)
            if(!loading){dispatch(getSingleUserInfo(id))}

    }, [id])
    
    if(loading) return (<Paper className={classes.loadingPaper} elevation={6} > <CircularProgress size='7rem' color='secondary' /> </Paper>)
    else if(!userInfo?.info.length) return (
        <Paper className={classes.paperContainer} elevation={6}>
            <Typography variant='h3'>{`${ownPage ? 'Your' : userInfo?.name + "'s"} activity feed`}</Typography>
            <Divider style={{ margin: '8px 0' }} />
                <Typography variant='h3'>No user actions found.</Typography>
        </Paper>
    )
    return (
        <Paper className={classes.paperContainer} elevation={6}>
            <Typography variant='h3'>{`${ownPage ? 'Your' : userInfo.name + "'s"} activity feed`}</Typography>
            <Divider style={{ margin: '8px 0' }} />
            <div className={classes.userActivity}>
            {userInfo.info.map(x => x.title || x.tags ? (
            <ButtonBase key={x._id} className={classes.activity} onClick={() => history.push(`/posts/${x._id}`)} >
                <Typography gutterBottom variant='h6'>{`${ownPage ? 'You' : x.name} created '${x.title}'`}<span className={classes.dateText} > {moment(x.createdAt).fromNow()}</span></Typography>
                <Post post={x} userPage/>
            </ButtonBase>
            ) : (
            <ButtonBase key={x._id} className={classes.activity} onClick={() => history.push(`/posts/${x.belongsTo}`)} >
                <Typography gutterBottom variant='h6'>{`${ownPage ? 'You' : x.name} left a comment`}<span className={classes.dateText} > {moment(x.createdAt).fromNow()}</span></Typography>
                <Typography variant='body1' className={classes.textPop}>{x.message}</Typography>
            </ButtonBase>
            ) )}

            </div>
            
        </Paper>
    )
}

export default UserDetails
