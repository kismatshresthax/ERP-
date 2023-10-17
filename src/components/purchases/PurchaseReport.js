// import React, { useState } from "react";

// import { toast } from "react-toastify";

// // Material UI
// import { makeStyles } from "@material-ui/core/styles";

// import Grid from "@material-ui/core/Grid";
// import Card from "@material-ui/core/Card";
// import ReactToPrint from "react-to-print";

// import * as XLSX from "xlsx";
// import * as XlsxPopulate from "xlsx-populate/browser/xlsx-populate";

// import Controls from "../controls/Controls";


// import { useForm, Form } from "../../components/home/useForm";


// import axios from "axios";
// import config from "../../utils/config";

// import UserSessionContext from "../../contexts/UserSessionContext";
// import UserAuthenticationContext from "../../contexts/UserAuthenticationContext";
// import { format } from "date-fns";
// import CompanyContext from "../../contexts/CompanyContext";
// import PrintIcon from "@mui/icons-material/Print";
// import "date-fns";
// import ReportHeader from "../reports/ReportHeader";

// const useStyles = makeStyles((theme) => ({
//     header: {
//       backgroundColor: "white",
//       color: "#546e7a",
//       justifyContent: "left",
//       padding: "10px 0px",
//       fontWeight: "bold",
//     },
//     content: {
//       padding: 0,
//     },
//     status: {
//       marginRight: "5px",
//     },
//     actions: {
//       justifyContent: "flex-end",
//     },
//     summaryTable: {
//       width: "auto",
//       marginBottom: "10px",
//       pointerEvents: "none",
//     },
//     noBorder: {
//       border: "none",
//     },
//     denseCell: {
//       padding: "5px",
//     },
//     formControl: {
//       margin: theme.spacing(1),
//       minWidth: 120,
//     },
//     inputGroup: {
//       marginBottom: theme.spacing(1),
//     },
//   }));
  
  
//   const initialFValues = {
//     dateFrom: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
//     dateTo: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
//   };
  
//   export default function PurchaseReport() {
//     const componentRef = React.useRef(null);
  
//     const { values, handleInputChange } = useForm(initialFValues);
//     const userSessionContext = React.useContext(UserSessionContext);
//     // let history = useHistory();
//     const classes = useStyles();
//     const [records, setRecords] = useState([]);
//     const [Data, setData] = useState([]);
//     const [open, setOpen] = useState(false)
  
//     const [issubmit, setSubmit] = useState(false)
//     const [value, setValue] = React.useState('All');
  
//     const handleArrow = (e) => {
//       e.preventDefault();
//       setRecords([])
//       setSubmit(false)
  
  
//     }
//     const handleAll = () => {
//       setOpen(false)
  
  
//     }
//     const handleDate = () => {
//       setOpen(true)
  
  
//     }
//     const handleChange = (e) => {
//       setValue((e.target).value);
//     };
  
//     const permissionContext = React.useContext(UserAuthenticationContext);
  
//     const companyContext = React.useContext(CompanyContext);
  
  
  
//     var adbs = require("ad-bs-converter");
  
  
  
  
//     const handleSubmit = (e) => {
//       e.preventDefault();
//       setSubmit(true)
  
//       const data = {
//         dateFrom: format(new Date(values.dateFrom), "yyyy-MM-dd"),
//         dateTo: format(new Date(values.dateTo), "yyyy-MM-dd"),
//         companyId: companyContext.company.id,
//       };
  
//       let _data = {
//         dateFrom: format(new Date(data.dateFrom), "yyyy-MM-dd"),
//         dateTo: format(new Date(data.dateTo), "yyyy-MM-dd"),
//         companyId: companyContext.company.id
//       }
//       // console.log("first",companyId)
  
//       axios
//         .post(`${config.APP_CONFIG}/Purchase/PurchaseSummaryList/api`, data, {
//           headers: { Authorization: userSessionContext.token },
//         })
//         .then((res) => {
//           if (res.data.status_code === 200) {
//             setRecords(res.data.msg);
//             setSubmit(true)
  
  
//             axios.post(`${config.APP_CONFIG}/Purchase/PurchaseReturnData/api/byDate`, _data, { headers: { Authorization: userSessionContext.token, }, })
//               .then((res) => {
  
//                 if (res.data.status_code === 200) {
//                   setData(res.data.msg)
//                   setSubmit(true)
  
  
  
//                 } else if (res.data.status_code === 401) {
//                   userSessionContext.handleLogout();
  
