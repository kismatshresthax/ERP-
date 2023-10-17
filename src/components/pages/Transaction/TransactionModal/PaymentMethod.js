import React,{useState} from 'react'
import {Box, FormControl, InputLabel, MenuItem, Select, Typography} from '@mui/material'
import jsonData from '../TransactionData.json'

const PaymentMethod = () => {
  const [payment,setPayment] = useState('')
  
  const handleChange = (e)=>{
    setPayment(e.target.value)
  }


  return (
    <Box className='d-flex flex-row gap-2 w-50'>
        <Typography className='fw-bold'>Payment </Typography>
        <FormControl fullWidth>
          <InputLabel >Types</InputLabel>
          <Select
          label='Method'
          value={payment}
          onChange={handleChange}
          >
              <MenuItem value={10}>Cash</MenuItem>
              <MenuItem value={20}>Bank</MenuItem>
              <MenuItem value={30}>Digital Payment</MenuItem>
    
          </Select>
        </FormControl>
    </Box>
    
    
    
    )
}

export default PaymentMethod