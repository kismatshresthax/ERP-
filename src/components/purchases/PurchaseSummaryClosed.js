import { Grid } from "@material-ui/core";

import React, { useState,  } from "react";

import UseTable from "../home/UseTable";

import {

  TableBody,
  TableRow,

  TableCell,
} from "@material-ui/core";
import Controls from "../controls/Controls";
//import UserSessionContext from "../../contexts/UserSessionContext";
import Spinner from "../../utils/spinner";


import "./styles.css";

const headCells = [
  { id: "productId", label: "Product Name" },
  { id: "productQty", label: "Unit" },
  { id: "productQty", label: "Quantity" },
  { id: "productUnitPrice", label: "Unit Price"},
  { id: "productSubtotal", label: " Subtotal"},
  { id: "productDiscount", label: " Discount"},
  { id: "productTax", label: "Tax"},
  // { id: "actions", label: "Actions" },
];

const PurchaseSummaryClosed = (props) => {
  //const userSessionContext = React.useContext(UserSessionContext);
  const [records, setRecords] = useState();
  const { TblContainer, TblHead } = UseTable(records, headCells);
  if( props.data === undefined && props.productData === undefined)
  {
    return <Spinner />
  }

  return (
    <div className="container">
      <Grid container>
        <Grid item xs={6}>
          <div>
            <b>Vendor Name:</b>{props.data.vendorname ||""} 
          </div>
          <div>
            <b>Vendor Reference:</b> {props.data.vendorReference || ""} 
          </div>
          </Grid>
          {/* <Grid item xs={6}> */}
         
          {/* <div>
            <b>Description:</b> {props.data.description || ""} 
          </div> */}
          {/* </Grid> */}
          <Grid item xs={6}>
          <div>
            <b>Order Deadline:</b> {props.data.orderDeadline || ""}  
          </div>
          <div>
            <b>Receipt Date:</b> {props.data.recepitDate || ""} 
          </div>
          </Grid>
          </Grid>
          <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
          <TblContainer>
            <TblHead />
            <TableBody>
              { props.productData && props.productData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.product_name}</TableCell>
                  <TableCell>{item.unitName}</TableCell>
                  <TableCell>{item.productQty}</TableCell>
                  <TableCell>{item.productUnitPrice}</TableCell>
                  <TableCell>{item.productsubtotal}</TableCell>
                  <TableCell>{item.productDiscount || "-"}</TableCell>
                  <TableCell>{item.productTax  || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            </TblContainer>
            <div className="pt-15"></div>
            <div className="pt-50"></div>
        </div>
      </div>
      <table className= "table table-fluid">
        <tr>
          <th>Payment Mode</th>
          <th>Amount</th>
        </tr>
       {props.paymentMode && props.paymentMode.map((row, idx) => {
         return (
          <tr key={row.id}>
          <td>{row.mode}</td>
          <td>{row.amount}</td>
          </tr>
         );
       })}
        </table>
        <div>
        <Controls.Button 
         text ="Purchase Return"
         
        
        />
        </div>
      </div>
     
  );
};

export default PurchaseSummaryClosed;