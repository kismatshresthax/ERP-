import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import Spinner from "../../../utils/spinner";
import { toast } from "react-toastify";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";

import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@mui/material/CardContent";
import Divider from "@material-ui/core/Divider";
import { format } from "date-fns";

import UserSessionContext from "../../../contexts/UserSessionContext";

import config from "../../../utils/config";
import Controls from "../../controls/Controls";
import { useForm } from "../../home/useForm";

import CompanyContext from "../../../contexts/CompanyContext";
import AddIcon from "@mui/icons-material/Add";
import Popup from "../../home/Popup";

import COAForm from "../COAForm";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import Tooltip from "@mui/material/Tooltip";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Box from "@mui/material/Box";
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

const AccountRow = (props) => {
  const [isNewPopup, setIsNewPopup] = useState(false);

  const categorylist = props.categoryList;


  const [debit, setDebit] = React.useState("");
  const [credit, setCredit] = React.useState("");
  const [ledgerid, setLedgerid] = React.useState([]);
  const [id, setId] = React.useState(0);
  const [jtId, setJtId] = React.useState("");
  const userSessionContext = React.useContext(UserSessionContext);

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

  const filterOptions = (candidate) => {
    const isCandidateAlreadyAdded = props.data && props.data.some(
      (d) => d.coaId === candidate.value
    );
    if (isCandidateAlreadyAdded) return false;
    return true;
  };



  return (
    <tr>
      <td width="200px">
        <Select
          isClearable
          options={categorylist}
          value={ledgerid}
          styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
          menuPortalTarget={document.body}
          onChange={setLedgerid}
          hideSelectedOptions={true}
          isSearchable={true}
         // filterOption={filterOptions}
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
        >
          <Tooltip title="Add Ledger" placement="top" arrow>
            <AddIcon style={{ fontSize: "20px" }} />
          </Tooltip>
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
          //   if (e.key === 'Enter') {
          //     props.addRow({
          //       //ledgerName: ledgerid.label,
          //       dr_cr: debit=== 0?"cr": "dr",
          //       amount: debit=== 0? credit : debit ,
          //     });

          //    }

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
                id: id,
                coaId: ledgerid.value,
                ledgerName: ledgerid.label,
                dr_cr: debit === 0 ? "cr" : "dr",
                amount: parseFloat(debit === 0 ? credit : debit),
                transactionid: "",
                jtId: jtId,
                flowId: "",
              });
            }
            setLedgerid("");
            setDebit("");
            setCredit("");
            setId(id + 1);
          }}
        >
          <Tooltip title="Add Row" placement="top" arrow>
            <AddCircleIcon style={{ fontSize: "25px" }} />
          </Tooltip>
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
          />
        </Popup>
      ) : null}
    </tr>
  );
};
const initialFValues = {
  accountingDate: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
};
export default function JournalUI(props) {
  const userSessionContext = React.useContext(UserSessionContext);
  const companyContext = React.useContext(CompanyContext);
 
  const [data, setData] = useState([]);

  const { values, setValues, handleInputChange, ResetForm } = useForm(initialFValues);
  const [journalSaveStatus, setJournalSaveStatus] = useState(0);
  const [editdata, setEditData] = useState([]);

  const [reference, setreference] = useState("");
  const [journalname, setjournalname] = useState("General Voucher");
  const [remarks, setremarks] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [serial, setSerial] = useState("");
  const [fiscal, setFiscal] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [flowId, setFlowId] = React.useState(() =>
    Math.floor(100000 + Math.random() * 900000).toString()
  );
  const companyFiscalyear = companyContext.fiscal[0]['fiscalYear'];


  const [transid, settransid] = useState("");

  const [deb, setDeb] = useState(
    (data["dr_cr"] === "dr" ? data.amount : 0) || ""
  );

  const [cred, setCred] = React.useState(
    (data["dr_cr"] === "cr" ? data.amount : 0) || ""
  );

  const [ledger, setLedger] = React.useState([]);
  const [edit, isEdit] = useState(false);
  const [editing, isEditing] = useState(false);
  const companyId = companyContext.company.id;
 

  let history = useHistory();
  const classes = useStyles();

  var accountingDate = format(new Date(values.accountingDate), "yyyy-MM-dd HH:mm:ss");
  if (values.accountingDate !== undefined) {
    accountingDate = format(new Date(values.accountingDate), "yyyy-MM-dd HH:mm:ss" );
  }


  useEffect(async () => {
   await axios
      .get(`${config.APP_CONFIG}/Account/LedgerReport/api/${accountingDate}/${companyId}`, {
        headers: { Authorization: userSessionContext.token },
      })
      .then((res) => {
        if (res.data.status_code === 401) {
          userSessionContext.handleLogOut();
        } else if (res.data.status_code === 200) {
          setSerial(res.data.msg);
          let Date1 = format(
            new Date(values.accountingDate),
            "yyyy-MM-dd"
          ).substring(5, 10);
          var trans =
            "JV" + companyFiscalyear + "/" + Date1 + "/" + res.data.msg;
          settransid(trans);
        } else {
          toast.error("error");
          setSerial([]);
        }
      })
      .catch((err) => {
        setSerial([]);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountingDate]);

  useEffect(() => {
    Journalcoa();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const Journalcoa = async (props) => {
   await axios
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

  const updatereference = (e) => {
    setreference(e.target.value);
  };
  const updateremarks = (e) => {
    setremarks(e.target.value);
  };

  const updatejournal = (e) => {
    setjournalname(e.target.value);
  };

 
  const Addjournal = () => {
    const dr_total_list = data.filter((x) => {
      return x["dr_cr"].toLowerCase() === "dr";
    });
    const dr_total = dr_total_list.reduce(
      (drtotal, obj) => obj.amount + drtotal,
      0
    );
    const cr_total_list = data.filter((x) => {
      return x["dr_cr"].toLowerCase() === "cr";
    });
    const cr_total = cr_total_list.reduce(
      (crtotal, obj) => obj.amount + crtotal,
      0
    );

    if (dr_total !== cr_total) {
      toast.error("Debit and credit should be Balanced");
    } else if (journalname === "" || reference === "" || remarks === "") {
      toast.error("Please Fill All Fields");
    } else {
      setIsSubmitting(true);
      let journal_entry_transaction = {
        transactionid: transid,
        reference: reference,
        accountingDate: accountingDate,
        journalName: journalname,
        narration: remarks,
        companyId: companyContext.company.id,
        // fiscalYear: "2078/079",
        fiscalYear: companyFiscalyear,
        monthlyInc: serial,
        journalType: "JV",
        createdBy: localStorage.getItem('user'),
      };

      axios
        .post(`${config.APP_CONFIG}/Account/Journal/journalTransaction`,journal_entry_transaction,
          { headers: { Authorization: userSessionContext.token } }
        )
        .then((res) => {
          if (res.data.status_code === 200) {
            setJournalSaveStatus(1); // set status one and it disables save button to saved
            const journal_data = data.map((i) => {
              return {
                ...i,
                transactionid: transid,
                remarks: remarks,
                companyId: companyContext.company.id,
                jtId: res.data.msg,
                flowId: flowId,
                createdBy: localStorage.getItem('user')
              };
            });
            axios
              .post(`${config.APP_CONFIG}/Account/Journal/Api`, journal_data, {
                headers: { Authorization: userSessionContext.token },
              })
              .then((es) => {
                if (es.data.status_code === undefined) {
                  return <Spinner />;
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

  //   const handleEditFormSubmit = (e) => {
  //     e.preventDefault();

  //     const temp = {
  //            coaId: editdata.coaId,
  //             ledgerName: editdata.ledgerName,
  //            dr_cr: editdata.dr_cr,
  //            amount: editdata.amount,
  //            transactionid: "",
  //            jtId: "",
  //            flowId: "",
  //           };

  //     const new_data = [...data];

  //     const index = data.findIndex((x) => x.id === edit);
  // console.log(index)
  //     new_data[index] = temp;

  //     setData(new_data);

  //     setEditData(null);
  //   };


  useEffect(async () => {
   await axios
      .get(`${config.APP_CONFIG}/Setting/FiscalYear/api`, {
        headers: {
          Authorization: userSessionContext.token,
        },
      })
      .then((res) => {
        // if (res.data.status_code === undefined) {
        //   return <Spinner />;
        // }
        if (res.data.status_code === 401) {
          userSessionContext.handleLogOut();
        } else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
        } else if (res.data.status_code === 200) {
          // console.log(res.data.msg);
          const fis_year = res.data.msg.filter((x) => {
            if ((x.isActive === 1) && (x.isEnd === 0)) {
              return true;
            }
            return false;
          });

          setFiscal(fis_year);
        } else {
          toast.error("error");
        }
      });
  }, []);



 // const companyFiscalyear = fiscal[0]["fiscalYear"];

 if (transid === null || transid === undefined || transid === "") {
  return <Spinner />;
}

// const handleSubmission = (e) => {
//   e.preventDefault();
//     ResetForm();
// };


  return (
    <div
      className="content-wrapper iframe-mode"
      data-widget="iframe"
      data-loading-screen={750}
    >

      {transid===null ? 

      <p>Fiscal year is not enabled</p>

      :

      <div>
      {/* <Form onSubmit={handleSubmission}> */}
      <Grid container direction="row" style={{ marginBottom: "20px" }}>
        <Grid item lg={12} md={12} xs={12}>
          <Card variant="outlined">
            <CardHeader
              className={classes.header}
              title={"Journal Voucher : " + transid.toString()}
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
                    Reference
                  </label>
              

                  <input
                    className="form-control"
                    name="reference"
                    value={reference}
                    onChange={updatereference}
                  />
                </div>
                <div className="col-md-3">
                  <label
                    htmlFor="text"
                    style={{ text: "Bold", font: "Bold", fontSize: "13px" }}
                    className="col-sm-12 col-form-label"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="journalname"
                    defaultValue={"General"}
                    value={journalname}
                    onChange={updatejournal}
                  />
                </div>

                <Grid
                  item
                  xs={3}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <label
                    htmlFor="text"
                    style={{ fontSize: "13px", paddingTop: "0", width: "100%" }}
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
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                      }}
                      menuPortalTarget={document.body}                      
                    />
                  </td>
                  <td></td>
                  <td width="100px">
                    <input
                      type="text"
                      value={deb}
                      //value={editdata["dr_cr"].toLowerCase() === "dr" ? editdata.amount: 0}
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
          {data.length !== 0 ? (
            data
              .filter((x) => {
                return x["dr_cr"].toLowerCase() === "dr";
              })
              .reduce((drtotal, obj) => obj.amount + drtotal, 0) ===
            data
              .filter((x) => {
                return x["dr_cr"].toLowerCase() === "cr";
              })
              .reduce((crtotal, obj) => obj.amount + crtotal, 0) ? (
              <tr>
                <td style={{ color: "green", textAlign: "center" }}>Total</td>
                <td></td>
                <td style={{ color: "green", textAlign: "center" }}>
                  {data
                    .filter((x) => {
                      return x["dr_cr"].toLowerCase() === "dr";
                    })
                    .reduce((drtotal, obj) => obj.amount + drtotal, 0)}
                </td>
                <td style={{ color: "green", textAlign: "center" }}>
                  {data
                    .filter((x) => {
                      return x["dr_cr"].toLowerCase() === "cr";
                    })
                    .reduce((crtotal, obj) => obj.amount + crtotal, 0)}
                </td>
              </tr>
            ) : (
              <tr>
                <td style={{ color: "red", textAlign: "center" }}>Total</td>
                <td></td>
                <td style={{ color: "red", textAlign: "center" }}>
                  {data
                    .filter((x) => {
                      return x["dr_cr"].toLowerCase() === "dr";
                    })
                    .reduce((drtotal, obj) => obj.amount + drtotal, 0)}
                </td>
                <td style={{ color: "red", textAlign: "center" }}>
                  {data
                    .filter((x) => {
                      return x["dr_cr"].toLowerCase() === "cr";
                    })
                    .reduce((crtotal, obj) => obj.amount + crtotal, 0)}
                </td>
              </tr>
            )
          ) : null}
        </table>
      </Box>

      <Card variant="outlined">
        <CardContent>
          <div className="input-group journal-tab1">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" style={{paddingLeft: "0"}}>Narration</span>
              </div>
              <textarea
                className="form-control"
                name="remarks"
                value={remarks}
                onChange={updateremarks}
                aria-label="With textarea"
              ></textarea>
            </div>

            {journalSaveStatus === 0 ? (
              <Controls.Button
                type="submit"
                text="Save"
                disabled={isSubmitting}
                onClick={(e) => {
                  e.preventDefault();
                  if (
                    data === undefined ||
                    data === null ||
                    data.length === 0
                  ) {
                    toast.warn("Please Enter Data First");
                  } else {
                    Addjournal();
                  }
                }}
              />
            ) : (
              <Controls.Button type="submit" text="Saved" disabled />
            )}

            {/* <Controls.Button
              text="Reset"
              color="default"
              onClick={ResetForm}  
            ></Controls.Button> */}

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
          </div>
        </CardContent>
      </Card>
      </div>
    }
      {/* </Form> */}
    </div>
  );
}
