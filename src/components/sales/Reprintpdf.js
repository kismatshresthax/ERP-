// import React from 'react';

// export default function Table(){
//     return(
// <div>
// <h1>Tax invoice</h1>
// <p>Invoice No:</p>
// <p>Date:</p>
// <p>Bill To:</p>
// <p>CompanyName</p>
// <p>Address</p>
// <p>Contact No</p>
// <p>Email</p>

// <table>
// <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Quantity</th>
//                     <th>Rate</th>
//                     <th>UOM</th>
//                     <th>Subtotal</th>
//                   </tr>
//                 </thead>
//                 <tbody>

//                 </tbody>
// </table>
// <p>Subtotal</p>
// <p>Discount</p>
// <p>Taxable Amount</p>
// <p>Total Tax</p>
// <p>Grand Total</p>
  
// </div>
// );
// }

import React, { Fragment, useEffect, useState } from 'react';

import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';

import TableRow from '@mui/material/TableRow';
import {makeStyles} from "@material-ui/core";
import Spinner from '../../utils/spinner';
import UseTable from "../home/UseTable";

import Controls from "../controls/Controls";
import PrintIcon from "@mui/icons-material/Print";
import ReactToPrint from "react-to-print";
import { format } from "date-fns";
import CompanyContext from "../../contexts/CompanyContext";
import UserSessionContext from "../../contexts/UserSessionContext";
import config from "../../utils/config";
import axios from "axios";
import { toast } from "react-toastify";

import { convertNumberToWords } from "../../utils/Currency"

