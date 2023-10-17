import { Divider, Grid } from '@material-ui/core'
import { format } from 'date-fns'
import React, { useRef } from 'react'
import ReactToPrint from 'react-to-print'

const PrintPreview = (props) => {
    const vendor = props.vendor
    const products = props.products
    console.log(products)

    const subtotal = props.subtotal
    const non_tax = props.non_tax
    const tax = props.tax
    const total_tax = props.total_tax
    const grandTotal = props.grandTotal
    const _discount= props.discount
    const componentRef = useRef(null)
    const totalDiscount = products.reduce((total, obj) => parseFloat(obj.productDiscount) + parseFloat(total), 0)
    const totalAmount = products.reduce((total, obj) => parseFloat(obj.productTotal) + parseFloat(total), 0)

    const discount = (totalDiscount / totalAmount) * 100
    return (
        <div ref={componentRef}>
            
            <div className='w-100 mx-auto justify-content-center d-flex'>
                <h4 className='font-medium text-decoration-underline'>Purchase Details Slip</h4>
            </div>
            <span className='w-100 d-flex justify-content-end'>
            <ReactToPrint
                trigger={() => (<button className="btn btn-primary btn-sm">Print</button>)}
                content={() => componentRef.current} />
                </span>
            <Grid container>
                <Grid item xs={10}>
                    <p>
                        <b>Vendor Name: </b>
                        <b>{vendor.vendorname || ""}</b>
                    </p>
                    <p>
                        <b>Address :</b> <b>{vendor.address || ""}</b>
                    </p>
                    <p>
                        <b>Pan :</b> <b>{vendor.panNo || ""}</b>
                    </p>
                    <p>
                        <b>Number :</b> <b>{vendor.contact || ""}</b>
                    </p>

                </Grid>
                <Grid item xs={2}>

                    <p>
                        <b>Bill Ref :</b> <b>{vendor.vendorReference || ""}</b>
                    </p>
                    <p>
                        <b>Receipt Date:</b> <b>{format(new Date(vendor.recepitDate), "yyyy/MM/dd") || ""}</b>
                    </p>
                </Grid>
            </Grid>
            <Divider />
            <br />
            <div>
                <table className="table table-fluid">
                    <tr>
                        <th style={{ width: "40px" }}>S.No.</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Unit</th>
                        <th>Unit price</th>
                        <th>Tax</th>
                        <th>Total</th>
                    </tr>
                    {products
                        ? products.map((row, idx) => {
                            return (
                                <tr key={row.id}>
                                    <td>{idx + 1}</td>
                                    <td>{row.product_name}</td>

                                    <td>{row.userQuantity}</td>
                                    <td>{row.userUnitName}</td>
                                    <td>{row.productUnitPrice}</td>
                                    <td>{row.productTax > 0 ? "13% Vat" : "0% Vat"}</td>
                                    <td>{Number(parseFloat(row.productUnitPrice * row.userQuantity)).toFixed(3)}</td>
                                </tr>
                            );
                        })
                        : []}

                </table>
            </div>
            <div className="w-100 justify-content-end d-flex">
                <div className="right">
                    <table>
                        <tr>
                            <td>Sub-Total:</td>
                            <td id="subTotalValue">{subtotal}</td>
                        </tr>
                        <tr>
                            <td>Total Discount(%) :</td>
                            <td id="discountValue">{_discount}</td>
                        </tr>
                        <tr>
                            <td>Non Taxable Amount :</td>
                            <td id="taxableValue">{non_tax}</td>
                        </tr>
                        <tr>
                            <td>Taxable Amount:</td>
                            <td id="nonTaxableValue">{tax}</td>
                        </tr>
                        <tr>
                            <td>Total Tax:</td>
                            <td id="nonTaxableValue">{total_tax}</td>
                        </tr>
                        <tr>
                            <td>Grand Total :</td>
                            <td id="taxValue">{grandTotal}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default PrintPreview