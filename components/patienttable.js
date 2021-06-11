import React ,{ useState , useEffect }from 'react';
import MaterialTable from "material-table";
import { forwardRef } from 'react';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import axios from 'axios';
import PatientForm from './addPatient';

const tableIcons = {
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

export default function Pattable(props) {

    const [sev, setSev] = useState(props.severity);
    const [edit,setEdit] = useState(false)
    const [patient, setPatient] = useState([]);


    useEffect(() => {
        const s = props.severity
        axios.get(`http://127.0.0.1:8000/apis/users/patients/`, {
            params: {
              docemail: "idaho12@gmail.com",
              severity: s
            }
        })
          .then(res => {
            // console.log(res.data)
            setPatient(res.data)
          })
          
      }, [])

      const handleDelete = (rowData) => {
        axios.delete(`http://127.0.0.1:8000/apis/users/patient/delete/`, {
            data: rowData
        })
          .then(res => {
            console.log(res.data)
            window.location.reload(false);
          })
          
      }

      const handleEdit = (rowData) => {
        let editButton=document.querySelector('.makeStyles-form-11 button');
        
        editButton.click();
        axios.delete(`http://127.0.0.1:8000/apis/users/patient/delete/`, {
            data: rowData
        })
          .then(res => {
            console.log(res.data)
          })
               
      }

    return (
        console.log(patient),
      <div style={{ maxWidth: "100%" }}>
        <MaterialTable
            icons={tableIcons}
          columns={[
            { title: "Patient Name", field: "name" },
            { title: "Diagnosis", field: "diagnosis" },
            { title: "Appointment Date", field: "appointment_date", type: "numeric" },
          ]}
          data={patient}
          actions={[
            {
              icon: Edit,
              tooltip: 'Edit User',
              onClick: (event, rowData) => handleEdit(rowData)
            },
            {
              icon: DeleteOutline,
              tooltip: 'Delete User',
              onClick: (event, rowData) => handleDelete(rowData)
            }
          ]}
          title="Patients"
        />
      </div>
    );

}

