// import React,{useState,useEffect,} from "react";
// import {  Link} from "react-router-dom";
// import axios from "axios";
// import Select from 'react-select';

// import Spinner from "../../utils/spinner";
// import { toast } from "react-toastify";
// // Material UI
// import { makeStyles } from "@material-ui/core/styles";
// import Grid from "@material-ui/core/Grid";
// import Card from "@material-ui/core/Card";

// import CardHeader from "@material-ui/core/CardHeader";
// import Divider from "@material-ui/core/Divider";
// import CardContent from '@mui/material/CardContent';
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
// import Paper from "@material-ui/core/Paper";
// import TableContainer from "@material-ui/core/TableContainer";
// import Button from "@material-ui/core/Button";
// import Box from "@material-ui/core/Box";
// //import Select from "@material-ui/core/Select";
// import { useHistory } from "react-router-dom";
// import TextField from "@material-ui/core/TextField";

// import UserSessionContext from "../../contexts/UserSessionContext";
// import { useForm, Form } from "../../components/home/useForm";
// import config from '../../utils/config';
// import Controls from '../controls/Controls';
// import { format } from "date-fns";
// import CompanyContext from "../../contexts/CompanyContext";
// import AddCircleIcon from '@mui/icons-material/AddCircle';
// import Tooltip from '@mui/material/Tooltip';
// import SaveIcon from '@mui/icons-material/Save';
// import CloseIcon from "@material-ui/icons/Close";
// import DeleteIcon from "@material-ui/icons/Delete";
// import AddIcon from "@mui/icons-material/Add";
// const useStyles = makeStyles((theme) => ({
//     header: {
//       backgroundColor: "white",
//       color: "#546e7a",
//       justifyContent: "left",
//       padding: "10px 5px",
//       fontWeight: "bold"
//     },
//     content: {
//       padding: 0
//     },
//     status: {
//       marginRight: "5px"
//     },
//     actions: {
//       justifyContent: "flex-end"
//     },
//     summaryTable: {
//       width: "auto",
//       marginBottom: "10px",
//       pointerEvents: "none"
//     },
//     noBorder: {
//       border: "none"
//     },
//     denseCell: {
//       padding: "5px"
//     },
//     formControl: {
//       margin: theme.spacing(1),
//       minWidth: 120
//     },
//     inputGroup:{
//       marginBottom:theme.spacing(2),
//     },

//   }));
//   const initialValues = [
//         {
//         ledgerName: "",
//         dr_cr: "",
//         amount: "",

//         }
//     ];

//   const AccountRow = props =>{

//     const classes = useStyles();
//     const [ledgerid, setLedgerid] = React.useState([])
//     const [debit, setDebit] = React.useState( props.data["dr_cr"]?.toLowerCase() === "dr"? props.data.amount: "" )
//     const [credit, setCredit] = React.useState( props.data["dr_cr"]?.toLowerCase() === "cr"? props.data.amount: "" )
//      // const [accountName, setAccountName] = React.useState([]);
//     // const [accountName, setAccountName] = React.useState( ()=>{
//     //   let _coaname = props.data["ledgerName"] || ""
//     //   // return "Bank"
//     //   console.log (_coaname)
//     //   let _id =  props.categoryList.filter( x => {return x["title"].toUpperCase() === _coaname.toUpperCase() } ) && null
//     //   console.log(_id[0]["id"])
//     //    return _id[0]["id"]
//     // })
//     //console.log(accountName)
//     const coas= props.categoryList;

//   return <tr className={classes.inputGroup}  hover>
//         {/* <td width="100px">
//             <Select
//               value={ledgerid}
//               onChange={setledgerid}

//                options={coas}

//            />
//         </td> */}
//         <td width="200px">
//         <Select
//           options={coas}
//           value={ledgerid}
//           onChange={setLedgerid}
//         />
//       </td>
//          <td width="100px">
//           <input
//                   type="number"
//                   value={debit}
//                 onChange={e=>{
//                   setDebit(e.target.value)
//                   setCredit(0)
//                 }}
//                 // onKeyPress={e => {
//                 //   if (e.key === 'Enter') {
//                 //     addRow()
//                 //   }
//                 //   }}

//               />
//           </td>
//           <td width="100px">
//               <input
//                 onChange={e=>{
//                   setCredit(e.target.value)
//                   setDebit(0)

//                  }}
//                 type="number"
//                 value={credit}

//               />
//           </td>
//     <td>

