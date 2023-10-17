import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import axios from "axios";
import Select from "react-select";
// import Alert from '@material-ui/lab/Alert';
import Spinner from "../../../utils/spinner";
import { toast } from "react-toastify";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";

import CardHeader from "@material-ui/core/CardHeader";
import CardContent from '@mui/material/CardContent';
import Divider from "@material-ui/core/Divider";
import Box from '@mui/material/Box';

import { format } from "date-fns";
import EditIcon from '@mui/icons-material/Edit';

import UserSessionContext from "../../../contexts/UserSessionContext";

import config from "../../../utils/config";
import Controls from "../../controls/Controls";
import { useForm } from "../../home/useForm";

import DeleteIcon from "@material-ui/icons/Delete";
import CompanyContext from "../../../contexts/CompanyContext";
import AddIcon from "@mui/icons-material/Add";
import Popup from "../../home/Popup";

import COAForm from "../COAForm";

import Tooltip from '@mui/material/Tooltip';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SaveIcon from '@mui/icons-material/Save';


const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: "white",
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


//const reload=()=>window.location.reload();

const AccountRow = (props) => {
  const [isNewPopup, setIsNewPopup] = useState(false);


  


  const [ledgerid, setLedgerid] = React.useState([]);
  const [debit, setDebit] = React.useState("");

  const [credit, setCredit] = React.useState("");


  // const [accountName, setAccountName] = React.useState( ()=>{
  //      let _coaname = props.editdata.ledgerName?.toLowerCase() || ""
  //      let _id =  props.categoryList.filter( x => {return x["title"]?.toLowerCase() === _coaname } ) || ""
  //      console.log(_id)
  //       return _id
  //    })
  //    console.log(accountName)
 
  const [id, setId] = React.useState(0);

  const userSessionContext = React.useContext(UserSessionContext);


  // useEffect(() => {
  //     LoadCOA();
  //   }, []);

  //   const LoadCOA = async () => {
  //     axios.get(`${config.APP_CONFIG}/Account/COA/api`,{ headers: { Authorization: userSessionContext.token,}},)
  //     .then((res) => {
  //       if (res.data.status_code === 401) {
  //         userSessionContext.handleLogOut();
  //       }  else if (res.data.status_code === 400) {
  //         toast.warn(res.data.msg);
  //       }else if (res.data.status_code === 200) {
  //         setRecords(res.data.msg);
  //       } else {
  //         toast.error("error");
  //         setRecords([]);
  //       }
  //     });
  //   };
  const Add_Coa = (data) => {
    axios
      .post(`${config.APP_CONFIG}/Account/COA/api`, data, {
        headers: { Authorization: userSessionContext.token },
      })
      .then((res) => {
        if (res.data.status_code === 200) {
          toast.success("Insert SuccessFull");
      

          
          props.Journalcoa();
        } else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogOut();
        } else {
          toast.error("Error Occurred");
        }
      })
      .catch((err) => {
        toast.error("Something Went Wrong");
      });

    setIsNewPopup(false);
  };

  // useEffect(() => {
  //     // const Journalcoa=()=>{

  //     axios.get(`${ config.APP_CONFIG }/Account/COAChild/ledger`, { headers: {Authorization: userSessionContext.token }})
  //     .then(res => {
  //         if (res.data.status_code === 401) {
  //             userSessionContext.handleLogOut()
  //         } else if (res.data.status_code === 200) {
  //             let categoryList = res.data.msg.map(item => ({value: item.id, label: item.coaname}));

  //             // categoryList = [{ id: 0, title: 'Select' }].concat(categoryList);

  //             setCategoryList(categoryList);

  //         } else {
  //             toast.error('error');
  //             setCategoryList([])

  //         }
  //     }).catch(err => {
  //         setCategoryList([])

  //     })

  // },[])

  // const addRow = ()=>{
  // let _row =  {
  //     ledgerName: accountName,
  //     dr_cr: debit=== 0?"cr": "dr",
  //     amount: debit=== 0? credit : debit ,
  //     }
  // props.setData(_row)

  let categorylist = props.categoryList;

  return (
    <tr hover>
      <td width="200px">
        <Select
          isClearable
          options={categorylist}
          value={ledgerid}
          styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
          menuPortalTarget={document.body}
          onChange={setLedgerid}
        />
      </td>
      <td>
        <Controls.ActionButton
          size="small"
          variant="contained"
          color="primary"
          onClick={() => {
            setIsNewPopup(!isNewPopup);
          }}
        >   <Tooltip title="Add Ledger" placement="top" arrow>
          <AddIcon style={{ fontSize: "20px" }} /></Tooltip>
        </Controls.ActionButton>
      </td>
      <td width="100px">
        <input
          type="number"
          value={debit}
          step="0.1"
          onChange={(e) => {
            setDebit(e.target.value);
            setCredit(0);
          }}
          onKeyDown={(e) =>
            (e.keyCode === 69 || e.keyCode === 190 || e.keyCode === 187) &&
            e.preventDefault()
          }
          // onKeyPress={e => {
          //   // if (e.key === 'Enter') {
          //     props.addRow({
          //       ledgerName: ledgerid.label,
          //       dr_cr: debit=== 0?"cr": "dr",
          //       amount: debit=== 0? credit : debit ,
          //     });

          //   // }

          //   }}
        />
      </td>
      <td width="100px">
        <input
          onChange={(e) => {
            setCredit(e.target.value);
            setDebit(0);
          }}
          type="number"
          step="0.1"
          value={credit}
          onKeyDown={(e) =>
            (e.keyCode === 69 || e.keyCode === 190 || e.keyCode === 187) &&
            e.preventDefault()
          }
          // onKeyPress={e => {
          //   // if (e.key === 'Enter') {
          //     props.addRow({
          //       ledgerName: ledgerid.label,
          //       dr_cr: debit=== 0?"cr": "dr",
          //       amount: debit=== 0? credit : debit ,
          //     });
          //   // }

          //   }}
        />
      </td>
      <td>
        <Controls.ActionButton
          size="small"
          variant="contained"
          color="primary"
          onClick={(e) => {
        
            if (ledgerid === "" || debit === "" || credit === "") {
              return toast.warn("Please Enter Data");
            } else {
              props.addRow({
                id:id,
                coaId: ledgerid.value,
                ledgerName: ledgerid.label,
                dr_cr: debit === 0 ? "cr" : "dr",
                amount: parseFloat(debit === 0 ? credit : debit),
                transactionid: "",
                jtId: "",
                flowId: "",
              });
            }
            setLedgerid("");
            setDebit("");
            setCredit("");
            setId(id+1);
          }}
        >   <Tooltip title="Add Row" placement="top" arrow>
        <AddCircleIcon style={{ fontSize: "25px" }} /></Tooltip>
       
        </Controls.ActionButton>
      </td>
      {isNewPopup ? (
        <Popup
          title="Create Ledger"
          openPopup={isNewPopup}
          setPopups={setIsNewPopup}
        >
          <COAForm
            handleSubmit={Add_Coa}
            setAddLedger={true}
            setIsNewPopup={setIsNewPopup}
            LoadCOA={props.LoadCOA}
            // Journalcoa={props.journalcoa}
            //reload={reload}
          />
        </Popup>
      ) : null}
    </tr>
  );
};
const initialFValues = {
  
  accountingDate: format(new Date(), "yyyy-MM-dd"),

};

