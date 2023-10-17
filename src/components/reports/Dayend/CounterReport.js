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
import { format } from "date-fns";
import NepaliDate from '../../../utils/NepaliDate';
export const CounterReport = (props) => {
  const data=props.data
    const tablecellstyle = {

        
        border: "none",padding:'1px' 
      };
  return (
   <>
       <div>
              <CardContent>
               
                <h3 style={{textAlign:'left'}}>{"Session Summary"}</h3>
 
        <Table>
        <TableBody>
                    <TableRow>
                      <TableCell
                         style={tablecellstyle}
                      
                      >
                        Session Date :
                      </TableCell>{" "}
                      <TableCell style={tablecellstyle}>
                        {format(new Date(data.sessionDate),"yyyy/MM/dd")}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                         style={tablecellstyle}
                      
                      >
                        Nepali Date :
                      </TableCell>{" "}
                      <TableCell style={tablecellstyle}>
                        {(data.sessionDate.slice(0,16))+" "+NepaliDate(data.sessionDate)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                       style={tablecellstyle}
                        
                      >
                        Login Date :
                      </TableCell>{" "}
                      <TableCell style={tablecellstyle} >
                        {data.loginDate.toLocaleString()}
                      </TableCell>
                    </TableRow> <TableRow>
                      <TableCell
                       style={tablecellstyle}
                       
                      >
                        Report By :
                      </TableCell>{" "}
                      <TableCell style={tablecellstyle}>
                        {data.reportBy}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        style={tablecellstyle}
                      
                      >
                     FiscalYear :
                      </TableCell>{" "}
                      <TableCell style={tablecellstyle}>
                        {data.fiscalyear}
                      </TableCell>
                    </TableRow>
                     <TableRow>
                      <TableCell
                        style={tablecellstyle}
                       
                      >
                        Total Bill No :
                      </TableCell>{" "}
                      <TableCell style={tablecellstyle}>
                        {data.totalBillNo}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        style={tablecellstyle}
                       
                      >
                        First Bill No :
                      </TableCell>{" "}
                      <TableCell style={tablecellstyle}>
                        {data.firstBillNo}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        style={tablecellstyle}
                       
                      >
                        Last Bill No :
                      </TableCell>{" "}
                      <TableCell style={tablecellstyle}>
                        {data.lastBillNo}
                      </TableCell>
                    </TableRow> <TableRow>
                      <TableCell
                        style={tablecellstyle}
                      
                      >
                      Total Bill Void :
                      </TableCell>{" "}
                      <TableCell style={tablecellstyle}>
                        {data.totalBillVoid}
                      </TableCell>
                    </TableRow>

                    </TableBody>

          </Table>
          </CardContent>
        </div>
     
        </>
  )
  }