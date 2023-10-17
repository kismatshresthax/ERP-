// import axios from 'axios';
// import config from '../../utils/config';
// import React, { useState, useEffect } from "react";
// import { Switch } from '@material-ui/core';
// import { Route,Link} from "react-router-dom";
// import UserSessionContext from '../../contexts/UserSessionContext';
// import { toast } from "react-toastify";
// import Spinner from '../../utils/spinner';
// import Controls from "../controls/Controls";
// import AddIcon from "@material-ui/icons/Add";

// const ChartOfAccountsPage = props => {
//        const [coa, setCoa] = useState([]);
//        const userSessionContext = React.useContext(UserSessionContext)
//        useEffect(() => {
//            LoadCOA();
//        }, []);

//        const LoadCOA = async () => {
//           axios.get(`${config.APP_CONFIG}/Account/COA/api`)
//           .then(res => {
//             if(res.data.status_code === 400){
//               userSessionContext.handleLogOut();
//             }
//             else if(res.data.status_code === 200){
//               setCoa(res.data.msg);
//             }
//             else{
//               toast.error('error');
//               setCoa([])
//             }
//            })
//        };
//        if (coa === undefined) {
//         return <Spinner />
//       }

// const getCheckBox = (rowid, columnid,id) => {
//     let cell_value = (coa[rowid][columnid] && parseInt(coa[rowid][columnid])) || 0

//     return <Switch
//       color = "primary"
//       checked={cell_value === 1 ? "checked" : null}
//       defaultValue="on"
//       onChange={e => {
//         let changedValue = 0
//         if (cell_value === 0) {
//           changedValue = 1
//         }
//         let _tmp_users = [...coa]
//         // togglePermissions(rowid, columnid)
//         // alert(`${cell_value}:${changedValue}`)

//         _tmp_users[rowid][columnid] = changedValue
//         let request_payload = {
//           "name": _tmp_users[rowid]["coaname"],
//           "codeName":  _tmp_users[rowid]["codeName"],
//           "parentId":  _tmp_users[rowid]["parentId"],
//           "isactive":  _tmp_users[rowid]["isActive"],
//           "isvisible":  _tmp_users[rowid]["isVisible"],
//           "companyId":  _tmp_users[rowid]["companyId"]
//         }
//         axios.put(`${config.APP_CONFIG}/Account/COA/api/${id}`,request_payload)
//         .then(res => {
//           if(res.data.status_code === 200)
//           {
//             setCoa(_tmp_users)
//           }
//           else if (res.data.status_code === 401)
//           {
//             userSessionContext.handleLogOut();
//           }
//           else
//           {
//             setCoa([])
//             toast.error("can't read data")
//           }
//         })
//         .catch(err => {
//           setCoa([])
//           toast.error("Failed to load data!")
//         })
//       }}
//     />
//   }
//   if (coa === undefined) {
//     return <Spinner />
//   }

//     return (
//         <div className="content-wrapper iframe-mode" data-widget="iframe" data-loading-screen={750}>
//         <div className="container-fluid">
//         {/* <Link className="btn btn-primary" to="/accounting/createCOA">
//          create
//         </Link> */}
//         <Route render={({ history}) => (
//               <Controls.Button
//               text="Add New"
//               variant="outlined"
//               startIcon={<AddIcon />}
//               className="addbtn"
//               onClick={() => { history.push(`/accounting/createCOA`) }}
//             />
//             )} />
//         <div className="py-4">
//         <h1>Chart of Account</h1>
//         <table class="table border shadow">
//           <thead class="thead-dark">
//             <tr >
//               <th scope="col">Name</th>
//               <th scope="col">Code</th>
//               <th scope="col">Company Name</th>
//               <th scope="col">Active</th>
//               <th scope="col">Visible</th>
//               <th scope="col">Parent Name</th>
//             </tr>
//           </thead>
//           <tbody>
//             {coa.map((coa, index) => (
//               <tr key={index}>
//                 <td>{coa.coaname} </td>
//                 <td>{coa.codeName}</td>
//                 <td>{coa.companyname}</td>
//                 <td>
//                   {
//                     getCheckBox(index, 'isActive',coa.id)
//                   }
//                   </td>
//                 <td>
//                   {
//                     getCheckBox(index, 'isVisible',coa.id)
//                   }</td>
//                 <td>{coa.parentname}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   </div>
//     );
// }

// export default ChartOfAccountsPage;

import React, { useState, useEffect } from "react";
import Controls from "../controls/Controls";
import UseTable from "../home/UseTable";
import config from "../../utils/config";
import Popup from "../home/Popup";
import axios from "axios";
import { Search } from "@material-ui/icons";
//import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
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

import Spinner from "../../utils/spinner";
import UserSessionContext from "../../contexts/UserSessionContext";
import { Switch } from "@material-ui/core";
import { Route } from "react-router-dom";
import PageHeaderTitle from "../../utils/PageHeaderTitle";
import UserAuthenticationContext from "../../contexts/UserAuthenticationContext";
import ConfirmDialog from "../home/ConfirmDialog";
import COAForm from "./COAForm";