//            <Controls.ActionButton
//                   size="small"
//                   variant="contained"
//                   color="danger"
//                   onClick={(e) => {

//                     if (ledgerid === "" || debit === "" || credit === "") {
//                       return toast.warn("Please Enter Data");
//                     } else {
//                       props.addRow({
//                         coaId: ledgerid.value,
//                         ledgerName: ledgerid.label,
//                         dr_cr: debit === 0 ? "cr" : "dr",
//                         amount: parseFloat(debit === 0 ? credit : debit),
//                         transactionid: "",
//                         jtId: "",
//                         flowId: "",
//                       });
//                     }
//                     // setLedgerid("");
//                     // setDebit("");
//                     // setCredit("");
//                   }}
//                 ><Tooltip title="Add">
//                   <AddIcon style={{ fontSize: "15px" }} />
//                   </Tooltip>
//                 </Controls.ActionButton>
//               </td>
//            <td>
//                 <Controls.ActionButton
//                   size="small"
//                   variant="contained"
//                   color="danger"
//                   onClick={(e) => {
//                     console.log(props.index)
//                   let dat=props.data
//                     // let _data = props.data.filter((item) => {
//                     //   return item !== props.index;

//                       const fil=[{...dat}]
//                       fil.splice(props.index,1);
//                       props.setData(fil)
//                     // });

//                     // props.setData(_data);
//                   }}
//                 > <Tooltip title="Delete">
//                   <DeleteIcon style={{ fontSize: "15px" }} />
//                   </Tooltip>
//                 </Controls.ActionButton>
//               </td>
//           {/* <Controls.ActionButton
//                        color="secondary"
//                       onhover="open"
//                       onClick={() => {

//                       }}
//                     >
//                       <DeleteIcon fontSize="small" />
//                     </Controls.ActionButton> */}

//       </tr>

//   }
//   const initialFValues = {

//     accountingDate: format(new Date(), "yyyy-MM-dd"),

//   };
// export default function JournalDynamic(props) {
//   const userSessionContext = React.useContext(UserSessionContext);
//   const companyContext = React.useContext(CompanyContext);
//   const [data, setData] = useState([initialValues]);
//  // const [values, setValue] = React.useState(new Date());
//   const { values, setValues, handleInputChange } = useForm(initialFValues);
//   const [journalSaveStatus, setJournalSaveStatus] = useState(0);
//   const [editdata, setEditData] = useState([]);
//  const [edit, isEdit] = useState(false);
//   const [reference, setreference] = useState("");
//   const [journalname, setjournalname] = useState("");
//   const [remarks, setremarks] = useState([]);
//   const [categoryList, setCategoryList] = useState([]);
//   const [serial, setSerial] = useState("");
//   const [flowId, setFlowId] = React.useState(() =>
//     Math.floor(100000 + Math.random() * 900000).toString()
//   );
//   const companyFiscalyear =  companyContext.fiscal[0]["fiscalYear"];

//   let history = useHistory();
// const [transid, settransid] = useState("");
// const [open, setOpen] = React.useState(99);
// const DeleteRow=(idx)=>{
//   const fil=[...data]
//   fil.splice(idx,1);
//   setData(fil)
//     }

//   const companyId = companyContext.company.id;

//     const classes = useStyles();

//     useEffect(() => {
//       Journalcoa();
//     }, []);
//     const Journalcoa = (props) => {

//       axios
//         .get(`${config.APP_CONFIG}/Account/COAChild/ledger`, {
//           headers: { Authorization: userSessionContext.token },
//         })
//         .then((res) => {
//           if (res.data.status_code === 401) {
//             userSessionContext.handleLogOut();
//           } else if (res.data.status_code === 200) {
//             let categoryList = res.data.msg.map((item) => ({
//               value: item.id,
//               label: item.coaname,
//             }));

//             setCategoryList(categoryList);
//           } else {
//             toast.error("error");
//             setCategoryList([]);
//           }
//         })
//         .catch((err) => {
//           setCategoryList([]);
//         });
//     };
//     var accountingDate = format(new Date(values.accountingDate), "yyyy-MM-dd");
//     if (values.accountingDate  !== undefined) {
//       accountingDate  = format(new Date(values.accountingDate ), "yyyy-MM-dd");

//     }
//     console.log(data)

