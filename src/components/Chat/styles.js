import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  chatContainer: {
    position:'fixed',
    bottom:'0',
    right:'0',
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    width: '40vw',
    maxWidth:'400px',
    border: '2px solid white',
    borderRadius: '0.25rem',
    margin: 'auto',
    padding: '.25rem',
    backgroundColor: theme.palette.secondary.main,
  },
  warningText: {
      margin:'1rem auto',
      fontSize:'2rem',
    
  },
  warningDescription: {
    margin:'auto',
    textAlign:'center',
  },
  buttonGroup: {
    margin: '2rem',
    [theme.breakpoints.down('350')]: {
      margin:'1rem',
    },
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
  googleButton: {
    marginTop: theme.spacing(2),
  },
  iconBackground: {
      backgroundColor: 'white',
  },
  deleteButton:{
      position:'absolute',
        color:'black',
      top:'.5rem',
      right:'.5rem',
      transition:'transform .175s ease-in-out',
      "&:hover":{
        transform:'scale(1.25)',

      },
  },
  topSection:{
    paddingBottom: '.25rem',
    borderBottom: '3px solid white',
    width: '100%',
  }
}));