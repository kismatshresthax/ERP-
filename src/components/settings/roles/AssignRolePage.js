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
  Tooltip,
} from "@material-ui/core";
import { toast } from "react-toastify";
import Spinner from "../../../utils/spinner";
import UserSessionContext from "../../../contexts/UserSessionContext";
import AssignRoleForm from "./AssignRoleForm";
import PageHeaderTitle from "../../../utils/PageHeaderTitle";
import ConfirmDialog from "../../home/ConfirmDialog";
import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
import { useHistory } from "react-router-dom";
import UserAuthenticationContext from "../../../contexts/UserAuthenticationContext";
import ViewUserRole from "./ViewUserRole";

const headCells = [
  { id: "fullName", label: "Full Name" },
  { id: "companyName", label: "Company Name" },
  { id: "designation", label: "Designation" },
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
}));

function AssignRolePage(props) {
  const userSessionContext = React.useContext(UserSessionContext);
  const classes = useStyles(props);
  const [records, setRecords] = useState();
  const [isEditPopup, setIsEditPopup] = useState(false);
  const [userToRole, setUserToRole] = useState();
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  
  });
  const [isViewPopup, setIsViewPopup] = useState(false);
  let history = useHistory();

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const permissionContext = React.useContext(UserAuthenticationContext);
  let Permission = permissionContext.permissions;
  let curr_mod_permission = Permission.filter((x) => {
    return x["module_name"].toLowerCase() === "settings";
  });
  let userPermission = curr_mod_permission[0];
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

  const handleSearch = (e) => {
    let query = e.target.value;

    setFilterFn({
      fn: (items) => {
        if (query === "") return items;
        else
          return items.filter(
            (x) => x.name.toLowerCase().includes(query.toLowerCase())
            // items[x].toString().toLowerCase().includes(target.value)
            // x.firstName.toLowerCase().includes(target.value)
          );
      },
    });
  };


  if (records === undefined) {
    return <Spinner />;
  }

  return (
    <div>
      {isEditPopup ? (
        <Popup
          title="Assign Role"
          openPopup={isEditPopup === false ? false : true}
          setPopups={() => {
            setIsEditPopup(false);
          }}
        >
          <AssignRoleForm
            // handleSubmit={updateRole}
            data={records.filter((x) => x.id === isEditPopup)[0] || null}
            // insertId = {}
            userToRole={userToRole}
          />
        </Popup>
      ) : null}

      {isViewPopup ? (
        <Popup
        title="View User Role"
        openPopup={isViewPopup === false ? false : true}
        setPopups={() => {
          setIsViewPopup(false);
        }}
      >
        <ViewUserRole
          data={records.filter((x) => x.id === isViewPopup)[0] || null}
          userToRole={userToRole}
        />
      </Popup>
      ) : null}

      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <div>
        <PageHeaderTitle title="Assign Role" />
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
              {recordsAfterPagingAndSorting().map((item) => (
                item.isLoginAllowed ? 
                <TableRow key={item.id}>
                  <TableCell>
                    {item.firstName} {item.middleName} {item.lastName}
                  </TableCell>
                  <TableCell>{item.companyName}</TableCell>
                  <TableCell>{item.designation}</TableCell>
                  <TableCell>
                    <Controls.ActionButton
                      color="primary"
                      onClick={(e) => {
                        getUserRole(item.id);
                        setIsViewPopup(item.id);
                      }}
                    >
                      <Tooltip title="View" placement="top" arrow>
                        <RemoveRedEyeIcon fontSize="small" />
                      </Tooltip>
                    </Controls.ActionButton>
                    {/* {userPermission["u_write"] === 1 ? ( */}
                      <Controls.ActionButton
                        color="primary"
                        onClick={(e) => {
                          getUserRole(item.id);
                          setIsEditPopup(item.id);
                        }}
                      >
                        <Tooltip title="Assign Role" placement="top" arrow>
                          <EditOutlinedIcon fontSize="small" />
                        </Tooltip>
                      </Controls.ActionButton>
                    {/* ) : null} */}
                  </TableCell>
                </TableRow>
                : ""
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

export default AssignRolePage;
