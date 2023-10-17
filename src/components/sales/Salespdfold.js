import React from "react";
import { format } from "date-fns";
import CompanyContext from "../../contexts/CompanyContext";
import Controls from "../controls/Controls";
import PrintIcon from "@mui/icons-material/Print";
const Salespdf = ({ productData, data }) => {
  const numWords = require("num-words");
  var adbs = require("ad-bs-converter");

  //const amountInWords = numWords(parseInt(data.grandTotal));

  let amountArr = data.grandTotal.toString().split(".");
  //console.log(`${data.grandTotal} = ${numWords(amountArr[0])} rupees and ${numWords(amountArr[1])} paisa`);
  // let amountWord =
  //   numWords(amountArr[0]) + " rupees and " + numWords(amountArr[1]) + " paisa";
  let amountWord = numWords(amountArr[0]) + " rupees only";

  const date_of_sales = format(
    new Date(data.dateOfSales),
    "yyyy-MM-dd HH:mm:ss"
  );
  const date_of_sales_nepali = format(
    new Date(data.dateOfSales),
    "yyyy/MM/dd "
  );
  const nepalidate = adbs.ad2bs(date_of_sales_nepali);
  const miti =
    nepalidate.en["year"] +
    "/" +
    nepalidate.en["month"] +
    "/" +
    nepalidate.en["day"];

  const companyContext = React.useContext(CompanyContext);
  return (
    <div className="reportPage salesInvoice">
      <Controls.Button
        text="Print"
        variant="outlined"
        startIcon={<PrintIcon />}
        className="printBtn"
        onClick={() => {
          window.print();
        }}
      />
      <div className="contentsToPrint" id="ifmcontentstoprint">
        <div className="reportHeader">
          <p className="companyName">{companyContext.company.name}</p>
          <p className="companyAddress">
            {companyContext.company.address || ""}
          </p>
          <p className="companyAddress">
            {companyContext.company.phone_no || ""}
          </p>
          <p className="">Tax Invoice</p>
          <div className="date">
            <p className="companyPan">
              VAT No. : {companyContext.company.panNo || ""}
            </p>
            <p>Invoice No. :{data.bill_no}</p>
          </div>
          <div className="date">
            <p className="buyerName">Buyer's Name :{data.customerName || ""}</p>
            <p> Inovice Date: {date_of_sales}</p>
          </div>
          <div className="date">
            <p className="buyerAddress">Address :{data.address || ""}</p>
            <p> Nepali Date: {miti}</p>
          </div>
          <div className="date">
            <p className="buyerVAT">Buyer's VAT No. :{data.panNo || ""}</p>
            <p>Fiscal Year :{companyContext.fiscal[0]["fiscalYear"]}</p>
          </div>
          <p className="smalltxt">
            <small>Mode of Payment: {data.paymentMode}</small>
          </p>
        </div>
        <table>
          <thead>
            <tr>
              <th style={{ width: "5%" }}>S.N.</th>
              <th style={{ width: "55%" }}>Item</th>
              <th style={{ width: "10%" }}>Qty</th>
              <th style={{ width: "15%" }}>Price</th>
              <th style={{ width: "15%" }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {productData &&
              productData.map((item, idx) => {
                return (
                  <tr key={item.id}>
                    <td>{idx + 1}</td>
                    <td>{item.productName}</td>
                    <td>{item.productQTY}</td>
                    <td>{item.productCost}</td>
                    <td>{item.productTotal}</td>
                  </tr>
                );
              })}

            <tr>
              <td colSpan={3} rowSpan={5}>
                In Words: {amountWord}
              </td>
              <td>Sub-Total</td>
              <td>{data.subTotal}</td>
            </tr>
            <tr>
              <td>Discount</td>
              <td>{data.discount}</td>
            </tr>
            <tr>
              <td>Taxable Amount</td>
              <td>{""}</td>
            </tr>
            <tr>
              <td>VAT 13%</td>
              <td>{data.taxAmount}</td>
            </tr>
            <tr>
              <th>Grand Total</th>
              <th>{data.grandTotal}</th>
            </tr>
          </tbody>
        </table>
        <div className="date">
          <div className="sellerSign">
            <p>......................</p>
            <p>Cashier</p>
          </div>
          <div className="buyerSign">
            <p>......................</p>
            <p>Customer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Salespdf;
