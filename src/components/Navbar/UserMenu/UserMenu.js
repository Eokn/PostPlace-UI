import { Avatar, ListItemIcon, ListItemText, Menu, MenuItem } from '@material-ui/core';
import React from 'react'
import useStyles from './styles'
import { useHistory } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import ChatIcon from '@material-ui/icons/Chat';
const UserMenu = ({ user, logout, navRef }) => {
    const history = useHistory()
    const classes = useStyles()
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



  return (
    <div>
        <Avatar className={classes.purple} alt={user.name} src={user.imageURL || ''} onClick={(e) => handleClick(e)} >{user.name.charAt(0)}</Avatar>
        <Menu
        id="user-menu"
        anchorEl={anchorEl}
        keepMounted
        getContentAnchorEl={null}
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
        <MenuItem onClick={() => handleSelect(()=>history.push('/'))} className={classes.listItem}>
          <ListItemIcon>
            <HomeIcon fontSize="small" color='secondary' />
          </ListItemIcon>
          <ListItemText primary="Home" primaryTypographyProps={{ color:'secondary' }}/>
        </MenuItem>
        <MenuItem onClick={() => handleSelect(()=>history.push(`/users/${user.googleId || user._id}`))} className={classes.listItem}>
          <ListItemIcon>
            <AccountBoxIcon fontSize="small" color='secondary'/>
          </ListItemIcon>
          <ListItemText primary="Profile" primaryTypographyProps={{ color:'secondary' }}/>
        </MenuItem>
        <MenuItem onClick={() => handleSelect(()=>history.push(`/users/${user.googleId || user._id}`))} className={classes.listItem}>
          <ListItemIcon>
            <ChatIcon fontSize="small" color='secondary'/>
          </ListItemIcon>
          <ListItemText primary="Chat" primaryTypographyProps={{ color:'secondary' }}/>
        </MenuItem>
        <MenuItem onClick={() => handleSelect(()=>logout())} className={classes.listItem}>
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" color='secondary'/>
          </ListItemIcon>
          <ListItemText primary="Sign out" primaryTypographyProps={{ color:'secondary' }}/>
        </MenuItem>
      </Menu>
    </div>
  )
}

export default UserMenu