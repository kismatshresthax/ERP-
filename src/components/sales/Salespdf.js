// import React, { Fragment, useEffect, useState } from "react";
// import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";
// import { PDFViewer } from "@react-pdf/renderer";
// import { format } from "date-fns";
// import UserSessionContext from "../../contexts/UserSessionContext";
// import CompanyContext from "../../contexts/CompanyContext";
// import Controls from "../controls/Controls";
// import config from "../../utils/config";
// import axios from "axios";
// import { toast } from "react-toastify";

// const borderColor = "#90e5fc";

// const styles = StyleSheet.create({
//   page: {
//     fontFamily: "Helvetica",
//     fontSize: 10,
//     paddingTop: 30,
//     paddingLeft: 22,
//     paddingRight: 22,
//     lineHeight: 1.5,
//     flexDirection: "column",
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1,
//   },
//   titleContainer: {
//     flexDirection: "row",
//     marginTop: 1,
//   },
//   reportTitle: {
//     color: "black",
//     letterSpacing: 4,
//     fontSize: 25,
//     textAlign: "center",
//     textTransform: "uppercase",
//   },
//   fragmentHeader: {
//     display: "block",
//     width: "50%",
//   },
//   fragmentHeaderRight: {
//     position: "absolute",
//     right: 0,
//     top: 0,
//     textAlign: "right",
//     width: "50%",
//   },
//   vatNoContainer:{
//     display: "flex",
//     justifyContent: "center",
//     flexDirection: "row",
//   },
//   invoiceNoContainer: {
//     display: "flex",
//     flexDirection: "row",
//     marginTop: 5,
//   },
//   invoiceDateContainer: {
//     flexDirection: "row",
//     justifyContent: "flex",
//     margin: 0,
//   },
//   invoiceContainer: {
//     flexDirection: "row",
//     marginTop: 2,
//     justifyContent: "flex-end",
//   },
//   invoiceCalcContainer: {
//     marginTop: 20,
//     flexDirection: "row",
//     justifyContent: "flex-end",
//   },
//   invoicesubContainer: {
//     marginTop: 35,
//     flexDirection: "row",
//     justifyContent: "flex-end",
//   },
//   invoiceDate: {
//     fontSize: 10,
//     fontStyle: "bold",
//   },
//   dislabel: {
//     width: 50,
//     paddingLeft: 50,
//   },
//   sublabel: {
//     width: 50,
//   },
//   invoicecalc: {
//     flexDirection: "row",
//   },
//   dissublabel: {
//     flexDirection: "row",
//     width: 10,
//     paddingLeft: 370,
//   },
//   subtotal: {
//     fontSize: 10,
//     fontStyle: "bold",
//   },
//   headerContainer: {
//     width: "100vw",
//     textAlign: "center",
//     marginTop: 0,
//   },
//   billTo: {
//     marginTop: 8,
//     paddingBottom: 3,
//     fontFamily: "Helvetica-Oblique",
//   },
//   tableContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     marginTop: 5,
//     borderWidth: 1,
//     borderColor: "#bff0fd",
//   },

//   container: {
//     flexDirection: "row",
//     borderBottomColor: "#bff0fd",
//     backgroundColor: "#bff0fd",
//     borderBottomWidth: 1,
//     alignItems: "center",
//     height: 24,
//     textAlign: "center",
//     fontStyle: "bold",
//     flexGrow: 1,
//   },
//   description_item_table_headers: {
//     width: "52%",
//     borderRightColor: borderColor,
//     borderRightWidth: 1,
//     paddingTop: 3,
//   },
//   description: {
//     width: "52%",
//     borderRightColor: borderColor,
//     borderRightWidth: 1,
//     paddingLeft: 5,
//     paddingTop: 3,
//     fontSize: 10,
//   },

