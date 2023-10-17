import React, { useState, useEffect } from "react";
import axios from "axios";



import { toast } from "react-toastify";
import Select from "react-select";
import "../../../utils/styles.css";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import { useForm, Form } from "../../../components/home/useForm";
import Card from "@material-ui/core/Card";

import Divider from "@material-ui/core/Divider";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";


import { useHistory } from "react-router-dom";


import { format } from "date-fns";
import FilterListIcon from '@mui/icons-material/FilterList';
import CompanyContext from "../../../contexts/CompanyContext";
import UserSessionContext from "../../../contexts/UserSessionContext";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Controls from "../../controls/Controls";
import PDF from "../../pages/PDF/PDF";
import ExcelSheet from "../../pages/Excel/ExcelSheet";
import Popup from "../../home/Popup";
import config from "../../../utils/config";
import Spinner from "../../../utils/spinner";
import { Tooltip } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: "white",
    color: "#546e7a",
    justifyContent: "left",
    padding: "8px 0px",
    fontWeight: "bold",
    MarginTop: "5px",
  },
  content: {
    padding: 0,
  },
  status: {
    marginRight: "5px",
  },
  actions: {
    justifyContent: "flex-end",
  },
  summaryTable: {
    width: "auto",
    marginBottom: "10px",
    pointerEvents: "none",
  },
  noBorder: {
    border: "none",
  },
  denseCell: {
    padding: "5px",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  inputGroup: {
    marginBottom: theme.spacing(1),
  },
}));
const initialFValues = {
  id: " ",
  coaname: "",
  dateFrom: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
  dateTo: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
};

