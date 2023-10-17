import React, { useState, useEffect } from "react";
import axios from "axios";
import DeleteIcon from '@material-ui/icons/Delete';
import config from "../../utils/config";
import UseTable from "../home/UseTable";
import Popup from "../home/Popup";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import { Search } from "@material-ui/icons";
import {
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
  Tooltip,
} from "@material-ui/core";
import Controls from "../controls/Controls";
import ConfirmDialog from "../home/ConfirmDialog";
import BankForm from "./BankForm";
import AddIcon from "@material-ui/icons/Add";
import UserSessionContext from "../../contexts/UserSessionContext";
import { toast } from "react-toastify";
import Spinner from "../../utils/spinner";
import PageHeaderTitle from "../../utils/PageHeaderTitle";
import CompanyContext from "../../contexts/CompanyContext";
import UserAuthenticationContext from "../../contexts/UserAuthenticationContext";
import Excelfile from "../../utils/Excelfile";


const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  newButton: {
    position: "absolute",
    margin: 0,
    zIndex: 4,
    right: 0,
    top: "15px",
  },searchInput: {
    width: "20%",
 color: "#3e52c1"
  },
}));
const headCells = [
  { id: "accountnumber", label: "Account Number" },
  { id: "bankname", label: "BankName" },
  { id: "companyname", label: "CompanyName", disableSorting: true },
  { id: "remarks", label: "Remarks", disableSorting: true },
  { id: "actions", label: "Actions", disableSorting: true },
];

export default function BankPage(props) {
  const userSessionContext = React.useContext(UserSessionContext);
  const companyContext = React.useContext(CompanyContext);
  const companyId = companyContext.company.id;
  const permissionContext = React.useContext(UserAuthenticationContext);
  const classes = useStyles(props);
  const [records, setRecords] = useState();
  const [isNewPopup, setIsNewPopup] = useState(false);
  const [isEditPopup, setIsEditPopup] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
    Icon:DeleteIcon,
  });
  let userPermission = permissionContext.permissions;
  
  // let Permission = permissionContext.curr_mod_permission;
  // console.log(Permission)
  let curr_mod_permission = userPermission.filter((x) => {
    return x["module_name"].toLowerCase() === "accounting";
  });
  let Permission = curr_mod_permission[0];

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =UseTable(records, headCells, filterFn);


  const handleSearch = (e) => {
    let query = e.target.value;

    setFilterFn({
      fn: (items) => {
        if (query === "") return items;
        else
          return items.filter(
            (x) =>
              (x.accountNumber + x.bankName + x.companyName)
                .toLowerCase()
                .includes(query.toLowerCase())
           
          );
      },
    });
  };

  useEffect(() => {
    load_bank_accounts();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const load_bank_accounts = async () => {
    await axios
      .get(`${config.APP_CONFIG}/BankAccountCRUD/api/byCompany/${companyId}`, {

        headers: {
          Authorization: userSessionContext.token,
        },
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

  const AddBankaccount = (_data) => {
    axios
      .post(`${config.APP_CONFIG}/BankAccountCRUD/api/`, _data, {
        headers: {
          Authorization: userSessionContext.token,
        },
      })
      .then((res) => {
        if (res.data.status_code === 200) {
          // setRecords(res.data.msg);
          toast.success(res.data.msg);

          load_bank_accounts();
          setIsNewPopup(false);
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogout();
        } else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
          setIsNewPopup(true);
        } else {
          toast.error("Error Occurred");
          // setRecords([]);
        }
      })
      .catch((err) => {
        toast.error("Something Went Wrong");
      });
   
  };

  const updateBankaccount = (data) => {
    axios
      .put(`${config.APP_CONFIG}/BankAccountCRUD/api/${data.id}`, data, {
        headers: {
          Authorization: userSessionContext.token,
        },
      })
      .then((res) => {
        if (res.data.status_code === 200) {
          //setRecords(res.data.msg);
          toast.success("Update Successfully");
          load_bank_accounts();
          setIsEditPopup(false);
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogout();
        } else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
          setIsEditPopup(true);
        } else {
          toast.error("Warning");
        }
      })
      .catch((err) => {
        toast.error("Error");
      });

  };

  const deletebankaccount = (id) => {
    setConfirmDialog({ ...confirmDialog, isOpen: false });
    axios
      .delete(`${config.APP_CONFIG}/BankAccountCRUD/api/${id}`, {
        headers: {
          Authorization: userSessionContext.token,
        },
      })
      .then((res) => {
        if (res.data.status_code === 200) {
          toast.success(res.data.msg);
          load_bank_accounts();
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogout();
        } else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
        } else {
          toast.error("Error Occurred");
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
    <div className="search">
      {isNewPopup ? (        
        <Popup
          title="Bank Form"
          openPopup={isNewPopup}
          setPopups={setIsNewPopup}
        >
          <BankForm handleSubmit={AddBankaccount} />
        </Popup>
      ) : null}

      {isEditPopup ? (
        <Popup
          title="Bank Form"
          openPopup={isEditPopup === false ? false : true}
          setPopups={() => {
            setIsEditPopup(false);
          }}
        >
          <BankForm
            handleSubmit={updateBankaccount}
            data={records.filter((x) => x.id === isEditPopup)[0] || null}
          />
        </Popup>
      ) : null}
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />

      <div>
   
        <PageHeaderTitle title="Bank Account" />
      </div>

      {Permission["u_create"] === 1 ? (
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
</div>
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
  
          <TblContainer>
       
            <TblHead />
            <TableBody>
              {recordsAfterPagingAndSorting()&&recordsAfterPagingAndSorting().length>0 ? recordsAfterPagingAndSorting().map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.accountNumber}</TableCell>
                  <TableCell>{item.bankName}</TableCell>
                  <TableCell>{item.companyName}</TableCell>
                  <TableCell>{item.remarks}</TableCell>
                  {/* <TableCell>{item.action}</TableCell> */}
                  <TableCell>
                    {Permission["u_write"] === 1 ? (
                      <Controls.ActionButton
                        color="primary"
                        onClick={(e) => {
                          setIsEditPopup(item.id);
                        }}
                      ><Tooltip title="Edit">
                        <EditOutlinedIcon fontSize="small" /></Tooltip>
                      </Controls.ActionButton>
                    ) : null}
                   {Permission["u_delete"]===1? 
                    <Controls.ActionButton
                      color="secondary"
                      onClick={() => {
                        setConfirmDialog({
                          isOpen: true,
                          title: "Are you sure to delete this record?",
                          subTitle: "You can't undo this operation",
                          Icon:DeleteIcon,
                          onConfirm: () => {
                            deletebankaccount(item.id);
                          },
                        });
                      }}
                    >
                      <Tooltip title="Delete" placement="top" arrow>
                      <CloseIcon fontSize="small" />
                      </Tooltip>
                    </Controls.ActionButton>
                    :null} 
                  </TableCell>
                </TableRow>
              ))
              :null
             }
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
