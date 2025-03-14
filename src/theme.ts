import { createTheme, ThemeOptions } from '@mui/material/styles'

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#607d8b'
    },
    secondary: {
      main: '#ad1457'
    }
  }
}

const theme = createTheme(themeOptions)

export default theme
