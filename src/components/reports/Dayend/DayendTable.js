import React,{useState,useRef} from 'react'

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import { CounterReport } from './CounterReport';
import { Salesummary } from './Salesummary';
import { Cash } from './Cash';
import { Kot } from './Kot';
import { Order } from './Order';
import PrintIcon from "@mui/icons-material/Print";
import Controls from '../../controls/Controls';
import "date-fns";
import CompanyContext from '../../../contexts/CompanyContext';
import ReactToPrint from 'react-to-print';
 const DayendTable = (props) => {
  const currentDate = new Date().toLocaleDateString(); // Get the current date
  const currentTime = new Date().toLocaleTimeString(); // Get the current time

  const componentRef = React.useRef(null);
  const companyContext = React.useContext(CompanyContext);
  const data=props.data
    const tablecellstyle = {
        border: "none",padding:'1px' 
      };
  return (
  
   <>
    
           

       
  
             




    <div style={{marginBottom:"10px",paddingLeft:"16px"}}>

<ReactToPrint
           
           trigger={() => (
             <Controls.Button
           
              
               startIcon={<PrintIcon />}
               className="printBtn"
             />
           )}
           content={() => componentRef.current}
         />  
    </div>
           
      
 
            <div ref={componentRef} className="purchaseReport">
          <div className="reportPage">
              <div className="reportHeader">
              <p className="companyName">{companyContext.company.name}</p>
                <p className="companyAddress">
                  {companyContext.company.address || ""}
                </p>
                <p className="companyPan">
                  Pan No : {companyContext.company.panNo}
                 </p>
                
                   </div>
                   <span style={{display:"flex",justifyContent:"center" ,alignItems:"center",fontSize:"25px",fontWeight:"Bold"}}>Close Counter Report</span>
              </div>
             
        
          
           
    <Grid container rowSpacing={0.2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

          <Grid  item xs={6} sx={{paddingLeft:'8%'}} >
       
       <CounterReport data={data}/>

        </Grid>
         <Grid item xs={6} sx={{paddingLeft:'8%'}} >
         <Kot data={data}/>
          
          </Grid>

         </Grid>
    

         <Grid container rowSpacing={0.5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6} sx={{paddingLeft:'1%' ,mb:"-2px"}}>
          <Salesummary data={data}/>
         
         
          </Grid>
          <Grid item xs={6} sx={{paddingLeft:'1%' ,mb:"-2px"}} >
          <Cash data={data}/>
          
          </Grid>
          </Grid>

        <Grid container rowSpacing={0.5} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
          <Grid item xs={5} sx={{paddingLeft:'1%' ,mb:"-2px"}} >
          <Order data={data}/>
        
          </Grid>
           {/* <Grid item xs={3.5} >
            <Card sx={{ margin: "20px",border:'1px solid black' }}>
              <CardContent>
              
                <h3 style={{textAlign:'center'}}>{"Order Summary"}</h3>

                <Table>
                  <TableHead></TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell
                        style={tablecellstyle}
                     
                      >
                        Login Date
                      </TableCell>{" "}
                      <TableCell sx={{ border: "none" ,padding:'2px'}}>
                        {data.loginDate}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                       style={tablecellstyle}
                      
                      >
                        Sub Total
                      </TableCell>{" "}
                      <TableCell style={tablecellstyle}>
                        {data.bill}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                       style={tablecellstyle}
                       
                      >
                        Total Discount
                      </TableCell>{" "}
                      <TableCell style={tablecellstyle}>
                        {data.counter}
                      </TableCell>
                    </TableRow>{" "}
                    <TableRow>
                      <TableCell
                        style={tablecellstyle}
                      
                      >
                        Total Tax
                      </TableCell>{" "}
                      <TableCell style={tablecellstyle}>
                        {data.opening}
                      </TableCell>
                    </TableRow>{" "}
                    <TableRow>
                      <TableCell
                        style={tablecellstyle}
                      
                      >
                        Sales By Cash
                      </TableCell>{" "}
                      <TableCell style={tablecellstyle}>
                        {data.cash}
                      </TableCell>
                   </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid> <Grid item xs={3.5} >
           
          
          
          </Grid> */}
        
    
        </Grid>
        <div style={{display:'flex', justifyContent: 'space-between', marginTop: '35px', alignContent:'center'}}>
<div style={{width:'200px', textAlign:'center'}}>    
<span>-------------------</span><br />

<span>Prepared By:</span><br />

</div>
<div style={{width:'200px', textAlign:'center'}}>
<span>-------------------</span><br />
<span>Approved By:</span><br />
</div>
</div>
<div style={{width:'300px', textAlign:'left',marginTop: '5px'}}>

  <p className="date-time">Printed on {currentDate} at {currentTime} by {localStorage.getItem('user')} </p>
</div>
</div>
   </>
  )
}
export default DayendTable;