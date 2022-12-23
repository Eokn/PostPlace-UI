import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '.25rem',
    zIndex: '1101',
    borderBottom: '1px solid #666',
    [theme.breakpoints.down('600')]: {
      flexDirection: 'column'
    }
    
  },
  heading: {
    
    marginLeft: '.75rem',
    fontSize: '3rem',
    letterSpacing: '.05rem',
    lineHeight: '3rem',
    [theme.breakpoints.down('350')]: {
      fontSize:'2.5rem',
    },
  },
  image: {
    fontSize: '3rem',
    [theme.breakpoints.down('350')]: {
      fontSize:'2.5rem',
    },
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    maxWidth: '400px',
    [theme.breakpoints.down('600')]: {
      minHeight:'unset'
    }
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    cursor:'pointer',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
  },
  purple: {
    
    cursor:'pointer',
  },
  listItem: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  }
}));