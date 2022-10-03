import axios from "axios"
import React, {useState, useEffect} from "react"
import moment from 'moment'
import { DataGrid } from "@mui/x-data-grid"
import clsx from 'clsx'
import IconButton from "@mui/material/IconButton"
import SearchIcon from "@mui/icons-material/Search"
import TextField from "@mui/material/TextField"
import ClearIcon from '@mui/icons-material/Clear'
import VisibilityIcon from '@mui/icons-material/Visibility'
import DeleteIcon from '@mui/icons-material/Delete'

import './transaction.css'
import AddTransaction from "./AddTransaction"
const baseURL = "https://psl-mock-api.herokuapp.com/transactions/"

//search
function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function QuickSearchToolbar(props) {
 

  return (
    <div className="search">
      <div>
       
      </div>
      <TextField
        variant="standard"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search…"
       
        InputProps={{
          startAdornment: <SearchIcon fontSize="small" />,
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{ visibility: props.value ? 'visible' : 'hidden' }}
              onClick={props.clearSearch}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          ),
        }}
      />
    </div>
  );
}

function Transaction() {

const [myData, setMyData] = useState([]);
const [myData2, setMyData2] = useState([]);
const [searchText, setSearchText] = useState([]);
const [rows, setRows] = useState(myData2);
const [sortModel, setSortModel] = React.useState([
  {
    field: 'id',
    sort: 'desc',
  },
]);
const requestSearch = (searchValue) => {
  setSearchText(searchValue);
  const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
  const filteredRows = myData2.filter((row) => {
    return Object.keys(row).some((field) => {
      return searchRegex.test(row[field].toString());
    });
  });
  setRows(filteredRows);
};

const handleClick = (e) => {
 
  window.location.href = `/transaction/${e}`
  console.log(e);
}
const handleDelete = (e) =>{
  let status = ''
  console.log('id to delete' +e);
  // can only delete transaction with manual type
  axios.get(`https://psl-mock-api.herokuapp.com/transactions/${e}`).then((response) => {
  status = response.data.status ;
   });
  if (status === 'MANUAL'){
  axios.delete(`https://psl-mock-api.herokuapp.com/transactions/${e}`).then(() => console.log('Delete successful'));
  }
}

const columns= [
  {
    field: 'id',
    headerName: 'Id',
    width: 150, 
  },

  {
    field: 'datetime',
    headerName: 'datetime',
    width: 150,
    editable: true,
  },
  {
    field: 'merchant',
    headerName: 'Merchant',
    width: 300,
    editable: true,
  },
  {
    field: 'amount',
    headerName: 'amount',
    width: 110,
    editable: true,
    cellClassName: (params) => {
      if (params.value == null) {
        return '';
      }

      return clsx( {
        negative: params.value < 0,
        positive: params.value > 0,
      });
    }
  },
  {
    field: 'status',
    headerName: 'status',
    width: 110,
    editable: true,
    cellClassName: (params) => {

      return clsx( {
        completed: params.value === 'Completed',
        pending: params.value === 'Pending',
        manual: params.value === 'Manual',
      });
    },
  },
  {
    field: 'icon',
    headerName: 'Action',
    width: 150,
    editable: true,
    
    renderCell: (rowData) => 
    <>
    <VisibilityIcon onClick={ () => handleClick(rowData.id)} style={{color:'#1b74f9'}}/>
    <DeleteIcon onClick={ () => handleDelete(rowData.id)} style={{color:'#FC043D'}}/>
    </>
  },
];

useEffect(() => {
    axios.get(baseURL).then((response) => {
      setMyData(response.data);
    });
  }, []);

  useEffect(() => {
    setMyData2(myData.map(data => ({
      
      id: data.id,
      datetime: moment(data.datetime).format("D MMM  YYYY"),
      merchant: data.merchant.name,
      amount: data.type === 'DEBIT' ?  Number(data.amount * -1).toFixed(2) :Number(data.amount).toFixed(2),  
      status:data.status[0].toUpperCase()+ data.status.substring(1).toLowerCase(),
      icon:   data.id 
     
    })));
  }, [myData]);

  useEffect(() => { setRows(myData2);}, [myData2]);
 
  return(
    
 <div style={{ height: 700, width: '100%' }}>
  
    <AddTransaction/>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        sortModel={sortModel}
        onSortModelChange={(model) => setSortModel(model)}
        components={{ Toolbar: QuickSearchToolbar }}
        componentsProps={{
          toolbar: {
            value: searchText,
            onChange: (event) =>
              requestSearch(event.target.value),
            clearSearch: () => requestSearch(''),
          },
        }}
      />
    </div>    
  )
}

export default Transaction;

