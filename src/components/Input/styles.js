import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    iconToggle: {
    [theme.breakpoints.down('300')]: {
        display: 'none',
    },
    },
}));