// import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";

// import axios from "axios";
// import Select from "react-select";

// //import Spinner from "../../utils/spinner";
// import { toast } from "react-toastify";
// // Material UI
// import { makeStyles } from "@material-ui/core/styles";
// import Grid from "@material-ui/core/Grid";
// import Card from "@material-ui/core/Card";
// import CardHeader from "@material-ui/core/CardHeader";
// import Divider from "@material-ui/core/Divider";
// //import TextField from "@material-ui/core/TextField";
// import UserSessionContext from "../../contexts/UserSessionContext";
// import config from "../../utils/config";
// import Controls from "../controls/Controls";
// import { useForm, } from "../../components/home/useForm";
// import { format } from "date-fns";
// //import DeleteIcon from "@material-ui/icons/Delete";
// import CompanyContext from "../../contexts/CompanyContext";
// //import AddIcon from "@mui/icons-material/Add";
// const useStyles = makeStyles((theme) => ({
//   header: {
//     backgroundColor: "white",
//     color: "#546e7a",
//     justifyContent: "left",
//     padding: "10px 5px",
//     fontWeight: "bold",
//   },
//   content: {
//     padding: 0,
//   },
//   status: {
//     marginRight: "5px",
//   },
//   actions: {
//     justifyContent: "flex-end",
//   },
//   summaryTable: {
//     width: "auto",
//     marginBottom: "10px",
//     pointerEvents: "none",
//   },
//   noBorder: {
//     border: "none",
//   },
//   denseCell: {
//     padding: "5px",
//   },
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120,
//   },
//   inputGroup: {
//     marginBottom: theme.spacing(1),
//   },
// }));
// // const generatetransid = () =>
// //   Math.floor(1000 + Math.random() * 9000).toString();

// // const AccountRow = (props) => {
// //   const generatetransid = () =>
// //     Math.floor(1000 + Math.random() * 9000).toString();
// //   console.log(props.data || []);
// //   // const classes = useStyles();
// //   const [ledgerid, setLedgerid] = React.useState([]);
// //   const [debit, setDebit] = React.useState(
// //     props.data["dr_cr"]?.toLowerCase() === "dr" ? props.data.amount : 0 || 0
// //   );
// //   const [credit, setCredit] = React.useState(
// //     props.data["dr_cr"]?.toLowerCase() === "cr" ? props.data.amount : 0
// //   );
// //   const [accountName, setAccountName] = React.useState([]);
// //   const [flowId, setFlowId] = React.useState("");

// //   const [transactionid, setTransactionid] = React.useState("");
// //   const [jtId, setJtId] = React.useState("");
// //   // const addRow = ()=>{
// //   // let _row =  {
// //   //     ledgerName: accountName,
// //   //     dr_cr: debit=== 0?"cr": "dr",
// //   //     amount: debit=== 0? credit : debit ,
// //   //     }
// //   // props.setData(_row)

// //   let categorylist = props.categoryList;
// //   console.log(categorylist);
// //   // const categorylist = categoryList.map((item) => {
// //   // return {
// //   //     label: item.coaname,
// //   //     value: item.id,
// //   // };
// //   // })
// //   return (
// //     <tr hover>
// //       <td width="200px">
// //         <Select
// //           options={categorylist}
// //           value={ledgerid}
// //           // onChange={(e) => {
// //           //   console.log(e);
// //           //   setledgerid(e);
// //           onChange={setLedgerid}
// //           //}}
// //         />
// //       </td>
// //       <td width="100px">
// //         <input
// //           type="number"
// //           value={debit}
// //           onChange={(e) => {
// //             setDebit(e.target.value);
// //             setCredit(0);
// //           }}
// //           // onKeyPress={e => {
// //           //   // if (e.key === 'Enter') {
// //           //     props.addRow({
// //           //       ledgerName: ledgerid.label,
// //           //       dr_cr: debit=== 0?"cr": "dr",
// //           //       amount: debit=== 0? credit : debit ,
// //           //     });

// //           //   // }

