import React, { useState, useEffect } from "react";

import axios from "axios";
import Select from "react-select";
import Spinner from "../../utils/spinner";
import { toast } from "react-toastify";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import UserSessionContext from "../../contexts/UserSessionContext";
import CompanyContext from "../../contexts/CompanyContext";
import config from "../../utils/config";
import Controls from "../controls/Controls";
import DeleteIcon from "@material-ui/icons/Delete";
import "date-fns";
import { Switch } from "@material-ui/core";
import { format } from "date-fns";
//import UserAuthenticationContext from "../../contexts/UserAuthenticationContext";
import { Grid } from "@material-ui/core";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Tooltip } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import PrintIcon from "@mui/icons-material/Print";

import Popup from "../home/Popup";
import PrintPreview from "./ReactPrint/PrintPreview";
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
}));

//------------------------START OF INPUT ROW---------------------------

const AddForm = (props) => {
  const classes = useStyles();
  const userSessionContext = React.useContext(UserSessionContext);
  const companyContext = React.useContext(CompanyContext);
  const [productId, setProductId] = useState("");
  const [productQty, setProductQty] = useState("1");
  const [productUnitPrice, setProductUnitPrice] = useState(0);
  const [productTotal, setProductTotal] = useState("0");
  const [productSubtotal, setProductSubtotal] = useState("");
  const [productTax, setProductTax] = useState("1");
  const [productDiscount, setProductDiscount] = useState("0");
  const [units, setUnits] = useState();
  const [unit, setUnit] = useState();
  const [allProducts, setAllProducts] = useState(props.allProducts || []);
  const [currentItem, setCurrentItem] = useState({});
  const [taxRates, setTaxRates] = useState(1);
  // const permissionContext = React.useContext(UserAuthenticationContext);
  // let Permission = permissionContext.permissions;
  // let curr_mod_permission = Permission.filter((x) => {
  //   return x["module_name"].toLowerCase() === "purchases";
  // });
  // let userPermission = curr_mod_permission[0];

  useEffect(() => {
    if (productQty !== undefined && productUnitPrice !== undefined) {
      let _discount = productDiscount || 0;
      let _tax = productTax || 0;
      let temp = productQty * productUnitPrice
      setProductSubtotal(temp.toString());
    }
  }, [productQty, productUnitPrice, productDiscount, productTax]);

  useEffect(() => {
    if (productQty !== undefined && productUnitPrice !== undefined) {

      let temp = parseFloat(productQty) * parseFloat(productUnitPrice);
      setProductTotal(temp.toString());

    }

  }, [productQty, productUnitPrice, productTotal, taxRates]);



  useEffect(() => {
    if (productId.value !== undefined) {
      loadUnitById(productId.value);
      const productPrice = props.product.filter((x) => {
        return x.id === productId.value;
      });

      // const productDiscount = props.product.filter((x) => {
      //   return x.id === productId.value;
      // });

      // const productTax = props.product.filter((x) => {
      //   return x.id === productId.value;
      // });


      setProductUnitPrice(productPrice[0]["costPrice"]);
      // setProductDiscount(productDiscount[0]["costDiscount"]);
      //setProductTax(productTax[0]["costtax"]);
    }
  }, [productId]);


  const loadUnitById = async (id) => {
    await axios
      .get(
        `${config.APP_CONFIG}/Products/ProductInhouseUnit/ByProductId/api/${id}`,
        {
          headers: {
            Authorization: userSessionContext.token,
          },
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
        // toast.error("failed to load units");
        setUnits([]);
      });
  };

  // const get_curr_item = () => {
  //   console.log(props.products);
  //   if (productId === undefined) return {};
  //   let _all_items = props.products.filter((x) => {
  //     return x.productId === productId.value;
  //   });

  //   let _curr_item = _all_items[0] || {};
  //   return _curr_item;
  // };

  // React.useEffect(() => {
  //   if (productId !== undefined) {
  //     let curr_item = get_curr_item();
  //     setCurrentItem(curr_item);
  //   }
  // }, [productId]);
  const getCheckBox = (key, callback) => {
    return (
      <Switch
        checked={key === 1 ? true : false}
        defaultValue="on"
        color="primary"
        onChange={(e) => {
          let changedValue = 0;
          if (key === 0) {
            changedValue = 1;
          }
          callback(changedValue);
        }}
      />
    );
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
      {productId ? (
        <td size="small">
          <input
            type="number"
            step="1"
            min={0}
            value={productUnitPrice || 0}
            onKeyDown={(e) =>
              (e.keyCode === 69 || e.keyCode === 187) && e.preventDefault()
            }
            onChange={(e) => {
              setProductUnitPrice(e.target.value);
            }}
            style={{ width: "80px" }}
          />
        </td>
      ) : (
        <p style={{ padding: "0.7rem 0", margin: "0" }}>0</p>
      )}



      {productId ? (
        <td size="small">

          {getCheckBox(taxRates, setTaxRates)}

        </td>

      ) : (
        <td>
          0
        </td>
      )
      }

      <td size="small">
        <span>{parseFloat(productTotal || 0)}</span>
      </td>

      {/* <td size="small">
        <input
          size={5}
          type="number"
          min={0}
          value={productDiscount}
          onKeyDown={(e) =>
            (e.keyCode === 69 || e.keyCode === 190 || e.keyCode === 187) &&
            e.preventDefault()
          }
          onChange={(e) => {
            setProductDiscount(e.target.value);
          }}
          style={{ width: "50px" }}
        />
      </td> */}
      {/* <td>
        <input
          size={5}
          type="number"
          value={productTax}
          min={0}
          onKeyDown={(e) =>
            (e.keyCode === 69 || e.keyCode === 190 || e.keyCode === 187) &&
            e.preventDefault()
          }
          onChange={(e) => {
            setProductTax(e.target.value);
          }}
          style={{ width: "50px" }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              // addRowHandler();
              //  props.setData({...props.data,"purchaseProductId":props.purchaseProductId})
              //  console.log(props.data)
              if (
                productId === "" ||
                productQty === "" ||
                productUnitPrice === "" ||
                unit === ""
              ) {
                return toast.warn("Please Fill the Form");
              }
              let _row = {
                productId: productId.value,
                productQty: parseFloat(productQty),
                productUnitPrice: parseFloat(productUnitPrice),
                productSubtotal: parseFloat(productSubtotal),
                productTax: parseFloat(productTax),
                productDiscount: parseFloat(productDiscount),
                unitId: unit.value,
                insertedId: props.data.id,
              };
              axios
                .post(`${config.APP_CONFIG}/Purchase/PurchaseProduct/api`, _row
                    ,{
                      headers:{
                        Authorization: userSessionContext.token
                      }
                    }
                )
                .then((res) => {
                  if (
                    res.data.status_code === undefined ||
                    res.data.status_code === null ||
                    res.data.status_code === ""
                  ) {
                    return <Spinner />;
                  }
                  if (res.data.status_code === 200) {
                    props.addRow({
                      id: res.data.msg.id,
                      product_name: productId.label,
                      productQty: parseFloat(productQty),
                      productUnitPrice: parseFloat(productUnitPrice),
                      productsubtotal: parseFloat(productSubtotal),
                      productTax: parseFloat(productTax),
                      productDiscount: parseFloat(productDiscount),
                      unitName: unit.label,
                      productTotal: parseFloat(productQty) * parseFloat(productUnitPrice),
                    });
                    setProductId("");
                    setProductQty(1);
                    setProductUnitPrice(1);
                    setProductSubtotal("");
                    setProductTax(0);
                    setProductDiscount(0);
                    setUnits("");
                    setUnit("");
                    setProductTotal("");
                    setProductTotal("");
                    toast.success(res.data.msg || "Product Added successfully");
                  } 
                  
                 else if (res.data.status_code === 401) {
                    userSessionContext.handleLogOut();
                  }
                  else {
                    toast.error("error occured");
                  }
                })
                .catch((err) => {
                  console.log(err);
                  toast.error("failed to Add data");
                });
            }
          }}
          // onBlur={(e) => {
          //   addRowHandler();
          // }}
        />
      </td> */}
      {/* <td size="small">
        <span>{productSubtotal || 0}</span>
      </td> */}
      {props.disable === 0 ?
        <td>
          <Controls.ActionButton
            size="small"
            variant="contained"
            color="secondary"
            onClick={(e) => {

              // if(productId === null && productQty === null && productUnitPrice ===null &&   productSubtotal===null && productTax===null &&  productDiscount ===null && unit ===undefined)
              // {
              //   return <Spinner/>
              // }
              if (
                productId === "" ||
                productQty === "" ||
                productUnitPrice === "" ||
                unit === "" ||
                unit === undefined
              ) {
                return toast.warn("Please Fill the Form");
              }
              if (parseFloat(productUnitPrice)== 0)
               {
                return toast.warn("Unit Price should be greater than 1");
              }
              else {

                let _row = {
                  productId: parseInt(productId.value),
                  productQty: parseFloat(productQty),
                  productUnitPrice: parseFloat(productUnitPrice),
                  productSubtotal: parseFloat(productTotal),
                  productTax: parseInt(taxRates) !== 0 ? (parseFloat(productTotal)) * parseFloat(0.13) : 0,
                  productDiscount: parseFloat(productDiscount) || 0,
                  unitId: parseInt(unit.value),
                  insertedId: props.data.id,

                };


                axios.post(`${config.APP_CONFIG}/Purchase/PurchaseProduct/api`, _row,
                  {
                    headers: {
                      Authorization: userSessionContext.token,
                    },
                  }
                )
                  .then((res) => {
                    if (res.data.status_code === 200) {
                      props.addRow({
                        id: res.data.msg,
                        product_name: productId.label,
                        productId: productId.value,
                        productQty: parseFloat(productQty),
                        productUnitPrice: parseFloat(productUnitPrice),
                        productSubtotal: parseFloat(productTotal) || 0,
                        productTax: parseInt(taxRates) !== 0 ? (parseFloat(productTotal)) * parseFloat(0.13) : 0,
                        productDiscount: parseFloat(productDiscount) || 0,
                        unitName: unit.label,
                        unitId: unit.value,
                        productTotal: parseFloat(productTotal) || 0,
                        userQuantity: parseFloat(productQty),
                        userUnitName: unit.label,

                      });

                      setProductId("");
                      setProductQty("1");
                      setProductUnitPrice();
                      setProductSubtotal("");
                      setProductTax("");
                      setProductDiscount("");
                      setUnits("");
                      setUnit("");
                      setProductTotal("");
                      setCurrentItem("");
                      //setProductTotal("");
                      setTaxRates(1);

                    } else if (res.data.status_code === 401) {
                      userSessionContext.handleLogOut();
                    } else if (res.data.status_code === 400) {
                      toast.warn(res.data.msg);
                    } else {
                      toast.error("Error Occured");
                    }
                  })
                  .catch((err) => {
                    toast.error("failed to Add data");
                  });
              }
            }}

          >
            <Tooltip title="Add">
              <AddCircleIcon color="primary" style={{ fontSize: "25px" }} />
            </Tooltip>
          </Controls.ActionButton>
        </td>
        : null}
    </tr>
  );
};

