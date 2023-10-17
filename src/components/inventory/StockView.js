import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../utils/config";
//import UseTable from "../home/UseTable";

//import AddIcon from "@material-ui/icons/Add";
import { makeStyles} from "@material-ui/core";
import Controls from "../controls/Controls";
import UserSessionContext from "../../contexts/UserSessionContext";
import { toast } from "react-toastify";
//import Spinner from "../../utils/spinner";
//import PageHeaderTitle from "../../utils/PageHeaderTitle";
import CompanyContext from "../../contexts/CompanyContext";

//import UserAuthenticationContext from "../../contexts/UserAuthenticationContext";
//import { format } from "date-fns";
import ReactToPrint from "react-to-print";

import PrintIcon from "@mui/icons-material/Print";
import "date-fns";


const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  newButton: {
    position: "absolute",
    zIndex: 4,
    right: "10px",
  },
  searchInput: {
    width: "25%",
  },
}));


function StockView(props) {
    const componentRef = React.useRef(null);
    const userSessionContext = React.useContext(UserSessionContext);
    // let history = useHistory();
    const companyContext = React.useContext(CompanyContext);
    const companyId = companyContext.company.id;
    const classes = useStyles();
    const [records, setRecords] = useState([]);
     useEffect(() => {
      load_warehouse_product();
 
  }, []);

 
 const load_warehouse_product=()=>{
  axios.get(`${config.APP_CONFIG}/InventorySummary/api/${companyId}/${props.data.productId}`, {
    headers: { Authorization: userSessionContext.token },
  })
  .then((res) => {
    if (res.data.status_code === 200) {
     
      if(res.data.msg.length<1){
        toast.warn("No Records")
      }
      else{
        setRecords(res.data.msg);
      
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


 }
    //let Permission = permissionContext.permissions;

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
         Address: {companyContext.company.address || ""}
        </p>
    <p className="companyPan">
      Vat No : {companyContext.company.panNo}
    </p>
   
    {/* <p className="companyReport"> Product Stock Details</p> */}
    <p  style={{fontSize:"20px",fontStyle:"Bold",marginTop:"10px"}}className="companyReport"> Item : { props.data.productName}</p>
  </div>


<table className="table table-fluid journal-entry-table">
  <thead>
    <tr>
     
    <th width="37px">S.N</th>
      
      <th>Warehouse</th>
      <th>Quantity</th>
      <th>Unit</th>
   
    </tr>
  </thead>
  <tbody>
    {records &&
      records.map((i,index) => (
        <tr key={index}>
           <td width="37px">{index+1}</td>
         
            
              <td>{i.warehouseName||""}</td>
           
              <td>{i.rawQuantity||""}</td>
              <td>{i.unitName||""}</td>
      
        </tr>
      ))}

   
    
  </tbody>
</table>
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

  )
}

export default StockView;