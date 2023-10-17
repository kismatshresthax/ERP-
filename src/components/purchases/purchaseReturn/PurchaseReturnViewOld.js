import React, { useState, useEffect} from "react";

import Controls from "../../controls/Controls";
import UserSessionContext from "../../../contexts/UserSessionContext";
import CompanyContext from "../../../contexts/CompanyContext";
import axios from "axios";
import config from "../../../utils/config";
import { Grid } from "@material-ui/core";


import { toast } from "react-toastify";
import Spinner from "../../../utils/spinner";
import "../styles.css";
import PrintIcon from "@mui/icons-material/Print";
import ReactToPrint from "react-to-print";
import { format } from "date-fns";
export default function PurchaseReturnViewOld(props) {
  const userSessionContext = React.useContext(UserSessionContext);
  const companyContext = React.useContext(CompanyContext);
  const [productList, setProductList] = useState();
  const data = props.data || {};

  useEffect(() => {
    loadPurchaseReturnById();
  }, []);

  const loadPurchaseReturnById = async() => {
   await axios
      .get(`${config.APP_CONFIG}/Purchase/PurchaseReturn/api/${data.id}`, {
        headers: {
          Authorization: userSessionContext.token,
        },
      })
      .then((res) => {
        if (res.data.status_code === 401) {
          userSessionContext.handleLogOut();
        } else if (
          res.data &&
          res.data.status_code &&
          res.data.status_code === 200
        ) {
          setProductList(res.data.msg.productData || []);
        } else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
          setProductList([]);
        } else {
          toast.error("Error Occurred");
          setProductList([]);
        }
      })
      .catch((err) => {
        toast.error("Something went Wrong");
        setProductList([]);
      });
  };

  const componentRef = React.useRef(null);

  const onBeforeGetContentResolve = React.useRef(null);

  const [text, setText] = React.useState("old boring text");

  const handleAfterPrint = React.useCallback(() => {

  }, []);

  const handleBeforePrint = React.useCallback(() => {
   
  }, []);

  const handleOnBeforeGetContent = React.useCallback(() => {
 

    setText("Loading new text...");

    return new Promise((resolve) => {
      onBeforeGetContentResolve.current = resolve;

      setTimeout(() => {
        setText("New, Updated Text!");
        resolve();
      }, 2000);
    });
  }, [setText]);

  React.useEffect(() => {
    if (
      text === "New, Updated Text!" &&
      typeof onBeforeGetContentResolve.current === "function"
    ) {
      onBeforeGetContentResolve.current();
    }
  }, [onBeforeGetContentResolve.current, text]);

  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current;
  }, [componentRef.current]);

  // const reactToPrintTrigger = React.useCallback(() => {

  //   return <button>Print</button>;
  // }, []);

  if (productList === undefined) {
    return <Spinner />;
  }

  if (props.data === undefined) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="printButtonCase">
      {/* <ReactToPrint
        trigger={() => (
          <button className="btn btn-print">
            Print / Download
          </button>
        )}
        content={() => componentRef.current}
      /> */}
      <ReactToPrint
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
      <div ref={componentRef} className="purchaseReturnReport">
        <div className="jreportPage">
          <div className="reportHeader">
            <p className="companyName">{companyContext.company.name}</p>
            <p className="companyAddress">{companyContext.company.address}</p>
            <p className="companyPan">
              Pan No : {companyContext.company.panNo}
            </p>
            <p className="companyPan">
              Fiscal Year : {companyContext.fiscal[0].fiscalYear}
            </p>
            <p className="companyReport">Debit Note Details</p>
            <div className="date">
              <b>Transaction Purchase Id: {data.purchaseId}</b>
            </div>
          </div>
          <Grid container>
            <Grid item xs={6}>
              <div>
                <b>Vendor Name:</b> {data.vendorname || ""}
              </div>
              <div>
              <b>Pan No:</b> {data.panNo || ""}
            </div>
            <div>
              <b>Vendor Address:</b> {data.address1 || ""}
            </div>
              <div>
                <b>Vendor Ref(Bill no):</b> {data.vendorReference || ""}
              </div>
            </Grid>
            <Grid item xs={6} style={{textAlign: "right",paddingLeft:"5px"}}>
              <div>
                <b>Receipt Date:</b>{format(new Date(data.recepitDate ),"yyyy/MM/dd HH:mm")}
              </div>
              <div>
                <b>Return Date:</b> {format(new Date(data.returnDate || ""),"yyyy/MM/dd HH:mm")}
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
                    <th>Sub-Total</th>
                  </tr>
                </thead>
                <tbody>
                  {productList &&
                    productList.map((item, idx) => {
                      return (
                        <tr key={item.idx}>
                          <td>{idx + 1}</td>
                          <td>{item.product_name}</td>
                          <td>{item.unitName}</td>
                          <td>{item.productQty}</td>
                          <td>{item.productUnitPrice}</td>
                          <td>{item.productsubtotal}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <div className="row">
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
                        {/* <div>
                          <b>Taxable Amt</b>
                        </div> */}
                        <div>
                          <b>Total Tax</b>
                        </div>
                        <div>
                          <b>Grand Total</b>
                        </div>
                      </div>
                      <div className="col">
                        <div>: {data.subtotal}</div>
                        <div>: {data.discount}</div>
                        {/* <div>: {data.netTotal}</div> */}
                        <div>: {data.taxAmount}</div>
                        <div>: {data.grandTotal}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
      {/* //<ComponentToPrint ref={componentRef} productList={productList} /> */}
    </div>
  );
}
