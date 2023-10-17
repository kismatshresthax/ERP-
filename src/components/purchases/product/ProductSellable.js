import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../../utils/config";
import { toast } from "react-toastify";
import UserSessionContext from "../../../contexts/UserSessionContext";
import "../../../utils/styles.css";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

import Controls from "../../controls/Controls";
import AddIcon from "@material-ui/icons/Add";
import UseTable from "../../home/UseTable";
import Popup from "../../home/Popup";
import {
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
  Tooltip,Paper
} from "@material-ui/core";
import Spinner from "../../../utils/spinner";
import PageHeaderTitle from "../../../utils/PageHeaderTitle";
import ProductStepper from "./ProductStepper";
import ProductEditStepper from "./ProductEditStepper";
import ConfirmDialog from "../../home/ConfirmDialog";
import UserAuthenticationContext from "../../../contexts/UserAuthenticationContext";
import { Search } from "@material-ui/icons";
import Excelfile from "../../../utils/Excelfile";
import { SelectFilter } from "../../../utils/SelectFilter";

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
    width: "15%",
  },
}));



const headCells = [
  { id: "categoryname", label: "Category" },
  { id: "productname", label: "Product" },
  { id: "code", label: "Code" },
  { id: "Unit", label: "Unit" },
  { id: "costPrice", label: "Cost Price" },
  { id: "sellPrice", label: "Sell Price" },
  { id: "actions", label: "Actions", disableSorting: true },
];

