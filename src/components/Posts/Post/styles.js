import { makeStyles } from 'tss-react/mui';

export default makeStyles()((theme) => ({
  media: {
    height: 0,
    paddingTop: '56.25%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '100%',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '.25rem',
    height: '100%',
    position: 'relative',
    border: '1px solid #555',
  },
  overlay: {
    position: 'absolute',
    top: '.8rem',
    left: '.8rem',
  },
  overlay2: {
    position: 'absolute',
    top: '0',
    right: '0',
    color: 'white',
    backgroundColor:'#111111',
    '&:hover':{
      backgroundColor:'#283593'
    }
  },
  grid: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '.8rem',
    color: '#ccc'
  },
  title: {
    padding: '0 1.2rem',
  },
  message: {
    padding: '0 .8rem',
    '&:last-child': {
      paddingBottom: '0px',
    },
  },
  cardActions: {
    padding: '.4rem 1.2rem',
    display: 'flex',
    justifyContent: 'space-between',
    
  },
  cardIndividualActions: {
    '&:hover':{
      backgroundColor: theme.palette.primary.main,
    },
  },
  cardAction: {
    display: 'block',
    textAlign: 'initial',
  },
}));