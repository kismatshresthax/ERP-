import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'

const SupplierBillTable = (props) => {
  const data = props.data.slice(0, 8)


  const [arr, setArr] = useState([])


for(let i=0;i<data.length;i++){

 // console.log("days",Math.floor(((new Date())-(new Date(data[i].bill_1_date)))/(1000*60*60*24)))
}
function date(date){
    const days= parseFloat(Math.floor(((new Date())-(new Date(date)))/(1000*60*60*24)))
    return days
}


// console.log("60",arr)
  return (
    <TableContainer component={Paper} >
      <Table size='small' sx={{minWidth:'650px'}}>
        <TableHead>
          <TableRow className='bg-light'>
            <TableCell className='fw-bold'>Supplier Name</TableCell>
            <TableCell className='fw-bold' align='right'>Total</TableCell>
            <TableCell className='fw-bold' align='right'>1-30 days</TableCell>
            <TableCell className='fw-bold' align='right'>31-60 days</TableCell>
            <TableCell className='fw-bold' align='right'>61-90 days</TableCell>
            <TableCell className='fw-bold' align='right'>91+ days</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            data.length > 0 && data.map((customer,idx) => {
 
              return (
                <TableRow  key={idx}>
                  <TableCell>{customer.supplier_name}</TableCell>
                  <TableCell align='right'>{parseInt(customer.Amount_1)}</TableCell>
                  <TableCell align='right'>{parseFloat(Math.floor(((new Date())-(new Date(customer.bill_1_date)))/(1000*60*60*24)))<30 || parseFloat(Math.floor(((new Date())-(new Date(customer.bill_2_date)))/(1000*60*60*24)))<30 ? <p>{customer.Amount_1 }</p>: <p>-</p>}</TableCell>
                  <TableCell align='right'>{(parseFloat(Math.floor(((new Date())-(new Date(customer.bill_1_date)))/(1000*60*60*24)))>30 &&  parseFloat(Math.floor(((new Date())-(new Date(customer.bill_1_date)))/(1000*60*60*24))) <=60) ? <p>{customer.Amount_1}</p>: <p>-</p>}</TableCell>
                  <TableCell align='right'>{parseFloat(Math.floor(((new Date())-(new Date(customer.bill_1_date)))/(1000*60*60*24)))>60 &&  parseFloat(Math.floor(((new Date())-(new Date(customer.bill_1_date)))/(1000*60*60*24))) <=90 ? <p>{customer.Amount_1}</p>: <p>-</p>}</TableCell>
                  <TableCell align='right'>{parseFloat(Math.floor(((new Date())-(new Date(customer.bill_1_date)))/(1000*60*60*24)))>90 ? <p>{customer.Amount_1}</p>: <p>-</p>}</TableCell>
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default SupplierBillTable



