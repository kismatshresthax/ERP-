import React, { useState } from "react";
import { toast } from "react-toastify";

import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";

import Controls from "../../controls/Controls";
//import CardHeader from "@material-ui/core/CardHeader";

import { useForm, Form } from "../../home/useForm";

import axios from "axios";
import config from "../../../utils/config";
//import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import UserSessionContext from "../../../contexts/UserSessionContext";
import ReactToPrint from "react-to-print";
import * as XLSX from "xlsx";
import * as XlsxPopulate from "xlsx-populate/browser/xlsx-populate";

import { format } from "date-fns";
import "date-fns";
import CompanyContext from "../../../contexts/CompanyContext";
import PrintIcon from "@mui/icons-material/Print";
import ReportHeader from "../../reports/ReportHeader";
import PurchasedetailTable from "../../../utils/PurchasedetailTable";
import NepaliDate from "../../../utils/NepaliDate";
import ExcelSheet from "../../../utils/ExcelSheet";
import { Button } from "@material-ui/core";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: "white",
    color: "#546e7a",
    justifyContent: "left",
    padding: "10px 0px",
    fontWeight: "bold",
  },
  content: {
    padding: 0,
  },
  status: {
    marginRight: "5px",
  },
  actions: {
    justifyContent: "flex-end",
  },
  summaryTable: {
    width: "auto",
    marginBottom: "10px",
    pointerEvents: "none",
  },
  noBorder: {
    border: "none",
  },
  denseCell: {
    padding: "5px",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  inputGroup: {
    marginBottom: theme.spacing(1),
  },
}));
const initialFValues = {
  dateFrom: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
  dateTo: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
};
export default function SalesMaterializedReport() {
  const componentRef = React.useRef(null);
  const { values, handleInputChange } = useForm(initialFValues);
  const userSessionContext = React.useContext(UserSessionContext);
  const companyContext = React.useContext(CompanyContext);
  const classes = useStyles();
  const [records, setRecords] = useState([]);
  const handleArrow = (e) => {
    e.preventDefault();
    setRecords([])
  


  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    const dateFrom = format(new Date(values.dateFrom), "yyyy-MM-dd");
    const dateTo = format(new Date(values.dateTo), "yyyy-MM-dd");

   await axios
      .get(
        `${config.APP_CONFIG}/Sales/materialized/api/${dateFrom}/${dateTo}`,
        {
          headers: {
            Authorization: userSessionContext.token,
          },
        }
      )
      .then((res) => {
        if (res.data.status_code === 200) {
          setRecords(res.data.msg);
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogout();
        } else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
        } else {
          toast.error("Warning");
        }
      })
      .catch((err) => {
        toast.error("Error ");
      });
  };

  const totalAmount = records.reduce((a,v) =>  a = a + v.subTotal , 0 );
  const totalDiscount = records.reduce((a,v) =>  a = a + v.discount , 0 );
  const totalTaxable = records.reduce((a,v) =>  a = a + v.taxable , 0 );
  
  const totalTaxAmount = records.reduce((a,v) =>  a = a + v.taxAmount , 0 );
  const totalGrandTotal = records.reduce((a,v) =>  a = a + v.grandTotal , 0 );

  //const printedTime = i.slice(17, 30);

//excel export
const createDownLoadData = () => {
  handleExport().then((url) => {
   
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", url);
    downloadAnchorNode.setAttribute("download", "materialized_sales_report.xlsx");
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  });
};

const workbook2blob = (workbook) => {
  const wopts = {
    bookType: "xlsx",
    bookSST: false,
    type: "binary",
  };

  const wbout = XLSX.write(workbook, wopts);
  const blob = new Blob([s2ab(wbout)], {
    type: "application/octet-stream",
  });

  return blob;
};

