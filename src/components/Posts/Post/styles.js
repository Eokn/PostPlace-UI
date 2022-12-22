import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
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
    borderRadius: '1rem',
    height: '100%',
    position: 'relative',
    border: '1px solid #555'
  },
  overlay: {
    position: 'absolute',
    top: '.8rem',
    left: '.8rem',
  },
  overlay2: {
    position: 'absolute',
    top: '.8rem',
    right: '0',
    color: 'white',
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
  },
  cardActions: {
    padding: '.4rem 1.2rem',
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardAction: {
    display: 'block',
    textAlign: 'initial',
  },
});