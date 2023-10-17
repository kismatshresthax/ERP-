// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Route, Link } from "react-router-dom";
// import config from "../../utils/config";
// import { toast } from "react-toastify";
// import UserSessionContext from "../../contexts/UserSessionContext";
// import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
// import DeleteIcon from "@material-ui/icons/Delete";
// import Controls from "../controls/Controls";
// import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
// import AddIcon from "@material-ui/icons/Add";
// import CreateRolePage from "./CreateRolePage";
// import Popup from "../home/Popup";

// const UsersRolesPage = () => {
//   const [roles, setRoles] = useState([]);
//   const userSessionContext = React.useContext(UserSessionContext);

//   useEffect(() => {
//     loadRoles();
//   }, []);

//   const loadRoles = async () => {
//     axios
//       .get(`${config.APP_CONFIG}/api/userRoles`)
//       .then((res) => {
//         if (res.data && res.data.status_code && res.data.status_code === 200) {
//           setRoles(res.data.msg || []);
//         } else {
//           toast.error("Cannot load roles.");
//           setRoles([]);
//         }
//       })
//       .catch((err) => {
//         toast.error("Error occured");
//         setRoles([]);
//       });
//   };
//   const deleteRole = async (id) => {
//     let confirm = window.confirm("Do you Want To Delete ?");
//     if (confirm) {
//       axios
//         .delete(`${config.APP_CONFIG}/api/userRoles/${id}`)
//         .then((res) => {
//           if (res.data.status_code === 200) {
//             toast.warn("Deleted successfully!");
//             loadRoles();
//           } else if (res.data.status_code === 400) {
//             userSessionContext.handleLogOut();
//           } else {
//             toast.error("can't delete");
//           }
//         })
//         .catch((err) => {
//           loadRoles();
//           toast.error("Error occured");
//         });
//     } else {
//     }
//   };

//   return (
//     <div
//       className="content-wrapper iframe-mode"
//       data-widget="iframe"
//       data-loading-screen={750}
//     >
//       {/* {isNewPopup ? (
//         <Popup title="Journal" openPopup={isNewPopup} setPopups={setIsNewPopup}>
//           <CreateRolePage />
//         </Popup>
//       ) : null} */}
//       <div className="container-fluid">
//         <div className="">
//           {/* <Link class="btn btn-primary mr-2 addbtn"to={`/settings/roles/create`}>create</Link> */}
//           <Route
//             render={({ history }) => (
//               <Controls.Button
//                 text="Create New"
//                 variant="outlined"
//                 startIcon={<AddIcon />}
//                 className="addbtn"
//                 onClick={() => {
//                   history.push(`/settings/roles/create`);
//                 }}
//               />
//             )}
//           />

//           {/* <Controls.Button
//             text="Create"
//             variant="outlined"
//             startIcon={<AddIcon />}
//             className={classes.newButton}
//             onClick={() => {
//               setIsNewPopup(!isNewPopup);
//             }}
//           /> */}

//           <div className="title">Roles Details</div>
//           <div className="pd-15"></div>
//           <table class="table border shadow">
//             <thead class="thead-dark">
//               <tr>
//                 <th scope="col">#</th>
//                 <th scope="col">Role</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {roles.map((role, index) => (
//                 <tr>
//                   <th scope="row">{index + 1}</th>
//                   {/* <td>{user.companuId}</td> */}
//                   <td>{role.name}</td>
//                   <td>
//                     {/* <Link class="btn btn-primary mr-2" to={`/settings/roles/${role.id}/view`}>
//                     View Permission
//                   </Link>
//                   <Link to={`/settings/roles/${role.id}/edit`} class="btn btn-outline-primary mr-2" >
//                     Edit
//                   </Link>
//                   <Link class="btn btn-danger" onClick={() => deleteRole(role.id)} to={`/settings/roles`}>
//                     Delete
//                   </Link> */}
//                     <Route
//                       render={({ history }) => (
//                         <Controls.ActionButton
//                           // type='button'
//                           color="primary"
//                           onClick={() => {
//                             history.push(`/settings/roles/${role.id}/view`);
//                           }}
//                         >
//                           <RemoveRedEyeIcon fontSize="small" />
//                         </Controls.ActionButton>
//                       )}
//                     />
//                     <Route
//                       render={({ history }) => (
//                         <Controls.ActionButton
//                           // type='button'
//                           color="primary"
//                           onClick={() => {
//                             history.push(`/settings/roles/${role.id}/edit`);
//                           }}
//                         >
//                           <EditOutlinedIcon fontSize="small" />
//                         </Controls.ActionButton>
//                       )}
//                     />

