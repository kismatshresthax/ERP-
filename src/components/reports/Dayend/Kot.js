
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
export const Kot = (props) => {
  const data=props.data
    const tablecellstyle = {
        border: "none",padding:'1px' 
      };
  return (
    
      <>
  
              <CardContent>
               
                <h3 style={{textAlign:'left'}}>{"KOT Total"}</h3>

                <Table>
                  <TableHead></TableHead>
                  <TableBody>
                   
                    <TableRow>
                      <TableCell
                        sx={{ border: "none" ,padding:'2px'}}
                      
                      >
                        K1 :
                      </TableCell>{" "}
                      <TableCell style={tablecellstyle}>
                        {data.k1}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        style={tablecellstyle}
                      
                      >
                       K2 :
                      </TableCell>{" "}
                      <TableCell style={tablecellstyle}>
                        {data.k2}
                      </TableCell>
                    </TableRow>{" "}
                    <TableRow>
                      <TableCell
                   style={tablecellstyle}
                      >
                       K3 :
                      </TableCell>{" "}
                      <TableCell style={tablecellstyle}>
                        {data.k3}
                      </TableCell>
                    </TableRow>{" "}
                    <TableRow>
                      <TableCell
                        style={tablecellstyle}
                      
                      >
                       B1 :
                      </TableCell>{" "}
                      <TableCell style={tablecellstyle}>
                        {data.b1}
                      </TableCell>
                   </TableRow>
                   <TableRow>
                      <TableCell
                        style={tablecellstyle}
                      
                      >
                        B2 :
                      </TableCell>{" "}
                      <TableCell style={tablecellstyle}>
                        {data.b2}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        style={tablecellstyle}
                      
                      >
                        Total :
                      </TableCell>{" "}
                      <TableCell style={tablecellstyle}>
                        {parseFloat(data.b2)+parseFloat(data.b1)+parseFloat(data.k1)+parseFloat(data.k2)+parseFloat(data.k3)+parseFloat(data.k4 ||0)+parseFloat(data.k5 ||0)}
                      </TableCell>
                      </TableRow>
                      
                  
                  </TableBody>
                </Table>
                <p style={{textAlign:"center"}}> Taxes Are not Included Here</p>
              </CardContent>
          </>
  )
}