import React, { useState, useEffect } from "react";
import {  useParams } from "react-router-dom";
import axios from "axios";
import ConfirmDialog from "../home/ConfirmDialog";
import Box from '@mui/material/Box';
import CloseIcon from "@material-ui/icons/Close";
//import Alert from "@material-ui/lab/Alert";
import Spinner from "../../utils/spinner";
import { toast } from "react-toastify";
// Material UI
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import UserSessionContext from "../../contexts/UserSessionContext";
import CompanyContext from "../../contexts/CompanyContext";
import config from "../../utils/config";
import Controls from "../controls/Controls";
import { useForm, Form } from "../../components/home/useForm";
//import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
//import { Grid } from "@mui/material";
//import { padding } from "@mui/system";
import { Tooltip } from "@material-ui/core";
import "date-fns";
import { format } from "date-fns";
import Select from "react-select";

import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: "white",
    color: "#546e7a",
    justifyContent: "left",
    padding: "10px 5px",
    fontWeight: "bold",
  },

  content: {
    padding: 0,
    // size:"20px"
  },
  status: {
    marginRight: "5px",
  },
  actions: {
    justifyContent: "flex-end",
  },
  summaryTable: {
    width: "auto",
    marginBottom: "10px",
    pointerEvents: "none",
  },
  noBorder: {
    border: "none",
  },
  denseCell: {
    padding: "1px",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 100,
  },
  root: {
    margin: theme.spacing(0.5),
    marginTop: theme.spacing(2),
    minWidth: 0,
  },
  label: {
    textTransform: "none",
  },

  formInputNum: {
    width: "10px",
    // height:"100px"
  },

  formInput: {
    width: "50px",
  },
  newSaveButton:{
    zIndex: 4,
    color: "#3f51b5",
    border: "1px solid #3f51b5",
  },
}));

const headCells = [
  { id: "productName", label: "Product Name" },
  { id: "productUnit", label: "Product Unit" },
  { id: "productQuantity", label: "Quantity" },
  { id: "productUnit", label: "Unit Price" },
  { id: "productTotal", lbel: "Total" },
  { id: "productDiscount", label: "Discount" },
  { id: "productTax", label: "Tax" },
  { id: "productSubtotal", lbel: "Subtotal" },
  { id: "actions", label: "Actions" },
];

