

import React from 'react'
import { useHistory, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleUserInfo, selectLoading, selectUserInfo } from '../../features/posts/postsSlice'
import { Button, CircularProgress, Divider, Paper, Typography } from '@material-ui/core'
import ClearIcon from '@material-ui/icons/Clear'
import Post from '../../components/Posts/Post/Post.js'
import useStyles from './styles'
import moment from 'moment'
import { selectProfile } from '../../features/auth/authSlice'
import Deletepopup from '../../components/Deletepopup/Deletepopup'

const UserDetails = () => {
    const classes = useStyles()
    const profile = useSelector(selectProfile)
    const loading = useSelector(selectLoading)
    const userInfo = useSelector(selectUserInfo)
    const dispatch = useDispatch()
    const history = useHistory()
    const {id} = useParams()
    const ownPage = userInfo?.name !== undefined && userInfo?.name === profile?.result?.name 
    const [delPopupInfo, setDelPopupInfo] = React.useState({show:false, mode:'', items:''})
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
            {delPopupInfo.show ? ( <Deletepopup turnOff={setDelPopupInfo} {...delPopupInfo} /> ) : ''}
            <Typography variant='h3'>{`${ownPage ? 'Your' : userInfo.name + "'s"} activity feed`}</Typography>
            <Divider style={{ margin: '8px 0' }} />
            <div className={classes.userActivity}>
            {userInfo.info.map(x => x.title || x.tags ? (
            <div key={x._id} className={classes.activity}  >
                {ownPage ? ( <ClearIcon color='secondary'  cursor='pointer' className={classes.deleteButton} onClick={()=>setDelPopupInfo({...delPopupInfo, show:true, mode:'post', items:{...x}})} /> ) : ''}
                <Typography gutterBottom variant='h6'>{`${ownPage ? 'You' : x.name} created '${x.title}'`}<span className={classes.dateText} >{moment(x.createdAt).fromNow()}</span></Typography>
                <Post post={x} userPage onClick={() => history.push(`/posts/${x._id}`)} cursor='pointer' />
            </div>
            ) : (
            <div key={x._id} className={classes.activity} >
                {ownPage ? ( <ClearIcon color='secondary'  cursor='pointer' className={classes.deleteButton} onClick={()=>setDelPopupInfo({...delPopupInfo, show:true, mode:'comment', items:{...x}})} /> ) : ''}
                <Typography gutterBottom variant='h6'>{`${ownPage ? 'You' : x.name} left a comment`}<span className={classes.dateText} >{moment(x.createdAt).fromNow()}</span></Typography>
                <Typography variant='body1' className={classes.textPop} onClick={() => history.push(`/posts/${x.belongsTo}`)} >{x.message}</Typography>
            </div>
            ) )}
            {ownPage && (<div className={classes.deleteAllGroup}>
                <Button variant='contained' color='secondary' onClick={()=>setDelPopupInfo({...delPopupInfo, show:true, mode:'allcontent', items:userInfo.info})} >
                Delete All Activity
                </Button>
                <Button variant='contained' color='secondary' onClick={()=>setDelPopupInfo({...delPopupInfo, show:true, mode:'account', items:userInfo.info})} >
                Delete Account
                </Button>
            </div>)}
            </div>
            
        </Paper>
    )
}

export default UserDetails
