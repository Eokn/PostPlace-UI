import React from 'react'
import useStyles from './styles'
import { TextField, Button, Typography, Paper } from '@material-ui/core'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'
import { saveNewPost, selectCurrentPost, updateOldPost, editPost } from '../../features/posts/postsSlice.js'
import { selectProfile, selectProfileExists } from '../../features/auth/authSlice'
import ChipInput from 'material-ui-chip-input'

const Form = () => {
    const currentPost = useSelector(selectCurrentPost)
    const profileExists = useSelector(selectProfileExists)
    const profile = useSelector(selectProfile)
    const classes = useStyles()
    const dispatch = useDispatch()
    const [postData, setPostData] = React.useState({
        title:'',
        message:'',
        tags:[],
        selectedFile:'',
    })
    const handleSubmit = (e) => {
        e.preventDefault()
        if(currentPost){
            dispatch(updateOldPost({id: currentPost._id, postData, name:profile?.result?.name, editor: profile?.result?.googleId || profile?.result?._id}))
        }

        else{ //IF the google-loaded profile has a result.name, the new created posts will have a proper structure.
            dispatch(saveNewPost({postData, name:profile?.result?.name, editor: profile?.result?.googleId || profile?.result?._id}))
        }
        clear()
    }
    const clear = ()=>{
        dispatch(editPost(''))
        setPostData({
        title:'',
        message:'',
        tags:[],
        selectedFile:'',
    })}
    React.useEffect(()=>{
        if(currentPost){setPostData(currentPost)}
    },[currentPost])

    //Functions for adding/deleting tags from the chip input, getting rid of spaces/hashtags before placement.
    const handleAddChip = (tag) => {
    setPostData({ ...postData, tags: [...postData.tags, tag.replace(/[# ]/g, '')] });
  };
  const handleDeleteChip = (chipToDelete) => {
    setPostData({ ...postData, tags: postData.tags.filter((tag) => tag !== chipToDelete) });
  };


    if(!profileExists) {
        return (
            <Paper className={classes.paper} elevation={6} >
                <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant='h6' line='center'>Sign in to interact with and make posts.</Typography>
                <TextField name='title' variant='outlined' disabled label='Title' fullWidth value={postData.title} onChange={(e)=>setPostData({...postData, title: e.target.value})}/>
                <TextField name='message' variant='outlined' disabled label='Message' multiline rows={4} fullWidth value={postData.message} onChange={(e)=>setPostData({...postData, message: e.target.value})}/>
                <ChipInput className={classes.addMargin} name="tags" variant="outlined" label="Tags" disabled fullWidth value={postData.tags} onAdd={(chip) => handleAddChip(chip)} onDelete={(chip) => handleDeleteChip(chip)} />
                
                <Button className={classes.buttonSubmit} variant='contained' color='primary' disabled size='large' type='submit' fullWidth >Submit</Button>
                <Button variant='contained' color='secondary' size='small' onClick={clear} disabled fullWidth >Clear</Button>
                </form>
            </Paper>
        )
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant='h6'>{`${currentPost ? 'Editing ' : 'Create '} a post`}</Typography>
                <TextField required color='secondary' name='title' variant='outlined' label='Title' fullWidth value={postData.title} onChange={(e)=>setPostData({...postData, title: e.target.value})}/>
                <TextField required color='secondary' name='message' variant='outlined' label='Message' multiline rows={4} fullWidth value={postData.message} onChange={(e)=>setPostData({...postData, message: e.target.value})}/>
                <ChipInput color='secondary' className={classes.addMargin} name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onAdd={(chip) => handleAddChip(chip)} onDelete={(chip) => handleDeleteChip(chip)} />
                <div className={classes.fileInput}>
                    <FileBase type='file' multiple={false} onDone={(base64)=>setPostData({...postData, selectedFile:base64})} />
                </div>
                <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' disabled={postData.title.length === 0 || postData.message.length === 0 } fullWidth >Submit</Button>
                <Button  variant='contained' color='secondary' size='small' onClick={clear} fullWidth >Clear</Button>
            </form>
        </Paper>
    )
}

export default Form
