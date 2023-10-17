import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../utils/config";
import UseTable from "../home/UseTable";
import { TableBody, TableRow, TableCell } from "@material-ui/core";
import UserSessionContext from "../../contexts/UserSessionContext";
import { toast } from "react-toastify";
import AddIcon from "@material-ui/icons/Add";
import "./styles.css";

//import Purchasepdf from "./Purchasepdf";
import Tablepdf from "./Tablepdf";
import Popup from "../../components/home/Popup";
import Controls from "../controls/Controls";
import PrintIcon from "@mui/icons-material/Print";
import { makeStyles } from "@material-ui/core";
import Spinner from "../../utils/spinner";
import Select from "react-select";
import Tooltip from "@mui/material/Tooltip";
import { format } from "date-fns";
import { ReactPosPreview } from "./ReactPrint/ReactPosPreview";
const headCells = [
  { id: "productId", label: "S.N" },
  { id: "productId", label: "Product Name" },

  { id: "productQty", label: "Quantity", disableSorting: true },
  { id: "userUnitName", label: "Unit", disableSorting: true },
  { id: "productUnitPrice", label: "Unit Price", disableSorting: true },
  { id: "productSubtotal", label: " Subtotal", disableSorting: true },
  // { id: "productDiscount", label: " Discount", disableSorting: true },
  // { id: "productTax", label: "Tax", disableSorting: true },
];

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  newButton: {
    position: "relative",
    float: "right",
    zIndex: 4,
  },
  newButton1: {
    zIndex: 4,
    color: "#3f51b5",
    border: "1px solid #3f51b5",
  },
}));

const AddForm = (props) => {
  const [pay, setPay] = useState("");
  const [amount, setAmount] = useState("");
  const [id, setId] = useState(0);
  return (
    <tr>
      <td width="300px">
        {props.savePayment === 0 ? (
          <Select
            options={props.paymentModes}
            value={pay}
            onChange={(e) => {
              setPay(e);
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
              if (amount === "" || pay === "") {
                return toast.warn("Please Fill The Form");
              } else {
                props.addRow({
                  //id: id,
                  status: "true",
                  amount: parseFloat(amount),
                  mode: pay.label,
                });
                setPay("");
                setAmount("");
                //setId((id) => id + 1);
              }
            }}
          >
            <Tooltip title="Add" placement="top" arrow>
              <AddIcon style={{ fontSize: "15px" }} />
            </Tooltip>
          </Controls.ActionButton>
        ) : null}
      </td>
    </tr>
  );
};

