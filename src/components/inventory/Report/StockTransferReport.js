import React, { useState, useEffect } from "react";

import { toast } from "react-toastify";
import { Route } from "react-router-dom";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Controls from "../../controls/Controls";
import FormControl from '@mui/material/FormControl';
import { Button, MenuItem } from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import ReactToPrint from "react-to-print";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import * as XLSX from "xlsx";
import * as XlsxPopulate from "xlsx-populate/browser/xlsx-populate";




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
import CompanyContext from "../../../contexts/CompanyContext";
import Select from "react-select";
import PrintIcon from "@mui/icons-material/Print";
import "date-fns";
import ReportHeader from "../../reports/ReportHeader";
import DateGroupedTables from "../../../utils/DateGroupedTables";
import PurchasedetailTable from "../../../utils/PurchasedetailTable";
import NepaliDate from "../../../utils/NepaliDate";
import { ContactlessOutlined } from "@material-ui/icons";
import ExcelSheet from "../../../utils/ExcelSheet";



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
    "label": "Choose Type",
    "value": 0,
  },
  {
    "label": "all",
    "value": 1,
  },


  {
    "label": "category",
    "value": 2,
  },
  {
    "label": "warehouse",
    "value": 3,
  },



]
const ops = [{
  label: "all",
  value: 0,
},]



