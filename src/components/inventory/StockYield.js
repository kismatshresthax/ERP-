import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../utils/config";
import { toast } from "react-toastify";

import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
import { format } from "date-fns";
import {
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
  Tooltip,
} from "@material-ui/core";
//import "../../utils/styles.css";
import UserSessionContext from "../../contexts/UserSessionContext";
import Controls from "../../components/controls/Controls";


import Spinner from "../../utils/spinner";
import CompanyContext from "../../contexts/CompanyContext";

import Popup from "../home/Popup";

import UseTable from "../../components/home/UseTable";

import { Search } from "@material-ui/icons";
import StockYieldView from "./StockYieldView";
import { SelectFilter } from "../../utils/SelectFilter";




const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  newButton: {
    position: "absolute",
    zIndex: 4,
    right: "10px",
  },searchInput: {
    width: "20%",
  },
}));



const headCells = [

  { id: "productName", label: "Product Name" },
  
  { id: "warehouseName", label: "Warehouse" },
  { id: "unitName", label: "Stock" },
  { id: "create_at", label: "Date" },
  { id: "actions", label: "Actions", disableSorting: true },
];

function StockYield(props) {
  const userSessionContext = React.useContext(UserSessionContext);
  const companyContext = React.useContext(CompanyContext);
  const classes = useStyles(props);
  const [records, setRecords] = useState([]);
  const [isNewPopup, setIsNewPopup] = useState(false);
  const [warehouse, setWarehouse] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
const companyId=companyContext.company.id;
useEffect(() => {
  load_table();
      // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

useEffect(() => {
  load_table();
  load_warehouse ();
}, []);

const load_warehouse = async() => {
 await axios
    .get(`${config.APP_CONFIG}/stock/warehouse/api`, {
      headers: { Authorization: userSessionContext.token },
    })
    .then((res) => {
      if (res.data.status_code === 200) {
        let temp = res.data.msg.map((item) => ({
          value: item.id,
          label: item.warehouse,
        }));
        setWarehouse(temp);
      } else if (res.data.status_code === 400) {
        userSessionContext.handleLogout();
      } else {
        toast.error("Warning");
        setWarehouse([]);
      }
    })
    .catch((err) => {
      toast.error("Error");
      setWarehouse([]);
    });
};


const load_table = () => {
 axios
    .get(`${config.APP_CONFIG}/Yield/stockYield/api/${companyId}`, {
      headers: { Authorization: userSessionContext.token },
    })
    .then((res) => {
      if (res.data.status_code === 200) {
        setRecords(res.data.msg ||[]);
      } else if (res.data.status_code === 401) {
        userSessionContext.handleLogout();
      } else if (res.data.status_code === 400) {
        toast.warn(res.data.msg);
      } else {
        toast.error("Cannot Load Data");
        setRecords([]);
      }
    })
    .catch((err) => {
      toast.error("Error");
      setRecords([]);
    });
};

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = UseTable(records, headCells, filterFn);
  const handleSearch = (e) => {
    let query = e.target.value;

    setFilterFn({
      fn: (items) => {
        if (query === "") return items;
        else
          return items.filter(
            (x) =>
              (x.productName + x.warehouseName )
                .toLowerCase()
                .includes(query.toLowerCase())
           
          );
      },
    });
  };
  const handleSelect = (e) => {


    if (e) {
    
      setFilterFn({
        fn: (items) => {
          return items.filter((x) => x.warehouseId === e.value);
        },
      });
    } else {
    
      setFilterFn({
        fn: (items) => items, 
      });
    }
    };
  if (records === undefined) {
    return <Spinner />;
  }

  return (


    <div
     
    >
      {isNewPopup ? (
        <Popup
        size="lg"
          title=" Product Yield Form"
          openPopup={isNewPopup}
          setPopups={setIsNewPopup}
        >
          <StockYieldView
           data={records.filter((x) => x.product_id === isNewPopup)[0] || null}
      // data={isNewPopup}
             
           setIsNewPopup={setIsNewPopup}
      
          
          />
        </Popup>
      ) : null}

    
  
<Toolbar>
        <Controls.Input
          label="Search"
           className={classes.searchInput}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
       
          onChange={handleSearch}
        />
            <SelectFilter   className={classes.searchInput}  onChange={handleSelect}options={warehouse} placeholder="Warehouse"/>
      </Toolbar> 

      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
          <TblContainer>
            <TblHead />
            <TableBody>
              {recordsAfterPagingAndSorting().map((item, index) => (
                <TableRow key={item.productId}>
              
                  <TableCell>{item.productName||""}</TableCell>
                  
                  <TableCell>{item.warehouseName||""}</TableCell>
            
               
            
                  <TableCell style={{color:"green"}}><span style={{color:"green"}}>{item.qty +" "+item.unitName}</span></TableCell>
                  <TableCell>{format(new Date(item.created_at), "yyyy-MM-dd").toString()}</TableCell>
              
                  <TableCell>
                    <Controls.ActionButton
                      color="primary"
                      onClick={(e) => {
                      
                        setIsNewPopup(item.product_id);
                      }}
                    >
                    <Tooltip title="Yield">
                              <RemoveRedEyeIcon fontSize="small" />
                            </Tooltip>
                    </Controls.ActionButton>
                   
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TblContainer>
          {records.length>0?
      <TblPagination /> 
      : <div className="reportNotFound">
      <p >No Records to Display</p>
          </div>}
        </div>
      </div>
    </div>


);
}
export default StockYield;