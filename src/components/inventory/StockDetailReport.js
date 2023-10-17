// import React, { useState,useEffect } from "react";

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

// // import AdapterDateFns from '@mui/lab/AdapterDateFns';
// // import LocalizationProvider from '@mui/lab/LocalizationProvider';
// // import DateTimePicker from '@mui/lab/DateTimePicker';

// //import Select from "@material-ui/core/Select";
// import axios from "axios";
// import config from "../../utils/config";

// import UserSessionContext from "../../contexts/UserSessionContext";
// import UserAuthenticationContext from "../../contexts/UserAuthenticationContext";
// import { format } from "date-fns";
// import CompanyContext from "../../contexts/CompanyContext";
// import Select from "react-select";
// import PrintIcon from "@mui/icons-material/Print";
// import "date-fns";
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
// // const data=[{"Date":"4/6/2022","invoice_no":1,"dec_no":1,"supplier_name":"ram kumar bahadur chhetri","supplier_pan":"6862239171","item_name":"Glyn","iq":47,"ts":5,"discount":1,"TA":1,"Vat":1,"expsales":1,"country":"Zimbabwe","num":92,"pragmiti":"11/12/2021"},
// //  {"Date":"7/19/2021","invoice_no":2,"Buyers_name":"Fayth","supplier_name":"ram kumar bahadur chhetri","supplier_pan":"6862239171","iq":66,"ts":22,"discount":2,"TA":2,"Vat":2,"expsales":2,"country":"Barbados","num":65,"pragmiti":"3/10/2022"},
// //  {"Date":"9/14/2021","invoice_no":3,"supplier_name":"ram kumar bahadur chhetri","supplier_pan":"6862239171","item_name":"Vitia","iq":11,"ts":27,"discount":3,"TA":3,"Vat":3,"expsales":3,"country":"Mozambique","num":45,"pragmiti":"4/25/2022"}]
// const search_data=[
//   {
//     "label":"all",
//      "value":1,
//   },
  
 
// {
//     "label":"category",
//     "value":2,
// },
//  {
//     "label":"warehouse",
//      "value":3,
//  },



// ]
// const ops=[{
//     label:"all",
//     value:0,
// },]
// export default function StockDetailReport(props) {
//   const componentRef = React.useRef(null);

//   const { values, handleInputChange } = useForm(initialFValues);
//   const userSessionContext = React.useContext(UserSessionContext);
//   // let history = useHistory();
//   const classes = useStyles();
//   const [records, setRecords] = useState([]);
//   const [Data, setData]= useState([]);
//   //const permissionContext = React.useContext(UserAuthenticationContext);
//   //let Permission = permissionContext.permissions;
//   const companyContext = React.useContext(CompanyContext);
  
//   //let curr_mod_permission =Permission.filter( x=>{return x["module_name"].toLowerCase() === "accounting"})
//   //let userPermission= curr_mod_permission[0]

//   var adbs = require("ad-bs-converter");
//   const currentDate = new Date().toLocaleDateString(); // Get the current date
//   const currentTime = new Date().toLocaleTimeString(); // Get the current time

//   const [searchData, setSearchData] = useState(search_data||[]);
//   const [search, setSearch] = useState([]);
//   const [all, setAll] = useState("");
//   const [Loading, setLoading] = useState(false);
//   const [List, setList] = useState([]);
//   const [issubmit, setSubmit] = useState(false);
//   const [warehouses, setWareHouseList] = useState();
//   var adbs = require("ad-bs-converter");
//   useEffect(() => {
//     if (searchData.label!== undefined) {
   
//     loaddataById(searchData.label);
    
// }
// }, [searchData])

// useEffect(() => {

// }, [issubmit])
// useEffect(() => {
//   load_warehouse();
// }, []);
// const load_warehouse = async () => {
//   await axios
//     .get(`${config.APP_CONFIG}/stock/warehouse/api`, {
//       headers: { Authorization: userSessionContext.token },
//     })
//     .then((res) => {
//       if (res.data.status_code === 401) {
//         userSessionContext.handleLogOut();
//       } else if (res.data.status_code === 200) {
//         let temp = res.data.msg.map((item) => ({
//           value: item.id,
//           label: item.warehouse,
//         }));

