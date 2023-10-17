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
  Tooltip,
} from "@material-ui/core";
import { toast } from "react-toastify";
import Spinner from "../../../utils/spinner";
import UserSessionContext from "../../../contexts/UserSessionContext";
import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
import PageHeaderTitle from "../../../utils/PageHeaderTitle";
import UserAuthenticationContext from "../../../contexts/UserAuthenticationContext";
import ConfirmDialog from "../../home/ConfirmDialog";
import SalesReturnView from "./SalesReturnView";
import { format } from "date-fns";
const headCells = [
    { id: "customerName", label: "Customer Name" },
    { id: "bill_no", label: "Bill No." },
    { id: "refBillNo", label: "Ref. Bill No." },
    { id: "dateOfSales", label: "Date Of Sales" },
    { id: "grandTotal", label: "grandTotal" },
    { id: "cashierName", label: "Cashier Name" },
    { id: "actions", label: "Actions", disableSorting: true },
];
const useStyles = makeStyles((theme) => ({
  newButton: {
    position: "absolute",
    right: "10%",
  },

  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "25%",
  },
}));

function SalesReturnTable(props) {
  const userSessionContext = React.useContext(UserSessionContext);
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
    return x["module_name"].toLowerCase() === "sales";
  });
  let userPermission = curr_mod_permission[0];
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    UseTable(records, headCells, filterFn);

  const handleSearch = (e) => {
    let query = e.target.value;

    setFilterFn({
      fn: (items) => {
        if (query == "") return items;
        else
          return items.filter(
            (x) =>
              (x.customerName + x.cashierName + x.bill_no + x.grandTotal)
                .toLowerCase()
                .includes(query.toLowerCase())
            // items[x].toString().toLowerCase().includes(target.value)
            // x.firstName.toLowerCase().includes(target.value)
          );
      },
    });
  };
  useEffect(() => {
    loadSalesReturns();
  }, []);

  const loadSalesReturns = async () => {
   await axios
      .get(`${config.APP_CONFIG}/Sales/SalesReturn/api`, {
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
            title="Credit Note"
            openPopup={isViewPopup === false ? false : true}
            setPopups={() => {
              setIsViewPopup(false);
            }}
          >
            <SalesReturnView
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
              {/* <h3>Users Table</h3> */}
              <PageHeaderTitle title="Sales Return Table" />
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
                    <TableCell>{item.customerName}</TableCell>
                    <TableCell>{item.bill_no}</TableCell>
                    <TableCell>{item.refBillNo}</TableCell>
                    <TableCell>{format(new Date(item.dateOfSales), "yyyy-MM-dd")}</TableCell>
                    <TableCell>{item.grandTotal}</TableCell>
                    <TableCell>{item.cashierName}</TableCell>
                
                    <TableCell>
                      <Controls.ActionButton
                        color="primary"
                        onClick={(e) => {
                            setIsViewPopup(item.id)
                        }}
                      > <Tooltip title="View" placement="top" arrow>
                        <RemoveRedEyeIcon fontSize="small" /></Tooltip>
                      </Controls.ActionButton>
                    </TableCell>
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
}
export default SalesReturnTable;
