import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../utils/config";
import UseTable from "../home/UseTable";
import { Grid } from "@material-ui/core";
import { TableBody, TableRow, TableCell } from "@material-ui/core";
import Controls from "../controls/Controls";
import { Box, Card, CardActions, Checkbox, FormControlLabel,  InputLabel, Paper, Table, TableContainer,  TextField, Typography } from '@material-ui/core'
import { toast } from "react-toastify";

import "./styles.css";

import Tablepdf from "./Tablepdf";
import Popup from "../../components/home/Popup";
import PrintIcon from "@mui/icons-material/Print";

import AddIcon from "@material-ui/icons/Add";

import UserSessionContext from "../../contexts/UserSessionContext";
import CompanyContext from "../../contexts/CompanyContext";

import Spinner from "../../utils/spinner";
import Select from "react-select";
import { makeStyles } from "@material-ui/core";
import Tooltip from "@mui/material/Tooltip";
import format from "date-fns/format";
import { ThermalPrint } from "../settings/Print/ThermalPrint";

const headCells = [
  { id: "productId", label: "S.N" },
  { id: "productId", label: "Product Name" },
  { id: "inhouseUnitId", label: "Unit", disableSorting: true },
  { id: "productQTY", label: "Quantity", disableSorting: true },
  { id: "productUnitPrice", label: "Unit Price", disableSorting: true },
  { id: "productSubtotal", label: " Subtotal", disableSorting: true },
 
];

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  newButton: {
    position: "relative",
    float: "right",
    zIndex: 4,
  },
  newButton1: {
    zIndex: 4,
    color: "#3f51b5",
    border: "1px solid #3f51b5",
  },
  card:{
    textTransform: 'uppercase', minWidth: '220px', cursor: 'pointer',color:'#ffff'
  },
  box:{
    display: 'flex', justifyContent: 'space-between', width: 'full', marginTop: '20px'
  },
 box1: {
    display: 'flex', flexDirection: 'column'
  }
}));
// const CashTable=(props)=>{
//    return (
//     <table>
//       <tr>
//         <td>Grandtotal</td>
//         <td>857</td>
//       </tr>
//       <tr>
//         <td>Remaining</td>
//         <td>568</td>
//       </tr>
//     </table>
//    )
// }
// const Cash = (props) => {
//   const classes = useStyles(props);
//   const carddata=[

//     {
//       "Card": "Cash",
//       "Total": 938,
//       "Remaining": 100,
//       "Color": "#5584a6"
//     }, {
//       "Card": "Credit",
//       "Total": 853,
//       "Remaining": 78,
//       "Color": "#5addab"
//     }, {
//       "Card": "cheque",
//       "Total": 567,
//       "Remaining": 34,
//       "Color": "#b7e870"
//     }, {
//       "Card": "Esewa",
//       "Total": 477,
//       "Remaining": 20,
//       "Color": "#929b17"
//     }, {
//       "Card": "Nic Asia",
//       "Total": 844,
//       "Remaining": 52,
//       "Color": "#a0a66f"
//     }, {
//       "Card": "Nmb",
//       "Total": 762,
//       "Remaining": 35,
//       "Color": "#38d2e2"
//     }, {
//       "Card": "Hamro",
//       "Total": 994,
//       "Remaining": 66,
//       "Color": "#05dd5f"
//     }

// ]
//   const [click, setClick] = useState('')
//   const [data, setData] = useState()
//   const handleChange = (items, index) => {

//       setClick(index)
//       setData(items)
//   }
//   // const handlePaymentChange = (id, mode, amount) => {
//   //   const existingPayment = payments.find(payment => payment.mode === mode);

//   //   if (existingPayment) {
//   //     const updatedPayments = payments.map(payment =>
//   //       payment.mode === mode ? { ...payment, amount } : payment
//   //     );
//   //     setPayments(updatedPayments);
//   //   } else {
//   //     const newPayment = { id, mode, amount };
//   //     setPayments([...payments, newPayment]);
//   //   }
//   // };

