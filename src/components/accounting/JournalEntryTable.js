import React, { useState, useEffect, useContext } from "react";
import Controls from "../controls/Controls";
import UseTable from "../home/UseTable";
import config from "../../utils/config";
import { format } from "date-fns";
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
import AddIcon from "@material-ui/icons/Add";
import { toast } from "react-toastify";
import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
import Popup from "../home/Popup";
import Spinner from "../../utils/spinner";
import UserSessionContext from "../../contexts/UserSessionContext";
import CompanyContext from "../../contexts/CompanyContext";
import { useHistory } from "react-router-dom";
import PageHeaderTitle from "../../utils/PageHeaderTitle";
import UserAuthenticationContext from "../../contexts/UserAuthenticationContext";
//import JournalUI from "./JournalUI";
import Tooltip from "@mui/material/Tooltip";
import JournalEntriesPage from './JournalEntriesPage';

import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import JournalEdit from "./JournalEdit";
import Excelfile from "../../utils/Excelfile";
const headCells = [
  { id: "accountingDate", label: "Date" },
  { id: "transactionid ", label: "TransactionID" },
  { id: "reference", label: "Reference" },
  { id: "narration", label: "Narration" },
  { id: "actions", label: "Actions" },
];
const useStyles = makeStyles((theme) => ({
  newButton: {
    position: "absolute",
    right: "10px",
    zIndex: 4,
  },searchInput: {
    width: "20%",
  },
}));

function JournalEntryTable(props) {
  const userSessionContext = React.useContext(UserSessionContext);
  const classes = useStyles(props);
  const [records, setRecords] = useState();
  let history = useHistory();
  // const [isNewPopup, setIsNewPopup] = useState(false);
  const comp = useContext(CompanyContext);
  const [isViewPopup, setIsViewPopup] = useState(false);
  const [isEditPopup, setIsEditPopup] = useState(false);
  var companyId = comp.company["id"];
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  var adbs = require("ad-bs-converter");
  const permissionContext = React.useContext(UserAuthenticationContext);
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
              (x.accountingDate + x.reference + x.transactionid + x.narration)
                .toLowerCase()
                .includes(query.toLowerCase())
           
          );
      },
    });
  };

  useEffect(() => {
    load_journal_transaction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const load_journal_transaction = async () => {
    await axios
      .get(
        `${config.APP_CONFIG}/Account/Journal/journalTransaction/${companyId}`,
        {
          headers: {
            Authorization: userSessionContext.token,
          },
        }
      )
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

  if (records === undefined) {
    return <Spinner />;
  }


  return (
    <div>
      <div className="search">
      {isViewPopup ? (
       <Popup
       size="lg"
          title="Journal Details"
          openPopup={isViewPopup === false ? false : true}
          setPopups={() => {
            setIsViewPopup(false);
          }}
        >
          <JournalEntriesPage
       
data={records.filter((x) => x.id === isViewPopup)[0] || null}
          />
         </Popup>
      ) : null}

{isEditPopup ? (
        <Popup
        size="lg"
          title="Jouranl Edit Form"
          openPopup={isEditPopup === false ? false : true}
          setPopups={() => {
            setIsEditPopup(false);
          }}
        >
          <JournalEdit
            // handleSubmit={null}
            datas={records.filter((x) => x.id === isEditPopup)[0] || null}
            setIsEditPopup={setIsEditPopup}
          />
        </Popup>
      ) : null}
       <div >
          <PageHeaderTitle title="Ledgers" />
        </div>
       
        {userPermission["u_create"] === 1 ? (
          <div style={{ position: "relative" }}>
            <Controls.Button
              text="Create"
              variant="outlined"
              startIcon={<AddIcon />}
              className={classes.newButton}
              style={{ top: "15px", right: "0", margin: "0" }}
              onClick={() => {
                history.push(`/accounting/journaltab`);
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
      <div className="row journalTable">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
          <TblContainer>
            <TblHead />
            <TableBody>
              {records &&
                recordsAfterPagingAndSorting().map((item) => {
                  const NepaliDate= adbs.ad2bs(
                    format(new Date(item.accountingDate), "yyyy/MM/dd")
                  ).en["year"] +
                    "/" +
                    adbs.ad2bs(
                      format(new Date(item.accountingDate), "yyyy/MM/dd")
                    ).en["month"] +
                    "/" +
                    adbs.ad2bs(
                      format(new Date(item.accountingDate), "yyyy/MM/dd")
                    ).en["day"]
                  return(
                  <TableRow key={item.id}>
                    {/* <TableCell>{new Date(item.accountingDate).toLocaleDateString("en-US")+" "+new Date(item.accountingDate).toLocaleTimeString()}</TableCell> */}
                    <TableCell>{((item.accountingDate).slice(0,16)) +" "+NepaliDate.toString()}</TableCell>
             
                    <TableCell>{item.transactionid}</TableCell>
                    <TableCell>{item.reference}</TableCell>
                    <TableCell>{item.narration}</TableCell>
                    <TableCell>
                      <Controls.ActionButton
                        color="primary"
                        onClick={() => {
                         setIsViewPopup(item.id)
                        }}
                      >
                        <Tooltip title="View" placement="top" arrow>
                        <RemoveRedEyeIcon fontSize="small" />
                      </Tooltip>                        
                      </Controls.ActionButton>
           
                 
                      <Controls.ActionButton
                        color="primary"
                        onClick={() => {
                         setIsEditPopup(item.id)
                        }}
                      >
                        <Tooltip title="View" placement="top" arrow>
                        <EditOutlinedIcon fontSize="small" />
                      </Tooltip>                        
                      </Controls.ActionButton>
                    </TableCell>
                  </TableRow>
                )})}
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

export default JournalEntryTable;
