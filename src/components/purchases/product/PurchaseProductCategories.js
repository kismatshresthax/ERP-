import React, { useState, useEffect } from "react";
import axios from "axios";

import config from "../../../utils/config";
import UseTable from "../../home/UseTable";
import Popup from "../../home/Popup";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

import {
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
  Tooltip,
} from "@material-ui/core";
import Controls from "../../controls/Controls";
import CategoryForm from "./CategoryForm";
import AddIcon from "@material-ui/icons/Add";
import UserSessionContext from "../../../contexts/UserSessionContext";
// import ConfirmDialog from "../../components/ConfirmDialog";
import { toast } from "react-toastify";
import Spinner from "../../../utils/spinner";
import ConfirmDialog from "../../home/ConfirmDialog";
import UserAuthenticationContext from "../../../contexts/UserAuthenticationContext";
import PageHeaderTitle from "../../../utils/PageHeaderTitle";
import { Search } from "@material-ui/icons";
import Excelfile from "../../../utils/Excelfile";
const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  newButton: {
    position: "absolute",
    zIndex: 4,
    right: "0px",
  },searchInput: {
    width: "20%",
  },
}));
const headCells = [
  { id: "categoryName", label: "CategoryName" },
  { id: "description", label: " Description", disableSorting: true },
  { id: "ParentName", label: "ParentName", disableSorting: true },
  { id: "isConsumble", label: "Saleable", disableSorting: true },
  { id: "isService", label: "Consumable" , disableSorting: true},
 
  { id: "colur", label: "Color", disableSorting: true },
  { id: "actions", label: "Actions", disableSorting: true },
];

export default function PurchaseProductCategories(props) {
  const userSessionContext = React.useContext(UserSessionContext);

  const classes = useStyles(props);
  const [records, setRecords] = useState();
  const [isNewPopup, setIsNewPopup] = useState(false);
  const [isEditPopup, setIsEditPopup] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

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
  let userPermission = curr_mod_permission[0]
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    UseTable(records, headCells, filterFn);

  useEffect(() => {
    load_product_category();
  }, []);
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
                x.productname 
          
             
              )
                .toLowerCase()
                .includes(query.toLowerCase())
            // items[x].toString().toLowerCase().includes(target.value)
            // x.firstName.toLowerCase().includes(target.value)
          );
      },
    });
  };
  const load_product_category = async () => {
   await axios
      .get(`${config.APP_CONFIG}/Products/ProductCategory/api`, {
        headers: { Authorization: userSessionContext.token },
      })
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

  const addCategory = (_data) => {
    axios
      .post(`${config.APP_CONFIG}/Products/ProductCategory/api`, _data, {
        headers: { Authorization: userSessionContext.token },
      })
      .then((res) => {
        if (res.data.status_code === 200) {
          toast.success(res.data.msg || "successfully added");
          load_product_category();
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogout();
        } else if (res.data.status_code === 400) {
          toast.error(res.data.msg);
          setRecords([]);
        }
      })
      .catch((err) => {
        toast.error("Something Went Wrong");
        setRecords([]);
      });
    setIsNewPopup(false);
  };

  const updateCategory = (_data) => {
    axios
      .put(
        `${config.APP_CONFIG}/Products/ProductCategory/api/${_data.id}`,
        _data,
        { headers: { Authorization: userSessionContext.token } }
      )
      .then((res) => {
        if (res.data.status_code === 200) {
          toast.success(res.data.msg || "updated successfully");
          load_product_category();
          setIsEditPopup(false);
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogout();
        } else if (res.data.status_code === 400) {
          toast.error(res.data.msg);
          setRecords([]);
        }
      })
      .catch((err) => {
        toast.error("Error");
        setRecords([]);
      });
  };

  const deleteproductcategory = (id) => {
    setConfirmDialog({ ...confirmDialog, isOpen: false });
    axios
      .delete(`${config.APP_CONFIG}/Products/ProductCategory/api/${id}`, {
        headers: { Authorization: userSessionContext.token },
      })
      .then((res) => {
        if (res.data.status_code === 200) {
          toast.success("Deleted Successfully!");
          load_product_category();
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogout();
        } else {
          toast.error("delete unsuccessful");
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
      {isNewPopup ? (
        <Popup
          title="Category Form"
          openPopup={isNewPopup}
          setPopups={setIsNewPopup}
        >
          <CategoryForm handleSubmit={addCategory} />
        </Popup>
      ) : null}

      {isEditPopup ? (
        <Popup
          title="Product Category"
          openPopup={isEditPopup === false ? false : true}
          setPopups={() => {
            setIsEditPopup(false);
          }}
        >
          <CategoryForm
            handleSubmit={updateCategory}
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
      
            <PageHeaderTitle title="Product Categories" />
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
        </Toolbar>
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 proCategoryTbl">
          <TblContainer>
            <TblHead />
            <TableBody>
              {recordsAfterPagingAndSorting() &&
                recordsAfterPagingAndSorting().map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.categoryName}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.parentName}</TableCell>
                    <TableCell> {item.isSaleable===1?'True':'False'}</TableCell>
                    <TableCell> {item.isService===1?'True':'False'}</TableCell>
                    <TableCell> {item.colour}</TableCell>
  
                    <TableCell>
                    {userPermission["u_write"] === 1 ? ( 
                      <Controls.ActionButton
                        color="primary"
                        onClick={(e) => {
                          setIsEditPopup(item.id);
                        }}
                      ><Tooltip title="Edit">
                        <EditOutlinedIcon fontSize="small" /></Tooltip>
                      </Controls.ActionButton>
                       ) : null} 
                      {/* <Controls.ActionButton
                        color="secondary"
                        onClick={() => {
                          setConfirmDialog({
                            isOpen: true,
                            title: "Are you sure to delete this record?",
                            subTitle: "You can't undo this operation",
                            onConfirm: () => {
                              deleteproductcategory(item.id);
                            },
                          });
                        }}
                      ><Tooltip title="Delete">
                        <CloseIcon fontSize="small" /></Tooltip>
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
        </div>
      </div>
    </div>
  );
}