//   // const handleSplitPayment = () => {
//   //   if (isSplitChecked && splitAmount > 0) {
//   //     const remainingAmount = grandTotal - payments.reduce((total, payment) => total + parseInt(payment.amount), 0);
//   //     const newPayment = { id: payments.length + 1, mode: 'split', amount: splitAmount > remainingAmount ? remainingAmount : splitAmount };
//   //     setPayments([...payments, newPayment]);
//   //   }
//   // };
//   // setClick(false)
//   return (
//       // <Paper elevation={3} sx={{ padding: '50px', justifyContent: 'center' }}  >
//         <div>
//           <Grid container spacing={2} className='mx-auto d-flex justify-content-center mt-4'>
//               {carddata.map((items, index) => {
//                   return (
//                       <>
//                           <Grid item xs={4} sm={3} md={2.3} className='d-flex' key={index}>
//                               <Card
//                                   style={{
//                                       backgroundColor: click === index ? '#007bff' : 'white',
//                                       color: click === index ? 'white' : 'black',
//                                   }}
//                                   onClick={(e) => handleChange(items, index)}
//                               >
//                                   <CardActions  className={classes.card} ><p style={{fontSize:"13px",color:'blue'}} className='fw-medium mx-auto my-auto'>{items.Card}</p></CardActions>
//                               </Card>
//                           </Grid>
//                       </>
//                   )
//               })}
//           </Grid>
//           <Box className={classes.box}>
//               <Box  className={classes.box1}>
//                   <FormControlLabel control={<Checkbox />} label='Split' />
//                   <div className='d-flex flex-row gap-2'>
//                       <TextField label='Enter the amount' variant='standard' />
//                       <button className='btn btn-warning text-white'>Add</button>
//                   </div>
//               </Box>
//               <Box className='w-25 d-flex justify-content-end '>
//                   {
//                       data ? <CashTable data={data} /> : null
//                   }
//               </Box>
//           </Box>

//           </div>
//   )
// }



const AddForm = (props) => {
  const [pay, setPay] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <tr>
      <td width="300px">
        {props.savePayment === 0 ? (
          <Select
            options={props.paymentModes}
            value={pay}
            onChange={(e) => {
              setPay(e);
            }}
            styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
            menuPortalTarget={document.body}
          />
        ) : null}
      </td>
      <td width="200px">
        {props.savePayment === 0 ? (
          <input
            type="number"
            placeholder="0.00"
            min={0}
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
        ) : null}
      </td>
      <td>
        {props.savePayment === 0 ? (
          <Controls.ActionButton
            color="secondary"
            onClick={(e) => {
              if (amount === "" || pay === "") {
                return toast.warn("Please Fill The Form");
              } else {
           
                props.addRow({
                  mode: pay.label,
                  amount: parseFloat(amount),
                  status: "true",
                });
                setPay("");
                setAmount("");
              }
            }}
          >
            <Tooltip title="Add" placement="top" arrow>
              <AddIcon style={{ fontSize: "15px" }} />
            </Tooltip>
          </Controls.ActionButton>
        ) : null}
      </td>
    </tr>
  );
};

