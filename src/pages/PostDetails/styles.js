import { makeStyles } from '@material-ui/core/styles';


export default makeStyles((theme) => ({
    paperContainer:{
        padding: '.5rem',
        borderRadius: '1rem',
        border: '1px solid #555',
        marginBottom: '1rem',
    },
  media: {
    borderRadius: '1rem',
    objectFit: 'cover',
    maxHeight: '600px',
    margin: 'auto',
    width: '100%',
    [theme.breakpoints.down('xs')]: {
        maxWidth: '500px',
    },
  },
  card: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
  },
  section: {
    flex: 1,
    overflowWrap: 'anywhere',
    display:'flex',
    flexDirection:'column',
  },
  smallSection:{
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
        margin: '0 auto',
        width: 'fit-content',
    },
  },
  imageSection: {
    margin: 'auto .5rem',
    flex: 1,
    [theme.breakpoints.down('xs')]: {
      margin: '0 auto',
    },
  },
  recommendedPosts: {
    display: 'flex',
    width:'100%',
    alignItems:'flex-start',
    justifyContent:'space-between',
    flexWrap: 'wrap',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  post: {
    cursor: 'pointer',
    margin: '.25rem',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
    display: 'block',
    textAlign: 'initial',
    borderRadius: '1rem',
    border: '1px solid #777',
    maxWidth: '240px',
    "& h6": {
      margin: '.5rem',

    },
    [theme.breakpoints.down('xs')]: {
        margin: '.25rem 0',
        maxWidth: '450px',
    },
  },
  loadingPaper: {
    display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem', borderRadius: '1rem', height: '39vh',
  },
  nameAndDate:{
    display:'flex',
    margin:'.5rem 1rem',
    alignItems:'center',
  },
          date:{
          color: '#ddd',
          fontSize:'.625rem',
          marginLeft:'.5rem',
          marginTop:'.1rem',
        },
        name:{
            fontWeight:'600',
            letterSpacing:'.025rem',
        },
  cardPic:{
    borderRadius:'0px',
    borderBottomLeftRadius: '1rem',
    borderBottomRightRadius: '1rem',
    position: 'relative',
    bottom: '-3px',
    maxHeight:'134px',
    [theme.breakpoints.down('xs')]:{
      maxHeight:'254px',
    },
    [theme.breakpoints.down('325')]:{
      maxHeight:'150px',
    },
  },
  button:{
    alignSelf:'flex-start'
  }
  
}));