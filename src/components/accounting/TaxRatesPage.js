/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
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
import TaxForm from "./TaxForm";
import AddIcon from "@material-ui/icons/Add";
import UserSessionContext from "../../contexts/UserSessionContext";
import UserAuthenticationContext from "../../contexts/UserAuthenticationContext";
import ConfirmDialog from "../home/ConfirmDialog";
import { toast } from "react-toastify";
import Spinner from "../../utils/spinner";
import PageHeaderTitle from "../../utils/PageHeaderTitle";

import DeleteIcon from '@material-ui/icons/Delete';
const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  newButton: {
    position: "absolute",
    right: "10px",
    zIndex: 4,
  },searchInput: {
    width: "20%",
  },
}));
const headCells = [
  { id: "name", label: "Tax Name" },
  { id: "amount", label: " Amount" },
  { id: "ledgerName", label: " LedgerName" },
  { id: "companyname", label: "CompanyName" },
  { id: "actions", label: "Actions", disableSorting: true },
];

export default function TaxRatesPage(props) {
  const userSessionContext = React.useContext(UserSessionContext);
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

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  let Permission = permissionContext.permissions;

  let curr_mod_permission = Permission.filter((x) => {
    return x["module_name"].toLowerCase() === "accounting";
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
              (x.name+x.amount + x.ledgerName + x.companyname)
                .toLowerCase()
                .includes(query.toLowerCase())
           
          );
      },
    });
  };

  useEffect(() => {
    load_tax_rates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const load_tax_rates = async () => {
   await axios
      .get(`${config.APP_CONFIG}/Account/TaxRates/api`, {
        headers: {
          Authorization: userSessionContext.token,
        },
      })
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

  const addTax = (_data) => {
    //     let req = {
    //       name: _data.name,
    //       amount: _data.amount,
    //       ledgerName: _data.ledgerName,
    //       companyId: _data.companyId,
    //     };
    // console.log(req)
    axios
      .post(`${config.APP_CONFIG}/Account/TaxRates/api`, _data, {
        headers: {
          Authorization: userSessionContext.token,
        },
      })
      .then((res) => {
        if (res.data.status_code === 200) {
          toast.success("Insert Successfully");
          load_tax_rates();
          setIsNewPopup(false);
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogout();
        } else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
        } else {
          toast.error("Warning");
        }
      })
      .catch((err) => {
        toast.error("Error");
      });
    // setIsNewPopup(false);
  };

  const updateTax = (data) => {
    axios
      .put(`${config.APP_CONFIG}/Account/TaxRates/api/${data.id}`, data, {
        headers: {
          Authorization: userSessionContext.token,
        },
      })
      .then((res) => {
        if (res.data.status_code === 200) {
          load_tax_rates();
          toast.success(res.data.msg || "Update Successfullly");
          setIsEditPopup(false);
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogout();
        } else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
        } else {
          toast.error("Warning");
        }
      })
      .catch((err) => {
        toast.error("Error");
      });
    //setIsEditPopup(false);
  };

  const deleteTax = (id) => {
    setConfirmDialog({ ...confirmDialog, isOpen: false });
    axios
      .delete(`${config.APP_CONFIG}/Account/TaxRates/api/${id}`, {
        headers: {
          Authorization: userSessionContext.token,
        },
      })
      .then((res) => {
        if (res.data.status_code === 200) {
          toast.success("Deleted tax rates Successfully");
          load_tax_rates();
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogout();
        } else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
        } else {
          toast.error("Delete unsuccessful");
        }
      })
      .catch((err) => {
        toast.error("Error");
      });
  };

  if (records === undefined) {
    return <Spinner />;
  }

  return (
    <div>
      {isNewPopup ? (
        <Popup
          title="Tax Form"
        
          openPopup={isNewPopup}
          setPopups={setIsNewPopup}
        >
          <TaxForm handleSubmit={addTax} />
        </Popup>
      ) : null}

      {isEditPopup ? (
        <Popup
          title="Tax Form"
          openPopup={isEditPopup === false ? false : true}
          setPopups={() => {
            setIsEditPopup(false);
          }}
        >
          <TaxForm
            handleSubmit={updateTax}
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
       
            <PageHeaderTitle title="Tax Rates" />
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
              {
                recordsAfterPagingAndSorting().map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.amount}</TableCell>
                    <TableCell>{item.ledgerName}</TableCell>
                    <TableCell>{item.companyname}</TableCell>
                    <TableCell>
                      {userPermission["u_write"] === 1 ? (
                        <Controls.ActionButton
                          color="primary"
                          onClick={(e) => {
                            setIsEditPopup(item.id);
                          }}
                        >
                          <Tooltip title="Edit" placement="top" arrow>
                        <EditOutlinedIcon fontSize="small" />
                        </Tooltip>
                        </Controls.ActionButton>
                      ) : null}
                      {/* {userPermission["u_delete"]===undefined?  */}
                      <Controls.ActionButton
                        color="secondary"
                        onClick={() => {
                          setConfirmDialog({
                            isOpen: true,
                            title: "Are you sure to delete this record?",
                            subTitle: "You can't undo this operation",
                            Icon:DeleteIcon,
                            onConfirm: () => {
                              deleteTax(item.id);
                            },
                          });
                        }}
                      >
                        <Tooltip title="Delete" placement="top" arrow>
                      <CloseIcon fontSize="small" />
                      </Tooltip>
                      </Controls.ActionButton>
                      {/* :null} */}
                    </TableCell>
                  </TableRow>
                ))
            }
            </TableBody>
          </TblContainer>
{records.length>0?
          <TblPagination />
          : (
                <div className="reportNotFound">
                <p >No Records to Display</p>
                    </div>
              )}
        </div>
      </div>
    </div>
  );
}