//-------------------------START OF INPUT ROW------------------------
const taxrate = [
  { label: 0, value: 0 },
  { label: 13, value: 13 }
]
const AddForm = (props) => {
  const classes = useStyles();
  const userSessionContext = React.useContext(UserSessionContext);
  const companyContext = React.useContext(CompanyContext);
  const [productId, setProductId] = useState("");
  const [productQty, setProductQty] = useState("1");
  const [productCost, setProductCost] = useState("0");
  const [productTotal, setProductTotal] = useState(0);
  const [productSubtotal, setProductSubtotal] = useState(0);
  const [productTax, setProductTax] = useState("0");
  const [productDiscount, setProductDiscount] = useState("0");
  const [units, setUnits] = useState();
  const [unit, setUnit] = useState();
  const [allProducts, setAllProducts] = useState(props.allProducts || []);
  const [currentItem, setCurrentItem] = useState({});
 // const [taxRates, setTaxRates] = useState(1);
  const saleid = props.saleid
  const [productpercent, setProductpercent] = useState({ label: 0, value: 0 },);

  useEffect(() => {
    if (productQty !== undefined && productCost !== undefined) {
      // let _discount = productDiscount || 0;
      // let _tax = productTax || 0;
      let temp = parseFloat(productQty) * parseFloat(productCost)- parseFloat(productDiscount || 0)
       
        setProductTotal(temp.toString());
     // setProductSubtotal(temp.toString());
    }
  }, [productQty, productCost, productDiscount, productTax]);

  useEffect(() => {
    if (productQty !== undefined && productCost !== undefined) {
     

      const _net = (parseFloat(productCost) * parseFloat(productQty)) - parseFloat(productDiscount || 0)
      setProductTax((parseFloat(parseFloat(productpercent.value / 100) || 0) * _net))

      const _Percent = ((productpercent.value / 100) || 0) + parseInt(1);

      // const _taxAmount = _net * (productpercent.value / 100) || 0;
      const _grandsubtotal = parseFloat(_net) * parseFloat(_Percent) || 0;

      //let temp =(parseFloat( productCost) * parseFloat( productQty)) - parseFloat(productDiscount||0)+ parseFloat((parseFloat(productpercent.value/100)||0 )* parseFloat(productTotal)+ parseFloat(productTotal);

      setProductSubtotal(_grandsubtotal.toFixed(2));
    }
  }, [productQty, productCost, productTotal, productDiscount, productpercent]);




  useEffect(() => {
    if (productId.value !== undefined) {
      loadUnitById(productId.value);
      const productPrice = props.product.filter((x) => {
        return x.id === productId.value;
      });

      setProductCost(productPrice[0]["sellPrice"]);
     // setProductQty(productPrice[0])
    }
  }, [productId]);

  // const getCheckBox = (key, callback) => {
  //   return (
  //     <Switch
  //       checked={key === 1 ? true : false}
  //       defaultValue="on"
  //       color="primary"
  //       onChange={(e) => {
  //         let changedValue = 0;
  //         if (key === 0) {
  //           changedValue = 1;
  //         }
  //         callback(changedValue);
  //       }}
  //     />
  //   );
  // };

  const loadUnitById = async(id) => {
  await  axios
      .get(
        `${config.APP_CONFIG}/Products/ProductInhouseUnit/ByProductId/api/${id}`,
        {
          headers: { Authorization: userSessionContext.token },
        }
      )
      .then((res) => {
        if (res.data && res.data.status_code && res.data.status_code === 200) {
          let temp = res.data.msg.map((name, index) => ({
            label: name.unitName,
            value: name.unitId,
          }));
          setUnits(temp);
        } else {
          toast.error("Cannot load Unit Measurement.");
          setUnits([]);
        }
      })
      .catch((err) => {

        setUnits([]);
      });
  };



  return (
    <tr hover>
      <td></td>
      <td width="200px">
        <Select
          type="text"
          placeholder={"Add Product"}
          options={allProducts}
          value={productId}
          onChange={(e) => {
            setProductId(e);
   
            // loadUnitById(e.value);
          }}
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          }}
          menuPortalTarget={document.body}
        />
      </td>

      <td>
        {productId ? (
          <Select
            options={units}
            value={unit}
            onChange={(e) => {
              setUnit(e);
            }}
            styles={{
              menuPortal: (base) => ({ ...base, zIndex: 9999 }),
            }}
            menuPortalTarget={document.body}
          />
        ) : (
          <div
            style={{
              width: "80px",
            }}
          >
            Unit
          </div>
        )}
      </td>
    
      <td size="small">
        <input
          type="number"
          step="1"
          min={1}
          value={productQty || 0}
          onKeyDown={(e) =>
            // (e.keyCode === 69 || e.keyCode === 190 || e.keyCode === 187) && e.preventDefault()
            (e.keyCode === 69 || e.keyCode === 187) && e.preventDefault()
          }
          onChange={(e) => {
            setProductQty(e.target.value);
          }}
          style={{ width: "50px" }}
        />
      </td>
    
      {productId ? (
        <td size="small">
          <input
            type="number"
            step="1"
            min={0}
            value={productCost || 0}
            onKeyDown={(e) =>
              (e.keyCode === 69 || e.keyCode === 187) && e.preventDefault()
            }
            onChange={(e) => {
              setProductCost(e.target.value);
            }}
            style={{ width: "80px" }}
          />
        </td>
      ) : (
        <p style={{ padding: "0.7rem 0", margin: "0" }}>0</p>
      )}

