import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import CompanyContext from "../../contexts/CompanyContext";
import axios from "axios";
import config from "../../utils/config";
import DeleteIcon from "@material-ui/icons/Delete";
import Controls from "../controls/Controls";
import AddIcon from "@material-ui/icons/Add";
import UserSessionContext from "../../contexts/UserSessionContext";
import { toast } from "react-toastify";
import Spinner from "../../utils/spinner";
import { format } from "date-fns";
import Select from "react-select";
import Tooltip from "@mui/material/Tooltip";
import { useHistory } from "react-router-dom";
import { Switch } from "@material-ui/core";
const AddForm = (props) => {
  const [productId, setProductId] = useState();
  const [currentItem, setCurrentItem] = useState({});
  const [productQtyReturn, setProductQtyReturn] = useState(0);
  const [purchaseReturnId, setpurchaseReturnId] = useState("");
  const [curr_product, setCurr_Product] = useState(currentItem && currentItem["productQty"]);
  const [taxRates, setTaxRates] = useState(1);
  const [saveDisable, setSaveDisable] = useState(0);
  console.log(props.products);
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
  const product_options = props.products.map((item) => {
    return {
      label: item.product_name,
      value: item.productId,
    };
  });

  const get_curr_item = () => {
    if (productId === undefined) return {};
    let _all_items = props.products.filter((x) => {
      return x.productId === productId.value;
    });

    let _curr_item = _all_items[0] || {};
    return _curr_item;
  };



  React.useEffect(() => {
    if (productId !== undefined) {
      let curr_item = get_curr_item();
    
      setCurrentItem(curr_item);
    
    }
  }, [productId]);

//console.log(curr_product);

const filterOptions = (candidate) => {
  const isCandidateAlreadyAdded = props.data && props.data.some(
    (d) => d.productId === candidate.value
  );
  if (isCandidateAlreadyAdded) return false;
  return true;
};

  return (
    <tr hover>
      <td width="200px">
        <Select
          options={product_options}
          value={productId}
          onChange={(e) => {
            setProductId(e); 
                       
          }}
          filterOption={filterOptions}
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          }}
          menuPortalTarget={document.body}
        />
      </td>
      <td>
        {productId ? (
          <div
            style={{
              width: "80px",
            }}
          >
            {currentItem["unitName"] || ""}
          </div>
        ) : (
          "Select"
        )}
      </td>
      {productId ? (
        <td>
          <input
            disabled
            type="number"
            value={(currentItem && currentItem["productQty"]) || 0 }
            style={{ width: "50px" }}
          />
        </td>
      ) : (
        <p style={{padding:"0.5rem 0"}}>0</p>
      )}
      <td size="small">
        <input
          size={5}
          type="number"
          min={1}
          //defaultValue={(currentItem && currentItem["productQty"]) || 0}     
          value={productQtyReturn}
          style={{ width: "50px" }}
          onChange={(e) => {
            setProductQtyReturn(e.target.value);
          }}
        />
      </td>
     
      <td size="small">{currentItem["productUnitPrice"] || 0}</td>
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
        {currentItem["productUnitPrice"] * productQtyReturn || 0}
      </td>
      {props.saveStatus !== 1 ? 
      <td>
        <Controls.ActionButton
          size="small"
          variant="contained"
          color="primary"
          onClick={(e) => {
            if (
              productId === "" || 
              productId === undefined || 
              productId === null || 
              productQtyReturn === undefined ||
              productQtyReturn === null ||
              productQtyReturn === ""
            ) {
              return toast.warn("Empty Form");
            } else if (productQtyReturn > currentItem["productQty"]) {
              return toast.warn("Quantity is Greater than Purchased");
            } else if (curr_product - productQtyReturn < 0) {
              return toast.warn(
                "Product Sum Quantity is Greater than Purchased"
              );
            } else {
          //     let check_quantity=
          //     {
          //       "quantity": productQty,
          //       "productId": productId.value,
          //       "unitId": unit.value,
          //       "companyId": companyContext.company.id,
          //     }
          //  axios
          //       .post(`${config.APP_CONFIG}/Inventory/checkStockQuantity/api`,check_quantity, {
          //         headers: { Authorization: userSessionContext.token },
          //        })
          //        .then((res) => {
          //          if (res.data.status_code === 200) {
          //              if(res.data.msg==="True")
          //              {
              props.addRow({
                unitName: currentItem["unitName"],
                productId: currentItem["productId"],
                productQty: productQtyReturn,
                productUnitPrice: currentItem["productUnitPrice"],
                Qty: currentItem["productQty"],
                productSubtotal: parseFloat(
                  currentItem["productUnitPrice"] * productQtyReturn
                ),
                productTax:  parseInt(taxRates) !== 0 ? (parseFloat(
                  currentItem["productUnitPrice"] * productQtyReturn
                )) * parseFloat(0.13) : 0,
              //  purchaseReturnId: purchaseReturnId,
                unitId: currentItem["userInhouseUnitId"],
                purchaseProductId: props.data.id,
                productDiscount: 0,
                productName: currentItem["product_name"],
              });
              setProductId("");
              setCurr_Product(
                parseFloat(
                  parseFloat(curr_product) -
                    parseFloat(productQtyReturn)
                )
              );
              // setUnit("");
              // setProductUnit("");
              // setProductQty();
              // setProductUnitPrice(0);
              // setProductSubtotal("");
              // setProductDiscount(0);
              // setProductTax(0);
              // setProduct("");
              // setpurchaseProductId("");]]
              // productQtyReturn("")

              setCurrentItem("");
              setProductQtyReturn("");
            }
          }}
        >
          <Tooltip title="Add" placement="top" arrow>
            <AddIcon style={{ fontSize: "15px" }} />
          </Tooltip>
        </Controls.ActionButton>
      </td>
      :null}
    </tr>
  );
};