//         setWareHouseList(temp);
//       } else if (res.data.status_code === 400) {
//         toast.warn(res.data.msg);
//       } else {
//         toast.error("error");
//         setWareHouseList([]);
//       }
//     })
//     .catch((err) => {
//       setWareHouseList([]);
//     });
// };
// const loaddataById = async (type) => {
   
//   //   if(type==="items"){
//   //   await axios.get(
//   //       `${config.APP_CONFIG}/Products/product/Api`,
//   //       {
//   //         headers: { Authorization: userSessionContext.token },
//   //       }
//   //     )
//   //     .then((res) => {
//   //       if (res.data && res.data.status_code && res.data.status_code === 200) {
//   //         let temp = res.data.msg.map((name, index) => ({
//   //           label: name.productname,
//   //           value: name.id,
//   //         }));
//   //         setList(temp);
        
//   //       } else {
//   //         toast.error("Cannot load .");
//   //         setList([]);
//   //       }
//   //     })
//   //     .catch((err) => {
//   //       // toast.error("failed to load units");
//   //       setList([]);
//   //     });
//   // }

//    if(type==="category")
//     {
//         await axios.get(
//             `${config.APP_CONFIG}/Products/ProductCategory/api`,
//             {
//               headers: { Authorization: userSessionContext.token },
//             }
//           )
//           .then((res) => {
//             if (res.data && res.data.status_code && res.data.status_code === 200) {
//               let temp = res.data.msg.map((name, index) => ({
//                 label: name.categoryName,
//                 value: name.id,
//               }));
//               setList(temp);
            
//             } else {
//               toast.error("Cannot load.");
//               setList([]);
//             }
//           })
//           .catch((err) => {
         
//             setList([]);
//           });
//       }
//       else if(type==="warehouse"){
//         await axios.get(
//           `${config.APP_CONFIG}/stock/warehouse/api`,
//           {
//             headers: { Authorization: userSessionContext.token },
//           }
//         )
//         .then((res) => {
//           if (res.data && res.data.status_code && res.data.status_code === 200) {
//             let temp = res.data.msg.map((name, index) => ({
//               label: name.warehouse,
//               value: name.id,
//             }));
//             setList(temp);
          
//           } else {
//             toast.error("Cannot load ");
//             setList([]);
//           }
//         })
//         .catch((err) => {
//           // toast.error("failed to load units");
//           setList([]);
//         });
//       }
    
//     else{
//       if(type==="all")
// {
//   setAll("all");
// }
    
// }
// }


//   const handleSubmit = (e) => {

//     e.preventDefault();
//     if(searchData.length===0){
//       toast.warn("Please Enter Search ");
//     }
 
//     else if(all==="all"){

//       let _data = {
//         dateFrom: format(new Date(values.dateFrom), "yyyy-MM-dd"),
//         dateTo: format(new Date(values.dateTo), "yyyy-MM-dd"),
//        // companyId: companyContext.company.id,
//        searchType:searchData.label,
//        searchData:0
//       };
    
//       axios.post(`${config.APP_CONFIG}/InventoryTransfer/getData/api`, _data, {
//           headers: { Authorization: userSessionContext.token },
//         })
//         .then((res) => {
//           if (res.data.status_code === 200) {
           
//             if(res.data.msg.length<1){
//               toast.warn("No Records")
//             }
//             else{
//               setRecords(res.data.msg);
//               setLoading(true);
//               setSubmit(true)
//             }
          
        
//           } else if (res.data.status_code === 401) {
        
//             userSessionContext.handleLogout();
    
//           } else if (res.data.status_code === 400) {
           
//             toast.warn(res.data.msg);
//           } else {
          
