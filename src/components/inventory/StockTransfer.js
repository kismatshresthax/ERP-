import React,{useEffect,useState} from 'react'
import AddIcon from "@material-ui/icons/Add";
import { makeStyles,Tooltip} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Controls from "../controls/Controls";
import UserSessionContext from "../../contexts/UserSessionContext";
import { toast } from "react-toastify";
import Spinner from "../../utils/spinner";
// import { Grid } from "@material-ui/core";
// import { useForm, Form } from "../../components/home/useForm";
import axios from "axios";
import config from "../../utils/config";
import Select from "react-select";
//import AddCircleIcon from "@mui/icons-material/AddCircle";
import CompanyContext from "../../contexts/CompanyContext";
import PageHeaderTitle from "../../utils/PageHeaderTitle";
import {  TableBody, TableRow, TableCell ,Toolbar,InputAdornment} from "@material-ui/core";

import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
// import Card from "@material-ui/core/Card";
// import ConfirmDialog from '../home/ConfirmDialog';
// import CardHeader from "@material-ui/core/CardHeader";
// import CardContent from "@mui/material/CardContent";
// import PrintIcon from '@mui/icons-material/Print';
import StockTransferView from './StockTransferView';
import StockTransferForm from './StockTranformForm';
import UseTable from "../home/UseTable";
import Popup from "../home/Popup";
import { Search } from "@material-ui/icons";
import NepaliDate from '../../utils/NepaliDate';
import { SelectFilter } from '../../utils/SelectFilter';

  
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
      width: "20%",
    },
  }));

   
    
  const headCells = [
    { id: "referenceId", label: "Reference" },
    { id: "warehouseNameFrom", label: "warehouseNameFrom" },
    { id: "warehouseName", label: " ToWarehouse" },
     { id: "count", label: "Count" },
    { id: "transferDate", label: "Transfer Date" },
    { id: "action", label: "Action", disableSorting: true },
  ];

  export default function StockTransfer(props) {
  const userSessionContext = React.useContext(UserSessionContext);
  const companyContext = React.useContext(CompanyContext);
  const classes = useStyles(props);
    const [records, setRecords] = useState();
    const [allProducts, setAllProducts] = useState();
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState();
    const [isNewPopup, setIsNewPopup] = useState(false);
    const [isViewPopup, setIsViewPopup] = useState(false);
    const [SaveStatus, setSaveStatus] = useState(0);
    // const [confirmDialog, setConfirmDialog] = useState({
    //   isOpen: false,
    //   title: "",
    //   subTitle: "",
    //   Icon:PrintIcon,
    // });
    const [filterFn, setFilterFn] = useState({
      fn: (items) => {
        return items;
      },
    });
 
    const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
      UseTable(records, headCells, filterFn);

      useEffect(() => {
        load_table();
      }, []);
    
      const load_table = async () => {
        const fig = {
          headers: {
            Authorization: userSessionContext.token,
          },
        };
        await axios
          .get(`${config.APP_CONFIG}/InventoryTransfer/getData/api`, fig)
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


    const handleSearch = (e) => {
      let query = e.target.value;
      setFilterFn({
        fn: (items) => {
          if (query === "") return items;
          else
            return items.filter((x) =>
              (x.productName + x.warehouseName)
                .toLowerCase()
                .includes(query.toLowerCase())
            );
        },
      });
    };
    // useEffect(() => {
    //     load_warehouse();
    //   }, []);
    
    //   const load_warehouse = async() => {
    //    await axios
    //       .get(`${config.APP_CONFIG}/stock/warehouse/api`, {
    //         headers: { Authorization: userSessionContext.token },
    //       })
    //       .then((res) => {
    //         if (res.data.status_code === 200) {
    //             let temp = res.data.msg.map((item) => ({
    //                 id: item.id,
    //                 title: item.warehouse,
    //               }));
        
    //               let warehouses = [{ id: 0, title: "Main Store" }].concat(temp);
    //               //  console.log(warehouses);
    //               setRecords(warehouses);
    //         } else if (res.data.status_code === 400) {
    //           userSessionContext.handleLogout();
    //         } else {
    //           toast.error("Warning");
    //           setRecords([]);
    //         }
    //       })
    //       .catch((err) => {
    //         toast.error("Error");
    //         setRecords([]);
    //       });
    //   };
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
return (
      <div>
      <div className="">
        <div
          className="content-wrapper iframe-mode"
          data-widget="iframe"
          data-loading-screen={750}
        >
          {isNewPopup ? (
            <Popup
              title="Transfer Form"
              openPopup={isNewPopup}
              setPopups={setIsNewPopup}
            >
               <StockTransferForm setIsNewPopup={setIsNewPopup} load_table={load_table}
              
               />
            </Popup>
          ) : null}

          {isViewPopup ? (
            <Popup
              title="View Stock Product Details"
              openPopup={isViewPopup=== false ? false : true}
              setPopups={() => {
                setIsViewPopup(false);
              }}
            >
              <StockTransferView
            data={records.filter((x) => x.referenceId === isViewPopup)[0] || null}
            />
           </Popup>
        ) : null}

<div>
            <div>
              <div>
                <PageHeaderTitle title="Stock Transfer" />
              </div>

              <div className="addButton">
                <Controls.Button
                  text="Add New"
                  variant="outlined"
                  startIcon={<AddIcon />}
                  className={classes.newButton}
                  style={{ top: "15px", right: "0", margin: "0" }}
                  onClick={() => {
                    setIsNewPopup(!isNewPopup);
                  }}
                />
              </div>
            </div>
          </div>

          <Toolbar>
            <Controls.Input
              label="Search products"
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
             <SelectFilter   className={classes.searchInput} onChange={handleSelect} options={props.warehouse} placeholder="Warehouse"/>
          </Toolbar>

          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
              <TblContainer>
                <TblHead />
                <TableBody>
                  {recordsAfterPagingAndSorting().map((item, index) => {
              
                    return (
                      <TableRow key={item.id}>
                        <TableCell>{item.referenceId}</TableCell>
                        <TableCell>{item.warehouseNameFrom}</TableCell>
                        <TableCell>{item.warehouseName}</TableCell>
                        <TableCell>{item.count}</TableCell>
                        <TableCell>{(item.transferDate.slice(0,16))+" "+NepaliDate(item.transferDate)}</TableCell>
                 
                        <TableCell>
                          <Controls.ActionButton
                            color="primary"
                            onClick={(e) => {
                            setIsViewPopup(item.referenceId);
                            }}
                          >
                            <Tooltip title="Transfer">
                              <RemoveRedEyeIcon fontSize="small" />
                            </Tooltip>
                          </Controls.ActionButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </TblContainer>
              {records.length > 0 ? (
                <TblPagination />
              ) : (
                <div className="reportNotFound">
                  <p>No Records to Display</p>
                </div>
              )}

              {records.length !== 0 ? (
                <button
                  style={{
                    position: "absolute",
                    left: "10px",
                    bottom: "10px",
                  }}
                  onClick={() => {}}
                  className="btn btn-success btn-sm ml-1"
                >
                  Excel Export
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