const FormThree = (props) => {
  const classes = useStyles(props);
  const userSessionContext = React.useContext(UserSessionContext);
  const [data, setData] = useState({});
  const [productData, setProductData] = useState([]);
  const [paymentMode, setPaymentMode] = useState([]);
  const { TblContainer, TblHead } = UseTable(productData, headCells);
  const [savePayment, setSavePayment] = useState(0);
  // const [saveComplete, setSaveComplete] = useState(0);
  // const permissionContext=React.useContext(UserAuthenticationContext);
  const [isNewPopup, setIsNewPopup] = useState(false);
  const [isNewPos, setIsNewPos] = useState(false);

  // let Permission = permissionContext.permissions;
  // let curr_mod_permission =Permission.filter( x=>{return x["module_name"].toLowerCase() === "purchases"})
  // let userPermission= curr_mod_permission[0]

  const [paymentData, setPaymentData] = useState();
  const [paymentModes, setPaymentModes] = useState();
  const [vendorDetail, setVendorDetail] = useState();

  useEffect(() => {

    axios
      .get(`${config.APP_CONFIG}/Purchase/ProductPurchaseSummary/api/${props.data.id}`, { headers: { Authorization: userSessionContext.token } })
      .then((res) => {
        if (res.data.status_code === 200) {
          let temp = res.data.msg;

          setData(temp.mydata[0]);
          //console.log(data);
          setProductData(temp.productData);

          setPaymentMode(temp.paymentMode);
          setPaymentData(temp.paymentMode);
        } else {
          toast.error(res.data.msg);
          setData({});
          setProductData([]);
        }
      })
      .catch((err) => {
        setData({});
        setProductData([]);
      });
  }, [])

  const id = props.data.vendorId;
  useEffect(() => {
    loadVendorname();
  }, []);

  const loadVendorname = async () => {
    await axios
      .get(`${config.APP_CONFIG}/Setting/Vendor/api`, {
        headers: {
          Authorization: userSessionContext.token,
        },
      })
      .then((res) => {
        if (res.data && res.data.status_code && res.data.status_code === 200) {
          let temp = res.data.msg.filter((x) => {
            return x.id === id
          })

          setVendorDetail(temp[0]);
        } else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
        } else {
          toast.error(res.data.msg);
          setVendorDetail([]);
        }
      })
      .catch((err) => {
        toast.error("Something Went Wrong");
        setVendorDetail([]);
      });
  };

  useEffect(() => {
    loadPaymentMode();
  }, []);
  const loadPaymentMode = async () => {
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

  const total = paymentMode.reduce((total, obj) => obj.amount + total, 0);
  const remainingAmount = (data.grandTotal - total).toFixed(2);

  const product_no_tax_list = productData.filter((x) => x.productTax === 0)
  const _nontaxable = product_no_tax_list.reduce(
    (total, obj) => parseFloat(obj.productSubtotal
    ) + parseFloat(total),
    0
  );

  const _subtotal_no_tax_discount = product_no_tax_list.reduce(
    (total, obj) => parseFloat(obj.productDiscount) + parseFloat(total),
    0
  );

  const _non_taxable = _nontaxable - (_subtotal_no_tax_discount || 0);
  if (paymentModes === undefined) {
    return <Spinner />;
  }
  if (data === undefined) {
    return <Spinner />;
  }
  if (productData === undefined) {
    return <Spinner />;
  }
  if (paymentMode === undefined) {
    return <Spinner />;
  }

  const date_of_sales1 = format(
    new Date(props.data.orderDeadline),
    "yyyy/MM/dd HH:mm:ss"
  );
  //console.log(new Date(props.data.recepitDate).toLocaleString );
  const date_of_sales2 = format(
    new Date(props.data.recepitDate),
    "yyyy/MM/dd HH:mm:ss"
  );



  return (
    <div className="purchaseForm3">
      {isNewPopup ? (
        <Popup
          title="Print Preview"
          openPopup={isNewPopup}
          setPopups={setIsNewPopup}
        >
          <Tablepdf
            productData={productData}
            vendorDetail={vendorDetail}
            paymentMode={paymentMode}
            data={props.data}


          />
        </Popup>
      ) : null}
       {isNewPos ? (
        <Popup
          title="Print Preview"
          openPopup={isNewPos}
          setPopups={setIsNewPos}
          remainingAmount={savePayment}
        >
          <ReactPosPreview
          date ={date_of_sales1}
          products={productData}
          vendor = {data}
          _non_taxable={_nontaxable}
          remainingAmount={remainingAmount}
         
          payment={savePayment}
          />
        </Popup>
      ) : null}
      <div className="addButton">
        <Controls.Button
          text="Preview"
          variant="outlined"
          startIcon={<PrintIcon />}
          className={classes.newButton}
          onClick={() => {
            setIsNewPopup(!isNewPopup);
          }}
        />
        <Controls.Button
          text="Pos"
          variant="outlined"
          startIcon={<PrintIcon />}
          className={classes.newButton}
          onClick={() => {
            setIsNewPos(!isNewPos);
          }}
        />
      </div>
      <Grid container>
        <Grid item xs={6}>
          <p>
            <b>Vendor Name:</b>
            {data.vendorname || ""}
          </p>


          <p>
            <b>Vendor Reference:</b> {data.vendorReference || ""}
          </p>
        </Grid>
        <Grid item xs={6}>
          <p>

            <b>Order Deadline:</b>  {date_of_sales1 || ""}
          </p>
          <p>
            <b>Receipt Date:</b> {date_of_sales2 || ""}
          </p>
        </Grid>
      </Grid>
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
          <TblContainer>
            <TblHead />
            <TableBody>
              {productData &&
                productData.map((item, idx) => {
                  return (
                    <TableRow key={item.id}>
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell>{item.product_name}</TableCell>

                      <TableCell>{item.userQuantity}</TableCell>
                      <TableCell>{item.userUnitName}</TableCell>
                      <TableCell>{item.productUnitPrice}</TableCell>
                      <TableCell>{item.productSubtotal}</TableCell>
                      {/* <TableCell>{item.productDiscount || "-"}</TableCell>
                      <TableCell>{item.productTax || "-"}</TableCell> */}
                    </TableRow>
                  );
                })}
            </TableBody>
          </TblContainer>

          <div className="row">
            <div className="col-4">
              <div
                className="card"
                style={{ margin: "20px 0", padding: "10px" }}
              >
                <div className="row">
                  <div className="col-md-auto">
                    <div>
                      <b>Sub Total :</b>
                    </div>
                    <div>
                      <b>Total Discount:</b>
                    </div>
                    <div>
                      <b>Non-Taxable Amt:</b>
                    </div>
                    <div>
                      <b>Taxable Amt:</b>
                    </div>
                    <div>
                      <b>Total Tax:</b>
                    </div>
                    <div>
                      <b>Grand Total:</b>
                    </div>
                  </div>
                  <div className="col">
                    <div>: {data.subtotal}</div>
                    <div>: {data.discount}</div>
                    <div>: {_non_taxable}</div>
                    <div>: {data.netTotal}</div>
                    <div>: {data.taxAmount}</div>
                    <div>: {data.grandTotal}</div>
                  </div>
                </div>
              </div>
              <div className="card" style={{ padding: "10px" }}>
                <div className="remainingAmount">
                  <p>Remaining Amount</p>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={remainingAmount}
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="col-8">
              <div style={{ margin: "20px 0" }}>
                {/* <PurchasePay
                  data={props.data}
                  setSavePayment={setSavePayment}
                  savePayment={savePayment}
                  paymentMode={paymentMode}
                  load_purchase_summary={(e) => {
                    props.load_purchase_summary(e);
                  }}
                /> */}

                <div
                  className="purchasePayment card"
                  style={{ padding: "10px" }}
                >
                  <table className="table table-fluid">
                    <tr>
                      <th className="">Mode of Payment</th>
                      <th className="">Amount (Rs.)</th>
                      {/* <th  className="">Amount</th> */}
                      {/* {savePayment === 0 ? <th className="">Action</th> : null} */}
                    </tr>
                    {paymentMode
                      ? paymentMode.map((row, idx) => {
                        return (
                          <tr key={row.id}>
                            <td>{row.mode}</td>
                            <td>{row.amount}</td>
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
                        // console.log(e);
                        setPaymentData([...paymentData, e]);
                        setPaymentMode([...paymentData, e]);
                        //  console.log(paymentData);
                      }}
                    />

                    <tr>
                      <td colSpan={3} style={{ textAlign: "right" }}>
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
                            className={classes.newButton1}
                            onClick={async e => {
                              if (paymentData.length !== 0) {
                                if (savePayment === 0) {
                                  let confirm = window.confirm(
                                    "Do you Want To Save Payment ?"
                                  );
                                  if (confirm) {
                                    const filterData = paymentData.filter((x) => {
                                      return x.status === "true";
                                    })
                                    let req_data = {

                                      // isCompleted: 1,

                                      isPaymentRelease: 1,
                                      paymentMode: filterData,
                                    };
                                    //console.log(req_data);
                                    await axios
                                      .put(
                                        `${config.APP_CONFIG}/Purchase/StatusUpdate/api/${props.data.id}`,
                                        req_data,
                                        {
                                          headers: {
                                            Authorization:
                                              userSessionContext.token,
                                          },
                                        }
                                      )
                                      .then((res) => {
                                        if (res.data.status_code === 200) {
                                          setSavePayment(1);
                                          props.load_purchase_summary();
                                          toast.success(res.data.msg);
                                        } else if (
                                          res.data.status_code === 401
                                        ) {
                                          userSessionContext.handleLogout();
                                        } else if (
                                          res.data.status_code === 400
                                        ) {
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
                              // history.push("/");
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormThree;
