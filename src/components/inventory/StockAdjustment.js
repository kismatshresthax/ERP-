import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../utils/config";
import UseTable from "../home/UseTable";
import Popup from "../home/Popup";
import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
import AddIcon from "@material-ui/icons/Add";
import {
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
  Tooltip,
} from "@material-ui/core";
import Controls from "../controls/Controls";
import UserSessionContext from "../../contexts/UserSessionContext";
import { toast } from "react-toastify";
import Spinner from "../../utils/spinner";
import PageHeaderTitle from "../../utils/PageHeaderTitle";
import CompanyContext from "../../contexts/CompanyContext";
import StockAdjustmentform from "./StockAdjustmentform";
import StockAdjustView from "./StockAdjustView";

import { Search } from "@material-ui/icons";
import NepaliDate from "../../utils/NepaliDate";
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
  },
  searchInput: {
    width: "20%",
  },
}));

const headCells = [
  { id: "referenceId", label: "Reference" },

  { id: "warehouseName", label: "Warehouse Name" },
  { id: "count", label: "Products Count" },
  { id: "transferDate", label: " Date" },

  { id: "action", label: "Action", disableSorting: true },
];

export default function StockAdjustment(props) {
  const userSessionContext = React.useContext(UserSessionContext);
  const companyContext = React.useContext(CompanyContext);
  const classes = useStyles(props);
  const [records, setRecords] = useState();
  const [isNewPopup, setIsNewPopup] = useState(false);
  //const [isEditPopup, setIsEditPopup] = useState(false);
  const [isViewPopup, setIsViewPopup] = useState(false);
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
          return items.filter((x) =>
            (x.productName + x.warehouseName)
              .toLowerCase()
              .includes(query.toLowerCase())
          );
      },
    });
  };

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
      .get(`${config.APP_CONFIG}/Inventory/stockAdjust/Report/api`, fig)
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
    <div>
 
        
          {isNewPopup ? (
            <Popup
              title="Stock Adjust"
              openPopup={isNewPopup}
              setPopups={setIsNewPopup}
            >
              <StockAdjustmentform  setIsNewPopup={setIsNewPopup} />
            </Popup>
          ) : null}
  {isViewPopup ? (
            <Popup
              title=" Stock Product Adjust Details"
              openPopup={isViewPopup=== false ? false : true}
              setPopups={() => {
                setIsViewPopup(false);
              }}
            >
              <StockAdjustView
            data={records.filter((x) => x.referenceId === isViewPopup)[0] || null}
            />
           </Popup>
               ) : null}
          <div>
            <div>
              <div>
                <PageHeaderTitle title="Stock Adjust" />
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
             <SelectFilter   className={classes.searchInput}  onChange={handleSelect} options={props.warehouse} placeholder="Warehouse"/>
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
                        
                        <TableCell>{item.warehouseName}</TableCell>
                        <TableCell>{item.count}</TableCell>
                        <TableCell>{(item.adjustDate.slice(0,16))+" "+NepaliDate(item.adjustDate)}</TableCell>

                        <TableCell>
                          <Controls.ActionButton
                            color="primary"
                            onClick={(e) => {
                              setIsViewPopup(item.referenceId);
                              //setIsEditPopup(item.productName);
                            }}
                          >
                            <Tooltip title="Adjust">
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
  
  );
}
