import React, { useState, useEffect } from "react";
//import ReactExport from "react-export-excel";
import { toast } from "react-toastify";
import { Route } from "react-router-dom";
// Material UI

import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";

import Controls from "../../controls/Controls";


import * as XLSX from "xlsx";
import * as XlsxPopulate from "xlsx-populate/browser/xlsx-populate";
import Spinner from "../../../utils/spinner";

import { useForm, Form } from "../../home/useForm";
import ReactToPrint from "react-to-print";
import axios from "axios";
import config from "../../../utils/config";

import UserSessionContext from "../../../contexts/UserSessionContext";

import { format } from "date-fns";
import "date-fns";
import CompanyContext from "../../../contexts/CompanyContext";
import PrintIcon from "@mui/icons-material/Print";

import Select from "react-select";

import search_data from "../../../utils/Dummydata";
import ReportHeader from "../../reports/ReportHeader";
import ExcelSheet from "../../../utils/ExcelSheet";
import { Button, FormControl, Radio, RadioGroup } from "@material-ui/core";
import { FormControlLabel } from "@mui/material";
import NepaliDate from "../../../utils/NepaliDate";
import DateGroupedTables from "../../../utils/DateGroupedTables";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PurchasedetailTable from "../../../utils/PurchasedetailTable";

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




