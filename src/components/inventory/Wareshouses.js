import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../utils/config";
import UseTable from "../home/UseTable";
import Popup from "../home/Popup";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

import { Search } from "@material-ui/icons";
import { makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment, Tooltip} from "@material-ui/core";
import Controls from "../controls/Controls";
import AddIcon from "@material-ui/icons/Add";
import UserSessionContext from "../../contexts/UserSessionContext";
import { toast } from "react-toastify";
import Spinner from "../../utils/spinner";
import WareHouseForm from "./WareHouseForm";
import ConfirmDialog from "../home/ConfirmDialog";
import UserAuthenticationContext from "../../contexts/UserAuthenticationContext";
import PageHeaderTitle from "../../utils/PageHeaderTitle";
import DeleteIcon from '@material-ui/icons/Delete';
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
  { id: "name", label: "Name" },
  { id: "actions", label: "Actions", disableSorting: true },
];

export default function Warehouses(props) {
  const userSessionContext = React.useContext(UserSessionContext);
  const classes = useStyles(props);
  const [records, setRecords] = useState([]);
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
    return x["module_name"].toLowerCase() === "inventory";
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
            (x) => x.warehouse.toLowerCase().includes(query.toLowerCase())
            // items[x].toString().toLowerCase().includes(target.value)
            // x.firstName.toLowerCase().includes(target.value)
          );
      },
    });
  };

  useEffect(() => {
    load_table();
  }, []);

  const load_table = async() => {
   await axios
      .get(`${config.APP_CONFIG}/stock/warehouse/api`, {
        headers: { Authorization: userSessionContext.token },
      })
      .then((res) => {
        if (res.data.status_code === 200) {
          setRecords(res.data.msg);
        } else if (res.data.status_code === 400) {
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

  const addWarehouse = (_data) => {
    axios
      .post(`${config.APP_CONFIG}/stock/warehouse/api`, _data, {
        headers: { Authorization: userSessionContext.token },
      })
      .then((res) => {
        if (res.data.status_code === 200) {
          toast.success(res.data.msg || "Data insert successfully");
          load_table();
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogout();
        } else if (res.data.status_code === 400) {
          userSessionContext.handleLogout();
        } else {
          toast.error("Warning");
          setRecords([]);
        }
      })
      .catch((err) => {
        toast.error("Error Occured");

        setRecords([]);
      });
    setIsNewPopup(false);
  };

  const updateWarehouse = (data) => {
    axios
      .put(`${config.APP_CONFIG}/stock/warehouse/api/${data.id}`, data, {
        headers: { Authorization: userSessionContext.token },
      })
      .then((res) => {
        if (res.data.status_code === 200) {
          toast.success(res.data.msg || "Data update successfully");
          load_table();
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogout();
        } else if (res.data.status_code === 400) {
          userSessionContext.handleLogout();
        } else {
          toast.error("Warning");
          setRecords([]);
        }
      })
      .catch((err) => {
        toast.error("Something went Wrong");
        setRecords([]);
      });
    setIsEditPopup(false);
  };

  // const deleteWarehouse = (id) => {

  //   setConfirmDialog({ ...confirmDialog, isOpen: false });
  //   axios.delete(`${config.APP_CONFIG}/stock/warehouse/api/${id}`,{ headers: {Authorization: userSessionContext.token } })
  //     .then((res) => {
  //       if (res.data.status_code === 200) {
  //         toast.warn("Deleted Successfully!");
  //         load_table();
  //       } else if (res.data.status_code === 401) {
  //         userSessionContext.handleLogout();
  //       } else if (res.data.status_code === 400) {
  //         userSessionContext.handleLogout();
  //       }else {
  //         toast.error("Couldn't Delete");
  //       }
  //     })
  //     .catch((err) => {
  //       toast.error("Something Went Wrong..");
  //       console.log(err);
  //     });
  // };

  if (records === undefined) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="">
     
          {isNewPopup ? (
            <Popup
              title="Warehouse Form"
              openPopup={isNewPopup}
              setPopups={setIsNewPopup}
            >
              <WareHouseForm handleSubmit={addWarehouse} />
            </Popup>
          ) : null}

          {isEditPopup ? (
            <Popup
              title="Warehouse Form"
              openPopup={isEditPopup === false ? false : true}
              setPopups={() => {
                setIsEditPopup(false);
              }}
            >
              <WareHouseForm
                handleSubmit={updateWarehouse}
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
              <div>
                <PageHeaderTitle title="WareHouses" />
              </div>
              {userPermission["u_create"] === 1 ? (
                <div className="addButton">
                  <Controls.Button
                    text="Add New"
                    variant="outlined"
                    startIcon={<AddIcon />}
                    className={classes.newButton}
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
                  {recordsAfterPagingAndSorting().map((item, index) => {
                  
                    return (
                      <TableRow key={item.id}>
                        <TableCell>{item.warehouse}</TableCell>

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
                          {/* {userPermission["u_delete"]===1?  */}
                          {/* <Controls.ActionButton
                          color="secondary"
                          onClick={() => {
                            setConfirmDialog({
                              isOpen: true,
                              title: "Are you sure to delete this record?",
                              subTitle: "You can't undo this operation",
                              onConfirm: () => {
                                deleteWarehouse(item.id);
                              },
                            });
                          }}
                        >
                          <CloseIcon fontSize="small" />
                        </Controls.ActionButton> */}
                          {/* :null} */}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </TblContainer>
              {records.length>0?
           <TblPagination /> 
           :<div className="reportNotFound">
           <p >No Records to Display</p>
               </div>}
            </div>
          </div>
        </div>
    
    </div>
  );
}
