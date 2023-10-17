
import { React, useContext, useRef, useState } from "react";
// import "./Print.css";

import ReactToPrint from "react-to-print";
import { Grid } from "@material-ui/core";

const ReactPrint = (props) => {
    const customer = props.customer
    const data = props.data
    const subTotal = props.subTotal
    const nontax = props.nontax
    const _taxableAmount = props._taxableAmount
    const _grandtotal = props._grandtotal
    const tax = props.tax
    const discount = props.discount

    // const companyContext = useContext(CompanyContext)
    const componentRef = useRef(null)

    const totalDiscount = data.reduce((total, obj) => parseFloat(obj.productDiscount) + parseFloat(total), 0)
    const totalAmount = data.reduce((total, obj) => parseFloat(obj.productTotal) + parseFloat(total), 0)

    const _discount = (totalDiscount / totalAmount) * 100
    console.log("_discount", _discount)

    return (

        <div >
            <div ref={componentRef}>
                <Grid container>
                    <Grid item sm={4}>
                        <div className="d-flex w-100 mx-auto">
                            <b>Customer Name : </b>
                            <b>{customer.customerName || ""}</b>
                        </div>
                        <div className="d-flex  w-100 mx-auto">
                            <b>Address : </b>
                            <b>{customer.address || ""}</b>
                        </div>
                        <div className="d-flex  w-100 mx-auto">
                            <b >Pan No. : </b>
                            <b>{customer.panNo || ""}</b>
                        </div>
                        <div className="d-flex  w-100 mx-auto">
                            <b>Sales Date : </b>
                            <b>{customer.dateOfSales || ""}</b>
                        </div>
                    </Grid>

                    <Grid item sm={4} className="d-flex justify-content-center">
                        <h3>Pro Forma Invoice</h3>
                    </Grid>
                    <Grid item sm={4} className="d-flex justify-content-end">
                        <span>
                            <ReactToPrint
                                trigger={() => (<button className="btn btn-primary btn-sm">Print</button>)}
                                content={() => componentRef.current}/>
                            </span>
                    </Grid>
                </Grid>
                <br />
                <div>
                    <table
                        style={{
                            height: "100%",
                            width: "100%",
                            borderCollapse: "collapse",
                        }}
                    >
                        <tr style={{ borderTop: "1px black solid" }}>
                            <th>S.No.</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Unit</th>
                            <th>Unit price</th>
                            <th>Total</th>
                            <th>Discount</th>
                            <th>Tax</th>
                            <th>Sub Total</th>
                        </tr>
                        {data.map((items, index) => {
                            return (
                                <tr key={index} style={{ borderTop: "1px black solid" }}>
                                    <td>{index + 1}</td>
                                    <td>{items.productName}</td>
                                    <td>{items.productQTY}</td>
                                    <td>{items.unitName}</td>
                                    <td>{items.productCost}</td>
                                    <td>{(items.productTotal).toFixed(2)}</td>
                                    <td>{items.productDiscount}</td>
                                    <td>{(items.productTax).toFixed(2)}</td>
                                    <td>{(items.productSubtotal).toFixed(2)}</td>
                                </tr>
                            )
                        })}

                    </table>
                </div>
                <br />
                <div className="w-100 justify-content-end d-flex">
                    <div className="right">
                        <table>
                            <tr>
                                <td>Sub-Total:</td>
                                <td id="subTotalValue">{subTotal}</td>
                            </tr>
                            <tr>
                                <td>Total Discount(%) :</td>
                                <td id="discountValue">{_discount.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td>Non Taxable Amount :</td>
                                <td id="taxableValue">{nontax}</td>
                            </tr>
                            <tr>
                                <td>Taxable Amount:</td>
                                <td id="nonTaxableValue">{_taxableAmount}</td>
                            </tr>
                            <tr>
                                <td>Total Tax:</td>
                                <td id="nonTaxableValue">{tax}</td>
                            </tr>
                            <tr>
                                <td>Grand Total :</td>
                                <td id="taxValue">{_grandtotal}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            {/* <p>Value</p> */}
        </div>

    );
};


export default ReactPrint