//-------------------------END OF INPUT ROW----------------------------

//-------------------------MAIN FORM-----------------------------------
const FormTwo = (props) => {
  const [products, setProducts] = useState(props.productData || []);
  console.log("props", props)
  const [saveDisable, setSaveDisable] = useState(0);
  const userSessionContext = React.useContext(UserSessionContext);
  const companyContext = React.useContext(CompanyContext);
  const [product, setProduct] = useState();
  const [allProducts, setAllProducts] = useState();
  // const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState("");
  const [tax, setTax] = useState(13);
  const [disable, setDisable] = useState(0);
  // const [taxableAmount, setTaxableAmount] = useState(0);
  // const [grandTotal, setGrandTotal] = useState(0);
  const [taxPercent, setTaxPercent] = useState(13);
  //const [taxRates, setTaxRates] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [SaveStatus, setSaveStatus] = useState(0);
  const [issubmit, setSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showdiscount, setShowDiscount] = useState(false);
  const [showButton, setShowButton] = useState(0);
  const [isPrintPopup, setIsPrintPopup] = useState(false)


  useEffect(() => {
    loadProducts();

  }, []);

  const loadProducts = async () => {

    await axios
      .get(`${config.APP_CONFIG}/Products/product/Api`, {
        headers: {
          Authorization: userSessionContext.token,
        },
      })
      .then((res) => {
        if (res.data && res.data.status_code && res.data.status_code === 200) {
          setProduct(res.data.msg);
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
        toast.error("failed to Products");
        setAllProducts([]);
      });
  };



  const _subtotal = products.reduce(
    (total, obj) => parseFloat(obj.productSubtotal
    ) + parseFloat(total),
    0
  );
  const product_no_tax_list = products.filter((x) => x.productTax === 0)

  const dis_amount = (discount || 0) / parseInt(100);
  const _nontaxable = product_no_tax_list.reduce(
    (total, obj) => parseFloat(obj.productSubtotal) + parseFloat(total),
    0
  );

  const total__discount_with_out_tax = _nontaxable * dis_amount
  const non_taxable_Amount_after_discount = parseFloat(_nontaxable) - parseFloat(total__discount_with_out_tax);

  const product_list = products.filter((x) => x.productTax !== 0)

  const _taxAmount_no_discount = product_list.reduce(
    (total3, obj) => parseFloat(obj.productSubtotal
    ) + parseFloat(total3),
    0
  );

  const total__discount_tax = _taxAmount_no_discount * dis_amount

  const _taxable_Amount_after_discount = parseFloat(_taxAmount_no_discount) - parseFloat(total__discount_tax);
  const total_discount = parseFloat(total__discount_with_out_tax) + parseFloat(total__discount_tax)


  const pro_tax = parseFloat(_taxable_Amount_after_discount) * 0.13
  const _grandtotal = parseFloat(non_taxable_Amount_after_discount) + parseFloat(_taxable_Amount_after_discount) + parseFloat(pro_tax)



  const totalCalculation = async () => {


    let res_data = {

      isOrderRecived: 1,
      subtotal: _subtotal,
      grandTotal: parseFloat(_grandtotal.toFixed(2)),
      taxAmount: parseFloat(pro_tax.toFixed(2)),
      discount: parseFloat(total_discount.toFixed(2)) || 0,
      netTotal: parseFloat(_taxable_Amount_after_discount.toFixed(2)),
      insertedId: props.data.id,
      paymentMode: "",
      fiscalyear: companyContext.fiscal[0]["fiscalYear"],
    };
    await axios
      .post(
        `${config.APP_CONFIG}/Purchase/ProductPurchaseSummary/api`,
        res_data,
        { headers: { Authorization: userSessionContext.token } }
      )
      .then((res) => {
        if (
          res.data.status_code === undefined ||
          res.data.status_code === null ||
          res.data.status_code === ""
        ) {
          return <Spinner />;
        }
        if (res.data.status_code === 200) {

          const _temp = {
            subtotal: _subtotal,
            grandTotal: _grandtotal,
            taxAmount: parseFloat(pro_tax.toFixed(2)),
            discount: parseFloat(total_discount.toFixed(2)) || 0,
            netTotal: parseFloat(_taxable_Amount_after_discount.toFixed(2)),
            fiscalyear: companyContext.fiscal[0]["fiscalYear"],
          };
          props.updateSetdata({ ...props.data, ..._temp });
          setSaveDisable(1);
          setDisable(1);
          //props.load_purchase_summary();
          setSubmit(true);
          setShowDiscount(true)
          toast.success("Product Save successfully");


        } else {
          toast.error("Error Occured");
        }
      })
      .catch((err) => {
        toast.error("Failed to Submit Products");
      });
  };






  if (allProducts === undefined) {
    return <Spinner />;
  }



  const handleSubmit = (e) => {

    e.preventDefault();
    setIsSubmitting(true);
    const stock_data = products.map(({ productId, productQty, id, unitId }) => ({ productId, productQty, id, unitId }));

    const put_data = products.map(({ productSubtotal, productTax, productDiscount, id }) => ({ productSubtotal, productTax, productDiscount, id }));
    const filter_data = put_data.map((i) => {

      return {
        ...i,
        "productDiscount": parseFloat(parseFloat(dis_amount) * parseFloat(i.productSubtotal).toFixed(3)),
        "productTax": parseInt(i.productTax) !== 0 ? (parseFloat(parseFloat(i.productSubtotal) - (parseFloat(dis_amount || 0) * parseFloat(i.productSubtotal))) * parseFloat(0.13).toFixed(3)) : 0,
        "id": i.id,
      }
    });






    const _row_data = stock_data.map((i) => {
      return {
        ...i,
        productId: parseInt(i.productId),
        productQty: parseFloat(i.productQty),
        id: i.id,
        unitId: parseInt(i.unitId),
        companyId: companyContext.company.id,
        username: localStorage.getItem('user'),

        grandTotal: _grandtotal,
      }
    })


    axios.put(`${config.APP_CONFIG}/Purchase/PurchaseProduct/api`, filter_data, { headers: { Authorization: userSessionContext.token, }, })
      .then((res) => {
        if (res.data.status_code === 200) {
          axios.post(`${config.APP_CONFIG}/Purchase/StatusUpdate/api`, _row_data,
            { headers: { Authorization: userSessionContext.token, } })
            .then((res) => {
              if (res.data.status_code === 200) {
                //setSaveStatus(1);

                setShowButton(1);

                let req_data = {
                  companyId: companyContext.company.id,
                  grandTotal: _grandtotal,

                  isConformed: 1,


                };

                axios.put(`${config.APP_CONFIG}/Purchase/StatusUpdate/api/${props.data.id}`, req_data, { headers: { Authorization: userSessionContext.token } })
                  .then((res) => {
                    if (res.data.status_code === 200) {

                      props.updateSetdata({ ...props.data, isConformed: 1 });

                      toast.success(res.data.msg);
                      let req_payload = {
                        isCompleted: 1,
                      };

                      axios.put(`${config.APP_CONFIG}/Purchase/StatusUpdate/api/${props.data.id}`, req_payload, { headers: { Authorization: userSessionContext.token, }, })
                        .then((es) => {
                          if (es.data.status_code === 200) {

                            props.step_handler("next");
                            setIsSubmitting(true);

                          }
                          else if (es.data.status_code === 401) {
                            userSessionContext.handleLogOut();
                          } else {
                            toast.warn(es.data.msg);
                          }
                        })
                        .catch((err) => {
                          toast.error("Something went Wrong");
                        });

                    } else if (res.data.status_code === 401) {
                      userSessionContext.handleLogOut();
                    } else if (res.data.status_code === 400) {
                      toast.warn(res.data.msg);
                    } else {
                      toast.error("Error Occured");
                    }
                  })
                  .catch((err) => {
                    toast.error("failed to Add data");
                  });


              } else if (res.data.status_code === 401) {
                userSessionContext.handleLogOut();
              } else {
                toast.error(res.data.msg);
              }
            })
            .catch((err) => {
              toast.error("Something went Wrong");
            });
        }
        else if (res.data.status_code === 401) {
          userSessionContext.handleLogOut();
        } else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
        } else {
          toast.error("Error Occured");
        }
      })
      .catch((err) => {
        toast.error("failed to Add data");
      })


  }


  return (
    <div className="dialog-height">
      <div className="purchase-form">
        <div className="row mb-1">
          <div className="d-flex justify-content-between">
            <h3 style={{ textAlign: "center", alignItems: "center", fontSize: "18px", fontWeight: "600" }}>Vendor Details </h3>
            <span>
              <Controls.Button
                text="Preview"
                variant="outlined"
                startIcon={<PrintIcon />}
                onClick={() => {
                  setIsPrintPopup(!isPrintPopup);
                }} />
              {isPrintPopup ? (
                <Popup
                  size="lg"
                  title={`
                  ${companyContext.company.name}
                  `}
                  openPopup={isPrintPopup}
                  setPopups={setIsPrintPopup}
                >
                 <PrintPreview
                 vendor={props.data}
                 products={products}
                 subtotal ={_subtotal}
                 non_tax={non_taxable_Amount_after_discount}
                 tax={_taxable_Amount_after_discount}
                 total_tax={pro_tax}
                 grandTotal={_grandtotal}
                 discount={discount}
                 />
                </Popup>
              ) : null}
            </span>
          </div>
          <Grid container spacing={2}>


            <Grid item xs={4}>
              <p>
                <b>Vendor Name: </b>
                <b>{props.data.vendorname || ""}</b>
              </p>
              <p>
                <b>Address :</b> <b>{props.data.address || ""}</b>
              </p>
            </Grid>
            <Grid item xs={4}>
              <p>
                <b>Pan :</b> <b>{props.data.panNo || ""}</b>
              </p>
              <p>
                <b>Number :</b> <b>{props.data.contact || ""}</b>
              </p>
            </Grid>
            <Grid item xs={4}>
              <p>
                <b>Bill Ref :</b> <b>{props.data.vendorReference || ""}</b>
              </p>
              <p>
                <b>Receipt Date:</b> <b>{format(new Date(props.data.recepitDate), "yyyy/MM/dd") || ""}</b>
              </p>
            </Grid>

          </Grid>
        </div>
        <Divider />
        <div style={{maxHeight:'200px',overflowY:"scroll"}}>
        <table className="table table-fluid">
          <tr>
            {products ? <th style={{ width: "40px" }}>S.No.</th> : null}
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Unit price</th>
            <th>Tax</th>
            <th>Total</th>

            <th>Action</th>
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



                  {disable === 0 ?
                    <td>
                      <Controls.ActionButton>

                        <span
                          onClick={(e) => {
                            axios
                              .delete(
                                `${config.APP_CONFIG}/Purchase/PurchaseProduct/api/${row.id}`,
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
                                  let _data = products.filter((item) => {
                                    return item.id !== row.id;
                                  });
                                  // setData(_data)
                                  setProducts(_data);
                                  toast.info(res.data.msg);
                                } else if (res.data.status_code === 400) {
                                  toast.error(res.data.msg.toString());
                                }
                              })
                              .catch((err) => {
                                toast.error("failed to Delete Product");
                                setProducts([]);
                              });
                            // const _data = products.filter((item) => {

                            //   return item.id !== row.id;
                            // });

                            // setProducts(_data);
                          }}
                        >
                          <Tooltip title="Delete" placement="top" arrow>
                            <DeleteIcon style={{ fontSize: "15px" }} />
                          </Tooltip>

                        </span>

                      </Controls.ActionButton>
                    </td>
                    : null}
                </tr>
              );
            })
            : []}

          <AddForm
            data={props.data}
            allProducts={allProducts}
            disable={disable}
            product={product}
            addRow={(e) => {
              setProducts([...products, e]);
            }}
          />
        </table>
        </div>
        <div className="">
          <div className="row">
            <div className="col-8"></div>
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
                      {showdiscount === false ?
                        <b>Discount(%) :</b>

                        : (

                          <b>Discount Amt:</b>

                        )}
                    </div>
                    <div className="col-md-auto  pb-1">
                      <b>Non-Taxable Amount :</b>
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
                      {issubmit === false ?
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
                              setDiscount(parseFloat(e.target.value));
                            }}
                            style={{ width: "100%" }}
                          />
                        </div>
                        : (
                          <div className="col">
                            <input disabled

                              value={total_discount}

                              style={{ width: "100%" }}
                            />
                          </div>
                        )}
                    </div>
                    <div className="col pb-1">{non_taxable_Amount_after_discount.toFixed(3)}</div>
                    <div className="col col-lg-12 pb-1">{_taxable_Amount_after_discount.toFixed(3)}</div>
                    {/* <select
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
                      </select> */}
                    {/* </div>  */}

                    <div className="col pb-1">
                      <span>
                        {pro_tax.toFixed(3)}

                      </span>
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

        <div style={{position:"relative"}}>
       
          {saveDisable === 0 ? (
             <div style={{ position: "absolute", right: 0, top: 0 }}> 
            <Controls.Button
              // type="submit"
              text="Save"
              variant="contained"
              onClick={(e) => {
                e.preventDefault();
                ;
                if (
                  products === undefined ||
                  products === null ||
                  products.length === 0
                ) {
                  toast.warn("Please Add Product First");
                } else {
                  totalCalculation();
                }

              }}
            />

         </div> ) :

            <div style={{ position: "absolute", right: 0, top: 0 }}> 


              <Controls.Button
                type="submit"
                text="Confirm"
                disabled={isSubmitting}
                onClick={(e) => {
                  e.preventDefault();
                  setIsSubmitting(true);


                  handleSubmit(e);
                  //e.target.disabled=true;

                }}
              />

            </div>
 
          }
</div>




        </div>
      </div>
    // </div>
  );
};

export default FormTwo;
//---------------------------END OF MAIN FORM--------------------------
