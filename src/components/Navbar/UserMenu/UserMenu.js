import { Avatar, ListItemIcon, ListItemText, Menu, MenuItem } from '@material-ui/core';
import React from 'react'
import useStyles from './styles'
import { useHistory } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
const UserMenu = ({ user, logout }) => {
    const history = useHistory()
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState(null);

    function handleClick(event) {
        // console.log(Document.getElementById('Nav'));
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    function handleSelect(f) {
        f();
        setAnchorEl(null);
    }

//     const StyledMenu = withStyles({
//   paper: {
//     border: '1px solid #d3d4d5',
//   },
// })((props) => (
//   <Menu
//     elevation={0}
//     getContentAnchorEl={null}
    
//     {...props}
//   />
// ));

// const StyledMenuItem = withStyles((theme) => ({
//   root: {
//     '&:focus': {
//       backgroundColor: theme.palette.primary.main,
//       '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
//         color: theme.palette.common.white,
//       },
//     },
//   },
// }))(MenuItem);


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
            horizontal: 'left',
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