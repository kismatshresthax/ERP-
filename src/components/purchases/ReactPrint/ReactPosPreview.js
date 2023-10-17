import { React, useContext, useRef, useState } from "react";
// import "./Print.css";
import ReactToPrint from "react-to-print";
import CompanyContext from "../../../contexts/CompanyContext";
import NepaliDate from "../../../utils/NepaliDate";
// import NepaliDate from "nepali-date-converter";
// import NepaliDate from "../../../utils/NepaliDate";

//import numberToWords from "number-to-words";

export const ReactPosPreview = ({vendor,products,date,_non_taxable ,payment,remaingamount}) => {
console.log(payment);
console.log(remaingamount);
  const numWords = require("num-words");
 

  // const [isPan, setIsPan] = useState(false);
  // const [isAd, setIsAd] = useState(true);



  // const handleTax = () => {
  //   return (
  //     <>

  //       <p>Sub total:</p>
  //       <p>Discount:</p>
  //       <p>Non-texable:</p>
  //       <hr style={{ margin: "1px", width: "200px" }} />
  //       <hr style={{ margin: "1px", width: "200px" }} />

  //       <p>Total:</p>
  //     </>
  //   );
  // };
  // const handlePan = () => {
  //   return (
  //     <>

  //       <p>sub-total:</p>
  //       <p>Amount:</p>
  //       <p>taxable:</p>
  //       <p>Non-taxable:</p>
  //       <p>Tax:</p>
  //       <hr style={{ margin: "1px", width: "200px" }} />
  //       <hr style={{ margin: "1px", width: "200px" }} />

  //       <p>Total:</p>
  //     </>
  //   );
  // };
  // const handleAd = () => {
  //   return (
  //     <>

  //       <p>Gross Amount:</p>
  //       <p>Discount:</p>
  //       <hr style={{ margin: "1px", width: "200px" }} />
  //       <hr style={{ margin: "1px", width: "200px" }} />

  //       <p>Total:</p>
  //     </>
  //   );
  // };
  const componentRef = useRef(null)
  const companyContext = useContext(CompanyContext)
  let amountArr = ((vendor.grandTotal).toFixed(2)).toString().split(".");
  let amountWord = numWords(amountArr[0]) + " rupees and " + numWords(amountArr[1]) + " paisa" + " only";
  return (
    <div className="">
      <span className='w-100 d-flex justify-content-end'>
        <ReactToPrint
          trigger={() => (<button className="btn btn-primary btn-sm">Print</button>)}
          content={() => componentRef.current} />
      </span>
      <div ref={componentRef} className="w-100">
        {/* <div className="d-flex flex-column w-100 justify-content-center mx-auto">
          <span className="d-flex flex-column">
          <h2>The Wings Factory</h2>
          <p>Mid-baneshwar</p>
          <p>01-4578244</p>
          <p>Tax Invoice</p>
          </span>
        </div> */}
        <div className="d-flex justify-content-center w-100 text-center">
          <span className="text-center gap-1">
          <h3 className="text-center bold my-0">{companyContext.companies[0].name}</h3>
          <h4 className="text-center my-0">{companyContext.companies[0].address}</h4>
          <h4 className="text-center my-0">{companyContext.companies[0].phone_no}</h4>
          <h4 className="text-center my-0"> {companyContext.companies[0].panNo} </h4>
          {/* <h4>Tax Invoice</h4> */}
          </span>
        </div>
        
        <div className="d-flex flex-row justify-content-between">
          <div style={{ textAlign: "left", fontSize: "16px", fontWeight: "600" }}>
            <p className="my-0">Bill NO:</p>
            {/* <p>Area:</p>
            <p>Table No: </p>
            <p>Table Name: </p> */}
            <p className="my-0"> NepaliDate: {NepaliDate(date)} </p>
            <p className="my-0">Transaction Date: {date}</p>
            <p className="my-0" >Invoice Date: {date}</p>
            <p className="my-0">Fiscal Year:  {vendor.fiscalyear}</p>
            <p className="my-0"> Cashier:{vendor.createdBy
}</p>
          </div>
          <div className="d-flex flex-column"
            style={{ textAlign: "left", marginTop: "13px", fontWeight: "600" }}>
            <p className="my-0">Vendors Name: {vendor.vendorname} </p>
            <p className="my-0">Vendors Contact: {vendor.contactNumber1} </p>
            <p className="my-0">Vendors Address: {vendor.address}</p>
            <p className="my-0">Vendors Pan: {vendor.panNo}</p>
          </div>
        </div>
       
        <div>
          <table
            style={{
              height: "100%",
              width: "100%",
              borderCollapse: "collapse",
              font:'15px'
            }}
          >
            <tr style={{ borderTop: "1px black solid", borderBottom:'1px black solid',  }}>
              <th>S.N</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Unit</th>
              <th>Price/Unit</th>
              <th>Subtotal</th>
            </tr>
           {
            products && products.map((item,idx)=>{
              return(
                <tr key={item.id} >
                      <td>{idx + 1}</td>
                      <td>{item.product_name}</td>

                      <td>{item.userQuantity}</td>
                      <td>{item.userUnitName}</td>
                      <td>{item.productUnitPrice}</td>
                      <td>{item.productSubtotal}</td>
  
                    </tr>
              )
            })
           }
          </table>
          <hr/>
        </div>

        <div className=" d-flex flex-row justify-content-between mt-2 px-4" style={{fontSize :'16px'}}>

          <div className="d-flex flex-column gap-2 ">

            <div className="my-0" style={{  fontWeight: "Bold" }}>Mode of payment :</div>
            <div
              className="align-items-center d-flex justify-content-center my-0"
              style={{
                width: "90px",
                height: "40px",
                border: "1px solid black",
              }}
            >
              Credit
            </div>

          </div>
          <div className="">
            <table >
              <tr className="my-0">
                <td>Sub-Total:</td>
                <td id="subTotalValue">{vendor.subtotal}</td>
              </tr>
              <tr className="my-0">
                <td>Discount:</td>
                <td id="discountValue">{vendor.discount}</td>
              </tr>
              <tr className="my-0">
                <td>Taxable:</td>
                <td id="taxableValue">{vendor.taxAmount}</td>
              </tr>
              <tr className="my-0">
                <td>Non-Taxable:</td>
                <td id="nonTaxableValue">{_non_taxable}</td>
              </tr>
              <tr className="my-0">
                <td>Tax:</td>
                <td id="taxValue">{vendor.taxAmount}</td>
              </tr>
            </table>

          </div>




        </div>
        <hr className="m-0" />
        <div className="d-flex my-0">
        <h3 class="p-2 w-50 my-0">Grand Total :</h3>
        <h4 class="p-2 flex-shrink-1 font-semibold my-0">{vendor.grandTotal}</h4>
        <p></p>
        </div>
        <div className="d-flex justify-content-center my-0">
          <h5 className="font-uppercase font-bold mb-1 mt-1">In Words: { amountWord } only</h5>
          </div>
        <hr className="m-0"/>
        <div className="d-flex flex-column gap-1 my-0 py-0" style={{fontSize:'15px'}}>
          <div className="d-flex my-0">
          <p className="w-25 text-end my-0">Received AMT:</p>
          <p className=" flex-shrink-1 w-50 text-end my-0">{payment}</p>
          </div>
          <div className="d-flex my-0 ">
          <p className="w-25 text-end my-0">Changed AMT:</p>
          <p className=" flex-shrink-1 w-50 text-end my-0">:</p>
          </div>
        </div>
        <hr />
        <h2 style={{ textAlign: "center" }} className="fs-2 font-bold mb-3">Thank You </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
          className="mt-5"
        >
          <div style={{ borderTop: "1px solid black" }}> Cashier</div>

          <div style={{ borderTop: " 1px solid black" }}> Customer</div>
        </div>
     
      </div>
    </div>
  );
};