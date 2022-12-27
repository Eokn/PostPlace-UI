import { Paper, Popover, Typography } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectShowChat } from '../../features/chat/chatSlice';
import useStyles from './styles'
import ClearIcon from '@material-ui/icons/Clear'
import { toggleChat } from '../../features/chat/chatSlice'
const Chat = ( { appRef } ) => {
    const classes = useStyles()
    const dispatch = useDispatch();

    return (
            <Paper className={classes.chatContainer}>
                <div className={classes.topSection}>
                    <Typography align='center' variant='h5'>Live Chat</Typography>
                    <ClearIcon color='secondary'  cursor='pointer' className={classes.deleteButton} onClick={()=>dispatch(toggleChat())} />
                    </div>
                Chat area goes here
                </Paper>
    )
    
}

export default Chat