// //           //   }}
// //         />
// //       </td>
// //       <td width="100px">
// //         <input
// //           onChange={(e) => {
// //             setCredit(e.target.value);
// //             setDebit(0);
// //           }}
// //           type="number"
// //           value={credit}
// //           // onKeyPress={e => {
// //           //   // if (e.key === 'Enter') {
// //           //     props.addRow({
// //           //       ledgerName: ledgerid.label,
// //           //       dr_cr: debit=== 0?"cr": "dr",
// //           //       amount: debit=== 0? credit : debit ,
// //           //     });
// //           //   // }

// //           //   }}
// //         />
// //       </td>
// //       <td>
// //         <Controls.ActionButton
// //           size="small"
// //           variant="contained"
// //           color="primary"
// //           onClick={(e) => {
// //             if (ledgerid && debit && credit === "") {
// //               return toast.warn("Empty Data");
// //             } else {
// //               props.addRow({
// //                 coaId: ledgerid.value,
// //                 ledgerName: ledgerid.label,
// //                 dr_cr: debit === 0 ? "cr" : "dr",
// //                 amount: parseInt(debit === 0 ? credit : debit),
// //                 transactionid: "",
// //                 jtId: jtId,
// //                 flowId: "",
// //               });
// //             }
// //             setLedgerid("");
// //             setDebit(0);
// //             setCredit(0);
// //           }}
// //         >
// //           <AddIcon style={{ fontSize: "15px" }} />
// //         </Controls.ActionButton>
// //       </td>
// //     </tr>
// //   );
// // };
// const initialFValues = {
  
//   accountingDate: format(new Date(), "yyyy-MM-dd"),

// };
// export default function PettyCashForm(props) {
//   let text = "Being Petty Cash Fund";
//   const userSessionContext = React.useContext(UserSessionContext);
//   const companyContext = React.useContext(CompanyContext);
//   const [data, setData] = useState([]);
//   //const [values, setValue] = React.useState(new Date());
//   const [transid, settransid] = useState("");
//   const { values, setValues, handleInputChange } = useForm(initialFValues);
//   const [serial, setSerial] = useState("");
//   const [reference, setreference] = useState("");
//   const [journalname, setjournalname] = useState("");
//   const [paymentModes, setPaymentModes] = useState();
//   const [payment, setPayment] = useState("");
//   const [description, setDescription] = useState("");
//   const [narration, setNarration] = useState("Being Petty Cash Fund");
//   const [coaNames, setCoaNames] = useState();
//   //const [pettyCashId, setPettyCashId] = useState();
//   const [flowId, setFlowId] = React.useState(() =>
//     Math.floor(10000 + Math.random() * 90000).toString()
//   );

//   const [amount, setAmount] = useState([]);
//   //const [transactionid, setTransactionid] = React.useState(() => Math.floor(10000 + Math.random() * 90000).toString());

//   const companyId = companyContext.company.id;
//   const companyFiscalyear =  companyContext.fiscal[0]["fiscalYear"];
//   let history = useHistory();
//   const classes = useStyles();

//   // useEffect(() => {
//   //     JournalTbl();
//   // },[])

//   var accountingDate = format(new Date(values.accountingDate), "yyyy-MM-dd HH:mm:ss");
//   if (values.accountingDate  !== undefined) {
//     accountingDate  = format(new Date(values.accountingDate ), "yyyy-MM-dd");
    
//   }  
//   // var Date1 = new Date(values.accountingDate)
//   //  var getmonth=Date1.getMonth() ;
//   //  console.log(getmonth)
//   useEffect(() => {
//   axios.get(`${config.APP_CONFIG}/Account/LedgerReport/api/${accountingDate}`, {
//       headers: { Authorization: userSessionContext.token },
//     })
//     .then((res) => {
//       if (res.data.status_code === 401) {
//         userSessionContext.handleLogOut();
//       } else if (res.data.status_code === 200) {
//         setSerial(res.data.msg)
//         let Date1= format(new Date(values.accountingDate), "yyyy-MM-dd").substring(5,10);

//         var trans="PC"+"-"+companyFiscalyear +"/"+Date1+"/"+res.data.msg;
//         settransid(trans);


//       } else {
//         toast.error("error");
//         setSerial([]);
//       }
//     })
//     .catch((err) => {
//       setSerial([]);
//     });


