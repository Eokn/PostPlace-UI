import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  filmBox: {
    zIndex:'1111',
    position:'fixed',
    width:'100%',
    height:'100vh',
    top:'0',
    left:'0',
    backgroundColor:'rgba(0, 0, 0, 0.4)',
    color:'black',
  },
  deleteContainer: {
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    width: '80vw',
    maxWidth:'600px',
    border: '2px solid white',
    borderRadius: '0.25rem',
    margin: 'auto',
    padding: '1rem 1rem 0 1rem',
    marginTop: '30vh',
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
}));