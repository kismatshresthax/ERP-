import React, { useState } from 'react'
import jsonData from './BillData.json'
import CustomerBillTable from './CustomerBillTable'
import { Card, CardContent } from '@mui/material'


const CutomerBillSection = () => {
 

  return (
    <Card className='d-flex flex-column gap-2'>
      <CardContent>
      <span className='d-flex flex-column gap-2'>
        <h5 className='mx-auto'>Customer Bill Aging</h5>
      </span>
      </CardContent>
      
      <CustomerBillTable data={jsonData}/>

    </Card>
  )
}

export default CutomerBillSection