{/* {productId ? (
        <td size="small">

          {getCheckBox(taxRates, setTaxRates)}

        </td>

      ) : (
        <td>
          0
        </td>
      )
      } */}
    
      {productId ? (
        <td size="small">
          <input
            type="number"
            step="1"
            min={0}
            value={productDiscount || 0}
            onKeyDown={(e) =>
              (e.keyCode === 69 || e.keyCode === 187) && e.preventDefault()
            }
            onChange={(e) => {
              setProductDiscount(e.target.value);
            }}
            style={{ width: "80px" }}
          />
        </td>
      ) : (
       
        <td>
          0
        </td>
      )}
      <td size="small">
        <span>{productTotal || 0}</span>
      </td>
      {productId ? (
        <td width="150px">
          <Select
            type="text"
            placeholder={"Vat"}
            options={taxrate}
            defaultValue={{ label: "No Vat", value: 0 }}        
            onChange={setProductpercent}
          />
        </td>
      ) : (
        <td>
          0
        </td>
      )}
  
      <td size="small">
        <span>{productSubtotal || 0}</span>
      </td>
      <td>
        <Controls.ActionButton
          size="small"
          variant="contained"
          color="secondary"
          onClick={(e) => {

            if (productId === "" || productQty === "" || productCost === "" || unit === "" || unit === undefined) {
              return toast.warn("Please Fill the Form");
            }
            else {
              let check_quantity=
              {
                "quantity": productQty,
                "productId": productId.value,
                "unitId": unit.value,
                "companyId": companyContext.company.id,
                "warehouseId":0,
              }
           axios
                .post(`${config.APP_CONFIG}/Inventory/checkStockQuantity/api`,check_quantity, {
                  headers: { Authorization: userSessionContext.token },
                 })
                 .then((res) => {
                   if (res.data.status_code === 200) {
                       if(res.data.msg==="True")
                       {
           
                       props.addRow({
                        salesId: saleid,
                    
                      productName: productId.label,
                      productId: productId.value,
                      unitId: unit.value,
                      productQTY: productQty,
                      productCost: productCost,
                      productTotal: parseFloat(productTotal),
                      productDiscount: parseFloat(productDiscount) || 0,
                      productTax: parseFloat(productTax),
                      productSubtotal: parseFloat(productSubtotal),
                      unitName: unit.label,
                      
                    });

                    setProductId("");
                    setProductQty();
                    setProductCost();
                    setProductSubtotal("");
                    setProductTax(0);
                    setProductDiscount(0);
                    setUnits("");
                    setUnit("");
                    setProductTotal("");
                    setCurrentItem("");
                  }
                
                else{
                  toast.warn("Greater than Stock quantity");

                }
                
                }
           
           
            
             else if (res.data.status_code === 401) {
             userSessionContext.handleLogOut();
          } else if (res.data.status_code === 400) {
             toast.warn(res.data.msg);
           } else {
             toast.error("Error occured");
             }
           })
           .catch((err) => {
            toast.error("Failed to Add Product");
          });
      }
          }}


          
        >
          <Tooltip title="Add">
            <AddCircleIcon color="primary" style={{ fontSize: "25px" }} />
          </Tooltip>
        </Controls.ActionButton>
      </td>
    </tr>
  );
};

//----------------------------- END OF INPUT ROW -----------------------
////----void add pay -form---

const AddPayVoidForm = (props) => {
  const [payment, setPayment] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <tr>
      <td width="300px">
        <Select
          options={props.paymentModes}
          value={payment}
          onChange={(e) => {
            setPayment(e);
          }}
          styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
          menuPortalTarget={document.body}
        />
      </td>
      <td>
        <input
          type="number"
          placeholder="0.00"
          min={0}
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />
      </td>
      <td>
      {props.savePayment === 0 ? (
        <Controls.ActionButton
          color="secondary"
          onClick={(e) => {
            if (amount === "" && payment === "") {
              return toast.warn("Empty Form");
            } else {
              props.addRowpayment({
                mode: payment.label,
                amount: parseFloat(amount),
              });
              setPayment("");
              setAmount("");
            }
          }}
        >
          <Tooltip title="Add">
            <AddIcon fontSize="small" />
          </Tooltip>
        </Controls.ActionButton>
        ) : (
          <Controls.ActionButton
          color="secondary"
          disabled
        >
          <Tooltip title="Can't add after payment">
            <AddIcon fontSize="small" />
          </Tooltip>
        </Controls.ActionButton>
        )}
      </td>
    </tr>
  );
};


