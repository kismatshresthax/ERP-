import jsonData from "./TransactionData.json";
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
import Modal from '@mui/material/Modal';
import { VscPreview } from "react-icons/vsc";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import React,{useState} from "react";
import TransactionModal from "./TransactionModal/TransactionModal";
import {AiOutlineCloseCircle} from 'react-icons/ai'
const TransactionTable = (props) => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      
      fontWeight: "bold",
      color: "#5e52a5"
    }
  }));

  const data = props.data.slice(0, 10);

  const [open,setOpen] = useState(false)
  const [products,setProducts] = useState([])
  const handleOpen = (e,product) =>{
    e.preventDefault()
    setOpen(true)
    setProducts(product)
  }
  const handleClose = () =>{
    setOpen(false)
  }
  return (

    <>
      <TableContainer sx={{maxHeight:'450px',overflowX:'scroll'}} >
        <Table size="small"  >
          <TableHead  style={{zIndex:'1000'}}>
            <TableRow className="" >
              <StyledTableCell >Transaction Id</StyledTableCell>
              <StyledTableCell >Date</StyledTableCell>
              <StyledTableCell >Cashier Code</StyledTableCell>
              <StyledTableCell >Discount</StyledTableCell>
              <StyledTableCell >Total</StyledTableCell>
              <StyledTableCell >Transaction Type</StyledTableCell>
              <StyledTableCell >Status</StyledTableCell>
              <StyledTableCell >Preview</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody className="border-0" style={{ border: "none" }}>
            {data.map((product,idx) => {
              return (
                <TableRow  key={idx}>
                  <TableCell >{product.transactionid}</TableCell>
                  <TableCell >{product.date}</TableCell>
                  <TableCell >{product.cashier}</TableCell>
                  <TableCell >{product.discount}%</TableCell>
                  <TableCell >
                    {product.amount - product.amount * (product.discount / 100)}
                  </TableCell>
                  <TableCell>{product.transaction}</TableCell>
                  <TableCell >
                    <button
                      className={
                        product.Status === "Sales"
                          ? "bg-success my-auto  text-white shadow-lg px-2 py-1 rounded-2 border-0 fw-bold mx-auto"
                          : " py-1 bg-danger  px-2 py-1 fw-bold rounded-2 shadow-lg text-white border-0 my-auto  "
                      } style={{width:'90px'}}
                    >
                      {product.Status}
                    </button>
                  </TableCell>
                  <TableCell onClick={(e)=>handleOpen(e,product)} className="d-flex  justify-content-center mx-auto ">
                    <VscPreview
                      className="text-warning   fs-3"
                      style={{ cursor: "pointer" }}
                    />
                  </TableCell>
      
                </TableRow>
         
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog fullWidth maxWidth={'lg'} sx={{maxHeight:'100vh'}} open={open} onClose={handleClose}>
        <div className="d-flex flex-row justify-content-between px-4">
        <DialogTitle className="d-flex justify-content-center">Subscribe</DialogTitle>
        <DialogActions onClick={handleClose} sx={{cursor:'pointer',fontSize:'19px'}}><AiOutlineCloseCircle/></DialogActions>
        </div>
        <DialogContent sx={{marginTop:'-1.25rem'}}>
        <TransactionModal data={products}/>
        </DialogContent>
       
      </Dialog>
      </>
  
  

  );
};
export default TransactionTable;