//             toast.error("Warning");
//           }
//         })
//         .catch((err) => {
//           toast.error("Error");
//         });
//     setAll("")
//     }
  
//    else if(search.label.length===0){
//       toast.warn("Please Enter Search Type");
//     }
//     else if(search.label===undefined){
//       toast.warn("Please Enter Search Type");
//     }
//     else{

//     let _data = {
//       dateFrom: format(new Date(values.dateFrom), "yyyy-MM-dd"),
//       dateTo: format(new Date(values.dateTo), "yyyy-MM-dd"),
//       //companyId: companyContext.company.id,
//       searchType:searchData.label,
//       searchData:search.value
//     };
  
//     axios.post(`${config.APP_CONFIG}/InventoryTransfer/getData/api`, _data, {
//         headers: { Authorization: userSessionContext.token },
//       })
//       .then((res) => {
//         if (res.data.status_code === 200) {
         
//           if(res.data.msg.length<1){
//             toast.warn("No Records")
//           }
//           else{
//             setRecords(res.data.msg);
//             setLoading(true);
//             setSubmit(true)
//           }
        
//         } else if (res.data.status_code === 401) {
      
//           userSessionContext.handleLogout();
  
//         } else if (res.data.status_code === 400) {
         
//           toast.warn(res.data.msg);
//         } else {
        
//           toast.error("Warning");
//         }
//       })
//       .catch((err) => {
//         toast.error("Error");
//       });
//       setAll("")
//   };
// }

  


// //   const quantity_total = records
// //     .reduce((total, obj) => obj.quantity + total, 0)
// //     .toFixed(2);
// //   const totalsales_total = records
// //     .reduce((total, obj) => obj.subtotal + total, 0)
// //     .toFixed(2);
// //   const discount_total = records
// //     .reduce((total, obj) => obj.discount + total, 0)
// //     .toFixed(2);
// //   const Taxable_total = parseFloat(totalsales_total - discount_total).toFixed(
// //     2
// //   );

// //   const tax_total = records
// //     .reduce((total, obj) => obj.taxAmount + total, 0)
// //     .toFixed(2);

// // //sales return 
// //     const total_sales_return= Data
// //     .reduce((total, obj)=> obj.productsubtotal + total, 0)
// //     .toFixed(2);

// //     const total_discount_return= Data
// //     .reduce((total, obj)=> obj.discount + total, 0)
// //     .toFixed(2);

// //     const total_taxableamount_return= Data
// //     .reduce((total, obj)=> parseFloat(obj.productsubtotal - obj.discount) + total, 0)
// //     .toFixed(2);

// //     const total_vat_return= Data
// //     .reduce((total, obj)=> obj.taxAmount + total, 0)
// //     .toFixed(2);

// // //granttotal

// // const grand_total=totalsales_total-total_sales_return;
// // const grand_total_discount=discount_total-total_discount_return;
// // const grand_total_taxableamount=Taxable_total-total_taxableamount_return;
// // const grand_total_vat=tax_total-total_vat_return;


//   ////////////////////////////////
//   const date_of_sales_nepali = format(new Date(values.dateFrom), "yyyy/MM/dd ");
//   const date_nepali = format(new Date(values.dateTo), "yyyy/MM/dd ");

//   const nepalidate = adbs.ad2bs(date_of_sales_nepali);
//   const nepali = adbs.ad2bs(date_nepali);
//   const miti =
//     nepalidate.en["year"] +
//     "/" +
//     nepalidate.en["month"] +
//     "/" +
//     nepalidate.en["day"];
//   const miti1 =
//     nepali.en["year"] + "/" + nepali.en["month"] + "/" + nepali.en["day"];

// //   const createDownLoadData = () => {
// //     handleExport().then((url) => {
   
// //       const downloadAnchorNode = document.createElement("a");
// //       downloadAnchorNode.setAttribute("href", url);
// //       downloadAnchorNode.setAttribute("download", "purchase_report.xlsx");
// //       downloadAnchorNode.click();
// //       downloadAnchorNode.remove();
// //     });
// //   };

