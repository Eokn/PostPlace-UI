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
  senderText: {
    cursor: 'pointer',
    fontWeight: '600',
    letterSpacing: '.025rem',
    width: 'fit-content',
    "&:hover":{
        borderBottom: '3px solid #e1bee7',
        lineHeight: '1.3',
        paddingTop: '3px',
      },
  },
  timestampText: {
    color: '#ccc',
    padding: '0.25rem 0 0 0.75rem',
  },
  nameAndStamp: {
    display: 'flex',
    alignItems: 'center',
  },
  messageContainer: {
    width: '100%',
  },
  message:{
    borderBottom: '2px solid white',
    padding: '.25rem 0',
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