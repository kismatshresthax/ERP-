// import React, { useState } from "react";
// import { toast } from "react-toastify";

// // Material UI
// import { makeStyles } from "@material-ui/core/styles";
// import Grid from "@material-ui/core/Grid";
// import Card from "@material-ui/core/Card";
// import Controls from "../controls/Controls";
// import CardContent from "@material-ui/core/CardContent";

// import { useForm, Form } from "../../components/home/useForm";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
// import Paper from "@material-ui/core/Paper";
// import TableContainer from "@material-ui/core/TableContainer";


// import * as XLSX from "xlsx";
// import * as XlsxPopulate from "xlsx-populate/browser/xlsx-populate";
// //import ReactExport from "react-export-excel";
// import axios from "axios";
// import config from "../../utils/config";
// //import UserAuthenticationContext from "../../contexts/UserAuthenticationContext";
// import UserSessionContext from "../../contexts/UserSessionContext";
// import CompanyContext from "../../contexts/CompanyContext";
// import { format } from "date-fns";
// //import * as XLSX from 'xlsx/xlsx.mjs';
// import ReactToPrint from "react-to-print";
// import PrintIcon from "@mui/icons-material/Print";
// import ReportHeader from "../reports/ReportHeader";
// const useStyles = makeStyles((theme) => ({
//   header: {
//     backgroundColor: "white",
//     color: "#546e7a",
//     justifyContent: "left",
//     padding: "10px 0px",
//     fontWeight: "bold",
//   },
//   content: {
//     padding: 0,
//   },
//   status: {
//     marginRight: "5px",
//   },
//   actions: {
//     justifyContent: "flex-end",
//   },
//   summaryTable: {
//     width: "auto",
//     marginBottom: "10px",
//     pointerEvents: "none",
//   },
//   noBorder: {
//     border: "none",
//   },
//   denseCell: {
//     padding: "5px",
//   },
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120,
//   },
//   inputGroup: {
//     marginBottom: theme.spacing(1),
//   },
// }));
// const initialFValues = {
//   dateFrom: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
//   dateTo: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
// };

// export default function BLreport() {
  
//   const { values, handleInputChange } = useForm(initialFValues);
//   const componentRef = React.useRef(null);
//   const classes = useStyles();
//   const [records, setRecords] = useState([]);
//   const userSessionContext = React.useContext(UserSessionContext);
//   const companyContext = React.useContext(CompanyContext);
//   //const permissionContext=React.useContext(UserAuthenticationContext);
//   //let Permission = permissionContext.permissions;

//   //let curr_mod_permission =Permission.filter( x=>{return x["module_name"].toLowerCase() === "accounting"})
//   //let userPermission= curr_mod_permission[0]


//   const handleSubmit = e => {
//     e.preventDefault()
//     BLreport(values)
//   }
//   const BLreport = (data) => {

//     let _data = {
//       dateFrom: format(new Date(data.dateFrom), "yyyy-MM-dd"),
//       dateTo: format(new Date(data.dateTo), "yyyy-MM-dd"),
//       companyId: companyContext.company.id
//     }
    
//     axios.post(`${config.APP_CONFIG}/Account/balanceSheetReport/api`, _data, { headers: { Authorization: userSessionContext.token, }, })
//       .then((res) => {

//         if (res.data.status_code === 200) {
//           if(res.data.msg.length<1){
//             toast.warn("No Records")
//           }
//           else{
//           setRecords(res.data.msg);
//           }


//         } else if (res.data.status_code === 401) {
//           userSessionContext.handleLogout();

//         }
//         else if (res.data.status_code === 400) {
//           toast.warn(res.data.msg);
//         } else {
//           toast.error("Warning");

//         }
//       })
//       .catch((err) => {
//         toast.error("Error");


//       });

//   }
 
//   const debitlist = records.filter(x => { return x["dr_cr"].toLowerCase() === "dr" })
//   // const dr_total=debitlist.reduce((x,y) => {return x["amount"] + y["amount"]},0)
//   const drtotal = Math.round(debitlist.reduce((total, obj) => obj.amount + total, 0), 2)

