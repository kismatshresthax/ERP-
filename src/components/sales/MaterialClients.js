

import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../utils/config";
import UseTable from "../home/UseTable";
import Popup from "../home/Popup";
import ClientTab from "./ClientTab";
import { Search } from "@material-ui/icons";

import {
  makeStyles,
  TableBody,
  TableRow,
  Toolbar,
  InputAdornment,
  TableCell,
} from "@material-ui/core";
import Controls from "../controls/Controls";

import ViewClientDetailForm from "./ViewClientDetailForm";
import AddIcon from "@material-ui/icons/Add";
import UserSessionContext from "../../contexts/UserSessionContext";

import { toast } from "react-toastify";
import ConfirmDialog from "../home/ConfirmDialog";
import Spinner from "../../utils/spinner";
import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";


const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  newButton: {
    position: "absolute",
    right: "0px",
    top: "15px",
    zIndex: 4,
  },
}));
const headCells = [
  { id: "fullName", label: "Full Name" },
  { id: "panNo", label: "Pan No" },
  // { id: "designation", label: " Designation" },
  { id: "address1", label: "Address " },
  { id: "contactNumber1", label: " Contact Number" },
  { id: "userCompanyName", label: "Company" },
  { id: "actions", label: "Actions", disableSorting: true },
];
export default function ClientPage(props) {
  const userSessionContext = React.useContext(UserSessionContext);
  const classes = useStyles(props);
  const [records, setRecords] = useState();
 // const [role, setRole] = useState([]);
  const [isNewPopup, setIsNewPopup] = useState(false);
  const [isEditPopup, setIsEditPopup] = useState(false);
  const [isViewPopup, setIsViewPopup] = useState(false);
  const [insertId, setinsertId] = useState();
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
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
              (
                x.firstName +
                x.middleName +
                x.lastName +
                x.username +
                x.designation +
                x.address1 +
                x.contactNumber1 +
                x.userCompanyName
              )
                .toLowerCase()
                .includes(query.toLowerCase())
            // items[x].toString().toLowerCase().includes(target.value)
            // x.firstName.toLowerCase().includes(target.value)
          );
      },
    });
  };

  useEffect(() => {
    // loadVendors();
    loadUsers();
  }, []);

  // const loadVendors = async () => {
  //   axios
  //     .get(`${config.APP_CONFIG}/Customer/UsersAPI`,{ headers: {Authorization: userSessionContext.token } })
  //     .then((res) => {
  //       if (res.data.status_code === 401) {
  //         userSessionContext.handleLogOut();
  //       } else if (
  //         res.data &&
  //         res.data.status_code &&
  //         res.data.status_code === 200
  //       ) {
  //         setRecords(res.data.msg || []);
  //       }
  //       else if(res.data.status_code === 400){
  //         toast.error(res.data.msg);
  //         setRecords([]);
  //       }
  //       else {
  //         toast.error("Cannot load Users");
  //         setRecords([]);
  //       }
  //     })
  //     .catch((err) => {
  //       toast.error("Something went Wrong");
  //       setRecords([]);
  //     });
  // };

  // useEffect(() => {

  // }, [records]);
  const loadUsers = async () => {
   await axios
      .get(`${config.APP_CONFIG}/usersApi/Users/customer`, {
        headers: {
          Authorization: userSessionContext.token,
        },
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
          toast.warn(res.data.msg);
          setRecords([]);
        } else {
          toast.error("Error Occurred");
          setRecords([]);
        }
      })
      .catch((err) => {
        toast.error("Something went Wrong");
        setRecords([]);
      });
  };

  const addUser = (data) => {

    axios.post(`${config.APP_CONFIG}/usersApi/Users`, data, {
           headers: {
             Authorization: userSessionContext.token,
           },
         })
         .then((res) => {
           if (res.data.status_code === 200) {
             loadUsers();
             setinsertId(res.data.msg);
             toast.success("Successfully Added User");
             setIsNewPopup(false);
            //  history.push("/sales/Clients"); 
           } else if (res.data.status_code === 401) {
             userSessionContext.handleLogout();
           } else if (res.data.status_code === 400) {
             toast.warn(res.data.msg);
           }
         })
         .catch((err) => {
           toast.error("Something went Wrong");
         });
         // {data.isCustomer===1?setIsNewPopup(false) : setIsNewPopup(true)}
         setIsNewPopup(false);
     };

     const AddCustomer = (_data) => {
      axios
        .post(`${config.APP_CONFIG}/usersApi/Users`, _data, {
          headers: { Authorization: userSessionContext.token },
        })
        .then((res) => {
          if (res.data.status_code === 200) {
            toast.success("Successfully Inserted Customer");
            loadUsers();
            setIsNewPopup(false);
            // history.push("/sales/Clients"); 
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

  const updateClient = (_data) => {
    axios
    .put(`${config.APP_CONFIG}/usersApi/Users/${_data.id}`, _data,{ headers: {Authorization: userSessionContext.token } })
    .then((res) => {
      if (res.data.status_code === 200) {
        toast.success(res.data.msg);
        loadUsers();
        setIsEditPopup(false);
        setIsViewPopup(false);
      } else if (res.data.status_code === 401) {
        userSessionContext.handleLogOut();
      } else if(res.data.status_code === 400){
        toast.warn(res.data.msg);
      }
    })
    .catch((err) => {
      toast.error("Something Went Wrong");
      setRecords([]);
    });

  };

  const updateCustomer = (_data) => {
    axios
    .put(`${config.APP_CONFIG}/usersApi/Users/${_data.id}`, _data,{ headers: {Authorization: userSessionContext.token } })
    .then((res) => {
      if (res.data.status_code === 200) {
        toast.success(res.data.msg);
        loadUsers();
        setIsEditPopup(false);
        setIsViewPopup(false);
      } else if (res.data.status_code === 401) {
        userSessionContext.handleLogOut();
      } else if(res.data.status_code === 400){
        toast.warn(res.data.msg);
      }
    })
    .catch((err) => {
      toast.error("Something Went Wrong");
      setRecords([]);
    });
  };
  // const deletevendors = (id) => {
  //   setConfirmDialog({ ...confirmDialog, isOpen: false });

  //   axios
  //     .delete(`${config.APP_CONFIG}/Setting/Vendor/api/${id}`,{ headers: {Authorization: userSessionContext.token } })
  //     .then((res) => {
  //       if (res.data.status_code === 200) {
  //         toast.success(res.data.msg);
  //         loadVendors();
  //       } else if (res.data.status_code === 401) {
  //         userSessionContext.handleLogout();
  //       }
  //       else if (res.data.status_code === 400) {
  //         toast.error(res.data.msg);
  //       }
  //       else {
  //         toast.error("Delete unsuccessful");
  //       }
  //     })
  //     .catch((err) => {
  //       toast.error("Something Went Wrong");
  //     });
  // };

  if (records === undefined) {
    return <Spinner />;
  }

  return (
    <div className="customersPage">
      {isNewPopup ? (
        <Popup
          title="Register Client"
          openPopup={isNewPopup}
          setPopups={setIsNewPopup}
        >

          <ClientTab 
          setIsNewPopup={setIsNewPopup} 
          addUser={addUser}
          AddCustomer={AddCustomer}
          />

        </Popup>
      ) : null}

      {isEditPopup ? (
        <Popup
          title="Client Form"
          openPopup={isEditPopup}
          setPopups={() => {
            setIsEditPopup(false);
          }}
        >
          <ClientTab 
          updateClient={updateClient}
          updateCustomer={updateCustomer}
          
          data={records.filter((x) => x.id === isEditPopup)[0] || null}
          />
     
        </Popup>
      ) : null}

      {isViewPopup ? (
        <Popup
          title="View Client Details"
          openPopup={isViewPopup === false ? false : true}
          setPopups={() => {
            setIsViewPopup(false);
          }}
        >
          <ViewClientDetailForm
            data={records.filter((x) => x.id === isViewPopup)[0] || null}
          />
        </Popup>
      ) : null}
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <div>
        <div className="row">
          <div className="col-lg-8 col-md-6 col-sm-12 col-xs-12 ">
            <h3>Customers List</h3>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 ">
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
          </div>
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
              {recordsAfterPagingAndSorting().map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    {item.firstName} {item.middleName || ""}{" "}
                    {item.lastName || ""}
                  </TableCell>
                  <TableCell>{item.panNo}</TableCell>

                  <TableCell>{item.address1}</TableCell>
                  <TableCell>{item.contactNumber1}</TableCell>
                  <TableCell>{item.userCompanyName}</TableCell>
                  <TableCell>
                    <Controls.ActionButton
                      color="primary"
                      onClick={(e) => {
                        setIsViewPopup(item.id);
                      }}
                    >
                      {/* {console.log(item.id)} */}
                      <RemoveRedEyeIcon fontSize="small" />
                    </Controls.ActionButton>

                    {/* <Controls.ActionButton
                      color="primary"
                      onClick={(e) => {
                        setIsEditPopup(item.id);
                      }}
                    >
                      <EditOutlinedIcon fontSize="small" />
                    </Controls.ActionButton> */}

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
