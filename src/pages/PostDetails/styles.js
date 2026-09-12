import { makeStyles } from 'tss-react/mui';


export default makeStyles()((theme) => ({
    paperContainer:{
        padding: '.5rem',
        borderRadius: '.25rem',
        border: '1px solid #555',
        marginBottom: '1rem',
    },
  media: {
    borderRadius: '.25rem',
    objectFit: 'cover',
    maxHeight: '600px',
    margin: 'auto',
    width: '100%',
    [theme.breakpoints.down('lg')]: {
        maxWidth: '500px',
    },
  },
  card: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('lg')]: {
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
    [theme.breakpoints.down('lg')]: {
        margin: '0 auto',
        width: 'fit-content',
    },
  },
  imageSection: {
    margin: 'auto .5rem',
    flex: 1,
    [theme.breakpoints.down('lg')]: {
      margin: '0 auto',
    },
  },
  userLink: {
    cursor:'pointer',
    fontWeight:'600',
    letterSpacing:'.025rem',
    "&:hover":{
      borderBottom:'3px solid #e1bee7'
    }
  },
  recommendedPosts: {
    display: 'flex',
    width:'100%',
    alignItems:'flex-start',
    justifyContent:'space-between',
    flexWrap: 'wrap',
    [theme.breakpoints.down('lg')]: {
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
    borderRadius: '.25rem',
    border: '1px solid #777',
    maxWidth: '240px',
    "& h6": {
      margin: '.5rem',

    },
    [theme.breakpoints.down('lg')]: {
        margin: '.25rem 0',
        maxWidth: '450px',
    },
  },
  loadingPaper: {
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: '1rem', 
    borderRadius: '1rem', 
    height: '39vh',
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
    borderBottomLeftRadius: '.25rem',
    borderBottomRightRadius: '.25rem',
    position: 'relative',
    bottom: '-3px',
    maxHeight:'134px',
    [theme.breakpoints.down('lg')]:{
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