import { createTheme, adaptV4Theme } from '@mui/material/styles';

const theme = createTheme(adaptV4Theme({
  palette: {
    mode:'dark'
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
      MuiMenu: {
        paper: {
          border: '1px solid #e1bee7',
        },
      },
    },
}))

export default theme

/* Some colors for a dark theme: #222, #282828, #333 #ccc (backgrounds and ccc is border) #fff, #bbb (text, subtext) */
/* My two primary colors: 
    primary: {
      main: '#283593',
    },
    secondary: {
      main: '#e1bee7',
    },
     */