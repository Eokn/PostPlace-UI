import { Button } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectProfile } from '../../features/auth/authSlice'
import { deleteAccount, deleteAllContent, deleteOldComment, deleteOldPost } from '../../features/posts/postsSlice'
import useStyles from './styles'
const Deletepopup = ({turnOff, show, mode, items}) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const profile = useSelector(selectProfile)
    var deleteStatement
    var deleteData
    var deleteFunc
    switch(mode) {
        case 'post':
            deleteStatement = `${items.title} and all associated comments made by you or others on the post`
            deleteData = {id:items._id, editor: profile?.result?.googleId || profile?.result?._id}
            deleteFunc = (x) => {dispatch(deleteOldPost(x))}
            break;
        case 'comment':
            deleteStatement = `your comment`
            deleteData = {belongsTo:items.id, id:items._id, editor: profile?.result?._id || profile?.result?.googleId}
            deleteFunc = (x) => {dispatch(deleteOldComment(x))}
            break;
        case 'allcontent':
            deleteStatement = 'ALL your posts and comments'
            deleteData = {...items}
            deleteFunc = (x) => {dispatch(deleteAllContent(x))}
            break;
        case 'account':
            deleteStatement = 'ALL posts, comments and your account itself'
            deleteData = {...items}
            deleteFunc = (x) => {dispatch(deleteAccount(x))}
            break;
            default:
                deleteStatement = 'content'


    }

  return (

    <div className={classes.filmBox} >
    <div className={classes.deleteContainer}>
        <h1 className={classes.warningText}>WARNING</h1>
        <p className={classes.warningDescription}>Are you sure you want to <b>permanently delete</b> <u>{deleteStatement}</u>?</p>
        <div>
            <Button className={classes.buttonGroup} variant='contained' color='primary' onClick={()=>{
                deleteFunc(deleteData)
                turnOff({show:false,mode:'',items:''})
            }}>
    yes
    </Button>
    <Button className={classes.buttonGroup} variant='contained' color='primary' onClick={()=>turnOff({show:false,mode:'',items:''})}>
    no
    </Button>
        </div>
    </div>
    
    </div>
  )
}

export default Deletepopup