const initialFValues = {
  date: format(new Date(), "yyyy-MM-dd"),
}
//----------------------------- MAIN FORM ------------------------------
const SalesVoid = (props) => {
 
  let { Id } = useParams();

  const [products, setProducts] = useState([]);
  const [records, setRecords] = useState();
  const [allProducts, setAllProducts] = useState();
  const [saveDisable, setSaveDisable] = useState(0);
  const userSessionContext = React.useContext(UserSessionContext);
  const companyContext = React.useContext(CompanyContext);
  const [product, setProduct] = useState();
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);
  const [taxPercent, setTaxPercent] = useState(13);
  const [taxRates, setTaxRates] = useState();
  const [saleid, setSaleid] = useState(Id);
  const [value, setValue] = useState({});
  const [customerNames, setCustomerNames] = useState();
  const [customer, setCustomer] = useState("");
  const [customerdetails, setCustomerdetails] = useState();
  const [description, setDescription] = useState();
  const companyId = companyContext.company.id;
  const [paymentModes, setPaymentModes] = useState();
  const [issubmit, setSubmit] = useState(false);
  const [savePayment, setSavePayment] = useState(0);
  const [paymentData, setPaymentData] = useState([]);
  const [voidproduct, setVoidProduct] = useState();
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const classes = useStyles(props);

  useEffect(() => {
    loadProduct();
    loadProductById();
    loadCustomerNames();
    //load_sales_summary();
   
    loadPaymentMode();
  }, []);
  useEffect(() => {
    load_sales_summary_bycompany();
   
  }, []);
  const { values, setValues, handleInputChange, ResetForm } = useForm(initialFValues);

  var date = format(new Date(values.date), "yyyy-MM-dd");
  if (values.date !== undefined) {
    date = format(new Date(values.date), "yyyy-MM-dd");
  }
  const loadProduct = async() => {
   await axios
      .get(`${config.APP_CONFIG}/Products/product/Api`, {
        headers: {
          Authorization: userSessionContext.token,
        },
      })
      .then((res) => {
        if (res.data && res.data.status_code && res.data.status_code === 200) {
          setProduct(res.data.msg);

        } else {
          toast.error(res.data.msg || "Cannot load Products");
          setProduct([]);
        }
      })
      .catch((err) => {
        toast.error("failed to Products");
        setProduct([]);
      });
  };
  const loadCustomerNames = async() => {
    await axios
      .get(`${config.APP_CONFIG}/usersApi/Users/customer`, {
        headers: { Authorization: userSessionContext.token },
      })
      .then((res) => {
        if (res.data && res.data.status_code && res.data.status_code === 200) {
          setCustomerdetails(res.data.msg);
          let temp = res.data.msg.map((name, index) => ({

            label: name.firstName.concat(" " + name.lastName || ""),
            value: name.id,
          }));
          setCustomerNames(temp);

        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogout();
        } else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
        } else {
          toast.error(res.data.msg);
          setCustomerNames([]);
        }
      })
      .catch((err) => {
        toast.error("Something Went Wrong");
        setCustomerNames([]);
      });
  };

 

  useEffect(() => {

    loadProducts();
   // loadTaxRates();
  }, []);
  
  const loadProducts = async() => {


   await axios
      .get(`${config.APP_CONFIG}/Sales/GetSalesProduct/api`, {
        headers: { Authorization: userSessionContext.token },
      })
      .then((res) => {
        if (res.data && res.data.status_code && res.data.status_code === 200) {
          let temp = res.data.msg.map((name, index) => ({
            label: name.productname,
            value: name.id,
          }));
          setAllProducts(temp);
        } else {
          toast.error(res.data.msg || "Cannot load Products");
          setAllProducts([]);
        }
      })
      .catch((err) => {
        toast.error("failed to  Load Products");
        setAllProducts([]);
      });
  };
  const loadTaxRates = async() => {
    await axios
      .get(`${config.APP_CONFIG}/Account/TaxRates/api`, {
        headers: { Authorization: userSessionContext.token },
      })
      .then((res) => {
        if (res.data && res.data.status_code && res.data.status_code === 200) {
          // console.log(res.data.msg);
          let taxList = res.data.msg.map((name, index) => ({
            title: name.amount,
            id: name.id,
          }));
          const _temp = [
            { title: 13, id: 0 },
            { title: 0, id: 1 },
          ].concat(taxList);
          setTaxRates(_temp);
        } else {
          toast.error(res.data.msg || "Cannot load Tax Rates");
          setTaxRates([]);
        }
      })
      .catch((err) => {
        toast.error("Failed to Load Tax Rates");
        setTaxRates([]);
      });
  };

  // useEffect(() => {
  //   const _taxAmount = taxPercent / parseInt(100);
  //   setTax(_taxAmount);
  // }, [taxPercent]);
  // useEffect(() => {
  //   setPaymentData(props.paymentMode);
  // }, [props.paymentMode]);
 

  //let { Id } = useParams();

  const dis_amount = (discount || 0) / parseInt(100);
  React.useEffect(() => {
    const filter_data = products.map((i) => {

      return {
        ...i,
          "productDiscount": parseFloat(dis_amount)*parseFloat(i.productTotal),
          "productTax":parseInt(i.productTax)!==0? ((parseFloat(i.productTotal)-(parseFloat(dis_amount||0)*parseFloat(i.productTotal)))*parseFloat(0.13)):0,
          "productSubtotal": parseFloat(parseFloat(i.productTotal)-(dis_amount*parseFloat(i.productTotal))+(parseInt(i.productTax)!==0? ((parseFloat(i.productTotal)-(parseFloat(dis_amount||0)*parseFloat(i.productTotal)))*parseFloat(0.13)):0)),
      }   
    });

    setProducts(filter_data);
  }, [discount]);



  const load_sales_summary_bycompany = async () => {

   
    await axios
      .get(
        `${config.APP_CONFIG}/Sales/SalesSummary/api/byCompany/${companyId}`,
        {
          headers: { Authorization: userSessionContext.token },
        }
      )
      .then((res) => {
        if (res.data.status_code === 200) {
       
            
          const completerecords = res.data.msg.filter((filtered) => { return filtered.id == saleid;
          
          });
        
          setRecords(completerecords);
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogout();
        } else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
        } else {
          toast.error("Error Occurred");
          setRecords([]);
        }
      })
      .catch((err) => {
        toast.error("Failed to  Load Details");
        setRecords([]);
      });
  };
  const loadProductById = async() => {
    await axios
       .get(`${config.APP_CONFIG}/Sales/SalesProduct/api/${saleid}`, {
         headers: {
           Authorization: userSessionContext.token,
         },
       })
       .then((res) => {
         if (res.data && res.data.status_code && res.data.status_code === 200) {
          setProducts(res.data.msg);
          let temp = res.data.msg.map((name, index) => ({
            label: name.productname,
            value: name.id,
          }));
           setVoidProduct(temp);
 setProducts(res.data.msg)
         } else {
           toast.error(res.data.msg || "Cannot load Products");
           setProducts([]);
         }
       })
       .catch((err) => {
         toast.error("Failed to  Load Products");
         setProducts([]);
       });
   };
 

  const loadPaymentMode = async () => {
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

  if (paymentModes === undefined) {
    return <Spinner />;
  }
  // const date_of_sales = format(
  //   new Date(value.dateOfSales),
  //   "yyyy-MM-dd"
  // );

  const _subtotal = products.reduce(
    (total, obj) => obj.productTotal + total,
    0
  );
 
  const product_no_tax_list = products.filter((x) => x.productTax === 0)




  const _nontaxable = product_no_tax_list.reduce(
    (total, obj) => parseFloat(obj.productTotal) + parseFloat(total),
    0
  );

  const total__discount_with_out_tax = _nontaxable * dis_amount
  const non_taxable_Amount_after_discount = parseFloat(_nontaxable) - parseFloat(total__discount_with_out_tax);
  
  const product_list = products.filter((x) => x.productTax !== 0)
  const _subtotal_tax = product_list.reduce(
    (total3, obj) => parseFloat(obj.productTotal) + parseFloat(total3),
    0
  );
  const _taxAmount_no_discount = product_list.reduce(
    (total3, obj) => parseFloat(obj.productTotal
    ) + parseFloat(total3),
    0
  );

  const total__discount_tax = _taxAmount_no_discount * dis_amount

  const _taxable_Amount_after_discount = parseFloat(_taxAmount_no_discount) - parseFloat(total__discount_tax);
  const total_discount = parseFloat(total__discount_with_out_tax) + parseFloat(total__discount_tax)


  const pro_tax = parseFloat(_taxable_Amount_after_discount) * 0.13
  const _grandtotal = parseFloat(non_taxable_Amount_after_discount) + parseFloat(_taxable_Amount_after_discount) + parseFloat(pro_tax)




  // const _taxableAmount = _subtotal - (discount || 0);

  // const _taxPercentDiv = taxPercent / 100 + parseInt(1);
  // const _taxAmount = _taxableAmount * (taxPercent / 100) || 0;

  // const _grandtotal = _taxableAmount * _taxPercentDiv.toFixed(2);
 const AddPaymentMode=()=>{
  setConfirmDialog({ ...confirmDialog, isOpen: false }); 

    let req_data = {
        grandTotal: _grandtotal,
        salesId: saleid,
        companyId: companyContext.company.id,
        customerName: value.customerName||"",
        paymentMode: paymentData,
        fiscalYear: companyContext.fiscal[0]["fiscalYear"],
        dateOfSales:format(new Date(date), "yyyy-MM-dd HH:mm:ss"),
        createdBy: localStorage.getItem('user'),
      };
    
    //  console.log(req_data);
      axios.post(`${config.APP_CONFIG}/Sales/paymentMode/api`, req_data,
      { headers: {Authorization: userSessionContext.token,},})
        .then((res) => {
          if (res.data.status_code === 200) {           
            setSavePayment(1); 
            toast.success("Payment Saved");
          } else if (res.data.status_code === 401) {
            userSessionContext.handleLogout();
          } else if (res.data.status_code === 400) {
            toast.error("Error");
          } else {
            toast.error(res.data.msg);
          }
        })
        .catch((err) => {
          toast.error("Payment Failed");
        });
  
    }
  // const load_sales_summary = async () => {
  //   await axios
  //     .get(
  //       `${config.APP_CONFIG}/Sales/SalesSummary/api/${id}`,
  //       {
  //         headers: { Authorization: userSessionContext.token },
  //       }
  //     )
  //     .then((res) => {
  //       if (res.data.status_code === 200) {
  //        const filtered_data=res.data.msg
  //         setRecords(res.data.msg);
  //       } else if (res.data.status_code === 401) {
  //         userSessionContext.handleLogout();
  //       } else if (res.data.status_code === 400) {
  //         toast.warn(res.data.msg);
  //       } else {
  //         toast.error("Error Occurred");
  //         setRecords([]);
  //       }
  //     })
  //     .catch((err) => {
  //       toast.error("Something Went Wrong");
  //       setRecords([]);
  //     });
  // };

  const totalCalculation = () => {
    const  _row_data = products.map((i) => {
      return {
        ...i,
          productQTY: parseFloat(i.productQTY).toFixed(2),
          productCost: parseFloat(i.productCost).toFixed(2),
          productTotal: parseFloat(i.productTotal).toFixed(2),
          productDiscount: parseFloat(i.productDiscount).toFixed(2) || 0,
          productTax: parseFloat(i.productTax),
          productSubtotal: parseFloat(i.productSubtotal),
          companyId: companyContext.company.id,
  }
})

      axios.post(`${config.APP_CONFIG}/Sales/SalesProduct/api`, _row_data, { headers: { Authorization: userSessionContext.token } })
      .then((res) => {
        if (res.data.status_code === 200) { 
      
          const res_data = {
            subTotal: _subtotal,
            grandTotal: _grandtotal.toFixed(2),
            taxAmount: pro_tax.toFixed(2),
            discount: parseFloat(total_discount.toFixed(2)) || 0,
            netTotal: parseFloat(_taxable_Amount_after_discount.toFixed(2)),
            customerId: props.data.customerId,
            customerName: props.data.customerName,
           
            salesId: props.data.id,
            companyId: companyContext.company.id,
            serviceCharge: 0,
            fiscalYear: companyContext.fiscal[0]["fiscalYear"],
            dateOfSales: format(new Date(props.data.dateOfSales), "yyyy-MM-dd HH:mm:ss"),
            createdBy: localStorage.getItem('user') 
          }
         
        
          axios.post(`${config.APP_CONFIG}/Sales/SalesSummary/api`, res_data , {
            headers: { Authorization: userSessionContext.token },
          })
            .then((res) => {
              if (res.data.status_code === 200) {
              setSubmit(true);
              const temp_data = {
                "void_billNo": parseInt(records["bill_no"]),
                "new_billNo": res.data.msg ,
                "salesId": saleid,
                "companyId": companyContext.company.id,
                "fiscalYear": companyContext.fiscal[0]["fiscalYear"],
                // "date": format(new Date(value.dateOfSales), "yyyy-MM-dd"),
               "date": date,
                "voidUser": localStorage.getItem('user'),
                "reason": description,
              }
    
        
              axios.post(`${config.APP_CONFIG}/Sales/SalesVoid/api`, temp_data, { headers: { Authorization: userSessionContext.token }, })
                .then((v) => {
                  if (v.data.status_code === 200) {
    
                    toast.success("Successfully void Product");

              } else if (v.data.status_code === 401) {
                userSessionContext.handleLogOut();
              } else if (v.data.status_code === 400) {
                toast.warn(v.data.msg);
              } else {
                toast.error("Error Occurred");
              }
            })
            .catch((err) => {
              
            });           
 
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogOut();
        } else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
        } else {
          toast.error("Error Occurred");
        }
      })
      .catch((err) => {
        
      }); 
    } else if (res.data.status_code === 401) {
      userSessionContext.handleLogOut();
    } else if (res.data.status_code === 400) {
      toast.warn(res.data.msg);
    } else {
      toast.error("Error Occurred");
    }
  })
  .catch((err) => {
    
  }); 
}

  if (allProducts === undefined) {
    return <Spinner />;
  }

  return (
    <div className="salesVoid-form">
      <h3 style={{textAlign: "center", margin: "10px"}}>Credit Note</h3>
      <div
        className="card"
        style={{ padding: "10px"}}
      >
        <Box>
          <Grid container>
            <Grid item xs={3}>
              <label>Customer Name</label>
              <Select
                placeholder={"Search customer...."}
                type="text"
                options={customerNames}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                menuPortalTarget={document.body}
                value={{
                  label: value.customerName,
                  value: value.customerId,
                }}
                onChange={(e) => {
                  const _temp = {
                    customerName: e.label,
                    customerId: e.value,
                  };

                  let temp = customerdetails.filter((x) => { return x.id === parseInt(e.value) })
                  const temp_data = temp[0] || {};

                  setCustomer(temp_data);
                  setValue({ ...value, ..._temp, });
                }}

              />
            </Grid>

            <Grid
                  item
                  xs={3}
                  style={{ display: "flex", flexDirection: "column",marginLeft:"450px" }}
                >
                  <label
                    htmlFor="text"
                    style={{ fontSize: "13px", paddingTop: "0", width: "100%" }}
                    className="col-sm-12 col-form-label"
                  >
                    Date
                  </label>
                  <Controls.DatePicker
                    name="date"
                    value={values.date}
                    onChange={handleInputChange} 
                    onFocus={e => e.target.blur()}
                  />
                </Grid>


{/* <Controls.DatePicker
                name="dateOfSales"
                label="Date Of Sales"
                value={value.dateOfSales}
                onFocus={(e) => e.target.blur()}
                onChange={(e) => {
                  setValue({
                    ...value,
                    dateOfSales: e.target.value,
                  });
                }}
              />
            </Grid> */}
          </Grid>
        </Box>
        <div className="row">
          <div className="col-sm-12">
            <label
              htmlFor="text"
              style={{fontSize: "13px", paddingTop: "10px" }}
              className="col-sm-12"
            >
              Void Description
            </label>
            <textarea
              type="text"
              className="form-control"
              name="description"
              value={description}
              onChange={(e) => { setDescription(e.target.value); }}
            />
          </div>
        </div>
      </div>
      <div className="purchase-form" style={{ marginTop: "20px" }}>
        <table className="table table-fluid">
          <tr>
            <th>S.No.</th>
            <th>Product Name</th>
            <th>Unit</th>
            <th>Quantity</th>
            <th>Unit price</th>
            <th>Discount</th>
            <th>Total</th>
            <th>Tax</th>
            <th>Sub-Total</th>
            <th>Action</th>
          </tr>
          {products
            ? products.map((row, idx) => {

          
              return (
                <tr key={row.idx}>
                  <td>{idx + 1}</td>
                  <td>{row.productName}</td>
                  <td>{row.unitName||"pcs"}</td>
                  <td>{row.productQTY}</td>
                  <td>{row.productCost}</td>
                  <td>{row.productDiscount}</td>
                  <td>{parseFloat(row.productTotal)}</td>
                  <td>{row.productTax||0}</td>
                  {/* <td>{row.productCost * row.productQTY}</td> */}
                  <td>{row.productSubtotal}</td>
                  <td>
                    <Controls.ActionButton>
                      <span
                        onClick={(e) => {
                          axios
                            .delete(
                              `${config.APP_CONFIG}/Sales/SalesProduct/api/${row.id}`,
                              {
                                headers: {
                                  Authorization: userSessionContext.token,
                                },
                              }
                            )
                            .then((res) => {
                              if (
                                res.data &&
                                res.data.status_code &&
                                res.data.status_code === 200
                              ) {

                                const _data = products.filter((item) => {

                                  return item!== row;
                                });

                                setProducts(_data);

                                toast.success(res.data.msg);
                              } else if (res.data.status_code === 400) {
                                toast.warn(res.data.msg.toString());
                              }
                            })
                            .catch((err) => {
                              toast.error("failed to Delete Product");
                              // setProducts([]);
                            });

                          // setProducts(_data);
                        }}
                      >
                        <Tooltip title="Delete" placement="top" arrow>
                          <DeleteIcon style={{ fontSize: "15px" }} />
                        </Tooltip>
                      </span>
                    </Controls.ActionButton>
                  </td>
                </tr>
              );
            })
            : []}

          <AddForm
            Datas={props.datas}
            data={props.data}
            allProducts={allProducts}
            product={product}
            voidproduct={voidproduct}
            saleid={saleid}
            addRow={(e) => {
              // setData([...data, e])
              setProducts([...products, e]);
            }}
          />
        </table>

        <div className="">
          <div className="row">

            <div className="col-8">
              {/* <SaleVoidPay data={records} /> */}
              
    <div className="purchasePayment card" style={{ padding: "10px", margin: "50px 0 20px" }}>
      <table className="table table-fluid">
        <tr>
          <th>Payment</th>
          <th>Amount</th>
          <th>Action</th>
        </tr>
        {paymentData&&paymentData.map((row, idx) => {
        
              return (
                <tr key={row.idx}>
                  <td>{row.mode}</td>
                  <td>{row.amount}</td>
                  <td>
                    {savePayment === 0 ? (
                      <Controls.ActionButton
                        color="secondary"
                        onClick={(e) => {
                          let _data = paymentData.filter((item) => {
                            return item !== row;
                          });
                          setPaymentData(_data);
                        }}
                      >
                        <Tooltip title="Delete">
                          <CloseIcon fontSize="small" />
                        </Tooltip>
                      </Controls.ActionButton>
                    ) : null}
                  </td>
                </tr>
              );
            })
          }
<ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />

        
         <AddPayVoidForm
            paymentData={paymentData}
            setPaymentData={setPaymentData}
            paymentModes={paymentModes}
            addRowpayment={(e) => {
             
              setPaymentData([...paymentData, e]);
            }}
            savePayment = {savePayment}
          //date_of_sales={ date_of_sales }
            />
      
           
        <tr>
          <td colSpan={3} style={{ textAlign: "right" }}>
            {savePayment === 0 ? (

              <Controls.Button
                color="primary"
                variant="contained"
                text="Save Payment"
                className={classes.newSaveButton}
                onClick={(e) => {
                  if (paymentData.length !== 0) {
                    if (savePayment === 0) {
                   
                    setConfirmDialog({
                        isOpen: true,
                        title: "Are you sure want  to Save Payment?",
                        subTitle: "pick payment Mode",
                        onConfirm: () => {      
                            AddPaymentMode();
                    
                  } 
                    })
                }}
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
            <div className="col-4">
              <div
                className="card"
                style={{ margin: "50px 0 20px", padding: "10px" }}
              >
                <div className="row">
                  <div className="col-md-auto">
                    <div className="col-md-auto pb-1">
                      <b>Subtotal :</b>
                    </div>
                    <div className="col-md-auto pb-1">
                      <b>Total Discount(%) :</b>
                    </div>
                    <div className="col-md-auto pb-1">
                      <b>Non Taxable :</b>
                    </div>
                    <div className="col-md-auto  pb-1">
                      <b>Taxable Amount :</b>
                    </div>
                  
                    <div className="col-md-auto pb-1">
                      <b>Total Tax :</b>
                    </div>
                    <div className="col-md-auto">
                      <b>Grand Total :</b>
                    </div>
                  </div>
                  <div className="col">
                    <div className="pb-1">{_subtotal.toFixed(3)}</div>
                    <div className="col">
                      <input
                        size={5}
                        type="number"
                        min={1}
                        step="1"
                        value={discount}
                        onKeyDown={(e) =>
                          (e.keyCode === 69 || e.keyCode === 187) &&
                          e.preventDefault()
                        }
                        onChange={(e) => {
                          setDiscount(e.target.value);
                        }}
                        style={{ width: "100%" }}
                      />
                    </div>
                    <div className="col pb-1">{non_taxable_Amount_after_discount.toFixed(3)}</div>
                    {/* <div className="col col-lg-12 pb-1">
                      <select
                        className="form-select form-select-sm"
                        name="taxPercent"
                        id="taxPercent"
                        style={{ padding: "0 .5rem" }}

                        value={taxPercent.label}
                        onClick={(e) => {
                          setTaxPercent(e.target.value);
                        }}
                        styles={{
                          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                        }}
                        menuPortalTarget={document.body}
                      >
                        {taxRates &&
                          taxRates.map((item, index) => (
                            <option key={item.id} value={item.title}>
                              {item.title}
                            </option>
                          ))}

                      </select>
                    </div> */}
                   
                        <div className="col col-lg-12 pb-1">{_taxable_Amount_after_discount.toFixed(3)}</div>
                    <div className="col pb-1">
                      <span>{pro_tax.toFixed(3)}</span>
                    </div>
                    <div className="col">
                      <span>{_grandtotal.toFixed(3)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <Controls.Button
            type="submit"
            text="Save"
            style={{margin: "0"}}
            onClick={(e) => {
              e.preventDefault();
              if (
                products === undefined ||
                products === null ||
                products.length === 0
              ) {
                toast.warn("Please Add Product First");
              } else if (
                value.customerId === undefined ||
                value.customerId === null ||
                value.customerId === ""
              ) {
                return toast.warn("Please Select Customer");
              }
              else if (description === undefined || description.length == 0) {
                toast.warn("Please add First");
              }
              else {
                totalCalculation();

              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SalesVoid;