//   const creditList = records.filter(x => { return x["dr_cr"].toLowerCase() === "cr" })
//   // const cr_total=creditList.reduce((x,y) => {return x["amount"] + y["amount"]},0)
//   const crtotal = Math.round(creditList.reduce((total, obj) => obj.amount + total, 0), 2)
  
//   const profit=crtotal-drtotal
//   const loss=drtotal-crtotal
 

//     //excelexport

//     const createDownLoadData = () => {
//       handleExport().then((url) => {
    
//         const downloadAnchorNode = document.createElement("a");
//         downloadAnchorNode.setAttribute("href", url);
//         downloadAnchorNode.setAttribute("download", "bl_report.xlsx");
//         downloadAnchorNode.click();
//         downloadAnchorNode.remove();
//       });
//     };

//     const workbook2blob = (workbook) => {
//       const wopts = {
//         bookType: "xlsx",
//         bookSST: false,
//         type: "binary",
//       };

//       const wbout = XLSX.write(workbook, wopts);
//       const blob = new Blob([s2ab(wbout)], {
//         type: "application/octet-stream",
//       });

//       return blob;
//     };

//     const s2ab = (s) => {
//       // The ArrayBuffer() constructor is used to create ArrayBuffer objects.
//       // create an ArrayBuffer with a size in bytes
//       const buf = new ArrayBuffer(s.length);


//       //create a 8 bit integer array
//       const view = new Uint8Array(buf);

//       //charCodeAt The charCodeAt() method returns an integer between 0 and 65535 representing the UTF-16 code
//       for (let i = 0; i !== s.length; ++i) {

//         view[i] = s.charCodeAt(i);
//       }

//       return buf;
//     };
//     const handleExport = () => {
//       const title = [{ A: "Balance Sheet Report" }];
//       const name = [{ A: companyContext.company.name}];
//       const address = [{ A: companyContext.company.address }];
//       const panNo = [{ A:"Pan No:"+ companyContext.company.panNo }];
//       const dateFrom = [
//         {
//           A:
//             "For the Period: " + format(new Date(values.dateFrom), "yyyy-MM-dd").toString() +" "+"to: "+ format(new Date(values.dateTo), "yyyy-MM-dd").toString(),
//         },
//       ];

//       let table1 = [
//         {
//           A: "Ledger Name",
//           B: "Debit",
//           C: "Credit",
//         },
//       ];

//       let table2 = [
//         {
//           A: "Total",
//           B: drtotal,
//           C: crtotal,
//         },
//         {
//           A: "Closing Balance",
//           B: profit>loss?profit:0,
//           C: loss>profit?loss:0,
//         },
//       ];
   
//       //const total = [{B:'Total'}, {C: drtotal}, {D: crtotal}];

//       records.map((item) => {
//         table1.push({


          
//           A: item.ledgerName,
//           B:     parseFloat(item.dr_cr === "dr" ? item.amount : 0).toFixed(2),
//           C:     parseFloat(item.dr_cr === "cr" ? item.amount : 0).toFixed(2),
//         });
//       });

//       table1 = table1.concat(table2);

//       const finalData = [...name,...address,...panNo,...title, ...dateFrom,  ...table1];


//       //create a new workbook
//       const wb = XLSX.utils.book_new();

//       const sheet = XLSX.utils.json_to_sheet(finalData, {
//         skipHeader: true,
//       });

//       XLSX.utils.book_append_sheet(wb, sheet, "bl_report");

//       // binary large object
//       // Since blobs can store binary data, they can be used to store images or other multimedia files.
//       const workbookBlob = workbook2blob(wb);

//       var headerIndexes = [];
//       finalData.forEach((data, index) =>
//         data["A"] === "Ledger Name" ? headerIndexes.push(index) : null
//       );

