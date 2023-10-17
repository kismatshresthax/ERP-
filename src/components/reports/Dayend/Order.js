
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

export const Order = (props) => {
  const data=props.data
    const tablecellstyle = {
        border: "none",padding:'1px' 
      };

  return (
   <>
    <Card >
              <CardContent>
            
                <h3 style={{textAlign:'left'}}>{"Order Summary"}</h3>

                <Table>
                  <TableHead></TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell
                        style={tablecellstyle}
                       
                      >
                      Table Sales
                      </TableCell>{" "}
                      <TableCell style={tablecellstyle}>
                        {data.tableSale}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                       style={tablecellstyle}
                      
                      >
                      Take Away
                      </TableCell>{" "}
                      <TableCell style={tablecellstyle}>
                        {data.takeAway}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                       style={tablecellstyle}
                        
                      >
                        Dinning
                      </TableCell>{" "}
                      <TableCell style={tablecellstyle}>
                        {data.dining}
                      </TableCell>
                    </TableRow>{" "}
                    
                    <TableRow>
                      <TableCell
                        style={tablecellstyle}
                        
                      >
                        Home Delivery Sales
                      </TableCell>{" "}
                      <TableCell style={tablecellstyle}>
                        {data.delivery}
                      </TableCell>
                   </TableRow>
                   <TableRow>
                      <TableCell
                        style={tablecellstyle}
                     
                      >
                        Table Sales
                      </TableCell>{" "}
                      <TableCell style={tablecellstyle}>
                        {data.tableSales}
                      </TableCell>
                      
                    
                   </TableRow><TableRow>
                      <TableCell
                        style={tablecellstyle}
                      
                      >
                        TakeAway Sales
                      </TableCell>{" "}
                      <TableCell style={tablecellstyle}>
                        {data.takeAwaySales}
                      </TableCell>
                      
                    
                   </TableRow>
                   <TableRow>
                      <TableCell
                        style={tablecellstyle}
                      
                      >
                        HOme Delivery Pending Amount
                      </TableCell>{" "}
                      <TableCell style={tablecellstyle}>
                        {data.homeDeliveryPending}
                      </TableCell>
                      
                    
                   </TableRow><TableRow>
                      <TableCell
                        style={tablecellstyle}
                       
                      >
                        Home Delivery charge
                      </TableCell>{" "}
                      <TableCell style={tablecellstyle}>
                        {data.homeDeliveryCharge}
                      </TableCell>
                      
                    
                   </TableRow>
                   <TableRow>
                      <TableCell
                        style={tablecellstyle}
                      
                      >
                        Total Order
                      </TableCell>{" "}
                      <TableCell style={tablecellstyle}>
                        {data.totalOrder}
                      </TableCell>
                      
                    
                   </TableRow>
                   <TableRow>
                      <TableCell
                        style={tablecellstyle}
                        
                      >
                       Cancel Order
                      </TableCell>{" "}
                      <TableCell style={tablecellstyle}>
                        {data.cancelOrder}
                      </TableCell>
                      
                    
                   </TableRow>
                   <TableRow>
                      <TableCell
                        style={tablecellstyle}
                    
                      >
                        Total Complementry
                      </TableCell>{" "}
                      <TableCell style={tablecellstyle}>
                        {data.complementry}
                      </TableCell>
                      
                    
                   </TableRow><TableRow>
                      <TableCell
                        style={tablecellstyle}
                      
                      >
                        Total Complementry Amt
                      </TableCell>{" "}
                      <TableCell style={tablecellstyle}>
                        {data.complementryAmount}
                      </TableCell>
                      
                    
                   </TableRow>
                  
                  </TableBody>
                </Table>
              </CardContent>
            </Card></>
  )
}