// //   const workbook2blob = (workbook) => {
// //     const wopts = {
// //       bookType: "xlsx",
// //       bookSST: false,
// //       type: "binary",
// //     };

// //     const wbout = XLSX.write(workbook, wopts);
// //     const blob = new Blob([s2ab(wbout)], {
// //       type: "application/octet-stream",
// //     });

// //     return blob;
// //   };

// //   const s2ab = (s) => {
// //     // The ArrayBuffer() constructor is used to create ArrayBuffer objects.
// //     // create an ArrayBuffer with a size in bytes
// //     const buf = new ArrayBuffer(s.length);

// //     // console.log(buf);

// //     //create a 8 bit integer array
// //     const view = new Uint8Array(buf);

// //     // console.log(view);
// //     //charCodeAt The charCodeAt() method returns an integer between 0 and 65535 representing the UTF-16 code
// //     for (let i = 0; i !== s.length; ++i) {
// //       // console.log(s.charCodeAt(i));
// //       view[i] = s.charCodeAt(i);
// //     }

// //     return buf;
// //   };

  
// //   const handleExport = () => {

// //     const company = [{ A: companyContext.company.name }];
// //     const address = [{ A: companyContext.company.address || "Address" }];
// //     const panNo = [{ A: "Pan No:" + companyContext.company.panNo }];
// //     const title = [{ A: "Purchase Format Report" }];
// //     const dateFrom = [
// //       {
// //         A:
// //           "From: " + format(new Date(values.dateFrom), "yyyy-MM-dd").toString(),
// //       },
// //     ];
// //     const dateTo = [
// //       { A: "To: " + format(new Date(values.dateTo), "yyyy-MM-dd").toString() },
// //     ];
// //     // const purchaseReturn=[{G: "Purchase Return"}]

// //     let table1 = [
// //       {
// //         A: "S.N.",
// //         B: "Date",
// //         C: "Date",
// //         D: "Invoice Number",
// //         E: "Decleration Number",
// //         F: "Supplier Name",
// //         G: "Supplier PAN",
// //         H: "Item Name",
// //         I: "Quantity",
// //         J: "Unit",
// //         K: "Total Sales",
// //         L: "Discount",
// //         M: "Taxable Amount",
// //         N: "VAT",
// //         O: "Export Sales",
// //         P: "Country",
// //         Q: "Pragyapan Patra No.",
// //         R: "Pragyapan Patra Miti",
// //       },
// //     ];

// //     let table2 = [
// //       {
// //         G: "Total Return",
// //         // H: quantity_total,
// //         K: totalsales_total,
// //         L: discount_total,
// //         M: Taxable_total,
// //         N: tax_total,
// //       },
// //     ];

// //     // let table3=[{}];

// //     // let table4 = [
// //     //   {
// //     //     G: "Total",
// //     //     // H: quantity_total,
// //     //     K: "-" + total_sales_return,
// //     //     L: "-" + total_discount_return,
// //     //     M: "-" + total_taxableamount_return,
// //     //     N: "-" + total_vat_return,
// //     //   },
// //     // ];

// //     // let table5 = [
// //     //   {
// //     //     G: "Grand Total",
// //     //     // H: quantity_total,
// //     //     K: grand_total,
// //     //     L: grand_total_discount,
// //     //     M: grand_total_taxableamount,
// //     //     N: grand_total_vat,
// //     //   },
// //     // ];
// //     records.map((item, index) => {
// //       table1.push({
// //         A: index + 1,
// //         B: format(new Date(item.recepitDate), "yyyy-MM-dd  HH:mm:ss"),
// //         C:
// //         adbs.ad2bs(format(new Date(item.recepitDate), "yyyy/MM/dd ")).en[
// //           "year"
// //         ] +
// //         "/" +
// //         adbs.ad2bs(format(new Date(item.recepitDate), "yyyy/MM/dd ")).en[
// //           "month"
// //         ] +
// //         "/" +
// //         adbs.ad2bs(format(new Date(item.recepitDate), "yyyy/MM/dd ")).en[
// //           "day"
// //         ],
// //         D: item.vendorReference,
// //         E: item.invoice_no,
// //         F: item.vendorname,
// //         G: item.panNo,
// //         H: item.productName,
// //         I: item.quantity,
// //         J: item.unitName,
// //         K: item.subtotal,
// //         L: item.discount,
// //         M: item.netTotal,
// //         N: item.taxAmount,
// //         O: item.expsales,
// //         P: item.country,
// //         Q: item.num,
// //         R: item.pragmiti,
// //       });
// //     });

