import React, { useState,useEffect } from "react";

import { toast } from "react-toastify";
import { Route } from "react-router-dom";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import FormControl from '@mui/material/FormControl';
import { Button, MenuItem } from "@mui/material";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import ReactToPrint from "react-to-print";

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
import CompanyContext from "../../../contexts/CompanyContext";
import Select from "react-select";
import PrintIcon from "@mui/icons-material/Print";
import "date-fns";
import ReportHeader from "../../reports/ReportHeader";
import DateGroupedTables from "../../../utils/DateGroupedTables";
import PurchasedetailTable from "../../../utils/PurchasedetailTable";
import { Category } from "@material-ui/icons";
import { Warehouse } from "@mui/icons-material";
import NepaliDate from "../../../utils/NepaliDate";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
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
// const data=[{"Date":"4/6/2022","invoice_no":1,"dec_no":1,"supplier_name":"ram kumar bahadur chhetri","supplier_pan":"6862239171","item_name":"Glyn","iq":47,"ts":5,"discount":1,"TA":1,"Vat":1,"expsales":1,"country":"Zimbabwe","num":92,"pragmiti":"11/12/2021"},
//  {"Date":"7/19/2021","invoice_no":2,"Buyers_name":"Fayth","supplier_name":"ram kumar bahadur chhetri","supplier_pan":"6862239171","iq":66,"ts":22,"discount":2,"TA":2,"Vat":2,"expsales":2,"country":"Barbados","num":65,"pragmiti":"3/10/2022"},
//  {"Date":"9/14/2021","invoice_no":3,"supplier_name":"ram kumar bahadur chhetri","supplier_pan":"6862239171","item_name":"Vitia","iq":11,"ts":27,"discount":3,"TA":3,"Vat":3,"expsales":3,"country":"Mozambique","num":45,"pragmiti":"4/25/2022"}]
const search_data=[
  {
    "label":"Choose Type",
     "value":0,
  },
  
  {
    "label":"all",
     "value":1,
  },
  
 
{
    "label":"category",
    "value":2,
},
 {
    "label":"warehouse",
     "value":3,
 },



]
const ops=[{
    label:"all",
    value:0,
},]