//   amount: {
//     width: "15%",
//     paddingTop: 3,
//   },
//   Qty: {
//     width: "8%",
//     borderRightColor: borderColor,
//     borderRightWidth: 1,
//     paddingTop: 3,
//   },
//   qty: {
//     width: "8%",
//     textAlign: "center",
//     borderRightColor: borderColor,
//     borderRightWidth: 1,
//     paddingTop: 3,
//   },
//   Rate: {
//     width: "10%",
//     borderRightColor: borderColor,
//     borderRightWidth: 1,
//     paddingTop: 3,
//   },
//   rate: {
//     width: "10%",
//     textAlign: "center",
//     borderRightColor: borderColor,
//     borderRightWidth: 1,
//     paddingTop: 3,
//   },
//   sn: {
//     width: "5%",
//     textAlign: "center",
//     borderRightColor: borderColor,
//     borderRightWidth: 1,
//     paddingTop: 3,
//   },
//   uom: {
//     width: "10%",
//     borderRightColor: borderColor,
//     borderRightWidth: 1,
//     paddingTop: 3,
//   },
//   UOM: {
//     width: "10%",
//     textAlign: "center",
//     borderRightColor: borderColor,
//     borderRightWidth: 1,
//     paddingTop: 3,
//   },
//   Subtotal: {
//     width: "15%",
//     textAlign: "center",
//     paddingTop: 3,
//   },

//   row: {
//     flexDirection: "row",
//     borderBottomColor: "#bff0fd",
//     borderBottomWidth: 1,
//     alignItems: "center",
//     height: 24,
//     fontSize: 10,
//     fontStyle: "bold",
//   },
//   column: {
//     flexDirection: "row",
//     borderBottomColor: "#bff0fd",
//     borderBottomWidth: 1,
//     alignItems: "left",
//     height: 20,
//     fontSize: 10,
//     fontStyle: "bold",
//   },
//   table_amount_in_words: {
//     width: "67%",
//     borderRightColor: borderColor,
//     borderLeftColor: borderColor,
//     borderRightWidth: 1,
//     borderLeftWidth: 1,
//     // borderBottomWidth: 2,
//     // borderBottomColor: noColor,
//     // textTransform: "uppercase",
//     paddingLeft: "10px",
//     paddingTop: 5,
//     fontSize: 9,
//   },
//   table_amount_in_words_bottom: {
//     width: "100%",
//     textTransform: "capitalize",
//     //textTransform: "uppercase",
//     paddingLeft: "10px",
//     paddingRight: "10px",
//     paddingTop: 5,
//     fontSize: 10,
//   },
//   table_footer_description: {
//     width: "18%",
//     borderRightColor: borderColor,
//     borderRightWidth: 1,
//     paddingLeft: 3,
//     paddingTop: 4,
//     textAlign: "right",
//     paddingRight: 10,
//   },
//   total_footer: {
//     width: "15%",
//     // textAlign: "center",
//     textAlign: "right",
//     paddingRight: 10,
//     paddingTop: 3,
//     borderRightColor: borderColor,
//     borderRightWidth: 1,
//     // width: "15%",
//     // textAlign: "center",
//     // justifyContent: "center",
//     // fontSize: 12,
//     // borderRightColor: borderColor,
//     // borderRightWidth: 1,
//     // paddingTop: 1,
//   },
//   total: {
//     width: "18%",
//     textAlign: "right",
//     paddingRight: 8,
//   },
//   totalCalc: {
//     flexDirection: "row",
//     marginTop: 26,
//     justifyContent: "flex-end",
//   },

