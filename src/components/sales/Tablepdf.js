import React, { Fragment, useEffect, useState } from 'react';

import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';


import TableRow from '@mui/material/TableRow';
import {makeStyles} from "@material-ui/core";

import UseTable from "../home/UseTable";
import { useTheme } from '@mui/material/styles';
import Controls from "../controls/Controls";
import PrintIcon from "@mui/icons-material/Print";
import ReactToPrint from "react-to-print";
import { format } from "date-fns";
import CompanyContext from "../../contexts/CompanyContext";
import UserSessionContext from "../../contexts/UserSessionContext";
import config from "../../utils/config";
import axios from "axios";
import { toast } from "react-toastify";


const useStyles = makeStyles((theme) => ({
  table: {
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
    },
    
  },
  
  }));



  const headCells = [
    { id: "sn", label: "S.N" },
    { id: "productId", label: "Product Name" },
    { id: "productQTY", label: "Quantity", disableSorting: true },
    { id: "inhouseUnitId", label: "Unit", disableSorting: true },
    { id: "productUnitPrice", label: "Rate", disableSorting: true },
    { id: "productSubtotal", label: " SubTotal", disableSorting: true },
   
  ];
  

export default function SpanningTable( {productData, data, company, customerDetail, discountPercent, taxPercent}) {
 
    const companyContext = React.useContext(CompanyContext);
    const userSessionContext = React.useContext(UserSessionContext);
    const classes=useStyles();
    const componentRef = React.useRef(null);
    //const detail=invoice;
    const fiscalYear = companyContext.fiscal[0]["fiscalYear"];
    const [paymentModes, setPaymentModes] = useState([]);
    const[salesData, setSalesData] = useState([]);
    const [records, setRecords] = useState(productData);
    const product_no_tax_list = productData.filter((x) => x.productTax === 0)

    const _subtotal_no_tax = product_no_tax_list.reduce(
      (total, obj) => parseFloat(obj.productSubtotal) + parseFloat(total),
      0
    );
    const product_tax_list = productData.filter((x) => x.productTax !==0)
  
    const _subtotal_tax = product_tax_list.reduce(
      (total, obj) => parseFloat(obj.productTotal) + parseFloat(total),
      0
    );

    const numWords = require("num-words");
    let amountArr = ((data.grandTotal).toFixed(2)).toString().split(".");
    let amountWord = numWords(amountArr[0]) + " Rupees and " + numWords(amountArr[1]) + " Paisa" + " Only";
    // const data=props.productData;
    //const data=props.data;
    const { TblContainer, TblHead } = UseTable(records, headCells);

   useEffect(async() => {
    await axios
      .get(`${config.APP_CONFIG}/Sales/SalesSummary/api/${data.id}`, {
        headers: { Authorization: userSessionContext.token },
      })
      .then((res) => {
        if (res.data.status_code === 200) {
      
          // console.log(res.data.msg.salesData);
          setSalesData(res.data.msg.salesData[0]);
          setPaymentModes(res.data.msg.paymentMode);
          
        } else {
          //  window.alert("hello");
          toast.error(res.data.msg);
      
       
          //setPaymentMode([]);
        }
      })
      .catch((err) => {
      
    
        //setPaymentMode([]);
      });
  }, []);

//console.log((new Date(data.dateOfSales).toLocaleTimeString().substr(19,9)))

var mystr2=data.dateOfSales.substring(17, 26);

     const date_of_sale = format(new Date(data.dateOfSales),"yyyy/MM/dd")
     const date_of_sales= date_of_sale+" "+mystr2;
 
 

      const date_of_sales_nepali = format(
        new Date(data.dateOfSales),
        "yyyy/MM/dd"
      );
      var adbs = require("ad-bs-converter");
      const nepalidate = adbs.ad2bs(date_of_sales_nepali);
      const miti =
        nepalidate.en["year"] +
        "/" +
        nepalidate.en["month"] +
        "/" +
        nepalidate.en["day"];

        const stringData = paymentModes.reduce((result, item) => {
            return `${result}/ ${item.mode}`
          }, "")
        
          const netTotal = data.subTotal - data.discount;
  return (
   <div>

    <div style={{ textAlign: "right", marginRight: "8px" }}>
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
          <div className="page">
    <div ref={componentRef} className="Report-print"  style={{padding: '10px'}}>
    <div className='head-bill' style={{paddingLeft: '18px',marginTop: '60px'}}>  <h3 style={{marginBottom:"5px"}}>Tax Invoice</h3></div>

        <div style={{textAlign: 'center', fontSize: '13px', marginTop: '30px'}}>
        <span style={{fontWeight:'bold',fontSize: '20px'}}>{company.name || ""}</span><br />
        <span>{company.address || ""}</span><br />
        <span>Vat No: {company.panNo || ""}</span><br />
        <span>Tel: {company.phone_no || ""}</span>
        </div>

        <div style={{display:'flex', justifyContent: 'space-between',paddingLeft: '10px',paddingRight: '20px'}}>
        <div style={{width:'261px', fontSize: '13px'}}>
        <span>Invoice No:{data.bill_no}</span><br />
        <span>Transaction Date:{date_of_sales}</span><br />
        <span>Bill issue Date:{date_of_sales}</span><br />
        <span>Nepali Date:{miti}</span><br />
        <span>FiscalYear:{fiscalYear}</span>
        </div>

        <div style={{width:'233px', fontSize: '13px'}}>
        <span>Buyer's Name:{data.customerName || ""}</span><br />
        <span>Address:{data.address || ""}</span><br />
        <span>Buyer's VAT No.:{data.panNo || ""}</span><br />
        <span>Mode of Payment: {stringData? stringData.toString() : "Credit" }</span><br />
        <span>Cashier:{salesData.cashierName}</span>
        </div>
        </div>
    {/* // <TableContainer component={Paper}> */}
    {/* <Table className={classes.table} sx={{ minWidth: 600 }} aria-label="spanning table">
        <TableHead>
            <TableCell>Name</TableCell>
            <TableCell>Unit Name</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Rate</TableCell>
            <TableCell align="right" >SubTotal</TableCell>
        </TableHead>
    
        <TableBody>
          {productData.map((row) => (
            <TableRow >
              <TableCell>{row.productName}</TableCell>
              <TableCell >{row.unitName}</TableCell>
              <TableCell >{row.productQTY}</TableCell>
              <TableCell >{row.productCost}</TableCell>
              <TableCell align="right" >{row.productTotal}</TableCell>
            </TableRow>
          ))}
  <TableRow>

      <TableCell><b>Total</b></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell align="right"><b>{data.subTotal}</b></TableCell>
    </TableRow>
        </TableBody>
        </Table> */}

<div className="gap">
            {/* <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 proCategoryTbl"> */}
              <TblContainer style={{ overflowX: "initial" }} size="small">
                <TblHead size="small" />
                <TableBody>
                  {
            records.map((item,idx) => {

                    return <TableRow key={item.idx}>
                  <TableCell size="small">{idx + 1}</TableCell>
                    <TableCell size="small">{item.productName||""}</TableCell>
                 
                    <TableCell size="small">{item.productQTY||""}</TableCell>
                    <TableCell size="small">{item.unitName||""}</TableCell>
                    <TableCell size="small">{item.productCost||""}</TableCell>
                    <TableCell  size="small"align="center">{item.productTotal}</TableCell>
      

                    </TableRow>
                })}
                       <TableRow>

                        <TableCell><b>Total</b></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                         <TableCell></TableCell>
                        <TableCell align="center"><b>{data.subTotal}</b></TableCell>
                        </TableRow>
                             </TableBody>  
                        </TblContainer>   

</div>

        {/* <div style={{width: '200px', marginTop: '40px',  fontSize: '13px', float: 'right' }} >
        <Box>
        <span>Subtotal:{(data.subTotal).toFixed(2)}</span><br />
        <span>Discount(%):{(data.discount)}</span><br />
        <span>Taxable Amount:{(netTotal).toFixed(2)}</span><br />
        <span>Total tax:{(data.taxAmount).toFixed(2)}</span><br />
        <span>Grand Total:{(data.grandTotal).toFixed(2)}</span>
        </Box>
        </div> */}
       
        {/* <div style={{padding: '12px 0 10px 0'}}>
        <p style={{padding: '5px'}}>Inwords: {amountWord} </p>
        </div> */}
        <div style={{padding: '20px 0 20px 0'}}>
<p style={{padding: '5px'}}>Inwords: {amountWord} </p>
</div>
        <div style={{width: '300px', marginTop: '5px',  fontSize: '13px', float: 'right',paddingRight:'17px' }} >
       
         <div className="row"> 
                  
                 
                 <table>
            <thead>
              <tr>
              
                <th className='small-cell'>Sub-Total:</th>
                <th className='small-cell'>{data.subTotal}</th>
              </tr>
              <tr>
              
                <th className='small-cell'>Total Discount:</th>
                <th className='small-cell'>{data.discount||"0"}</th>
              </tr>
              <tr>
              
                <th className='small-cell'>Non-Taxable Amount:</th>
                <th className='small-cell'>{(_subtotal_no_tax).toFixed(2)||"0"}</th>
              </tr>
              <tr>
              
              <th className='small-cell'>Taxable Amount:</th>
              <th className='small-cell'>{(_subtotal_tax).toFixed(2)||"0"}</th>
             
            </tr>
            <tr>
              
              <th className='small-cell'>Total Tax:</th>
              <th className='small-cell'>{(data.taxAmount).toFixed(2)}</th>
             
            </tr>
            <tr>
              
              <th className='small-cell'>Grand Total:</th>
              <th className='small-cell'>{(data.grandTotal).toFixed(2)}</th>
             
            </tr>
            </thead>
            <tbody>
           
            </tbody>

</table>
  </div> 
  </div> 
          
          
               
    <div style={{display:'flex', justifyContent: 'space-between', marginTop: '270px', flexDirection:"row"}}>
    <div style={{width:'200px', textAlign:'center'}}>    
    <span>-----------------</span><br />
    <span>For, {data.customerName}</span><br />
    <span>Receiver's Name:</span><br />
    <span>Receiver's Contact:</span>
    </div>
    <div style={{width:'200px', textAlign:'center'}}>
    <span>-----------------</span><br />
    <span>For, {company.name}</span>
    </div>
    </div>
    <p style={{textAlign:'center', marginTop: '35px'}}>Thank You for your Business.</p>


    <div class="page-break">
   
<div className='inv' style={{paddingLeft: '18px',marginTop: '25px'}}>  <h3> Invoice</h3></div>

<div style={{textAlign: 'center', fontSize: '13px', marginTop: '30px'}}>
<span style={{fontWeight:'bold',fontSize: '20px'}}>{company.name || ""}</span><br />
<span>{company.address || ""}</span><br />
<span>Vat No: {company.panNo || ""}</span><br />
        <span>Tel: {company.phone_no || ""}</span>
</div>

<div style={{display:'flex', justifyContent: 'space-between',paddingLeft: '10px'}}>
<div style={{width:'261px', fontSize: '13px'}}>
<span>Invoice No:{data.bill_no}</span><br />
<span>Transaction Date:{date_of_sales}</span><br />
<span>Bill issue Date:{date_of_sales}</span><br />
<span>Nepali Date:{miti}</span><br />
<span>FiscalYear:{fiscalYear}</span>
</div>

<div style={{width:'233px', fontSize: '13px'}}>
<span>Buyer's Name:{data.customerName || ""}</span><br />
<span>Address:{data.address || ""}</span><br />
<span>Buyer's VAT No.:{data.panNo || ""}</span><br />
<span>Mode of Payment: {stringData? stringData.toString() : "Credit" }</span><br />
<span>Cashier:{salesData.cashierName}</span>
</div>
</div>
{/* // <TableContainer component={Paper}> */}
<div className="gap">
            {/* <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 proCategoryTbl"> */}
              <TblContainer style={{ overflowX: "initial" }} size="small">
                <TblHead size="small" />
                <TableBody>
                  {
            records.map((item,idx) => {

                    return <TableRow key={item.idx}>
                  <TableCell size="small">{idx + 1}</TableCell>
                    <TableCell size="small">{item.productName||""}</TableCell>
                   
                    <TableCell size="small">{item.productQTY||""}</TableCell>
                    <TableCell size="small">{item.unitName||""}</TableCell>
                    <TableCell size="small">{item.productCost||""}</TableCell>
                    <TableCell  size="small"align="center">{item.productTotal}</TableCell>
      

                    </TableRow>
                })}
                       <TableRow>

                        <TableCell><b>Total</b></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                         <TableCell></TableCell>
                        <TableCell align="center"><b>{data.subTotal}</b></TableCell>
                        </TableRow>
                             </TableBody>  
                        </TblContainer>   

</div>

<div style={{width: '300px', marginTop: '86px',  fontSize: '13px', float: 'right',paddingRight:'17px' }} >
       
       <div className="row"> 
                
               
               <table >
               <thead>
              <tr>
              
                <th className='small-cell'>Sub-Total:</th>
                <th className='small-cell'>{data.subTotal}</th>
              </tr>
              <tr>
              
                <th className='small-cell'>Total Discount:</th>
                <th className='small-cell'>{data.discount||"0"}</th>
              </tr>
              <tr>
              
                <th className='small-cell'>Non-Taxable Amount:</th>
                <th className='small-cell'>{(_subtotal_no_tax).toFixed(2)||"0"}</th>
              </tr>
              <tr>
              
              <th className='small-cell'>Taxable Amount:</th>
              <th className='small-cell'>{(_subtotal_tax).toFixed(2)||"0"}</th>
             
            </tr>
            <tr>
              
              <th className='small-cell'>Total Tax:</th>
              <th className='small-cell'>{(data.taxAmount).toFixed(2)}</th>
             
            </tr>
            <tr>
              
              <th className='small-cell'>Grand Total:</th>
              <th className='small-cell'>{(data.grandTotal).toFixed(2)}</th>
             
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

<div style={{display:'flex', justifyContent: 'space-between', marginTop: '270px', flexDirection:"row"}}>
<div style={{width:'200px', textAlign:'center'}}>    
<span>-----------------</span><br />
<span>For, {data.customerName}</span><br />
<span>Receiver's Name:</span><br />
<span>Receiver's Contact:</span>
</div>
<div style={{width:'200px', textAlign:'center'}}>
<span>-----------------</span><br />
<span>For, {company.name}</span>
</div>
</div>
<p style={{textAlign:'center', marginTop: '35px'}}>Thank You for your Business.</p>
</div>
</div>
</div>
</div>

  );
}