export default function StockTransferReport(props) {
  const componentRef = React.useRef(null);

  const { values, handleInputChange } = useForm(initialFValues);
  const userSessionContext = React.useContext(UserSessionContext);
  // let history = useHistory();
  const classes = useStyles();
  const [records, setRecords] = useState([]);
  const [Data, setData] = useState([]);
  const permissionContext = React.useContext(UserAuthenticationContext);
  //let Permission = permissionContext.permissions;
  const companyContext = React.useContext(CompanyContext);


  var adbs = require("ad-bs-converter");
  const currentDate = new Date().toLocaleDateString(); // Get the current date
  const currentTime = new Date().toLocaleTimeString(); // Get the current time

  const [searchData, setSearchData] = useState(search_data || []);
  const [search, setSearch] = useState([]);
  const [all, setAll] = useState("");
  const [Loading, setLoading] = useState(false);
  const [List, setList] = useState([]);
  const [issubmit, setSubmit] = useState(false);




  const [warehouses, setWareHouseList] = useState();
  const [warehouse1, setWareHouse1] = useState();
  const [warehouse2, setWareHouse2] = useState(null);
  const [open, setOpen] = useState(false)
  const [value, setValue] = React.useState('All');
  var adbs = require("ad-bs-converter");
  useEffect(() => {
    if (searchData.label !== undefined) {

      loaddataById(searchData.label);

    }
  }, [searchData])

  const handleAll = () => {
    setOpen(false)


  }
  const handleDate = () => {
    setOpen(true)


  }
  const handleArrow = (e) => {
    e.preventDefault();
    setRecords([])



  }
  const handleChange = (event) => {
    setValue((event.target).value);
  };

  console.log(records)


  const loaddataById = async (type) => {


    if (type === "category") {
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
    else if (type === "warehouse") {
      await axios.get(
        `${config.APP_CONFIG}/stock/warehouse/api`,
        {
          headers: { Authorization: userSessionContext.token },
        }
      )
        .then((res) => {
          if (res.data && res.data.status_code && res.data.status_code === 200) {
            let temp = res.data.msg.map((name, index) => ({
              label: name.warehouse,
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
        // companyId: companyContext.company.id,
        searchType: searchData.label,
        searchData: 0
      };

      axios.post(`${config.APP_CONFIG}/InventoryTransfer/getData/api`, _data, {
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
        //companyId: companyContext.company.id,
        searchType: searchData.label,
        searchData: search.value
      };

      axios.post(`${config.APP_CONFIG}/Inventory/stockAdjust/Report/api`, _data, {
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
              // setSubmit(true)
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

  // const handleSubmit = (e) => {

  //   e.preventDefault();
  //   let _data = {
  //       "dateFrom": format(new Date(values.dateFrom), "yyyy-MM-dd"),
  //       "dateTo": format(new Date(values.dateTo), "yyyy-MM-dd"),

  //       "wareHouseId": warehouse2.value,
  //       "oldwareHouseId":  warehouse1.value,
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

  // }

  //   const quantity_total = records
  //     .reduce((total, obj) => obj.quantity + total, 0)
  //     .toFixed(2);
  //   const totalsales_total = records
  //     .reduce((total, obj) => obj.subtotal + total, 0)
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

  // //sales return 
  //     const total_sales_return= Data
  //     .reduce((total, obj)=> obj.productsubtotal + total, 0)
  //     .toFixed(2);

  //     const total_discount_return= Data
  //     .reduce((total, obj)=> obj.discount + total, 0)
  //     .toFixed(2);

  //     const total_taxableamount_return= Data
  //     .reduce((total, obj)=> parseFloat(obj.productsubtotal - obj.discount) + total, 0)
  //     .toFixed(2);

  //     const total_vat_return= Data
  //     .reduce((total, obj)=> obj.taxAmount + total, 0)
  //     .toFixed(2);

  // //granttotal

  // const grand_total=totalsales_total-total_sales_return;
  // const grand_total_discount=discount_total-total_discount_return;
  // const grand_total_taxableamount=Taxable_total-total_taxableamount_return;
  // const grand_total_vat=tax_total-total_vat_return;


  ////////////////////////////////
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

  // reusable table
  let table1 = [
    {
      A: 'S.N',
      B: 'Transfer Date',
   
      C: 'Category',
      D: 'Product Name',
      E: "Warehouse",
      F: 'Unit',

      Z: ''

    },
  ]
  const table2 = records.map((i, index) =>


    [{
      B:  (format(
        new Date(i.transferDate),
        "yyyy-MM-dd"
      ) +(
        " (" +
       NepaliDate(i.transferDate) +
        " B.S.)")),
   
      C: i.categoryName,
      D: i.productName,
      E: i.warehouseName,
      F:i.rawQuantity + i.unitName,
     
      Z: ""

    }])



console.log(records)

  // export export
  let Table1 = [
    {
      A: 'S.N',
      B: 'Transfer Date',
      C: "Transfer Miti",
      D: 'Category',
      E: 'Product Name',
      F: "Quantity",
      G: 'Unit',

      H: 'Warehouse',


    },
  ]
  records.map((i, index) => {

    Table1.push({
      A:index+1,
      B:format(new Date(i.transferDate), "yyyy-MM-dd").toString(),
      C: NepaliDate(i.transferDate),
      D: i.categoryName,
      E: i.productName,
      F: i.rawQuantity,
      G: i.unitName,
      H: i.warehouseName,



    })
  })




  const ReportComponent = () => {
    return (

      <div>
        <ReportHeader title="Stock Transfer" />
        <Form sx={{border:'none'}} onSubmit={handleSubmit}>
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
                      //  onChange={setSearch}
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
  console.log(records)

  const uniqueDates = [...new Set(records.map(item => item.transferDate))];
  console.log(uniqueDates);
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
      ) : <ReportComponent />}

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
                title="Stock Transfer Detail Report" />
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

                <p className="companyReport">Stock Transfer Detail Report</p>
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

              {open ? <DateGroupedTables records={records} table1={table1} table2={table2} /> : <PurchasedetailTable records={records} table1={table1} table2={table2} />}



            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '35px', alignContent: 'center' }}>
            <div style={{ width: '200px', textAlign: 'center' }}>
              <span>-------------------</span><br />

              <span>Prepared By:</span><br />

            </div>
            <div style={{ width: '200px', textAlign: 'center' }}>
              <span>-------------------</span><br />
              <span>Approved By:</span><br />
            </div>
          </div>
          <div style={{ width: '300px', textAlign: 'left', marginTop: '5px' }}>

            <p className="date-time">Printed on {currentDate} at {currentTime} by {localStorage.getItem('user')} </p>
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
