import React from 'react'
import {
    Backdrop,
    Paper,
    styled,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer, 
    TableHead,
    TablePagination,
    TableRow
  } from "@mui/material";
const TransactionModalTable = (props) => {
    const data = props.data
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          fontWeight: "bold",
                color: "#5e52a5"
        }
      }));
    
  return (
    <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <StyledTableCell  >INVOICE ID</StyledTableCell>
                <StyledTableCell >Date</StyledTableCell>
                <StyledTableCell >Product</StyledTableCell>
                <StyledTableCell >Unit</StyledTableCell>
                <StyledTableCell >Quantity</StyledTableCell>
                <StyledTableCell >Price/Unit</StyledTableCell>
            </TableHead>
            <TableBody>
                <TableCell >{data.transactionid}</TableCell>
                <TableCell  >{data.date}</TableCell>
                <TableCell >{data.product}</TableCell>
                <TableCell >{data.cashier}</TableCell>
                <TableCell >{data.transaction}</TableCell>
                <TableCell >{data.Status}</TableCell>
            </TableBody>
        </Table>
    </TableContainer>
  )
}

export default TransactionModalTable