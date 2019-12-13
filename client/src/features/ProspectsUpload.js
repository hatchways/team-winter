import React, { useState, Component, Fragment } from 'react'
import {useDropzone} from 'react-dropzone';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Modal from '@material-ui/core/Modal';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Papa from 'papaparse';
import Box from '@material-ui/core/Box';
import OutlinedButton from '../features/OutlinedButton';
import CustomizedButton from '../features/CustomizedButton';
import TextField from '@material-ui/core/TextField';

import { getJWT } from '../utils';

const UPLOAD_URL = 'http://localhost:5000/prospects/upload';

const countColumns = (results) => {
  let columns = 0;
  results.data.forEach( (row) => {
    if(row.length > columns) columns = row.length;
  });
  return columns;
}

const useStyles = makeStyles(theme => ({
  textField: {
    margin: "10px 0px",
    width: 300,
  },
  paper: {
    padding: "10px",
    margin: "10px",
    textAlign: "center",
    zIndex: 90,
    border: "3px dashed lightgray",
    boxShadow: 'none'
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  modalPaper: {
    position: 'absolute',
    width: 450,
    maxWidth: "90%",
    padding: "20px",
    outline: 0,
    overflow: "auto",
    height: "500px",
  },
  importButton: {
    backgroundColor: "#EDECF2",
    width: 150,
    height: 50,
  },
  uploadButton: {
    float: "right",
    width: 100,
    height: 40,
    padding: 5,
  },
}));

class ColumnSelector extends Component {

  constructor(props) {
    super(props);
    this.state = {
      values: this.initialValues(props.columns)
    }
  }

  initialValues(columns) {
    let values = [];
    for(let i=0; i<columns; i++) {
      if(i === 0) values.push('Name');
      else values.push('None');
    }
    return values;
  }
  
  handleChange(event, column) {
    this.setState(prevState => {
      let newValues = [...prevState.values].map( (val) => {
        if(val === event.target.value) return 'None';
        return val;
      });
      newValues[column] = event.target.value;
      this.props.onChange(newValues);
      console.log(newValues)
      return {
        values: newValues
      }
    });
  }
  
  render() {
    return (
      <Fragment>
        {
          this.state.values.map( (val, idx) => {
            return (
              <TableCell>
                <Select value={this.state.values[idx]} onChange={(event) => this.handleChange(event, idx)}>
                  <MenuItem value={'Name'}>Name</MenuItem>
                  <MenuItem value={'Email'}>Email</MenuItem>
                  <MenuItem value={'None'}>None</MenuItem>
                </Select>
              </TableCell>
            );
          })
        }
      </Fragment>
    );  
  }
}

function ProspectsUpload({ getAllProspects }) {

  const classes = useStyles();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("empty");
  const [prospects, setProspects] = useState([]);
  const [NameColumn, setNameColumn] = useState(0); 
  const [emailColumn, setEmailColumn] = useState(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [ImportedFromField, handleImportedFromField] = useState('');

  const handleModalClose = () => {
    setModalOpen(false);
  }

  const formatProspects = (prospects, NameColumn, emailColumn) => {
    let data = [];
    for(let prospect of prospects) {
      data.push({
        'email': prospect[emailColumn],
        'name': prospect[NameColumn],
        'status': 'open',
        'imported_from': ImportedFromField,
      });
    }
    console.log(JSON.stringify({
      'prospects': data
    }));
    return data;
  }

  const uploadProspects = async () => {
    // console.log('prospects  :')
    const prospectsToUpload = formatProspects(prospects, NameColumn, emailColumn);
    // console.log(JSON.stringify(prospectsToUpload));
    // console.log('name column: ' + NameColumn);
    // console.log('email column: ' + emailColumn);
    // console.log(getJWT());


    try {
      const response = await fetch(UPLOAD_URL, {
        method: 'POST', 
        body: JSON.stringify({
          'prospects': prospectsToUpload  
        }), 
        headers: {
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${getJWT()}`
        }
      }); 
      if(response.ok) {
        console.log('Uploaded Prospects');
        getAllProspects();
        handleModalClose();
        handleImportedFromField('');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error:', error);
    }

  }

  const setColumns = (data) => {
    setNameColumn(data.indexOf('Name'));
    setEmailColumn(data.indexOf('Email'));
  }

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  const tableRow = (data) => {
    return (
      <TableRow key={data.join()}>
        {data.map(cell => <TableCell align="left">{cell}</TableCell> )}
      </TableRow>
    );
  }

  const prospectsTable = (columns, prospectsData) => {
    // if the first row doesn't contain an email address, remove it
    if(!prospectsData[0].join('').includes('@')) prospectsData.shift();
    const tenProspects = prospectsData.slice(0,10);
    return (
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <ColumnSelector onChange={setColumns} columns={columns} />
          </TableRow>
        </TableHead>
        <TableBody>
          {tenProspects.map(data => tableRow(data))}
        </TableBody>
      </Table>
    );
  }

  const dropAccepted = (acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      Papa.parse(file, {
        complete: function(results) {
          const columns = countColumns(results);
          setProspects(results.data);
          let content = prospectsTable(columns, results.data);
          setModalContent(content);
          setModalOpen(true);
        }
      });
    });
  }

  const dropRejected = () => {
    alert("Can't accept that.");
  }

  const {getRootProps, getInputProps} = useDropzone({
    onDropAccepted: dropAccepted,
    onDropRejected: dropRejected,
    multiple: false,
    accept: ".csv"
  });

  return (
    <div>
      <OutlinedButton
        component="p"
        className={classes.importButton}
        {...getRootProps()}
        >
          <input {...getInputProps()} />
          Imports 
      </OutlinedButton>
      <Modal 
        open={modalOpen}
        onClose={handleModalClose}
        className={classes.modal}
        > 
        <Paper className={classes.modalPaper}>
          <Box display="flex"  flexDirection="row"  justifyContent="space-between">
            <Typography
              variant="h5"
              >
              Preview
            </Typography>
            <CustomizedButton
              className={classes.uploadButton}
              onClick={uploadProspects}
              variant="extended"
              aria-label="upload"
              >
              Upload
            </CustomizedButton>
          </Box>
            <TextField
              className={classes.textField}
              margin="normal"
              variant="outlined"
              text="text"
              placeholder="Save as ..."
              value={ImportedFromField}
              onChange={e => handleImportedFromField(e.target.value)}
            />
          <div>
            {modalContent}
          </div>
        </Paper>
      </Modal>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">Prospects uploaded</span>}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit" 
            onClick={handleSnackbarClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </div>
  );
}
export default ProspectsUpload;