export default function StockAdjustReport(props) {
  const componentRef = React.useRef(null);
 
  const { values, handleInputChange } = useForm(initialFValues);
  const userSessionContext = React.useContext(UserSessionContext);
  // let history = useHistory();
  const classes = useStyles();
  const [records, setRecords] = useState([]);
  const [Data, setData]= useState([]);
  const permissionContext = React.useContext(UserAuthenticationContext);
  //let Permission = permissionContext.permissions;
  const companyContext = React.useContext(CompanyContext);
  
  //let curr_mod_permission =Permission.filter( x=>{return x["module_name"].toLowerCase() === "accounting"})
  //let userPermission= curr_mod_permission[0]

  var adbs = require("ad-bs-converter");
  const currentDate = new Date().toLocaleDateString(); // Get the current date
  const currentTime = new Date().toLocaleTimeString(); // Get the current time

  const [searchData, setSearchData] = useState(search_data||[]);
  const [search, setSearch] = useState([]);
  const [all, setAll] = useState("");
  const [Loading, setLoading] = useState(false);
  const [List, setList] = useState([]);
  const [issubmit, setSubmit] = useState(false);
  const [warehouses, setWareHouseList] = useState();
  const [open, setOpen] = useState(false)
  const [value, setValue] = React.useState('All');
  var adbs = require("ad-bs-converter");
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



useEffect(() => {
  load_warehouse();
}, []);
const load_warehouse = async () => {
  await axios
    .get(`${config.APP_CONFIG}/stock/warehouse/api`, {
      headers: { Authorization: userSessionContext.token },
    })
    .then((res) => {
      if (res.data.status_code === 401) {
        userSessionContext.handleLogOut();
      } else if (res.data.status_code === 200) {
        let temp = res.data.msg.map((item) => ({
          value: item.id,
          label: item.warehouse,
        }));

        setWareHouseList(temp);
      } else if (res.data.status_code === 400) {
        toast.warn(res.data.msg);
      } else {
        toast.error("error");
        setWareHouseList([]);
      }
    })
    .catch((err) => {
      setWareHouseList([]);
    });
};
const loaddataById = async (type) => {
  

   if(type==="category")
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
         
            setList([]);
          });
      }
      else if(type==="warehouse"){
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
       // companyId: companyContext.company.id,
       searchType:searchData.label,
       searchData:0
      };
    
      axios.post(`${config.APP_CONFIG}/Inventory/stockAdjust/Report/api`, _data, {
          headers: { Authorization: userSessionContext.token },
        })
        .then((res) => {
          if (res.data.status_code === 200) {
           
            if(res.data.msg.length<1){
              toast.warn("No Records")
            }
            else{
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
      //companyId: companyContext.company.id,
      searchType:searchData.label,
      searchData:search.value
    };
  
    axios.post(`${config.APP_CONFIG}/Inventory/stockAdjust/Report/api`, _data, {
        headers: { Authorization: userSessionContext.token },
      })
      .then((res) => {
        if (res.data.status_code === 200) {
         
          if(res.data.msg.length<1){
            toast.warn("No Records")
          }
          else{
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
  };
}

  


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




// reuseable data
let table1 = [
  {
  B: 'Transfer Date',
  
C: 'Product Name',
D:"Category",
E:"Warehouse",
  F: "Quantity",
  G: 'Unit',
  Z:''


},
]
console.log(records)

const table2= records.map((i, index) => 


[{
  A:index+1,
  B:(format(
    new Date(i.adjustDate),
    "yyyy-MM-dd"
  ) +(
    " (" +
   NepaliDate(i.adjustDate) +
    " B.S.)")),
 
  C:i.productName  ,
  D:"",
  E:i.warehouseName  ,
  F:i.qty ,
  G:i.unitId,
  Z:'',

}])






//  export export


let Table1 = [
  {
    A:"S.N",
  B: 'Transfer Date',
  C: "Transfer Miti",
D: 'WareHouse From',
E:"Category",
F:"Warehouse",
  G: "Quantity",
  H: 'Unit',
  


},
]
records.map((i, index) =>{

  Table1.push({
    A:index+1,
    B:format(new Date(i.adjustDate), "yyyy-MM-dd").toString(),
    C:NepaliDate(i.adjustDate),
    D:i.warehouseNameFrom  ,
    E:"",
    F:i.warehouseName  ,
    G:i.rawQuantity ,
    H:i.towarehouseId,
   

  })})


    

   


const ReportComponent=()=>{
  return (
   
        <div>
<ReportHeader title="Stock Adjust"/>
        <Form onSubmit={handleSubmit}>
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
                {all==="all"?
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
                    :    (
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
    
                <p className="companyReport">Stock Adjust Detail Report</p>
                <div className="date">
    
                  
                   <p>
                      From:{" "}
                      {format(
                        new Date(values.dateFrom),
                        "yyyy/MM/dd"
                      ).toString() +
                        " (" +
                       NepaliDate(values.dateFrom) +
                        " B.S.)"}
                    </p>
                    <p>
                      To:{" "}
                      {format(new Date(values.dateTo), "yyyy/MM/dd").toString() +
                        " (" +
                        NepaliDate(values.dateTo) +
                        " B.S.)"}
                    </p>
                </div>
              </div>
  
                {open ? <DateGroupedTables records={records} table1={table1} table2={table2} /> : <PurchasedetailTable records={records} table1={table1} table2={table2}  />}
  
  
  
              </div>
            </div>
        
    <div style={{display:'flex', justifyContent: 'space-between', marginTop: '35px', alignContent:'center'}}>
<div style={{width:'200px', textAlign:'center'}}>    
<span>-------------------</span><br />

<span>Prepared By:</span><br />

</div>
<div style={{width:'200px', textAlign:'center'}}>
<span>-------------------</span><br />
<span>Approved By: </span><br />
</div>
</div>
<div style={{width:'300px', textAlign:'left',marginTop: '5px'}}>

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