// //     // Data.map((item, index)=>{
// //     //   table3.push({
// //     //     A: index + 1,
// //     //     B: format(new Date(item.returnDate), "yyyy/MM/dd  HH:mm:ss"),
// //     //     C: adbs.ad2bs(format(new Date(item.returnDate), "yyyy/MM/dd ")).en[
// //     //         "year"
// //     //       ] +
// //     //       "/" +
// //     //       adbs.ad2bs(format(new Date(item.returnDate), "yyyy/MM/dd ")).en[
// //     //         "month"
// //     //       ] +
// //     //       "/" +
// //     //       adbs.ad2bs(format(new Date(item.returnDate), "yyyy/MM/dd ")).en[
// //     //         "day"
// //     //       ],
// //     //     D: item.refBillNo,
// //     //     F: item.customerName,
// //     //     H: item.productName,
// //     //     I: item.quantity,
// //     //     K: "-" + item.productsubtotal,
// //     //     L: "-" + item.discount,
// //     //     M: "-" + parseFloat(item.productsubtotal - item.discount),
// //     //     N: "-" + item.taxAmount,

// //     //   });
// //     // });



// //     table1 = table1.concat(table2).concat(" ");

// //     const finalData = [
// //       ...company,
// //       ...address,
// //       ...panNo,
// //       ...title,
// //       ...dateFrom,
// //       ...dateTo,
// //       ...table1,
// //     ];

// //     // console.log(finalData);
// //     //create a new workbook
// //     const wb = XLSX.utils.book_new();

// //     const sheet = XLSX.utils.json_to_sheet(finalData, {
// //       skipHeader: true,
// //     });

// //     XLSX.utils.book_append_sheet(wb, sheet, "purchase_report");

// //     // binary large object
// //     // Since blobs can store binary data, they can be used to store images or other multimedia files.
// //     const workbookBlob = workbook2blob(wb);

// //     var headerIndexes = [];
// //     finalData.forEach((data, index) =>
// //       data["A"] === "S.N." ? headerIndexes.push(index) : null
// //     );

// //     const dataInfo = {
// //       companyCell: "A1",
// //       companyRange: "A1:R1",
// //       addressCell: "A2",
// //       addressRange: "A2:R2",
// //       panCell: "A3",
// //       panRange: "A3:R3",
// //       titleCell: "A4",
// //       titleRange: "A4:R4",
// //       dateFromCell: "A5",
// //       dateFromRange: "A5:R5",
// //       dateToCell: "A6",
// //       dateToRange: "A6:R6",
// //       // purchaseReturnCell:"A",
// //       // purchaseReturnRange: "A:G",
// //       tbodyRange: `A7:R${finalData.length}`,
// //       theadRange:
// //         headerIndexes?.length >= 1
// //           ? `A${headerIndexes[0] + 1}:R${headerIndexes[0] + 1}`
// //           : null,
// //     };
// //     return addStyle(workbookBlob, dataInfo);
// //   };

// //   const addStyle = (workbookBlob, dataInfo) => {
// //     return XlsxPopulate.fromDataAsync(workbookBlob).then((workbook) => {
// //       workbook.sheets().forEach((sheet) => {
// //         sheet.usedRange().style({
// //           fontFamily: "Arial",
// //           verticalAlignment: "center",
// //         });

