// import React, { Fragment } from "react";
// import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
// import { PDFViewer } from "@react-pdf/renderer";
// const borderColor = "#90e5fc";
// const styles = StyleSheet.create({
//   page: {
//     fontFamily: "Helvetica",
//     fontSize: 11,
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
//   invoiceNoContainer: {
//     flexDirection: "row",
//     marginTop: 5,
//     paddingLeft: 350,
//   },
//   invoiceDateContainer: {
//     flexDirection: "row",
//     paddingLeft: 350,
//     justifyContent: "flex",
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
//   label: {
//     width: 80,
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
//     fontSize: 9,
//     fontStyle: "bold",
//   },
//   headerContainer: {
//     marginTop: 8,
//   },
//   billTo: {
//     marginTop: 8,
//     paddingBottom: 3,
//     fontFamily: "Helvetica-Oblique",
//   },
//   tableContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     marginTop: 25,
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
//     width: "37%",
//     borderRightColor: borderColor,
//     borderRightWidth: 1,
//   },
//   description: {
//     width: "37%",
//     borderRightColor: borderColor,
//     borderRightWidth: 1,
//   },

//   amount: {
//     width: "20%",
//     borderRightColor: borderColor,
//     borderRightWidth: 1,
//   },
//   Qty: {
//     width: "13%",
//     borderRightColor: borderColor,
//     borderRightWidth: 1,
//   },
//   qty: {
//     width: "14%",
//     textAlign: "center",
//     borderRightColor: borderColor,
//     borderRightWidth: 1,
//   },
//   Rate: {
//     width: "16%",
//     borderRightColor: borderColor,
//     borderRightWidth: 1,
//   },
//   rate: {
//     width: "16%",
//     textAlign: "center",
//     borderRightColor: borderColor,
//     borderRightWidth: 1,
//   },
//   uom: {
//     width: "14%",
//     borderRightColor: borderColor,
//     borderRightWidth: 1,
//   },
//   UOM: {
//     width: "14%",
//     textAlign: "center",
//     borderRightColor: borderColor,
//     borderRightWidth: 1,
//   },
//   Subtotal: {
//     width: "20%",
//     textAlign: "center",
//     borderRightColor: borderColor,
//     borderRightWidth: 1,
//   },

//   row: {
//     flexDirection: "row",
//     borderBottomColor: "#bff0fd",
//     borderBottomWidth: 1,
//     alignItems: "center",
//     height: 24,
//     fontSize: 12,
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