const s2ab = (s) => {
  // The ArrayBuffer() constructor is used to create ArrayBuffer objects.
  // create an ArrayBuffer with a size in bytes
  const buf = new ArrayBuffer(s.length);



  //create a 8 bit integer array
  const view = new Uint8Array(buf);


  //charCodeAt The charCodeAt() method returns an integer between 0 and 65535 representing the UTF-16 code
  for (let i = 0; i !== s.length; ++i) {

    view[i] = s.charCodeAt(i);
  }

  return buf;
};
const handleExport = () => {


  const company =  [{A: companyContext.company.name}]  
  const address = [{A: companyContext.company.address || "Address"}]
  const panNo = [{A: "Pan No:" + companyContext.company.panNo}]
  const title = [{A: 'Materialized Sales Report'}]
  const dateFrom = [{ A: 'From: '+ format(new Date(values.dateFrom), "yyyy-MM-dd").toString() }]
  const dateTo   = [{A: 'To: '+ format(new Date(values.dateTo), "yyyy-MM-dd").toString()}]

  let table1 = [
    {
      A: "S.N.",
      B: "Fiscal Year",
      C: "Bill No",
      D: "Customer Name",
      E: "Customer PAN",
      F: "Bill Date",
      G: "Amount",
      H: "Discount",
      I: "Taxable Amount",
      J: "Tax amount",
      K: "Total amount",
      L: "Sync with IRD",
      M: "Is Bill Printed?",
      N: "Is Bill Active?",
      O: "Printed Time",
      P: "Entered By",
      Q: "Printed By",
      R: "Is Real Time?",
      S: "Payment Method",
      T: "VAT Refund Amount(If Any)",
      U: "Transaction ID(If Any)",
    },
  ];

  let table2 = [
    {
      F: "Total",
      G: totalAmount,
      H: totalDiscount,
      I: totalTaxable,
      J: totalTaxAmount,
      K: totalGrandTotal,

    },
  ];

    records.map((item, index) => {
    table1.push({
      A: index+1,
      B: item.fiscalyear,
      C: item.bill_no,
      D: item.customerName,
      E: item.panNo,
      F: item.dateOfSales,
      G: item.subTotal,
      H: item.discount,
      I: item.taxable,
      J: item.taxAmount,
      K: item.grandTotal,
      L: "True",
      M: item.isBillPrinted,
      N: item.isBillActive,
      O: item.dateOfSales.slice(17,25),
      P: item.cashierName,
      Q: item.cashierName,
      R: "True",
      S: item.paymentMode,
      T: "0",
      U: item.id,

    });
  });

  table1 = (table1)
  .concat(table2);
 
  const finalData = [...company, ...address, ...panNo, ...title, ...dateFrom, ...dateTo, ...table1];

 
  //create a new workbook
  const wb = XLSX.utils.book_new();

  const sheet = XLSX.utils.json_to_sheet(finalData, {
    skipHeader: true,
  });

  XLSX.utils.book_append_sheet(wb, sheet, "materialized_sales_report");

  // binary large object
  // Since blobs can store binary data, they can be used to store images or other multimedia files.
  const workbookBlob = workbook2blob(wb);

  var headerIndexes = [];
  finalData.forEach((data, index) =>
    data["A"] === "S.N." ? headerIndexes.push(index) : null
  );

  const totalRecords = records.length;
  const dataInfo = {
    companyCell: "A1",
    companyRange: "A1:U1",
    addressCell: "A2",
    addressRange: "A2:U2",
    panCell: "A3",
    panRange: "A3:U3",
    titleCell: "A4",
    titleRange: "A4:U4",
    dateFromCell: "A5",
    dateFromRange: "A5:U5",
    dateToCell: "A6",
    dateToRange: "A6:U6",
    tbodyRange: `A7:U${finalData.length}`,
    theadRange:
      headerIndexes?.length >= 1
        ? `A${headerIndexes[0] + 1}:U${headerIndexes[0] + 1}`
        : null,
  };
  return addStyle(workbookBlob, dataInfo);
};

