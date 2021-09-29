import {createMuiTheme} from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    type:'dark'
    ,
    primary: {
      main: '#283593',
    },
    secondary: {
      main: '#e1bee7',
    },
  },
  overrides: {
      MuiAvatar: {
          colorDefault: {
              color: '#fff',
              backgroundColor: '#673ab7',
          },
      },
    },
})

export default theme

/* Some colors for a dark theme darkest to lightest: #222, #282828, #333 #ccc (backgrounds and ccc is border) #fff, #bbb (text, subtext) */
/* My two primary colors: 
    primary: {
      main: '#283593',
    },
    secondary: {
      main: '#e1bee7',
    },
     */