const headCells = [
  { id: "coaname ", label: "Name" },
  { id: "codeName ", label: "Code" },
  { id: "companyname ", label: "Company Name" },
  { id: "isActive ", label: "Active" },
  { id: "isVisible ", label: "Visible" },
  { id: "parentname ", label: "Parent Name" },
  // { id: "actions", label: "Actions" },
];

const useStyles = makeStyles((theme) => ({
  newButton: {    
    position: "absolute",
    zIndex: 4,
    margin: 0,
    right: "0px",
    top: "15px",
  },searchInput: {
    width: "20%",
  },
}));

const ChartOfAccountsPage = (props) => {
  const classes = useStyles(props);
  //const [coa, setCoa] = useState([]);
  const [records, setRecords] = useState();
  const [isNewPopup, setIsNewPopup] = useState(false);
  const userSessionContext = React.useContext(UserSessionContext);

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
    return x["module_name"].toLowerCase() === "accounting";
  });
  let userPermission = curr_mod_permission[0];

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =UseTable(records, headCells,filterFn);

  const handleSearch = (e) => {
    let query = e.target;

    setFilterFn({
      fn: (items) => {
        if (query.value === "") 
        return items;
        else

          return items.filter(x => x.coaname.toLowerCase().includes(query.value))
        
      },
    });
    
  };
  useEffect(() => {
    LoadCOA();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const LoadCOA = async () => {
   await axios
      .get(`${config.APP_CONFIG}/Account/COA/api`, {
        headers: { Authorization: userSessionContext.token },
      })
      .then((res) => {
        if (res.data.status_code === 401) {
          userSessionContext.handleLogOut();
        } else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
        } else if (res.data.status_code === 200) {
          setRecords(res.data.msg);
         // setSearchResults(res.data.msg);
        } else {
          toast.error("error");
          setRecords([]);
        }
      });
  };
  if (records === undefined) {
    return <Spinner />;
  }
 

//   const handleSearchChange = (e) => {
//     setNewSearch(e.target.value);
//   };
// console.log(search);
//  // const handleSearch = (e) => {
//   const filtered = !search ? records: records.filter((x) => {return Object.values(x).join(" ") .toLowerCase().includes(search.toLowerCase())})

      

//   const handleSearchChange = (e) => {
//     searchHandler(e.target.value);
//   };
// const searchHandler = (searchTerm) => {
//   setSearchTerm(searchTerm);
//   if (searchTerm !== "") {
//     const newList = records.filter((x) => {
//       return Object.values(x)
//         .join(" ")
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase());
//     });
//     setSearchResults(newList);
//   } else {
//     setSearchResults(records);
//   }
// };


  // const deleteCOA = (id) => {
  //   setConfirmDialog({ ...confirmDialog, isOpen: false });
  //   axios
  //     .delete(`${config.APP_CONFIG}/Account/COA/api/${id}`)
  //     .then((res) => {
  //       if (res.data.status_code === 200) {
  //         toast.success(res.data.msg);
  //         LoadCOA();
  //       } else if (res.data.status_code === 401) {
  //         userSessionContext.handleLogout();
  //       } else if (res.data.status_code === 400) {
  //         toast.warn(res.data.msg);
  //       } else {
  //         toast.error("Delete unsuccessful");
  //       }
  //     })
  //     .catch((err) => {
  //       toast.error("Error");
  //     });
  // };
  const AddCoa = (data) => {
    axios
      .post(`${config.APP_CONFIG}/Account/COA/api`, data, {
        headers: {
          Authorization: userSessionContext.token,
        },
      })
      .then((res) => {
        if (res.data.status_code === 200) {
          toast.success("Insert successfully");

          
          LoadCOA();
        } else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
        }
        else if (res.data.status_code === 101) {
          toast.warn(res.data.msg);
        }else if (res.data.status_code === 401) {
          userSessionContext.handleLogOut();
        } else {
          toast.error("Error Occurred");
        }
      })
      .catch((err) => {
        toast.error("Something Went Wrong");
      });

    setIsNewPopup(false);
  };
  const getCheckBox = (rowid, columnid, Id) => {


    const record=records.filter((x)=>  {return x.id === Id})
   //console.log(record);
    let cell_value =
      (record[0][columnid] && parseInt(record[0][columnid])) ;

    return (
      <Switch
        color="primary"
        checked={cell_value === 1 ? true : false}
        defaultValue="on"
        onChange={(e) => {
          let changedValue = 0;
          if (cell_value === 0) {
            changedValue = 1;
          }
         // let _tmp_users = [...searchResults];
          let _tmp_users = [...record];

          _tmp_users[0][columnid] = changedValue;

          let request_payload = {
            name: _tmp_users[0]["coaname"],
            codeName: _tmp_users[0]["codeName"],
           parentId: _tmp_users[0]["parentId"],
         
            isactive: _tmp_users[0]["isActive"],
            isvisible: _tmp_users[0]["isVisible"],
            companyId: _tmp_users[0]["companyId"],
          };
    
          axios
            .put(
              `${config.APP_CONFIG}/Account/COA/api/${Id}`,
              request_payload,
              { headers: { Authorization: userSessionContext.token } }
            )
            .then((res) => {
              if (res.data.status_code === 200) {
                setRecords(_tmp_users);
                //LoadCOA();
               // console.log(_tmp_users)
               // setSearchResults(_tmp_users)
                LoadCOA();
                toast.success("Update successfully", {});
                //setSearchTerm("")
               // LoadCOA();
              } else if (res.data.status_code === 401) {
                userSessionContext.handleLogOut();
              } else if (res.data.status_code === 400) {
                toast.warn(res.data.msg);
              } else if (res.data.status_code === 101) {
                toast.warn(res.data.msg);
              } else {
                toast.error("Error Occurred");
              }
            })
            .catch((err) => {
              toast.error("Something Went Wrong");
              // setRecords([])
            });
        }}
      />
    );
  };
  if (records === undefined) {
    return <Spinner />;
  }
  return (
    <div>
      <div
        className="content-wrapper iframe-mode"
        data-widget="iframe"
        data-loading-screen={750}
      >
        {isNewPopup ? (
          <Popup
            title="Add Ledger Name"
            openPopup={isNewPopup}
            setPopups={setIsNewPopup}
          >
            <COAForm
              handleSubmit={AddCoa}
              // handleRoleSubmit={assignRoles}
              // loadRoles={loadRoles}
              // role={role}
              // insertId={insertId}
              // data={records.filter((x) => x.id === isRolePopup)[0] || null}
            />
          </Popup>
        ) : null}

        {/* {isEditPopup ? (
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
                                loadRoles={loadRoles}
                                role={role}
                              />
                            </Popup>
                          ) : null} */}
        {/* {isViewPopup ? (
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
                          ) : null} */}
        <ConfirmDialog
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        />
        <div className="">
          <div className="">
            <div>
              {/* <h3>Users Table</h3> */}
              <PageHeaderTitle title="Chart of Account Table" />
              {userPermission["u_create"] === 1 ? (
              <div className="addButton">
                <Route
                  render={({ history }) => (
                    <Controls.Button
                      text="Add New"
                      variant="outlined"
                      startIcon={<AddIcon />}
                      className={classes.newButton}
                      onClick={() => {
                        setIsNewPopup(!isNewPopup);
                      }}
                    />
                  )}
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
                onChange={handleSearch   }
               // onChange={ handleSearchChange }
              />
            </Toolbar>       
          </div>
        </div>

        <div className="row">
          {/* <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{height: "100vh", overflowY: "auto"}}> */}
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <TblContainer>
              <TblHead />
              <TableBody>
                {recordsAfterPagingAndSorting().map((item, index) => (
                    <TableRow key={item.id}>
                     

                      <TableCell>{item.coaname}</TableCell>
                      <TableCell>{item.codeName}</TableCell>
                      <TableCell>{item.companyname}</TableCell>
                   
                      <TableCell>
                        {" "}
                        {getCheckBox(index, "isActive", item.id)}
                      </TableCell>
                      <TableCell>
                        {getCheckBox(index, "isVisible", item.id)}
                      </TableCell>
                      <TableCell>{item.parentname}</TableCell>
                      {/* <TableCell> */}
                      {/* <Controls.ActionButton
                                          color="primary"
                                          onClick={(e) => {
                                            getUserRole(item.id);
                                            setIsViewPopup(item.id);
                                          }}
                                        >
                                          {console.log(item.id)}
                                          {console.log(userToRole)}
                                          <RemoveRedEyeIcon fontSize="small" />
                                        </Controls.ActionButton>
                                        <Controls.ActionButton
                                          color="primary"
                                          onClick={(e) => {
                                            setIsEditPopup(item.id);
                                          }}
                                        >
                                          {console.log(item.id)}
                                          <EditOutlinedIcon fontSize="small" /> 
                                        </Controls.ActionButton>*/}
                      {/* <Controls.ActionButton
                        color="secondary"
                        onClick={() => {
                          setConfirmDialog({
                            isOpen: true,
                            title: "Are you sure to delete this record?",
                            subTitle: "You can't undo this operation",
                            onConfirm: () => {
                              deleteCOA(item.id);
                            },
                          });
                        }}
                      >
                        <CloseIcon fontSize="small" />
                      </Controls.ActionButton> */}
                      {/* </TableCell> */}
                    </TableRow>
                  ))}
              </TableBody>
            </TblContainer>
            <TblPagination />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartOfAccountsPage;

































