const addStyle = (workbookBlob, dataInfo) => {
  return XlsxPopulate.fromDataAsync(workbookBlob).then((workbook) => {
    workbook.sheets().forEach((sheet) => {
      sheet.usedRange().style({
        fontFamily: "Arial",
        verticalAlignment: "center",
      });

      sheet.column("A").width(10);
      sheet.column("B").width(10);
      sheet.column("C").width(10);
      sheet.column("D").width(20);
      sheet.column("E").width(15);
      sheet.column("F").width(30);
      sheet.column("G").width(10);
      sheet.column("H").width(10);
      sheet.column("I").width(10);
      sheet.column("J").width(10);
      sheet.column("K").width(10);
      sheet.column("L").width(10);
      sheet.column("M").width(10);
      sheet.column("N").width(10);
      sheet.column("O").width(10);
      sheet.column("P").width(10);
      sheet.column("Q").width(10);
      sheet.column("R").width(10);
      sheet.column("S").width(10);
      sheet.column("T").width(10);
      sheet.column("U").width(10);

      sheet.range(dataInfo.companyRange).merged(true).style({
        bold: true,
        horizontalAlignment: "center",
        verticalAlignment: "center",
      });    
      
      sheet.range(dataInfo.addressRange).merged(true).style({
        // bold: true,
        horizontalAlignment: "center",
        verticalAlignment: "center",
      });   
      
      sheet.range(dataInfo.panRange).merged(true).style({
        // bold: true,
        horizontalAlignment: "center",
        verticalAlignment: "center",
      });

      sheet.range(dataInfo.titleRange).merged(true).style({
        bold: true,
        horizontalAlignment: "center",
        verticalAlignment: "center",
      });

      sheet.range(dataInfo.dateFromRange).merged(true).style({
        // bold: true,
        horizontalAlignment: "center",
        verticalAlignment: "center",
      });   

      sheet.range(dataInfo.dateToRange).merged(true).style({
        // bold: true,
        horizontalAlignment: "center",
        verticalAlignment: "center",
      });   

      if (dataInfo.tbodyRange) {
        sheet.range(dataInfo.tbodyRange).style({
          horizontalAlignment: "left",
        });
      }
      sheet.range(dataInfo.theadRange).style({
        bold: true,
        horizontalAlignment: "center",
      });
    
    });

    return workbook
      .outputAsync()
      .then((workbookBlob) => URL.createObjectURL(workbookBlob));
  });
};
let table1 = [
  {
    A: "S.N.",
    B: "Fiscal Year",
    C: "Bill No",
    D: "Customer Name",
    E: "Customer PAN",
    F: "Bill Date",
    G: "Amount",
    H: "Discount",
    I: "Taxable Amount",
    J: "Tax amount",
    K: "Total amount",
    L: "Sync with IRD",
    M: "Is Bill Printed?",
    N: "Is Bill Active?",
    O: "Printed Time",
    P: "Entered By",
    Q: "Printed By",
    R: "Is Real Time?",
    S: "Payment Method",
    T: "VAT Refund Amount(If Any)",
    U: "Transaction ID(If Any)",
  },
];
let table2=records.map((item, index) => 
 [{
    A: index+1,
    B: item.fiscalYear,
    C: item.bill_no,
    D: item.customerName,
    E: item.panNo,
    F:  format(new Date(item.dateOfSales), "yyyy/MM/dd "),
    G: item.subTotal,
    H: item.discount,
    I: item.taxable,
    J: item.taxAmount,
    K: item.grandTotal,
    L: "True",
    M: item.isBillPrinted,
    N: item.isBillActive,
    O: item.dateOfSales.slice(17,25),
    P: item.cashierName,
    Q: item.cashierName,
    R: "True",
    S: item.paymentMode,
    T: "0",
    U: item.id,

  }]
);

let table3 = [
  {
    A: "Total",
    D:totalAmount.toFixed(2),
    E:totalDiscount.toFixed(2),
    F: totalTaxable.toFixed(2),
    G:totalTaxAmount.toFixed(2),
    H: totalGrandTotal.toFixed(2),

  },
];