//   table_footer_description: {
//     width: "80%",
//     borderRightColor: borderColor,
//     borderRightWidth: 1,
//     textTransform: "uppercase",
//   },
//   total_footer: {
//     width: "20%",
//     textAlign: "center",
//     paddingRight: 20,
//     justifyContent: "flex-end",
//     fontSize: 12,
//     fontStyle: "bold",
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
//     fontSize: 12,
//     textAlign: "center",
//   },
//   signatureContainer: {
//     marginTop: 100,
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   signatureContainer1: {
//     flexDirection: "row",
//     marginTop: 2,
//     justifyContent: "space-between",
//   },

//   signlabel: {
//     marginTop: 140,
//     fontSize: 12,
//     fontStyle: "bold",
//   },
//   thankyou: {
//     fontSize: 12,
//     fontStyle: "bold",
//   },
//   rightsign: {
//     flexDirection: "row",
//     paddingRight: 20,
//     textAlign: "right",
//   },
//   leftsign: {
//     flexDirection: "row",
//     paddingLeft: 10,
//     textAlign: "left",
//   },
//   sectionend: { textAlign: "center", margin: 20 },
// });

// const invoice = {
//   id: "5df3180a09ea16dc4b95f910",
//   invoice_no: "-inv/2021-06-28",
//   company: "SMTECH",
//   email: "SMTECH@INFO.com",
//   phone: "+1 (872) 588-3809",
//   address: "Subidanagar, Tinkune ,kathmandu,Nepal,2012",
//   trans_date: "2021-09-12",
//   due_date: "2019-10-12",
// };

// export default function Purchasepdf(props) {
//   return (
//     <div>
//       <PDFViewer width="800" height="500">
//         <MyDocument productData={props.productData} data={props.data} />
//       </PDFViewer>
//     </div>
//   );
// }

// const MyDocument = (props) => (
//   <Document>
//     <Page wrap size="A4" style={styles.page}>
//       <View wrap={false}>
//         <InvoiceTitle title="Tax Invoice" />
//         <div style={{ display: "flex", justifyContent: "space-between" }}>
//           <InvoiceNo invoice={invoice} data={props.data} />
//           <BillTo invoice={invoice} />
//         </div>
//         <InvoiceItemsTable productData={props.productData} />
//         <InvoiceTableFooter data={props.data} />
//         <InvoiceTotalCalculation data={props.data} />

//         <InvoiceThankYouMsg />
//       </View>
//     </Page>
//     <Page wrap size="A4" style={styles.page}>
//       <View wrap={false}>
//         <InvoiceTitle title="Invoice" />
//         <div style={{ display: "flex", justifyContent: "space-between" }}>
//           <InvoiceNo invoice={invoice} data={props.data} />
//           <BillTo invoice={invoice} />
//         </div>
//         <InvoiceItemsTable productData={props.productData} />
//         <InvoiceTableFooter data={props.data} />
//         <InvoiceTotalCalculation data={props.data} />

//         <InvoiceThankYouMsg />
//       </View>
//     </Page>
//   </Document>
// );

// const InvoiceTitle = ({ title }) => (
//   <View style={styles.titleContainer}>
//     <Text style={styles.reportTitle}>{title}</Text>
//   </View>
// );

// const InvoiceNo = (props) => (
//   <Fragment>
//     <View style={styles.invoiceNoContainer}>
//       <Text style={styles.label}>Invoice No:</Text>
//       <Text style={styles.invoiceDate}>{props.data.vendorReference}</Text>
//     </View>
//     <View style={styles.invoiceDateContainer}>
//       <Text style={styles.label}>Date: </Text>
//       <Text>{props.data.recepitDate}</Text>
//     </View>
//   </Fragment>
// );
// const BillTo = ({ invoice }) => (
//   <View style={styles.headerContainer}>
//     <Text style={styles.billTo}>Bill To:</Text>
//     <Text>{invoice.company}</Text>
//     <Text>{invoice.address}</Text>
//     <Text>{invoice.phone}</Text>
//     <Text>{invoice.email}</Text>
//   </View>
// );
// const InvoiceTableHeader = () => (
//   <View style={styles.container}>
//     <Text style={styles.description_item_table_headers}>Name</Text>
//     <Text style={styles.Qty}>Qty</Text>
//     <Text style={styles.Rate}>Rate</Text>
//     <Text style={styles.uom}>UOM</Text>
//     <Text style={styles.amount}>Subtotal</Text>
//   </View>
// );
// const InvoiceTableFooter = (props) => {
//   return (
//     <View style={styles.column}>
//       <Text style={styles.table_footer_description}>Total: </Text>
//       <Text style={styles.total_footer}>{props.data.subtotal}</Text>
//     </View>
//   );
// };

// const InvoiceTotalCalculation = (props) => {
//   return (
//     <Fragment>
//       <View style={styles.invoicesubContainer}>
//         <Text style={styles.label}>Sub-Total</Text>
//         <Text style={styles.sublabel}>: {props.data.subtotal}</Text>
//       </View>
//       <View style={styles.invoiceContainer}>
//         <Text style={styles.label}>Discount </Text>
//         <Text style={styles.sublabel}>: {props.data.discount}</Text>
//       </View>
//       <View style={styles.invoiceContainer}>
//         <Text style={styles.label}>Taxable Amt</Text>
//         <Text style={styles.sublabel}>: {props.data.netTotal}</Text>
//       </View>
//       <View style={styles.invoiceContainer}>
//         <Text style={styles.label}>Total Tax </Text>
//         <Text style={styles.sublabel}>: {props.data.taxAmount}</Text>
//       </View>
//       <View style={styles.invoiceContainer}>
//         <Text style={styles.label}>Grand Total </Text>
//         <Text style={styles.sublabel}>: {props.data.grandTotal}</Text>
//       </View>
//     </Fragment>
//   );
// };

// function InvoiceItemsTable(props) {
//   return (
//     <View style={styles.tableContainer}>
//       <InvoiceTableHeader />
//       <InvoiceTableRow items={props.productData} />
//     </View>
//   );
// }
// const InvoiceTableRow = ({ items }) => {
//   const rows = items.map((item) => (
//     <View style={styles.row} key={item.id.toString()}>
//       <Text style={styles.description}>{item.product_name}</Text>
//       <Text style={styles.qty}>{item.productQty}</Text>
//       <Text style={styles.rate}>{item.productUnitPrice}</Text>
//       <Text style={styles.UOM}>{item.unitName}</Text>
//       <Text style={styles.Subtotal}>{item.productsubtotal}</Text>
//     </View>
//   ));
//   return <Fragment>{rows}</Fragment>;
// };
// const InvoiceThankYouMsg = () => {
//   return (
//     <Fragment>
//       <View style={styles.signatureContainer}>
//         <Text style={styles.leftsign}>(-----------------)</Text>
//         <Text style={styles.rightsign}>(-----------------)</Text>
//       </View>
//       <View style={styles.signatureContainer1}>
//         <Text style={styles.leftsign}>Auth.signature</Text>
//         <Text style={styles.rightsign}>Auth.signature</Text>
//       </View>
//       <View>
//         <Text style={styles.sectionend}>Thank you for your Business </Text>
//       </View>
//     </Fragment>
//   );
// };