const useStyles = makeStyles((theme) => ({
  table: {
    "& thead th": {
      fontWeight: "10",
      // color: theme.palette.primary.main,
      color: "#ffffff",
      // backgroundColor: theme.palette.primary.light,
      backgroundColor: "#454545",
      position: "sticky",
      top: "33px",
      zIndex: 9,
    },
    "& tbody td": {
      fontWeight: "100",
    },
    "& tbody tr:hover": {
      backgroundColor: "#fffbf2",
      cursor: "pointer",
    },
    tableCell: {
      padding: "0px 10px 0px 0px"
    },
    table: {
      '& th': {
        fontSize: theme.typography.pxToRem(12), // Customize the font size for table head cells
        fontWeight: 'bold',
      },
      '& td': {
        fontSize: theme.typography.pxToRem(12), // Customize the font size for table body cells
      },
    },
    '& .small-row': {
      height: '30px', // Adjust the height of the table rows here
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
  

export default function Reprintpdf( {copyCount, data}) {


    const companyContext = React.useContext(CompanyContext);
   // const fiscalYear = "2080/81";
    const fiscalYear = companyContext.fiscal[0]["fiscalYear"] ||"";
    const userSessionContext = React.useContext(UserSessionContext);
    const classes=useStyles();
    const componentRef = React.useRef(null);





    

   // const [productData, setProductData] = useState([]);
    //const [paymentMode, setPaymentMode] = useState([]);
    
    const [paymentModes, setPaymentModes] = useState([]);
    const [datas, setDatas] = useState([]);
    const company = companyContext.company||"";
    const [nontax, setNontax] = useState(0);
    const [taxa, setTaxable] = useState(0);
    const [records, setRecords] = useState();

    const numWords = require("num-words");
    let amountArr = ((data.grandTotal).toFixed(2)).toString().split(".");
    //console.log(convertNumberToWords(data.grandTotal))
    //let amountWord = convertNumberToWords(Math.floor(data.grandTotal)) + " Only";

    let amountWord = numWords(amountArr[0]) + " Rupees and " + numWords(amountArr[1]) + " Paisa" + " Only";

    const { TblContainer, TblHead, recordsAfterPagingAndSorting } = UseTable(records, headCells);
    useEffect(() => {
       axios.get(`${config.APP_CONFIG}/Sales/SalesSummary/api/${data.id}`, {
            headers: { Authorization: userSessionContext.token },
          })
          .then((res) => {
            if (res.data.status_code === 200) {
            
              setDatas(res.data.msg.salesData[0]);
              setPaymentModes(res.data.msg.paymentMode);
  
                 const nontaxable = res.data.msg.salesProduct.filter(x =>{ return x.productTax === 0;}).reduce((total, obj) => parseFloat(obj.productTotal) + parseFloat(total),0)
           
       
         setNontax(parseFloat(nontaxable));
         const taxable = res.data.msg.salesProduct.filter(x => { return x.productTax !==0;}).reduce((total, obj) => parseFloat(obj.productTotal) + parseFloat(total),0);
   
         setTaxable(parseFloat(taxable));
         setRecords(res.data.msg.salesProduct)
        // setProductData(res.data.msg.salesProduct);
              
            } else {
           
              toast.error(res.data.msg);
          
            }
          })
          .catch((err) => {
          });
      }, []);
    const id=data.customerId;
   
    if (records === undefined) {
      return <Spinner />;
    }

    const stringData = paymentModes.reduce((result, item) => {
        return `${result}/ ${item.mode}`
      }, "")
      var mystr2=data.dateOfSales.substring(17, 26);

      const date_of_sale = format(new Date(data.dateOfSales),"yyyy/MM/dd")
      const date_of_sales= date_of_sale+" "+mystr2;
  
  
      const date_of_sales_nepali = format(
        new Date(data.dateOfSales),
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

     


      const netTotal = data.subTotal - data.discount;
    
  return (
    <div style={{position:"relative"}}>

 
    <div style={{ textAlign: "right", marginRight: "8px" }}>
            <ReactToPrint
      
             
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
          {/* <div className="page">
    <div ref={componentRef} className="Report-print"  style={{padding: '10px'}}>
    
  
        <div style={{textAlign: 'center', fontSize: '13px', marginTop: '15px'}}>
      
       <span style={{fontWeight:'bold',fontSize: '20px'}}>{company.name || ""}</span><br />
        <span>{company.address || ""}</span><br />
        <span>Vat No: {company.panNo || ""}</span><br />
        <span>Tel: {company.phone_no || ""}</span>
        </div> */}
        <div className="page">
    <div ref={componentRef} className="Report-print"  style={{padding: '12px'}}>
  
           <div className='inv' style={{paddingLeft: '18px',marginTop: '45px'}}>  <h3> Invoice</h3></div>
           <b style={{fontSize: "15px", position: "absolute", top: "150px", left: "40%", opacity: "0.4", zIndex: "-1"}}>
           Copy of original # {copyCount||"1"} </b> 
        <div style={{textAlign: 'center', fontSize: '13px', marginTop: '20px'}}>
        <span style={{fontWeight:'bold',fontSize: '20px'}}>{company.name || ""}</span><br />
        <span>{company.address || ""}</span><br />
        <span>Vat No: {company.panNo || ""}</span><br />
        <span>Tel: {company.phone_no || ""}</span>
        </div>
        <div style={{display:'flex', justifyContent: 'space-between',paddingLeft: '10px',paddingRight: '20px'}}>
        <div style={{width:'260px', fontSize: '13px',paddingLeft: '0px'}}>
        <span>Invoice No:{data.bill_no}</span><br />
        <span>Transaction Date:{date_of_sales}</span><br />
        <span>Bill issue Date:{date_of_sales}</span><br />
        <span>Nepali Date:{miti}</span><br />
        <span>FiscalYear:{fiscalYear||""}</span>
        </div>

        <div style={{width:'233px', fontSize: '13px'}}>
        <span>Buyer's Name:{datas.customerName? datas.customerName: ""}</span><br />
        <span>Address:{datas.address?datas.address:"" }</span><br />
        <span>Buyer's VAT No.:{datas.panNo? datas.panNo: ""}</span><br />
        <span>Mode of Payment: {stringData? stringData.toString() : "Credit" }</span><br />
        <span>Cashier:{datas.cashierName}</span>
        </div>
        </div>
  
    <div className="gap">
      
              <TblContainer style={{ overflowX: "initial" }} size="small">
                <TblHead size="small" />
                <TableBody>
                  {records &&
               records.map((item,idx) => {

                    return <TableRow key={item.idx}>
                  <TableCell size="small">{idx + 1}</TableCell>
                    <TableCell size="small">{item.productName}</TableCell>
                    
                    <TableCell size="small">{item.productQTY}</TableCell>
                    <TableCell size="small">{item.unitName}</TableCell>
                    <TableCell size="small">{item.productCost}</TableCell>
                    <TableCell  size="small"align="center">{item.productTotal}</TableCell>
      

                    </TableRow>
                })}
                       <TableRow className="small-row">

                        <TableCell rowSpan={records.length + 1}><b>Total</b></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                         <TableCell></TableCell>
                        <TableCell align="center"><b>{data.subTotal}</b></TableCell>
                        </TableRow>
                             </TableBody>  
                        </TblContainer>   

</div>

       
       
        <div style={{padding: '12px 0 10px 0'}}>
        <p style={{padding: '5px'}}>Inwords:<strong>{amountWord} </strong> </p>
        </div>
        <div style={{width: '300px', marginTop: '20px',  fontSize: '13px', float: 'right',paddingRight:'17px' }} >
       
        <div className="row">
                 
        <table >
            <thead>
              <tr>
              
                <th className='"small-cell'>Sub-Total :</th>
                <th className='"small-cell'>{data.subTotal}</th>
              </tr>
              <tr>
              
                <th className='"small-cell'>Total Discount :</th>
                <th className='"small-cell'>{data.discount||"0"}</th>
              </tr>
              <tr>
              
                <th className='"small-cell'>Non-Taxable Amount :</th>
                <th className='"small-cell'>{(nontax).toFixed(2)||"0"}</th>
              </tr>
              <tr>
              
              <th className='"small-cell'>Taxable Amount :</th>
              <th className='"small-cell'>{(taxa).toFixed(2)||"0"}</th>
             
            </tr>
            <tr>
              
              <th className='"small-cell'>Total Tax :</th>
              <th className='"small-cell'>{(data.taxAmount).toFixed(2)}</th>
             
            </tr>
            <tr>
              
              <th className='"small-cell'>Grand Total :</th>
              <th className='"small-cell'>{(data.grandTotal).toFixed(2)}</th>
             
            </tr>
            </thead>
            <tbody>
           
            </tbody>

</table>
                </div>
                  </div>
    <div style={{display:'flex', justifyContent: 'space-between', marginTop: '280px',gap:"50px",flexDirection:"row"}}>
    <div style={{width:'200px', textAlign:'center'}}>    
    <span>-----------------</span><br />
    <span>For, {datas.customerName?datas.customerName:""}</span><br />
    <span>Receiver's Name:</span><br />
    <span>Receiver's Contact:</span>
    </div>
    <div style={{width:'200px', textAlign:'center'}}>
    <span>-----------------</span><br />
    <span>For, {company.name}</span>
    </div>
    </div>
    <p style={{textAlign:'center', marginTop: '20px'}}>Thank You for your Business.</p>


    

</div>
 
</div>
</div>
  );
}