export default function SalesReportByDate() {
  const componentRef = React.useRef(null);
  const { values, handleInputChange } = useForm(initialFValues);
  const userSessionContext = React.useContext(UserSessionContext);
  const companyContext = React.useContext(CompanyContext);
  const companyId = companyContext.company.id;
  // let history = useHistory();
  const classes = useStyles();
  const [records, setRecords] = useState([]);
  const [searchData, setSearchData] = useState(search_data||[]);
  const [search, setSearch] = useState([]);
  const [all, setAll] = useState("");
  const [issubmit, setSubmit] = useState(false);
  const [List, setList] = useState([]);
  // const [productList, setProductList] = useState([]);
  const [Data, setData] = useState([]);
 // const [voidData, setVoidData] = useState([]);
 const [open, setOpen] = useState(false)
  const [value, setValue] = React.useState('All');

  useEffect(() => {
    if (searchData.label!== undefined) {
   
    loaddataById(searchData.label);
    
}

}, [searchData])


  const handleArrow = (e) => {
    e.preventDefault();
    setRecords([])
    
    
   
  }
  const handleAll = () => {
    setOpen(false)


  }
  const handleDate = () => {
    setOpen(true)


  }
  const handleChange = (event) => {
    setValue((event.target).value);
  };
 
  var adbs = require("ad-bs-converter");

 
const loaddataById = async (type) => {
   
    if(type==="items"){
    await axios.get(
        `${config.APP_CONFIG}/Sales/GetSalesProduct/api`,
        {
          headers: { Authorization: userSessionContext.token },
        }
      )
      .then((res) => {
        if (res.data && res.data.status_code && res.data.status_code === 200) {
          let temp = res.data.msg.map((name, index) => ({
            label: name.productname,
            value: name.id,
          }));
          setList(temp);
        
        } else {
          toast.error("Cannot load Unit Measurement.");
          setList([]);
        }
      })
      .catch((err) => {
        // toast.error("failed to load units");
        setList([]);
      });
  }

  else if(type==="category")
    {
        await axios.get(
            `${config.APP_CONFIG}/Products/ProductCategory/api`,
            {
              headers: { Authorization: userSessionContext.token },
            }
          )
          .then((res) => {
            if (res.data && res.data.status_code && res.data.status_code === 200) {
              let temp = res.data.msg.map((name, index) => ({
                label: name.categoryName,
                value: name.id,
              }));
              setList(temp);
            
            } else {
              toast.error("Cannot load.");
              setList([]);
            }
          })
          .catch((err) => {
            // toast.error("failed to load units");
            setList([]);
          });
      }
      else if(type==="customer"){
        await axios.get(
          `${config.APP_CONFIG}/usersApi/Users/customer`,
          {
            headers: { Authorization: userSessionContext.token },
          }
        )
        .then((res) => {
          if (res.data && res.data.status_code && res.data.status_code === 200) {
            let temp = res.data.msg.map((name, index) => ({
              label: name.username,
              value: name.id,
            }));
            setList(temp);
          
          } else {
            toast.error("Cannot load ");
            setList([]);
          }
        })
        .catch((err) => {
          // toast.error("failed to load units");
          setList([]);
        });
      }
    
    else{
      if(type==="all")
{
  setAll("all");
}
    
}
}


  const handleSubmit = (e) => {

    e.preventDefault();
    if(searchData.length===0){
      toast.warn("Please Enter Search ");
    }
   
  
    else if(all==="all"){

      let _data = {
        dateFrom: format(new Date(values.dateFrom), "yyyy-MM-dd"),
        dateTo: format(new Date(values.dateTo), "yyyy-MM-dd"),
        companyId: companyContext.company.id,
        reportType:searchData.label,
       id:0
      };
    
      axios.post(`${config.APP_CONFIG}/Sales/Report/api/byDate`, _data, {
          headers: { Authorization: userSessionContext.token },
        })
        .then((res) => {
          if (res.data.status_code === 200) {
            if(res.data.msg.length<1){
              toast.warn("No Records")
            }
            else{
              setRecords(res.data.msg);
              setSubmit(true)
            }
          
          
        
          } else if (res.data.status_code === 401) {
        
            userSessionContext.handleLogout();
    
          } else if (res.data.status_code === 400) {
           
            toast.warn(res.data.msg);
          } else {
          
            toast.error("Warning");
          }
        })
        .catch((err) => {
          toast.error("Error");
        });
        setAll("")
    }
    else if(search.label.length===0){
      toast.warn("Please Enter Search Type");
    }
    else if(search.label===undefined){
      toast.warn("Please Enter Search Type");
    }
    else{

    let _data = {
      dateFrom: format(new Date(values.dateFrom), "yyyy-MM-dd"),
      dateTo: format(new Date(values.dateTo), "yyyy-MM-dd"),
      companyId: companyContext.company.id,
      reportType:searchData.label,
     id:search.value
    };
  
    axios.post(`${config.APP_CONFIG}/Sales/Report/api/byDate`, _data, {
        headers: { Authorization: userSessionContext.token },
      })
      .then((res) => {
        if (res.data.status_code === 200) {
         
          if(res.data.msg.length<1){
            toast.warn("No Records")
          }
          else{
            setRecords(res.data.msg);
            setSubmit(true)
          }
        
        
  
      
        } else if (res.data.status_code === 401) {
      
          userSessionContext.handleLogout();
  
        } else if (res.data.status_code === 400) {
         
          toast.warn(res.data.msg);
        } else {
        
          toast.error("Warning");
        }
      })
      .catch((err) => {
        toast.error("Error");
      });
  
  };
}

  

  var adbs = require("ad-bs-converter");


if (records === undefined) {
  return <Spinner />;
}
  
if (Data === undefined) {
  return <Spinner />;
}

  const serviceCharge_total = records
    .reduce((total, obj) => obj.serviceCharge + total, 0)
    .toFixed(2);

  const grandTotal = records
    .reduce((total, obj) => obj.grandTotal + total, 0)
    .toFixed(2);
    const total_total = records
    .reduce((total, obj) => obj.producttotal + total, 0)
    .toFixed(2);
  const totalqty_total = records
    .reduce((total, obj) => obj.productQTY + total, 0)
    .toFixed(2);

  const discount_total = records
    .reduce((total, obj) => obj.discount + total, 0)
    .toFixed(2);

  const cashamt_total = records
    .reduce((total, obj) => obj.Cash + total, 0)
    .toFixed(2);

  const bankamt_total = records
    .reduce((total, obj) => obj.Bank + total, 0)
    .toFixed(2);

  const creditamt_total = records
    .reduce((total, obj) => obj.Credit + total, 0)
    .toFixed(2);

  const tax_total = records
    .reduce((total, obj) => obj.taxAmount + total, 0)
    .toFixed(2);
// reusable table
let table1 = [
  {
    B:'Date',
      C: "Miti",
      D: "Bill NO.",
      E:'Customer Name',
      F: "Item",
      G: "Quantity",
      H: "Discount",
      I: "Service Charge",
      J: "Tax",
      K: "Grand Total",
      L: "Payment Mode",
      M: "Cash Amount",
      N: "Bank Amount",
      O: "Credit Amount",
      P: "Cashier",
      Q: "Card Amt",
      R: "Credit Amt",
   
   
  },
];

const table2= records.map((item, index) => 
[{
 A: index + 1,
 B:format(new Date(item.dateOfSales), "yyyy-MM-dd").toString(), 
 C:NepaliDate(item.dateOfSales),
 D: item.bill_no, 
 E:item.customerName,
 F:item.productName,
 G: item.productQTY,
 H: item.discount,
 I: item.serviceCharge,
 J: item.taxAmount,
 K: item.grandTotal,
 L: item.paymentMode,
 M: item.Cash,
 N: item.Bank,
 O: "",
 P:item.cashierName,
 Q:"",
 R:""

 }]
);

    const table3=[{
A:"Total",
      B:"",
      C:totalqty_total,
      D:total_total,
      E:discount_total,
      F:serviceCharge_total,
      G:tax_total,
      H:grandTotal,
      I:"",
      J:cashamt_total,
      K:bankamt_total,
      L:creditamt_total||"0",
      M:""
    }]



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

  //excel export

  let Table1 = [
    {
      A:"S.N",
      B:'Date',
      C: "Miti",
      D: "Bill NO.",
      E:'Customer Name',
      F: "Item",
      G: "Quantity",
      H: "Discount",
      I: "Service Charge",
      J: "Tax",
      K: "Grand Total",
      L: "Payment Mode",
      M: "Cash Amount",
      N: "Bank Amount",
      O: "Credit Amount",
      P: "Cashier",
      Q: "Card Amt",
      R: "Credit Amt",
     
     
    },
  ];
  records.map((item, index) =>{

    Table1.push({
      A: index + 1,
      B:format(new Date(item.dateOfSales), "yyyy-MM-dd").toString(), 
      C:NepaliDate(item.dateOfSales),
      D: item.bill_no, 
      E:item.customerName,
      F:item.productName,
      G: item.productQTY,
      H: item.producttotal,
      I: item.discount,
      J: item.serviceCharge,
      K: item.taxAmount,
      L: item.grandTotal,
      M: item.paymentMode,
      N: item.Cash,
      O: item.Bank,
      P: "",
      Q: item.cashierName,
      R:""
 
     
  
    })})
    const Table3=[{
      A:"Total",
            B:"",
            F:totalqty_total,
            G:total_total,
            H:discount_total,
            I:serviceCharge_total,
            J:tax_total,
            K:grandTotal,
            M:"",
            N:cashamt_total,
            O:bankamt_total,
            P:creditamt_total||"0",
            Q:""
          }]

    Table1 = (Table1)
    .concat(Table3);
const ReportComponent=()=>{
  return (
   
      
    <div>
      <ReportHeader title="Sales Detail Report By Date"/>
    <Form onSubmit={handleSubmit}>
    <Grid container direction="row">
        <Grid item lg={12} md={12} xs={12}>
         
            <Card>
              <Grid container>
                <Grid item xs={12} sm={3}>
                  <label>Search Type </label>
                  <Select
                    type="text"
                    placeholder={"Search ...."}
                    defaultValue={searchData}
                    options={search_data}
                    styles={{
                      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    }}
                    menuPortalTarget={document.body}
                    onChange={setSearchData}
                    
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <label>Search </label>
                  <Select
                    defaultValue={search}
                    options={List}
                    styles={{
                      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    }}
                    menuPortalTarget={document.body}
                    onChange={setSearch}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <label
                    htmlFor="text"
                    style={{
                      paddingTop: "0",
                      marginLeft: "4px",
                      width: "100%",
                    }}
                    className="col-sm-12 col-form-label"
                  >
                    Date From
                  </label>
                  <Controls.DatePicker
                    name="dateFrom"
                    value={values.dateFrom}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <label
                    htmlFor="text"
                    style={{
                      paddingTop: "0",
                      marginLeft: "4px",
                      width: "100%",
                    }}
                    className="col-sm-12 col-form-label"
                  >
                    Date To
                  </label>
                  <Controls.DatePicker
                    name="dateTo"
                    value={values.dateTo}
                    onChange={handleInputChange}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={3}
                  style={{ display: "flex", margin: "5px 0" }}
                >
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
    <div>
      
 
   
           
      {records.length !== 0 ? (
        <div>
            <Button onClick={(e) => handleArrow(e)}><ArrowBackIcon /></Button>
        </div>
      ) : 
      <ReportComponent/>}
      {records.length !== 0 ? (
      <div>
      <div style={{ textAlign: "right" }}>
        

      <FormControl>
  
  
      <RadioGroup
     row
    
    value={value}
    onChange={handleChange}

   >
    <FormControlLabel value="All"  control={<Radio />} label="All" onClick={handleAll} />
    <FormControlLabel value="Filter" control={<Radio />} label="Filter by date"  onClick={handleDate}/>
   
 
  </RadioGroup>
  </FormControl>


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

            <p className="companyReport">Sales Report By Date</p>
            <div className="date">

              
               <p>
                  From:{" "}
                  {format(
                    new Date(values.dateFrom),
                    "yyyy/MM/dd"
                  ).toString() +
                    " (" +
                    miti.toString() +
                    " B.S.)"}
                </p>
                <p>
                  To:{" "}
                  {format(new Date(values.dateTo), "yyyy/MM/dd").toString() +
                    " (" +
                    miti1 +
                    " B.S.)"}
                </p>
            </div>
          </div>

        {open ?  <DateGroupedTables records={records} table1={table1} table2={table2} />  : <PurchasedetailTable records={records} table1={table1} table2={table2} table3={table3}  />  }

        
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