export default function SalesJournal(props) {
  const userSessionContext = React.useContext(UserSessionContext);
  const companyContext = React.useContext(CompanyContext);
  const [data, setData] = useState([]);
 // const [values, setValue] = React.useState(new Date());
  const {values, handleInputChange } = useForm(initialFValues);
  const [journalSaveStatus, setJournalSaveStatus] = useState(0);
  const [editdata, setEditData] = useState([]);
  // const [transid, settransid] = useState("");
  const [journalVoucherId, setjournalvoucherid] = useState("");
  const [journalname, setjournalname] = useState("Sales Voucher");
  const [invoiceNo, setinvoiceno] = useState("");
  const [remarks, setremarks] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [serial, setSerial] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [flowId, setFlowId] = React.useState(() =>
    Math.floor(100000 + Math.random() * 9000000).toString()
  );
  const companyFiscalyear =  companyContext.fiscal[0]["fiscalYear"];
const companyId= companyContext.company.id;




const [deb, setDeb] = useState((data["dr_cr"]=== 'dr' ? data.amount :0)||"");


const [cred, setCred] = React.useState((data["dr_cr"]=== "cr" ? data.amount : 0)||"");

const [ledger, setLedger] = React.useState([]);
const [edit, isEdit] = useState(false);
const [editing, isEditing] = useState(false);


 
  let history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    Journalcoa();
  }, []);

  var accountingDate = format(new Date(values.accountingDate), "yyyy-MM-dd HH:mm:ss");
  if (values.accountingDate  !== undefined) {
    accountingDate  = format(new Date(values.accountingDate), "yyyy-MM-dd");
   
  }  

   
  useEffect(async() => {
  await axios.get(`${config.APP_CONFIG}/Account/LedgerReport/api/${accountingDate}/${companyId}`, {
      headers: { Authorization: userSessionContext.token },
    })
    .then((res) => {
      if (res.data.status_code === 401) {
        userSessionContext.handleLogOut();
      } else if (res.data.status_code === 200) {
        setSerial(res.data.msg)
        let Date1= format(new Date(values.accountingDate), "yyyy-MM-dd").substring(5,10);

        // eslint-disable-next-line no-useless-concat
        var trans="SC"+companyFiscalyear +"/"+Date1+"/"+res.data.msg;
        setjournalvoucherid(trans);
      } else {
        toast.error("error");
        setSerial([]);
      }
    })
    .catch((err) => {
      setSerial([]);
    });


  }, [accountingDate]);

  const Journalcoa = async (props) => {

  await  axios
      .get(`${config.APP_CONFIG}/Account/COAChild/ledger`, {
        headers: { Authorization: userSessionContext.token },
      })
      .then((res) => {
        if (res.data.status_code === 401) {
          userSessionContext.handleLogOut();
        } else if (res.data.status_code === 200) {
          let categoryList = res.data.msg.map((item) => ({
            value: item.id,
            label: item.coaname,
          }));

          // categoryList = [{ id: 0, title: 'Select' }].concat(categoryList);

          setCategoryList(categoryList);
        } else {
          toast.error("error");
          setCategoryList([]);
        }
      })
      .catch((err) => {
        setCategoryList([]);
      });
  };
  // },[])

  // const updatejournalvoucherid = (e) => {
  //   setjournalvoucherid(e.target.value);

  const updateremarks = (e) => {
    setremarks(e.target.value);
  };


  const updateinvoiceno = (e) => {
    setinvoiceno(e.target.value);
  };
  // const updatetrans = (e) => {
  //     settransid(e.target.value);
  // };
  
  const Addjournal = () => {
    let accountingDate = format(new Date(values.accountingDate), "yyyy-MM-dd HH:mm:ss");
    if (values.accountingDate  !== undefined) {
      accountingDate  = format(new Date(values.accountingDate ), "yyyy-MM-dd");
    }
  //  let Date1= format(new Date(values.accountingDate), "yyyy-MM-dd").substring(5,10);
//     console.log(accountingDate)
//     console.log(values.accountingDate)
//     let accountingDate1 = new Date(values.accountingDate).getMonth().toLocaleDateString() ;
//     console.log(accountingDate1)
//  let getmonth=(accountingDate.getMonth()).toLocaleDateString() ;
//  console.log(getmonth)
//  const getday= format(values.accountingDate).getDay();
 
//console.log( getday)
//const trans="JV"+companyFiscalyear +"/"+Date1+"/"+serial;

    const dr_total_list = data.filter((x) => { return x["dr_cr"].toLowerCase() === "dr";});
    const dr_total = dr_total_list.reduce((drtotal, obj) => obj.amount + drtotal, 0);
    const cr_total_list = data.filter((x) => {return x["dr_cr"].toLowerCase() === "cr";});
    const cr_total = cr_total_list.reduce((crtotal, obj) => obj.amount + crtotal, 0 );

    if (dr_total !== cr_total) {
      toast.error("Debit and credit should be Balanced");
    
    } else if (journalname === "" || journalVoucherId === "" || remarks === "" || invoiceNo==="") {
      toast.error("Please Fill All Fields");
    } else {
      setIsSubmitting(true);
      let journal_entry_transaction = {
        transactionid: journalVoucherId,
        accountingDate:accountingDate,
        journalName: journalname,
        reference: invoiceNo,
        narration: remarks,
        companyId: companyContext.company.id,
        fiscalYear: companyFiscalyear,
        monthlyInc:serial,
        journalType:"SC",
        createdBy: localStorage.getItem('user'),
       
      };

      axios
        .post(
          `${config.APP_CONFIG}/Account/Journal/journalTransaction`,
          journal_entry_transaction,
          { headers: { Authorization: userSessionContext.token } }
        )
        .then((res) => {
          if (res.data.status_code === 200) {
            setJournalSaveStatus(1);   // set status one and it disables save button to saved
            const journal_data = data.map((i) => {
              return {
                ...i,
                transactionid: journalVoucherId,
                remarks: remarks,
                companyId: companyContext.company.id,
                jtId: res.data.msg,
                flowId: flowId,
                createdBy: localStorage.getItem('user'),
              };
            });

            axios
              .post(`${config.APP_CONFIG}/Account/Journal/Api`, journal_data, {
                headers: { Authorization: userSessionContext.token },
              })
              .then((es) => {
                  if(es.data.status_code === undefined){
                      return <Spinner/>
                  }
                if (es.data.status_code === 200) {
                  toast.success("Sucessfully added journal");
                history.push(`/accounting/journal-entries-table`);
                } else if (es.data.status_code === 401) {
                  userSessionContext.handleLogout();
                } else {
                  toast.error("Warning");
                }
              })
              .catch((err) => {
                toast.error("Error");
              });
          }
        })
        .catch((err) => {
          toast.error("Error cannot return journal transaction");
        });
    }
  };

  if (journalVoucherId === null || journalVoucherId === undefined || journalVoucherId === "") {
    return <Spinner />;
  }

  return  (
    <div
    className="content-wrapper iframe-mode"
    data-widget="iframe"
    data-loading-screen={750}
  >
    <Grid container direction="row" style={{ marginBottom: "20px" }}>
      <Grid item lg={12} md={12} xs={12}>
        <Card variant="outlined">
          <CardHeader
            className={classes.header}
            title={"Sales Voucher : " + journalVoucherId.toString()}
            classes={{ title: classes.header }}
          />
          <Divider />
          <div className="container-fluid">
            <div className="row g-6" style={{ padding: "5px 0 15px 0" }}>
            <div className="col-md-3">
                <label
                  htmlFor="text"
                  style={{ text: "Bold", font: "Bold", fontSize: "13px" }}
                  className="col-sm-12 col-form-label"
                >
                  Invoice No:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="invoiceNo"
                  value={invoiceNo}
                  onChange={updateinvoiceno}
                />
              </div>

              <div className="col-md-3">
                <label
                  htmlFor="text"
                  style={{ text: "Bold", font: "Bold", fontSize: "13px" }}
                  className="col-sm-12 col-form-label"
                >
                  Journal Voucher Id
                </label>
                <input
                  className="form-control"
                  name="journalVoucherId"
                  value={journalVoucherId}
                  //onChange={updatejournalvoucherid}
                />
              </div>

              <div className="col-md-3">
                <label
                  htmlFor="text"
                  style={{ text: "Bold", font: "Bold", fontSize: "13px" }}
                  className="col-sm-12 col-form-label"
                >
                  Journal Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="journalname"
                  value={journalname}
                  //onChange={updatejournal}
                />
              </div>

              <Grid
                item
                xs={3}
                style={{ display: "flex", flexDirection: "column" }}
              >
                 <label
                  htmlFor="text"
                  style={{ fontSize: "13px", paddingTop: "0", width:"100%" }}
                  className="col-sm-12 col-form-label"
                >
                  Date
                </label>
                <Controls.DatePicker
                  name="accountingDate"
                  value={values.accountingDate}
                  onChange={handleInputChange}
                  onFocus={e => e.target.blur()}
                  component="div"
                  disableFuture={true}
                />
              </Grid>

              
              {/* </CardContent> */}
            </div>
          </div>
        </Card>
      </Grid>
    </Grid>

    <Box sx={{ height: "auto" }} mt={2} mx={1.5}>
      <table className="table table-fluid journal-entry-table">
        <tr>
          <th>Ledger Name</th>
          <th></th>
          <th>Debit</th>
          <th>Credit</th>
          <th>Actions</th>
        </tr>

        {data.map((row, idx) => {
          //const { coaId, amount,dr_cr,flowId,jtId,ledgerName,transactionid,} = row; //destructuring

          if (edit === idx && editing === true) {
            return (
              <tr key={idx}>
                <td width="200px">
                  <Select
                    defaultValue={ledger}
                    onChange={setLedger}
                    options={categoryList}
                    styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
          menuPortalTarget={document.body}
                  />
                </td>
                <td></td>
                <td width="100px">
                  <input
                    type="text"
                    value={deb}
                    onChange={(e) => {
                      e.preventDefault();

                      setDeb(e.target.value);

                      setCred(0);
                    }}
                    //onChange={handleChange }
                  />
                </td>
                <td width="100px">
                  <input
                    onChange={(e) => {
                      setCred(e.target.value);
                      setDeb(0);
                    }}
                    type="number"
                    step="0.1"
                    value={cred}
                  />
                </td>
                <td>
                  <Controls.ActionButton
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={(e) => {
                      e.preventDefault();
                      let temp = {
                        id: idx,
                        coaId: ledger.value,
                        ledgerName: ledger.label,
                        dr_cr: deb === 0 ? "cr" : "dr",
                        amount: parseFloat(deb === 0 ? cred : deb),
                        transactionid: "",
                        jtId: "",
                        flowId: "",
                      };

                      const new_data = [...data];
                      const index = data.findIndex((x) => x.id === edit);
                      new_data[index] = temp;
                      setData(new_data);

                      isEditing(false);
                    }}
                  >
                    <Tooltip title="Save" placement="top" arrow>
                      <SaveIcon style={{ fontSize: "25px" }} />
                    </Tooltip>
                  </Controls.ActionButton>
                </td>
              </tr>
            );
          } else {
            return (
              <tr key={idx}>
                <td>{row.ledgerName}</td>
                <td></td>

                <td>{row.dr_cr?.toLowerCase() === "dr" ? row.amount : 0}</td>
                <td>{row.dr_cr?.toLowerCase() === "cr" ? row.amount : 0}</td>

                {editing === false ? (
                  <td>
                    <Controls.ActionButton
                      size="small"
                      variant="contained"
                      color="danger"
                      onClick={(e) => {
                        let _data = data.filter((item) => {
                          return item !== row;
                        });
                        setData(_data);
                      }}
                    >
                      {" "}
                      <Tooltip title="Delete" placement="top" arrow>
                        <DeleteIcon style={{ fontSize: "25px" }} />
                      </Tooltip>
                    </Controls.ActionButton>
                  </td>
                ) : null}
                {editing === false ? (
                  <td>
                    <Controls.ActionButton
                      size="small"
                      variant="contained"
                      color="primary"
                      onClick={(e) => {
                        isEdit(idx);
                        isEditing(true);
                        const _temp = {
                          coaId: row.coaId,
                          ledgerName: row.ledgerName,
                          dr_cr: row.dr_cr,
                          amount: row.amount,
                          transactionid: row.transactionid,
                          flowId: row.flowId,

                          jtId: row.jtId,
                        };

                        setEditData(_temp);

                        setDeb(
                          row.dr_cr?.toLowerCase() === "dr" ? row.amount : 0
                        );
                        setCred(
                          row.dr_cr?.toLowerCase() === "cr" ? row.amount : 0
                        );
                        let temp = {
                          value: row.coaId,
                          label: row.ledgerName,
                        };

                        setLedger(temp);
                      }}
                    >
                      <Tooltip title="Edit" placement="top" arrow>
                        <EditIcon style={{ fontSize: "25px" }} />
                      </Tooltip>
                    </Controls.ActionButton>
                  </td>
                ) : null}
              </tr>
            );
          }
        })}

        <AccountRow
          data={data}
          setData={setData}
          addRow={(e) => {
            setData([...data, e]);
          }}
          categoryList={categoryList}
          Journalcoa={Journalcoa}
          editdata={editdata}
          edit={edit}
          isEdit={isEdit}
        />
        {data.length!==0?
        data.filter((x) => { return x["dr_cr"].toLowerCase() === "dr";}).reduce( (drtotal, obj) => obj.amount + drtotal,0)===data.filter((x) => { return x["dr_cr"].toLowerCase() === "cr";}).reduce( (crtotal, obj) => obj.amount + crtotal,0)
?<tr>
   <td style={{color:"green",textAlign:"center"}}>Total</td>
      <td></td>
      <td style={{color:"green",textAlign:"center"}}>{data.filter((x) => { return x["dr_cr"].toLowerCase() === "dr";}).reduce( (drtotal, obj) => obj.amount + drtotal,0)}</td>
      <td style={{color:"green",textAlign:"center"}}>{data.filter((x) => { return x["dr_cr"].toLowerCase() === "cr";}).reduce( (crtotal, obj) => obj.amount + crtotal,0)}</td>
    </tr>
    :<tr>
      <td style={{color:"red",textAlign:"center"}}>Total</td>
      <td></td>
      <td style={{color:"red",textAlign:"center"}}>{data.filter((x) => { return x["dr_cr"].toLowerCase() === "dr";}).reduce( (drtotal, obj) => obj.amount + drtotal,0)}</td>
      <td style={{color:"red",textAlign:"center"}}>{data.filter((x) => { return x["dr_cr"].toLowerCase() === "cr";}).reduce( (crtotal, obj) => obj.amount + crtotal,0)}</td>
    </tr>
 
:null}
      </table>
    </Box>

    <Card variant="outlined">
      {/* <CardContent>
        <div className="form-group row">
          <label htmlFor="text" className=" col-auto col-form-label">
            Invoice No:
          </label>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              name="invoiceNo"
              value={invoiceNo}
              onChange={updateinvoiceno}
            />
          </div>
        </div>
      </CardContent> */}

      <CardContent>
        <div class="input-group journal-tab2">
          <div class="input-group-prepend">
          <span class="input-group-text" style={{paddingLeft: "0"}}>Narration</span>
          </div>
          <textarea
            class="form-control"
            name="remarks"
            value={remarks}
            onChange={updateremarks}
            aria-label="With textarea"
          ></textarea>
        </div>

        {journalSaveStatus === 0 ? (
          <Controls.Button
            type="submit"
            disabled={isSubmitting}
            text="Save"
            onClick={(e) => {
              e.preventDefault();
              if (data === undefined || data === null || data.length === 0) {
                toast.warn("Please Enter Data First");
              } else {
                setIsSubmitting(true);
                Addjournal();
              }
            }}
          />
        ) : (
          <Controls.Button type="submit" text="Saved" disabled />
        )}
        <Controls.Button
          text="Cancel"
          color="danger"
          onClick={() => {
            history.push(`/accounting/journal-entries-table`);
          }}
        ></Controls.Button>
        {/* <Link
              to="/accounting/journal-entries-table"
              className="btn btn-danger btn-sm float-right" >
          Cancel
            </Link> */}
      </CardContent>
    </Card>
  </div>
);
}
