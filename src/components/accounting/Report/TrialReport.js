

import React, { useState } from "react";
import { toast } from "react-toastify";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Controls from "../../controls/Controls";

import FilterListIcon from '@mui/icons-material/FilterList';
import { useForm, Form } from "../../home/useForm";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";

import UserSessionContext from "../../../contexts/UserSessionContext";
import CompanyContext from "../../../contexts/CompanyContext";
import axios from "axios";
import config from "../../../utils/config";




import { format } from "date-fns";

import "date-fns";
import { useHistory } from "react-router-dom";


import { AiOutlineArrowLeft } from 'react-icons/ai'
import { FormControlLabel, Switch, Tooltip } from "@material-ui/core";
import PDF from "../../pages/PDF/PDF";
import ExcelSheet from "../../pages/Excel/ExcelSheet";
import Popup from "../../home/Popup";
import Tree from "../ExpandedTable/Tree";
const daat=[{
  "amount": 0, 
  "children": [
    {
      "amount": 508.0, 
      "children": [], 
      "dr_cr": "dr", 
      "id": 20, 
      "ledgerName": "Bank Balance", 
      "parentId": 1
    }, 
    {
      "amount": 6.0, 
      "children": [
        {
          "amount": 7678.0, 
          "children": [], 
          "dr_cr": "cr", 
          "id": 105, 
          "ledgerName": "Cash", 
          "parentId": 19
        }
      ], 
      "dr_cr": "dr", 
      "id": 19, 
      "ledgerName": "Cash Balance", 
      "parentId": 1
    }
  ], 
  "dr_cr": "dr", 
  "id": 1, 
  "ledgerName": "Assets", 
  "parentId": null
}, 
{
  "amount": 0, 
  "children": [
    {
      "amount": 3881.9299144744873, 
      "children": [], 
      "dr_cr": "dr", 
      "id": 406, 
      "ledgerName": "Tax", 
      "parentId": 2
    }
  ], 
  "dr_cr": "dr", 
  "id": 2, 
  "ledgerName": "Equity", 
  "parentId": null
}, 
{
  "amount": 0, 
  "children": [], 
  "dr_cr": "dr", 
  "id": 3, 
  "ledgerName": "Liabilities", 
  "parentId": null
}, 
{
  "amount": 0, 
  "children": [], 
  "dr_cr": "dr", 
  "id": 5, 
  "ledgerName": "Expenses", 
  "parentId": null
}, 
{
  "amount": 0, 
  "children": [], 
  "dr_cr": "dr", 
  "id": 4, 
  "ledgerName": "Income", 
  "parentId": null
}, 
{
  "amount": 28171.420043945312, 
  "children": [], 
  "dr_cr": "dr", 
  "id": 125, 
  "ledgerName": "Purchase Of Goods and Services", 
  "parentId": 80
}, 
{
  "amount": 499.79998779296875, 
  "children": [], 
  "dr_cr": "dr", 
  "id": 422, 
  "ledgerName": "Psychiatrists Association Of Nepal", 
  "parentId": 49
}, 
{
  "amount": 7678.0, 
  "children": [], 
  "dr_cr": "cr", 
  "id": 105, 
  "ledgerName": "Cash", 
  "parentId": 19
}, 
{
  "amount": 821.0, 
  "children": [], 
  "dr_cr": "cr", 
  "id": 423, 
  "ledgerName": "Psychiatrists Association  Of Nepal", 
  "parentId": 49
}, 
{
  "amount": 508.0, 
  "children": [], 
  "dr_cr": "dr", 
  "id": 20, 
  "ledgerName": "Bank Balance", 
  "parentId": 1
}, 
{
  "amount": 6.0, 
  "children": [
    {
      "amount": 7678.0, 
      "children": [], 
      "dr_cr": "cr", 
      "id": 105, 
      "ledgerName": "Cash", 
      "parentId": 19
    }
  ], 
  "dr_cr": "dr", 
  "id": 19, 
  "ledgerName": "Cash Balance", 
  "parentId": 1
}, 
{
  "amount": 600.0, 
  "children": [], 
  "dr_cr": "dr", 
  "id": 424, 
  "ledgerName": "Manoj Acharya", 
  "parentId": 49
}, 
{
  "amount": 3881.9299144744873, 
  "children": [], 
  "dr_cr": "dr", 
  "id": 406, 
  "ledgerName": "Tax", 
  "parentId": 2
}, 
{
  "amount": 24053.35062980652, 
  "children": [], 
  "dr_cr": "cr", 
  "id": 405, 
  "ledgerName": "Cefalo Nepal", 
  "parentId": 69
}


]
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
  table: {
    "& thead th": {
      fontWeight: "600",
      // color: theme.palette.primary.main,
      color: "#9999",
      // backgroundColor: theme.palette.primary.light,
      backgroundColor: "#454545",
      position: "sticky",
      top: "33px",
      zIndex: 9,
    },
    "& tbody td": {
      fontWeight: "300",
    },
    "& tbody tr:hover": {
      backgroundColor: "#fffbf2",
      cursor: "pointer",
    },
  },
}));
const initialFValues = {
  dateFrom: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
  dateTo: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
};

