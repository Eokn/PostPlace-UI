import { Typography } from '@material-ui/core';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { selectChatMessages } from '../../../features/chat/chatSlice';
import useStyles from './styles'

const ChatMessages = () => {
    const classes = useStyles()
    const dispatch = useDispatch();
    const history = useHistory();
    const chatMessages = useSelector(selectChatMessages)
    const fakeMessages = [{id:1,sender: 'What X', message:'hi my name is'},{id:2,sender: 'Guest 68', message:'what? I didnt catch that.'},{id:3,sender: 'What X', message: 'i said my name is who'}]
  return (
    <div className={classes.messageContainer}>
        {fakeMessages.map(x=> (
        <div className={x != fakeMessages[fakeMessages.length-1] ? classes.message : ''} key={x.id+1}>
            <div className={classes.nameAndStamp}>
            <Typography variant='h6' className={classes.senderText} onClick={()=> history.push(`/users/${x.id}`)}>{x.sender}</Typography>
            <Typography variant='body2' className={classes.timestampText}>Timestamp : {x.id}</Typography>
            </div>

            <Typography>message : {x.message}</Typography>
        </div>))
        }
        <div>
        <Typography variant='h6'>Here is where the section where you send a message goes...</Typography>

        </div>
    </div>
  )
}

export default ChatMessages