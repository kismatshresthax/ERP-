import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import UserSessionContext from "../../../contexts/UserSessionContext";
import CompanyContext from "../../../contexts/CompanyContext";
import axios from "axios";
import config from "../../../utils/config";
//import UseTable from "../../home/UseTable";
//import { TableBody, TableRow, TableCell } from "@material-ui/core";
import { toast } from "react-toastify";
import Spinner from "../../../utils/spinner";
import "../styles.css";
import Controls from "../../controls/Controls";
import PrintIcon from "@mui/icons-material/Print";
import ReactToPrint from "react-to-print";
import { format } from "date-fns";
export default function SalesReturnView(props) {
  const componentRef = React.useRef(null);
  const userSessionContext = React.useContext(UserSessionContext);
  const companyContext = React.useContext(CompanyContext);
  const [productList, setProductList] = useState([]);
  const [Data, setData] = useState([]);
  const _data = props.data || {};
  // const { TblContainer, TblHead } = UseTable(productList, headCells);
 console.log(_data)
  useEffect(() => {
    loadSalesReturnById();
  }, []);
 
  const loadSalesReturnById = async() => {
   await axios
      .get(`${config.APP_CONFIG}/Sales/SalesReturn/api/${_data.id}`, {
        headers: {
          Authorization: userSessionContext.token,
        },
      })
      .then((res) => {
        if (res.data.status_code === 401) {
          userSessionContext.handleLogOut();
        } else if (res.data.status_code === 200) {
          setProductList(res.data.msg.salesProduct);
          setData(res.data.msg.salesData[0]);
        } else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
          setProductList([]);
        } else {
          toast.error("Error Occurred");
          // setProductList([]);
        }
      })
      .catch((err) => {
        toast.error("Something went Wrong");
        // setProductList([]);
      });
  };

  if (productList === undefined) {
    return <Spinner />;
  }

  if (props.data === undefined) {
    return <Spinner />;
  }
  const date_of_sales_nepali = format(
    new Date(props.data.dateOfSales),
    "yyyy/MM/dd"
  );
  const return_date = format(
    new Date(props.data.returnDate),
    "yyyy/MM/dd"
  );
  var adbs = require("ad-bs-converter");
  const nepalidate = adbs.ad2bs(return_date);
  //const return_nepali_date = adbs.ad2bs(date_of_sales_nepali);
  const miti =
    nepalidate.en["year"] +
    "/" +
    nepalidate.en["month"] +
    "/" +
    nepalidate.en["day"];
    const numWords = require("num-words");
    let amountArr = ((props.data.grandTotal).toFixed(2)).toString().split(".");
    let amountWord = numWords(amountArr[0]) + " Rupees and " + numWords(amountArr[1]) + " Paisa" + " Only";
  return (
    <div>
      {productList.length !== 0 ? (
        <div style={{ textAlign: "right" }}>
          <ReactToPrint
            // trigger={() => <button  className="printBtn" <Printicon/> style={{float: "right", left: "40px"}}>Print</button>}
            trigger={() => (
              <Controls.Button
                text="Print / Download"
                variant="outlined"
                startIcon={<PrintIcon />}
                className="printBtn"
              />
            )}
            content={() => componentRef.current}
          />
        </div>
      ) : null}

      <div ref={componentRef} className="salesReturnReport">
        <div className="jreportPage">
          <div className="reportHeader">
            <p className="companyName">{companyContext.company.name}</p>
            <p className="companyAddress">{companyContext.company.address}</p>
            <p className="companyPan">
              Vat No : {companyContext.company.panNo}
            </p>
            <p className="companyPan">
              Fiscal Year : {companyContext.fiscal[0].fiscalYear}
            </p>
            <p className="companyReport">Credit Note</p>
            <div className="date">
              <p>Transaction Sales Id: 
                <b>{Data.salesId}</b></p>
            </div>
          </div>
          <Grid container>
            <Grid item xs={6}>
              <div>
                <b>Customer Name:</b> <b>{Data.customerName || ""}</b>
              
              </div>
              <div>
                <b>Credit Note No:</b> <b>{Data.bill_no || ""}</b>
                <div>
                 <b>Invoice No:</b> <b>{Data.refBillNo || ""} </b>
              </div>
              </div>
            </Grid>
            <Grid item xs={6} style={{textAlign: "right"}}>
         
            
                <div>
                <b>Return Date:</b> <b>{return_date || ""}</b>
                </div>
                <div>
                <b>Nepali Date:</b> <b>{miti|| ""}</b>
              </div>
              
            </Grid>
          </Grid>

          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
              <table className="table table-fluid journal-entry-table">
                <thead>
                  <tr>
                    <th style={{ width: "45px" }}>S.No.</th>
                    <th>ProductName</th>
                    <th>Unit</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>SubTotal</th>
                  </tr>
                </thead>
                <tbody>
                  {productList && productList.map((item, idx) => {
                      return (
                        <tr key={item.idx}>
                          <td>{idx + 1}</td>
                          <td>{item.productName}</td>
                          <td>{item.unitName}</td>
                          <td>{item.productQTY}</td>
                          <td>{item.productCost}</td>
                          <td>{item.productSubtotal}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <div className="row">
              <div style={{paddingLeft: '14px'}}>
<p style={{padding: '5px'}}>In Words: <b>{amountWord}</b> </p>
</div>
                <div className="desc" style={{margin: "5px 0",paddingLeft: '21px' }}>
                  <p>Remarks : <b>{props.data.remarks}</b></p>
                </div>
                <div className="col-7"></div>
                <div className="col-5">
                  <div
                    className="card"
                    style={{ margin: "20px 0", padding: "10px" }}
                  >
                    <div className="row">
                      <div className="col-sm-auto">
                        <div>
                          <b>Sub Total</b>
                        </div>
                        <div>
                          <b>Total Discount</b>
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
                        <div>: {Data.subTotal}</div>
                        <div>: {Data.discount}</div>
                        <div>: {Data.subTotal-Data.discount}</div>
                        <div>: {Data.taxAmount}</div>
                        <div>: {Data.grandTotal}</div>
                      </div>
                    </div>
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