//                     <Controls.ActionButton
//                       color="secondary"
//                       onhover="open"
//                       onClick={() => {
//                         deleteRole(role.id);
//                       }}
//                     >
//                       <DeleteIcon fontSize="small" />
//                     </Controls.ActionButton>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default UsersRolesPage;

import React, { useState, useEffect } from "react";
import Controls from "../../controls/Controls";
import UseTable from "../../home/UseTable";
import config from "../../../utils/config";
import Popup from "../../home/Popup";
import axios from "axios";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { Search } from "@material-ui/icons";
import { makeStyles, TableRow, TableCell, TableBody,Toolbar, InputAdornment, Tooltip} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { toast } from "react-toastify";
import CloseIcon from "@material-ui/icons/Close";
import Spinner from "../../../utils/spinner";
import UserSessionContext from "../../../contexts/UserSessionContext";
// import CreateRolePage from "./CreateRolePage";
import UserRoleForm from "./UserRoleForm";
import PageHeaderTitle from "../../../utils/PageHeaderTitle";
import ConfirmDialog from "../../home/ConfirmDialog";
import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
import { useHistory } from "react-router-dom";
import UserAuthenticationContext from "../../../contexts/UserAuthenticationContext";

const headCells = [
  { id: "roles ", label: "Roles" },
  { id: "companyId ", label: "CompanyName" },
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

function UserRolesPage(props) {
  const userSessionContext = React.useContext(UserSessionContext);
  const classes = useStyles(props);
  // const [roles, setRoles] = useState([]);
  const [records, setRecords] = useState();
  const [isNewPopup, setIsNewPopup] = useState(false);
  const [isEditPopup, setIsEditPopup] = useState(false);
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
  const permissionContext=React.useContext(UserAuthenticationContext);
  let Permission = permissionContext.permissions;
  let curr_mod_permission =Permission.filter( x=>{return x["module_name"].toLowerCase() === "settings"})
  let userPermission= curr_mod_permission[0]
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
                (x.name)
                  .toLowerCase()
                  .includes(query.toLowerCase())
              // items[x].toString().toLowerCase().includes(target.value)
              // x.firstName.toLowerCase().includes(target.value)
            );
        },
      });
    };

  useEffect(() => {
    loadRoles();
  }, []);

  const loadRoles = async () => {
   await axios
      .get(`${config.APP_CONFIG}/api/userRoles`,{
        headers:{
          Authorization:userSessionContext.token
        }
      })
      .then((res) => {
        if (res.data && res.data.status_code && res.data.status_code === 200) {
          setRecords(res.data.msg || []);
        } 
        
        else if (res.data.status_code === 401) {
          userSessionContext.handleLogout();
        } 
        else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
        }else {
          toast.error("Cannot load roles.");
          setRecords([]);
        }
      })
      .catch((err) => {
        toast.error("Something went Wrong");
       // setRecords([]);
      });
  };

  const addRole = (data) => {

    axios.post(`${config.APP_CONFIG}/api/userRoles`, data,{headers:{Authorization:userSessionContext.token }})
      .then((res) => {
        if (res.data.status_code === 200) {
          loadRoles();
          
          toast.success("Successfully Added Role");
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogout();
        } else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
        }
         else {
          toast.error("Unable to Add Role");
        }
      })
      .catch((err) => {
        toast.error("Something went Wrong");
      });
      setIsNewPopup(false);
  };

  const deleteRole = async (id) => {
  
    setConfirmDialog({ ...confirmDialog, isOpen: false });
    axios
      .delete(`${config.APP_CONFIG}/api/userRoles/${id}`,{
        headers:{
          Authorization:userSessionContext.token
        }
      })
      .then((res) => {
        if (res.data.status_code === 200) {
          toast.success("Deleted successfully");
          loadRoles();
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogOut();
        }
        else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
        } else {
          toast.error("can't delete");
        }
      })
      .catch((err) => {
        loadRoles();
        toast.error("Something went Wrong");
      });
      setIsNewPopup(false)
  };
 
  const updateRole = (data) => {
   
    axios
      .put(`${config.APP_CONFIG}/api/userRoles/${data.id}`, data,{
        headers:{
          Authorization:userSessionContext.token
        }
      })
      .then((res) => {
        if (res.data.status_code === 200) {
          toast.success(res.data.msg || "Role Name updated successfully");
          loadRoles();
          setIsEditPopup(false)
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogOut();
        }else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
        } else {
          toast.error("Couldn't update Role ");
        }
      })
      .catch((err) => {
        toast.error("Something went Wrong");
        setRecords([]);
      });
     // setIsEditPopup(false)
  };

  if (records === undefined) {
    return <Spinner />;
  }

  return (
    <div>
      {isNewPopup ? (
        <Popup
          title="Add Roles"
          openPopup={isNewPopup}
          setPopups={setIsNewPopup}
        >
          <UserRoleForm handleSubmit={addRole} />
        </Popup>
      ) : null}

      {isEditPopup ? (
        <Popup
          title="Role Update"
          openPopup={isEditPopup === false ? false : true}
          setPopups={() => {
            setIsEditPopup(false);
          }}
        >
          <UserRoleForm
            handleSubmit={updateRole}
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
          {history.push(`/settings/roles/${isViewPopup}/view_permission`)}
          {/* data={records.filter((x) => x.id === isViewPopup)[0] || null} */}
          {/* <ViewUserDetailForm
              data={records.filter((x) => x.id === isViewPopup)[0] || null}
              // getUserRole={getUserRole}
              // userToRole={userToRole}
            /> */}
        </Popup>
      ) : null}

      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <div>
        <div>
          <div>
            {/* <h3>Roles Table</h3> */}
            <PageHeaderTitle title="Roles Table" />
          </div>
          {/* {userPermission["u_create"]===1? */}
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
          {/* :null} */}
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
              {recordsAfterPagingAndSorting().map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.companyName}</TableCell>
                  <TableCell>
                  <Controls.ActionButton
                    color="primary"
                    onClick={(e) => {
                      // getUserRole(item.id);
                      setIsViewPopup(item.id);
                    }}
                  ><Tooltip title="View">
                    <RemoveRedEyeIcon fontSize="small" /></Tooltip>
                  </Controls.ActionButton>
                  {userPermission["u_write"]===1?
                    <Controls.ActionButton
                      color="primary"
                      onClick={(e) => {
                        setIsEditPopup(item.id);
                      }}
                    ><Tooltip title="Edit">
                      
                      <EditOutlinedIcon fontSize="small" /></Tooltip>
                    </Controls.ActionButton>
                    :null}
                     {userPermission["u_delete"]===1?
                    <Controls.ActionButton
                      color="secondary"
                      //   onClick={() => {
                      //     deleteRole(item.id);
                      //   }}
                      // >
                      onClick={() => {
                        setConfirmDialog({
                          isOpen: true,
                          title: "Are you sure to delete this record?",
                          subTitle: "You can't undo this operation",
                          onConfirm: () => {
                            deleteRole(item.id);
                          },
                        });
                      }}
                    ><Tooltip title="Delete">
                      <CloseIcon fontSize="small" /></Tooltip>
                    </Controls.ActionButton>
                    :null}
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

export default UserRolesPage;
