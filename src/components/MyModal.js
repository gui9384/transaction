import React,{useState, useEffect} from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { Button } from '@mui/material';
import axios from "axios";


const MyModal = (props) => {

     const [error, setError] = useState(false);
    const [type, setType] = useState('');
    const [amount, setAmount] = useState(0);
    const [merchant, setMerchant] = useState('');
    const [reference, setReference] = useState('');
    const [remark, setRemark] = useState('');
    const handleClose = () => props.setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

       useEffect(() => {
        
        if(isNaN(amount) || amount <= 0) setError(true); else  setError(false);
       }, [amount]);

       useEffect(() => {
        setMerchant(props?.merchant);
        setAmount(props?.amount)
        setReference(props?.reference)
        setRemark(props?.remark)
        setType(props?.type)
      
       }, [props.open]);

      function handleSubmit(amount, merchant, type, reference, remark, transactionType){
        props.setOpen(false)
        console.log(transactionType)
        if(transactionType === 'add'){
          axios.post('https://psl-mock-api.herokuapp.com/transactions', {
                "amount": amount,
                "merchant": {
                "name": merchant,
                },
                "type": type,
                "reference": reference,
                "remarks": remark
              })
              .then(function (response) {
                console.log(response);
                window.location.reload()
              })
              .catch(function (error) {
                console.log(error);
              });
        }
        if(transactionType === 'modify'){
          axios.patch(`https://psl-mock-api.herokuapp.com/transactions/${props.id}`, {
            "amount": amount,
            "merchant": {
            "name": merchant,
            },
            "type": type,
            "reference": reference,
            "remarks": remark
          })
          .then(function (response) {
            console.log(response);
            window.location.reload()
          })
          .catch(function (error) {
            console.log(error);
          });

        }
        
    }

    return (
    <Modal
    open={props.open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
     <Box sx={style}>
     {props.transactionType === 'add' ?
     <div className='addtitle'>Add a New Manual Transaction</div>
     :
     <div className='addtitle'>Modify Transaction</div>
     }
   
  
   <form className='fields' onSubmit={ () => handleSubmit(amount, merchant, type, reference, remark, props.transactionType )}>
   <TextField className='textField'
       required
       error={isNaN(amount) || amount <= 0}
       id="amount"
       label="amount"
       defaultValue={props?.amount}
       onChange={(event) => { setAmount(event.target.value)} }
     />
      <TextField className='textField'
       required
       id="merchant"
       label="Merchant"
       defaultValue={props?.merchant}
       onChange={(event) => { setMerchant(event.target.value)} }
     />
      <FormControl className='textField' required sx={{ m: 1, minWidth: 120 }}>
       <InputLabel id="type">Type</InputLabel>
       <Select
       labelId="type"
       defaultValue={props?.type}
       value={type}
       label="Type *"
       onChange={(event) => { setType(event.target.value)} }
     >
   
       <MenuItem value={'CREDIT'}>Credit</MenuItem>
       <MenuItem value={'DEBIT'}>Debit</MenuItem>
      
     </Select>
     </FormControl>

     <TextField className='textField'
       id="references"
       label="references"
       defaultValue={props?.reference}
       onChange={(event) => { setReference(event.target.value)} }
     />
       <TextField className='textField'
       id="remarks"
       label="remarks"
       defaultValue={props?.remark}
       onChange={(event) => { setRemark(event.target.value)} }
     />
     {error === true ?
     <Button type='submit' disabled>Submit</Button>
      :
      <Button type='submit' >Submit</Button>
    }
     </form>
    
  </Box>
  </Modal>
  )
}

export default MyModal