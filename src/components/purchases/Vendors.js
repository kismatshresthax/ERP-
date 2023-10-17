import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../utils/config";
import UseTable from "../home/UseTable";
import Popup from "../home/Popup";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

import { Search } from "@material-ui/icons";
import {
 
  makeStyles,
  TableBody,
  TableRow,
  Toolbar,
  TableCell,
  InputAdornment,
  Tooltip,
} from "@material-ui/core";
import Controls from "../controls/Controls";
import VendorsForm from "./VendorsForm";
import AddIcon from "@material-ui/icons/Add";
import UserSessionContext from "../../contexts/UserSessionContext";
// import ConfirmDialog from "../../components/ConfirmDialog";
import { toast } from "react-toastify";
import ConfirmDialog from "../home/ConfirmDialog";
import Spinner from "../../utils/spinner";
import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
import ViewVendorDetailForm from "./ViewVendorDetailForm";
import UserAuthenticationContext from "../../contexts/UserAuthenticationContext";
import Excelfile from "../../utils/Excelfile";
const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  newButton: {
    position: "absolute",
    right: "10px",
    zIndex:4
  },searchInput: {
    width: "20%",
  },
}));
const headCells = [
  { id: "fullName", label: "Full Name" },
  { id: "address1", label: "Address " },
  { id: "contactNumber1", label: " Contact Number" },
  { id: "actions", label: "Actions", disableSorting: true },
];
export default function Vendors(props) {
  const userSessionContext = React.useContext(UserSessionContext);
  const classes = useStyles(props);
  const [records, setRecords] = useState();
  const [isNewPopup, setIsNewPopup] = useState(false);
  const [isEditPopup, setIsEditPopup] = useState(false);
  const [isViewPopup, setIsViewPopup] = useState(false);
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
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });


  const handleSearch = (e) => {
    let query = e.target.value;

    setFilterFn({
      fn: (items) => {
        if (query === "") return items;
        else
          return items.filter(
            (x) =>
              (x.firstName + x.contactNumber1 + x.contactNumber2)
                .toLowerCase()
                .includes(query.toLowerCase())
            // items[x].toString().toLowerCase().includes(target.value)
            // x.firstName.toLowerCase().includes(target.value)
          );
      },
    });
  };



  useEffect(() => {
    loadVendors();
  }, []);

  const loadVendors = async () => {
   await axios
      .get(`${config.APP_CONFIG}/Setting/Vendor/api`, {
        headers: { Authorization: userSessionContext.token },
      })
      .then((res) => {
        if (res.data.status_code === 401) {
          userSessionContext.handleLogOut();
        } else if (
          res.data &&
          res.data.status_code &&
          res.data.status_code === 200
        ) {
          setRecords(res.data.msg || []);
        } else if (res.data.status_code === 400) {
          toast.error(res.data.msg);
          setRecords([]);
        } else {
          toast.error("Cannot load Users");
          setRecords([]);
        }
      })
      .catch((err) => {
        toast.error("Something went Wrong");
        setRecords([]);
      });
  };

  const AddVendor = (_data) => {
    axios
      .post(`${config.APP_CONFIG}/Setting/Vendor/api`, _data, {
        headers: { Authorization: userSessionContext.token },
      })
      .then((res) => {
        if (res.data.status_code === 200) {
          toast.success("Successfully Inserted Vendor");
          loadVendors();
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogout();
        } else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
        }
      })
      .catch((err) => {
        toast.error("Something went Wrong");
      });
      setIsNewPopup(false)
  };

  const updateVendor = (_data) => {
    axios.put(`${config.APP_CONFIG}/Setting/Vendor/api/${_data.id}`, _data, {
        headers: { Authorization: userSessionContext.token },
      })
      .then((res) => {
        if (res.data.status_code === 200) {
          toast.success(res.data.msg);
          loadVendors();
          setIsEditPopup(false);
          setIsViewPopup(false);
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogOut();
        } else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
        }
      })
      .catch((err) => {
        toast.error("Something Went Wrong");
        setRecords([]);
      });
      setIsEditPopup(false);
  };

  const deletevendors = (id) => {
    setConfirmDialog({ ...confirmDialog, isOpen: false });

    axios
      .delete(`${config.APP_CONFIG}/Setting/Vendor/api/${id}`, {
        headers: { Authorization: userSessionContext.token },
      })
      .then((res) => {
        if (res.data.status_code === 200) {
          toast.success(res.data.msg);
          loadVendors();
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogout();
        } else if (res.data.status_code === 400) {
          toast.error(res.data.msg);
        } else {
          toast.error("Delete unsuccessful");
        }
      })
      .catch((err) => {
        toast.error("Something Went Wrong");
      });
  };

  if (records === undefined) {
    return <Spinner />;
  }

  return (
    <div>
      {isNewPopup ? (
        <Popup
          title="Vendor Form"
          openPopup={isNewPopup}
          setPopups={setIsNewPopup}
        >
          <VendorsForm handleSubmit={AddVendor} />
        </Popup>
      ) : null}

      {isEditPopup ? (
        <Popup
          title="Vendor Form"
          openPopup={isEditPopup}
          setPopups={() => {
            setIsEditPopup(false);
          }}
        >
          <VendorsForm
            handleSubmit={updateVendor}
            data={records.filter((x) => x.id === isEditPopup)[0] || null}
          />
        </Popup>
      ) : null}
      {isViewPopup ? (
        <Popup
          title="View User Details"
          openPopup={isViewPopup === false ? false : true}
          setPopups={() => {
            setIsViewPopup(false);
          }}
        >
          <ViewVendorDetailForm
            data={records.filter((x) => x.id === isViewPopup)[0] || null}
          />
        </Popup>
      ) : null}
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <div>
        <div>
          <div>
            <h3>Vendors</h3>
          </div>
          {userPermission["u_create"] === 1 ? (
            <div className="addButton">
              <Controls.Button
                text="Add New"
                variant="outlined"
                startIcon={<AddIcon />}
                className={classes.newButton}
                style = {{top: "15px", right: "0", margin: "0"}}
                onClick={() => {
                  setIsNewPopup(!isNewPopup);
                }}
              />
            </div>
          ) : null}
        </div>
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
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
          <TblContainer>
            <TblHead />
            <TableBody>
              {recordsAfterPagingAndSorting().map((item) => {
            
               return <TableRow key={item.id}>
                  <TableCell> {item.firstName} </TableCell>
                  <TableCell>{item.address1}</TableCell>
                  <TableCell>{item.contactNumber1}</TableCell>
                  <TableCell>
                  {userPermission["u_write"] === 1 ? 
                    <Controls.ActionButton
                      color="primary"
                      onClick={(e) => {
                        setIsViewPopup(item.id);
                      }}
                    ><Tooltip title="View">
                      <RemoveRedEyeIcon fontSize="small" /></Tooltip>
                    </Controls.ActionButton>
                      :null}
                    <Controls.ActionButton
                      color="primary"
                      onClick={(e) => {
                        setIsEditPopup(item.id);
                      }}
                    ><Tooltip title="Edit">
                      <EditOutlinedIcon fontSize="small" /></Tooltip>
                    </Controls.ActionButton>


                    {/* <Controls.ActionButton
                      color="secondary"
                      onClick={() => {
                        setConfirmDialog({
                          isOpen: true,
                          title: "Are you sure to delete this record?",
                          subTitle: "You can't undo this operation",
                          onConfirm: () => {
                            deletevendors(item.id);
                          },
                        });
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </Controls.ActionButton> */}


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
      : <div className="reportNotFound">
      <p >No Records to Display</p>
          </div>}
        </div>
      </div>
    </div>
  );
}