const PurchaseReturnForm = (props) => {
  const userSessionContext = React.useContext(UserSessionContext);
  const companyContext = React.useContext(CompanyContext);
  const [value, setValue] = useState(0);
  const [data, setData] = useState([]);
  const [metadata, SetmetaData] = useState([]);
  const [productData, setProductData] = useState(props.productData || []);
  const [saveStatus, setSaveStatus] = useState(0);
  const [issubmit, setSubmit] = useState(false);
  const [showdiscount, setShowDiscount] = useState(false);
  const [discount, setDiscount] = useState("");
  const [saveDisable, setSaveDisable] = useState(0);
  let id = props.datas.id;  
  let history = useHistory();

  React.useEffect(async() => {
   await axios
      .get(`${config.APP_CONFIG}/Purchase/ProductPurchaseSummary/api/${id}`, {
        headers: { Authorization: userSessionContext.token },
      })
      .then((res) => {
        if (res.data.status_code === 200) {
          let temp = res.data.msg;
          SetmetaData(temp.mydata[0]);
          setProductData(temp.productData);
          // setData(temp.productReturnData || []);
        } else {
          toast.error(res.data.msg);
          // setData([]);
          setProductData([]);
        }
      })
      .catch((err) => {
        toast.error("Something Went Wrong");
        // setData({});
        setProductData([]);
      });
  }, []);
  //console.log(data);
  const _subtotal = data.reduce(
    (total, obj) => parseFloat(obj.productSubtotal
    ) + parseFloat(total),
    0
  );
  const product_no_tax_list = data.filter((x) => x.productTax === 0)

  const dis_amount = (discount || 0) / parseInt(100);
  const _nontaxable = product_no_tax_list.reduce(
    (total, obj) => parseFloat(obj.productSubtotal
    ) + parseFloat(total),
    0
  );

  const total__discount_with_out_tax = _nontaxable * dis_amount
  const non_taxable_Amount_after_discount = parseFloat(_nontaxable) - parseFloat(total__discount_with_out_tax);
  

  const product_list = data.filter((x) => x.productTax !== 0)

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
  //const _discount = data.reduce((total, obj) => obj.productDiscount + total, 0);
  //const _tax = data.reduce((total, obj) => obj.productTax + total, 0);
  //const _netTotal = _grandtotal - _discount + _tax;

  const purchasereturn = () => {
    let returnDate = format(new Date(), "yyyy-MM-dd ");
    if (value.returnDate !== undefined) {
      returnDate = format(new Date(value.returnDate), "yyyy-MM-dd HH:mm:ss");
    }
    let receiptdate = format(new Date(metadata.recepitDate), "yyyy-MM-dd");

    let put_data = data.map(({productId,productName,productQty,productUnitPrice, productSubtotal, productTax, productDiscount,unitId,purchaseProductId}) => ({ productId,productName,productQty,productUnitPrice, productSubtotal, productTax, productDiscount,unitId,purchaseProductId }));
   

    let req_data = {
      vendorId: metadata.vendorId,
      vendorName: metadata.vendorname,
      vendorReference: metadata.vendorReference,
      returnDate: returnDate,
      recepitDate: receiptdate,
      description: metadata.description,
      subtotal: _subtotal,
      grandTotal: parseFloat(_grandtotal.toFixed(2)),
      taxAmount: parseFloat(pro_tax.toFixed(2)),
      discount: parseFloat(total_discount.toFixed(2)) || 0,
      netTotal: parseFloat(_taxable_Amount_after_discount.toFixed(2)),
      paymentMode: "",
      fiscalyear: companyContext.fiscal[0]["fiscalYear"],
      companyId: companyContext.company.id,
      purchaseId: props.datas.id,
      returnProduct: put_data,
    };

    axios.post(`${config.APP_CONFIG}/Purchase/PurchaseReturn/api`, req_data, {
        headers: { Authorization: userSessionContext.token },
      })
      .then((res) => {
        if (res.data.status_code === 200) {
          setSaveStatus(1);
          toast.success("Product Return Successfully");

          history.push("/purchase/summary");
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogout();
        } else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
        } else {
          toast.error(res.data.msg);
        }
      })
      .catch((err) => {
        toast.error("Product return Failed");
      });
  };

  if (props.datas === undefined) {
    return <Spinner />;
  }
  return (
    <div className="purchaseReturn-form">
      <Grid container content spacing={2}>
        <Grid item xs={6}>
          <p>
            <b>Vendor Name:</b>
            {metadata.vendorname || ""}
          </p>
          <p>
            <b>Vendor Reference:</b> {metadata.vendorReference || ""}
          </p>
        </Grid>
        <Grid item xs={6}>
          <p>
            <b>Order Deadline:</b> {new Date(metadata.orderDeadline).toLocaleString()|| ""}
          </p>
          <p>
            <b>Receipt Date:</b> {new Date(metadata.recepitDate).toLocaleString()|| ""}
          </p>
        </Grid>
        <Grid item xs={12} style={{ marginBottom: "15px" }}>
          <Controls.DatePicker
            name="returnDate"
            label="Return Date"
            value={value.returnDate}
            onChange={(e) => {
              setValue({
                ...value,
                returnDate: e.target.value,
              });
            }}
          />
        </Grid>
      </Grid>
      <table className="table table-fluid">
        <tr>
          <th>Product Name</th>
          <th>Unit</th>
          <th>Purchased Qty</th>
          <th>Quantity</th>
          <th>Unit Price</th>
          <th>Tax</th>
          <th>Total</th>
          {saveStatus !== 1 ? <th>Actions</th> : null}
        </tr>

        {data
          ? data.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.productName}</td>
                  <td>{item.unitName}</td>
                  <td>{item.Qty }</td>
                  <td>{item.productQty}</td>
                  <td>{item.productUnitPrice}</td>
                  <td>{item.productTax > 0 ? "13% Vat" : "0% Vat"}</td>
                  <td>{item.productSubtotal}</td>
                  <td>
                    {saveStatus !== 1 ? (
                      <Controls.ActionButton
                        size="small"
                        variant="contained"
                        color="danger"
                        onClick={(e) => {
                          let _data = data.filter((row) => {
                            return item.id !== row.id;
                          });
                          setData(_data);
                        }}
                      >
                        <Tooltip title="Delete" placement="top" arrow>
                          <DeleteIcon style={{ fontSize: "15px" }} />
                        </Tooltip>
                      </Controls.ActionButton>
                    ) : null}
                  </td>
                </tr>
              );
            })
          : []}

        {saveStatus !== 1 ? (
          <AddForm
            data={data}
            saveStatus={saveStatus}
            products={productData}
            setData={setData}
            addRow={(e) => {
              setData([...data, e]);
              //  setProductData([...productData, e])
            }}
            //setSaveStatus
          />
        ) : null}
      </table>

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
                        <div className="pb-1">{_subtotal}</div>
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
      <div>
        {saveDisable=== 0 ? (
          <Controls.Button
            type="submit"
            text="Save"
            onClick={(e) => {
              e.preventDefault();
              if (data === undefined || data === null || data.length === 0) {
                toast.warn("Please Enter Product First");
              } else {
                  setSaveDisable(1)

                }
              
            }}
          />
        ) : 
         null
        }
         {saveDisable !== 0 ? (
                <Controls.Button
                  type="submit"
                  text="Confirm"
                  onClick={(e) => {
                    e.preventDefault();
                    if (data === undefined || data === null || data.length === 0) {
                      toast.warn("Please Enter Product First");
                    }else {
                      let confirm = window.confirm(
                        "Do You Want To Save Purchase Return ?"
                      );
                      if (confirm) {
                      
                        purchasereturn()
                        window.close();
                      }
                    }
                  }}
                />
              ) : null}
      </div>
    </div>
  );
};

export default PurchaseReturnForm;