export default function TrialReport(props) {
  const { values, handleInputChange } = useForm(initialFValues);
  const componentRef = React.useRef(null);
  const [open,setOpen] = useState(true)
  const classes = useStyles();
  const [records, setRecords] = useState(daat||[]);
  const [expand, setExpand] = useState(false)
  const userSessionContext = React.useContext(UserSessionContext);
  const companyContext = React.useContext(CompanyContext);
  const [expandedrecord, setExpandedRecord] = useState([])

  const history = useHistory();

  // Cache Object 
  const areaDataCache = {};

  const handleSubmit = (e) => {
    e.preventDefault();
    let _data = {
      dateFrom: format(new Date(values.dateFrom), "yyyy-MM-dd"),
      dateTo: format(new Date(values.dateTo), "yyyy-MM-dd"),
      companyId: companyContext.company.id,
    };
    //   if (!areaDataCache[_data]) {
    //     // load data and add it to cache
    //     const { data } =  axios.get(`https://api.zippopotam.us/GB/${postcode}`);
    //     areaDataCache[postcode] = data.places
    //   }
    //   // cached data
    //   return areaDataCache[postcode];
    // };
    axios.post(`${config.APP_CONFIG}/Account/TrialBalanceReport/api`, _data, { headers: { Authorization: userSessionContext.token } })
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
        } else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
        } else {
          toast.error("Warning");
        }
      })
      .catch((err) => {
        toast.error("Error");
      });

  };

  const debitlist = records.filter((x) => {
    return x["dr_cr"].toLowerCase() === "dr";
  });
  const drtotal = Math.round(
    debitlist.reduce((total, obj) => obj.amount + total, 0),
    2
  );

  const creditlist = records.filter((x) => {
    return x["dr_cr"].toLowerCase() === "cr";
  });
  const crtotal = Math.round(
    creditlist.reduce((total, obj) => obj.amount + total, 0),
    2
  );
  const profit = crtotal - drtotal
  const loss = drtotal - crtotal
  //excelexport




  // Route
  const handleRoute = (e) => {
    e.preventDefault()
    history.push(`/reports/report`)
    setRecords([])

  }

  //  expand
  const ExpandHandler = (e) => {
    e.preventDefault()
    setExpand(!expand)
    const convertToNestedStructure = (flatData) => {
      const rootNodes = [];
      const map = new Map();
      flatData.forEach((node) => {
        node.children = [];
        map.set(node.id, node);
        if (node.parentId === node.id||null) {
          rootNodes.push(node);
        } else {
          const parent = map.get(node.parentId);
          if (parent) {
            parent.children.push(node);
          }
        }
      });
      return rootNodes;
    };
    const nestedData = convertToNestedStructure(records);
    console.log(JSON.stringify(nestedData));
    setExpandedRecord(records)
  }
 
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

  // Expanded PDF table
  //   let table2 = [
  //     {
  //       A: "Ledger Name",
  //       B: "Debit",
  //       C: "Credit"
  //     }
  //   ]
  //   { expandedrecord.slice(0,5).map((item)=>{
  //     table2.push({
  //       A: item.ledgerName,
  //       B: parseFloat(item.dr_cr === "dr" ? item.amount : 0).toFixed(2),
  //       C: parseFloat(item.dr_cr === "cr" ? item.amount : 0).toFixed(2),

  //     })
  //   }) 
  // }