//   titleContainer1: {
//     flexDirection: "row",
//     marginTop: 200,
//   },
//   reportTitle1: {
//     paddingRight: 20,
//     fontSize: 10,
//     textAlign: "center",
//   },
//   signatureContainer: {
//     marginTop: 40,
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   signatureContainer1: {
//     flexDirection: "row",
//     marginTop: 2,
//     justifyContent: "space-between",
//   },
//   fragmentHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   fragmentHeaderRight: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   signlabel: {
//     marginTop: 140,
//     fontSize: 10,
//     fontStyle: "bold",
//   },
//   thankyou: {
//     fontSize: 10,
//     fontStyle: "bold",
//   },
//   rightsign: {
//     flexDirection: "row",
//     textAlign: "right",
//   },
//   leftsign: {
//     flexDirection: "row",
//     textAlign: "left",
//   },
//   leftsignLabel:{
//     flexDirection: "row",
//     textAlign: "left",
//   },
//   rightsignLabel: {
//     flexDirection: "row",
//     textAlign: "right",
//   },
//   sectionend: { textAlign: "center", margin: 0 },
// });

// export default function Salespdf({ productData, data, company, customerDetail, discountPercent, taxPercent }) {
//   const companyContext = React.useContext(CompanyContext);
//   const userSessionContext = React.useContext(UserSessionContext);
//   const fiscalYear = companyContext.fiscal[0]["fiscalYear"];
//   const [paymentModes, setPaymentModes] = useState([]);
//   const[salesData, setSalesData] = useState([]);

//   useEffect(async() => {
//     await axios
//       .get(`${config.APP_CONFIG}/Sales/SalesSummary/api/${data.id}`, {
//         headers: { Authorization: userSessionContext.token },
//       })
//       .then((res) => {
//         if (res.data.status_code === 200) {
//           // console.log(res.data.msg);
//           // console.log(res.data.msg.salesData);
//           setSalesData(res.data.msg.salesData[0]);
//           setPaymentModes(res.data.msg.paymentMode);
          
//         } else {
//           //  window.alert("hello");
//           toast.error(res.data.msg);
      
       
//           //setPaymentMode([]);
//         }
//       })
//       .catch((err) => {
      
    
//         //setPaymentMode([]);
//       });
//   }, []);



//   const stringData = paymentModes.reduce((result, item) => {
//     return `${result}/ ${item.mode}`
//   }, "")

// console.log(customerDetail);

//   return (
//     <div>
//       <PDFViewer width="800" height="500">
//         <MyDocument
//           productData={productData}
//           data={data}
//           company={company}
//           fiscalYear={fiscalYear}
//           customerDetail ={customerDetail}
//           stringData = {stringData}
//           discountPercent = {discountPercent}
//           taxPercent = {taxPercent}
//           salesData = {salesData}
//         />
//       </PDFViewer>
//     </div>
//   );
// }

// const MyDocument = ({ productData, data, company, fiscalYear, stringData, customerDetail, discountPercent, taxPercent, salesData }) => {  
//   return (
//     <Document>
//       <Page wrap size="A4" style={styles.page}>
//         <View wrap={false}>
//           <BillFrom company={company} fiscalYear={fiscalYear} />
//           <BillTo
//             company={company}
//             data={data}
//             productData={productData}
//             fiscalYear={fiscalYear}
//             customerDetail ={customerDetail}
//             stringData = {stringData}
//             salesData = {salesData}
//           />
//           <InvoiceItemsTable productData={productData} />
//           <InvoiceTableFooter data={data} productData={productData} discountPercent = {discountPercent} taxPercent = {taxPercent} />

//           <InvoiceThankYouMsg data={data}
//           company={company} />
//         </View>
//       </Page>
//       <Page wrap size="A4" style={styles.page}>
//         <View wrap={false}>
//           <BillFromSecond company={company} fiscalYear={fiscalYear} />
//           <BillTo
//             company={company}
//             data={data}
//             productData={productData}
//             fiscalYear={fiscalYear}
//             customerDetail ={customerDetail}
//             stringData = {stringData}
//             salesData = {salesData}
//           />
//           <InvoiceItemsTable productData={productData} />
//           <InvoiceTableFooter data={data} productData={productData} discountPercent = {discountPercent} taxPercent = {taxPercent}/>

//           <InvoiceThankYouMsg data={data}
//           company={company} />
//         </View>
//       </Page>
//     </Document>
//   );
// };

// const BillFrom = ({ company }) => {
//   return (
//     <View style={styles.headerContainer}>
//       <Text style={{ fontSize: "12px", marginBottom: "-3px", fontStyle: "bold"}}>
//         {company.name || ""}
//       </Text>
//       <Text>{company.address || ""}</Text>
//       <View style={styles.vatNoContainer}>
//         <Text style={styles.label}>VAT No.:</Text>
//         <Text style={styles.invoiceDate}>{company.panNo || ""}</Text>
//       </View>
//       <Text>{company.phone_no || ""}</Text>
//       <Text>Tax Invoice</Text>
//     </View>
//   );
// };
// const BillFromSecond = ({ company }) => {
//   return (
//     <View style={styles.headerContainer}>
//       <Text style={{ fontSize: "12px", marginBottom: "-3px"}}>
//         {company.name || ""}
//       </Text>
//       <Text>{company.address || ""}</Text>
//       <View style={styles.vatNoContainer}>
//         <Text style={styles.label}>VAT No.:</Text>
//         <Text style={styles.invoiceDate}>{company.panNo || ""}</Text>
//       </View>
//       <Text>{company.phone_no || ""}</Text>
//       <Text>Invoice</Text>
//     </View>
//   );
// };
// const BillTo = ({ data, fiscalYear, customerDetail, stringData, salesData }) => {

// //console.log(salesData);
//   const date_of_sales = format(
//     new Date(data.dateOfSales),
//     "yyyy/MM/dd"
//   );
//   const date_of_sales_nepali = format(
//     new Date(data.dateOfSales),
//     "yyyy/MM/dd "
//   );
//   var adbs = require("ad-bs-converter");
//   const nepalidate = adbs.ad2bs(date_of_sales_nepali);
//   const miti =
//     nepalidate.en["year"] +
//     "/" +
//     nepalidate.en["month"] +
//     "/" +
//     nepalidate.en["day"];



//   return (
//     <Fragment>
//       <View style={styles.fragmentHeader}>
//         <View style={styles.invoiceDateContainer}>
//           <Text style={styles.label}>Buyer's Name: </Text>
//           <Text style={styles.invoiceDate}>{data.customerName || ""}</Text>
//         </View>
//         <View style={styles.invoiceDateContainer}>
//           <Text style={styles.label}>Invoice No.:</Text>
//           <Text style={styles.invoiceDate}>{data.bill_no}</Text>
//         </View>
//       </View>
//       <View style={styles.fragmentHeader}>
//         <View style={styles.invoiceDateContainer}>
//           <Text style={styles.label}>Address: </Text>
//           <Text style={styles.invoiceDate}>{customerDetail.address1 || ""}</Text>
//         </View>
//         <View style={styles.invoiceDateContainer}>
//           <Text style={styles.label}>Inovice Date: </Text>
//           <Text style={styles.invoiceDate}>{date_of_sales}</Text>
//         </View>
//       </View>
//       <View style={styles.fragmentHeader}>
//         <View style={styles.invoiceDateContainer}>
//           <Text style={styles.label}>Buyer's VAT No.: </Text>
//           <Text style={styles.invoiceDate}>{customerDetail.panNo || ""}</Text>
//         </View>
//         <View style={styles.invoiceDateContainer}>
//           <Text style={styles.label}>Nepali Date: </Text>
//           <Text style={styles.invoiceDate}>{miti}</Text>
//         </View>
//       </View>
//       <View style={styles.fragmentHeader}>
//         <View style={styles.invoiceDateContainer}>
//           <Text style={styles.labelPayment}>Mode of Payment: </Text>
//           <Text style={styles.invoiceDate}>{stringData? stringData.toString() : "Credit" }</Text> 
//         </View>
//         <View style={styles.invoiceDateContainer}>
//           <Text style={styles.label}>Fiscal Year: </Text>
//           <Text style={styles.invoiceDate}>{fiscalYear}</Text>
//         </View>
//       </View>
//       <View style={styles.fragmentHeader}>
//         <View style={styles.invoiceDateContainer}>
//           <Text style={styles.label}>Cashier Name: </Text>
//           <Text style={styles.invoiceDate}>{salesData.cashierName}</Text>
//         </View>
//       </View>
//     </Fragment>
//   );
// };
// const InvoiceTableHeader = () => (
//   <View style={styles.container}>
//     <Text style={styles.sn}>S.N.</Text>
//     <Text style={styles.description_item_table_headers}>Item</Text>
//     <Text style={styles.uom}>Unit</Text>
//     <Text style={styles.Qty}>Qty</Text>
//     <Text style={styles.Rate}>Rate</Text>
//     <Text style={styles.amount}>Total</Text>
//   </View>
// );
// const InvoiceTableFooter = ({ data, discountPercent, taxPercent }) => {
//   const numWords = require("num-words");
//   //const amountInWords = numWords(parseInt(data.grandTotal));

//   let amountArr = ((data.grandTotal).toFixed(2)).toString().split(".");
//   //console.log(`${data.grandTotal} = ${numWords(amountArr[0])} rupees and ${numWords(amountArr[1])} paisa`);
//   // let amountWord =
//   //   numWords(amountArr[0]) + " rupees and " + numWords(amountArr[1]) + " paisa";
//   let amountWord = numWords(amountArr[0]) + " rupees and " + numWords(amountArr[1]) + " paisa" + " only";
//   const netTotal = data.subTotal - data.discount;
//   return (
//     <Fragment>
//       <View style={styles.column}>
//         <Text style={styles.table_amount_in_words}></Text>
//         <Text style={styles.table_footer_description}>Sub-Total </Text>
//         <Text style={styles.total_footer}>{(data.subTotal).toFixed(2)}</Text>
//       </View>
//       <View style={styles.column}>
//         <Text style={styles.table_amount_in_words}></Text>
//         <Text style={styles.table_footer_description}>Discount ({discountPercent}%) </Text>
//         <Text style={styles.total_footer}> {(data.discount)}</Text>
//       </View>
//       <View style={styles.column}>
//         <Text style={styles.table_amount_in_words}></Text>
//         <Text style={styles.table_footer_description}>Taxable Amt</Text>
//         <Text style={styles.total_footer}> {(netTotal).toFixed(2)}</Text>
//       </View>
//       <View style={styles.column}>
//         <Text style={styles.table_amount_in_words}></Text>
//         <Text style={styles.table_footer_description}>Total Tax ({taxPercent}%) </Text>
//         <Text style={styles.total_footer}> {(data.taxAmount).toFixed(2)}</Text>
//       </View>
//       <View style={styles.column}>
//         <Text style={styles.table_amount_in_words}></Text>
//         <Text style={styles.table_footer_description}>Grand Total </Text>
//         <Text style={styles.total_footer}> {(data.grandTotal).toFixed(2)}</Text>
//       </View>
//       <Text style={styles.table_amount_in_words_bottom}>In Words: {amountWord}</Text>     
//     </Fragment>
//   );
// };

// function InvoiceItemsTable({ productData }) {
//   return (
//     <View style={styles.tableContainer}>
//       <InvoiceTableHeader />
//       <InvoiceTableRow items={productData} />
//     </View>
//   );
// }
// const InvoiceTableRow = ({ items }) => {
//   const rows = items.map((item, idx) => (
//     <View style={styles.row} key={item.id.toString()}>
//       <Text style={styles.sn}>{idx + 1}</Text>
//       <Text style={styles.description}>{item.productName}</Text>
//       <Text style={styles.UOM}>{item.unitName}</Text>
//       <Text style={styles.qty}>{item.productQTY}</Text>
//       <Text style={styles.rate}>{item.productCost}</Text>
//       <Text style={styles.Subtotal}>{item.productTotal}</Text>
//     </View>
//   ));
//   return <Fragment>{rows}</Fragment>;
// };
// const InvoiceThankYouMsg = ({data, company}) => {
//   return (
//     <Fragment>
//       <View style={styles.signatureContainer}>
//         <Text style={styles.leftsign}>-------------------------</Text>
//         <Text style={styles.rightsign}>-------------------------</Text>
//       </View>
//       <View style={styles.signatureContainer1}>
//         <Text style={styles.leftsignLabel}>For, {data.customerName}</Text>
//         <Text style={styles.rightsignLabel}>For, {company.name}</Text>
//       </View>
//       <View style={styles.signatureContainer1}>
//         <Text style={styles.leftsignLabel}>Receiver's Name:</Text>
//       </View>
//       <View style={styles.signatureContainer1}>
//         <Text style={styles.leftsignLabel}>Receiver's Contact:</Text>
//       </View>
//       <View>
//         <Text style={styles.sectionend}>Thank you for your Business </Text>
//       </View>
//     </Fragment>
//   );
// };