// //         sheet.column("A").width(10);
// //         sheet.column("B").width(30);
// //         sheet.column("C").width(30);
// //         sheet.column("D").width(10);
// //         sheet.column("E").width(10);
// //         sheet.column("F").width(20);
// //         sheet.column("G").width(20);
// //         sheet.column("H").width(25);
// //         sheet.column("I").width(10);
// //         sheet.column("J").width(10);
// //         sheet.column("K").width(10);
// //         sheet.column("L").width(10);
// //         sheet.column("M").width(10);
// //         sheet.column("N").width(10);
// //         sheet.column("O").width(10);
// //         sheet.column("P").width(10);
// //         sheet.column("Q").width(10);
// //         sheet.column("R").width(10);

// //         sheet.range(dataInfo.companyRange).merged(true).style({
// //           bold: true,
// //           horizontalAlignment: "center",
// //           verticalAlignment: "center",
// //         });

// //         sheet.range(dataInfo.addressRange).merged(true).style({
// //           // bold: true,
// //           horizontalAlignment: "center",
// //           verticalAlignment: "center",
// //         });

// //         sheet.range(dataInfo.panRange).merged(true).style({
// //           // bold: true,
// //           horizontalAlignment: "center",
// //           verticalAlignment: "center",
// //         });

// //         sheet.range(dataInfo.titleRange).merged(true).style({
// //           bold: true,
// //           horizontalAlignment: "center",
// //           verticalAlignment: "center",
// //         });

// //         sheet.range(dataInfo.dateFromRange).merged(true).style({
// //           // bold: true,
// //           horizontalAlignment: "center",
// //           verticalAlignment: "center",
// //         });

// //         sheet.range(dataInfo.dateToRange).merged(true).style({
// //           // bold: true,
// //           horizontalAlignment: "center",
// //           verticalAlignment: "center",
// //         });

// //         if (dataInfo.tbodyRange) {
// //           sheet.range(dataInfo.tbodyRange).style({
// //             horizontalAlignment: "left",
// //           });
// //         }
// //         sheet.range(dataInfo.theadRange).style({
// //           bold: true,
// //           horizontalAlignment: "center",
// //         });
        
// //       });

// //       return workbook
// //         .outputAsync()
// //         .then((workbookBlob) => URL.createObjectURL(workbookBlob));
// //     });
// //   };
// const ReportComponent=()=>{
//   return (
  
//         <div>
// <ReportHeader title="Stock Detail Report"/>
//         <Form onSubmit={handleSubmit}>
//         <Grid container direction="row">
//             <Grid item lg={12} md={12} xs={12}>
             
//                 <Card>
//                   <Grid container>
//                     <Grid item xs={12} sm={3}>
//                       <label>Search Type </label>
//                       <Select
//                         defaultValue={searchData}
//                         options={search_data}
//                         styles={{
//                           menuPortal: (base) => ({ ...base, zIndex: 9999 }),
//                         }}
//                         menuPortalTarget={document.body}
//                         onChange={setSearchData}
//                         // onChange={(e) => {
//                         //     setProductId(e);
                
//                         //   }}
//                       />
//                     </Grid>
//                 {all==="all"?
//                     <Grid item xs={12} sm={3}>
//                       <label>Search </label>
//                       <Select
//                       disabled
//                       defaultValue={{ label: "all", value: 0 }}
//                         options={ops}
//                         styles={{
//                           menuPortal: (base) => ({ ...base, zIndex: 9999 }),
//                         }}
//                         menuPortalTarget={document.body}
//                       //  onChange={setSearch}
//                       />
//                     </Grid>
//                     :    (
//                     <Grid item xs={12} sm={3}>
//                       <label>Search </label>
//                       <Select
//                         defaultValue={search}
//                         options={List}
                        
//                         styles={{
//                           menuPortal: (base) => ({ ...base, zIndex: 9999 }),
//                         }}
//                         menuPortalTarget={document.body}
//                         onChange={setSearch}
//                       />
//                     </Grid>
//                     )
// }
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
             
//             </Grid>
//           </Grid>
//           </Form>
//         </div>
   
