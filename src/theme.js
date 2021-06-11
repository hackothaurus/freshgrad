import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
          // Purple and green play nicely together.
          main: '#26A69A',
        },
        secondary: {
          // This is green.A700 as hex.
          main: '#11cb5f',
        },
      },
    //typography:{font: "normal normal bold 16px/19px Open Sans"}
});

export default theme;