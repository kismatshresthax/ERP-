import React, { useState} from "react";
//import ReactExport from "react-export-excel";
import { toast } from "react-toastify";

// Material UI

import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";

import Controls from "../../controls/Controls";



import Spinner from "../../../utils/spinner";

import { useForm, Form } from "../../home/useForm";
import ReactToPrint from "react-to-print";
import axios from "axios";
import config from "../../../utils/config";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import UserSessionContext from "../../../contexts/UserSessionContext";

import { format } from "date-fns";
import "date-fns";
import CompanyContext from "../../../contexts/CompanyContext";
import PrintIcon from "@mui/icons-material/Print";
import ReportHeader from "../../reports/ReportHeader";
import ExcelSheet from "../../../utils/ExcelSheet";
import NepaliDate from "../../../utils/NepaliDate";
import PurchasedetailTable from "../../../utils/PurchasedetailTable";
import { Button } from "@material-ui/core";

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
  companyId: "",
};

export default function Voidreport() {
  const componentRef = React.useRef(null);
  const { values, handleInputChange } = useForm(initialFValues);
  const userSessionContext = React.useContext(UserSessionContext);
  const companyContext = React.useContext(CompanyContext);
  const companyId = companyContext.company.id;
  // let history = useHistory();
  const classes = useStyles();
  const [records, setRecords] = useState([]);

  const [productList, setProductList] = useState([]);
  const [Data, setData] = useState([]);
  const [voidData, setVoidData] = useState([]);
  const handleArrow = (e) => {
    e.preventDefault();
    setRecords([])



  }

  // const permissionContext=React.useContext(UserAuthenticationContext);
  //  let Permission = permissionContext.permissions;
  //  let curr_mod_permission =Permission.filter( x=>{return x["module_name"].toLowerCase() === "accounting"})
  //  let userPermission= curr_mod_permission[0]
  // const voidSubmit = () => {

  var adbs = require("ad-bs-converter");

  const handleSubmit = async (e) => {

    e.preventDefault();
    const dateFrom = format(new Date(values.dateFrom), "yyyy-MM-dd");
    const dateTo = format(new Date(values.dateTo), "yyyy-MM-dd");

    const _data = {
      dateFrom: format(new Date(values.dateFrom), "yyyy-MM-dd"),
      dateTo: format(new Date(values.dateTo), "yyyy-MM-dd"),
      companyId: companyContext.company.id
    }



    axios
      .get(`${config.APP_CONFIG}/Sales/SalesVoid/api/bydate/${dateFrom}/${dateTo}/${companyId}`, { headers: { Authorization: userSessionContext.token, }, })
      .then((res) => {
        if (res.data.status_code === 200) {
          setVoidData(res.data.msg)
          console.log(res.data.msg);
        }
        else if (res.data.status_code === 401) {
          userSessionContext.handleLogout();

        }
        else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
        } else {
          toast.error("Warning");

        }
      })
      .catch((err) => {
        toast.error("Error");
      });


  };
  if (voidData === undefined) {
    return <Spinner />;
  }


  //const productcost_total = voidData
  //.reduce((total, obj) => obj.productcost + total, 0)
  // .toFixed(2);
  //   const quantity_total = records
  //     .reduce((total, obj) => obj.productQTY + total, 0)
  //     .toFixed(2);
  //   const totalsales_total = records
  //     .reduce((total, obj) => obj.producttotal + total, 0)
  //     .toFixed(2);
  //   const discount_total = records
  //     .reduce((total, obj) => obj.discount + total, 0)
  //     .toFixed(2);
  //   const Taxable_total = parseFloat(totalsales_total - discount_total).toFixed(
  //     2
  //   );
  //   const tax_total = records
  //     .reduce((total, obj) => obj.taxAmount + total, 0)
  //     .toFixed(2);


  //sales return 
  // const total_sales_return= Data
  // .reduce((total, obj)=> obj.producttotal + total, 0)
  // .toFixed(2);

  // const total_discount_return= Data
  // .reduce((total, obj)=> obj.discount + total, 0)
  // .toFixed(2);

  // const total_taxableamount_return= Data
  // .reduce((total, obj)=> parseFloat(obj.producttotal - obj.discount) + total, 0)
  // .toFixed(2);

  // const total_vat_return= Data
  // .reduce((total, obj)=> obj.taxAmount + total, 0)
  // .toFixed(2);

  //granttotal

  // const grand_total=totalsales_total-total_sales_return;
  // const grand_total_discount=discount_total-total_discount_return;
  // const grand_total_taxableamount=Taxable_total-total_taxableamount_return;
  // const grand_total_vat=tax_total-total_vat_return;

  //  const ts = data.reduce((total, obj) => obj.ts + total, 0);
  //  console.log(q_total);
  //console.log( NepaliDate(format(new Date(values.dateFrom), "yyyy-MM-dd")),"YYYY-MM-DD");
  console.log('hello', records)
  const date_of_sales_nepali = format(new Date(values.dateFrom), "yyyy/MM/dd ");
  const date_nepali = format(new Date(values.dateTo), "yyyy/MM/dd ");

  const nepalidate = adbs.ad2bs(date_of_sales_nepali);
  const nepali = adbs.ad2bs(date_nepali);
  const miti =
    nepalidate.en["year"] +
    "/" +
    nepalidate.en["month"] +
    "/" +
    nepalidate.en["day"];
  const miti1 =
    nepali.en["year"] + "/" + nepali.en["month"] + "/" + nepali.en["day"];


  ///reuseable table

  let table1 = [{
    B: 'Bill NO',
    C: 'Void Bill',
    D: 'Fiscal Year',
    E: 'Pan No    ',
    F: 'Discount',
    G: "Reason",
    H: 'Service Charge',
    I: 'Net Sales',
    J: 'Customer Name',
    K: 'Void User',
    L: 'Grand Total    ',
    M: 'Tax Amount',
    N: 'Date'
  }]
  let table2 = voidData.map((i) => [{

    B: i.new_billNo
    ,
    C: i.void_billNo,
    D: i.fiscalYear,
    E: i.panNo
    ,
    F: i.discount,
    G: i.reason
    ,
    H: i.serviceCharge,

    I: "",
    J: i.customerName
    ,
    K: i.voidUser,
    L:i.grandTotal    ,
    M: i.taxAmount,
    N: format(new Date(i.date), "yyyy/MM/dd  HH:mm:ss")




  }])



  // export export

  let Table1 = [{
    B: 'Bill NO',
    C: 'Void Bill',
    D: 'Fiscal Year',
    E: 'Pan No    ',
    F: 'Discount',
    G: "Reason",
    H: 'Service Charge',
    I: 'Net Sales',
    J: 'Customer Name',
    K: 'Void User',
    L: 'Grand Total    ',
    M: 'Tax Amount',
    N: 'Date'
  }]

  voidData.map((i) =>
  Table1.push({

    B: i.new_billNo
    ,
    C: i.void_billNo,
    D: i.fiscalYear,
    E: i.panNo
    ,
    F: i.discount,
    G: i.reason
    ,
    H: i.serviceCharge,

    I: "",
    J: i.customerName
    ,
    K: i.voidUser,
    L:i.grandTotal    ,
    M: i.taxAmount,
    N: format(new Date(i.date), "yyyy/MM/dd  HH:mm:ss")

  }) )



  const ReportComponent = () => {
    return (

      <div>
        <ReportHeader title="Void Report" />
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
                      onFocus={e => e.target.blur()}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controls.DatePicker
                      name="dateTo"
                      label="DateTo"
                      value={values.dateTo}
                      onFocus={e => e.target.blur()}
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



      {voidData.length !== 0 ? (
        <Button onClick={(e) => handleArrow(e)}><ArrowBackIcon /></Button>

      ) :
        <div>
          <ReportComponent />
        </div>}
      {voidData.length !== 0 ? (
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

                <p className="companyReport"> Void Sales  Report</p>
                <div className="date">

                  <p>
                    From:{" "}
                    {format(
                      new Date(values.dateFrom),
                      "yyyy/MM/dd"
                    ).toString() +
                      " (" + NepaliDate(values.dateFrom)
                      + "B.S)"

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
              <PurchasedetailTable table1={table1} table2={table2} />
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