//   const ReportComponent = () => {
//     return (
//       <div>
      
//       </div>


//     )
//   }



  return (
    <div>
       {open? 
        <Popup 
        title=" Trial Balance"
        openPopup={open}
        setPopups={() => {
          setOpen(false);
        }}>
    
        <Form onSubmit={handleSubmit}>
          <Grid container direction="row">
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
                  <Grid item xs={12} sm={4} className="w-100 d-flex justify-content-end">
                    <Controls.Button type="submit" text="Submit" />
                  </Grid>
                </Grid>
        </Form>
        </Popup>
        :null}

     
        <Grid container direction="row">
         
          <div className="w-100  pb-2 d-flex flex-row justify-content-between">
            <span>
              <button className="btn btn-outline-success btn-sm d-flex align-items-center" onClick={(e) => handleRoute(e)}>
                <AiOutlineArrowLeft />Back
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
              <FormControlLabel
                control={
                  <Switch
                    onClick={(e) => ExpandHandler(e)}
                    name="Expand Table"
                    color={"secondary"} />
                }
                label="Expand All"
              />
              <div className="dropdown-center dropstart shadow-none">
                <button type="button" className="btn btn-primary btn-sm dropdown-toggle dropdown-toggle-split rounded-0" data-bs-toggle="dropdown" aria-expanded="false">
                </button>
                <ul className="dropdown-menu my-0 ">
                  <li className="mb-1 my-0">
                    <PDF
                      data={table1}
                      title="Trial Balance Report"
                    />
                  </li>
                  <hr className="my-0" />
                  <li className="mt-1">
                    <ExcelSheet
                      data={[table1]}
                      title="Trial Balance Report" />
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

                    <p className="companyReport">Trial Balance Report</p>

                  </div>

                  <Paper>
                    {expand === false ?<TableContainer>
                      <Table>
                        <TableHead style={{ color: 'black' }}>
                          <TableRow>
                            <TableCell size="small" align="left"><strong>LedgerName</strong></TableCell>
                            <TableCell size="small" align="center"><strong>Debit</strong></TableCell>

                            <TableCell size="small" align="center"><strong>Credit</strong></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {records.length !==0 &&
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
                            <TableCell size="small" align="left">TOTAL</TableCell>
                            <TableCell size="small" align="center"><strong>{drtotal}</strong></TableCell>
                            <TableCell size="small" align="center"><strong>{crtotal}</strong></TableCell>
                          </TableRow>

                        </TableBody>
                      </Table>
                    </TableContainer> :
                    (
<div>
                     <h1>Trial Report</h1>
                     <table className="tree-table">
                         <thead>
                             <tr>
                                 <th>Account</th>
                                 <th>Dr</th>
                                 <th>Cr</th>
                             </tr>
                         </thead>
                         <tbody> {
                             records.map((item) => (
                                 <Tree key={
                                         item.id
                                     }
                                     node={item}
                                     depth={1}/>
                             ))
                         } </tbody>
                     </table>
                     </div>
                    )}
                  </Paper>
                </div>
              </div>
            </Card>
          </Grid>
        </Grid>

      
    </div>

  )

}
