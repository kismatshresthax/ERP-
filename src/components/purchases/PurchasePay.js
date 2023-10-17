import React, { useState, useEffect } from "react";
import Controls from "../controls/Controls";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import config from "../../utils/config";
import UserSessionContext from "../../contexts/UserSessionContext";
import { toast } from "react-toastify";
import Spinner from "../../utils/spinner";
import Select from "react-select";
import Tooltip from "@mui/material/Tooltip";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { id } from "date-fns/locale";

// import CompanyContext from "../../contexts/CompanyContext";
const useStyles = makeStyles((theme) => ({
  newButton: {
    zIndex: 4,
    color: "#3f51b5",
    border: "1px solid #3f51b5",
  },
}));

const AddForm = (props) => {
  const [payment, setPayment] = useState("");
  const [amount, setAmount] = useState("");  
  const [id, setId] = useState(0);
  return (
    <tr>
      <td width="300px">
        {props.savePayment === 0 ? (
          <Select
            options={props.paymentModes}
            value={payment}
            onChange={(e) => {
              setPayment(e);
            }}
            styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
            menuPortalTarget={document.body}
          />
        ) : null}
      </td>
      <td width="200px">
        {props.savePayment === 0 ? (
          <input
            type="number"
            placeholder="0.00"
            min={0}
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
        ) : null}
      </td>
      <td>
        {props.savePayment === 0 ? (
          <Controls.ActionButton
            color="secondary"
            onClick={(e) => {
              if (amount === "" || payment === "") {
                return toast.warn("Please Fill The Form");
              } else {
                props.addRow({
                  id: id,
                  mode: payment.label,
                  amount: parseFloat(amount),
                });
                setPayment("");
                setAmount("");
                setId((id)=>(id+1));
              }
            }}
          >
            <Tooltip title="Add">
              <AddIcon fontSize="small" />
            </Tooltip>
          </Controls.ActionButton>
        ) : null}
      </td>
    </tr>
  );
};