export default function LedgerReport(props) {
  const userSessionContext = React.useContext(UserSessionContext);
  const companyContext = React.useContext(CompanyContext);
  const classes = useStyles();
  const [expand, setExpand] = useState(false)
  const activefiscalyear = companyContext.fiscal.map((item) => ({
    value: item.id,
    label: item.fiscalYear,
  }));
  const [open, setOpen] = useState(true)
  const history = useHistory();
  const [coa, setCoa] = useState([]);
  const [coaid, setCoaid] = useState([]);
  const [fiscalid, setFiscalid] = useState(activefiscalyear[0]);
  const [records, setRecords] = useState([]);
  const [fiscalYear, setFiscalYear] = useState([]);

  const { values, handleInputChange } = useForm(initialFValues);

  useEffect(async () => {
    await axios
      .get(`${config.APP_CONFIG}/Setting/FiscalYear/api`, {
        headers: { Authorization: userSessionContext.token },
      })
      .then((res) => {
        if (res.data.status_code === 401) {
          userSessionContext.handleLogOut();
        } else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
        } else if (res.data.status_code === 200) {
          let fiscalList = res.data.msg.map((item) => ({
            value: item.id,
            label: item.fiscalYear,
          }));

          setFiscalYear(fiscalList);
          //setFiscal(fiscalList[0])
        } else {
          toast.error("error");
          setFiscalYear([]);
        }
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    LoadCOA();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const LoadCOA = async () => {
    await axios
      .get(`${config.APP_CONFIG}/Account/COAChild/ledger`, {
        headers: { Authorization: userSessionContext.token },
      })
      .then((res) => {
        if (res.data.status_code === 401) {
          userSessionContext.handleLogOut();
        } else if (res.data.status_code === 200) {
          let coaList = res.data.msg.map((item) => ({
            value: item.id,
            label: item.coaname,
          }));

          // coaList  = [{ id: 0, title: 'Select' }].concat( coaList );
          setCoa(coaList);
        } else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
        } else {
          toast.error("error");
          setCoa([]);
        }
      })
      .catch((err) => {
        setCoa([]);
      });
  };




  if (coa === undefined) {
    return <Spinner />;
  }

  const debitlist = records.filter((x) => {
    return x["dr_cr"].toLowerCase() === "dr";
  });
  const drtotal = Math.round(
    debitlist.reduce((total, obj) => obj.amount + total, 0),
    2
  );

  const creditList = records.filter((x) => {
    return x["dr_cr"].toLowerCase() === "cr";
  });
  const crtotal = Math.round(
    creditList.reduce((total, obj) => obj.amount + total, 0),
    2
  );
  const profit = crtotal - drtotal
  const loss = drtotal - crtotal

  const submitHandler = (e) => {
    e.preventDefault();
    if (coaid.length === 0) {
      toast.warn("Please Enter Ledger Name");
    } else {
      const req_payload = {
        dateFrom: format(new Date(values.dateFrom), "yyyy-MM-dd"),
        dateTo: format(new Date(values.dateTo), "yyyy-MM-dd"),
        coaId: coaid.value,
        fiscalYear: fiscalid.label,
        companyId: companyContext.company.id,
      };

      axios
        .post(`${config.APP_CONFIG}/Account/LedgerReport/api`, req_payload, {
          headers: { Authorization: userSessionContext.token },
        })
        .then((res) => {
          if (res.data.status_code === 200) {

            if (res.data.msg.length < 1) {
              toast.warn("No Records")
            }
            else {

              setRecords(res.data.msg);
              setOpen(false)
            }


          } else if (res.data.status_code === 401) {
            userSessionContext.handleLogout();
          } else if (res.data.status_code === 400) {
            toast.warn(res.data.msg);
          } else {
            toast.error("Error Occurred");
            // setRecords([]);
          }
        })
        .catch((err) => {
          toast.error("Something Went Wrong");
        });
    }
  };

  const handleRoute = (e) => {
    e.preventDefault()
    history.push(`/reports/report`)
    setRecords([])

  }
  // const ExpandHandler = (e) => {
  //   e.preventDefault()
  //   setExpand(!expand)
  //   // const convertToNestedStructure = (flatData) => {
  //   //   const rootNodes = [];
  //   //   const map = new Map();
  //   //   flatData.forEach((node) => {
  //   //     node.children = [];
  //   //     map.set(node.id, node);
  //   //     if (node.parentId === node.id) {
  //   //       rootNodes.push(node);
  //   //     } else {
  //   //       const parent = map.get(node.parentId);
  //   //       if (parent) {
  //   //         parent.children.push(node);
  //   //       }
  //   //     }
  //   //   });
  //   //   return rootNodes;
  //   // };
  //   // const nestedData = convertToNestedStructure(records);
  //   // console.log(JSON.stringify(nestedData));
  //   // setExpandedRecord(records)
  // }

  return (
    <div>





      <div>
        {open?
          <Popup
            title="Ledger Balance Report"
            openPopup={open}
            setPopups={() => {
              setOpen(false);
            }}>
            <Form onSubmit={submitHandler}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <label>Ledger Name </label>
                  <Select
                    defaultValue={coaid}
                    options={coa}
                    styles={{
                      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    }}
                    menuPortalTarget={document.body}
                    onChange={setCoaid}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <label>Fiscal Year </label>
                  <Select
                    defaultValue={fiscalid}
                    options={fiscalYear}
                    styles={{
                      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    }}
                    menuPortalTarget={document.body}
                    onChange={setFiscalid}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>


                <Grid item xs={12} sm={6} className="d-flex justify-content-center"  >
                  <Controls.DatePicker
                    label="Date From"
                    name="dateFrom"
                    value={values.dateFrom}
                    onChange={handleInputChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6} className="d-flex justify-content-center"  >
                  <Controls.DatePicker
                    name="dateTo"
                    label="DateTo"
                    value={values.dateTo}
                    onChange={handleInputChange}
                  />
                </Grid>
                <div className=" d-flex flex-row justify-content-center w-100 mx-auto">
                  <Controls.Button type="submit" text="Submit" />
                </div>
              </Grid>
            </Form>
          </Popup> :null}
      </div>

      <Grid container direction="row">

        <Grid item lg={12} md={12} xs={12}>

          <div>
            <div className="w-100  pb-2 d-flex flex-row justify-content-between">
              <span>
                <button onClick={(e) => handleRoute(e)} className="btn btn-outline-success btn-sm d-flex align-items-center">
                  <AiOutlineArrowLeft className="me-2 " />Back
                </button>
              </span>
              <div className="d-flex flex-row gap-2">
              <Controls.ActionButton
                  
                  onClick={() => {
                    setOpen(!open);
                    setRecords([])
                   // console.log(open)
                  }}
                >
                  <Tooltip title="filter" placement="top" arrow>
                  <FilterListIcon  sx={{mt:1,ml:5}} />
                </Tooltip>                        
                </Controls.ActionButton>
                {/* <FormControlLabel
                control={
                  <Switch
                    // onClick={(e) => ExpandHandler(e)}
                    name="Expand Table"
                    color={"secondary"} />
                }
                label="Expand All"
              /> */}
                <div className="dropdown-center dropstart shadow-none">
                  <button type="button" className="btn btn-primary btn-sm dropdown-toggle dropdown-toggle-split rounded-0" data-bs-toggle="dropdown" aria-expanded="false">
                  </button>
                  <ul className="dropdown-menu my-0 ">
                    <li className="mt-1">
                      <PDF
                        // data={table1}
                        title="Ledger Report"
                      />
                    </li>
                    <hr className="my-0" />
                    <li className="mt-1">
                      <ExcelSheet
                        // data={[table1]}
                        title="Ledger Report" />
                    </li>
                  </ul>
                  <button type="button" className="btn btn-outline-primary btn-sm rounded-0" >
                    Export
                  </button>
                </div>
              </div>
            </div>
            <Card>
              <Divider />
              <h2 style={{ color: "Black", textAlign: "center" }}>
                {companyContext.company.name}
              </h2>

              <div
                style={{
                  color: "black",
                  font: "Bold",
                  display: "inline",
                  float: "left",
                  marginLeft: "10px",
                }}
              >
                {" "}
                From:
                {format(new Date(values.dateFrom), "yyyy-MM-dd").toString()}
              </div>
              <div
                style={{
                  color: "black",
                  font: "Bold",
                  display: "inline",
                  float: "right",
                  marginRight: "10px",
                }}
              >
                {" "}
                To:
                {format(new Date(values.dateTo), "yyyy-MM-dd").toString()}
              </div>
              <h4 style={{ color: "Black", textAlign: "center" }}>
                {coaid.label}
              </h4>

              <Paper>
                <TableContainer>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>LedgerName</TableCell>
                        <TableCell>Debit</TableCell>
                        <TableCell>Credit</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {records.length !== 0 &&
                        records.map((item, idx) => {

                          return (
                            <TableRow key={idx} hover>
                              <TableCell>
                                {item.accountingDate}
                                {/* {new Date(
                                    item.accountingDate
                                  ).toLocaleDateString() +
                                    " " +
                                    new Date(
                                      item.accountingDate
                                    ).toLocaleTimeString()} */}
                              </TableCell>
                              <TableCell>{item.ledgerName}</TableCell>
                              <TableCell>
                                {item.dr_cr === "dr" ? item.amount : 0}
                              </TableCell>

                              <TableCell>
                                {item.dr_cr === "cr" ? item.amount : 0}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      <TableRow>
                        <TableCell>Total </TableCell>
                        <TableCell> </TableCell>
                        <TableCell>{drtotal}</TableCell>

                        <TableCell>{crtotal}</TableCell>
                      </TableRow>
                      {profit > loss ? (
                        <TableRow>

                          <TableCell>Closing Balance </TableCell>
                          <TableCell> </TableCell>

                          <TableCell>{profit}</TableCell>
                          <TableCell> </TableCell>
                        </TableRow>
                      ) : (
                        <TableRow>

                          <TableCell>Closing Balance </TableCell>
                          <TableCell></TableCell>
                          <TableCell> </TableCell>
                          <TableCell>{loss}</TableCell>

                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Card>


          </div>

        </Grid>
      </Grid>
    </div>
  );
}
