import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  
  appContainer: {
    padding:'0',
    display:'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight:'calc(100vh - 8rem)',
  },
  appBarSearch: {
    borderRadius: 4,
    marginBottom: '1rem',
    flexDirection:'row',
    padding: '.5rem',
    width: 'fit-content',
    margin: '0 auto',
    flexWrap:'wrap',
    [theme.breakpoints.down('650')]:{
      flexDirection:'column',
      width: 'unset',
      margin: 'unset',
      flexWrap:'unset',
    }
  },
  appBarSearchSigned: {
    borderRadius: 4,
    marginBottom: '1rem',
    padding: '.5rem',
  },
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '.75rem .25rem',
    bottom: '0',
  },
  paginationSmall: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '.75rem .25rem',
    display: 'block',
    [theme.breakpoints.down('xs')]:{
      display: 'none',
    },
  },
  marginAdjust: {
    margin: '3rem 0 1rem 0',
    
  },
  
  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
  notSignedIn:{
    flexDirection:'column',
  },
  chipInput: {
    margin: '10px 0'
  },
  hidden: {
    display: 'none'
  },
  titleCorrect: {
    justifyContent:'center',
    margin:'0 .5rem',
    [theme.breakpoints.down('650')]:{
      margin: 'unset',
    }
  },
  searchButton: {
    height: 'fit-content',
    alignSelf: 'center',
    margin: '0 .5rem',
    padding: '.75rem 1rem',
    [theme.breakpoints.down('650')]:{
      margin: 'unset',
      width: '100%',
      padding:'6px 16px',
    }
  },
  formPos: {
    top:'10px',
    [theme.breakpoints.down('650')]:{
      top:'0px',
    }
  }
}));