//                 }
//                 else if (res.data.status_code === 400) {
//                   toast.warn(res.data.msg);
//                 } else {
//                   toast.error("Warning");
  
//                 }
//               })
//               .catch((err) => {
//                 toast.error("Error");
//               });
  
//           }
//           else if (res.data.status_code === 401) {
//             userSessionContext.handleLogout();
//           } else if (res.data.status_code === 400) {
//             toast.warn(res.data.msg);
//           } else {
//             toast.error("Warning");
//           }
//         })
//         .catch((err) => {
//           toast.error("Error ");
//         });
//     };
  
//     const quantity_total = records
//       .reduce((total, obj) => obj.quantity + total, 0)
//       .toFixed(2);
//     const totalsales_total = records
//       .reduce((total, obj) => obj.subtotal + total, 0)
//       .toFixed(2);
//     const discount_total = records
//       .reduce((total, obj) => obj.discount + total, 0)
//       .toFixed(2);
//     const Taxable_total = parseFloat(totalsales_total - discount_total).toFixed(
//       2
//     );
  
//     const tax_total = records
//       .reduce((total, obj) => obj.taxAmount + total, 0)
//       .toFixed(2);
  
//     //sales return 
//     const total_sales_return = Data
//       .reduce((total, obj) => obj.productsubtotal + total, 0)
//       .toFixed(2);
  
//     const total_discount_return = Data
//       .reduce((total, obj) => obj.discount + total, 0)
//       .toFixed(2);
  
//     const total_taxableamount_return = Data
//       .reduce((total, obj) => parseFloat(obj.productsubtotal - obj.discount) + total, 0)
//       .toFixed(2);
  
//     const total_vat_return = Data
//       .reduce((total, obj) => obj.taxAmount + total, 0)
//       .toFixed(2);
  
  
//     //granttotal
  
//     const grand_total = totalsales_total - total_sales_return;
//     const grand_total_discount = discount_total - total_discount_return;
//     const grand_total_taxableamount = Taxable_total - total_taxableamount_return;
//     const grand_total_vat = tax_total - total_vat_return;
  
  
  
  
  
//     //  let dr_total = records&&records.filter(x => {return x["dr_cr"].toLowerCase() === 'dr'} ).reduce((x,y) => {return x["amount"] + y["amount"]})
//     //  console.log(dr_total)
//     //  let cr_total = records&&records.filter(x => {return x["dr_cr"].toLowerCase() === 'cr'} ).reduce((x,y) => {return x["amount"] + y["amount"]})
//     //  if(cr_total>dr_total){
//     //      let profit=cr_total-dr_total
//     //  }
//     //  else{
//     //      let loss=dr_total-cr_total
//     //  }
//     // const profit=cr_total-dr_total
//     // const loss=dr_total-cr_total
  
//     //     const debitlist=records.filter( x => {return x["dr_cr"].toLowerCase()=== "dr" } )
  
//     //   //const dr_total=Math.round(debitlist.reduce((x,y) => {return x["amount"] + y["amount"]},0),2)
//     // const drtotal=Math.round(debitlist.reduce((total, obj) => obj.amount + total,0),2)
  
//     //     const creditList=records.filter( x => {return x["dr_cr"].toLowerCase()=== "cr" } )
  
//     //     //const cr_total=creditList.reduce((x,y) => {return x["amount"] + y["amount"]},0)
//     //     const crtotal=Math.round(creditList.reduce((total, obj) => obj.amount + total,0),2)
  
//     //       const profit=crtotal-drtotal
//     //          const loss=drtotal-crtotal
  
  
//     // REusable TAble
  
//     let table1 = [
//       {
//         A: "S.N.",
//         B: "Date",
//         C: "Miti",
//         D: "Invoice Number",
//         E: "Decleration Number",
//         F: "Supplier Name",
//         G: "Supplier PAN",
//         H: "Item Name",
//         I: "Quantity",
//         J: "Unit",
//         K: "Total Sales",
//         L: "Discount",
//         M: "Taxable Amount",
//         N: "VAT",
//         O: "Export Sales",
//         P: "Country",
//         Q: "Pragyapan Patra No.",
//         R: "Pragyapan Patra Miti",
//       },
//     ];
//     const table2 = records.map((item, index) =>
//       [{
//         A: index + 1,
//         B: format(new Date(item.recepitDate), "yyyy-MM-dd"),
//         C:NepaliDate(item.recepitDate),
//         D: item.vendorReference,
//         E: item.description,
//         F: item.vendorname,
//         G: item.panNo,
//         H: item.productName,
//         I: item.quantity,
//         J: item.unitName,
//         K: item.subtotal,
//         L: item.discount,
//         M: item.netTotal,
//         N: item.taxAmount,
//         O: item.expsales,
//         P: item.country,
//         Q: item.num,
//         R: item.pragmiti,
//       }]
//     )
//     const table3 = [{
//       A: "Total",
//       B: '',
//       C: '',
//       D: '',
//       E: '',
  
