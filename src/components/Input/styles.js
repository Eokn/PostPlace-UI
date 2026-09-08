import { makeStyles } from 'tss-react/mui';

export default makeStyles()((theme) => ({
    iconToggle: {
    [theme.breakpoints.down('300')]: {
        display: 'none',
    },
    },
}));