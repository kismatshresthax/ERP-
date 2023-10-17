import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
//import TableContainer from '@mui/material/TableContainer';
//import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {makeStyles} from "@material-ui/core";
//import Box from '@mui/material/Box';
//import Container from '@mui/material/Container';
import UseTable from "../home/UseTable";
//import { useTheme } from '@mui/material/styles';
import Controls from "../controls/Controls";
import PrintIcon from "@mui/icons-material/Print";
import ReactToPrint from "react-to-print";
import { format } from "date-fns";
import CompanyContext from '../../contexts/CompanyContext';
const useStyles = makeStyles((theme) => ({
  table:{
  "& thead th": {
    fontWeight: "600",
    // color: theme.palette.primary.main,
    color: "#ffffff",
    // backgroundColor: theme.palette.primary.light,
    backgroundColor: "#454545",
    position: "sticky",
    top: "33px",
    zIndex: 9,
  },
  "& tbody td": {
    fontWeight: "300",
  },
  "& tbody tr:hover": {
    backgroundColor: "#fffbf2",
    cursor: "pointer",
  }
}
  }));

// const invoice = {
//     id: "5df3180a09ea16dc4b95f910",
//     invoice_no: "-inv/2021-06-28",
//     company: "SMTECH",
//     email: "SMTECH@INFO.com",
//     phone: "+1 (872) 588-3809",
//     address: "Subidanagar, Tinkune ,kathmandu,Nepal,2012",
//     trans_date: "2021-09-12",
//     due_date: "2019-10-12",
//   };

const headCells = [
  { id: "sn", label: "S.N" },
  { id: "productId", label: "Product Name" },
  { id: "productQTY", label: "Quantity", disableSorting: true },
  { id: "inhouseUnitId", label: "Unit", disableSorting: true },
  { id: "productUnitPrice", label: "Rate", disableSorting: true },
  { id: "productSubtotal", label: " SubTotal", disableSorting: true },
 
];

