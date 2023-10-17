import React, { useState } from "react";
import { toast } from "react-toastify";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Controls from "../../controls/Controls";
import CardContent from "@material-ui/core/CardContent";

import { useForm, Form } from "../../../components/home/useForm";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import FilterListIcon from '@mui/icons-material/FilterList';


import axios from "axios";
import config from "../../../utils/config";

import UserSessionContext from "../../../contexts/UserSessionContext";
import CompanyContext from "../../../contexts/CompanyContext";
import { format } from "date-fns";
import { useHistory } from "react-router-dom";


import ReportHeader from "../../reports/ReportHeader";
import { AiOutlineArrowLeft } from "react-icons/ai";
import PDF from "../../pages/PDF/PDF";
import ExcelSheet from "../../pages/Excel/ExcelSheet";
import Popup from "../../home/Popup";
import { Tooltip } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: "white",
    color: "#546e7a",
    justifyContent: "left",
    padding: "10px 0px",
    fontWeight: "bold",
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
  dateFrom: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
  dateTo: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
};

export default function BLreport() {

  const { values, handleInputChange } = useForm(initialFValues);
  const componentRef = React.useRef(null);
  const classes = useStyles();
  const [records, setRecords] = useState([]);
  const userSessionContext = React.useContext(UserSessionContext);
  const companyContext = React.useContext(CompanyContext);
  const [open, setOpen] = useState(true)
  //const permissionContext=React.useContext(UserAuthenticationContext);
  //let Permission = permissionContext.permissions;
  const history = useHistory();
  //let curr_mod_permission =Permission.filter( x=>{return x["module_name"].toLowerCase() === "accounting"})
  //let userPermission= curr_mod_permission[0]


  const handleSubmit = e => {
    e.preventDefault()
    BLreport(values)
  }
  const BLreport = (data) => {

    let _data = {
      dateFrom: format(new Date(data.dateFrom), "yyyy-MM-dd"),
      dateTo: format(new Date(data.dateTo), "yyyy-MM-dd"),
      companyId: companyContext.company.id
    }

    axios.post(`${config.APP_CONFIG}/Account/balanceSheetReport/api`, _data, { headers: { Authorization: userSessionContext.token, }, })
      .then((res) => {

        if (res.data.status_code === 200) {
          if (res.data.msg.length < 1) {
            toast.warn("No Records")
          }
          else {
            setRecords(res.data.msg);
            setOpen(false);
          }


        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogout();

        }
        else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
        } else {
          toast.error("Warning");

        }
      })
      .catch((err) => {
        toast.error("Error");


      });

  }

  const debitlist = records.filter(x => { return x["dr_cr"].toLowerCase() === "dr" })
  // const dr_total=debitlist.reduce((x,y) => {return x["amount"] + y["amount"]},0)
  const drtotal = Math.round(debitlist.reduce((total, obj) => obj.amount + total, 0), 2)

  const creditList = records.filter(x => { return x["dr_cr"].toLowerCase() === "cr" })
  // const cr_total=creditList.reduce((x,y) => {return x["amount"] + y["amount"]},0)
  const crtotal = Math.round(creditList.reduce((total, obj) => obj.amount + total, 0), 2)

  const profit = crtotal - drtotal
  const loss = drtotal - crtotal


  //excelexport


 
  let table1 = [
    {
      A: "Ledger Name",
      B: "Debit",
      C: "Credit"
    }
  ]

  records.forEach((items) => {
    table1.push({
      A: items.ledgerName,
      B: parseFloat(items.dr_cr === "dr" ? items.amount : 0).toFixed(2),
      C: parseFloat(items.dr_cr === "cr" ? items.amount : 0).toFixed(2),
    })
  })

  const handleRoute = (e) => {
    e.preventDefault()
    history.push(`/reports/report`)
    setRecords([])

  }
  return (
    <div
      
    >
     {open?
      <Popup
        title="Balance Sheets Report"
        openPopup={open}
        setPopups={() => {
          setOpen(false)}}>
        <Form onSubmit={handleSubmit}>
                <Grid container>
                  <Grid item xs={12} sm={4}>
                    <Controls.DatePicker
                      name="dateFrom"
                      label="DateFrom"
                      value={values.dateFrom}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controls.DatePicker
                      name="dateTo"
                      label="DateTo"
                      value={values.dateTo}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} style={{ display: "flex" }}>
                    <Controls.Button type="submit" text="Submit" />
                  </Grid>
                </Grid>
        </Form>
      </Popup>
      
    :null}

      <Grid container direction="row">
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
                    data={table1}
                    title="Ledger Report"
                  />
                </li>
                <hr className="my-0" />
                <li className="mt-1">
                  <ExcelSheet
                    data={[table1]}
                    title="Ledger Report" />
                </li>
              </ul>
              <button type="button" className="btn btn-outline-primary btn-sm rounded-0" >
                Export
              </button>
            </div>
          </div>
        </div>
        <Grid item lg={12} md={12} xs={12}>
          <Card>
            <div ref={componentRef} className="salesReturnReport">
              <div className="jreportPage">

                <div className="reportHeader">
                  <p className="companyName">{companyContext.company.name}</p>
                  <p className="companyAddress">
                    {companyContext.company.address || ""}
                  </p>
                  <p className="companyPan">
                    Pan No : {companyContext.company.panNo}
                  </p>

                  <p className="companyReport"> Balance sheet Report</p>

                </div>
                <CardContent>
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
                    {format(
                      new Date(values.dateFrom),
                      "yyyy-MM-dd"
                    ).toString()}
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
                </CardContent>
                <Paper>
                  <TableContainer>
                    <Table stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell size="small" align="left"><strong>LedgerName</strong></TableCell>
                          <TableCell size="small" align="center"><strong>Debit</strong></TableCell>

                          <TableCell size="small" align="center"><strong>Credit</strong></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {/* { [...Array(maxLedgers).keys()].map((num,i)=>{ return get_tbody(num)}) } */}
                        {records.length !== 0 &&
                          records.map((item, idx) => {
                            return (
                              <TableRow key={idx} hover>
                                <TableCell size="small" align="left">{item.ledgerName}</TableCell>
                                <TableCell size="small" align="center">

                                  {parseFloat(item.dr_cr === "dr" ? item.amount : 0).toFixed(2)}
                                </TableCell>

                                <TableCell size="small" align="center">

                                  {parseFloat(item.dr_cr === "cr" ? item.amount : 0).toFixed(2)}
                                </TableCell>
                              </TableRow>
                            );
                          })}

                        <TableRow>
                          <TableCell>Total</TableCell>

                          <TableCell size="small" align="center">{drtotal}</TableCell>

                          <TableCell size="small" align="center">{crtotal}</TableCell>
                        </TableRow>
                        {profit > loss ? (
                          <TableRow>
                            <TableCell>Closing Balance</TableCell>
                            <TableCell size="small" align="center">{profit}</TableCell>
                          </TableRow>
                        ) : (
                          <TableRow>
                            <TableCell>Closing Balance</TableCell>
                            <TableCell></TableCell>
                            <TableCell size="small" align="center">{loss}</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>

                </Paper>

              </div>
            </div>

          </Card>
        </Grid>
      </Grid>






    </div>

  );
}