//       F: quantity_total,
//       G: "",
//       H: totalsales_total,
//       I: discount_total,
//       J: Taxable_total,
//       K: tax_total,
//       L:'',
//       M:'',
//       N:'',
  
  
  
  
//     }]
//     let table4 = [{
//       J: "Total",
//       K: -total_sales_return,
//       L: -total_discount_return,
//       M: -total_taxableamount_return,
//       N: -total_vat_return,
//     }]
  
  
  
//     let table5 = [{
//       J: "Grand Total",
//       K: grand_total,
//       L: grand_total_discount,
//       M: grand_total_taxableamount,
//       N: grand_total_vat,
  
//     }]
//     let TData=Data.map((item)=>
//     [{
//       B: format(new Date(item.returnDate), "yyyy/MM/dd  HH:mm:ss"),
//       C: NepaliDate(item.returnDate)
//       ,
//       D: item.refBillNo,
//       E: "",
//       F: item.customerName,
//       G: item.panNo,
//       H: item.productName,
//       I: item.quantity,
//       J: item.unitName,
//       K: "-" + item.subtotal,
//       L: "-" + item.discount,
//       M:"-" + parseFloat(item.productsubtotal - item.discount),
//       N: "-" + item.taxAmount,
//       O: item.expsales,
//       P: item.country,
//       Q: item.num,
//       R: item.pragmiti,
  
//     }]
//     )
  
  
   
//     //excel export
//     let Table1 = [
//       {
//         A: "S.N.",
//         B: "Date",
//         C: "Miti",
//         D: "Invoice Number",
//         E: "Decleration Number",
//         F: "Supplier Name",
//         G: "Supplier PAN",
//         H: "Item Name",
//         I: "Quantity",
//         J: "Unit",
//         K: "Total Sales",
//         L: "Discount",
//         M: "Taxable Amount",
//         N: "VAT",
//         O: "Export Sales",
//         P: "Country",
//         Q: "Pragyapan Patra No.",
//         R: "Pragyapan Patra Miti",
//       },
//     ];
//     records.map((item, index) => {
  
//       Table1.push({
//         A: index + 1,
//         B: format(new Date(item.recepitDate), "yyyy-MM-dd"),
//         C:NepaliDate(item.recepitDate),
//         D: item.vendorReference,
//         E: item.invoice_no,
//         F: item.vendorname,
//         G: item.panNo,
//         H: item.productName,
//         I: item.quantity,
//         J: item.unitName,
//         K: item.subtotal,
//         L: item.discount,
//         M: item.netTotal,
//         N: item.taxAmount,
//         O: item.expsales,
//         P: item.country,
//         Q: item.num,
//         R: item.pragmiti,
  
//       })
//     })
  
//     Table1.push({
//       A: "Total",
//       B: '',
//       C: '',
//       D: '',
//       E: '',
  
//       I: quantity_total,
//       G: "",
//       K: totalsales_total,
//       L: discount_total,
//       M: Taxable_total,
//       N: tax_total,
  
  
  
  
//     })
//     Data.map((item) => {
//       Table1.push({
  
//         B: format(new Date(item.returnDate), "yyyy/MM/dd  HH:mm:ss"),
//         C: NepaliDate(item.returnDate)
//         ,
//         D: item.refBillNo,
//         E: "",
//         F: item.customerName,
//         G: item.panNo,
//         H: item.productName,
//         I: item.quantity,
//         J: item.unitName,
//         K: item.subtotal,
//         L: item.discount,
//         M: item.netTotal,
//         N: item.taxAmount,
//         O: item.expsales,
//         P: item.country,
//         Q: item.num,
//         R: item.pragmiti,
//       })
  
//     })
//     Table1 = (Table1).concat(table4).concat(table5);
  
  
//     console.log("detail", Data)
//     return (
  
  
  
