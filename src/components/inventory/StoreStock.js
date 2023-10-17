import React, { useState,useEffect } from "react";

import { toast } from "react-toastify";
import { Route } from "react-router-dom";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import ReactToPrint from "react-to-print";
import Popup from "../home/Popup";
import * as XLSX from "xlsx";
import * as XlsxPopulate from "xlsx-populate/browser/xlsx-populate";
import {    Toolbar,InputAdornment, Tooltip,Paper} from "@material-ui/core";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Controls from "../controls/Controls";
import CardHeader from "@material-ui/core/CardHeader";
import ArrowForward from "@material-ui/icons/ArrowForward";
import { Search } from "@material-ui/icons";
import { useForm, Form } from "../../components/home/useForm";

// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import DateTimePicker from '@mui/lab/DateTimePicker';
import PageHeaderTitle from "../../utils/PageHeaderTitle";
//import Select from "@material-ui/core/Select";
import axios from "axios";
import config from "../../utils/config";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@material-ui/icons/Add";
import UserSessionContext from "../../contexts/UserSessionContext";
import UserAuthenticationContext from "../../contexts/UserAuthenticationContext";
import { format } from "date-fns";
import CompanyContext from "../../contexts/CompanyContext";
import Select from "react-select";
import PrintIcon from "@mui/icons-material/Print";
import "date-fns";
import UseTable from "../home/UseTable";
import ReportHeader from "../reports/ReportHeader";
import Excelfile from "../../utils/Excelfile";
const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: "white",
    color: "#546e7a",
    justifyContent: "left",
    padding: "12px 0px",
    fontWeight: "bold",
  },
  pageContent: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  searchInput: {
    width: '20%'
  },
  searchMultiInput: {
    width: '50%'
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

const headCells = [
  { id: "name", label: "Name" },
  { id: "name", label: "Category" },
  { id: "name", label: "Warehouse" },
  { id: "name", label: "quantity" },

  { id: "actions", label: "Actions", disableSorting: true },
];

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
    "label":"Warehouse",
    "value":2,
},
 {
    "label":"Category",
     "value":3,
 },



]
const ops=[{
    label:"all",
    value:1,
},]
export default function StoreStock(props) {
  const componentRef = React.useRef(null);
  // const ExcelFile = ReactExport.ExcelFile;
  // const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  // const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

  const userSessionContext = React.useContext(UserSessionContext);
  // let history = useHistory();
  const classes = useStyles();
  const [records, setRecords] = useState([]);
  const [Data, setData]= useState([]);
  const permissionContext = React.useContext(UserAuthenticationContext);
  //let Permission = permissionContext.permissions;
  const companyContext = React.useContext(CompanyContext);
  const [warehouse, setWareHouseList] = useState();
  const [isNewPopup, setIsNewPopup] = useState(false);
 // const [isEditPopup, setIsEditPopup] = useState(false);
  const [ShowComponent, setShowComponent] = useState(false);
  const [searchData, setSearchData] = useState(search_data||[]);
  const [search, setSearch] = useState([]);
  const [all, setAll] = useState("");
  const [Loading, setLoading] = useState(false);
  const [List, setList] = useState([]);
  const [issubmit, setSubmit] = useState(false);


   
    useEffect(() => {
        load_warehouse();
       
      }, []);
    
    
      const load_warehouse = async() => {
       await axios
          .get(`${config.APP_CONFIG}/stock/warehouse/api`, {
            headers: { Authorization: userSessionContext.token },
          })
          .then((res) => {
            if (res.data.status_code === 401) {
              userSessionContext.handleLogOut();
            } else if (res.data.status_code === 200) {
              // console.log(res.data.msg);
              let temp = res.data.msg.map((item) => ({
                value: item.id,
                label: item.warehouse,
              }));
    
          
              //  console.log(warehouses);
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
  



 

 
  useEffect(() => {
    if (searchData.label!== undefined) {
   
    loaddataById(searchData.label);
    
}
}, [searchData])

useEffect(() => {

}, [issubmit])
const loaddataById = async (type) => {
 
   
    if(type==="Warehouse"){
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
          toast.error("Cannot load .");
          setList([]);
        }
      })
      .catch((err) => {
        // toast.error("failed to load units");
        setList([]);
      });
  }

  else if(type==="Category")
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
     
    
    else{
      if(type==="all")
{
  setAll("all");
}
    
}
}


  const handleSubmit = (e) => {

    e.preventDefault();
  
    if(searchData.value===0){
      toast.warn("Fill Required Fields ");
    }
    if(searchData.length===0){
      toast.warn("Please Enter Search ");
    }
    else if(all==="all"){

      let _data = {
      
    
        "searchType": searchData.label,
        "searchData": 0
      };
    
      axios.post(`${config.APP_CONFIG}/InventorySummary/api`, _data, {
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
              setShowComponent(true)
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
      "searchType": searchData.label,
 
      "searchData": search.value
    };
  
    axios.post(`${config.APP_CONFIG}/InventorySummary/api`, _data, {
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
            setShowComponent(true);
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

const ReportComponent = (props) => {

  return (
     
      
       
        <div>
          <ReportHeader title="Stock Warehouse"/>
        <Form onSubmit={handleSubmit}>
        <Grid container direction="row" spacing ={2}>
            <Grid item lg={12} md={12} xs={12}>
             
                <Card  sx={{ minWidth: 500 }}>
                  <Grid container spacing ={2}>
                    <Grid item xs={12} sm={3}>
                      <label>Search Type </label>
                      <Select
                       value={searchData}
                        options={search_data}
                        styles={{
                          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                        }}
                        menuPortalTarget={document.body}
                        onChange={setSearchData}
                      
                      />
                    </Grid>
                {all==="all"?
                    <Grid item xs={12} sm={3}>
                      <label>Search </label>
                      <Select
                   
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
                 
                   

                    <Grid
                      item
                      xs={12}
                      sm={3}
                      style={{ display: "flex", margin: "20px 0", }}
                    >
                      <Controls.Button  style={{marginBottom:"5px"}}type="submit" text="Submit" />
                    </Grid>
                  </Grid>
                </Card>
             
            </Grid>
          </Grid>
          </Form>
        </div>
      
     
  )
}

const PrintComponent=(props)=>{
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
           
            <p className="companyReport">Stock Details</p>
           
          </div>


        <table className="table table-fluid journal-entry-table">
          <thead>
            <tr>
             
            <th width="37px">S.N</th>
              <th >Product Name</th>
              <th>Category</th>
              <th>Warehouse</th>
              <th>Quantity</th>
              <th>Unit</th>
           
            </tr>
          </thead>
          <tbody>
            {props.records &&
              props.records.map((i,index) => (
                <tr key={index}>
                   <td width="37px">{index+1}</td>
                   <td>{i.productName}</td>
                      <td>{i.CategoryName}</td>
                      <td>{i.warehouseName}</td>
                   
                      <td >{i.rawQuantity}</td>
                      <td>{i.unitName}</td>
              
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
};


const TableComponent = (props) => {
 
  const [records, setRecords] = useState(props.records||[]);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
  UseTable(records, headCells, filterFn);

const handleSearch = (e) => {
  let query = e.target.value;

  setFilterFn({
    fn: (items) => {
      if (query === "") return items;
      else
        return items.filter(
          (x) => x.productName+x.warehouse.toLowerCase().includes(query.toLowerCase())
         
        );
    },
  });
};

  
  const classes = useStyles(props);
  return (
    <div>
    

 <div>
<Paper className={classes.pageContent}>

          <div  className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
            <TblContainer>
                <TblHead />
                <TableBody>
                  {recordsAfterPagingAndSorting().map((item, index) => {
               
                  
                    return<TableRow key={item.id}>
                      <TableCell>{item.productName}</TableCell>
                      <TableCell>{item.CategoryName}</TableCell>
                      <TableCell>{item.warehouseName}</TableCell>
                   
                      <TableCell>{item.rawQuantity+" "+item.unitName}</TableCell>
                 
                      <TableCell>
                       
                      </TableCell>
                    </TableRow>
})}
              </TableBody>
              </TblContainer>
              {records.length>0?
              <div className="d-flex flex-row justify-content-between">
              <span className="d-flex flex-row">
              <Excelfile data={records}/>
              </span>
              
              <TblPagination />
              </div>
    
           :<div className="reportNotFound">
           <p >No Records to Display</p>
               </div>}
             
             
       
            </div>
          </div>
         
          </Paper>
          </div>
          </div>  
 
  )
}

let history = useHistory();
return (
<div>
{isNewPopup ? (
        <Popup
          title="Print Preview"
          openPopup={isNewPopup}
          setPopups={setIsNewPopup}
        >
          <PrintComponent
            records={records}
       
          />
        </Popup>
      ) : null}
   <div className="content-wrapper iframe-mode"
          data-widget="iframe"
          data-loading-screen={750}>
       <div>

        {ShowComponent===true ? 

        <div className="addButton">
        <Controls.Button
          text="Print"
          variant="outlined"
          startIcon={<PrintIcon />}
          className={classes.newButton}
          onClick={() => {
            setIsNewPopup(!isNewPopup);
          }}
        />
         <Controls.Button
          text="Excel"
          variant="outlined"
          startIcon={<PrintIcon />}
          className={classes.newButton}
          onClick={() => {
            setIsNewPopup(!isNewPopup);
          }}
          />
          <Controls.Button
          text="Back"
          variant="outlined"
            style={{position:"absolute",right:"0px"}}
          //className={classes.backBtn}
          onClick={() => {
           setShowComponent(false);
           setSearch("");

          }}
        />

      </div>
        : null}
       </div>
           

            
            
       
            {!ShowComponent &&  <ReportComponent />}
          {ShowComponent && <TableComponent records={records} />}
   
          
        </div>
   
        </div>
  );
}
