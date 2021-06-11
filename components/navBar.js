import React, { useEffect } from "react";
import {
  IconButton,
  Toolbar,
  AppBar,
  Button,
  Tooltip,
  Box,
  makeStyles,
  Typography,
  Avatar
} from "@material-ui/core";
import { useRouter } from "next/router";
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
          main: '#ffffff',
        },
      },
    typography:{font: "normal normal bold 16px/19px Open Sans"}
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    p: 1,
  },
  upl: {
    borderRadius: "5px",
    maxWidth: "50px",
    maxHeight: "30px",
    minWidth: "50px",
    minHeight: "30px",
    color: "white",
    backgroundColor: "#00B8D4",
    marginLeft: "5px",
    "&:hover": {
      backgroundColor: "#0591a6",
    },  
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: 'white',
  },
}));

function HomeIcon(props) {
    return (
      <Avatar src='/white_logo.svg'/>
    );
  }

function signOut(){
  window.localStorage.setItem("token","expired")
  document.location.href = "/login"
}
export default function ButtonAppBar() {
  const classes = useStyles();
  const router = useRouter();


  return (
    <ThemeProvider theme={theme}>
    <box className={classes.root}>
      <AppBar sytle={{backgroundColor:'#26A69A'}} position="static">
        <Toolbar>
          <Box flexGrow="1">
          <Tooltip title="Home">
              <IconButton
                onClick={(e) => {
                  router.push("login");
                }}
              >
                <HomeIcon/>
              </IconButton>
            </Tooltip>
          </Box>
          <Box pr={1}>
            <Button onClick={signOut} color='inherit'>Signout</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </box>
    </ThemeProvider>
  );
}
