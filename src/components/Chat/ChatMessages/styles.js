import { makeStyles } from 'tss-react/mui';
import { deepPurple } from '@mui/material/colors';

export default makeStyles()((theme) => ({
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
  flexForMessage:{
            display:'flex',
            margin: '.75rem 0',
            width:'100%',
        },
        flexForForm:{
            display:'flex',
            // width:'100%',
            flexDirection:'column',
            width:'calc(100% - 2.75rem)',
            [theme.breakpoints.down('500')]:{
                flexDirection:'column',
                width:'calc(100% - 2.75rem)',
            },
        },
    accountIcon: {
          fontSize: '2rem',
          
        },
        avatar: {
          color: theme.palette.getContrastText(deepPurple[500]),
          backgroundColor: deepPurple[500],
          width:'2rem',
          height:'2rem',
          cursor:'pointer',
        },
        marginLeft: {
            marginLeft: '.25rem',
            backgroundColor:'#1d1d1d',
            borderRadius:'.2rem',
            minWidth:'150px',
        },
        submit:{
            // margin:'auto 0 0 .375rem',
            width: 'fit-content',
            margin:'.5rem auto .25rem auto',
            // [theme.breakpoints.down('500')]:{
            //     margin:'.5rem 0 .25rem .25rem', // Temp change to column
            // },
        },
  senderText: {
    cursor: 'pointer',
    fontWeight: '600',
    // letterSpacing: '.025rem',
    fontSize:'1.25rem',
    width: 'fit-content',
    "&:hover":{
        borderBottom: '3px solid #e1bee7',
        lineHeight: '1.3',
        paddingTop: '3px',
      },
  },
  timestampText: {
    color: '#ccc',
    marginLeft: 'auto',
    marginRight:'.25rem',
    padding: '0.25rem 0 0 0.75rem',
  },
  nameAndStamp: {
    display: 'flex',
    alignItems: 'center',
  },
  messageContainer: {
    width: '100%',
    borderBottom: '3px solid grey',
    overflow: 'auto',
    maxHeight: 300,
    '&::-webkit-scrollbar': {
        width: '0.25em',
    },
    '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.secondary.main,
    },
  },
  message:{
    borderBottom: '2px solid grey',
    padding: '.1rem 0',
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
  },
  chatMessageContainer: {
    width: '100%',
  },
}));