//   }, [accountingDate]);
//   const coas = [
//     { id: 11, coaName: "cash" },
//     { id: 2, coaName: "Bank" },
//   ];
//   const coa = coas.map((item) => {
//     return {
//       label: item.coaName,
//       value: item.id,
//     };
//   });

//   useEffect(() => {
//     loadPaymentMode();
//   }, []);

//   useEffect(() => {
//     axios
//       .get(`${config.APP_CONFIG}/Account/COA/api`, {
//         headers: {
//           Authorization: userSessionContext.token,
//         },
//       })
//       .then((res) => {
//         if (res.data.status_code === 401) {
//           userSessionContext.handleLogOut();
//         } else if (res.data.status_code === 200) {
//           let coaList = res.data.msg.map((item) => ({
//             value: item.id,
//             label: item.coaname,
//           }));

//           // categoryList = [{ id: 0, title: 'Select' }].concat(categoryList);

//           setCoaNames(coaList);
//         } else {
//           toast.error("error");
//           setCoaNames([]);
//         }
//       })
//       .catch((err) => {
//         setCoaNames([]);
//       });
//   }, []);

//   const loadPaymentMode = () => {
//     axios
//       .get(
//         `${config.APP_CONFIG}/Account/COAPaymentMode/api`,

//         {
//           headers: { Authorization: userSessionContext.token },
//         }
//       )
//       .then((res) => {
//         if (res.data && res.data.status_code && res.data.status_code === 200) {
//           let temp = res.data.msg.map((name, index) => ({
//             label: name.name,
//             value: name.id,
//           }));
//           setPaymentModes(temp);
//         } else {
//           toast.error(res.data.msg || "Cannot load Payment Mode");
//           setPaymentModes([]);
//         }
//       })
//       .catch((err) => {
//         toast.error("Failed to Load Payment Mode");
//         setPaymentModes([]);
//       });
//   };

//   const updatereference = (e) => {
//     setreference(e.target.value);
//   };
//   const updateDescription = (e) => {
//     setDescription(e.target.value);
//   };

//   const updateNarration = (e) => {
//     setNarration(e.target.value);
//   };

//   const updateAmount = (e) => {
//     setAmount(e.target.value);
//   };

//   const updatejournal = (e) => {
//     setjournalname(e.target.value);
//   };
//   // const updatetrans = (e) => {
//   //   settransid(e.target.value);
//   // };

//   const Addjournal = () => {
//     // //const generateflowid=()=>Math.floor(10000+Math.random()*90000).toString();
//     // console.log(data);
//     // // let dr_total = data.filter(x => {return x["dr_cr"].toLowerCase() === 'dr'} ).reduce((x,y) => {return x["amount"] + y["amount"]})
//     // const dr_total_list = data.filter((x) => {
//     //   return x["dr_cr"].toLowerCase() === "dr";
//     // });
//     // const dr_total = dr_total_list.reduce(
//     //   (drtotal, obj) => obj.amount + drtotal,
//     //   0
//     // );
//     // console.log(dr_total);
//     // const cr_total_list = data.filter((x) => {
//     //   return x["dr_cr"].toLowerCase() === "cr";
//     // });
//     // console.log(cr_total_list);
//     // const cr_total = cr_total_list.reduce(
//     //   (crtotal, obj) => obj.amount + crtotal,
//     //   0
//     // );
//     // // const crtotal=creditList.reduce((total, obj) => obj.amount + total,0)
//     // console.log(cr_total);
//     // console.log(dr_total);

//     // if (dr_total !== cr_total) {
//     //   toast.error("Debit and credit should be Balanced");
//     //   // return false
//     // } else {
//       // let accountingDate = format(new Date(values.accountingDate), "yyyy-MM-dd HH:mm:ss");
//       // if (values.accountingDate  !== undefined) {
//       //   accountingDate  = format(new Date(values.accountingDate ), "yyyy-MM-dd");
        
//       // }
//       // let Date1= format(new Date(values.accountingDate), "yyyy-MM-dd").substring(5,10);
//       // const trans="PC"+companyFiscalyear +"/"+Date1+"/"+serial;


