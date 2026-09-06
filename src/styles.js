import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  //marginTop to account for fixed navbar.
  appContainer: {
    padding:'0 1rem',
    marginTop: '6rem',
    [theme.breakpoints.down('800')]: {
      padding:'0 .75rem',
    },
    [theme.breakpoints.down('600')]: {
      padding:'0 .5rem',
      marginTop: '7.5rem',
    },
  },
  

  
}));