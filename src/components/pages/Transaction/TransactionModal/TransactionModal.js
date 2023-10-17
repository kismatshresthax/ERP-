import styled from '@emotion/styled';
import { Box, Divider, Grid, TableCell, tableCellClasses } from '@mui/material'
import React from 'react'
import TransactionModalTable from './TransactionModalTable';
import TransactionalModalTotal from './TransactionalModalTotal';
import PaymentMethod from './PaymentMethod';

const TransactionModal = (props) => {
    const data= props.data;
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: "transparent",
          fontWeight: "bold",
        }
      }));
    return (
        <Box className=' rounded  bg-white px-3 py-3' sx={{ zIndex: '10000' }}>
            <Grid container >
                    <Grid items xs={12} >
                        <div className='d-flex flex-row justify-content-between'>
                        <span className='d-flex flex-column'>
                        <h3>Transaction Detail</h3>
                        <p className='text-secondary -mt-2'>{data.transactionid}</p>
                        </span>
                        <span className=''>
                        <h5>Logo</h5>
                        </span>
                        </div>
                    <Divider className='text-uppercase fs-5 fw-semibold'>{data.Status}</Divider>
                    </Grid>
                    
            </Grid>
            <Grid container padding={"10px"}>
            <Grid items xs={4}>
                <Box className='d-flex flex-column'>
                    <span className='d-flex gap-1 flex-column'>
                    <p className='fw-bold'>Issued</p>
                    <p style={{marginTop:'-0.8rem'}}>{data.date}</p>
                    </span>
                    <span className='d-flex gap-1 flex-column'>
                    <p className='fw-bold'>Due Date</p>
                    <p style={{marginTop:'-0.8rem'}}>{Date()}</p>
                    </span>
                </Box>
                
            </Grid>
            <Grid items xs={4}>
                <Box className='d-flex flex-column gap-2'>
                    <p className='fw-bold'>Billed to:</p>
                    <span className='d-flex flex-column'>
                        <p>{data.company_name}</p>
                        <p style={{marginTop:'-0.8rem'}}>{data.address}</p>
                        <p style={{marginTop:'-0.8rem'}}>{data.contact}</p>
                    </span>
                </Box>
            </Grid>
            <Grid items xs={4}>
                <Box className='d-flex flex-column gap-2'>
                    <p className='fw-bold'>From:</p>
                    <span className='d-flex flex-column'>
                        <p>Company Name</p>
                        <p style={{marginTop:'-0.8rem'}}>{data.cashier}</p>
                        <p style={{marginTop:'-0.8rem'}}>Contact</p>
                    </span>
                </Box>
            </Grid>
            {/* <Divider/> */}
            </Grid>
            <Grid item xs={12}>
                <TransactionModalTable data={data}/>
            </Grid>
            <Grid item xs={12} className='mt-4 d-flex justify-content-between'>
                <PaymentMethod/>
                <TransactionalModalTotal data={data}/>
            </Grid>
        </Box>
    )
}

export default TransactionModal