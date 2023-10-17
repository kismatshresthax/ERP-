import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


import { toast } from "react-toastify";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { Route, Routes } from 'react-router'
import FormControl from '@mui/material/FormControl';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import ReactToPrint from "react-to-print";
import { Button, MenuItem } from "@mui/material";

import * as XLSX from "xlsx";
import * as XlsxPopulate from "xlsx-populate/browser/xlsx-populate";

import Controls from "../../controls/Controls";


import { useForm, Form } from "../../../components/home/useForm";

// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import DateTimePicker from '@mui/lab/DateTimePicker';

//import Select from "@material-ui/core/Select";
import axios from "axios";
import config from "../../../utils/config";

import UserSessionContext from "../../../contexts/UserSessionContext";
import UserAuthenticationContext from "../../../contexts/UserAuthenticationContext";
import { format } from "date-fns";
import Select from "react-select";

import CompanyContext from "../../../contexts/CompanyContext";
import PrintIcon from "@mui/icons-material/Print";
import "date-fns";
import ReportHeader from "../../reports/ReportHeader";
import { hr } from "date-fns/locale";
import { SettingsPower } from "@material-ui/icons";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DateGroupedTables from "../../../utils/DateGroupedTables";
import PurchasedetailTable from "../../../utils/PurchasedetailTable";
import { MarginTwoTone } from "@mui/icons-material";
import ExcelSheet from "../../../utils/ExcelSheet";
import NepaliDate from "../../../utils/NepaliDate";
import { Spinner } from "react-bootstrap-v5";
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
const search_data = [
  {
    "label": "all",
    "value": 1,
  },

  {
    "label": "items",
    "value": 2,
  },
  {
    "label": "category",
    "value": 3,
  },
  {
    "label": "vendor",
    "value": 4,
  },



]
const ops = [{
  label: "all",
  value: 0,
},]



