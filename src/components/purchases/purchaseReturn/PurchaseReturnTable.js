import React, { useState, useEffect } from "react";
import Controls from "../../controls/Controls";
import UseTable from "../../home/UseTable";
import config from "../../../utils/config";
import Popup from "../../home/Popup";
import axios from "axios";
import { Search } from "@material-ui/icons";
import {
  makeStyles,
  TableRow,
  TableCell,
  TableBody,
  Toolbar,
  InputAdornment,
} from "@material-ui/core";
import { toast } from "react-toastify";
import Spinner from "../../../utils/spinner";
import UserSessionContext from "../../../contexts/UserSessionContext";
import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
import PageHeaderTitle from "../../../utils/PageHeaderTitle";
import UserAuthenticationContext from "../../../contexts/UserAuthenticationContext";
import CompanyContext from "../../../contexts/CompanyContext";
import ConfirmDialog from "../../home/ConfirmDialog";

import Tooltip from "@mui/material/Tooltip";
import PurchaseReturnViewOld from "./PurchaseReturnViewOld";
import { format } from "date-fns";
//import ComponentToPrint from "./ComponentToPrint";
const headCells = [
  { id: "vendorname ", label: "Vendor Name", disableSorting: true },
  { id: "vendorReference ", label: "Vendor Reference", disableSorting: true },
  { id: "description ", label: "Description", disableSorting: true },
  { id: "grandTotal ", label: "Grand Total", disableSorting: true },
  { id: "returnDate ", label: "Return Date", disableSorting: true },
  { id: "recepitDate ", label: "Receipt Date", disableSorting: true },
  { id: "actions", label: "Actions", disableSorting: true },
];
const useStyles = makeStyles((theme) => ({
  newButton: {
    position: "absolute",
    right: "10%",
    zIndex: 4,
  },

  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "20%",
  },
}));

function PurchaseReturnTable(props) {
  const userSessionContext = React.useContext(UserSessionContext);
  const companyContext = React.useContext(CompanyContext);
  const companyId=companyContext.company.id;
  const classes = useStyles(props);
  const [records, setRecords] = useState();
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
    return x["module_name"].toLowerCase() === "purchases";
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
              (x.vendorname + x.vendorReference + x.grandTotal + x.description)
                .toLowerCase()
                .includes(query.toLowerCase())
            // items[x].toString().toLowerCase().includes(target.value)
            // x.firstName.toLowerCase().includes(target.value)
          );
      },
    });
  };
  useEffect(() => {
    loadPurchaseReturns();
  }, []);

  const loadPurchaseReturns = async() => {
   await axios
      .get(`${config.APP_CONFIG}/Purchase/PurchaseReturn/api/byCompany/${companyId}`, {
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
        {isViewPopup ? (
          <Popup
            title="Purchase Return Details"
            openPopup={isViewPopup === false ? false : true}
            setPopups={() => {
              setIsViewPopup(false);
            }}
          >
            <PurchaseReturnViewOld
              data={records.filter((x) => x.id === isViewPopup)[0] || null}
            />
          </Popup>
        ) : null}
        <ConfirmDialog
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        />
        <div className="purchaseReturnTbl">
          <div>
            <div>
              <div>
                {/* <h3>Users Table</h3> */}
                <PageHeaderTitle title="Purchase Return Table" />
              </div>
            </div>
          </div>
          {/* <div className="pd-15"></div> */}
          {/* <Paper className={classes.pageContent}> */}
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

          {/* </Paper> */}

          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
              <TblContainer>
                <TblHead />

                <TableBody>
                  {recordsAfterPagingAndSorting().map((item) => (
                    <TableRow key={item.id}>
                      {/* <TableCell>{item.id}</TableCell> */}
                      <TableCell>{item.vendorname}</TableCell>
                      <TableCell>{item.vendorReference}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>{item.grandTotal}</TableCell>
                      <TableCell>{format(new Date(item.returnDate), "yyyy-MM-dd")}</TableCell>
                      <TableCell>{format(new Date(item.recepitDate), "yyyy-MM-dd")}</TableCell>
                      <TableCell>
                        <Controls.ActionButton
                          color="primary"
                          onClick={(e) => {
                            setIsViewPopup(item.id);
                          }}
                        >
                          <Tooltip title="View" placement="top" arrow>
                            <RemoveRedEyeIcon fontSize="small" />
                          </Tooltip>
                        </Controls.ActionButton>
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
export default PurchaseReturnTable;
