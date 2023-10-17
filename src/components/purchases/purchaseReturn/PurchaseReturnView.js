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
export default function PurchaseReturnView(props) {
  const userSessionContext = React.useContext(UserSessionContext);
  const companyContext = React.useContext(CompanyContext);
  const [productList, setProductList] = useState([]);
  const [data, setData] = useState([]);
  const _data = props.data || {};
  // const { TblContainer, TblHead } = UseTable(productList, headCells);

  useEffect(() => {
    loadPurchaseReturnById();
  }, []);

//   const loadPurchaseReturnById = () => {
//     axios
//       .get(`${config.APP_CONFIG}/Purchase/PurchaseReturn/api/${_data.id}`, {
//         headers: {
//           Authorization: userSessionContext.token,
//         },
//       })
//       .then((res) => {
//         if (res.data.status_code === 401) {
//           userSessionContext.handleLogOut();
//         } else if (res.data.status_code === 200) {
//           setProductList(res.data.msg.salesProduct);
//           setData(res.data.msg.salesData[0]);
//         } else if (res.data.status_code === 400) {
//           toast.warn(res.data.msg);
//           setProductList([]);
//         } else {
//           toast.error("Error Occurred");
//           // setProductList([]);
//         }
//       })
//       .catch((err) => {
//         toast.error("Something went Wrong");
//         // setProductList([]);
//       });
//   };

const loadPurchaseReturnById = async() => {
   await axios
      .get(`${config.APP_CONFIG}/Purchase/PurchaseReturn/api/${_data.id}`, {
        headers: {
          Authorization: userSessionContext.token,
        },
      })
      .then((res) => {
        if (res.data.status_code === 401) {
          userSessionContext.handleLogOut();
        } else if (res.data.status_code === 200) {
    
          setProductList(res.data.msg.productData);
          setData(res.data.msg.mydata[0]);
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
  // console.log(productList);
  return (
    <div className="purchaseReturnReport">
      {productList.length !== 0 ? (
        <div style={{ textAlign: "right" }}>
          <Controls.Button
            text="Print"
            variant="outlined"
            startIcon={<PrintIcon />}
            className="printBtn"
            onClick={() => {
              window.print();
            }}
          />
        </div>
      ) : null}

      <div className="jreportPage">
        <div className="reportHeader">
          <p className="companyName">{companyContext.company.name}</p>
          <p className="companyAddress">{companyContext.company.address}</p>
          <p className="companyPan">Pan No : {companyContext.company.panNo}</p>
          <p className="companyPan">
            Fiscal Year : {companyContext.fiscal[0].fiscalYear}
          </p>
          <p className="companyReport">Debit Note</p>
          <div className="date">
            <p>Transaction Purchase Id: {data.purchaseId}</p>
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
              <b>Vendor Ref(Bill No):</b> {data.vendorReference || ""}
            </div>
          </Grid>
          <Grid item xs={6} style={{textAlign: "right"}}>
            <div>
              <b>Receipt Date:</b> {data.recepitDate || ""}
            </div>
            <div>
              <b>Return Date:</b> {data.returnDate || ""}
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
                      <div>
                        <b>Taxable Amt</b>
                      </div>
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
                      <div>: {data.netTotal}</div>
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
    </div>
  );
}
