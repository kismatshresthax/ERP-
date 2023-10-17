import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@material-ui/core'
import React, { useState } from 'react'
import ExcelSheet from '../../pages/Excel/ExcelSheet'
import PDF from '../../pages/PDF/PDF'
import Popup from '../../home/Popup';
import MatrixReport from './MatrixReport';
import Controls from '../../controls/Controls';
import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
const MatrixReportTable = ({ product }) => {
const [isNewPopup,setIsNewPopup]=useState(false)
   // const [discountedTotal, setDiscountedTotal] = useState()
    const products = product && product.filter((item) => {
        return (
            item.categoryName === 'GrandTotal')
    })
    
    const cat_array = product && product.slice(0,product.length-1).map(({ categoryName, child }) => ({
        label:categoryName,
        value: child[child.length - 1].productTotal,
      }));
      console.log( cat_array);
    const table_foot = [product[product.length]]

    let table1 = [
        {
            A: "Category Name",
            B: "Item",
            C: "Quanity",
            D: "Rate",
            E: "Total",
            F: " Discount Price",
            G: "Service Charge",
            H: "Vat"
        }
    ]

    {
        product && product.map(item => {

            {
                item.child && item.child.forEach((items, idx) => {
                
                    {
                        items.categoryName !== 'Total' ?
                        table1.push(
                            {
                                A: idx === 0 ? (items.categoryName) : null,
                                B: (items.productName),
                                C: (items.productQTY),
                                D: (items.productCost),
                                E: (items.productSubtotal),
                                F: (items.productDiscount),
                                G: 0,
                                H: items.productTax
                            }) :
                        table1.push({
                            B: items.categoryName,
                            C:items.productQtyTotal,
                            D:0 ,
                            E: items.productSubTotal,
                            F: items.productDiscountTotal,
                            G: 0,
                            H: items.productTaxTotal
                        })

                    }
                })
            }
        });
    }


    return (
        <>
            <div className='d-flex'>
                <p className=' fs-6 fw-bolder d-flex justify-content-center flex-grow-1 '>Matrix Sales</p>
                <Popup
              title="Day End Report"
              size="lg"
              openPopup={isNewPopup}
              setPopups={setIsNewPopup}
            >
              <MatrixReport />
            </Popup>
                <div className="dropdown-center dropstart shadow-none ">
                <Controls.ActionButton
                        color="primary"
                        onClick={() => {
                         setIsNewPopup(true);
                        }}
                      >
                        <Tooltip title="View" placement="top" arrow>
                        <RemoveRedEyeIcon fontSize="small" />
                      </Tooltip>                        
                      </Controls.ActionButton>
                    <button type="button" className="btn btn-primary btn-sm dropdown-toggle dropdown-toggle-split rounded-0" data-bs-toggle="dropdown" aria-expanded="false">
                    </button>
                    <ul className="dropdown-menu my-0 ">
                        <li className="mb-1 my-0">
                            <PDF
                            data={table1}
                            title="Matrix Sales"
                        />
                          
                        </li>
                        <hr className="my-0" />
                        <li className="mt-1">
                            <ExcelSheet
                                data={[table1]}
                                title="Matrix Sales"
                                dateFrom='2020-09-20'
                                dateTo='2020-09-20' />
                        </li>

                    </ul>
                    <button type="button" className="btn btn-outline-primary btn-sm rounded-0" >
                        Export
                    </button>
                </div>
            </div>
            <table className='table '>
                <thead className='bg-white' style={{ fontSize: '15px', position: 'sticky', top: 0 }}>
                    <tr style={{ fontSize: '15px' }} >
                        <th>Category Name</th>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Rate</th>
                        {/* <th>Extra Charge</th> */}
                        <th>Total</th>
                        <th>Discount %</th>
                        {/* <th>Total With Discount</th> */}
                        <th>Service Charge</th>
                        <th>Vat</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">

                    {
                        product && product.map((items, id) => {


                            return (
                                <>

                                    {items.child && items.child.map((item, idx) => {

                                        return (
                                            <>
                                                <tr className={item.productName === "Total" && ' fs-6 bg-secondary bg-opacity-50 border border-dark border-2 text-white fw-bold'}>
                                                    <td className='fs-5 fw-bolder'>{idx === 0 ? item.categoryName : null}</td>
                                                    <td >{item.productName}</td>
                                                    <td>{item.productName === "Total" ? item.productQtyTotal : item.productQTY}</td>
                                                    <td>{item.productName !== "Total" && item.productCost}</td>
                                                    <td>{item.productName === "Total" ? item.productTotal : item.productSubtotal}</td>
                                                    <td>{item.productName === "Total" ? item.productDiscountTotal : item.productDiscount}</td>
                                                    {/* <td>{item.productName === "Total" ? item.productTotal - item.productDiscountTotal : item.productSubtotal - item.productDiscount}</td> */}
                                                    <td>{item.service ? item.service : 0} </td>
                                                    <td>{item.productName === "Total" ? item.productTaxTotal : item.productTax}</td>
                                                </tr>
                                            </>
                                        )
                                    })}


                                </>

                            )
                        })
                    }
                </tbody>
                <br></br>
                <tfoot>
                    {
                        products && products.map((item) => {
                            return (
                                <tr className='fs-5 border border-dark border-2 bg-success text-white fw-bold'>
                                    <td>{item.categoryName}</td>
                                    <td>{item.categoryName}</td>
                                    <td>{item.productQtyTotal}</td>
                                    <td>{item.productCost}</td>
                                    <td>{item.productSubTotal}</td>
                                    <td>{item.productDiscountTotal}</td>
                                    {/* <td>{item.productSubTotal-item.productDiscountTotal}</td> */}
                                    <td>0</td>
                                    <td>{item.productTaxTotal}</td>
                                </tr>
                            )
                        })
                    }
                </tfoot>
            </table>
        </>

    )
}

export default MatrixReportTable