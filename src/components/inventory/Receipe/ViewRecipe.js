import React, { useState } from "react";
import { toast } from "react-toastify";
import { Route } from "react-router-dom";
// Material UI
import { makeStyles } from "@material-ui/core/styles";


import Controls from "../../controls/Controls";

//import { useForm, Form } from "../../components/home/useForm";



import ReactToPrint from "react-to-print";
import * as XLSX from "xlsx";

import * as XlsxPopulate from "xlsx-populate/browser/xlsx-populate";
//import ReactExport from "react-export-excel";
import axios from "axios";

import config from "../../../utils/config";
//import UserAuthenticationContext from "../../contexts/UserAuthenticationContext";

import UserSessionContext from "../../../contexts/UserSessionContext";
import CompanyContext from "../../../contexts/CompanyContext";
import PrintIcon from "@mui/icons-material/Print";
import { format } from "date-fns";
import Spinner from "../../../utils/spinner";
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


function ViewRecipe(props) {
  const componentRef = React.useRef(null);
  const userSessionContext = React.useContext(UserSessionContext);
  // let history = useHistory();
  const classes = useStyles();
  const [records, setRecords] = useState([]);

 const companyContext = React.useContext(CompanyContext);

  React.useEffect(() => {
    load_table();
  }, []);

  const load_table =  () => {
    const fig = {
      headers: {
        Authorization: userSessionContext.token,
      },
    };
    axios
      .get(`${config.APP_CONFIG}/Ingredients/recipe/api/${props.data.id}`, fig)
      .then((res) => {
        if (res.data.status_code === 200) {
   
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
  const total = records.reduce((qty, obj) => obj.quantity + qty, 0);
  const unitcosttotal = records.reduce((qty, obj) => obj.cost_price + qty, 0);
  const subtotal = records.reduce((qty, obj) => (obj.quantity *obj.cost_price)+ qty, 0);
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
     
      <p className="companyReport">  Receipe  Ingredients </p>
    
      <div className="warehouseName">
                   
                   <p>
                      Receipe:{" "}
                     <strong>{props.data.productname||""}</strong>
                   </p>
                  
                 </div>
    </div>
  
  
  <table className="table table-fluid">
    <thead>
      <tr>
       
      <th width="37px">S.N</th>
      <th>Warehouse</th>
        <th>Ingredients</th>
        <th>Quantity</th>
        <th>Cost</th>
    
       
      </tr>
    </thead>
    <tbody>
      {records &&
        records.map((i,index) => (
          <tr key={index}>
             <td width="37px">{index+1}</td>
           
              
             <td>{i.wareHouseName||""}</td>
                <td>{i.ingProductName||""}</td>
             
                <td> <span style={{color:"green"}}>{((i.quantity ||"")+" "+i.unitName)}</span></td>
                {/* <td>{i.unitName ||""}</td> */}
                <td>{i.cost_price ||""}</td>
               </tr>
  ))}
      <tr>
                <td
                  colSpan={3}
                  style={{ fontWeight: "600", textAlign: "center" }}
                >
                  Total
                </td>
                <td> <span style={{color:"green"}}>{total.toFixed(3)}</span></td>
               
                <td> <span style={{color:"green"}}>{unitcosttotal.toFixed(3)}</span></td>
          </tr>
  </tbody>
  </table>
  
         
  
  </div>
  </div>
  <div style={{display:'flex', justifyContent: 'flex-end'}}>
    <p><b>Subtotal :{subtotal.toFixed(3)}</b></p>
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
  )
}

export default ViewRecipe