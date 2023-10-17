// import React, { useState, useEffect } from "react";
// import axios from "axios";

// import { Route } from "react-router-dom";
// import Spinner from "../../utils/spinner";
// import { toast } from "react-toastify";
// import Select from "react-select";
// import "../../utils/styles.css";

// import { makeStyles } from "@material-ui/core/styles";
// import Grid from "@material-ui/core/Grid";

// import { useForm, Form } from "../../components/home/useForm";
// import Card from "@material-ui/core/Card";
// import CardHeader from "@material-ui/core/CardHeader";
// import Divider from "@material-ui/core/Divider";
// import Controls from "../controls/Controls";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
// import Paper from "@material-ui/core/Paper";
// import TableContainer from "@material-ui/core/TableContainer";
// import config from "../../utils/config";

// import * as XLSX from "xlsx";
// import * as XlsxPopulate from "xlsx-populate/browser/xlsx-populate";

// import UserSessionContext from "../../contexts/UserSessionContext";
// import { format } from "date-fns";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import CompanyContext from "../../contexts/CompanyContext";
// import ReportHeader from "../reports/ReportHeader";

// const useStyles = makeStyles((theme) => ({
//   header: {
//     backgroundColor: "white",
//     color: "#546e7a",
//     justifyContent: "left",
//     padding: "8px 0px",
//     fontWeight: "bold",
//     MarginTop: "5px",
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
//   id: " ",
//   coaname: "",
//   dateFrom: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
//   dateTo: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
// };

// export default function LedgerReportingPage(props) {
//   const userSessionContext = React.useContext(UserSessionContext);
//   const companyContext = React.useContext(CompanyContext);
//   const classes = useStyles();

//   const activefiscalyear = companyContext.fiscal.map((item) => ({
//     value: item.id,
//     label: item.fiscalYear,
//   }));

//   const [coa, setCoa] = useState([]);
//   const [coaid, setCoaid] = useState([]);
//   const [fiscalid, setFiscalid] = useState(activefiscalyear[0]);
//   const [records, setRecords] = useState([]);
//   const [fiscalYear, setFiscalYear] = useState([]);

//   const { values, handleInputChange } = useForm(initialFValues);

//   useEffect(async() => {
//     await axios
//       .get(`${config.APP_CONFIG}/Setting/FiscalYear/api`, {
//         headers: { Authorization: userSessionContext.token },
//       })
//       .then((res) => {
//         if (res.data.status_code === 401) {
//           userSessionContext.handleLogOut();
//         } else if (res.data.status_code === 400) {
//           toast.warn(res.data.msg);
//         } else if (res.data.status_code === 200) {
//           let fiscalList = res.data.msg.map((item) => ({
//             value: item.id,
//             label: item.fiscalYear,
//           }));

