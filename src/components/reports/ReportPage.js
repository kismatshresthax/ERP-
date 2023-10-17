// import React, { useState ,Effect} from "react";
// import "./reportstyle.css"
// import { Route } from "react-router-dom";
// // Material UI
// import { Link } from "react-router-dom";
// import Grid from "@material-ui/core/Grid";

// //import { useHistory } from "react-router-dom/cjs/react-router-dom.min";






// function ReportPage(props) {
//   const [NewPopup,setIsNewPopup]=React.useState(false)
//   return (
   
//     <div>
//   <Grid container spacing={3}>
//     <Grid item xs={12} sm={6} md={4}>
//       <div className="report-title mx-4">
//         <h2>Purchase Report</h2>
        
//         <ul className="list"
//           style={{
//             listStyle: "none",
     
//             paddingRight: "30px",
//           }}
//         >
//           <li>
//             <Link to="/reports/purchase/report">Purchase Report By Date</Link>
//           </li>
//           <li>
//           <Link to="/reports/purchase/detailreport">Purchase Detail Report By Date</Link> 
//           </li>
//        </ul>
//       </div>
//     </Grid>
//     <Grid item xs={12} sm={6} md={4}>
//       <div className="report-title mx-4">
//         <h2>Sales</h2>
//         <ul className="list"
//           style={{
//             listStyle: "none",
           
//             paddingRight: "30px",
//           }}
//         >
         
//           <li>
//             <Link to="/sales/salesreport"> Sales Report By Date</Link>
//           </li>
       
//           <li>
//           <Link to="/sales/salesbydate">Sales Detail Report By Date</Link> 
//           </li>
//         </ul>
//       </div>
//     </Grid>
//     <Grid item xs={12} sm={6} md={4}>
//       <div className=" report-title mx-4">
//         <h2>Ird Report</h2>
//         <ul className="list" style={{ listStyle: "none", paddingRight: "30px" }}>
//         <li>
//             <Link to="/sales/vat/report">Vat Sales Report</Link>
//           </li>
//           <li>
//           <Link to="/sales/materialized/report">Sales Materialized Report</Link> 
//           </li>
//           <li>
//             <Link to="/reports/voidreport">Sales Void</Link>
//           </li>
//           <li>
//             <Link to="/reports/purchase/report">Purchase Register</Link>
//           </li>
//           <li>
//           <Link to="/purchase/purchase_return">Purchase Return Register</Link> 
//           </li>
         
        
//         </ul>
//       </div>
//     </Grid>
//     <Grid item xs={12} sm={6} md={4}>
//       <div className="report-title mx-4">
//         <h2>Accounting</h2>
//         <ul className="list"
//           style={{
//             listStyle: "none",
        
//             paddingRight: "30px",
//           }}
//         >
         

//           <li>
//             <Link to="/accounting/ledgerreportingpage"> General Ledger Summary</Link>
//           </li>
//           <li>
//           <Link to="/accounting/trialreporting">Trial Balance Report</Link> 
//           </li>
//           <li>
//             <Link to="/accounting/reporting/plreport">Profit and Loss Report</Link>
//           </li>
//           <li>
//           <Link to="/accounting/reporting/blreport">Balance Sheet</Link> 
//           </li>
//         </ul>
//       </div>
//     </Grid>
//     <Grid item xs={12} sm={6} md={4}>
//       <div className=" report-title mx-4">
//         <h2>Stock</h2>
//         <ul className="list"
//           style={{
//             listStyle: "none",
        
//             paddingRight: "30px",
//           }}
//         >
//           <li>
//             <Link to="/inventory/Storestock"> Warehouse Summary</Link>
//           </li>
//           <li>
//           <Link to="/inventory/stocklogreport">Stock Log</Link> 
//           </li>
//           <li>
//             <Link to="/inventory/StockDetailreport">Stock Detail Report</Link>
//           </li>
//           <li>
//           <Link to="/inventory/stock/transfer">Stock Transfer</Link> 
//           </li>
//           <li>
//           <Link to="/inventory/stock/adjust">Stock Adjust</Link> 
//           </li>
//         </ul>
//       </div>
//       </Grid>

//       <Grid item xs={12} sm={6} md={4}>
//       <div className="report-title mx-4">
//         <h2>Pos Report</h2>
        
//         <ul className="list"
//           style={{
//             listStyle: "none",
     
//             paddingRight: "30px",
//           }}
//         >
//           <li>
//             <Link to="/reports/posdayend">Pos Day End Report</Link>
//           </li>
//           <li>
//             <Link to="/reports/posmatrix">Pos Matrix Report</Link>
//           </li>
//           <li>
//             <Link to="/reports/posdayend">Pos  Report</Link>
//           </li>
//        </ul>
//       </div>
//     </Grid>
//       <Grid item xs={12} sm={6} md={4}>
//       <div className="report-title mx-4">
//         <h2>System Log</h2>
//         <ul
//           style={{
//             listStyle: "none",
        
