
import React from 'react'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";

export const Salesummary = (props) => {
  const data=props.data;
  console.log(data)
    const tablecellstyle = {
        border: "none",padding:'1px' 
      };
  return (
    <>
    <Card>
  <CardContent>
    <h3 style={{ textAlign: 'left' }}>{"Sales Summary"}</h3>
    <Table>
      <TableHead></TableHead>
      <TableBody>
       
          <TableRow key={data.id}>
            <TableCell style={tablecellstyle}>Sub Total</TableCell>
            <TableCell style={tablecellstyle}>{data.subTotal}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={tablecellstyle} component="th" scope="row">
              Total Discount
            </TableCell>
            <TableCell style={tablecellstyle}>{data.totalDiscount}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={tablecellstyle}>Total Service Charge</TableCell>
            <TableCell style={tablecellstyle}>{data.totalServiceCharge}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={tablecellstyle}>Total Extra Charge</TableCell>
            <TableCell style={tablecellstyle}>{data.totalExtraCharge}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={tablecellstyle}>Total Tax</TableCell>
            <TableCell style={tablecellstyle}>{data.totalTax}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={tablecellstyle}>Grand Total</TableCell>
            <TableCell style={tablecellstyle}>{data.grandTotal}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={tablecellstyle}>Sales By Cash</TableCell>
            <TableCell style={tablecellstyle}>{data.cashAmount}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={tablecellstyle}>Sale By Card</TableCell>
            <TableCell style={tablecellstyle}>{data.cardAmount}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ border: "none", padding: '2px' }}>
              Sales by FonePay
            </TableCell>
            <TableCell style={tablecellstyle}>{data.fonePay}</TableCell>
          </TableRow>
  
      </TableBody>
    </Table>
  </CardContent>
</Card>
</>
  )
}