import React, { useState } from 'react';
import jsonData from './SupplierData.json';
import SupplierBillTable from './SupplierBillTable';
import { Card, CardContent } from '@mui/material';


const SupplierBillSection = () => {
 

  return (
    <Card className='d-flex flex-column gap-2 w-100'>
        <CardContent>
      <span className='d-flex flex-column gap-2'>
        <h5 className='mx-auto'>Suppler Bill Aging</h5>
      </span>
      </CardContent>
      <SupplierBillTable data={jsonData}/>

    </Card>
  )
}

export default SupplierBillSection