// if (amount===""||description===""){
//   toast.warn("Please Add Amount")
// }
// else{
//     let narr = narration.concat(description);
//     let journal_entry_transaction = {
//       // "transactionid": generatetransid(),
//       transactionid: transid,
//       reference: description,
//       accountingDate: values,
//       journalName: "Petty Cash Journal",
//       narration: narration,
//       companyId: companyContext.company.id,
//       fiscalYear: companyFiscalyear,
//       monthlyInc:serial,
//       journalType:"PC"
//     };

//     axios
//       .post(
//         `${config.APP_CONFIG}/Account/Journal/journalTransaction`,
//         journal_entry_transaction,
//         {
//           headers: { Authorization: userSessionContext.token },
//         }
//       )
//       .then((res) => {
//         if (res.data.status_code === 200) {
//           // const journal_data = data.map((i) => {
//           //   return {
//           //     ...i,
//           //     transactionid: transactionid,
//           //     remarks: "no remark",
//           //     companyId: companyContext.company.id,
//           //     jtId: res.data.msg,
//           //     flowId: flowId,
//           //   };
//           // });

//           const journal_data = [
//             {
//               coaId: 178,
//               ledgerName: "Petty Cash",
//               dr_cr: "dr",
//               amount: parseFloat(amount),
//               transactionid: transid,
//               jtId: res.data.msg,
//               flowId: flowId,
//               remarks: description,
//               companyId: companyContext.company.id,
//             },
//             {
//               coaId: payment.value,
//               ledgerName: payment.label,
//               dr_cr: "cr",
//               amount: parseFloat(amount),
//               transactionid: transid,
//               jtId: res.data.msg,
//               flowId: flowId,
//               remarks: description,
//               companyId: companyContext.company.id,
//             },
//           ];
 
//           axios
//             .post(`${config.APP_CONFIG}/Account/Journal/Api`, journal_data, {
//               headers: { Authorization: userSessionContext.token },
//             })
//             .then((es) => {
//               if (es.data.status_code === 200) {
//                 toast.success("Sucessfully added journal");
//                 history.push(`/accounting/petty_cash_table`)
//               } else if (es.data.status_code === 401) {
//                 userSessionContext.handleLogout();
//               } else {
//                 toast.error("Warning");
//               }
//             })
//             .catch((err) => {
//               toast.error("Error ");
//             });
//         }
//       })
//       .catch((err) => {
//         toast.error("Error cannot return journal transaction");
//       });
//   };
// }

//   const coaName = [{ coaNames }];
//   return (
//     <div
//       className="content-wrapper iframe-mode"
//       data-widget="iframe"
//       data-loading-screen={750}
//     >
//       <Grid container direction="row">
//         <Grid item lg={12} md={12} xs={12}>
//           <Card>
//             <CardHeader
//               className={classes.header}
//               title={"PettyCash :"+transid.toString()}
//               classes={{ title: classes.header }}
//             />

//             <Divider />
//             <div className="container-fluid ">
//               <div className="row g-3">
//                 {/* <label htmlFor="text" className="col-sm-1 col-form-label">
//                   Reference no:
//                 </label>
//                 <div className="col-md-4">
//                   <input
//                     className="form-control"
//                     name="reference"
//                     value={reference}
//                     onChange={updatereference}
//                   />
//                 </div> */}
//                 {/* <label htmlFor="text" className="col-sm-1 col-form-label">
//                   Journal name
//                 </label>
//                 <div className="col-md-4">
//                   <input
//                     type="text"
//                     className="form-control"
//                     name="journalname"
//                     value={journalname}
//                     onChange={updatejournal}
//                   />
//                 </div> */}

//                 {/* <div className="col-md-3">
//                                     <input type="text" className="form-control" name="transid"
//                                         value={transid}
//                                         onChange={updatetrans}/>
//                                 </div> */}
//                 <Grid item xs={6}>
//                 <Controls.DatePicker
//                           name="accountingDate"
//                           label="Date"
//                           value={values.accountingDate}
//                           onChange={ handleInputChange}
//                       />
//                 </Grid>
//               </div>
//             </div>
//             <div>
//               <label htmlFor="text" className="col-sm-0 pl-20">
//                 Amount:
//               </label>
//               <input
//                 size={5}
//                 type="number"
//                 min={1}
//                 value={amount}
//                 step="0.1"
//                 onKeyDown={(e) =>
//                   (e.keyCode === 69 ||
//                     e.keyCode === 190 ||
//                     e.keyCode === 187) &&
//                   e.preventDefault()
//                 }
//                 onChange={(e) => {
//                   setAmount(e.target.value);
//                 }}
//                 style={{ width: "100px" }}
//               />
//               <label htmlFor="text" className="col-sm-0 col-form-label pl-20 ">
//                 Payment:
//               </label>
//               <label htmlFor="text" className="col-sm-4 col-form-label pl-20 ">
//                 <Select
//                   className="col-sm-7 "
//                   options={paymentModes}
//                   value={payment}
//                   onChange={setPayment}
//                 ></Select>
//               </label>
        