export default function FormThree(props) {
 
  const classes = useStyles(props);
  const userSessionContext = React.useContext(UserSessionContext);
  const [data, setData] = useState({});
  const [productData, setProductData] = useState([]);
  const [paymentMode, setPaymentMode] = useState([]);
  const companyContext = React.useContext(CompanyContext);
  const [savePayment, setSavePayment] = useState(0);
  const [isNewPopup, setIsNewPopup] = useState(false);
  const [isThermalPopup, setIsThermalPopup] = useState(false);
  const [paymentData, setPaymentData] = useState({});
  const [paymentModes, setPaymentModes] = useState();
  const { TblContainer, TblHead } = UseTable(productData, headCells);
  const [customerDetail, setCustomerDetail] = useState();

  useEffect(() => {
    loadAllData();
   
  }, []);
  const loadAllData = async() => {
    await axios
    .get(`${config.APP_CONFIG}/Sales/SalesSummary/api/${props.data.id}`, {
      headers: { Authorization: userSessionContext.token },
    })
    .then((res) => {
      if (res.data.status_code === 200) {
        console.log(res.data.msg);
        let temp = res.data.msg;
      
        setData(temp.salesData[0]);
        setProductData(temp.salesProduct);
        setPaymentMode(temp.paymentMode);
        setPaymentData(temp.paymentMode);
      } else {
   
        toast.error(res.data.msg);
        setData({});
        setProductData([]);
        //setPaymentMode([]);
      }
    })
    .catch((err) => {
      setData({});
      setProductData([]);
      //setPaymentMode([]);
    });
  }
  useEffect(() => {
    loadPaymentMode();
  }, []);

  const loadPaymentMode = async() => {
   await axios
      .get(`${config.APP_CONFIG}/Account/COAPaymentMode/api`, {
        headers: { Authorization: userSessionContext.token },
      })
      .then((res) => {
        if (res.data && res.data.status_code && res.data.status_code === 200) {
          let temp = res.data.msg.map((name, index) => ({
            label: name.name,
            value: name.id,
          }));
          setPaymentModes(temp);
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogout();
        } else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
        } else {
          toast.error("Error Occurred");
          setPaymentModes([]);
        }
      })
      .catch((err) => {
        toast.error("Failed to Load Payment Mode");
        setPaymentModes([]);
      });
  };

  // const id=props.data.customerId;
  // useEffect(() => {
  //   loadCustomerDetail();
  // }, []);

  // const loadCustomerDetail = async() => {
  //  await axios
  //     .get(`${config.APP_CONFIG}/usersApi/Users/customer`, {
  //       headers: { Authorization: userSessionContext.token },
  //     })
  //     .then((res) => {
  //       if (res.data && res.data.status_code && res.data.status_code === 200) {
  //         let temp = res.data.msg.filter((x)=>{
  //           return x.id===id
  //         })
          
        
  //         setCustomerDetail(temp[0]);

  //       } else if (res.data.status_code === 401) {
  //         userSessionContext.handleLogout();
  //       } else if (res.data.status_code === 400) {
  //         toast.warn(res.data.msg);
  //       } else {
  //         toast.error(res.data.msg);
  //         setCustomerDetail([]);
  //       }
  //     })
  //     .catch((err) => {
  //       toast.error("Something Went Wrong");
  //       //setCustomerDetail([]);
  //     });
  // };




  if (paymentModes === undefined) {
    return <Spinner />;
  }

  const date_of_sales = format(
    new Date(props.data.dateOfSales),
    "yyyy-MM-dd HH:mm:ss"
  );

  const discountPercent = ((data.discount)/(data.subTotal) * 100).toFixed(2);
  const taxPercent = ((data.taxAmount) / ((data.subTotal)-(data.discount)) * 100).toFixed(2);
  //console.log(paymentData);
  const total = paymentMode.reduce((total, obj) => obj.amount + total, 0).toFixed(2);
  const remainingAmount = (data.grandTotal - total).toFixed(2);
  //console.log(data.grandTotal);
 
  const product_no_tax_list = productData.filter((x) => x.productTax === 0)

  const _subtotal_no_tax = product_no_tax_list.reduce(
    (total, obj) => parseFloat(obj.productSubtotal) + parseFloat(total),
    0
  );
  const product_tax_list = productData.filter((x) => x.productTax !==0)

  const _subtotal_tax = product_tax_list.reduce(
    (total, obj) => parseFloat(obj.productTotal) + parseFloat(total),
    0
  );

  return (
    <div className="form-height">
    <div className="purchaseForm3 ">
      {isNewPopup ? (
        <Popup
          title="Print Preview"
          size="lg"
          openPopup={isNewPopup}
          setPopups={setIsNewPopup}
        >
          <Tablepdf
            productData={productData}
            paymentMode={paymentMode}
            data={props.data}
            company={companyContext.company}
            // customerDetail = {customerDetail}
            discountPercent = {discountPercent}
            taxPercent = {taxPercent}
           
          />
        </Popup>
      ) : null}
       {isThermalPopup ? (
        <Popup
          title="Print Preview"
          size="lg"
          openPopup={isThermalPopup}
          setPopups={setIsThermalPopup}
        >
          <ThermalPrint
            productData={productData}
            paymentMode={paymentMode}
            data={props.data}
            company={companyContext.company}
            // customerDetail = {customerDetail}
            discountPercent = {discountPercent}
            taxPercent = {taxPercent}
           
          />
        </Popup>
      ) : null}
      <div  style={{display:"flex",justifyContent:"flex-end"}}className="addButton">
        <Controls.Button
          text="A4"
          variant="outlined"
          startIcon={<PrintIcon />}
          className={classes.newButton}
          onClick={() => {
            setIsNewPopup(!isNewPopup);
          }}
        />
          <Controls.Button
          text="P80"
          variant="outlined"
          startIcon={<PrintIcon />}
          className={classes.newButton}
          onClick={() => {
            setIsThermalPopup(!isThermalPopup);
          }}
        />
      </div>
      <Grid container>
        <Grid item xs={6}>
          <div>
            <b>Customer Name:</b>
            {data.customerName || ""}
          </div>
          <div>
            <b>Bill No.:</b> {data.bill_no || ""}
          </div>
        </Grid>

      
        <Grid item xs={6}>
          <div>
            <b>Date 0f Sales:</b> {data.dateOfSales || ""}
          </div>
        </Grid>
      </Grid>
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
          <div  className="scrollbar">
          <TblContainer>
            <TblHead />
            <TableBody>
              {productData &&
                productData.map((item, idx) => {
                  console.log(item)
                  return (
                  <TableRow key={item.idx}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{item.productName||""}</TableCell>
                    <TableCell>{item.unitName||""}</TableCell>
                    <TableCell>{item.productQTY||""}</TableCell>
                    <TableCell>{item.productCost||""}</TableCell>
                    <TableCell>{item.productSubtotal||""}</TableCell>
                    
                  </TableRow>
                )})}
            </TableBody>
          </TblContainer>
          </div>
          <div className="row">
            <div className="col-md-3">
              <div
                className="card"
                style={{ margin: "20px 0", padding: "10px",display:"flex" ,justifyContent:"flex-end" }}
              >
                
                  
                <div className="table-left">
               
               <table >
     
            <tr>
            
              <td>Sub-Total:</td>
              <td >{data.subTotal}</td>
            </tr>
            <tr>
            
              <td>Total Discount:</td>
              <td>{data.discount||"0"}</td>
            </tr>
            <tr>
            
              <td>Non-Taxable AMT:</td>
              <td>{_subtotal_no_tax.toFixed(2)||"0"}</td>
            </tr>
            <tr>
            
            <td>Taxable AMT:</td>
            <td>{_subtotal_tax.toFixed(2)||"0"}</td>
           
          </tr>
          <tr>
            
            <td>Total Tax:</td>
            <td>{data.taxAmount}</td>
           
          </tr>
          <tr>
            
            <td>Grand Total:</td>
            <td>{data.grandTotal}</td>
           
          </tr>
         
         

</table>

</div> 

       
              </div>
               <div className="card" style={{ padding: "10px" }}>
                <div className="remainingAmount">
                  <p>Remaining Amount</p>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={remainingAmount}
                    disabled
                  />
                </div>
              </div> 
              
            </div>
            <div className="col-md-9">
               <div style={{ margin: "20px 0" }}>
                

                <div
                  className="purchasePayment card"
                  style={{ padding: "10px" }}
                >
                  <table className="table table-fluid">
                    <tr>
                      <th className="">Mode of Payment</th>
                      <th className="">Amount (Rs.)</th>
                     
                    </tr>
                    {paymentMode
                      ? paymentMode.map((row, idx) => {
                          return (
                            <tr key={row.idx}>
                              <td>{row.mode}</td>
                              <td>{row.amount}</td>
                            </tr>
                          );
                        })
                      : null}

             
                    <AddForm
                      paymentData={paymentData}
                      setPaymentData={setPaymentData}
                      paymentModes={paymentModes}
                      addRow={(e) => {
                        setPaymentData([...paymentData, e]);
                        setPaymentMode([...paymentData, e]);
                      }}
                      savePayment={savePayment}
                    />
     
                    <tr>
                      <td colSpan={3} style={{ textAlign: "right" }}>
                        {savePayment === 0 ? (
                          <Controls.Button
                            color="primary"
                            variant="contained"
                            text="Save Payment"
                            className={classes.newButton1}
                            onClick={async (e) => {
                              if (paymentData.length !== 0) {
                                if (savePayment === 0) {
                                  let confirm = window.confirm(
                                    "Are you sure to Save Payment?"
                                  );
                                  if (confirm) {
                                    const filterData = paymentData.filter(
                                      (x) => {
                                        return x.status === "true";
                                      }
                                    );
                                    let req_data = {
                                      grandTotal: data.grandTotal,
                                      salesId: data.id,
                                      companyId: companyContext.company.id,
                                      customerName: data.customerName,
                                      paymentMode: filterData,
                                      fiscalYear: 
                                      
                                      companyContext.fiscal[0]["fiscalYear"],
                                      dateOfSales: date_of_sales,
                                      createdBy:localStorage.getItem('user'),
                                    
                                    };

                                    await axios
                                      .post(
                                        `${config.APP_CONFIG}/Sales/paymentMode/api`,
                                        req_data,
                                        {
                                          headers: {
                                            Authorization:
                                              userSessionContext.token,
                                          },
                                        }
                                      )
                                      .then((res) => {
                                        if (res.data.status_code === 200) {
                                          setSavePayment(1);
                                          //props.load_sales_summary();
                                          //toast.success("Payment Saved");
                                          props.load_sales_summary();
                                          toast.success(res.data.msg);
                                        } else if (
                                          res.data.status_code === 401
                                        ) {
                                          userSessionContext.handleLogout();
                                        } else if (
                                          res.data.status_code === 400
                                        ) {
                                          toast.error("Error Occurred");
                                        } else {
                                          toast.error(res.data.msg);
                                        }
                                      })
                                      .catch((err) => {
                                        toast.error("Payment Failed");
                                      });
                                    //props.load_sales_summary();
                                  }
                                } else {
                                  return;
                                }
                              } else {
                                toast.warn("Please Add Payment Form");
                              }
                            }}
                          ></Controls.Button>
                        ) : (
                          <Controls.Button
                            color="primary"
                            text="Payment Saved"
                            disabled
                          ></Controls.Button>
                        )}
                      </td>
                    </tr>
                  </table>
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
