import React,{useState} from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MyModal from './MyModal';


import './addTransaction.css'

const AddTransaction = () => {
  const handleOpen = () => setOpen(true);
 
  const [open, setOpen] = useState(false);
 
  return (
    <>
    <button className="addTransaction" name="addTransaction" id ="addTransaction" onClick={handleOpen}><AddCircleOutlineIcon /><span>ADD TRANSACTION</span></button>
    <MyModal 
              transactionType = 'add'
              open = {open}
              setOpen = {setOpen}
              />
     </>
  )
}

export default AddTransaction