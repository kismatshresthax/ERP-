import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../utils/config";
import { toast } from "react-toastify";
import { Grid } from "@material-ui/core";
import UserSessionContext from "../../contexts/UserSessionContext";
import UseTable from "../home/UseTable";
import { TableBody, TableRow, TableCell } from "@material-ui/core";
import format from "date-fns/format";

const headCells = [
  { id: "productId", label: "S.N" },
  { id: "productId", label: "Product Name" },
  { id: "inhouseUnitId", label: "Unit", disableSorting: true },
  { id: "productQTY", label: "Quantity", disableSorting: true },
  { id: "productUnitPrice", label: "Unit Price", disableSorting: true },
  { id: "productSubtotal", label: " Subtotal", disableSorting: true },
];

const initialvalue = {
  customerName: "",
  bill_no: 0,
  dateOfSales: "",
  grandTotal: "",
  cashierName: "",
};

export default function ViewSalesSummary(props) {
  const Data = props.data || initialvalue;

  const [values, setvalues] = useState(Data);
  const userSessionContext = React.useContext(UserSessionContext);
  const [data, setData] = useState({});
  const [productData, setProductData] = useState([]);
  const [paymentMode, setPaymentMode] = useState([]);
  const { TblContainer, TblHead } = UseTable(productData, headCells);

  useEffect(async() => {
   await axios
      .get(`${config.APP_CONFIG}/Sales/SalesSummary/api/${Data.id}`, {
        headers: { Authorization: userSessionContext.token },
      })
      .then((res) => {
        if (res.data.status_code === 200) {
          let temp = res.data.msg;
           console.log(temp);
          setData(temp.salesData[0]);
          setProductData(temp.salesProduct);
          setPaymentMode(temp.paymentMode);
          // setPaymentData(temp.paymentMode);
        } else {
          //  window.alert("hello");
          toast.error(res.data.msg);
          setData({});
          setProductData([]);
          setPaymentMode([]);
        }
      })
      .catch((err) => {
        setData({});
        setProductData([]);
        setPaymentMode([]);
      });
  }, []);


  const stringData = paymentMode.reduce((result, item) => {
    return `${result}/ ${item.mode}`
  }, "")

  const paidAmount = paymentMode.reduce((result, item) => result + item.amount, 0);

  const remainingAmount = (data.grandTotal - paidAmount).toFixed(2);
  const product_no_tax_list = productData.filter((x) => x.productTax === 0)

    const nontaxable = product_no_tax_list.reduce(
      (total, obj) => parseFloat(obj.productSubtotal) + parseFloat(total),
      0
    );
    const product_tax_list = productData.filter((x) => x.productTax !==0)
  
    const taxable = product_tax_list.reduce(
      (total, obj) => parseFloat(obj.productTotal) + parseFloat(total),
      0
    );

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <div>
            <b>Customer Name:</b> {values.customerName}
          </div>
          
          <div>
            <b>Payment Mode:</b> {stringData? stringData : "Credit" }
          </div>

          <div>
            <b>Cashier Name:</b> {values.cashierName}
          </div>
        </Grid>
        <Grid item xs={4} style={{textAlign: "right"}}>
        <div>
            <b>Bill No:</b> {values.bill_no}
          </div>

          <div>
            <b>Date of Sales:</b> {format(new Date(values.dateOfSales),"yyyy/MM/dd")}
          </div>
          <div>
            <b>Fiscal Year:</b> {values.fiscalYear}
          </div>
          
        </Grid>
      </Grid>
      <div className="row" style={{marginTop: "10px"}}>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
          <TblContainer>
            <TblHead />
            <TableBody>
              {productData &&
                productData.map((item, idx) => (
                  <TableRow key={item.idx}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{item.productName}</TableCell>
                    <TableCell>{item.unitName}</TableCell>
                    <TableCell>{item.productQTY}</TableCell>
                    <TableCell>{item.productCost}</TableCell>
                    <TableCell>{item.productSubtotal}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </TblContainer>
          <div className="row">
            <div className="col-5">
              <div style={{ margin: "20px 0" }}>
                <div
                  className="purchasePayment card"
                  style={{ padding: "10px" }}
                >
                  <table className="table table-fluid">
                    <tr>
                      <th className="">Mode of Payment</th>
                      <th className="">Amount (Rs.)</th>
                    </tr>
                    {stringData
                      ? paymentMode.map((row, idx) => {
                          return (
                            <tr key={row.idx}>
                              <td>{row.mode}</td>
                              <td>{row.amount}</td>
                            </tr>
                          );
                        })
                      : (
                        <tr>
                          <td colSpan={2}>Credit</td>
                        </tr>
                      )}
                  </table>
                </div>
              </div>
            </div>
            <div className="col-3">
              {remainingAmount > 0 ? 
              <div style={{ margin: "20px 0" }}>
                <div className="card" style={{ padding: "10px" }}>
                  <div className="remainingAmount">
                    <p style={{marginBottom: "4px"}}>Remaining Amount</p>
                    <input
                      type="number"
                      placeholder="0.00"
                      value={remainingAmount}
                      disabled
                    />
                  </div>
                </div>
              </div>
              : null }
            </div>
            <div className="col-4">
              <div
                className="card"
                style={{ margin: "20px 0", padding: "10px" }}
              >
                <div className="row">
                  <div className="col-md-auto">
                    <div>
                      <b>Sub Total</b>
                    </div>
                    <div>
                      <b>Total Discount </b>
                    </div>
                    <div>
                      <b>Non-Taxable Amount</b>
                    </div>
                    <div>
                      <b>Taxable Amount</b>
                    </div>
                    <div>
                      <b>Total Tax</b>
                    </div>
                    <div>
                      <b>Grand Total</b>
                    </div>
                  </div>
                  <div className="col">
                    <div>: {data.subTotal}</div>
                    <div>: {data.discount}</div>
                    <div>: {nontaxable||"0"}</div>
                    <div>: {taxable||"0"}</div>
                    <div>: {data.taxAmount}</div>
                    <div>: {data.grandTotal}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
