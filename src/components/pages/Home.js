import React from "react";

import Feature from "./Feature";
import Charts from "./Charts";

import "./dashboard.css";

import Category from "./Category/Category";
import TopProduct from "./SellingProduct/TopProduct"
import { Box, Grid } from "@mui/material";
import Purchase from "./Purchase/Purchase";
import Sales from "./Sales/Sales";
import Payment from "./Payment/Payment";
import TransactionSection from "./Transaction/TransactionSection";
import Stock from "./Stock/StockSection";
import CutomerBillSection from "./Customerbill/CutomerBillSection"
import SupplierBillSection from "./SupplierBill/SupplierBillSection"
import WidgetSection from "./Widget/WidgetSection";
export default function Home() {




  return (
 
      <div className="">
   
          <Box className="px-2 ">

          
       
            <WidgetSection />
          </Box>

          <div className="charts px-2">
              <Grid container spacing={2} className="py-2 d-flex flex-column flex-md-row">
              <Grid item xs={12} md={6}>
                <Feature />
              </Grid>
              <Grid item xs={12} md={6}>
                <Charts />
              </Grid>
            </Grid> 
             <Grid container spacing={2} className="py-2 d-flex flex-column flex-md-row">
              <Grid item xs={12} md={6}>
                <TopProduct />
              </Grid>
              <Grid item xs={12} md={6}>
                <Category />
              </Grid>
            </Grid>
            <Grid container spacing={2} className="py-2 d-flex flex-column flex-md-row">
              <Grid item xs={12} md={6}>
                < Purchase />
              </Grid>
              <Grid item xs={12} md={6}>
                <Sales />
              </Grid>
            </Grid>
            <Grid container className="py-2 d-flex flex-column flex-md-row">
              <Grid item xs={12}>
                <Payment />
              </Grid>
            </Grid>
            <Grid container rowSpacing={2} spacing={2} className="py-2 d-flex flex-column flex-md-row">
              <Grid item xs={12} sm={12} md={4}>
                <Stock />
              </Grid>
              <Grid item xs={12} sm={12} md={8}>
                <TransactionSection />
              </Grid>
            </Grid> 
            <Grid container rowSpacing={2} spacing={2} className="py-2 d-flex flex-column flex-md-row">
              <Grid item xs={12} sm={12} md={6}>
                <CutomerBillSection />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <SupplierBillSection />
              </Grid>
            </Grid>
          </div>
      

 
      </div>

     
  );
}
