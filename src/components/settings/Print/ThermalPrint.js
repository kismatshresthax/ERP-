import { React, useState,useRef } from "react";
import "./T80.css";
import CompanyContext from "../../../contexts/CompanyContext";
import UserAuthenticationContext from "../../../contexts/UserAuthenticationContext";
import Controls from "../../controls/Controls";
import PrintIcon from "@mui/icons-material/Print";
import ReactToPrint from "react-to-print";
import { format } from "date-fns";
//import numberToWords from "number-to-words";

export const ThermalPrint = ({productData, data, company, customerDetail, discountPercent, taxPercent}) => {
 // const companyContext = React.useContext(CompanyContext);
  console.log(productData)
  console.log(data)
  const componentRef = useRef(null);
 // const detail=invoice;
  // const data=props.productData;
  //const data=props.data;
  // const { TblContainer, TblHead } = UseTable( headCells);

  const date_of_sales = format(
    new Date(data.dateOfSales
      ),
    "yyyy/MM/dd HH:mm:ss"
  );
  const date_of_sales_nepali = format(
    new Date(data.dateOfSales
      ),
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
  let amountWord = numWords(amountArr[0]) + " Rupees and " + numWords(amountArr[1]) + " Paisa" + " Only";
  const number = 196246;


  return (
    <div>
    <div style={{ textAlign: "right", marginRight: "10px" }}>
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
    <div ref={componentRef} className="container-print">
      
      <div className="company-details"
        style={{
          width: "100%",
        }}
      >
        <h2>{company.name || ""}</h2>
        <p>{company.address || ""}</p>
        <p>{company.phone_no || ""}</p>
        <p>{company.panNo || ""}</p>

        <p>Tax Invoice</p>

        <div style={{ textAlign: "left", marginTop: "10px",fontWeight:"600" }}>
          <p>PAN No: </p>
          <p>Bill NO: {""}{data.bill_no}</p>
          {/* <p>Area:</p>
          <p>Table No: </p>
          <p>Table Name: </p> */}
          <p>Transaction Date:{""}{date_of_sales||""} </p>
          <p>Invoice Date:{""}{date_of_sales||""}</p>
          <p>Nepali Date:{""}{miti||""}</p>
          <p>Fiscal Year:{""}{data.fiscalYear||""}</p>
          <p>Cashier: {" "+data.cashierName}</p>
          <p>Customer Name:  {""}{data.customerName}</p>
          <p>Customer No: {""}{""} </p>
          <p>Customer  Pan:  {""}{data.panNo
}</p>
        </div>
        <div>
          <table className="table-t-80" >
            <tr style={{ borderTop: "1px black solid" }}>
            <th>S.N</th>
              <th>Item</th>
              <th>Unit</th>
              <th>QTY</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
            {
            productData.map((item,idx) => {
           return <tr style={{ borderTop: "1px black solid" }} key={item.idx}>
                  <td size="small">{idx + 1}</td>
                    <td size="small">{item.productName||""}</td>
                 
                    <td size="small">{item.productQTY||""}</td>
                    <td size="small">{item.unitName||""}</td>
                    <td size="small">{item.productCost||""}</td>
                    <td  size="small"align="center">{item.productTotal}</td>
      

                    </tr>
          
            })}
          
          </table>
        </div>
    
        <div className="payment">
     
        <div className="left">
<div style={{fontSize:"14px",fontWeight:"Bold"}}>Payment Mode</div> 
<div
              style={{
                width: "90px",
                height: "60px",
                border: "1px solid black",
              }}
            >
              Credit
            </div> 
        </div>
        <div className="right">
          <table>
          <tr>
      <td>Sub-Total:</td>
      <td id="subTotalValue">{data.subTotal}</td>
    </tr>
    <tr>
      <td>Discount:</td>
      <td id="discountValue">{data.discount}</td>
    </tr>
    <tr>
      <td>Taxable:</td>
      <td id="taxableValue">{"0"}</td>
    </tr>
    <tr>
      <td>Non-Taxable:</td>
      <td id="nonTaxableValue">{"0"}</td>
    </tr>
    <tr>
      <td>Tax:</td>
      <td id="taxValue">{data.taxAmount}</td>
    </tr>
                </table>
          
</div>
             
     
                
      
        </div>
        <hr />
        <h2>Grand Total:{data.grandTotal}</h2>
        <hr />
        <div>In Words:{amountWord}</div>
        <hr />
        {/* <div style={{ marginLeft: "80px" }}>
          <p>Received AMT::</p>
          <p>Change AMT::</p>
        </div> */}
        <hr />
        <h2 style={{textAlign:"center"}}>Thank You </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "20%",
          }}
        >
          <div style={{ borderTop: "1px solid black" }}> Cashier</div>

          <div style={{ borderTop: " 1px solid black" }}> Customer</div>
        </div>
        <hr />
      </div>
    </div>
    </div>
  );
};