//       <div
//         className="content-wrapper iframe-mode"
//         data-widget="iframe"
//         data-loading-screen={750}
//       >
//         {issubmit === false ?
  
//           <div>
//             <ReportHeader title="Purchase Detail Report" />
//             <Form onSubmit={handleSubmit}>
//               <Grid container direction="row">
//                 <Grid item lg={12} md={12} xs={12}>
  
//                   <Card>
//                     <Grid container>
//                       <Grid item xs={12} sm={4}>
//                         <Controls.DatePicker
//                           name="dateFrom"
//                           label="DateFrom"
//                           value={values.dateFrom}
//                           onFocus={e => e.target.blur()}
//                           onChange={handleInputChange}
//                         />
//                       </Grid>
//                       <Grid item xs={12} sm={4}>
//                         <Controls.DatePicker
//                           name="dateTo"
//                           label="DateTo"
//                           value={values.dateTo}
//                           onFocus={e => e.target.blur()}
//                           onChange={handleInputChange}
//                         />
//                       </Grid>
//                       <Grid item xs={12} sm={4} style={{ display: "flex" }}>
//                         <Controls.Button type="submit" text="Submit" />
//                       </Grid>
//                     </Grid>
//                   </Card>
  
//                 </Grid>
//               </Grid>
//             </Form>
//           </div>
  
//           : null}
  
  
  
  
//         {records.length !== 0 ? (
//           <>
//             <Button onClick={(e) => handleArrow(e)}><ArrowBackIcon /></Button>
  
  
  
  
//           </>
  
//         ) : null}
  
//         {records.length !== 0 ? (
//           <div>
//             <div style={{ textAlign: "right" }}>
  
  
//               <FormControl>
  
  
//                 <RadioGroup
//                   row
  
//                   value={value}
//                   onChange={handleChange}
  
//                 >
//                   <FormControlLabel value="All" control={<Radio />} label="All" onClick={handleAll} />
//                   <FormControlLabel value="Filter" control={<Radio />} label="Filter by date" onClick={handleDate} />
  
  
//                 </RadioGroup>
//               </FormControl>
  
  
//               <Button>
  
//                 <ExcelSheet
//                   data={[Table1]}
//                   title="Purchases Report Format" />
//               </Button>
  
//               <ReactToPrint
//                 pageStyle={"@page{size: landscape;}"}
//                 // trigger={() => <button  className="printBtn" <Printicon/> style={{float: "right", left: "40px"}}>Print</button>}
//                 trigger={() => (
//                   <Controls.Button
//                     text="Print"
//                     variant="outlined"
//                     startIcon={<PrintIcon />}
//                     className="printBtn"
//                   />
//                 )}
//                 content={() => componentRef.current}
//               />
//             </div>
//             <div ref={componentRef} className="purchaseReport">
//               <div className="reportPage">
//                 <div className="reportHeader">
//                   <p className="companyName">{companyContext.company.name}</p>
//                   <p className="companyAddress">
//                     {companyContext.company.address || ""}
//                   </p>
//                   <p className="companyPan">
//                     Pan No : {companyContext.company.panNo}
//                   </p>
  
//                   <p className="companyReport">Purchases Report Format</p>
//                   <div className="date">
  
//                     <p>
//                       From:{" "}
//                       {format(
//                         new Date(values.dateFrom),
//                         "yyyy/MM/dd"
//                       ).toString() +
//                         " (" +
//                         NepaliDate(values.dateFrom) +
//                         " B.S.)"}
//                     </p>
//                     <p>
  
  
//                       To:{" "}
//                       {format(new Date(values.dateTo), "yyyy/MM/dd").toString() +
//                         " (" +
//                         NepaliDate(values.dateTo) +
//                         " B.S.)"}
//                     </p>
//                   </div>
//                 </div>
//                 {TData.length==0?
//                 <>
//                               {open ? <DateGroupedTables records={records} table1={table1} table2={table2} /> : <PurchasedetailTable records={records} table1={table1} table2={table2} table3={table3} table4={table4} table5={table5} />}</>
                
//                 : <>{open ? <DateGroupedTables records={records} table1={table1} table2={table2} /> : <PurchasedetailTable records={records} table1={table1} table2={table2} table3={table3} table4={table4} table5={table5} TData={TData} />} </>}
  
  
  
  
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="reportNotFound">
//             <p>No records to display</p>
//           </div>
//         )}
  
//       </div>
//     );
//   }