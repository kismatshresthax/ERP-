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
import AddIcon from "@material-ui/icons/Add";
import { toast } from "react-toastify";

import Spinner from "../../../utils/spinner";
import UserSessionContext from "../../../contexts/UserSessionContext";

import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
import PageHeaderTitle from "../../../utils/PageHeaderTitle";
import UserAuthenticationContext from "../../../contexts/UserAuthenticationContext";
import ConfirmDialog from "../../home/ConfirmDialog";
import CompanyForm from "./CompanyForm";
import CompanyDetails from "./CompanyDetails";
//import DeleteIcon from '@material-ui/icons/Delete';
const headCells = [
  { id: "name ", label: "Company Name" },
  { id: "address ", label: "Address" },
  { id: "phone_no ", label: "Phone No." },
  { id: "panNo ", label: "Pan No." },
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

function CompaniesPage(props) {
  const userSessionContext = React.useContext(UserSessionContext);
  const classes = useStyles(props);
  const [records, setRecords] = useState();
  const [isNewPopup, setIsNewPopup] = useState(false);
  const [isEditPopup, setIsEditPopup] = useState(false);
  const [isViewPopup, setIsViewPopup] = useState(false);
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
    return x["module_name"].toLowerCase() === "settings";
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
                (x.name + x.address + x.phone_no + x.panNo)
                  .toLowerCase()
                  .includes(query.toLowerCase())
              
            );
        },
      });
    };


  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    await axios
      .get(`${config.APP_CONFIG}/Companies/Company`
      , {
        headers: {
          Authorization: userSessionContext.token,
        },
      }
      )
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
        } 
        
        else {
          toast.error("Error Occurred");
          setRecords([]);
        }
      })
      .catch((err) => {
        toast.error("Something went Wrong");
        setRecords([]);
      });
  };

  const addCompany = (data) => {
    axios
      .post(`${config.APP_CONFIG}/Companies/Company`, data
      , {
        headers: {
          Authorization: userSessionContext.token,
        },
      }
      
      )
      .then((res) => {
        if (res.data.status_code === 200) {
          loadCompanies();
          toast.success(res.data.msg);
          setIsNewPopup(false)
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogout();
        } else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
        }
      })
      .catch((err) => {
        toast.error("Something went Wrong");
      });
  };
 
  // const  deleteCompany= async (id) => {
  //   setConfirmDialog({ ...confirmDialog, isOpen: false });
  //   await axios.delete(`${config.APP_CONFIG}/Companies/Company/${id}`, {headers: { Authorization: userSessionContext.token,},})
  //     .then((res) => {
  //       if (res.data.status_code === 200) {
  //         toast.success(res.data.msg);
  //         loadCompanies();
  //       } else if (res.data.status_code === 401) {
  //         userSessionContext.handleLogOut();
  //       } else if (res.data.status_code === 400) {
  //         toast.warn(res.data.msg);
  //       }
  //     })
  //     .catch((err) => {
  //       loadCompanies();
  //       toast.error("Error occured");
  //     });
  // };

  const updateCompany = (data) => {
 
    axios
      .put(`${config.APP_CONFIG}/Companies/Company/${data.id}`, data
      , {
        headers: {
          Authorization: userSessionContext.token,
        },
      }
      )
      .then((res) => {
        if (res.data.status_code === 200) {
          toast.success(res.data.msg);
          loadCompanies();
          
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

  if (records === undefined) {
    return <Spinner />;
  }

  return (
    <div>
      
        {isNewPopup ? (
          <Popup
            title="Company Form"
            openPopup={isNewPopup}
            setPopups={setIsNewPopup}
          >
            <CompanyForm
              handleSubmit={addCompany}
            />
          </Popup>
        ) : null}

        {isEditPopup ? (
          <Popup
            title="Company Update"
            openPopup={isEditPopup === false ? false : true}
            setPopups={() => {
              setIsEditPopup(false);
            }}
          >

            <CompanyForm
              handleSubmit={updateCompany}
              data={records.filter((x) => x.id === isEditPopup)[0] || null}
            />
          </Popup>
        ) : null}
        {isViewPopup ? (
          <Popup
            title="View Company Details"
            openPopup={isViewPopup === false ? false : true}
            setPopups={() => {
              setIsViewPopup(false);
            }}
          >
            <CompanyDetails
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
         
              <PageHeaderTitle title="Company Table" />
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
                  return<TableRow key={item.id}>
               
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.address}</TableCell>
                    <TableCell>{item.phone_no}</TableCell>
                    <TableCell>{item.panNo}</TableCell>
                    <TableCell>
                      <Controls.ActionButton
                        color="primary"
                        onClick={(e) => {
                          setIsViewPopup(item.id);
                        }}><Tooltip title="view">
                        <RemoveRedEyeIcon fontSize="small" /></Tooltip>
                      </Controls.ActionButton>
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
                      {/* {userPermission["u_delete"]===1? 
                      <Controls.ActionButton
                        color="secondary"
                        onClick={() => {
                          setConfirmDialog({
                            isOpen: true,
                            title: "Are you sure to delete this record?",
                            subTitle: "You can't undo this operation",
                            onConfirm: () => {
                              deleteCompany(item.id);
                            },
                          });
                        }}
                      ><Tooltip title="Delete">
                        <CloseIcon fontSize="small" /></Tooltip>
                      </Controls.ActionButton>
                       :null}  */}
                    </TableCell>
                  </TableRow>
})}
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
export default CompaniesPage;
