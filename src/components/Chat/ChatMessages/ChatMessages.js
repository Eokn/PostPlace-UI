import { Typography } from '@material-ui/core';
import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { selectChatMessages } from '../../../features/chat/chatSlice';
import useStyles from './styles'

const ChatMessages = () => {
    const classes = useStyles()
    const dispatch = useDispatch();
    const scrollRef = useRef(null);
    const history = useHistory();
    const chatMessages = useSelector(selectChatMessages)
    React.useEffect(()=> {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    },[])
    const fakeMessages = [{id:1,sender: 'What X', message:'hi my name is'},{id:2,sender: 'Guest 68', message:'what? I didnt catch that.'},{id:3,sender: 'What X', message: 'i said my name is who'},{id:4,sender: 'What X', message:'talking again for no reason lol anyone on?'},{id:5,sender: 'What Y', message:'hi what x did you see that one post'},{id:6,sender: 'What X', message:'yeah i did that was crazy'},{id:7,sender: 'What Y', message:'ikr lol'},]
  return (
    <div>
        <div className={classes.messageContainer} ref={scrollRef} >
        {fakeMessages.map(x=> (
            <div className={x != fakeMessages[fakeMessages.length-1] ? classes.message : ''} key={x.id+1}>
            <div className={classes.nameAndStamp}>
            <Typography variant='h6' className={classes.senderText} onClick={()=> history.push(`/users/${x.id}`)}>{x.sender}</Typography>
            <Typography variant='body2' className={classes.timestampText}>Timestamp : {x.id}</Typography>
            </div>

            <Typography>message : {x.message}</Typography>
        </div>))
        }
        </div>
        <div>
        <Typography variant='h6'>Here is where the section where you send a message goes...</Typography>

        </div>
    </div>
  )
}

export default ChatMessages