//     useEffect(() => {
//     axios.get(`${config.APP_CONFIG}/Account/LedgerReport/api/${accountingDate}`, {
//         headers: { Authorization: userSessionContext.token },
//       })
//       .then((res) => {
//         if (res.data.status_code === 401) {
//           userSessionContext.handleLogOut();
//         } else if (res.data.status_code === 200) {
//           setSerial(res.data.msg)
//           let Date1= format(new Date(values.accountingDate), "yyyy-MM-dd").substring(5,10);

//           var trans="JV"+"-"+companyFiscalyear +"/"+Date1+"/"+res.data.msg;
//           settransid(trans);

//         } else {
//           toast.error("error");
//           setSerial([]);
//         }
//       })
//       .catch((err) => {
//         setSerial([]);
//       });

//     }, [accountingDate]);

//     const Addjournal = () => {

//         const dr_total_list = data.filter((x) => {
//           return x["dr_cr"].toLowerCase() === "dr";
//         });
//         const dr_total = dr_total_list.reduce(
//           (drtotal, obj) => obj.amount + drtotal,
//           0
//         );
//         const cr_total_list = data.filter((x) => {
//           return x["dr_cr"].toLowerCase() === "cr";
//         });
//         const cr_total = cr_total_list.reduce(
//           (crtotal, obj) => obj.amount + crtotal,
//           0
//         );

//         if (dr_total !== cr_total) {
//           toast.error("Debit and credit should be Balanced");

//         } else if (journalname === "" ||reference===""|| remarks === "") {
//           toast.error("Please Fill All Fields");
//         } else {
//           let journal_entry_transaction = {
//             transactionid: transid,
//             reference: reference,
//             accountingDate:accountingDate,
//             journalName: journalname,
//             narration: remarks,
//             companyId: companyContext.company.id,
//             fiscalYear: companyFiscalyear,
//             monthlyInc:serial,
//             journalType:"JV",

//           };

//           axios
//             .post(
//               `${config.APP_CONFIG}/Account/Journal/journalTransaction`,
//               journal_entry_transaction,
//               { headers: { Authorization: userSessionContext.token } }
//             )
//             .then((res) => {
//               if (res.data.status_code === 200) {
//                 //setJournalSaveStatus(1);   // set status one and it disables save button to saved
//                 const journal_data = data.map((i) => {
//                   return {
//                     ...i,
//                     transactionid: transid,
//                     remarks: "no remark",
//                     companyId: companyContext.company.id,
//                     jtId: res.data.msg,
//                     flowId: flowId,
//                   };
//                 });
//                 axios
//                   .post(`${config.APP_CONFIG}/Account/Journal/Api`, journal_data, {
//                     headers: { Authorization: userSessionContext.token },
//                   })
//                   .then((es) => {
//                       if(es.data.status_code === undefined){
//                           return <Spinner/>
//                       }
//                     if (es.data.status_code === 200) {
//                       toast.success("Sucessfully added journal");
//                     history.push(`/accounting/journal-entries-table`);
//                     } else if (es.data.status_code === 401) {
//                       userSessionContext.handleLogout();
//                     } else {
//                       toast.error("Warning");
//                     }
//                   })
//                   .catch((err) => {
//                     toast.error("Error");
//                   });
//               }
//             })
//             .catch((err) => {
//               toast.error("Error cannot return journal transaction");
//             });
//         }
//       };

//     if (data === undefined || categoryList === undefined) {
//       return <Spinner />;
//     }
//     const updatereference= (e) => {
//       setreference(e.target.value);
//     };
//     const updateremarks= (e) => {
//       setremarks(e.target.value);
//     };

//     const updatejournal = (e) => {
//       setjournalname(e.target.value);
//     };

//     const addRow = (row) => {
//         setData([...data, row])
//     }
//   //   const DeleteRow = (idx) => {

//   //     let _data = data.filter((item) => {
//   //       return item !== idx;
//   //     })
//   //     setData([...data, idx])
//   // }

//     return (
//     <div>
//     <Grid container direction="row">
//     <Grid item lg={12} md={12} xs={12}>
//       <Card>
//         <CardHeader
//           className={classes.header}
//           title={"Journal:"+transid.toString()}
//           classes={{ title: classes.header }}
//         />

//         <Divider />
//         <div className="container-fluid">
//           <div  className="row g-6">
//             <label htmlFor="text"  style={{text:"Bold",font:"Bold",fontSize:"13px"}}className="col-sm-1 col-form-label">
//               Reference:

//             </label>
//       <div  className="col-md-4">
//              {/* <span >{transid}</span>  */}

