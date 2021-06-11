import Image from 'next/image'
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
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { useRouter } from 'next/router'
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
  const classes = useStyles();
  const router = useRouter()
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [token, setToken]=React.useState('');

  const submitForm = () => {
    axios.post('http://localhost:8000/token/', {
        "username":name,
        "password":password
    }
)
          .then(res => {
                window.localStorage.setItem("token",res.data.access)
                document.location.href = "http://localhost:3000/patientList"

          }).catch(err=>{
              alert("Login Failed. Incorrect Credentials.")
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
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
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
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            onClick={submitForm}
            fullWidth
            variant="contained"
            color="primary"
            //onClick={() =>  router.push('/patientList')}
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="signup" variant="body2">
                {"Sign Up to Create an Account"}
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