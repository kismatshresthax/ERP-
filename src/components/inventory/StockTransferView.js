import React, { useState} from "react";
import { toast } from "react-toastify";
import { Route } from "react-router-dom";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Controls from "../controls/Controls";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@mui/material/CardContent";
import { useForm, Form } from "../../components/home/useForm";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
// import Paper from "@material-ui/core/Paper";
// import TableContainer from "@material-ui/core/TableContainer";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ReactToPrint from "react-to-print";
import * as XLSX from "xlsx";
import NepaliDate from "nepali-date-converter";
import * as XlsxPopulate from "xlsx-populate/browser/xlsx-populate";
//import ReactExport from "react-export-excel";
import axios from "axios";

import config from "../../utils/config";
//import UserAuthenticationContext from "../../contexts/UserAuthenticationContext";

import UserSessionContext from "../../contexts/UserSessionContext";
import CompanyContext from "../../contexts/CompanyContext";
import PrintIcon from "@mui/icons-material/Print";
import { format } from "date-fns";
import Spinner from "../../utils/spinner";
import "date-fns";
//import * as XLSX from 'xlsx/xlsx.mjs';
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

function StockTransferView(props) {
    const componentRef = React.useRef(null);
    const userSessionContext = React.useContext(UserSessionContext);
    // let history = useHistory();
    const classes = useStyles();
    const [records, setRecords] = useState();
   console.log(props.data);
   const companyContext = React.useContext(CompanyContext);
    //let Permission = permissionContext.permissions;
    React.useEffect(() => {
      load_table();
    }, []);
  
    const load_table =  () => {
      const fig = {
        headers: {
          Authorization: userSessionContext.token,
        },
      };
      axios.get(`${config.APP_CONFIG}/InventoryTransfer/getData/api/${props.data.referenceId}`, fig)
        .then((res) => {
          if (res.data.status_code === 200) {
            // console.log(res.data.msg);
            setRecords(res.data.msg);
          } else if (res.data.status_code === 401) {
            userSessionContext.handleLogout();
          } else {
            toast.error("Warning");
            setRecords([]);
          }
        })
        .catch((err) => {
          toast.error("Error");
  
          setRecords([]);
        });
    };
    if (records === undefined) {
      return <Spinner />;
    }

    const currentDate = new Date().toLocaleDateString(); // Get the current date
  const currentTime = new Date().toLocaleTimeString(); // Get the current time
  return (
    <div>
    <div style={{ textAlign: "left", marginLeft: "1px" }}>
    <ReactToPrint
      
     
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
<div ref={componentRef} className="salesReturnReport">
<div className="jreportPage">
  <div>
  <div className="reportHeader">
    <p className="companyName">{companyContext.company.name}</p>
    <p className="companyAddress">
          {companyContext.company.address || ""}
        </p>
    <p className="companyPan">
      Pan No : {companyContext.company.panNo}
    </p>
   
    <p className="companyReport"> Product Transfer Details</p>
    {/* <p  style={{fontSize:"20px",fontStyle:"Bold",marginTop:"5px"}}className="companyReport">{ props.data.productName}</p> */}
    <div className="warehouseName">
                 
                 <p>
                   From Warehouse:{" "}
                   {props.data.warehouseNameFrom||""}
                 </p>
                 <p>
                   To Warehouse:{" "}
                   {props.data.warehouseName||""}
                 </p>
               </div>
  </div>


<table className="table table-fluid journal-entry-table">
  <thead>
    <tr>
     
    <th width="37px">S.N</th>
      
      <th>Product</th>
      <th>Quantity</th>
      <th>Unit</th>
   
    </tr>
  </thead>
  <tbody>
    {records &&
      records.map((i,index) => (
        <tr key={index}>
           <td width="37px">{index+1}</td>
         
            
              <td>{i.productName||""}</td>
           
              <td>{i.rawQuantity ||""}</td>
              <td>{i.unitName ||""}</td>
      
        </tr>
      ))}

   
    
  </tbody>
</table>
<Card variant="outlined">
            <CardContent>
              <div className="input-group journal-tab1">
                <div className="input-group" style={{ alignItems: "center" }}>
                  <div className="input-group-prepend">
                    <span className="input-group-text" style={{paddingLeft: "0"}}>Note :</span>
                  </div>
                  <p style={{ marginBottom: "0" }}>
                
                      {records[0]["note"]||""}
                     
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
</div>
</div>
<div style={{display:'flex', justifyContent: 'space-between', marginTop: '35px', alignContent:'center'}}>
<div style={{width:'200px', textAlign:'center'}}>    
<span>-------------------</span><br />

<span>Prepared By:</span><br />

</div>
<div style={{width:'200px', textAlign:'center'}}>
<span>-------------------</span><br />
<span>Approved By:</span><br />
</div>
</div>
<div style={{width:'300px', textAlign:'left',marginTop: '5px'}}>

<p className="date-time">Printed on {currentDate} at {currentTime} by {localStorage.getItem('user')} </p>
</div>
</div>
</div>
  )}
export default StockTransferView;