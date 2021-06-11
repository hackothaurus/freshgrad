import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { useRouter } from 'next/router';
import axios from 'axios'


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
    typography:{font: "normal normal bold 16px/19px Open Sans"}
});

const useStyles = makeStyles((theme) => ({
    
  paper: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  card:{
    marginTop: theme.spacing(8),
    padding: theme.spacing(5)
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: 'white',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  
}));

export default function Login() {
  const router = useRouter()
  const classes = useStyles();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const submitForm = () => {
    axios.post(`http://127.0.0.1:8000/apis/users/`, {
            data: {
              username: name,
              email: email,
              password: password,
            }
        })
          .then(res => {
             console.log(res.data)
            document.location.href = "http://localhost:3000/login"

          })

  }

  return (
    <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
        <Card className={classes.card}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Image src='/logo.png' width="50px" height="50px"/>
        </Avatar>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="cpassword"
            label="Confirm Password"
            type="password"
            id="cpassword"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submitForm}
          
          >
            Create account
          </Button>
          <Grid container>
            <Grid item>
              <Link href="login" variant="body2">
                {"Go to Login"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      </Card>
    </Container>
    </ThemeProvider>
  );
}