//       const totalRecords = records.length;
//       const dataInfo = {
//         nameCell:"A1",
//         nameRange:"A1:C1",
//         addressCell:"A2",
//         addressRange:"A2:C2",
//         panNoCell:"A3",
//         panNoRange:"A3:C3",
//         titleCell: "A4",
//               titleRange: "A4:C4",
//               dateFromCell: "A5",
//               dateFromRange: "A5:C5",
//         // dateToCell: "A6",
//         // dateToRange: "A6:C6",
//         tbodyRange: `A6:C${finalData.length}`,
//         theadRange:
//           headerIndexes?.length >= 1
//             ? `A${headerIndexes[0] + 1}:C${headerIndexes[0] + 1}`
//             : null,
      
//       };
//       return addStyle(workbookBlob, dataInfo);
//     };

//     const addStyle = (workbookBlob, dataInfo) => {
//       return XlsxPopulate.fromDataAsync(workbookBlob).then((workbook) => {
//         workbook.sheets().forEach((sheet) => {
//           sheet.usedRange().style({
//             fontFamily: "Arial",
//             verticalAlignment: "center",
//           });

//           sheet.column("A").width(35);
//           sheet.column("B").width(25);
//           sheet.column("C").width(15);

//           sheet.range(dataInfo.titleRange).merged(true).style({
//             bold: true,
//             horizontalAlignment: "center",
//             verticalAlignment: "center",
//           });
//           sheet.range(dataInfo.nameRange).merged(true).style({
//             bold: true,
//            horizontalAlignment: "center",
//            verticalAlignment: "center",
//          });
 
//          sheet.range(dataInfo.addressRange).merged(true).style({
//            bold: true,
//            horizontalAlignment: "center",
//            verticalAlignment: "center",
//          });
//          sheet.range(dataInfo.panNoRange).merged(true).style({
//            bold: true,
//            horizontalAlignment: "center",
//            verticalAlignment: "center",
//          });
//           sheet.range(dataInfo.dateFromRange).merged(true).style({
//             // bold: true,
//             horizontalAlignment: "center",
//             verticalAlignment: "center",
//           });

//           // sheet.range(dataInfo.dateToRange).merged(true).style({
//           //   // bold: true,
//           //   horizontalAlignment: "center",
//           //   verticalAlignment: "center",
//           // });
         

//           if (dataInfo.tbodyRange) {
//             sheet.range(dataInfo.tbodyRange).style({
//               horizontalAlignment: "left",
//             });
//           }

//           sheet.range(dataInfo.theadRange).style({
//             bold: true,
//             horizontalAlignment: "center",
//           });

         
//         });

//         return workbook
//           .outputAsync()
//           .then((workbookBlob) => URL.createObjectURL(workbookBlob));
//       });
//     };
//     const ReportComponent=()=>{
//       return (
//         <div>
//              <ReportHeader title="Balance Sheet"/>
//       <Form onSubmit={handleSubmit}>
//               <Grid container direction="row">
//                 <Grid item lg={12} md={12} xs={12}>
//                   <Card>
//                     <Grid container>
//                       <Grid item xs={12} sm={4}>
//                         <Controls.DatePicker
//                           name="dateFrom"
//                           label="DateFrom"
//                           value={values.dateFrom}
//                           onChange={handleInputChange}
//                         />
//                       </Grid>
//                       <Grid item xs={12} sm={4}>
//                         <Controls.DatePicker
//                           name="dateTo"
//                           label="DateTo"
//                           value={values.dateTo}
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
       
  
//   )
//     }
  
//     return (
//       <div
//         className="content-wrapper iframe-mode"
//         data-widget="iframe"
//         data-loading-screen={750}
//       >

// {records.length != 0 ? (
//           <Grid container direction="row">
//             <button
//               style={{
//                 marginLeft: "1px",
//                 marginBottom: "10px",
//                 textAlign: "left",
//               }}
//               onClick={() => {
//                 createDownLoadData();
//               }}
//               className="btn btn-success btn-sm ml-1"
//             >
//               Excel Export
//             </button>
//             <div style={{ textAlign: "left", marginLeft: "100px" ,position:"relative"}}>
//             <ReactToPrint
              
             
//               trigger={() => (
//                 <Controls.Button
//                   text="Print"
//                   variant="outlined"
//                   startIcon={<PrintIcon />}
//                   className="printBtn"
//                 />
//               )}
//               content={() => componentRef.current}
//             />
           
