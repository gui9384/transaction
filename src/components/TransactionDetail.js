import React, {useEffect, useState} from 'react'
import axios from "axios";
import { useParams, Link } from 'react-router-dom'
import moment from 'moment';
import 'moment-timezone';
import './transactionDetail.css'
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';
import MyModal from './MyModal';

const TransactionDetail = () => {

  const handleOpen = () => setOpen(true);
  const [open, setOpen] = useState(false);
  const { id } = useParams()
  const baseURL = `https://psl-mock-api.herokuapp.com/transactions/${id}`;
  const [detailData, setDetailsData] = useState([]);

  useEffect(() => {
    axios.get(baseURL).then((response) => {
        setDetailsData(response.data);
    });

  }, []);

  return (
      <>
      <div  className='home'><Link to = '/transaction'> <HomeIcon/> </Link></div>
      <div className='root'>
            <div  className='title'> Transaction Details </div> 
            <h5><span className='detail'>Date:</span> <span className='resultat'>{ moment(detailData?.datetime).format("D MMM  YYYY")}</span> </h5> 
            <h5><span className='detail'>Time: </span> <span className='resultat'>{ moment(detailData?.datetime).format("HH:mm")} </span></h5>
            <h5><span className='detail'>Merchant: </span><span className='resultat'>{detailData?.merchant?.name}</span></h5>
            <h5><span className='detail'>Category: </span><span className='resultat'>{detailData?.merchant?.category}</span></h5>
            <h5><span className='detail'>Country: </span><span className='resultat'>{detailData?.merchant?.country}</span></h5>
            {detailData?.type === "DEBIT" ?
            <h5><span className='detail'>Amount (HKD): </span><span className='negative'> -{Number(detailData?.amount).toFixed(2)}</span></h5>
            :
            <h5><span className='detail'>Amount (HKD):</span><span className='positive'> {Number(detailData?.amount).toFixed(2)}</span></h5>
            }
            {detailData?.status === "COMPLETED" ?
            <h5><span className='detail'>Status: </span><span className='comp'>{detailData?.status}</span></h5>
            :
            detailData?.status === "PENDING" ?
            <h5><span className='detail'>Status: </span><span className='pend'>{detailData?.status}</span></h5>
            :
            <h5><span className='detail'>Status: </span><span className='man'>{detailData?.status}</span></h5>
            }
            <h5><span className='detail'>Reference: </span><span className='resultat'>{detailData?.reference}</span></h5>
            <h5><span className='detail'>Remark: </span><span className='resultat'>{detailData?.remarks}</span></h5>
            <button className='editBtn' onClick={ () => handleOpen( )}><span>Edit Transaction</span> <EditIcon /></button>
            <MyModal 

              amount = {detailData?.amount}
              type = {detailData?.type}
              merchant = {detailData?.merchant?.name}
              reference = {detailData?.reference}
              remark = {detailData?.remarks}
              transactionType = 'modify'
              open = {open}
              
              setOpen = {setOpen}
              id = {id}
              />
       </div>
    </>
  )
}

export default TransactionDetail