export default function SpanningTable({productData, data,vendorDetail}) {
    const classes=useStyles();
    const companyContext = React.useContext(CompanyContext);
    const componentRef = React.useRef(null);
   // const detail=invoice;
    // const data=props.productData;
    //const data=props.data;
    // const { TblContainer, TblHead } = UseTable( headCells);

    const date_of_sales = format(
      new Date(data.recepitDate),
      "yyyy/MM/dd"
    );
    const date_of_sales_nepali = format(
      new Date(data.recepitDate),
      "yyyy/MM/dd "
    );
    var adbs = require("ad-bs-converter");
    const nepalidate = adbs.ad2bs(date_of_sales_nepali);
    const miti =
      nepalidate.en["year"] +
      "/" +
      nepalidate.en["month"] +
      "/" +
      nepalidate.en["day"];
    const numWords = require("num-words");
    let amountArr = ((data.grandTotal).toFixed(2)).toString().split(".");
    let amountWord = numWords(amountArr[0]) + " rupees and " + numWords(amountArr[1]) + " paisa" + " only";

    const { TblContainer, TblHead } = UseTable(productData, headCells);

    const product_no_tax_list = productData.filter((x) => x.productTax === 0)
    const _nontaxable= product_no_tax_list.reduce(
      (total, obj) => parseFloat(obj.productSubtotal
        ) + parseFloat(total),
      0
    ); 
  
    const _subtotal_no_tax_discount = product_no_tax_list.reduce(
      (total, obj) => parseFloat(obj.productDiscount) + parseFloat(total),
      0
    );
  
    const _non_taxable =_nontaxable - (_subtotal_no_tax_discount || 0);
  return (
    <div>

    <div style={{ textAlign: "right", marginRight: "10px" }}>
            <ReactToPrint
              // pageStyle={"@page{size: landscape;}"}
             
              trigger={() => (
                <Controls.Button
                  text="Print"
                  variant="outlined"
                  startIcon={<PrintIcon />}
                  className="printBtn"
                />
              )}
              content={() => componentRef.current}
            />
          </div>

        <div ref={componentRef} className="purchaseReport" style={{padding: '10px'}}>
        <div className='head-bill' style={{paddingLeft: '18px',marginTop: '25px'}}>  <h3>Tax Invoice</h3></div>

<div style={{textAlign: 'center', fontSize: '13px', marginTop: '30px'}}>
<span style={{fontWeight:'bold',fontSize: '20px'}}>{companyContext.company.name || ""}</span><br />
<span>{companyContext.company.address || ""}</span><br />
<span>Vat No: {companyContext.company.panNo || ""}</span><br />
<span>Tel: {companyContext.company.phone_no || ""}</span>
</div>

        <div style={{display:'flex', justifyContent: 'space-between', marginTop: '30px'}}>
        <div style={{width:'200px', fontSize: '13px'}}>
        <span>Vendor :{data.vendorname||""}</span><br />
        <span>Vat No:{data.panNo||""}</span><br />
        <span>Address:{data.address||""}</span><br />
        <span>Phone :{data.contactNumber1||""}</span><br />
        
        </div>

        <div style={{width:'200px', fontSize: '13px'}}>
        <span>Invoice No: {data.vendorReference||""}</span><br />
        <span>Transaction Date:{date_of_sales ||""}</span><br />
        <span>Nepali Date:{miti ||""}</span><br />
        </div>


        </div>
   
   
        <div className="gap">
         
              <TblContainer style={{ overflowX: "initial" }} size="small">
                <TblHead size="small" />
                <TableBody>
                  {
            productData.map((item,idx) => {

                    return <TableRow key={item.id}>
                  <TableCell size="small">{idx + 1}</TableCell>
                    <TableCell size="small">{item.product_name||""}</TableCell>
                 
                    <TableCell size="small">{item.productQty||""}</TableCell>
                    <TableCell size="small">{item.unitName||""}</TableCell>
                    <TableCell size="small">{item.productUnitPrice||""}</TableCell>
                    <TableCell  size="small"align="center">{item.productSubtotal}</TableCell>
      

                    </TableRow>
                })}
                       <TableRow>

                        <TableCell><b>Total</b></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                         <TableCell></TableCell>
                        <TableCell align="center"><b>{data.subtotal}</b></TableCell>
                        </TableRow>
                             </TableBody>  
                        </TblContainer>   

</div>
        <div style={{width: '300px', marginTop: '86px',  fontSize: '13px', float: 'right',paddingRight:'17px' }} >
       
       <div className="row"> 
                
               
               <table className='subtotal-table' >
          <thead>
            <tr>
            
              <td>Sub-Total:</td>
              <td>{data.subtotal}</td>
            </tr>
            <tr>
            
              <td>Total Discount:</td>
              <td>{data.discount||"0"}</td>
            </tr>
            <tr>
            
              <td>Non-Taxable Amount:</td>
              <td>{(_non_taxable).toFixed(2)||"0"}</td>
            </tr>
            <tr>
            
            <td>Taxable Amount:</td>
            <td>{(data.netTotal).toFixed(2)||"0"}</td>
           
          </tr>
          <tr>
            
            <td>Total Tax:</td>
            <td>{(data.taxAmount).toFixed(2)}</td>
           
          </tr>
          <tr>
            
            <td>Grand Total:</td>
            <td>{(data.grandTotal).toFixed(2)}</td>
           
          </tr>
          </thead>
          <tbody>
         
             
        
        
               
                </tbody>

                </table>
                  </div> 
                  </div> 
                  <div style={{padding: '20px 0 20px 0'}}>
<p style={{padding: '5px'}}>Inwords: {amountWord} </p>
</div>

<div style={{display:'flex', justifyContent: 'space-between', marginTop: '280px',gap:"50px",flexDirection:"row"}}>
<div style={{width:'200px', textAlign:'center'}}>    
<span>-------------------</span><br />

<span>Prepared By:</span><br />

</div>
<div style={{width:'200px', textAlign:'center'}}>
<span>-------------------</span><br />
<span>Approved By:</span><br />
</div>
</div>
<p style={{textAlign:'center', marginTop: '35px'}}>Thank You for your Business.</p>
</div>
</div>

  
  );
}


