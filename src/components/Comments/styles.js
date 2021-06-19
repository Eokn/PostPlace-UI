import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

  export default makeStyles((theme) => ({
      
      flexForMessage:{
            display:'flex',
            marginBottom:'1.25rem',
        },
        flexForForm:{
            display:'flex',
            width:'100%',
            [theme.breakpoints.down('500')]:{
                flexDirection:'column',
                width:'calc(100% - 4.25rem)',
            },
        },
        accountIcon: {
          fontSize: '3rem',
          
        },
        avatar: {
          color: theme.palette.getContrastText(deepPurple[500]),
          backgroundColor: deepPurple[500],
          width:'3rem',
          height:'3rem',
        },
        marginLeft: {
            marginLeft: '1rem',
        },
        userStats: {
          display:'flex',
          flexDirection:'column',
          marginLeft:'1rem',
          width:'100%',
        },
        flexForNameDate:{
            display:'flex',
            alignItems:'center',
        },
        date:{
          color: '#bbb',
          fontSize:'.625rem',
          marginLeft:'.5rem',
        },
        name:{
            fontWeight:'600',
            letterSpacing:'.025rem',
        },
        submit:{
            margin:'auto 0 0 .375rem',
            width: 'fit-content',
            [theme.breakpoints.down('500')]:{
                margin:'.5rem 0 .25rem auto'
            },
        },
        flexForLikeAndDelete:{
            display:'flex',
            color: theme.palette.secondary.main,
            alignItems:'center',
            justifyContent:'space-between',
        },
        marginTopAdjust:{
            marginTop:'.375rem',
        },
        greyOut:{
            color: 'rgb(255,255,255,.3)'
        }

}));      
