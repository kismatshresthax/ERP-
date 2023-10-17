
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

export const Cash = (props) => {
  const data=props.data
  console.log(data)
    const tablecellstyle = {
        border: "none",padding:'1px' 
      };
  return (
    <>
     <Card>
              <CardContent>
                
                <h3 style={{textAlign:'left'}}>{"Cash Summary"}</h3>
                <Table>
                  <TableHead></TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell
                        style={tablecellstyle}
                       
                      >
                        Opening Balance
                      </TableCell>{" "}
                      <TableCell style={tablecellstyle}>
                        {data.openingBalance}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                       style={tablecellstyle}
                       
                      >
                        Cash
                      </TableCell>{" "}
                      <TableCell style={tablecellstyle}>
                        {data.cash}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                       style={tablecellstyle}
                       
                      >
                        Cash Drop
                      </TableCell>{" "}
                      <TableCell style={tablecellstyle}>
                        {data.cashDrop}
                      </TableCell>
                    </TableRow>{" "}
                    <TableRow>
                      <TableCell
                        style={tablecellstyle}
                      
                      >
                        Net Cash
                      </TableCell>{" "}
                      <TableCell style={tablecellstyle}>
                        {data.netCash}
                      </TableCell>
                    </TableRow>{" "}
                    <TableRow>
                      <TableCell
                        style={tablecellstyle}
                      
                      >
                        Credit Received
                      </TableCell>{" "}
                      <TableCell style={tablecellstyle}>
                        {data.creditRecivied}
                      </TableCell>
                      
                    
                   </TableRow>
                   <TableRow>
                      <TableCell
                        style={tablecellstyle}
                        
                      >
                        By Cash
                      </TableCell>{" "}
                      <TableCell style={tablecellstyle}>
                        {data.creditCash}
                      </TableCell>
                      
                    
                   </TableRow><TableRow>
                      <TableCell
                        style={tablecellstyle}
                       
                      >
                        By Card
                      </TableCell>{" "}
                      <TableCell style={tablecellstyle}>
                        {data.creditCard}
                      </TableCell>
                      
                    
                   </TableRow>
                   <TableRow>
                      <TableCell
                        style={tablecellstyle}
                       
                      >
                        By Esewa
                      </TableCell>{" "}
                      <TableCell style={tablecellstyle}>
                        {data.esewa}
                      </TableCell>
                      
                    
                   </TableRow>
                   <TableRow>
                      <TableCell
                        style={tablecellstyle}
                     
                      >
                        By FonePay
                      </TableCell>{" "}
                      <TableCell style={tablecellstyle}>
                        {data.fonePay}
                      </TableCell>
                      </TableRow>
                      <TableRow>
                      <TableCell
                        style={tablecellstyle}
                     
                      >
                        ClubCard
                      </TableCell>{" "}
                      <TableCell style={tablecellstyle}>
                        {data.clubCard}
                      </TableCell>
                    
                   </TableRow>
                  
                  </TableBody>
                </Table>
              </CardContent>
            </Card></>
  )
}