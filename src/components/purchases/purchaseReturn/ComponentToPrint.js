import React, { useState, useEffect, useRef } from "react";
import CompanyContext from "../../../contexts/CompanyContext";
import { Grid } from "@material-ui/core";
import { toast } from "react-toastify";
import axios from "axios";
import config from "../../../utils/config";
import UserSessionContext from "../../../contexts/UserSessionContext";
import PrintIcon from "@mui/icons-material/Print";
import ReactToPrint from "react-to-print";
import Controls from "../../controls/Controls";

// export const ComponentToPrint = React.forwardRef((props, ref, productList) => {
//     const companyContext = React.useContext(CompanyContext);

//     return (
//       <div ref={ref}>
//         <div className="jreportPage">
//           <div className="reportHeader">
//             <p className="companyName">{companyContext.company.name}</p>
//             <p className="companyAddress">Koteshwor, Kathmandu</p>
//             <p className="companyPan">
//               Pan No : {companyContext.company.panNo}
//             </p>
//             <p className="companyPan">
//               Fiscal Year : {companyContext.fiscal[0].fiscalYear}
//             </p>
//             <p className="companyReport">Purchase Return Details</p>
//             <div className="date">
//               <p>Transaction Purchase Id: {productList.mydata[0].purchaseId}</p>
//             </div>
//           </div>
//           <Grid container>
//             <Grid item xs={6}>
//               <div>
//                 <b>Vendor Name:</b>
//                 {productList.mydata[0].vendorname || ""}
//               </div>
//               <div>
//                 <b>Vendor Reference:</b>{" "}
//                 {productList.mydata[0].vendorReference || ""}
//               </div>
//             </Grid>
//             <Grid item xs={6}>
//               <div>
//                 <b>Receipt Date:</b> {productList.mydata[0].recepitDate || ""}
//               </div>
//               <div>
//                 <b>Return Date:</b> {productList.mydata[0].returnDate || ""}
//               </div>
//             </Grid>
//           </Grid>

//           <div className="row">
//             <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
//               <table className="table table-fluid journal-entry-table">
//                 <thead>
//                   <tr>
//                     <th style={{ width: "45px" }}>S.No.</th>
//                     <th>ProductName</th>
//                     <th>Unit</th>
//                     <th>Quantity</th>
//                     <th>Unit Price</th>
//                     <th>Sub-Total</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {productList.productData &&
//                     productList.productData.map((item, idx) => {
//                       return (
//                         <tr key={item.idx}>
//                           <td>{idx + 1}</td>
//                           <td>{item.product_name}</td>
//                           <td>{item.unitName}</td>
//                           <td>{item.productQty}</td>
//                           <td>{item.productUnitPrice}</td>
//                           <td>{item.productsubtotal}</td>
//                         </tr>
//                       );
//                     })}
//                 </tbody>
//               </table>
//               <div className="sub">
//                 <div className="pl-600">
//                   SubTotal: {productList.mydata[0].subtotal}
//                 </div>
//                 <div className="pl-600">
//                   Total Discount: {productList.mydata[0].discount}
//                 </div>
//                 <div className="pl-600">
//                   Taxable Amount: {productList.mydata[0].netTotal}
//                 </div>
//                 <div className="pl-600">
//                   Total Tax: {productList.mydata[0].taxAmount}
//                 </div>
//                 <div className="pl-600">
//                   Grand Total: {productList.mydata[0].grandTotal}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   });

export  const ComponentToPrint = React.forwardRef((props, ref) => {
  // export class ComponentToPrint extends React.PureComponent {
  //   constructor(props) {
  //     super(props);
  
  //     this.state = { checked: false };
  //   }
  

  const componentRef = useRef();
  const userSessionContext = React.useContext(UserSessionContext);
  const [productList, setProductList] = useState([]);
 
  const data = props.data;
  
  const companyContext = React.useContext(CompanyContext);

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
        
          setProductList(res.data.msg.productData);
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
      });
  };
 
  return (
   
    <div ref={ref}>
      <div style={{ textAlign: "right" }}>
     
      </div>
      <div className="jreportPage">
        <div className="reportHeader">
          <p className="companyName">{companyContext.company.name}</p>
          <p className="companyAddress">{companyContext.company.address}</p>
          <p className="companyPan">Pan No : {companyContext.company.panNo}</p>
          <p className="companyPan">
            Fiscal Year : {companyContext.fiscal[0].fiscalYear}
          </p>
          <p className="companyReport">Purchase Return Details</p>
          <div className="date">
            <p>Transaction Purchase Id: {data.purchaseId}</p>
          </div>
        </div>
        <Grid container>
          <Grid item xs={6}>
            <div>
              <b>Vendor Name:</b>
              {data.vendorname || ""}
            </div>
            <div>
              <b>Vendor Reference:</b> {data.vendorReference || ""}
            </div>
          </Grid>
          <Grid item xs={6}>
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
                      <tr key={item.id}>
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
              <div className="col-8"></div>
              <div className="col-4">
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
 
});
