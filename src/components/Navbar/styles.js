import { makeStyles } from 'tss-react/mui';
import { deepPurple } from '@mui/material/colors';

export default makeStyles()((theme) => ({
  appBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '.25rem',
    zIndex: '1101',
    borderBottom: '1px solid #666',
    // [theme.breakpoints.down('600')]: {
    //   flexDirection: 'column'
    // }
    
  },
  heading: {
    
    marginLeft: '.75rem',
    fontSize: '2rem',
    letterSpacing: '.05rem',
    lineHeight: '2rem',
    [theme.breakpoints.down('350')]: {
      fontSize:'1.5rem',
    },
  },
  image: {
    fontSize: '2rem',
    [theme.breakpoints.down('350')]: {
      fontSize:'1.5rem',
    },
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    maxWidth: '400px',
    minHeight:'0.75rem',
    padding:'0 .25rem',
    [theme.breakpoints.down('600')]: {
      minHeight:'unset',
    }
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  notLoggedIn: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    '& .MuiIconButton-root': {
      marginRight: '1.5rem',
    padding:'6px',
    },
    [theme.breakpoints.down('350')]: {
      '& .MuiButtonBase-root': {
      fontSize: '.75rem',
    },
    }
    
  },
  chatOpener: {
    
  
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
}));