// export export
let Table1 = [
  {
    A: "S.N.",
    B: "Fiscal Year",
    C: "Bill No",
    D: "Customer Name",
    E: "Customer PAN",
    F: "Bill Date",
    G: "Amount",
    H: "Discount",
    I: "Taxable Amount",
    J: "Tax amount",
    K: "Total amount",
    L: "Sync with IRD",
    M: "Is Bill Printed?",
    N: "Is Bill Active?",
    O: "Printed Time",
    P: "Entered By",
    Q: "Printed By",
    R: "Is Real Time?",
    S: "Payment Method",
    T: "VAT Refund Amount(If Any)",
    U: "Transaction ID(If Any)",
  },
];
records.map((item, index) => 
Table1.push({

    A: index+1,
    B: item.fiscalYear,
    C: item.bill_no,
    D: item.customerName,
    E: item.panNo,
    F:  format(new Date(item.dateOfSales), "yyyy/MM/dd "),
    G: item.subTotal,
    H: item.discount,
    I: item.taxable,
    J: item.taxAmount,
    K: item.grandTotal,
    L: "True",
    M: item.isBillPrinted,
    N: item.isBillActive,
    O: item.dateOfSales.slice(17,25),
    P: item.cashierName,
    Q: item.cashierName,
    R: "True",
    S: item.paymentMode,
    T: "0",
    U: item.id,

  })
);
Table1.push(
  {
    A: "Total",
    G:totalAmount.toFixed(2),
    H:totalDiscount.toFixed(2),
    I: totalTaxable.toFixed(2),
    J:totalTaxAmount.toFixed(2),
    K: totalGrandTotal.toFixed(2),

  },
)

const ReportComponent=()=>{
  return (
  
    <div>
      <ReportHeader title="Materailized Report"/>
      <Form onSubmit={handleSubmit}>
        <Grid container direction="row">
          <Grid item lg={12} md={12} xs={12}>
            <Card variant="outlined">
              <Grid container>
                <Grid item xs={12} sm={4}>
                  <Controls.DatePicker
                    name="dateFrom"
                    label="DateFrom"
                    value={values.dateFrom}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Controls.DatePicker
                    name="dateTo"
                    label="DateTo"
                    value={values.dateTo}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={4} style={{ display: "flex" }}>
                  <Controls.Button type="submit" text="Submit" />
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </div>
 
  )
}
  return (
    <div
      className="content-wrapper iframe-mode"
      data-widget="iframe"
      data-loading-screen={750}
    >
      
     
      {records.length !== 0 ? (
        <div>
        <Button onClick={(e) => handleArrow(e)}><ArrowBackIcon /></Button>
          
        </div>
      ) :  <div>
      <ReportComponent/>
     </div>}
      {records.length !== 0 ? (
         <div>
         <div style={{ textAlign: "right" }}>


         


           <Button>

             <ExcelSheet
               data={[Table1]}
               title="Trial Balance Report" />
           </Button>

           <ReactToPrint
             pageStyle={"@page{size: landscape;}"}
             // trigger={() => <button  className="printBtn" <Printicon/> style={{float: "right", left: "40px"}}>Print</button>}
             trigger={() => (
               <Controls.Button
                 text="Print"
                 variant="outlined"
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

               <p className="companyReport">Materialized Sales Report</p>
               <div className="date">

                 <p>
                   From:{" "}
                   {format(
                     new Date(values.dateFrom),
                     "yyyy/MM/dd"
                   ).toString() +
                     " (" +NepaliDate(values.dateFrom)
                     +"B.S)"
                     
                     }
                 </p>
                 <p>


                   To:{" "}
                   {format(new Date(values.dateTo), "yyyy/MM/dd").toString() +
                     " (" +
                     NepaliDate(values.dateFrom) +
                     " B.S.)"}
                 </p>
               </div>
             </div>
            
        
         
         <PurchasedetailTable table1={table1} table2={table2} table3={table3}/>
        </div>
        </div>
        </div>
      ) : (
        <div className="reportNotFound">
          <p>No records to display</p>
        </div>
      )}
    </div>
  );
}
