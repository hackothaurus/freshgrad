import React ,{ useEffect }from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import WAppbar from "../components/navBar"
import Pattable from "../components/patienttable"
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import PatientForm from '../components/addPatient'


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
    head:{
        margin: '30px',
    },
    button:{
        margin: "30px",
        width: "100px",
        justifyContent:"flex-start",
    }
  }));
  

export default function PatientList(){
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [dat, setDat] = React.useState(null);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    return(
        <> 
        <WAppbar/>

        <div className={classes.root}>
            <Box className={classes.head}>
                <Typography variant="h3" className={classes.head}> Hello, Doctor</Typography>
                <Typography className={classes.head}> Here's a list of your patients...</Typography>
                <PatientForm/>
            </Box>

      <AppBar position="static" color='white'>
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Mild" {...a11yProps(0)} />
          <Tab label="Moderate" {...a11yProps(1)} />
          <Tab label="Severe" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
      <Pattable severity="MD"/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Pattable severity="ME"/>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <Pattable severity="SE"/>
      </TabPanel>
    </div>
</>
    )
}