//                <input
//                 className="form-control"
//                 name="reference"
//                 value={reference}
//                  onChange={updatereference}
//               />

//              </div>
//             <label htmlFor="text" className="col-sm-1 col-form-label">
//               Name
//             </label>
//             <div className="col-md-5">
//               <input
//                 type="text"
//                 className="form-control"
//                 name="journalname"
//                 defaultValue={"General"}
//                 value={journalname}
//                 onChange={updatejournal}
//               />
//             </div>

//                 <Grid item xs={6}>
//                 <Controls.DatePicker
//                           name="accountingDate"
//                           label="Date"
//                           value={values.accountingDate}
//                           onChange={ handleInputChange}
//                       />
//                       </Grid>
//                       </div>
//             </div>
//                </Card>
//                </Grid>
//         </Grid>

//               <Paper>
//               <Box sx={{ height: 'auto'}} mt={3} mx={3}>

//               <table className="table table-fluid">
//         <tr>
//           <th>LedgerName</th>

//           <th>Debit</th>
//           <th>Credit</th>
//           <th>Actions</th>
//         </tr>

//                     <>
//                       {[...data].map((row, index) => {

//                         return (
//                           <AccountRow
//                             setData={addRow}
//                             data={row}
//                             index={index}
//                             categoryList={categoryList}
//                             // deleteRow={(e) => {
//                             //   let _data = data.filter((item) => {
//                             //     return item !== idx;
//                             //   })
//                             //   setData(_data);

//                             // }}
//                             // addRow={(e) => {
//                             //   setData([...data, e]);
//                             // }}
//                           />
//                         );
//                       })}

//                    </>
//                     </table>
//     </Box>

//               </Paper>

//       <CardContent>
//         <div class="input-group">
//           <div class="input-group-prepend">
//             <span class="input-group-text">Narration</span>
//           </div>
//           <textarea
//             class="form-control"
//             name="remarks"
//             value={remarks}
//             onChange={updateremarks}
//             aria-label="With textarea"
//           ></textarea>
//         </div>

//         <Controls.Button
//           type="submit"
//           text="Save"
//           onClick={(e) => {
//             e.preventDefault();
//             if (data === undefined || data === null || data.length === 0) {
//               toast.warn("Please Enter Product First");
//             } else {
//               Addjournal();
//             }
//           }}
//         />

//                              <Controls.Button
//                                     text="Cancel"
//                                     color="default"
//                                     onClick={
//                                     <Link
//                                       to="/accounting/journal-entries-table"
//                                       className="btn btn-danger float-right"
//                                     >

//                                     </Link>
//                                     }
//                                 />

//                        </CardContent>
//       </div>

//   );
// }

/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

// import Alert from '@material-ui/lab/Alert';
import Spinner from "../../utils/spinner";
import { toast } from "react-toastify";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";

import CardContent from "@mui/material/CardContent";
import Divider from "@material-ui/core/Divider";
import { format } from "date-fns";

import UserSessionContext from "../../contexts/UserSessionContext";

import config from "../../utils/config";
import Controls from "../controls/Controls";

import CompanyContext from "../../contexts/CompanyContext";

import PrintIcon from "@mui/icons-material/Print";
import ReactToPrint from "react-to-print";

