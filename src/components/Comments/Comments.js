import { Avatar, Button, Divider, IconButton, TextField, Typography } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import DeleteIcon from '@material-ui/icons/Delete'
import moment from 'moment'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { selectProfile, selectProfileExists } from '../../features/auth/authSlice'
import { deleteOldComment, likeOldComment, saveNewComment, selectComments, } from '../../features/posts/postsSlice'
import Likes from '../Likes/Likes'
import useStyles from './styles'

const Comments = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const user = useSelector(selectProfile)
    const comments = useSelector(selectComments)
    const history = useHistory()
    const signedIn = useSelector(selectProfileExists)
    const {id} = useParams()
    const [submitVis, setSubmitVis] = React.useState(false)
    const [message, setMessage] = React.useState('')

    //Hide submit button until message state is populated.
    const toggleSubmitVis = () => {
        if(message.length === 0){setSubmitVis(!submitVis)}
    }

    //On submit reset data to default.
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(saveNewComment({ message, belongsTo:id, name:user.result.name, creator:user?.result?._id || user?.result?.googleId }))
        setMessage('')
        setSubmitVis(false)
    }
    const handleChange = (e) => {
        setMessage(e.target.value)
    }
    return (
        <div>
            <Divider style={{ margin: '16px 0' }} />
              <Typography gutterBottom variant='h6' >{`${comments.length} Comment${comments.length === 1 ? '' : 's'}`}</Typography>
              <div className={classes.flexForMessage}>
                  { !signedIn ? (<AccountCircle color='secondary' className={classes.accountIcon} />) : (<Avatar className={classes.avatar} alt={user.result.name} src={user.result.imageURL} >{user.result.name.charAt(0)}</Avatar>) }
                <form className={classes.flexForForm} autoComplete='off' noValidate onSubmit={handleSubmit}>
                    <TextField className={classes.marginLeft} fullWidth multiline value={message} onChange={handleChange} onBlur={toggleSubmitVis} onFocus={()=>{if(!signedIn){history.push('/auth')}else{toggleSubmitVis()}}} label="Leave a comment..." variant="filled" size='small' color='secondary' />
                    {submitVis && (<Button color='secondary' type='submit' disabled={message.trim().length === 0} variant='contained' className={classes.submit} >submit</Button>)}
                  </form>
              </div>
              {comments.map(comment => {
                  const didCreateThisComment = comment.creator === user?.result?.googleId || comment.creator === user?.result?._id
                  return (<div className={classes.flexForMessage} key={comment._id} >
                  <Avatar className={classes.avatar} onClick={() => history.push(`/users/${comment.creator}`)}>{comment.name.charAt(0).toUpperCase()}</Avatar>
                  <div className={classes.userStats}>
                      <div className={classes.flexForNameDate}>
                        <Typography variant='body2' className={classes.name} onClick={() => history.push(`/users/${comment.creator}`)} >{comment.name}</Typography>
                        <Typography variant='body2' className={classes.date} >{moment(comment.createdAt).fromNow()}</Typography>
                      </div>
                      <Typography variant='body2'>{comment.message}</Typography>
                      <div className={classes.flexForLikeAndDelete}>
                          <div className={`${!signedIn ? classes.greyOut : ''} ${classes.flexForLikeAndDelete}`} >
                              <IconButton className={classes.button} color='secondary' size='small' disabled={!signedIn} onClick={()=>{dispatch(likeOldComment({belongsTo:id, id:comment._id, editor: user?.result?._id || user?.result?.googleId}))}} > <Likes item={comment} noText />  </IconButton>
                          &nbsp;{comment.likes.length}
                          </div>
                          {didCreateThisComment && (<Button className={classes.marginTopAdjust} color='secondary' variant='outlined' size='small' onClick={()=>{dispatch(deleteOldComment({belongsTo:id, id:comment._id, editor: user?.result?._id || user?.result?.googleId}))}} > <DeleteIcon fontSize='small' />  Delete  </Button>)}
                      </div>
                  </div>
              </div>)}) }
        </div>
    )
}

export default Comments