//           setFiscalYear(fiscalList);
//           //setFiscal(fiscalList[0])
//         } else {
//           toast.error("error");
//           setFiscalYear([]);
//         }
//       });

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   useEffect(() => {
//     LoadCOA();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const LoadCOA = async () => {
//    await axios
//       .get(`${config.APP_CONFIG}/Account/COAChild/ledger`, {
//         headers: { Authorization: userSessionContext.token },
//       })
//       .then((res) => {
//         if (res.data.status_code === 401) {
//           userSessionContext.handleLogOut();
//         } else if (res.data.status_code === 200) {
//           let coaList = res.data.msg.map((item) => ({
//             value: item.id,
//             label: item.coaname,
//           }));

//           // coaList  = [{ id: 0, title: 'Select' }].concat( coaList );
//           setCoa(coaList);
//         } else if (res.data.status_code === 400) {
//           toast.warn(res.data.msg);
//         } else {
//           toast.error("error");
//           setCoa([]);
//         }
//       })
//       .catch((err) => {
//         setCoa([]);
//       });
//   };



//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (coaid.length === 0) {
//       toast.warn("Please Enter Ledger Name");
//     } else {
//       const req_payload = {
//         dateFrom: format(new Date(values.dateFrom), "yyyy-MM-dd"),
//         dateTo: format(new Date(values.dateTo), "yyyy-MM-dd"),
//         coaId: coaid.value,
//         fiscalYear: fiscalid.label,
//         companyId: companyContext.company.id,
//       };

//       axios
//         .post(`${config.APP_CONFIG}/Account/LedgerReport/api`, req_payload, {
//           headers: { Authorization: userSessionContext.token },
//         })
//         .then((res) => {
//           if (res.data.status_code === 200) {

//          if(res.data.msg.length<1){
//             toast.warn("No Records")
//           }
//           else{
       
//           setRecords(res.data.msg);
//           }
     
           
//           } else if (res.data.status_code === 401) {
//             userSessionContext.handleLogout();
//           } else if (res.data.status_code === 400) {
//             toast.warn(res.data.msg);
//           } else {
//             toast.error("Error Occurred");
//             // setRecords([]);
//           }
//         })
//         .catch((err) => {
//           toast.error("Something Went Wrong");
//         });
//     }
//   };

//   if (coa === undefined) {
//     return <Spinner />;
//   }

//   const debitlist = records.filter((x) => {
//     return x["dr_cr"].toLowerCase() === "dr";
//   });
//   const drtotal = Math.round(
//     debitlist.reduce((total, obj) => obj.amount + total, 0),
//     2
//   );

//   const creditList = records.filter((x) => {
//     return x["dr_cr"].toLowerCase() === "cr";
//   });
//   const crtotal = Math.round(
//     creditList.reduce((total, obj) => obj.amount + total, 0),
//     2
//   );
//   const profit=crtotal-drtotal
//   const loss=drtotal-crtotal

//   const createDownLoadData = () => {
//     handleExport().then((url) => {
     
//       const downloadAnchorNode = document.createElement("a");
//       downloadAnchorNode.setAttribute("href", url);
//       downloadAnchorNode.setAttribute("download", "Ledger_report.xlsx");
//       downloadAnchorNode.click();
//       downloadAnchorNode.remove();
//     });
//   };

//   const workbook2blob = (workbook) => {
//     const wopts = {
//       bookType: "xlsx",
//       bookSST: false,
//       type: "binary",
//     };

//     const wbout = XLSX.write(workbook, wopts);
//     const blob = new Blob([s2ab(wbout)], {
//       type: "application/octet-stream",
//     });

//     return blob;
//   };

//   const s2ab = (s) => {
//     // The ArrayBuffer() constructor is used to create ArrayBuffer objects.
//     // create an ArrayBuffer with a size in bytes
//     const buf = new ArrayBuffer(s.length);

 

//     //create a 8 bit integer array
//     const view = new Uint8Array(buf);

 
//     //charCodeAt The charCodeAt() method returns an integer between 0 and 65535 representing the UTF-16 code
//     for (let i = 0; i !== s.length; ++i) {
   
//       view[i] = s.charCodeAt(i);
//     }

//     return buf;
//   };
//   const handleExport = () => {

// console.log(records);
//     const name = [{ A: companyContext.company.name}];
//     const address = [{ A: companyContext.company.address }];
//     const panNo = [{ A:"Pan No:"+ companyContext.company.panNo }];
//     const title= [{ A: "Ledger :"+" "+coaid.label}];
//     const dateFrom = [
//       {
//         A:
//           "For the Period: " + format(new Date(values.dateFrom), "yyyy-MM-dd").toString() +" "+"to: "+ format(new Date(values.dateTo), "yyyy-MM-dd").toString(),
//       },
//     ];
//     // const dateTo = [
//     //   { A: "To: " + format(new Date(values.dateTo), "yyyy-MM-dd").toString() },
//     // ];

//     let table1 = [
//       {
//         A:"Date",
//         B: "Ledger Name",
//         C: "Debit",
//         D: "Credit",
//       },
//     ];

//     let table2 = [
//       {
//         A: "Total",
//         B: "",
//         C: drtotal,
//         D: crtotal,
//       },
//     ];

//     //const total = [{B:'Total'}, {C: drtotal}, {D: crtotal}];

//     records.map((item) => {
//       table1.push({
//         A: item.accountingDate,
//         B: item.ledgerName,
//         C:     parseFloat(item.dr_cr === "dr" ? item.amount : 0).toFixed(2),
//         D:     parseFloat(item.dr_cr === "cr" ? item.amount : 0).toFixed(2),
//       });
//     });

//     table1 = table1.concat(table2);

//     const finalData = [...name,...address,...panNo,...title, ...dateFrom,  ...table1];


//     //create a new workbook
//     const wb = XLSX.utils.book_new();

//     const sheet = XLSX.utils.json_to_sheet(finalData, {
//       skipHeader: true,
//     });

//     XLSX.utils.book_append_sheet(wb, sheet, "Ledger_report");

//     // binary large object
//     // Since blobs can store binary data, they can be used to store images or other multimedia files.
//     const workbookBlob = workbook2blob(wb);

//     var headerIndexes = [];
//     finalData.forEach((data, index) =>
//       data["A"] === "Date" ? headerIndexes.push(index) : null
//     );

//     const totalRecords = records.length;
//     const dataInfo = {
      
// nameCell:"A1",
// nameRange:"A1:D1",
// addressCell:"A2",
// addressRange:"A2:D2",
// panNoCell:"A3",
// panNoRange:"A3:D3",
// titleCell: "A4",
//       titleRange: "A4:D4",
//       dateFromCell: "A5",
//       dateFromRange: "A5:D5",
//       // dateToCell: "A6",
//       // dateToRange: "A6:C6",
//       tbodyRange: `A6:D${finalData.length}`,
//       theadRange:
//         headerIndexes?.length >= 1
//           ? `A${headerIndexes[0] + 1}:D${headerIndexes[0] + 1}`
//           : null,
     
//     };
//     return addStyle(workbookBlob, dataInfo);
//   };

//   const addStyle = (workbookBlob, dataInfo) => {
//     return XlsxPopulate.fromDataAsync(workbookBlob).then((workbook) => {
//       workbook.sheets().forEach((sheet) => {
//         sheet.usedRange().style({
//           fontFamily: "Arial",
//           verticalAlignment: "center",
//         });
//         sheet.column("A").width(35);

//         sheet.column("B").width(35);
//         sheet.column("C").width(15);
//         sheet.column("D").width(15);
//         sheet.range(dataInfo.titleRange).merged(true).style({
//           bold: true,
//           horizontalAlignment: "center",
//           verticalAlignment: "center",
//         });
//         sheet.range(dataInfo.nameRange).merged(true).style({
//            bold: true,
//           horizontalAlignment: "center",
//           verticalAlignment: "center",
//         });

//         sheet.range(dataInfo.addressRange).merged(true).style({
//           bold: true,
//           horizontalAlignment: "center",
//           verticalAlignment: "center",
//         });
//         sheet.range(dataInfo.panNoRange).merged(true).style({
//           bold: true,
//           horizontalAlignment: "center",
//           verticalAlignment: "center",
//         });
//         sheet.range(dataInfo.dateFromRange).merged(true).style({
//           // bold: true,
      
//           horizontalAlignment: "center",
//           verticalAlignment: "center",
//         });
//         // sheet.range(dataInfo.dateToRange).merged(true).style({
       
//         //   horizontalAlignment: "center",
//         //   verticalAlignment: "center",
//         // });
       

//         if (dataInfo.tbodyRange) {
//           sheet.range(dataInfo.tbodyRange).style({
//             horizontalAlignment: "left",
//           });
//         }

//         sheet.range(dataInfo.theadRange).style({
//           bold: true,
//           horizontalAlignment: "center",
//         });

        
//       });

//       return workbook
//         .outputAsync()
//         .then((workbookBlob) => URL.createObjectURL(workbookBlob));
//     });
//   };
 

//   return (
//     <div
//       className="content-wrapper iframe-mode"
//       data-widget="iframe"
//       data-loading-screen={750}
//     >
     
        
   

     
//         <div>
//         <ReportHeader title="Ledger Summary"/>
//           <Grid container direction="row">
//             <Grid item lg={12} md={12} xs={12}>
//               <Form onSubmit={handleSubmit}>
//                 <Card>
//                   <Grid container>
//                     <Grid item xs={12} sm={3}>
//                       <label>Ledger Name </label>
//                       <div className="Fiscal">
//                       <Select
//                         defaultValue={coaid}
//                         options={coa}
//                         styles={{
//                           menuPortal: (base) => ({ ...base, zIndex: 9999 }),
//                         }}
//                         menuPortalTarget={document.body}
//                         onChange={setCoaid}
//                       />
//                       </div>
//                     </Grid>

//                     <Grid item xs={12} sm={3}>
             
//                       <label>Fiscal Year </label>
                
//                       <Select
//                         defaultValue={fiscalid}
//                         options={fiscalYear}
//                         styles={{
//                           menuPortal: (base) => ({ ...base, zIndex: 9999 }),
//                         }}
//                         menuPortalTarget={document.body}
//                         onChange={setFiscalid}
//                       />
                      
//                     </Grid>
//                     <Grid item xs={12} sm={3}>
//                       <label
//                         htmlFor="text"
//                         style={{
//                           paddingTop: "0",
//                           marginLeft: "4px",
//                           width: "100%",
//                         }}
//                         className="col-sm-12 col-form-label"
//                       >
//                         Date From
//                       </label>
//                       <Controls.DatePicker
//                         name="dateFrom"
//                         value={values.dateFrom}
//                         onChange={handleInputChange}
//                       />
//                     </Grid>
//                     <Grid item xs={12} sm={3}>
//                       <label
//                         htmlFor="text"
//                         style={{
//                           paddingTop: "0",
//                           marginLeft: "4px",
//                           width: "100%",
//                         }}
//                         className="col-sm-12 col-form-label"
//                       >
//                         Date To
//                       </label>
//                       <Controls.DatePicker
//                         name="dateTo"
//                         value={values.dateTo}
//                         onChange={handleInputChange}
//                       />
//                     </Grid>

//                     <Grid
//                       item
//                       xs={12}
//                       sm={3}
//                       style={{ display: "flex", margin: "5px 0" }}
//                     >
//                       <Controls.Button type="submit" text="Submit" />
//                     </Grid>
//                   </Grid>
//                 </Card>
//               </Form>
//             </Grid>
//           </Grid>
      
//         </div>
    
//       <Grid container direction="row">
//         <Grid item lg={12} md={12} xs={12}>
//           {records.length > 0 ? (
//             <div>
//               <button
//                 style={{
//                   marginLeft: "1px",
//                   marginBottom: "10px",
//                   textAlign: "left",
//                 }}
//                 onClick={() => {
//                   createDownLoadData();
//                 }}
//                 className="btn btn-success btn-sm ml-1"
//               >
//                 Excel Export
//               </button>
//               <Card>
//                 <Divider />
//                 <h2 style={{ color: "Black", textAlign: "center" }}>
//                   {companyContext.company.name}
//                 </h2>

//                 <div
//                   style={{
//                     color: "black",
//                     font: "Bold",
//                     display: "inline",
//                     float: "left",
//                     marginLeft: "10px",
//                   }}
//                 >
//                   {" "}
//                   From:
//                   {format(new Date(values.dateFrom), "yyyy-MM-dd").toString()}
//                 </div>
//                 <div
//                   style={{
//                     color: "black",
//                     font: "Bold",
//                     display: "inline",
//                     float: "right",
//                     marginRight: "10px",
//                   }}
//                 >
//                   {" "}
//                   To:
//                   {format(new Date(values.dateTo), "yyyy-MM-dd").toString()}
//                 </div>
//                 <h4 style={{ color: "Black", textAlign: "center" }}>
//                   {coaid.label}
//                 </h4>

//                 <Paper>
//                   <TableContainer>
//                     <Table stickyHeader>
//                       <TableHead>
//                         <TableRow>
//                           <TableCell>Date</TableCell>
//                           <TableCell>LedgerName</TableCell>
//                           <TableCell>Debit</TableCell>
//                           <TableCell>Credit</TableCell>
//                         </TableRow>
//                       </TableHead>
//                       <TableBody>
//                         {records &&
//                           records.map((item, idx) => {
                        
//                             return (
//                               <TableRow key={idx} hover>
//                                 <TableCell>
//                                 {item.accountingDate}
//                                   {/* {new Date(
//                                     item.accountingDate
//                                   ).toLocaleDateString() +
//                                     " " +
//                                     new Date(
//                                       item.accountingDate
//                                     ).toLocaleTimeString()} */}
//                                 </TableCell>
//                                 <TableCell>{item.ledgerName}</TableCell>
//                                 <TableCell>
//                                 {item.dr_cr === "dr" ? item.amount : 0}
//                                 </TableCell>

//                                 <TableCell>
//                                 {item.dr_cr === "cr" ? item.amount : 0}
//                                 </TableCell>
//                               </TableRow>
//                             );
//                           })}
//                         <TableRow>
//                           <TableCell>Total </TableCell>
//                           <TableCell> </TableCell>
//                           <TableCell>{drtotal}</TableCell>

//                           <TableCell>{crtotal}</TableCell>
//                         </TableRow>
//                         {profit > loss ? (
//                                 <TableRow>
                             
//                                   <TableCell>Closing Balance </TableCell>
//                                   <TableCell> </TableCell>
                              
//                                   <TableCell>{profit}</TableCell>
//                                   <TableCell> </TableCell>
//                                 </TableRow>
//                               ) : (
//                                 <TableRow>
                                 
//                                   <TableCell>Closing Balance </TableCell>
//                                   <TableCell></TableCell>
//                                   <TableCell> </TableCell>
//                                   <TableCell>{loss}</TableCell>
                                 
//                                 </TableRow>
//                                   )}
//                       </TableBody>
//                     </Table>
//                   </TableContainer>
//                 </Paper>
//               </Card>

           
//             </div>
//           ) : (
         
         
//               <div className="reportNotFound">
//               <p >No Records to Display</p>
//                   </div>
//           )}
//         </Grid>
//       </Grid>
//     </div>
//   );
// }
