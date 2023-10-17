import React, { useState, useEffect } from "react";
import Controls from "../../controls/Controls";
import UseTable from "../../home/UseTable";
import config from "../../../utils/config";
import Popup from "../../home/Popup";
import axios from "axios";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { Search } from "@material-ui/icons";
import {
  makeStyles,
  TableRow,
  TableCell,
  TableBody,
  Toolbar,
  InputAdornment,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { toast } from "react-toastify";
import CloseIcon from "@material-ui/icons/Close";
import Spinner from "../../../utils/spinner";
import UserSessionContext from "../../../contexts/UserSessionContext";
import ViewUserDetailForm from "../ViewUserDetailForm";
import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
import UserStepper from "./UserStepper";
import PageHeaderTitle from "../../../utils/PageHeaderTitle";

import EditUserForm from "./EditUserForm";
import UserAuthenticationContext from "../../../contexts/UserAuthenticationContext";
import ConfirmDialog from "../../home/ConfirmDialog";
import DeleteIcon from '@material-ui/icons/Delete';
import Excelfile from "../../../utils/Excelfile";
const headCells = [
  { id: "firstname ", label: "Full Name" },
  { id: "companyName ", label: "Company Name" },
  { id: "designation ", label: "Designation" },
  { id: "phoneNumber ", label: "Phone Number" },
  // { id: "role ", label: "Role" },
  { id: "actions", label: "Actions", disableSorting: true },
];
const useStyles = makeStyles((theme) => ({
  newButton: {
    position: "absolute",
    margin: 0,
    zIndex: 4,
    right: 0,
    top: "15px",
  },

  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "20%",
  },
}));

