import { Box, Divider, List, ListItem, ListItemText, Paper, Table, TableCell, TableContainer, TableRow, Typography } from '@mui/material'
import React from 'react'

const TransactionalModalTotal = (props) => {
    const data = props.data
  return (
    // <Box className='w-25 my-6'>
    //     <List>
    //         <ListItem>
    //             <ListItemText><Typography className='fw-bold' variant="subtitle2" gutterBottom>Sub Total</Typography></ListItemText>
    //             <ListItemText><Typography variant="subtitle2" gutterBottom>Rs. {data.amount}</Typography></ListItemText>
    //         </ListItem>
    //         <Divider/>
    //         <ListItem>
    //             <ListItemText><Typography className='fw-bold' variant="subtitle2" gutterBottom>Discount %</Typography></ListItemText>
    //             <ListItemText><Typography variant="subtitle2" gutterBottom>{data.discount}%</Typography></ListItemText>
    //         </ListItem>
    //         <Divider/>
    //         <ListItem>
    //             <ListItemText><Typography className='fw-bold' variant="subtitle2" gutterBottom>Total</Typography></ListItemText>
    //             <ListItemText><Typography variant="subtitle2" gutterBottom>  {data.amount - data.amount * (data.discount / 100)}</Typography></ListItemText>
    //         </ListItem>
    //         <Divider/>
    //         <ListItem>
    //             <ListItemText><Typography className='fw-bold' variant="subtitle2" gutterBottom>Tax</Typography></ListItemText>
    //             <ListItemText><Typography variant="subtitle2" gutterBottom>  {data.amount - data.amount * (data.discount / 100)}</Typography></ListItemText>
    //         </ListItem>
    //         <Divider/>
    //         <ListItem>
    //             <ListItemText><Typography className='fw-bold' variant="subtitle2" gutterBottom>Grand Total</Typography></ListItemText>
    //             <ListItemText><Typography variant="subtitle2" gutterBottom>  {data.amount - data.amount * (data.discount / 100)}</Typography></ListItemText>
    //         </ListItem>
    //     </List>
        
    // </Box>
    <Box >
    <TableContainer>
        <Table>
            <TableRow>
                <TableCell className='fw-bold'>Sub Total</TableCell>
                <TableCell>Rs.{data.amount}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell className='fw-bold'>Discount</TableCell>
                <TableCell>{data.discount}%</TableCell>
            </TableRow>
            <TableRow>
                <TableCell className='fw-bold'>Tax</TableCell>
                <TableCell>13%</TableCell>
            </TableRow>
            <TableRow>
                <TableCell className='fw-bold'>Total</TableCell>
                <TableCell>Rs.{(data.amount - data.amount * (data.discount / 100))+(data.amount*0.13)}</TableCell>
            </TableRow>
        </Table>
    </TableContainer>
    </Box>
  ) 
}

export default TransactionalModalTotal