import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    loadingPaper: {
    display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem', borderRadius: '1rem', height: '39vh',
  },
    paperContainer:{
        padding: '.5rem',
        borderRadius: '1rem',
        border: '1px solid #555',
        marginBottom: '1rem',
        "& h3":{
            margin:'auto',
            textAlign:'center',
            width:'fit-content',
        },
        [theme.breakpoints.down('450')]:{
            "& h3":{
                fontSize:'1.5rem',
            },
        },
    },
    userActivity: {
        maxWidth:'750px',
        paddingRight:'1rem',
        margin:'auto',
  },
  activity: {
        width:'100%',
        padding:'1.25rem',
        margin:'1rem .5rem',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backgroundBlendMode: 'darken',
        display: 'block',
        textAlign: 'center',
        borderRadius: '1rem',
        border: '1px solid #777',
        boxSizing: 'border-box',
        position: 'relative',
        [theme.breakpoints.down('450')]:{
            padding:'.75rem',
        },
  },
  deleteButton:{
      position:'absolute',
      top:'.5rem',
      right:'.5rem',
      transition:'transform .175s ease-in-out',
      "&:hover":{
        transform:'scale(1.25)',
      },
  },
  dateText: {
        fontWeight:'600',
        letterSpacing:'.025rem',
        marginLeft:'.75rem',
  },
  textPop:{
      backgroundColor:'rgba(255,255,255,.1)',
      padding:'.5rem',
      borderRadius:'.25rem',
      cursor:'pointer',
  },
  deleteAllGroup:{
      display:'flex',
      justifyContent:'space-between',
      alignItems:'center',
      marginLeft:'1rem',
      flexWrap:'nowrap',
      [theme.breakpoints.down('436')]:{
            justifyContent:'center',
            flexWrap:'wrap',
            "& button:first-child":{
                marginBottom:'1rem',
            },
        },
  }
}))