function UserPage(props) {
  const userSessionContext = React.useContext(UserSessionContext);
 // const inputEl = useRef("");
  const classes = useStyles(props);
  const [role, setRole] = useState([]);
  const [userToRole, setUserToRole] = useState();
  const [records, setRecords] = useState([]);
  const [isNewPopup, setIsNewPopup] = useState(false);
  const [isEditPopup, setIsEditPopup] = useState(false);
  const [isViewPopup, setIsViewPopup] = useState(false);

 // const [issearch, setSearch] = useState(false);

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
    Icon:DeleteIcon,
  });

  const [insertId, setinsertId] = useState();
  // const [filterFn, setFilterFn] = useState({ fn: (items) => { return items;},});

  const permissionContext = React.useContext(UserAuthenticationContext);
  let Permission = permissionContext.permissions;
  let curr_mod_permission = Permission.filter((x) => {
    return x["module_name"].toLowerCase() === "settings";
  });
  let userPermission = curr_mod_permission[0];
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    UseTable(records, headCells, filterFn);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
   await axios
      .get(`${config.APP_CONFIG}/usersApi/Users/user`, {
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

  // const SearchHandler = (e) => {
  //   //console.log(searchTerm);
  //   const q =e.target.value
  //   //setSearchTerm(searchTerm);
  //   if (q !== "") {
  //     const query = records.filter((x) => {
  //       return Object.values(x)
  //         .join(" ")
  //         .toLowerCase()
  //         .includes(q.toLowerCase());
  //     });
  //     setSearchResults(query);
  //   } else {
  //     setSearchResults(records);
  //   }
  // };

  const SearchTerm = (event) => {
    //setSearch(true);
    const query = event.target.value;

    setFilterFn({
      fn: (items) => {
        if (query === "") {
          return items;
        } else
        //  {
        //   let items = records.filter((x) => {
        //     return Object.values(x)
        //       .join(" ")
        //       .toLowerCase()
        //       .includes(query.toLowerCase());
        //   });
        //   // (x.firstName ).toLowerCase().includes(query.toLowerCase())|| (x.lastName ).toLowerCase().includes(query.toLowerCase()));
        //   return items;
   
        // }
        return items.filter(
          (x) =>
            (x.firstName + x.lastName + x.companyName)
              .toLowerCase()
              .includes(query.toLowerCase())
         
        );
      },
    });
  };

  const addUser = (data) => {
    axios
      .post(`${config.APP_CONFIG}/usersApi/Users`, data, {
        headers: {
          Authorization: userSessionContext.token,
        },
      })
      .then((res) => {
        if (res.data.status_code === 200) {
          loadUsers();
          setinsertId(res.data.msg);

          toast.success("Successfully Added User");
          //props.step_handler("next");
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogout();
        } else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
        }
      })
      .catch((err) => {
        toast.error("Something went Wrong");
      });
    {
      data.isCustomer === 1 ? setIsNewPopup(false) : setIsNewPopup(true);
    }
  };
  const getUserRole = async(id) => {
   await axios
      .get(`${config.APP_CONFIG}/Settings/UserToRoleMap/api/${id}`, {
        headers: {
          Authorization: userSessionContext.token,
        },
      })
      .then((res) => {
        if (res.data.status_code === 200) {
          setUserToRole(res.data.msg);
          // toast.info("Successfully load Role to User");
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogout();
          setUserToRole([]);
        } else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
          setUserToRole([]);
        }
      })
      .catch((err) => {
        toast.error("Something went Wrong");
        setUserToRole([]);
      });
  };

  const deleteUser = async (id) => {
    setConfirmDialog({ ...confirmDialog, isOpen: false });
    axios
      .delete(`${config.APP_CONFIG}/usersApi/Users/${id}`, {
        headers: {
          Authorization: userSessionContext.token,
        },
      })
      .then((res) => {
        if (res.data.status_code === 200) {
          toast.success(res.data.msg);
          loadUsers();
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogOut();
        } else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
        }
      })
      .catch((err) => {
        // loadUsers();
        toast.error("Error occured");
      });
  };
  const updateUser = (data) => {
    axios
      .put(`${config.APP_CONFIG}/usersApi/Users/${data.id}`, data, {
        headers: {
          Authorization: userSessionContext.token,
        },
      })
      .then((res) => {
        if (res.data.status_code === 200) {
          toast.success(res.data.msg);
          loadUsers();
          // setIsViewPopup(false);
          // setIsEditPopup(false);
          setIsEditPopup(false);
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
    // {data.isCustomer===1?setIsEditPopup(false): setIsEditPopup(true)}
  };

  if (records === undefined) {
    return <Spinner />;
  }

  // const getSearchTerm = () => {
  //   searchKeyword(inputEl.current.value);
  // };

  return (
    <div>
      
        {isNewPopup ? (
          <Popup
          size="lg"
            title="User Form"
            openPopup={isNewPopup}
            setPopups={setIsNewPopup}
          >
            <UserStepper
              handleSubmit={addUser}
              role={role}
              insertId={insertId}
           
            />
          </Popup>
        ) : null}

        {isEditPopup ? (
          <Popup
            title="User Update"
            openPopup={isEditPopup === false ? false : true}
            setPopups={() => {
              setIsEditPopup(false);
            }}
          >
            <EditUserForm
              handleSubmit={updateUser}
              data={records.filter((x) => x.id === isEditPopup)[0] || null}
             // loadRoles={loadRoles}
              role={role}
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
            <ViewUserDetailForm
              data={records.filter((x) => x.id === isViewPopup)[0] || null}
              // getUserRole={getUserRole}
              userToRole={userToRole}
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
              {/* <h3>Users Table</h3> */}
              <PageHeaderTitle title="Users Table" />
            </div>
            {userPermission["u_create"] === 1 ? (
              <div className="addButton">
                <Controls.Button
                  text="Create"
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
            label="Search Users"
            className={classes.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={(e) => {
              e.preventDefault();
              SearchTerm(e);
            }}
          />
        </Toolbar>
       

        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
            <TblContainer>
              <TblHead />
              <TableBody>
                {recordsAfterPagingAndSorting() &&
                  recordsAfterPagingAndSorting().map((item, id) => {
            
                    return<TableRow key={item.id}>
                      <TableCell>
                        {item.firstName} {item.middleName} {item.lastName}
                      </TableCell>
                      {/* <TableCell>{item.companyId}</TableCell> */}
                      <TableCell>{item.companyName}</TableCell>
                      <TableCell>{item.designation}</TableCell>
                      <TableCell>{item.contactNumber1}</TableCell>
                      {/* <TableCell>{item.gender}</TableCell> */}
                      <TableCell>
                        <Controls.ActionButton
                          color="primary"
                          onClick={(e) => {
                            getUserRole(item.id);
                            setIsViewPopup(item.id);
                          }}
                        >
                          <RemoveRedEyeIcon fontSize="small" />
                        </Controls.ActionButton>
                        {userPermission["u_write"] === 1 &&
                        item.username !== "admin" ? (
                          <Controls.ActionButton
                            color="primary"
                            onClick={(e) => {
                              setIsEditPopup(item.id);
                            }}
                          >
                            <EditOutlinedIcon fontSize="small" />
                          </Controls.ActionButton>
                        ) : null}
                        {userPermission["u_delete"] === 1 &&
                        item.username !== "admin" ? (
                          <Controls.ActionButton
                            color="secondary"
                            onClick={() => {
                              setConfirmDialog({
                                isOpen: true,
                                title: "Are you sure to delete this record?",
                                subTitle: "You can't undo this operation",
                                Icon:DeleteIcon,
                                onConfirm: () => {
                                  deleteUser(item.id);
                                },
                              });
                            }}
                          >
                            <CloseIcon fontSize="small" />
                          </Controls.ActionButton>
                        ) : null}
                      </TableCell>
                    </TableRow>
})}
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
export default UserPage;