//             <div>
//               <label htmlFor="text" className="col-sm-5 col-form-label pl-20">
//                 Description:
//                 <textarea
//                   className="form-control"
//                   name="description"
//                   value={description}
//                   onChange={updateDescription}
//                   aria-label="With textarea"
//                 ></textarea>
//               </label>
//             </div>
//             </div>
//             {/* <div className="col-md-1">
//                   <input
//                     type="text"
//                     className="form-control"
//                     name="amount"
//                     value={amount}
//                     onChange={setAmount}
//                   />
//                 </div> */}
//           </Card>
//         </Grid>
//       </Grid>

//       {/* <table className="table table-fluid">
//         <tr>
//           <th>LedgerName</th>
//           <th>Debit</th>
//           <th>Credit</th>
//           <th>Actions</th>
//         </tr>

//         {data.map((row, idx) => {
//           return (
//             <tr key={idx}>
//               <td>{row.ledgerName}</td>

//               <td>{row.dr_cr?.toLowerCase() === "dr" ? row.amount : 0}</td>

//               <td>{row.dr_cr?.toLowerCase() === "cr" ? row.amount : 0}</td>
//               <td>
//                 <Controls.ActionButton
//                   size="small"
//                   variant="contained"
//                   color="danger"
//                   onClick={(e) => {
//                     let _data = data.filter((item) => {
//                       return item.id !== row.id;
//                     });
//                     setData(_data);
//                   }}
//                 >
//                   <DeleteIcon style={{ fontSize: "15px" }} />
//                 </Controls.ActionButton>
//               </td>
//             </tr>
//           );
//         })}

//         <AccountRow
//           data={data}
//           setData={setData}
//           //data={row}
//           addRow={(e) => {
//             console.log(e);
//             setData([...data, e]);

//             console.log(data);
//           }}
//           categoryList={categoryList}
//         />
//       </table> */}

//       {/* </Card>
//   <Card>

//   <CardHeader
//               className={classes.header}
//               title={"Narration"}
//               classes={{
//                 title: classes.header
//               }}
//             />
//                <Divider/> */}
//       {/* <div class="input-group">
//         <div class="input-group-prepend">
//           <span class="input-group-text">Narration</span>
//         </div>
//         <textarea
//           class="form-control"
//           name="remarks"
//           value={remarks}
//           onChange={updateremarks}
//           aria-label="With textarea"
//         ></textarea>
//       </div> */}

//       {/* </Card> */}
//       <div className="card-footer">
//         <div class="input-group">
//           <div class="input-group-prepend">
//             <span class="input-group-text">Narration</span>
//           </div>
//           <textarea
//             class="form-control"
//             name="naration"
//             defaultValue={"being"}
//             value={narration}
//             onChange={updateNarration}
//             aria-label="With textarea"
//           ></textarea>
//         </div>

//         <Controls.Button
//           type="submit"
//           text="Save"
//           onClick={(e) => {
//             e.preventDefault();
//             // if (data === undefined || data === null || data.length === 0) {
//             //   toast.warn("Please Enter Product First");
//             // } else {
//             Addjournal();
//             // }
//           }}
//         />
//         <Controls.Button text="Cancel" color="danger"
//                 onClick={() => {  history.push(`/accounting/petty_cash_table`) }}>

//                 </Controls.Button>
       
        
//          {/* <Link
//                 to="/accounting/journal-entries-table"
//                 className="btn btn-default float-right"
//               >
//                 Cancel
//               </Link> */}
//       </div>
//     </div>
//   );
// }