//import ReactExport from "react-export-excel";
import NepaliDate from "../../utils/NepaliDate";
const useStyles = makeStyles((theme) => ({
  header: {
    color: "#546e7a",
    justifyContent: "left",
    padding: "10px 5px",
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

export default function JournalEntriesPage(props) {
  const componentRef = React.useRef(null);
  const userSessionContext = React.useContext(UserSessionContext);
  const companyContext = React.useContext(CompanyContext);
  const [records, setRecords] = useState([]);

  const [Tdata, setTdata] = useState([]);
  const [TNdate, setTNdate] = useState([]);
  const companyId = companyContext.company.id;
  const company = companyContext.company.name;

  let history = useHistory();
  const classes = useStyles();

  var adbs = require("ad-bs-converter");

  useEffect(() => {
    load_journal_transaction_by_id();
  }, []);

  const load_journal_transaction_by_id = () => {
    axios
      .get(
        `${config.APP_CONFIG}/Account/JournalDetails/Api/${props.data.id}`,
        { headers: { Authorization: userSessionContext.token } }
      )
      .then((res) => {
        if (res.data.status_code === 200) {
          if(res.data.msg.length<1){
            toast.warn("No Records")
          }
          else{

         
          let temp = res.data.msg;
          setRecords(temp.journalEntry);
          setTdata(temp.transactionData);
        }
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogout();
        } else {
          toast.error("Warning");
          setRecords([]);
        }
      })
      .catch((err) => {
        toast.error("Failed To Load Data");

        setRecords([]);
      });
  };

  const dr_total = records
    .filter((x) => {
      return x["dr_cr"].toLowerCase() === "dr";
    })
    .reduce((drtotal, obj) => obj.amount + drtotal, 0);
  const cr_total = records
    .filter((x) => {
      return x["dr_cr"].toLowerCase() === "cr";
    })
    .reduce((crtotal, obj) => obj.amount + crtotal, 0);

    if (records === undefined) {
      return <Spinner />;
    }
   
  return (
    <>
      {records.length !== 0 ? (
        <div style={{textAlign: "right"}}>
            <ReactToPrint
          
              trigger={()=> <Controls.Button
              text="Print"
              variant="outlined"
              startIcon={<PrintIcon />}
              className="printBtn"
            />}
            content={() => componentRef.current}
          />
          </div>
      ) : null}
      {records.length !== 0 ? (
        <div ref={componentRef} className="salesReturnReport">
        <div className="jreportPage">
          <div>
          <div className="reportHeader">
            <p className="companyName">{companyContext.company.name||""}</p>
            <p className="companyAddress">
                  {companyContext.company.address || ""}
                </p>
            <p className="companyPan">
              Pan No : {companyContext.company.panNo||""}
            </p>
            <p className="companyPan">
              Fiscal Year : {companyContext.fiscal[0].fiscalYear||""}
            </p>
            <p className="companyReport">Journal Details</p>
            <div className="date">
              <p>Transaction Id: {props.data.transactionid||""}</p>
              <div style={{display:"grid"}}>
              <p>
                Date:{" "}
                {format(
                  new Date(props.data.accountingDate||""),
                  "yyyy-MM-dd"
                ).toString()}
              </p>
              <p>Nepali Date :{NepaliDate(props.data.accountingDate)}</p>

              </div>
            
             
            </div>
           
          </div>

          <table className="table table-fluid journal-entry-table">
            <thead>
              <tr>
                <th style={{ width: "45px" }}>S.No.</th>
                <th>LedgerName</th>
                <th>Debit</th>
                <th>Credit</th>
              </tr>
            </thead>
            <tbody>
              {records &&
                records.map((row, idx) => (
                  <tr key={idx}>
                    <td style={{ width: "45px", textAlign: "center" }}>
                      {idx + 1}
                    </td>
                    <td>{row.ledgerName}</td>
                    <td>
                      {row.dr_cr?.toLowerCase() === "dr" ? row.amount : 0}
                    </td>
                    <td>
                      {row.dr_cr?.toLowerCase() === "cr" ? row.amount : 0}
                    </td>
                  </tr>
                ))}
              <tr>
                <td
                  colSpan={2}
                  style={{ fontWeight: "600", textAlign: "center" }}
                >
                  Total
                </td>
                <td style={{ fontWeight: "600" }}>{dr_total}</td>
                <td style={{ fontWeight: "600" }}>{cr_total}</td>
              </tr>
            </tbody>
          </table>
          <Card variant="outlined">
            <CardContent>
              <div className="input-group journal-tab1">
                <div className="input-group" style={{ alignItems: "center" }}>
                  <div className="input-group-prepend">
                    <span className="input-group-text" style={{paddingLeft: "0"}}>Narration :</span>
                  </div>
                  <p style={{ marginBottom: "0" }}>Narration :
                    {props.data.narration !== undefined
                      ? props.data.narration
                      : null}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          </div>
          <div style={{display:'flex', justifyContent: 'space-between', marginTop: '35px', alignContent:'center'}}>
<div style={{width:'200px', textAlign:'center'}}>    
<span>-------------------</span><br />

<span>Prepared By:</span><br />

</div>
<div style={{width:'200px', textAlign:'center'}}>
<span>-------------------</span><br />
<span>Approved By:</span><br />
</div>
</div>
<div style={{width:'300px', textAlign:'left',marginTop: '5px'}}>

  <p className="date-time">Printed on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()} by {localStorage.getItem('user')} </p>
</div>
        </div>
        </div>
      ) : (
        <div>
          <p>No records to Display</p>
        </div>
      )}
    </>
  )
}