//             paddingRight: "30px",
//           }}
//         >
//           <li>
//             <Link to="/">Activity Log</Link>
//           </li>
//           <li>
//           <Link to="/">User Access Log</Link> 
//           </li>
          
//         </ul>
//       </div>
//       </Grid>
//   </Grid>

// </div>
//   )
// }

// export default ReportPage

import React, { useState, Effect } from "react";
import "./reportstyle.css"
// Material UI
import { Link } from "react-router-dom";

import { Box, Paper } from "@material-ui/core";
import { HiOutlineDocumentReport } from "react-icons/hi"
//import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { GiPayMoney } from "react-icons/gi"
import { HiMiniBuildingLibrary } from 'react-icons/hi2'
import { MdOutlineAccountBalanceWallet } from 'react-icons/md'
import { AiOutlineStock } from 'react-icons/ai'
import { TbReportSearch } from 'react-icons/tb'
import { BiDesktop } from 'react-icons/bi'
import {GoDotFill} from 'react-icons/go'
import {FaGripLinesVertical} from 'react-icons/fa'
function ReportPage(props) {
  const [NewPopup, setIsNewPopup] = React.useState(false)

  const [purchase, setIsPurchase] = useState(false)
  const [sales, setIsSales] = useState(false)
  const [IRD, setIRD] = useState(false)
  const [account, setAccount] = useState(true)
  const [stock, setStock] = useState(false)
  const [pos, setPos] = useState(false)
  const [system, setSystem] = useState(false)
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
     setIsHover(true);
  };
  const handleMouseLeave = () => {
     setIsHover(false);
  };

 const active = 'fs-1 p-1 rounded-circle bg-primary text-white'
  const inactive = 'fs-1 p-1 rounded-circle bg-secondary text-white'

 

  const purchaseHandler = () => {
    setIsPurchase(true)
    setIsSales(false)
    setIRD(false)
    setAccount(false)
    setStock(false)
    setPos(false)
    setSystem(false)
  }
  const salesHandler = () => {
    setIsSales(true)
    setIsPurchase(false)
    setIRD(false)
    setAccount(false)
    setStock(false)
    setPos(false)
    setSystem(false)
  }
  const IRDhandler = () => {
    setIRD(true)
    setIsPurchase(false)
    setIsSales(false)
    setAccount(false)
    setStock(false)
    setPos(false)
    setSystem(false)
  }
  const accountHandler = () => {
    setIRD(false)
    setIsPurchase(false)
    setIsSales(false)
    setAccount(true)
    setStock(false)
    setPos(false)
    setSystem(false)
  }
  const stockHandler = () => {
    setIRD(false)
    setIsPurchase(false)
    setIsSales(false)
    setAccount(false)
    setStock(true)
    setPos(false)
    setSystem(false)
  }
  const posHandler = () => {
    setIRD(false)
    setIsPurchase(false)
    setIsSales(false)
    setAccount(false)
    setStock(false)
    setPos(true)
    setSystem(false)
  }
  const systemHandler = () => {
    setIRD(false)
    setIsPurchase(false)
    setIsSales(false)
    setAccount(false)
    setStock(false)
    setPos(false)
    setSystem(true)
  }
  return (

   
      <>
      {/* <p className="fs-3 mx-auto fw-bold d-flex justify-content-center">Report Center</p> */}
      <Paper elevation={3} className="px-4 py-4 w-100 mx-auto d-flex flex-row py-auto">

        <div className="d-flex flex-column w-25 gap-4 ">
        <div className="d-flex flex-row justify-content-between align-items-center ps-2" onClick={accountHandler} style={{ cursor: 'pointer', backgroundColor: !account ? 'transparent' : '#e5e5e5', }}  >
          <span className="d-flex flex-row gap-3  py-1 ">
            <MdOutlineAccountBalanceWallet className={account ? active : inactive}  />
            <h5 className="my-auto"> Accounting</h5>
          </span>
          {account ? <div style={{height:'100%',border: '3px solid 	#32cd32	'}}></div> : null}
          </div>
          <div className="d-flex flex-row justify-content-between align-items-center ps-2" onClick={purchaseHandler} style={{ cursor: 'pointer', backgroundColor: !purchase ? 'transparent' : '#e5e5e5', }}  >
            <span className="d-flex flex-row gap-3 py-1">
            <HiOutlineDocumentReport className={purchase ? active : inactive} />
            <h5 className="my-auto">Purchase Report</h5>
            </span>
           {purchase ? <div style={{height:'100%',border: '3px solid 	#32cd32	'}}></div> : null}
          </div>

          <div className="d-flex flex-row justify-content-between align-items-center ps-2" onClick={salesHandler} style={{ cursor: 'pointer', backgroundColor: !sales ? 'transparent' : '#e5e5e5', }}  >
          <span className="d-flex flex-row gap-3 py-1 ">
            <GiPayMoney className={sales ? active : inactive}  />
            <h5 className="my-auto">Sales</h5>
          </span>
          {sales ? <div style={{height:'100%',border: '3px solid 	#32cd32	'}}></div> : null}
          </div>

          <div className="d-flex flex-row justify-content-between align-items-center ps-2" onClick={IRDhandler} style={{ cursor: 'pointer', backgroundColor: !IRD ? 'transparent' : '#e5e5e5', }}  >
          <span className="d-flex flex-row gap-3  py-1 " >
            <HiMiniBuildingLibrary className={IRD ? active : inactive}  />
            <h5 className="my-auto">IRD Report</h5>
          </span>
          {IRD ? <div style={{height:'100%',border: '3px solid 	#32cd32	'}}></div> : null}
          </div>

       

          <div className="d-flex flex-row justify-content-between align-items-center ps-2" onClick={stockHandler} style={{ cursor: 'pointer', backgroundColor: !stock ? 'transparent' : '#e5e5e5', }}  >
          <span className="d-flex flex-row gap-3  py-1 " >
            <AiOutlineStock className={stock ? active : inactive}  />
            <h5 className="my-auto">Stock</h5>
          </span >
          {stock ? <div style={{height:'100%',border: '3px solid 	#32cd32	'}}></div> : null}
          </div>

          <div className="d-flex flex-row justify-content-between align-items-center ps-2" onClick={posHandler} style={{ cursor: 'pointer', backgroundColor: !pos ? 'transparent' : '#e5e5e5', }}  >
          <span className="d-flex flex-row gap-3  py-1 " >
            <TbReportSearch className={pos ? active : inactive}  />
            <h5 className="my-auto">POS Report</h5>
          </span>
          {pos ? <div style={{height:'100%',border: '3px solid 	#32cd32	'}}></div> : null}
          </div>

          <div className="d-flex flex-row justify-content-between align-items-center ps-2" onClick={systemHandler} style={{ cursor: 'pointer', backgroundColor: !system ? 'transparent' : '#e5e5e5', }}  >
          <span className="d-flex flex-row gap-3  py-1 " >
            <BiDesktop className={system ? active : inactive}  />
            <h5 className="my-auto">System Log</h5>
          </span>
          {system ? <div style={{height:'100%',border: '3px solid 	#32cd32	'}}></div> : null}
          </div>

        </div>
        <div style={{ border: '1px solid #a6a6a6', height: '320' }} ></div>

        <div>
        {
            account &&
            <span>
              <ul
                style={{
                  listStyle: "none",

                  paddingRight: "30px",
                }}
                className="d-flex flex-column gap-3 under"
              >


                <li>
                  <Link to="/accounting/ledgerreportingpage" className='text-black text-decoration-none fs-6 align-items-center d-flex gap-2' ><MdOutlineAccountBalanceWallet className="fs-3"/> General Ledger Summary</Link>
                </li>
                <li>
                  <Link to="/accounting/trialreporting" className='text-black text-decoration-none fs-6 align-items-center d-flex gap-2'><MdOutlineAccountBalanceWallet className="fs-3"/> Trial Balance Report</Link>
                </li>
                <li>
                  <Link to="/accounting/reporting/plreport" className='text-black text-decoration-none fs-6 align-items-center d-flex gap-2'><MdOutlineAccountBalanceWallet className="fs-3"/> Profit and Loss Report</Link>
                </li>
                <li>
                  <Link to="/accounting/reporting/blreport" className='text-black text-decoration-none fs-6 align-items-center d-flex gap-2'><MdOutlineAccountBalanceWallet className="fs-3"/> Balance Sheet</Link>
                </li>
              </ul>
            </span>
          }
          {
            purchase &&
            <span>
              <ul
                style={{
                  listStyle: "none",

                  paddingRight: "30px",
                }}
                className="d-flex flex-column gap-3 under"
              >
                <li >
                  <Link to="/reports/purchase/report"  className='text-black text-decoration-none fs-6 align-items-center d-flex gap-2 '><HiOutlineDocumentReport  className="fs-3"/>Purchase Report By Date</Link>
                </li>
                <li>
                  <Link to="/reports/purchase/detailreport" className='text-black text-decoration-none fs-6 align-items-center d-flex gap-2 '><HiOutlineDocumentReport className="fs-3" />Purchase Detail Report By Date</Link>
                </li>
              </ul>
            </span>
          }
          {
            sales &&
            <span>
              <ul
                style={{
                  listStyle: "none",

                  paddingRight: "30px",
                }}
                className="d-flex flex-column gap-3 under"
              >
                <li>
                  <Link to="/sales/salesreport" className='text-black text-decoration-none fs-6 align-items-center d-flex gap-2'><GiPayMoney className="fs-3"/> Sales Report By Date</Link>
                </li>

                <li>
                  <Link to="/sales/salesbydate" className='text-black text-decoration-none fs-6 align-items-center d-flex gap-2'><GiPayMoney className="fs-3"/>Sales Detail Report By Date</Link>
                </li>
              </ul>
            </span>
          }
          {
            IRD &&
            <span>
              <ul style={{ listStyle: "none", paddingRight: "30px" }}
                className="d-flex flex-column gap-3 under">
                <li>
                  <Link to="/sales/vat/report" className='text-black text-decoration-none fs-6 align-items-center d-flex gap-2'><HiMiniBuildingLibrary className="fs-3"/>Vat Sales Report</Link>
                </li>
                <li>
                  <Link to="/sales/materialized/report" className='text-black text-decoration-none fs-6 align-items-center d-flex gap-2'><HiMiniBuildingLibrary className="fs-3"/>Sales Materialized Report</Link>
                </li>
                <li>
                  <Link to="/reports/voidreport" className='text-black text-decoration-none fs-6 align-items-center d-flex gap-2'><HiMiniBuildingLibrary className="fs-3"/>Sales Void</Link>
                </li>
                <li>
                  <Link to="/reports/purchase/report" className='text-black text-decoration-none fs-6 align-items-center d-flex gap-2'><HiMiniBuildingLibrary className="fs-3"/>Purchase Register</Link>
                </li>
                <li>
                  <Link to="/purchase/purchase_return" className='text-black text-decoration-none fs-6 align-items-center d-flex gap-2'><HiMiniBuildingLibrary className="fs-3"/>Purchase Return Register</Link>
                </li>
              </ul>
            </span>
          }
       
          {
            stock &&
            <span>
              <ul
                style={{
                  listStyle: "none",

                  paddingRight: "30px",
                }}
                className="d-flex flex-column gap-3 under"
              >
                <li>
                  <Link to="/inventory/Storestock" className='text-black text-decoration-none fs-6 align-items-center d-flex gap-2'><AiOutlineStock className="fs-3"/> Warehouse Summary</Link>
                </li>
                <li>
                  <Link to="/inventory/stocklogreport" className='text-black text-decoration-none fs-6 align-items-center d-flex gap-2'><AiOutlineStock className="fs-3"/> Stock Log</Link>
                </li>
                <li>
                  <Link to="/inventory/StockDetailreport" className='text-black text-decoration-none fs-6 align-items-center d-flex gap-2'><AiOutlineStock className="fs-3"/> Stock Detail Report</Link>
                </li>
                <li>
                  <Link to="/inventory/stock/transfer" className='text-black text-decoration-none fs-6 align-items-center d-flex gap-2'><AiOutlineStock className="fs-3"/> Stock Transfer</Link>
                </li>
                <li>
                  <Link to="/inventory/stock/adjust" className='text-black text-decoration-none fs-6 align-items-center d-flex gap-2'><AiOutlineStock className="fs-3"/> Stock Adjust</Link>
                </li>
              </ul>
            </span>
          }
          {
            pos &&
            <span>
              <ul
                style={{
                  listStyle: "none",

                  paddingRight: "30px",
                }}
                className="d-flex flex-column gap-3 under"
              >
                <li>
                  <Link to="/reports/posdayend" className='text-black text-decoration-none fs-6 align-items-center d-flex gap-2'><TbReportSearch className="fs-3"/>Pos Day End Report</Link>
                </li>
                <li>
                  <Link to="/reports/matrix" className='text-black text-decoration-none fs-6 align-items-center d-flex gap-2'><TbReportSearch className="fs-3"/>Matrix Report</Link>
                </li>

              </ul>
            </span>
          }
          {
            system &&
            <span>
              <ul
                style={{
                  listStyle: "none",

                  paddingRight: "30px",
                }}
                className="d-flex flex-column gap-3 under"
              >
                <li>
                  <Link to="/" className='text-black text-decoration-none fs-6 align-items-center d-flex gap-2'><BiDesktop className="fs-3"/>Activity Log</Link>
                </li>
                <li>
                  <Link to="/" className='text-black text-decoration-none fs-6 align-items-center d-flex gap-2'><BiDesktop className="fs-3"/>ActivityUser Access Log</Link>
                </li>

              </ul>
            </span>
          }
        </div>
      </Paper>
      </>
  )
}

export default ReportPage