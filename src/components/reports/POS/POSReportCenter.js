import React, { useState ,Effect} from "react";
import "./pos.css"
import { Route } from "react-router-dom";
// Material UI
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
const POSReportCenter = () => {
  return (
    <div>
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={4}>
        <div className="report-title mx-4">
          <h2>Purchase Report</h2>
          
          <ul className="list"
            style={{
              listStyle: "none",
       
              paddingRight: "30px",
            }}
          >
            <li>
              <Link to="/reports/purchase/report">Purchase Report By Date</Link>
            </li>
            <li>
            <Link to="/reports/purchase/detailreport">Purchase Detail Report By Date</Link> 
            </li>
         </ul>
        </div>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <div className=" report-title mx-4">
          <h2>Sales</h2>
          <ul
            style={{
              listStyle: "none",
             
              paddingRight: "30px",
            }}
          >
           
            <li>
              <Link to="/sales/salesreport"> Sales Report By Date</Link>
            </li>
         
            <li>
            <Link to="/sales/salesbydate">Sales Detail Report By Date</Link> 
            </li>
          </ul>
        </div>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <div className=" report-title mx-4">
          <h2>Ird Report</h2>
          <ul style={{ listStyle: "none", paddingRight: "30px" }}>
          <li>
              <Link to="/sales/vat/report">Vat Sales Report</Link>
            </li>
            <li>
            <Link to="/sales/materialized/report">Sales Materialized Report</Link> 
            </li>
            <li>
              <Link to="/reports/voidreport">Sales Void</Link>
            </li>
           
          
          </ul>
        </div>
      </Grid>
    
      <Grid item xs={12} sm={6} md={4}>
        <div className=" report-title mx-4">
          <h2>Stock</h2>
          <ul
            style={{
              listStyle: "none",
          
              paddingRight: "30px",
            }}
          >
          
           
            <li>
              <Link to="/inventory/StockDetailreport">Stock Detail Report</Link>
            </li>
          
          </ul>
        </div>
        </Grid>
  
        <Grid item xs={12} sm={6} md={4}>
        <div className=" report-title mx-4">
          <h2>Pos Report</h2>
          
          <ul
            style={{
              listStyle: "none",
       
              paddingRight: "30px",
            }}
          >
            <li>
              <Link to="/reports/posdayend">Pos Day End Report</Link>
            </li>
            <li>
              <Link to="/reports/posmatrix">Pos Matrix Report</Link>
            </li>
            <li>
              <Link to="/reports/posdayend">Pos  Report</Link>
            </li>
         </ul>
        </div>
      </Grid>
      
    </Grid>
  
  </div>
  )
}

export default POSReportCenter