//              <Controls.Button
//                   text="Back"
//                   variant="outlined"
//                   className="back-bt"
//                   onClick={() => {
//                     setRecords([]);
               
//                   }}
//                 />
//                    </div>
//             <Grid item lg={12} md={12} xs={12}>
//               <Card>
//                    <div ref={componentRef} className="salesReturnReport">
//     <div className="jreportPage">
         
//           <div className="reportHeader">
//             <p className="companyName">{companyContext.company.name}</p>
//             <p className="companyAddress">
//                   {companyContext.company.address || ""}
//                 </p>
//             <p className="companyPan">
//               Pan No : {companyContext.company.panNo}
//             </p>
           
//             <p className="companyReport"> Balance sheet Report</p>
           
//           </div>
//                    <CardContent>
//                         <div
//                           style={{
//                             color: "black",
//                             font: "Bold",
//                             display: "inline",
//                             float: "left",
//                             marginLeft: "10px",
//                           }}
//                         >
//                           {" "}
//                           From:
//                           {format(
//                             new Date(values.dateFrom),
//                             "yyyy-MM-dd"
//                           ).toString()}
//                         </div>
//                         <div
//                           style={{
//                             color: "black",
//                             font: "Bold",
//                             display: "inline",
//                             float: "right",
//                             marginRight: "10px",
//                           }}
//                         >
//                           {" "}
//                           To:
//                           {format(new Date(values.dateTo), "yyyy-MM-dd").toString()}
//                         </div>
//                       </CardContent>
//                     <Paper>
//                       <TableContainer>
//                         <Table stickyHeader>
//                           <TableHead>
//                             <TableRow>
//                             <TableCell size="small"align="left"><strong>LedgerName</strong></TableCell>
//                           <TableCell size="small"align="center"><strong>Debit</strong></TableCell>

//                           <TableCell size="small"align="center"><strong>Credit</strong></TableCell>
//                             </TableRow>
//                           </TableHead>
//                           <TableBody>
//                             {/* { [...Array(maxLedgers).keys()].map((num,i)=>{ return get_tbody(num)}) } */}
//                             {records &&
//                               records.map((item, idx) => {
//                                 return (
//                                   <TableRow key={idx} hover>
//                                     <TableCell size="small"align="left">{item.ledgerName}</TableCell>
//                                 <TableCell size="small"align="center">
                                 
//                                       { parseFloat(item.dr_cr === "dr" ? item.amount : 0).toFixed(2)}
//                                 </TableCell>

//                                 <TableCell size="small"align="center">
                                 
//                                       { parseFloat(item.dr_cr === "cr" ? item.amount : 0).toFixed(2)}
//                                 </TableCell>
//                                   </TableRow>
//                                 );
//                               })}

//                             <TableRow>
//                               <TableCell>Total</TableCell>

//                               <TableCell size="small"align="center">{drtotal}</TableCell>

//                               <TableCell size="small"align="center">{crtotal}</TableCell>
//                             </TableRow>
//                             {profit > loss ? (
//                                 <TableRow>
//                                   <TableCell>Closing Balance</TableCell>
//                                   <TableCell size="small"align="center">{profit}</TableCell>
//                                 </TableRow>
//                               ) : (
//                                 <TableRow>
//                                   <TableCell>Closing Balance</TableCell>
//                                   <TableCell></TableCell>
//                                   <TableCell size="small"align="center">{loss}</TableCell>
//                                 </TableRow>
//                                   )}
//                           </TableBody>
//                         </Table>
//                       </TableContainer>
               
//                     </Paper>
                  
//                     </div>
//                     </div>
               
//                     </Card>
//             </Grid>
//             </Grid>
           
//               ) :    <div className="">
//            <ReportComponent/>
//                     </div>
              
//               }
       
       
 
    
//       </div>
         
//     );
//   }
