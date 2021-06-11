import React, { useEffect } from 'react';
import {
  Typography,
  Paper,
  Link,
  Grid,
  Button,
  CssBaseline,
  RadioGroup,
  FormLabel,
  MenuItem,
  Form,
  FormGroup,
  FormControl,
  FormControlLabel, TextField, Checkbox, Radio, Select,
  Dialog,

} from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default function PatientForm(props) {
  const [value, setValue] = React.useState('MD');
  const [name, setName] = React.useState('');
  const [date, setDate] = React.useState('');
  const [diagnosis, setDiagnosis] = React.useState('');

  useEffect(()=>{
    if(props.edit){
      setOpen(true);
    }
  })

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    document.location.reload(false);
    // setOpen(false);
  };

  const submitForm = () => {
    axios.post(`http://127.0.0.1:8000/apis/users/createpatient/`, {
            data: {
              name: name,
              appointment: date,
              diagnosis: diagnosis,
              doctor_email: 'idaho12@gmail.com',
              severity: value
            }
        })
          .then(res => {
             console.log(res.data);
             window.location.reload(false);
          })

      handleClose();
      


  }


  return (
    console.log(name),
    <div className={classes.form}>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Patient
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Patient</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter details of new patient in this form.
          </DialogContentText>
          <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Patient Info
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="name"
                name="Name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                type='date'
                //defaultValue="2017-05-24"
                fullWidth
                id="date"
                label="Appointment Date"
                name="appointment_date"
                value={date}
                onChange={(e)=>setDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
                autoComplete="diagnosis"
                name="Diagnosis"
                variant="outlined"
                required
                fullWidth
                id="diagnosis"
                label="Diagnosis"
                value={diagnosis}
                onChange={(e)=>setDiagnosis(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
            <FormControl component="fieldset">
      <FormLabel component="legend">Severity</FormLabel>
      <RadioGroup aria-label="severity" name="gender1" value={value} onChange={handleChange}>
        <FormControlLabel value="MD" control={<Radio />} label="Mild" />
        <FormControlLabel value="ME" control={<Radio />} label="Moderate" />
        <FormControlLabel value="SE" control={<Radio />} label="Severe" />
      </RadioGroup>
    </FormControl>
            </Grid>
            <Grid item xs={12}>
              {/* ADD SEVERITY HERE */}
            </Grid>
          </Grid>
          <Grid container justify="flex-end">
          </Grid>
        </form>
      </div>
    </Container>


    
        </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={submitForm} color="primary">
                Done
              </Button>
            </DialogActions>
          </Dialog>
        </div>
  );
}

