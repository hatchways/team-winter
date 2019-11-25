import React, { useState, useEffect, Component, Fragment } from 'react'
import {useDropzone} from 'react-dropzone';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Modal from '@material-ui/core/Modal';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Papa from 'papaparse';
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
    width: 400,
    maxWidth: "90%",
    padding: "20px",
    outline: 0
  },
  fab: {
    float: "right"
  },
  previewHeader: {
    float: 'left'
  }
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
      else if(i === 1) values.push('Email');
      else values.push('None');
    }
    return values;
  }
  
  handleChange(event, column) {
    this.setState(prevState => {
      let newValues = [...prevState.values];
      newValues[column] = event.target.value;
      this.props.onChange(newValues);
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

function ProspectsUpload(props) {

  const classes = useStyles();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("empty");
  const [prospects, setProspects] = useState([]);
  const [nameColumn, setNameColumn] = useState(0);
  const [emailColumn, setEmailColumn] = useState(1);

  const handleModalClose = () => {
    setModalOpen(false);
  }

  const uploadProspects = async () => {
    console.log('prospectss:')
    console.log(prospects);
    console.log('name column: ' + nameColumn);
    console.log('email column: ' + emailColumn);


    try {
      const response = await fetch(UPLOAD_URL, {
        method: 'POST', 
        body: prospects,
        headers: {
          'Authorization': `Bearer ${getJWT()}`
        }
      });
      const json = await response.json();
      console.log('Uploaded Prospects');
      handleModalClose();
    } catch (error) {
      console.error('Error:', error);
    }

  }

  const setColumns = (data) => {
    setNameColumn(data.indexOf('Name'));
    setEmailColumn(data.indexOf('Email'));
  }

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
      <Paper {...getRootProps()} className={classes.paper}>
        <input {...getInputProps()} />
        <Typography component="p">
          Upload CSV
        </Typography>
        <CloudUploadIcon />
      </Paper>
      <Modal 
        open={modalOpen}
        onClose={handleModalClose}
        className={classes.modal}
      >
        <Paper className={classes.modalPaper}>
          <Typography className={classes.previewHeader} variant="h5">Preview</Typography>
          <Fab className={classes.fab} onClick={uploadProspects} color="primary" variant="extended" aria-label="upload">
            Upload
          </Fab>
          <div>
            {modalContent}
          </div>
        </Paper>
      </Modal>
    </div>
  );
}
export default ProspectsUpload;