const PurchasePay = (props) => {
  const [paymentData, setPaymentData] = useState();
  const [paymentModes, setPaymentModes] = useState();
  const userSessionContext = React.useContext(UserSessionContext);
  const [savePayment, setSavePayment] = useState(0);
  const classes = useStyles(props);
  let history = useHistory;
 

  useEffect(() => {
    loadPaymentMode();
  }, []);

  useEffect(() => {
    setPaymentData(props.paymentMode);
  }, [props.paymentMode]);
  // mySet.add(props.paymentMode);
  // console.log("props.paymentMode", props.paymentMode);
  // console.log("mySet", mySet);

  // useEffect(()=>{
  //   const total = paymentMode.reduce(
  //     (total, obj) => obj.amount+ total,0      
  //   );
  // },[paymentMode])
  
 
  const loadPaymentMode = async() => {
   await axios
      .get(`${config.APP_CONFIG}/Account/COAPaymentMode/api`, {
        headers: {
          Authorization: userSessionContext.token,
        },
      })
      .then((res) => {
        if (res.data && res.data.status_code && res.data.status_code === 200) {
          let temp = res.data.msg.map((name, index) => ({
            label: name.name,
            value: name.id,
          }));
          setPaymentModes(temp);
        } else {
          toast.error(res.data.msg || "Cannot load Payment Mode");
          setPaymentModes([]);
        }
      })
      .catch((err) => {
        toast.error("Failed to Load Payment Mode");
        setPaymentModes([]);
      });
  };

  if (paymentModes === undefined) {
    return <Spinner />;
  }
  
  const abc = paymentData && paymentData.map((x, id)=>{
    return x.id === id;
  })

  return (
    <div className="purchasePayment card" style={{ padding: "10px" }}>
      <table className="table table-fluid">
        <tr>
          <th className="">Mode of Payment</th>
          <th className="">Amount (Rs.)</th>
          {/* <th  className="">Amount</th> */}
          {/* {savePayment === 0 ? <th className="">Action</th> : null} */}
        </tr>
        {paymentData
          ? paymentData.map((row, idx) => {
              return (
                <tr key={row.idx}>
                  <td>{row.mode}</td>
                  <td>{row.amount}</td>
                  {/* <td>
                    {savePayment === 0 ? (
                      <Controls.ActionButton
                        color="secondary"
                        onClick={(e) => {
                          let _data = paymentData.filter((item) => {
                            return item !== row;
                          });
                          setPaymentData(_data);
                        }}
                      >
                        <Tooltip title="Delete">
                          <CloseIcon fontSize="small" />
                        </Tooltip>
                      </Controls.ActionButton>
                    ) : null}
                  </td> */}
                </tr>
              );
            })
          : []}
        <AddForm
          paymentData={paymentData}
          setPaymentData={setPaymentData}
          paymentModes={paymentModes}
          savePayment={savePayment}
          addRow={(e) => {
          
            setPaymentData([...paymentData, e]);
          
          }}
        />

        {/* {props.data.isPaymentRelease !== 1 ? (
        savePayment === 0 ? (
          <Controls.Button
            color="primary"
            variant="contained"
            text="Save Payment"
            onClick={(e) => {
              if (paymentData.length !== 0) {
                if (savePayment === 0) {
                  let confirm = window.confirm("Do you Want To Save Payment ?");
                  if (confirm) {
                    let req_data = {
                      isCompleted: 1,
                      // isPaymentRelease: 1,
                      paymentMode: paymentData,
                    };
                    axios
                      .put(
                        `${config.APP_CONFIG}/Purchase/StatusUpdate/api/${props.data.id}`,
                        req_data
                      )
                      .then((res) => {
                        if (res.data.status_code === 200) {
                          setSavePayment(1);
                          props.setSavePayment(1);
                          toast.success(res.data.msg);
                        } else if (res.data.status_code === 401) {
                          userSessionContext.handleLogout();
                        } else if (res.data.status_code === 400) {
                          toast.warn(res.data.msg);
                        } else {
                          toast.error("Error Occurred");
                        }
                      })
                      .catch((err) => {
                        toast.error("Payment Failed");
                      });
                  }
                } else {
                  return;
                }
              } else {
                toast.warn("Please Add Payment Form");
              }
            }}
          ></Controls.Button>
        ) : (
          <Controls.Button
            color="primary"
            text="Payment Saved"
            disabled
          ></Controls.Button>
        )
      ) : (
        <Controls.Button
          color="primary"
          text="Payment Saved"
          disabled
        ></Controls.Button>
      )} */}

        <tr>
          <td colSpan={3} style={{textAlign:"right"}}>
            {props.data.isPaymentRelease === 1 ? (
              <Controls.Button
                color="primary"
                text="Payment Saved"
                disabled
              ></Controls.Button>
            ) : savePayment === 0 ? (
              <Controls.Button
                color="primary"
                variant="contained"
                text="Save Payment"
                className={classes.newButton}
                onClick={(e) => {
                  if (paymentData.length !== 0) {
                    if (savePayment === 0) {
                      let confirm = window.confirm(
                        "Do you Want To Save Payment ?"
                      );
                      if (confirm) {
                       
                        let req_data = {
                          // isCompleted: 1,
                          isPaymentRelease: 1,
                          paymentMode: paymentData,
                        };
                  
                        axios
                          .put(
                            `${config.APP_CONFIG}/Purchase/StatusUpdate/api/${props.data.id}`,
                            req_data,
                            {
                              headers: {
                                Authorization: userSessionContext.token,
                              },
                            }
                          )
                          .then((res) => {
                            if (res.data.status_code === 200) {
                              setSavePayment(1);
                              props.setSavePayment(1);
                              props.load_purchase_summary();
                              toast.success(res.data.msg);
                            } else if (res.data.status_code === 401) {
                              userSessionContext.handleLogout();
                            } else if (res.data.status_code === 400) {
                              toast.warn(res.data.msg);
                            } else {
                              toast.error("Error Occurred");
                            }
                          })
                          .catch((err) => {
                            toast.error("Payment Failed");
                          });
                      }
                      // {
                      //     window.alert("Terminated");                       
                      // }
                    } else {
                      return;
                    }
                  } else {
                    toast.warn("Please Add Payment Form");
                  }
                  history.push("/");
                }}
              ></Controls.Button>
            ) : (
              <Controls.Button
                color="primary"
                text="Payment Saved"
                disabled
              ></Controls.Button>
            )}
          </td>
        </tr>
      </table>
    </div>
  );
};

export default PurchasePay;
