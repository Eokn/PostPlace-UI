import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: 'center',
  },
  loadingPaper: {
    margin: 'auto',
    width: 'fit-content',
    padding: '1.5rem',
    borderRadius: '1rem',
  },
}));