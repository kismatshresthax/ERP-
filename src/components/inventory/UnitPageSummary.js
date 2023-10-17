/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../utils/config";
import UseTable from "../home/UseTable";
import Popup from "../home/Popup";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
//import CloseIcon from "@material-ui/icons/Close";
import { Search } from "@material-ui/icons";
import { makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment, Tooltip} from "@material-ui/core";
import Controls from "../controls/Controls";
import UserSessionContext from "../../contexts/UserSessionContext";
import { toast } from "react-toastify";
import Spinner from "../../utils/spinner";
import PageHeaderTitle from "../../utils/PageHeaderTitle";
import UnitForm from "./UnitForm";
import AddIcon from "@material-ui/icons/Add";
import UserAuthenticationContext from "../../contexts/UserAuthenticationContext";
import ConfirmDialog from "../home/ConfirmDialog";
const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  newButton: {
    position: "absolute",
    zIndex: 4,
    margin: 0,
    right: 0,
  },
}));

const headCells = [
  { id: "unitName", label: "Unit Name" },
  { id: "mesurementtype", label: " Measurement" },
  { id: "actions", label: "Actions", disableSorting: true },
];

export default function UnitPageSummary(props) {
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
              (x) =>
                (x.name + x.mesurementType)
                  .toLowerCase()
                  .includes(query.toLowerCase())
              // items[x].toString().toLowerCase().includes(target.value)
              // x.firstName.toLowerCase().includes(target.value)
            );
        },
      });
    };



  useEffect(() => {
    load_table();
  }, []);

  const load_table =async () => {
    const fig = {
      headers: {
        Authorization: userSessionContext.token,
      },
    };

  await  axios
      .get(`${config.APP_CONFIG}/Products/ProductInhouseUnit/api`, fig)
      .then((res) => {
    
        if (res.data.status_code === 200) {
         
          setRecords(res.data.msg);
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogout();
        } else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
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

  const addUnit = (_data) => {
    axios
      .post(`${config.APP_CONFIG}/Products/ProductInhouseUnit/api`, _data, {
        headers: {
          Authorization: userSessionContext.token,
        },
      })
      .then((res) => {
        if (res.data.status_code === 200) {
          load_table();
          setIsNewPopup(false);
          toast.success("UnitName Added Successfully");
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogout();
        } else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
        } else {
          toast.error("Unable to Add UnitName");
        }
      })
      .catch((err) => {
        toast.error("Something went Wrong");
      });
  };
  const updateUnit = (data) => {
    axios
      .put(
        `${config.APP_CONFIG}/Products/ProductInhouseUnit/api/${data.id}`,
        data,
        {
          headers: {
            Authorization: userSessionContext.token,
          },
        }
      )
      .then((res) => {
        if (res.data.status_code === 200) {
          load_table();
          setIsEditPopup(false);
          toast.success("UnitName Update Successfully");
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogout();
        } else if (res.data.status_code === 400) {
          toast.error(res.data.msg.toString());
        } else {
          toast.error("Unable to Update UnitName");
        }
      })
      .catch((err) => {
        toast.error("Something went Wrong");
      });
  };
  // const deleteUnit = (id) => {
  //   setConfirmDialog({ ...confirmDialog, isOpen: false });
  //   axios
  //     .delete(`${config.APP_CONFIG}/Products/ProductInhouseUnit/api/${id}`, {
  //       headers: {
  //         Authorization: userSessionContext.token,
  //       },
  //     })
  //     .then((res) => {
  //       if (res.data && res.data.status_code && res.data.status_code === 200) {
  //         toast.success("UnitName Delete successfully");
  //         load_table();
  //       } else if (res.data.status_code === 400) {
  //         toast.error(res.data.msg.toString());
  //       } else if (res.data.status_code === 401) {
  //         userSessionContext.handleLogout();
  //       }
  //     })
  //     .catch((err) => {
  //       toast.error("failed to Delete Unit Measurement");
  //     });
  // };
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
              title="Unit MeasureMent Form"
              openPopup={isNewPopup}
              setPopups={setIsNewPopup}
            >
              <UnitForm handleSubmit={addUnit} />
            </Popup>
          ) : null}

          {isEditPopup ? (
            <Popup
              title="Edit Unit Form"
              openPopup={isEditPopup === false ? false : true}
              setPopups={() => {
                setIsEditPopup(false);
              }}
            >
              <UnitForm
                handleSubmit={updateUnit}
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
                <PageHeaderTitle title="Unit Summary Table" />
              </div>
              {userPermission["u_create"]===1?
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
              :null}
            </div>
          </div>
          {/* <div className="pd-15"></div> */}


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
                  {recordsAfterPagingAndSorting().map((item, index) => (
                    <TableRow key={item.id}>
                      {/* <TableCell scope="row">{item.id}</TableCell> */}
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.mesurementType}</TableCell>

                      <TableCell>{userPermission["u_write"]===1?
                        <Controls.ActionButton
                          color="primary"
                          onClick={(e) => {
                            setIsEditPopup(item.id);
                          }}
                        ><Tooltip title="Edit">
                          <EditOutlinedIcon fontSize="small" /></Tooltip>
                        </Controls.ActionButton>
                        :null}
                        {/* {userPermission["u_delete"]===1? */}
                        {/* <Controls.ActionButton
                          color="secondary"
                          onClick={() => {
                            setConfirmDialog({
                              isOpen: true,
                              title: "Are you sure to delete this record?",
                              subTitle: "You can't undo this operation",
                              onConfirm: () => {
                                deleteUnit(item.id);
                              },
                            });
                          }}
                        >
                          <CloseIcon fontSize="small" />
                        </Controls.ActionButton> */}
                         {/* :null} */}
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
      </div>
    </div>
  );
}