//   )

// }
//   return (
//     <div
//       className="content-wrapper iframe-mode"
//       data-widget="iframe"
//       data-loading-screen={750}
//     >
     
  

 
      
      
//       {records.length !== 0 ? (
//         <button
//           style={{
//             position: "absolute",
//             marginLeft: "0px",
//             textAlign: "left",
//           }}
//           onClick={() => {
//            // createDownLoadData();
//           }}
//           className="btn btn-success btn-sm ml-1"
//         >
//           Excel Export
//         </button>
//       ) : <ReportComponent/>}

//       {records.length !== 0 ? (
//         <div>
//           <div style={{ textAlign: "right", marginRight: "0px" }}>
//             <ReactToPrint
//               pageStyle={"@page{size: landscape;}"}
//               // trigger={() => <button  className="printBtn" <Printicon/> style={{float: "right", left: "40px"}}>Print</button>}
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
//           </div>
//           <div ref={componentRef} className="purchaseReport">
//             <div className="reportPage">
//               <div className="reportHeader">
//               <p className="companyName">{companyContext.company.name}</p>
//                 <p className="companyAddress">
//                   {companyContext.company.address || ""}
//                 </p>
//                 <p className="companyPan">
//                   Pan No : {companyContext.company.panNo}
//                 </p>
//                 <p className="companyReport">Stock Detail Report</p>
//                 <div className="date">
                
//                   <p>
//                     From:{" "}
//                     {format(
//                       new Date(values.dateFrom),
//                       "yyyy/MM/dd"
//                     ).toString() +
//                       " (" +
//                       miti.toString() +
//                       " B.S.)"}
//                   </p>
//                   <p>
//                     To:{" "}
//                     {format(new Date(values.dateTo), "yyyy/MM/dd").toString() +
//                       " (" +
//                       miti1 +
//                       " B.S.)"}
//                   </p>
//                 </div>
//               </div>

//               <table className="table table-fluid journal-entry-table">
//           <thead>
//             <tr>
             
//             <th width="37px">S.N</th>
//               <th style={{verticalAlign:"middle"}}>Product Name</th>
//               <th style={{verticalAlign:"middle"}}>Category</th>
//               <th style={{verticalAlign:"middle"}}>Warehouse</th>
//               <th style={{verticalAlign:"middle"}}>Quantity</th>
//               <th style={{verticalAlign:"middle"}}>Unit</th>
           
//             </tr>
//           </thead>
//           <tbody>
//             {props.records &&
//               props.records.map((i,index) => (
//                 <tr key={index}>
//                    <td width="37px">{index+1}</td>
//                    <td style={{verticalAlign:"middle"}}>{i.productName}</td>
//                       <td style={{verticalAlign:"middle"}}>{i.CategoryName}</td>
//                       <td style={{verticalAlign:"middle"}}>{i.warehouseName}</td>
                   
//                       <td style={{verticalAlign:"middle"}}>{i.rawQuantity}</td>
//                       <td style={{verticalAlign:"middle"}}>{i.unitName}</td>
              
//                 </tr>
//               ))}

           
            
//           </tbody>
//         </table>
//       </div>
//       </div>
//     <div style={{display:'flex', justifyContent: 'space-between', marginTop: '35px', alignContent:'center'}}>
// <div style={{width:'200px', textAlign:'center'}}>    
// <span>-------------------</span><br />

// <span>Prepared By:</span><br />

// </div>
// <div style={{width:'200px', textAlign:'center'}}>
// <span>-------------------</span><br />
// <span>Approved By:</span><br />
// </div>
// </div>
// <div style={{width:'300px', textAlign:'left',marginTop: '5px'}}>

//   <p className="date-time">Printed on {currentDate} at {currentTime} by {localStorage.getItem('user')} </p>
// </div>
//   </div>

 
//       ) : (
//         <div className="reportNotFound">
//           <p>No records to display</p>
//         </div>
//       )}
  
//     </div>
//   );
// }
