
import React, { useState, useEffect, useRef } from "react";
//import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import Form from "react-bootstrap/Form";
import Spinner from "../../utils/spinner";
import { toast } from "react-toastify";
// Material UI
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import UserSessionContext from "../../contexts/UserSessionContext";
import CompanyContext from "../../contexts/CompanyContext";
import config from "../../utils/config";
import Controls from "../controls/Controls";

import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";

import { Tooltip } from "@material-ui/core";
import format from "date-fns/format";
import ReactPrint from "./ReactToPrint/ReactPrint";
import Popup from "../home/Popup";
import PrintIcon from "@mui/icons-material/Print";
import ReactToPrint from "react-to-print";



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

const headCells = [
  { id: "productName", label: "Product Name" },
  { id: "productQuantity", label: "Quantity" },
  { id: "productUnit", label: "Product Unit" },
  { id: "productUnit", label: "Unit Price" },
  { id: "productTotal", label: "Total" },
  { id: "productDiscount", label: "Discount" },
  { id: "productTax", label: "Tax" },
  { id: "productSubtotal", label: "Subtotal" },
  { id: "actions", label: "Actions" },
];

//-------------------------START OF INPUT ROW------------------------

const AddForm = (props) => {

  const taxrate = [
    { label: 0, value: 0 },
    { label: 13, value: 13 }
  ]

  const classes = useStyles();
  const userSessionContext = React.useContext(UserSessionContext);
  const companyContext = React.useContext(CompanyContext);
  const [productId, setProductId] = useState("");
  const [productQty, setProductQty] = useState("1");
  const [productCost, setProductCost] = useState("0");
  const [productTotal, setProductTotal] = useState("");
  const [productSubtotal, setProductSubtotal] = useState("");
  const [productTax, setProductTax] = useState();
  const [productDiscount, setProductDiscount] = useState("0");
  const [units, setUnits] = useState();
  const [unit, setUnit] = useState();
  const [allProducts, setAllProducts] = useState(props.allProducts || []);
  const [currentItem, setCurrentItem] = useState({});
  const [stockQty, setStockQty] = useState();
  //const [disable, setDisable] = useState(false);

  const [productpercent, setProductpercent] = useState({ label: 13, value: 13 },);
  const [barcode, setBarcode] = useState("");
  useEffect(() => {
    if (productId.value !== undefined) {
      loadUnitById(productId.value);
      const productPrice = props.product.filter((x) => {
        return x.id === productId.value;
      });

      //  const productDiscount = props.product.filter((x) => {
      //   return x.id === productId.value;
      // });

      //const productTax = props.product.filter((x) => {
      //  return x.id === productId.value;
      //});

      setProductCost(productPrice[0]["sellPrice"] || 0);
      // setProductDiscount(productDiscount[0]["sellDiscount"]);
      // setProductTax(productTax[0]["selltax"]);
    }
  }, [productId]);
  const decimalValidate = (event) => {
    if (!/^\d*\.?\d*$/.test(event.key)) {
      event.preventDefault();
    }
  };

  useEffect(() => {
    if (productQty !== undefined && productCost !== undefined) {
      // let _discount = productDiscount || 0;
      // let productpercent=  0;
      let temp = parseFloat(productQty) * parseFloat(productCost)
      setProductTotal(parseFloat(temp.toFixed(3)));


    }
  }, [productQty, productCost]);

  useEffect(() => {
    if (productQty !== undefined && productCost !== undefined) {
      // const _taxDiv =productpercent/ 100 + parseInt(1);
      //const _taxAmount = _taxableAmount * (productpercent / 100) || 0;
      //console.log(productpercent)

      const _net = (parseFloat(productCost) * parseFloat(productQty)) - parseFloat(productDiscount || 0)
      setProductTax((parseFloat(parseFloat(productpercent.value / 100) || 0) * _net))

      const _Percent = ((productpercent.value / 100) || 0) + parseInt(1);

      // const _taxAmount = _net * (productpercent.value / 100) || 0;
      const _grandsubtotal = parseFloat(_net) * parseFloat(_Percent) || 0;

      //let temp =(parseFloat( productCost) * parseFloat( productQty)) - parseFloat(productDiscount||0)+ parseFloat((parseFloat(productpercent.value/100)||0 )* parseFloat(productTotal)+ parseFloat(productTotal);

      setProductSubtotal(parseFloat(_grandsubtotal.toFixed(2)));
    }
  }, [productQty, productCost, productTotal, productDiscount, productpercent]);





  const loadUnitById = async (id) => {
    await axios
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
        // toast.error("failed to load units");
        setUnits([]);
      });
  };



  return (
<>
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

          }}
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          }}
          menuPortalTarget={document.body}
        />
      </td>

      <td  size="small">
     
        {/* <input
          type="number"
          step="1"
          min={1}
          value={productQty || 0}
          onKeyDown={(e) =>

            (e.keyCode === 69 || e.keyCode === 187) && e.preventDefault()
          }
          onChange={(e) => {
            setProductQty(e.target.value);
          }}
          style={{ width: "50px" }}
        /> */}
          <div className="custom-qty">
        <Form.Control
                aria-label="quantity"
                onKeyPress={(event) => decimalValidate(event)}
                className="text-center px-0 py-2 rounded hide-arrow"
                value={productQty }
                type="number"
                step={0.01}
                min={0.0}
                style={{width:"80px"}}
               onChange={(e) => {
            setProductQty(e.target.value);
          }}
              />
    
          </div>
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
        <td  size="small">
          {/* <input
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
          /> */}
            <Form.Control
                aria-label="cost"
                onKeyPress={(event) => decimalValidate(event)}
                className="text-center px-0 py-2 rounded hide-arrow"
                value={productCost || 0}
                type="number"
                step={0.01}
                min={0.0}
                style={{width:"80px"}}
               onChange={(e) => {
                setProductCost(e.target.value);
          }}
          />

        </td>

      ) : (
        <td>0</td>
      )}

      <td size="small">
        <span>{productTotal || 0}</span>
      </td>

      {productId ? (
        <td   size="small">
             <Form.Control
                aria-label="discount"
                onKeyPress={(event) => decimalValidate(event)}
                className="text-center px-0 py-2 rounded hide-arrow"
                value={productDiscount || 0}
                type="number"
                step={0.01}
                min={0.0}
              style={{width:"80px"}}
                onChange={(e) => {
                  setProductDiscount(e.target.value);
                }}
        
          />  

         
        </td>
      ) : (

        <td>
          0
        </td>
      )}
      {productId ? (
        <td  width="150px">
          <Select
            type="text"
            placeholder={"Vat"}
            options={taxrate}
            defaultValue={taxrate[1]}
            onChange={setProductpercent}
            styles={{
              menuPortal: (base) => ({ ...base, zIndex: 9999 }),
            }}
            menuPortalTarget={document.body}
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
      {props.issubmit === false ?
        <td>
          <Controls.ActionButton
            size="small"
            variant="contained"
            color="secondary"
            onClick={(e) => {


              if (productId === "" || productQty === "" || productCost === "" || unit === "" || unit === undefined || productQty === undefined) {
                return toast.warn("Please Fill the Form");
              }
              // console.log(productQty);

              else if (productQty == 0) {
                toast.warn("Product Qty is greater than 1");
              }
              else if (productQty >= stockQty) {
                toast.warn("Entered Product Qty is greater than Stock Qty");
              }
              else if (parseFloat(productDiscount) > parseFloat(productTotal)) {
                toast.warn("Product Discount is greater than product total");
              }
              else {


                let check_quantity =
                {
                  "quantity": parseFloat(productQty),
                  "productId": productId.value,
                  "unitId": unit.value,
                  "companyId": companyContext.company.id,
                  "wareHouseId": 0,
                }
                axios
                  .post(`${config.APP_CONFIG}/Inventory/checkStockQuantity/api`, check_quantity, {
                    headers: { Authorization: userSessionContext.token },
                  })
                  .then((res) => {
                    if (res.data.status_code === 200) {
                      if (res.data.msg === "True") {
                        props.addRow({

                          salesId: props.data.id,
                          productName: productId.label,
                          productId: parseInt(productId.value),
                          unitId: parseInt(unit.value),
                          productQTY: parseFloat(productQty),
                          productCost: parseFloat(productCost),
                          productTotal: parseFloat(((productTotal||0))),
                          productDiscount: parseFloat((productDiscount|| 0)) ,
                          productTax: parseFloat((productTax||0)),
                          productSubtotal: parseFloat((productSubtotal||0)),
                          unitName: unit.label,


                        });

                        setProductId("");
                        setProductQty(1);
                        setProductCost();
                        setProductSubtotal("");
                        setProductTax("");
                        setProductDiscount(0);
                        setUnits("");
                        setUnit("");
                        setProductTotal("");
                        setCurrentItem("");
                      }
                      else {
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
                    toast.error("Failed to check Product quantity");
                  });
              }


            }}
          >
            <Tooltip title="Add Product" placement="top" arrow>
              <AddIcon style={{ fontSize: "15px" }} />
            </Tooltip>
          </Controls.ActionButton>
        </td>
        : null}
    </tr>
    </>
  );
};

//----------------------------- END OF INPUT ROW -----------------------

//----------------------------- MAIN FORM ------------------------------


const FormTwo = (props) => {

  const componentRef = React.useRef(null)
  const [products, setProducts] = useState(props.salesData || []);
  const [allProducts, setAllProducts] = useState();
  //const [saveDisable, setSaveDisable] = useState(false);
  const userSessionContext = React.useContext(UserSessionContext);
  const companyContext = React.useContext(CompanyContext);

  const [product, setProduct] = useState();
  const [discount, setDiscount] = useState("");
 // const [tax, setTax] = useState(0);
  const fiscalYear = companyContext.fiscal[0]["fiscalYear"];
  const [issubmit, setSubmit] = useState(false);
  //const [save_data, setData] = useState();
  const [billno, setbillno] = useState();
  // const [saveDisable, setSaveDisable] = useState(0);
  // let id = props.datas.id;
  const [barcodeproduct, setBarcodeproduct] = useState("");
  //const [searchInput, setSearchInput] = useState("");
  const [isPrintPopup, setIsPrintPopup] = useState(false)
  useEffect(() => {
    loadProduct();
    loadProducts();
  }, []);
 

  const loadProduct = () => {
    axios
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



  // const handleChange = (e) => {

  //   e.preventDefault();
  //   if (searchInput.length > 0) {
  //     const a = product.filter((c) => {

  //       return c.barcode.includes(searchInput.toLowerCase())



  //     });

  //     setBarcodeproduct(a)
  //   }
  //   setSearchInput(e.target.value);

  // };


  const loadProducts = () => {


    axios
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

  const dis_amount = (discount || 0) / parseInt(100);
  useEffect(() => {
    const filter_data = products.map((i) => {

      return {
        ...i,
        "productDiscount": parseFloat(dis_amount) * parseFloat(i.productTotal),
        "productTax": parseInt(i.productTax) !== 0 ? ((parseFloat(i.productTotal) - (parseFloat(dis_amount || 0) * parseFloat(i.productTotal))) * parseFloat(0.13)) : 0,
        "productSubtotal": parseFloat(parseFloat(i.productTotal) - (dis_amount * parseFloat(i.productTotal)) + (parseInt(i.productTax) !== 0 ? ((parseFloat(i.productTotal) - (parseFloat(dis_amount || 0) * parseFloat(i.productTotal))) * parseFloat(0.13)) : 0)),
      }
    });

    setProducts(filter_data);
  }, [discount]);

  const _producttotal = products.reduce(
    (total, obj) => parseFloat(obj.productTotal) + parseFloat(total),
    0
  );

  const product_no_tax_list = products.filter((x) => x.productTax === 0)

  const _subtotal_no_tax = product_no_tax_list.reduce(
    (total, obj) => parseFloat(obj.productSubtotal) + parseFloat(total),
    0
  );


  const _subtotal_no_discount = product_no_tax_list.reduce(
    (total7, obj) => parseFloat(obj.productSubtotal) + parseFloat(total7),
    0
  );

  const product_list = products.filter((x) => x.productTax !== 0)

  const _subtotal_tax = product_list.reduce(
    (total3, obj) => parseFloat(obj.productTotal) + parseFloat(total3),
    0
  );

  const taxable_discount = product_list.reduce(
    (total5, obj) => parseFloat(obj.productDiscount) + parseFloat(total5),
    0
  );

  const taxable = parseFloat(_subtotal_tax) - parseFloat(taxable_discount || 0)

  const pro_tax = product_list.reduce(
    (total1, obj) => parseFloat(obj.productTax) + parseFloat(total1),
    0
  );


  const _taxableAmount = _producttotal - (discount || 0);

  const _grandtotal = parseFloat(_subtotal_no_tax) + parseFloat(taxable) + parseFloat(pro_tax)


  if (allProducts === undefined) {
    return <Spinner />;
  }



  const totalCalculation = () => {
    const _row_data = products.map((i) => {
      return {
        ...i,
        productQTY: parseFloat(parseFloat(i.productQTY).toFixed(2)),
        productCost: parseFloat(parseFloat(i.productCost).toFixed(2)),
        productTotal: parseFloat(parseFloat(i.productTotal).toFixed(2)),
        productDiscount: parseFloat(parseFloat(i.productDiscount).toFixed(2)) || 0,
        productTax: parseFloat(i.productTax),
        productSubtotal: parseFloat(i.productSubtotal),
        companyId: companyContext.company.id,
        username: localStorage.getItem('user')

      }
    })

    axios.post(`${config.APP_CONFIG}/Sales/SalesProduct/api`, _row_data, { headers: { Authorization: userSessionContext.token } })
      .then((res) => {
        if (res.data.status_code === 200) {
          //setSaveDisable(true);
          // setSubmit(true);
          const res_data = {
            subTotal: parseFloat(_producttotal),
            grandTotal: parseFloat(_grandtotal.toFixed(2)),
            taxAmount: parseFloat(pro_tax),
            netTotal: parseFloat(_subtotal_tax),
            customerId: props.data.customerId,
            customerName: props.data.customerName,
            discount: discount || 0,
            salesId: props.data.id,
            companyId: companyContext.company.id,
            serviceCharge: 0,
            fiscalYear: fiscalYear,
            dateOfSales: format(new Date(props.data.dateOfSales), "yyyy-MM-dd HH:mm:ss"),
            createdBy: localStorage.getItem('user')
          }


          axios.post(`${config.APP_CONFIG}/Sales/SalesSummary/api`, res_data, {
            headers: { Authorization: userSessionContext.token },
          })
            .then((res) => {
              if (res.data.status_code === 200) {

                setbillno(res.data.msg);




                setSubmit(true);

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

          setSubmit(true);

        } else if (res.data.status_code === 401) {
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

    // setSubmit(true);

  }
console.log(props.data)
  return (

    <div className="dialog-height">

      <div className="purchase-form">
        <Grid container content spacing={2}>


          <Grid item xs={11} className="d-flex  w-100 mx-auto">

            <div>
              <div className="d-flex w-100 mx-auto">
                <b>Customer Name : </b>
                <b>{props.data.customerName || ""}</b>
              </div>
              <div className="d-flex  w-100 mx-auto">
                <b>Address : </b>
                <b>{props.data.address || ""}</b>
              </div>
              <div className="d-flex  w-100 mx-auto">
                <b >Pan No. : </b>
                <b>{props.data.panNo || ""}</b>
              </div>
              <div className="d-flex  w-100 mx-auto">
                <b>Sales Date : </b>
                <b>{props.data.dateOfSales || ""}</b>
              </div>
            </div>
          </Grid>
        
          <Grid xs={1} className="d-flex flex-row justify-content-end align-item-center my-auto">

            <div >
              <Controls.Button
                text="Preview"
                variant="outlined"
                startIcon={<PrintIcon />}
                // className={classes.newButton}
                onClick={() => {
                  setIsPrintPopup(!isPrintPopup);
                }}
              />
              {isPrintPopup ? (
                <Popup
                  size="lg"
                  title={`
                  ${companyContext.company.name}
                  `}
                  openPopup={isPrintPopup}
                  setPopups={setIsPrintPopup}
                >
                    <ReactPrint 
                    customer={props.data} 
                    data={products}
                    discount={discount}
                    subTotal={_producttotal}
                    nontax ={_subtotal_no_tax}
                    _taxableAmount={taxable}
                    tax={pro_tax}
                    _grandtotal={_grandtotal}
                    />
                </Popup>
              ) : null}
            </div>
          </Grid>

        </Grid>
        <br />
        <div  style={{maxHeight:'200px',overflowY:"scroll"}}>
          <table className="w-100 text-align-middle" >

            <tr>
              <th>S.No.</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Unit</th>
              <th>Unit price</th>
              <th>Total</th>
              <th>Dis Amt</th>
              <th>Tax</th>
              <th>Sub Total</th>

              <th>Action</th>
            </tr>
            {products
              ? products.map((row, idx) => {

                return (
                  <tr key={row.idx}>
                    <td>{idx + 1}</td>
                    <td>{row.productName}</td>
                    <td>{row.productQTY}</td>
                    <td>{row.unitName}</td>
                    <td>{row.productCost}</td>
                    <td>{(row.productTotal).toFixed(2)}</td>
                    <td>{(row.productDiscount).toFixed(2)}</td>
                    <td>{(row.productTax).toFixed(2)}</td>

                    <td>{(row.productSubtotal).toFixed(2)}</td>
                    {issubmit === false ?
                      <td>
                        <Controls.ActionButton>
                          <span onClick={(e) => {


                            const _data = products.filter((item) => {

                              return item !== row;
                            });

                            setProducts(_data);

                          }}
                          >
                            <Tooltip title="Delete" placement="top" arrow className="bg-body">
                              <DeleteIcon style={{ fontSize: "15px", }}   />
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
              issubmit={issubmit}
              product={product}
              barcodeproduct={barcodeproduct}
              addRow={(e) => {
                // setData([...data, e])

                setProducts([...products, e]);

              }}
            />

          </table>
        </div>
     
          <div className="row">
            <div className="col-8"></div>
            <div className="col-4">
              <div
                className="card"
                style={{ margin: "30px 0 20px", padding: "10px" }}
              >
                <div className="row">
                  <div className="col-md-auto">
                    <div className="col-md-auto pb-1">
                      <b>SubTotal :</b>
                    </div>
                    <div className="col-md-auto pb-1">
                      <b>Total Discount(%) :</b>
                    </div>
                    <div className="col-md-auto  pb-1">
                      <b>Non Taxable Amount :</b>
                    </div>
                    <div className="col-md-auto  pb-1">
                      <b>Taxable Amount :</b>
                    </div>
                    {/* <div className="col-md-auto pb-1">
                    <b>Tax Rate(%) :</b>
                  </div> */}
                    <div className="col-md-auto pb-1">
                      <b>Total Tax :</b>
                    </div>
                    <div className="col-md-auto">
                      <b>Grand Total :</b>
                    </div>
                  </div>
                  <div className="col">
                    <div className="pb-1">{_producttotal.toFixed(2)}</div>
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

                            value={discount}

                            style={{ width: "100%" }}
                          />
                        </div>
                      )}


                    <div className="col pb-1">{_subtotal_no_tax.toFixed(2)}</div>
                    <div className="col pb-1">{taxable.toFixed(2)}</div>
                    <div className="col pb-1">
                      <span>{pro_tax.toFixed(2)}</span>
                    </div>
                    <div className="col">
                      <span>{_grandtotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div style={{ position: "relative" }}>
          {issubmit === false ?
            <div style={{ position: "absolute", right: 0, top: 0 }}>
              <Controls.Button

                text="Save"
                onClick={(e) => {
                  e.preventDefault();
                  if (
                    products === undefined ||
                    products === null ||
                    products.length === 0
                  ) {
                    toast.warn("Please Add Product First");
                  }
                  else {

                    totalCalculation();

                  }
                }}
              />
            </div>
            : null


          }
          {issubmit !== false ?
            <div style={{ position: "absolute", right: 0, top: 0 }}>
              <Controls.Button
                type="submit"
                text="Proceed"
                variant="contained"
                onClick={(e) => {

                  e.preventDefault();
                  const _tem = {
                    fiscalYear: companyContext.fiscal[0]["fiscalYear"],
                    subTotal: parseFloat(_producttotal),
                    grandTotal: parseFloat(_grandtotal),
                    taxAmount: parseFloat(pro_tax),
                    netTotal: parseFloat(_taxableAmount),
                    customerId: props.data.customerId,
                    customerName: props.data.customerName,
                    discount: discount || 0,
                    salesId: props.data.id,
                    companyId: companyContext.company.id,
                    serviceCharge: 0,
                    bill_no: billno,
                    isConform: 1,
                  };
                  props.updateSetData({ ...props.data, ..._tem });

                  props.step_handler("next");

                  props.step_handler("next");


                }}

              />
            </div>
            : null}
        </div>
      </div>
  
  )
}

export default FormTwo;

