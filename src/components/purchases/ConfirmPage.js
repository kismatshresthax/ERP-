import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../utils/config";
import UseTable from "../home/UseTable";
import {TableBody,TableRow,TableCell,} from "@material-ui/core";
import Controls from "../controls/Controls";
import UserSessionContext from "../../contexts/UserSessionContext";
import { toast } from "react-toastify";
import Spinner from "../../utils/spinner";
import "./styles.css";

const headCells = [
  { id: "productId", label: "Product Name" },
  { id: "productQty", label: "Unit" },
  { id: "productQty", label: "Quantity" },
  { id: "productUnitPrice", label: "Unit Price" },
  { id: "productSubtotal", label: " Subtotal" },
  { id: "productDiscount", label: " Discount" },
  { id: "productTax", label: "Tax" },
];

const ConfirmPage = (props) => {
  const userSessionContext = React.useContext(UserSessionContext);
  const [data, setData] = useState({});
  const [productData, setProductData] = useState([]);
  const [paymentMode, setPaymentMode] = useState([]);
  const { TblContainer, TblHead } = UseTable(productData, headCells);
 // const [savePayment, setSavePayment] = useState(0);
  // const [saveComplete, setSaveComplete] = useState(0);

  useEffect(async() => {
   await axios
      .get(
        `${config.APP_CONFIG}/Purchase/ProductPurchaseSummary/api/${props.data.id}`,{ headers: {Authorization: userSessionContext.token } }
      )
      .then((res) => {
        if (res.data.status_code === 200) {
          let temp = res.data.msg;
          setData(temp.mydata[0]);
          setProductData(temp.productData);
          setPaymentMode(temp.paymentMode);
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
  }, []);

  // const doClose = () => {
  //   if (savePayment === 0) {
  //     alert("First Save Payment");
  //   } else {
  //     if (saveComplete === 0) {
  //       let confirm = window.confirm("Do You Want To Close Purchase ?");
  //       if (confirm) {
  //         let req_data = {
  //           isCompleted: 1,
  //         };
  //         axios
  //           .put(
  //             `${config.APP_CONFIG}/Purchase/StatusUpdate/api/${props.data.id}`,
  //             req_data
  //           )
  //           .then((res) => {
  //             if (res.data.status_code === 200) {
  //               toast.success(res.data.msg);
  //               props.updateSetdata({ ...props.data, isCompleted: 1 });
  //               setSaveComplete(1);
  //               props.step_handler("next");
  //             } else if (res.data.status_code === 400) {
  //               userSessionContext.handleLogOut();
  //             } else {
  //               toast.error(res.data.msg);
  //             }
  //           })
  //           .catch((err) => {
  //             toast.error("Something went Wrong");
  //           });
  //       }
  //     } else {
  //       return;
  //     }
  //   }
  // };

  if (data === undefined) {
    return <Spinner />;
  }
  if (productData === undefined) {
    return <Spinner />;
  }
  if (paymentMode === undefined) {
    return <Spinner />;
  }

  return (
    <div className="container">
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
            <b>Order Deadline:</b> {data.orderDeadline || ""}
          </div>
          <div>
            <b>Receipt Date:</b> {data.recepitDate || ""}
          </div>
        </Grid>
      </Grid>
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
          <TblContainer>
            <TblHead />
            <TableBody>
              {productData && productData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.product_name}</TableCell>
                    <TableCell>{item.unitName}</TableCell>
                    <TableCell>{item.productQty}</TableCell>
                    <TableCell>{item.productUnitPrice}</TableCell>
                    <TableCell>{item.productsubtotal}</TableCell>
                    <TableCell>{item.productDiscount || "-"}</TableCell>
                    <TableCell>{item.productTax || "-"}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </TblContainer>
          <div>Sub Total:{props.data.subTotal}</div>
          <div>Total Discount:{props.data.subTotal}</div>
          <div>Total Tax: {props.data.subTotal}</div>
          <div>Grand Total: {props.data.subTotal}</div>
          <div>Net Total: {props.data.subTotal}</div>
        </div>
      </div>
      <Controls.Button
            type="submit"
            text="Confirm"
            // onClick={(e) => {
            //   e.preventDefault();
            //   if (
            //     products === undefined ||
            //     products === null ||
            //     products.length === 0
            //   ) {
            //     toast.warn("Please Add Product First");
            //   } else {
            //     doConfirm();
            //   }
            // }}
          />
    </div>
  );
};

export default ConfirmPage;
