import React, { useState } from "react";
import { toast } from "react-toastify";
import { Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";

import Controls from "../../controls/Controls";
import CardHeader from "@material-ui/core/CardHeader";

import { useForm, Form } from "../../home/useForm";

import axios from "axios";
import config from "../../../utils/config";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import UserSessionContext from "../../../contexts/UserSessionContext";
import ReactToPrint from "react-to-print";
import * as XLSX from "xlsx";
import * as XlsxPopulate from "xlsx-populate/browser/xlsx-populate";

import { format } from "date-fns";
import "date-fns";
import CompanyContext from "../../../contexts/CompanyContext";
import PrintIcon from "@mui/icons-material/Print";
import ReportHeader from "../../reports/ReportHeader";
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
  const totalSalesAmount = records.reduce((a,v) =>  a = a + (v.subTotal-v.discount) , 0 );
  const totalServiceCharge = records.reduce((a,v) =>  a = a + v.serviceCharge , 0 );
  const totalNetSales = records.reduce((a,v) =>  a = a + (v.subTotal-v.discount+v.serviceCharge) , 0 );
  const totalTaxAmount = records.reduce((a,v) =>  a = a + v.taxAmount , 0 );
  const totalGrandTotal = records.reduce((a,v) =>  a = a + v.grandTotal , 0 );

  //const printedTime = i.slice(17, 30);

//excel export
const createDownLoadData = () => {
  handleExport().then((url) => {
    // console.log(url);
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", url);
    downloadAnchorNode.setAttribute("download", "sales_report.xlsx");
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

  // console.log(buf);

  //create a 8 bit integer array
  const view = new Uint8Array(buf);

  // console.log(view);
  //charCodeAt The charCodeAt() method returns an integer between 0 and 65535 representing the UTF-16 code
  for (let i = 0; i !== s.length; ++i) {
    // console.log(s.charCodeAt(i));
    view[i] = s.charCodeAt(i);
  }

  return buf;
};
const handleExport = () => {


  const company =  [{A: companyContext.company.name}]  
  const address = [{A: companyContext.company.address || "Address"}]
  const panNo = [{A: "Pan No:" + companyContext.company.panNo}]
  const title = [{A: 'Sales Report'}]
  const dateFrom = [{ A: 'From: '+ format(new Date(values.dateFrom), "yyyy-MM-dd").toString() }]
  const dateTo   = [{A: 'To: '+ format(new Date(values.dateTo), "yyyy-MM-dd").toString()}]

  let table1 = [
    {
      A: "S.N.",
      B: "Date",
      C: "Bill No",
      D: "Customer Name",
      E: "Customer PAN",
      F: "Subtotal",
      G: "Discount",
      H: "Total Sales Amt",
      I: "Service Charge",
      J: "Net Sales",
      K: "Taxable amt",
      L: "Tax",
      M: "Grandtotal",
      N: "Cashier",
      O: "Payment Mode",
      P: "Entered By",
      Q: "Cash Amt",
      R: "Card Amt",
      S: "Credit Amt",
    
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
      B:  item.dateOfSales,
      C: item.bill_no,
      D: item.customerName,
      E: item.panNo,
      F: item.subTotal,
      G: item.discount,
      H: (parseFloat(item.subTotal-item.discount)||0).toFixed(2),
      I: item.serviceCharge,
      J: (parseFloat((item.subTotal-item.discount)+item.serviceCharge)||0).toFixed(2),
      K: item.taxable,
      L: item.taxAmount,
      M: (item.grandTotal||0).toFixed(2),
      N: item.cashierName,
      O: item.paymentMode,
      Q:"0",
      R:"0",
      S:"0",

    });
  });

  table1 = (table1)
  .concat(table2);
 
  const finalData = [...company, ...address, ...panNo, ...title, ...dateFrom, ...dateTo, ...table1];

  // console.log(finalData);
  //create a new workbook
  const wb = XLSX.utils.book_new();

  const sheet = XLSX.utils.json_to_sheet(finalData, {
    skipHeader: true,
  });

  XLSX.utils.book_append_sheet(wb, sheet, "sales_report");

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
    companyRange: "A1:S1",
    addressCell: "A2",
    addressRange: "A2:S2",
    panCell: "A3",
    panRange: "A3:S3",
    titleCell: "A4",
    titleRange: "A4:S4",
    dateFromCell: "A5",
    dateFromRange: "A5:S5",
    dateToCell: "A6",
    dateToRange: "A6:S6",
    tbodyRange: `A7:S${finalData.length}`,
    theadRange:
      headerIndexes?.length >= 1
        ? `A${headerIndexes[0] + 1}:S${headerIndexes[0] + 1}`
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
const ReportComponent=()=>{
  return (
    
    <>
         <ReportHeader title="Sales Report By Date"/>
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
    </>

  )
}
  return (
    <div
     
    >
     
 
   
      {records.length !== 0 ? (
        <div>
          <div  style={{textAlign: "right", marginRight:"0px", display:"flex",justifyContent:"space-between"}}>
          <button
            style={{
              position: "absolute",
              marginLeft:"0px", 
              textAlign: "left"
            }}
            onClick={() => {
              createDownLoadData();
            }}
            className="btn btn-success btn-sm ml-1"
            >
            Excel Export
            </button>
          <ReactToPrint
            pageStyle={'@page{size: landscape;}'}
            // trigger={() => <button  className="printBtn" <Printicon/> style={{float: "right", left: "40px"}}>Print</button>}
            trigger={()=> <Controls.Button
              text="Print"
              variant="outlined"
              startIcon={<PrintIcon />}
              className="printBtn"
            />}
            content={() => componentRef.current}
          />
           
          </div>
          <div ref={componentRef} className="materializedReport">
          <div className="materializedReportTable reportPage">
          <div className="reportHeader">
            <p className="companyName">{companyContext.company.name}</p>
            <p className="companyAddress">{companyContext.company.address}</p>
            <p className="companyPan">Pan No : {companyContext.company.panNo}</p>
            <p className="companyReport">Sales Report</p>
            <div className="date">
              <p>From: {format(new Date(values.dateFrom), "yyyy-MM-dd").toString()}</p>
              <p>To: {format(new Date(values.dateTo), "yyyy-MM-dd").toString()}</p>
            </div>
          </div>
          <table >
            <thead>
              <tr>
                <th>Date</th>
                <th>Bill No.</th>
                <th>Customer Name</th>
                <th>Customer Pan</th>           
                <th>Subtotal</th>
                <th>Discount</th>
                <th>Total Sales Amt</th>
                <th>Service Charge</th>
                <th>Net Sales</th>
                <th>Tax</th>
                <th>Taxable </th>
                <th>Grandtotal</th>
                <th>Cashier</th>
                <th>Payment Mode</th>
                <th>Cash Amt</th>
                <th>Card Amt</th>
                <th>Credit Amt</th>
              </tr>
            </thead>
            <tbody>
              {records &&
                records.map((i) => (
                  <tr>
                    <td>{format(new Date(i.dateOfSales), "yyyy-MM-dd").toString()}</td>
                    <td>{i.bill_no||0}</td>
                    <td>{i.customerName}</td>
                    <td>{i.panNo}</td>
                
                    <td>{(i.subTotal||0).toFixed(2)}</td>
                    <td>{i.discount||0}</td>
                    <td>{(parseFloat(i.subTotal-i.discount)||0).toFixed(2)}</td>
                    <td>{i.serviceCharge}</td>
                    <td>{(parseFloat((i.subTotal-i.discount)+i.serviceCharge)||0).toFixed(2)}</td>
                    <td>{(i.taxAmount||0).toFixed(2)}</td>
                    <td>{(i.taxable).toFixed(2)}</td>
                    <td>{(i.grandTotal||0).toFixed(2)}</td>
                    <td>{i.cashierName}</td>
                    <td>{i.paymentMode}</td>
                    <td>{""}</td>
                    <td>{""}</td>
                    <td>{""}</td>
                  </tr>
                ))}
              <tr>
                <th colSpan={3}>Total</th>
                <th>{totalAmount.toFixed(2)}</th>
                <th>{totalDiscount.toFixed(2)}</th>
                <th>{totalSalesAmount.toFixed(2)}</th>
                <th>{totalServiceCharge.toFixed(2)}</th>
                <th>{totalNetSales.toFixed(2)}</th>
                <th>{totalTaxAmount.toFixed(2)}</th>
                <th>{totalTaxable.toFixed(2)}</th>
                <th>{totalGrandTotal.toFixed(2)}</th>
                <th>{""}</th>
                <th>{""}</th>
                <th>{""}</th>
                <th>{""}</th>
        
              </tr>
            </tbody>
          </table>
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