export default function Purchasedetailreport(props) {
  const componentRef = React.useRef(null);
  const { values, handleInputChange } = useForm(initialFValues);
  const userSessionContext = React.useContext(UserSessionContext);
  const classes = useStyles();
  const [records, setRecords] = useState([]);
  const [Data, setData] = useState([]);
  const [open, setOpen] = useState(false)

  const [value, setValue] = React.useState('All');



  const handleAll = () => {
    setOpen(false)


  }
  const handleDate = () => {
    setOpen(true)


  }
  const handleChange = (event) => {
    setValue((event.target).value);
  };
  const handleArrow = (e) => {
    e.preventDefault();
    setRecords([])
   
    setSearchData("")
    setSearch("")

  }


  const permissionContext = React.useContext(UserAuthenticationContext);
  //let Permission = permissionContext.permissions;
  const companyContext = React.useContext(CompanyContext);

  //let curr_mod_permission =Permission.filter( x=>{return x["module_name"].toLowerCase() === "accounting"})
  //let userPermission= curr_mod_permission[0]

  var adbs = require("ad-bs-converter");


  const [searchData, setSearchData] = useState(search_data || []);
  const [search, setSearch] = useState([]);
  const [all, setAll] = useState("");
  const [Loading, setLoading] = useState(false);
  const [List, setList] = useState([]);
  

  var adbs = require("ad-bs-converter");
  useEffect(() => {
    if (searchData.label !== undefined) {

      loaddataById(searchData.label);

    }
  }, [searchData])








 
  const loaddataById = async (type) => {

    if (type === "items") {
      await axios.get(
        `${config.APP_CONFIG}/Products/product/Api`,
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
            toast.error("Cannot load .");
            setList([]);
          }
        })
        .catch((err) => {
          // toast.error("failed to load units");
          setList([]);
        });
    }

    else if (type === "category") {
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

          setList([]);
        });
    }
    else if (type === "vendor") {
      await axios.get(
        `${config.APP_CONFIG}/Setting/Vendor/api`,
        {
          headers: { Authorization: userSessionContext.token },
        }
      )
        .then((res) => {
          if (res.data && res.data.status_code && res.data.status_code === 200) {
            let temp = res.data.msg.map((name, index) => ({
              label: name.firstName,
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

    else {
      if (type === "all") {
        setAll("all");
      }

    }
  }


  const handleSubmit = (e) => {


    e.preventDefault();


    if (searchData.length === 0) {
      toast.warn("Please Enter Search ");
    }

    else if (all === "all") {

      let _data = {
        dateFrom: format(new Date(values.dateFrom), "yyyy-MM-dd"),
        dateTo: format(new Date(values.dateTo), "yyyy-MM-dd"),
        companyId: companyContext.company.id,
        reportType: searchData.label,
        id: 0
      };

      axios.post(`${config.APP_CONFIG}/Purchase/Report/api/byDate`, _data, {
        headers: { Authorization: userSessionContext.token },
      })
        .then((res) => {
          if (res.data.status_code === 200) {

            if (res.data.msg.length < 1) {
              toast.warn("No Records")
            }
            else {
              setRecords(res.data.msg);
              setLoading(true);
            

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

    else if (search.label.length === 0) {
      toast.warn("Please Enter Search Type");
    }
    else if (search.label === undefined) {
      toast.warn("Please Enter Search Type");
    }
    else {

      let _data = {
        dateFrom: format(new Date(values.dateFrom), "yyyy-MM-dd"),
        dateTo: format(new Date(values.dateTo), "yyyy-MM-dd"),
        companyId: companyContext.company.id,
        reportType: searchData.label,
        id: search.value
      };

      axios.post(`${config.APP_CONFIG}/Purchase/Report/api/byDate`, _data, {
        headers: { Authorization: userSessionContext.token },
      })
        .then((res) => {
          if (res.data.status_code === 200) {

            if (res.data.msg.length < 1) {
              toast.warn("No Records")
            }
            else {
              setRecords(res.data.msg);
              setLoading(true);
              


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
    };
  }

  if (records === undefined) {
    return <Spinner />;
  }
    
  const quantity_total = records
    .reduce((total, obj) => obj.quantity + total, 0)
    .toFixed(2);
  const totalsales_total = records
    .reduce((total, obj) => obj.subtotal + total, 0)
    .toFixed(2);
  const discount_total = records
    .reduce((total, obj) => obj.discount + total, 0)
    .toFixed(2);
  const Taxable_total = parseFloat(totalsales_total - discount_total).toFixed(2);

  const tax_total = records
    .reduce((total, obj) => obj.taxAmount + total, 0)
    .toFixed(2);





 



  // reusable table
  const table1 = [
    {
      A: "S.N.",
      B: "Date",
      C: "Date",
      D: "Invoice Number",
      E: "Decleration Number",
      F: "Supplier Name",
      G: "Supplier PAN",
      H: "Item Name",
      I: "Quantity",
      J: "Unit",
      K: "Total Sales",
      L: "Discount",
      M: "Taxable Amount",
      N: "VAT",
      O:'Export Sales',
      P: "Country",
      Q: "Pragyapan Patra No.",
      R: "Pragyapan Patra Miti",
    },
  ];
  const table2 = records.map((item, index) =>


    [{
      A: index + 1,
      B: format(new Date(item.recepitDate), "yyyy-MM-dd"),
      C:
        adbs.ad2bs(format(new Date(item.recepitDate), "yyyy/MM/dd ")).en[
        "year"
        ] +
        "/" +
        adbs.ad2bs(format(new Date(item.recepitDate), "yyyy/MM/dd ")).en[
        "month"
        ] +
        "/" +
        adbs.ad2bs(format(new Date(item.recepitDate), "yyyy/MM/dd ")).en[
        "day"
        ],
      D: item.vendorReference,
      E: item.invoice_no,
      F: item.vendorname,
      G: item.panNo,
      H: item.productName,
      I: item.quantity,
      J: item.unitName,
      K: item.subtotal,
      L: item.discount,
      M: item.netTotal,
      N: item.taxAmount,
      O: item.expsales,
      P: item.country,
      Q: item.num,
      R: item.pragmiti
    }]

  )

  let table3 = [{
    A: 'Total',
    B: "",
    C: "",
    D: "",
    E: "",
    F:quantity_total,
    G: "",
    H:totalsales_total,
    I:discount_total,
    J:Taxable_total,
    K:tax_total,
    L:'',
    M:'',
  

  }]

  // export
  let
    Table1 = [
      {
        A: "S.N.",
        B: "Date",
        C: "Date",
        D: "Invoice Number",
        E: "Decleration Number",
        F: "Supplier Name",
        G: "Supplier PAN",
        H: "Item Name",
        I: "Quantity",
        J: "Unit",
        K: "Total Sales",
        L: "Discount",
        M: "Taxable Amount",
        N: "VAT",
        O: "Export Sales",
        P: "Country",
        Q: "Pragyapan Patra No.",
        R: "Pragyapan Patra Miti",
      },
    ];
  records.map((item, index) => {

    Table1.push({
      A: index + 1,
      B: format(new Date(item.recepitDate), "yyyy-MM-dd"),
      C:
        adbs.ad2bs(format(new Date(item.recepitDate), "yyyy/MM/dd ")).en[
        "year"
        ] +
        "/" +
        adbs.ad2bs(format(new Date(item.recepitDate), "yyyy/MM/dd ")).en[
        "month"
        ] +
        "/" +
        adbs.ad2bs(format(new Date(item.recepitDate), "yyyy/MM/dd ")).en[
        "day"
        ],
      D: item.vendorReference,
      E: item.invoice_no,
      F: item.vendorname,
      G: item.panNo,
      H: item.productName,
      I: item.quantity,
      J: item.unitName,
      K: item.subtotal,
      L: item.discount,
      M: item.netTotal,
      N: item.taxAmount,
      O: item.expsales,
      P: item.country,
      Q: item.num,
      R: item.pragmiti

    })
  })


  const Table3 = [{
    A: 'Total',
    B: '',
    C: '',
    D: '',
    E: '',
    I: quantity_total,
    G: "",
    K: totalsales_total,
    L: discount_total,
    M: Taxable_total,
    N: tax_total,
    J: '',
    F: '',
    H: ''

  }]

  Table1 = (Table1).concat(Table3);
  ////////////////////////////////
 

    
    const ReportComponent=()=>{
      return (
    
     
            <div>
              <ReportHeader title="Purchase Detail Report" />
              <Form sx={{ textAlign: 'center' }} onSubmit={handleSubmit}>
                <Grid container direction="row">
                  <Grid item lg={12} md={12} xs={12}>
    
                    <Card>
                      <Grid container>
                        <Grid item xs={12} sm={3}>
                          <label>Search Type </label>
                          <Select
                            defaultValue={searchData}
                            options={search_data}
                            styles={{
                              menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                            }}
                            menuPortalTarget={document.body}
                            onChange={setSearchData}
                          // onChange={(e) => {
                          //     setProductId(e);
    
                          //   }}
                          />
                        </Grid>
                        {all === "all" ?
                          <Grid item xs={12} sm={3}>
                            <label>Search </label>
                            <Select
                              disabled
                              defaultValue={{ label: "all", value: 0 }}
                              options={ops}
                              styles={{
                                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                              }}
                              menuPortalTarget={document.body}
                            // onChange={setSearch}
                            />
                          </Grid>
                          : (
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
                          )
                        }
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
    <div
      className="content-wrapper iframe-mode"
      data-widget="iframe"
      data-loading-screen={750}
    >

 
      {records.length !== 0 ? (
        
        <div>
          <Button onClick={(e) => handleArrow(e)}><ArrowBackIcon /></Button>


          </div>

        

      ) : <ReportComponent/>}

      {records.length !== 0 ? (
        <div>
          <div style={{ textAlign: "right" }}>


            <FormControl>
              <RadioGroup
                row

                value={value}
                onChange={handleChange}

              >
                <FormControlLabel value="All" control={<Radio />} label="All" onClick={handleAll} />
                <FormControlLabel value="Filter" control={<Radio />} label="Filter by date" onClick={handleDate} />


              </RadioGroup>
            </FormControl>

            <Button>

              <ExcelSheet
                data={[Table1]}
                title="Purchases Report Format" />
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

                <p className="companyReport">Purchases Report Format</p>
                <div className="date">

                  <p>
                    From:{" "}
                    {format(
                      new Date(values.dateFrom),
                      "yyyy/MM/dd"
                    ).toString() +
                      " (" +
                       NepaliDate(values.dateFrom)+
                      " B.S.)"}
                  </p>
                  <p>


                    To:{" "}
                    {format(new Date(values.dateTo), "yyyy/MM/dd").toString() +
                      " (" +
                      NepaliDate(values.dateTo)+
                      " B.S.)"}
                  </p>
                </div>
              </div>

              {open ? <DateGroupedTables table1={table1} table2={table2} /> : <PurchasedetailTable table1={table1} table2={table2} table3={table3} />}



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