export default function ProductSellable(props) {
  const userSessionContext = React.useContext(UserSessionContext);
  const classes = useStyles(props);
  const [records, setRecords] = useState();
  const [isNewPopup, setIsNewPopup] = useState(false);
  const [isEditPopup, setIsEditPopup] = useState(false);
  const [insertId, setInsertId] = useState();

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const [baseUnit, setBaseUnit] = useState({});
  const [searchrecord, setSearchRecords] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const permissionContext = React.useContext(UserAuthenticationContext);
  let Permission = permissionContext.permissions;
  let curr_mod_permission = Permission.filter((x) => {
    return x["module_name"].toLowerCase() === "purchases";
  });
  let userPermission = curr_mod_permission[0];
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    UseTable(records, headCells, filterFn);

  const handleSearch = (e) => {
    let query = e.target.value;

    setFilterFn({
      fn: (items) => {
        if (query === "") return items;
        else
          return items.filter(
            (x) =>
              (
                x.categoryname +
                x.productname +
                x.displayName +
                x.code +
                x.costPrice +
                x.sellPrice
              )
                .toLowerCase()
                .includes(query.toLowerCase())
            // items[x].toString().toLowerCase().includes(target.value)
            // x.firstName.toLowerCase().includes(target.value)
          );
      },
    });
  };


  const handleSelect = (e) => {


    if (e) {
    
      setFilterFn({
        fn: (items) => {
          return items.filter((x) => x.categoryId === e.value);
        },
      });
    } else {
    
      setFilterFn({
        fn: (items) => items, 
      });
    }
    };
 
 
    useEffect(() => {
      load_table();
      load_product_category();
    }, []);
  
    const load_product_category = async () => {
      await axios
         .get(`${config.APP_CONFIG}/Products/ProductCategory/api`, {
           headers: { Authorization: userSessionContext.token },
         })
         .then((res) => {
           if (res.data.status_code === 200) {
            let categoryList = res.data.msg.map((name) => ({
              label: name.categoryName,
              value: name.id,
            }
            ));
            setSearchRecords(categoryList)
             //setRecords(res.data.msg);
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


  const load_table = async() => {
   await axios
      .get(`${config.APP_CONFIG}/Products/productbyType/api/isSellable`, {
        headers: { Authorization: userSessionContext.token },
      })
      .then((res) => {
        if (res.data.status_code === 200) {
          setRecords(res.data.msg);
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

  const updateProduct = (data) => {
    axios
      .put(`${config.APP_CONFIG}/Products/product/api/${data.id}`, data, {
        headers: { Authorization: userSessionContext.token },
      })
      .then((res) => {
        if (res.data.status_code === 200) {
          toast.info("Data Updated successfully");
          load_table();
          setIsEditPopup(false);
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogout();
        } else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
        } else {
          toast.error("Couldn't Update");
          setRecords([]);
        }
      })
      .catch((err) => {
        toast.error("Error");
        setRecords([]);
      });
  };

  const deleteProduct = (id) => {
    setConfirmDialog({ ...confirmDialog, isOpen: false });
    axios
      .delete(`${config.APP_CONFIG}/Products/product/api/${id}`, {
        headers: { Authorization: userSessionContext.token },
      })
      .then((res) => {
        if (res.data.status_code === 200) {
          toast.warn("Deleted Successfully!");
          load_table();
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogout();
        } else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
        } else {
          toast.error("Delete Unsuccessful");
        }
      })
      .catch((err) => {
        toast.error("Error");
      });
  };

  if (records === undefined) {
    return <Spinner />;
  }

  return (
    <div>

      <div
        className="search"
        
      >
        {isNewPopup ? (
          <Popup
          size="lg"
            title="Add Product Form"
            openPopup={isNewPopup}
            setPopups={setIsNewPopup}
          >
            <ProductStepper

              insertId={insertId}
              setInsertId={setInsertId}
        
              load_table={(e) => {
                load_table(e);
              }}
            />
          </Popup>
        ) : null}

        {isEditPopup ? (
          <Popup
          size="lg"
            title="Edit Product Form"
            openPopup={isEditPopup === false ? false : true}
            setPopups={() => {
              setIsEditPopup(false);
            }}
          >
            <ProductEditStepper
              load_table={(e) => {
                load_table(e);
              }}
              handleSubmit={updateProduct}
              setBaseUnit={setBaseUnit}
              baseUnit={baseUnit}
              data={records.filter((x) => x.id === isEditPopup)[0] || null}
           
            />
          </Popup>
        ) : null}
        <ConfirmDialog
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        />

        <div>
         
            <div>
         
              <PageHeaderTitle title="Products" />
            </div>
            {userPermission["u_create"] === 1 ? (
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
            ) : null}
          </div>

    

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
           <SelectFilter   className={classes.searchInput} onChange={handleSelect} options={searchrecord} placeholder="Category"/>
        </Toolbar>
        </div>

        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
          <Paper style={{ width: '100%' }}>
            <TblContainer >
              <TblHead />
              <TableBody >
                {recordsAfterPagingAndSorting().map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell >{item.categoryname}</TableCell>
                    <TableCell >{item.productname}</TableCell>
            
                    <TableCell >{item.code}</TableCell>
                    <TableCell >{item.UnitName}</TableCell>
                    <TableCell >{item.costPrice}</TableCell>
                    <TableCell >{item.sellPrice}</TableCell>
                    <TableCell>
                      <Controls.ActionButton
                        color="primary"
                        onClick={(e) => {
                          setIsEditPopup(item.id);
                        }}
                      >
                        <Tooltip title="Edit">
                          <EditOutlinedIcon fontSize="small" />
                        </Tooltip>
                      </Controls.ActionButton>
                      {/* <Controls.ActionButton
                        color="secondary"
                        onClick={() => {
                          setConfirmDialog({
                            isOpen: true,
                            title: "Are you sure to delete this record?",
                            subTitle: "You can't undo this operation",
                            onConfirm: () => {
                              deleteProduct(item.id);
                            },
                          });
                        }}
                      >
                        <Tooltip title="Delete">
                          <CloseIcon fontSize="small" />
                        </Tooltip>
                      </Controls.ActionButton> */}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </TblContainer>
            {records.length>0 ?

<div className="d-flex flex-row justify-content-between">
<span className="d-flex flex-row">
<Excelfile data={records}/>
</span>

<TblPagination />
</div>
        
          :null}
            </Paper >
          </div>
        </div>
      </div>
   
    // </div>
  );
}
