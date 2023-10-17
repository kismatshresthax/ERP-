import React, { useState, useEffect} from "react";
import CloseIcon from "@material-ui/icons/Close";
import Controls from "../controls/Controls";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import config from "../../utils/config";
import UserSessionContext from "../../contexts/UserSessionContext";
import CompanyContext from "../../contexts/CompanyContext";
import { toast } from "react-toastify";
import Spinner from "../../utils/spinner";
import Select from "react-select";
import { makeStyles } from "@material-ui/core";
import Tooltip from "@mui/material/Tooltip";
import format from "date-fns/format";
import ConfirmDialog from "../home/ConfirmDialog";
const useStyles = makeStyles((theme) => ({
  newButton: {
    zIndex: 4,
    color: "#3f51b5",
    border: "1px solid #3f51b5",
  },
}));

const AddPayVoidForm = (props) => {
  const [payment, setPayment] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <tr>
      <td width="300px">
        <Select
          options={props.paymentModes}
          value={payment}
          onChange={(e) => {
            setPayment(e);
          }}
          styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
          menuPortalTarget={document.body}
        />
      </td>
      <td>
        <input
          type="number"
          placeholder="0.00"
          min={0}
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />
      </td>
      <td>
        {props.savePayment === 0 ? (
          <Controls.ActionButton
            color="secondary"
            onClick={(e) => {
              if (amount === "" && payment === "") {
                return toast.warn("Empty Form");
              } else {
                props.addRow({
                  mode: payment.label,
                  amount: parseFloat(amount),
                });
                setPayment("");
                setAmount("");
              }
            }}
          >
            <Tooltip title="Add">
              <AddIcon fontSize="small" />
            </Tooltip>
          </Controls.ActionButton>
        ) : (
          <Controls.ActionButton color="secondary" disabled>
            <Tooltip title="Can't add after payment">
              <AddIcon fontSize="small" />
            </Tooltip>
          </Controls.ActionButton>
        )}
      </td>
    </tr>
  );
};

const SalesVoidPay = (props) => {
  const [paymentModes, setPaymentModes] = useState();
  const userSessionContext = React.useContext(UserSessionContext);
  const companyContext = React.useContext(CompanyContext);
  const [savePayment, setSavePayment] = useState(0);
  const [paymentData, setPaymentData] = useState({});
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const classes = useStyles(props);
  useEffect(() => {
    loadPaymentMode();
  }, []);

  useEffect(() => {
    setPaymentData(props.paymentMode);
  }, [props.paymentMode]);

  const loadPaymentMode = async () => {
    await axios
      .get(`${config.APP_CONFIG}/Account/COAPaymentMode/api`, {
        headers: { Authorization: userSessionContext.token },
      })
      .then((res) => {
        if (res.data && res.data.status_code && res.data.status_code === 200) {
          let temp = res.data.msg.map((name, index) => ({
            label: name.name,
            value: name.id,
          }));
          setPaymentModes(temp);
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogout();
        } else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
        } else {
          toast.error("Error Occurred");
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

  const AddPaymentMode = () => {
    const date_of_sales = format(
      new Date(props.data.dateOfSales),
      "yyyy-MM-dd HH:mm:ss"
    );
    setConfirmDialog({ ...confirmDialog, isOpen: false });

    let req_data = {
      grandTotal: props.data.grandTotal,
      salesId: props.data.id,
      companyId: companyContext.company.id,
      customerName: props.data.customerName,
      paymentMode: paymentData,
      fiscalYear: companyContext.fiscal[0]["fiscalYear"],
      dateOfSales: date_of_sales,
    };

    axios
      .post(`${config.APP_CONFIG}/Sales/paymentMode/api`, req_data, {
        headers: { Authorization: userSessionContext.token },
      })
      .then((res) => {
        if (res.data.status_code === 200) {
          setSavePayment(1);

          toast.success("Payment Saved");
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogout();
        } else if (res.data.status_code === 400) {
          toast.error("Error");
        } else {
          toast.error(res.data.msg);
        }
      })
      .catch((err) => {
        toast.error("Payment Failed");
      });
  };

  return (
    <div
      className="purchasePayment card"
      style={{ padding: "10px", margin: "50px 0 20px" }}
    >
      <table className="table table-fluid">
        <tr>
          <th>Payment</th>
          <th>Amount</th>
          <th>Action</th>
        </tr>
        {paymentData &&
          paymentData.map((row, idx) => {
            return (
              <tr key={row.idx}>
                <td>{row.mode}</td>
                <td>{row.amount}</td>
                <td>
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
                </td>
              </tr>
            );
          })}
        <ConfirmDialog
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        />

        {props.data.isPaymentRelease === 1 ? (
          <AddPayVoidForm
            paymentData={paymentData}
            setPaymentData={setPaymentData}
            paymentModes={paymentModes}
            addRow={(e) => {
              setPaymentData([...paymentData, e]);
            }}
            savePayment={savePayment}
          />
        ) : (
          <AddPayVoidForm
            paymentData={paymentData}
            setPaymentData={setPaymentData}
            paymentModes={paymentModes}
            addRow={(e) => {
              setPaymentData([...paymentData, e]);
            }}
            savePayment={savePayment}
          />
        )}
        <tr>
          <td colSpan={3} style={{ textAlign: "right" }}>
            {savePayment === 0 ? (
              <Controls.Button
                color="primary"
                variant="contained"
                text="Save Payment"
                className={classes.newButton}
                onClick={(e) => {
                  if (paymentData.length !== 0) {
                    if (savePayment === 0) {
                      setConfirmDialog({
                        isOpen: true,
                        title: "Are you sure want  to Save Payment?",
                        subTitle: "pick payment Mode",
                        onConfirm: () => {
                          AddPaymentMode();
                        },
                      });
                    }
                  }
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

export default SalesVoidPay;
