import { Avatar, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import React from 'react'
import useStyles from './styles'
import { useNavigate } from 'react-router';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HomeIcon from '@mui/icons-material/Home'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import ChatIcon from '@mui/icons-material/Chat';
import { toggleChat } from '../../../features/chat/chatSlice'
import { useDispatch, useSelector } from 'react-redux'
const UserMenu = ({ user, logout, navRef }) => {
    const navigate = useNavigate()
    const { classes } = useStyles()
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);

    function handleClick(event) {
        setAnchorEl(navRef);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    function handleSelect(f) {
        f();
        setAnchorEl(null);
    }
    //onclick for chat should open a chat window in the bottom right of the screen. Perhaps a third 'chat' slice which contains list of chat messages and overall state?
    //onclick flips a boolean to show or hide it?


  return (
    <div>
        <Avatar className={classes.purple} alt={user.name} src={user.imageURL || ''} 
        onClick={(e) => handleClick(e)} >{user.name.charAt(0)}</Avatar>
        <Menu
        id="user-menu"
        anchorEl={anchorEl}
        keepMounted
        disableAutoFocusItem
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleSelect(()=>navigate('/'))} className={classes.listItem}>
          <ListItemIcon>
            <HomeIcon fontSize="small" color='secondary' />
          </ListItemIcon>
          <ListItemText primary="Home" slotProps={{ primary: { color: 'secondary' } }} />
        </MenuItem>
        <MenuItem onClick={() => handleSelect(()=>navigate(`/users/${user.googleId || user._id}`))} className={classes.listItem}>
          <ListItemIcon>
            <AccountBoxIcon fontSize="small" color='secondary'/>
          </ListItemIcon>
          <ListItemText primary="Profile" slotProps={{ primary: { color: 'secondary' } }} />
        </MenuItem>
        <MenuItem onClick={() => handleSelect(()=>{dispatch(toggleChat())})} className={classes.listItem}>
          <ListItemIcon>
            <ChatIcon fontSize="small" color='secondary'/>
          </ListItemIcon>
          <ListItemText primary="Chat" slotProps={{ primary: { color: 'secondary' } }} />
        </MenuItem>
        <MenuItem onClick={() => handleSelect(()=>logout())} className={classes.listItem}>
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" color='secondary'/>
          </ListItemIcon>
          <ListItemText primary="Sign out" slotProps={{ primary: { color: 'secondary' }}} />
        </MenuItem>
      </Menu>
    </div>
  )
}

export default UserMenu