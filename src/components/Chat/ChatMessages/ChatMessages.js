import { Avatar, Button, TextField, Typography } from '@material-ui/core'
import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { selectProfile, selectProfileExists } from '../../../features/auth/authSlice';
import { addChatMessage, toggleChat, selectChatMessages, setChatMessages } from '../../../features/chat/chatSlice';
import useStyles from './styles'
import { AccountCircle } from '@material-ui/icons'

const ChatMessages = () => {
    const classes = useStyles()
    const dispatch = useDispatch();
    const scrollRef = useRef(null);
    const history = useHistory();
    const user = useSelector(selectProfile)
    const signedIn = useSelector(selectProfileExists)
    const chatMessages = useSelector(selectChatMessages)
    const [submitVis, setSubmitVis] = React.useState(false)
    const [message, setMessage] = React.useState('')
    const fakeMessages = [{id:1,sender: 'What X', message:'hi my name is'},{id:2,sender: 'Guest 68', message:'what? I didnt catch that.'},{id:3,sender: 'What X', message: 'i said my name is who'},{id:4,sender: 'What X', message:'talking again for no reason lol anyone on?'},{id:5,sender: 'What Y', message:'hi what x did you see that one post'},{id:6,sender: 'What X', message:'yeah i did that was crazy'},{id:7,sender: 'What Y', message:'ikr lol'},]
    React.useEffect(()=> {
        dispatch(setChatMessages(fakeMessages))
    },[])
    React.useEffect(()=> {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [chatMessages])

    const toggleSubmitVis = () => {
        if(message.length === 0 && !signedIn){setSubmitVis(false)}
        else{setSubmitVis(true)}
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(addChatMessage({ id:chatMessages.length, message, sender:user.result.name }))
        setMessage('')
        setSubmitVis(false)
    }
    const handleChange = (e) => {
        setMessage(e.target.value)
    }



  return (
    <div>
        <div className={classes.messageContainer} ref={scrollRef} >
        {chatMessages.map(x=> (
            <div className={x != chatMessages[chatMessages.length-1] ? classes.message : ''} key={x.id+1}>
            <div className={classes.nameAndStamp}>
            <Typography variant='h6' className={classes.senderText} onClick={()=> history.push(`/users/${x.id}`)}>{x.sender}</Typography>
            <Typography variant='body2' className={classes.timestampText}>Timestamp : {x.id}</Typography>
            </div>

            <Typography>message : {x.message}</Typography>
        </div>))
        }
        </div>
        <div className={classes.flexForMessage}>
                  { !signedIn ? (<AccountCircle color='secondary' className={classes.accountIcon} />) : (<Avatar className={classes.avatar} alt={user.result.name} src={user.result.imageURL} >{user.result.name.charAt(0)}</Avatar>) }
                <form className={classes.flexForForm} autoComplete='off' noValidate onSubmit={handleSubmit}>
                    <TextField className={classes.marginLeft} fullWidth multiline value={message} onChange={handleChange} onBlur={toggleSubmitVis} 
                    onFocus={()=>{if(!signedIn){
                        history.push('/auth')
                        dispatch(toggleChat());
                        }else {
                            toggleSubmitVis()
                            }}} 
                    label="Enter a message..." variant="filled" size='small' color='secondary' />
                    {submitVis && (<Button color='secondary' type='submit' disabled={message.trim().length === 0} variant='contained' className={classes.submit} >submit</Button>)}
                  </form>
              </div>
    </div>
  )
}

export default ChatMessages