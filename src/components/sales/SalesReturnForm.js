
import React, { useState, useEffect } from "react";
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

const AddForm = (props) => {
  const [productId, setProductId] = useState();
  const [currentItem, setCurrentItem] = useState({});
  const [productQtyReturn, setProductQtyReturn] = useState();
  const [saleId, setSaleId] = useState("");
  const [curr_product, setCurr_Product] = useState(
    currentItem && currentItem["productQTY"]
  );

  const product_options = props.products.map((item) => {
    return {
      label: item.productName,
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

  // React.useEffect(() => {
  //   if (saleId !== undefined) {
  //     saleId(props.salesId);
  //   }
  // }, []);

  const filterOptions = (candidate) => {
    const isCandidateAlreadyAdded =
      props.data && props.data.some((d) => d.productId === candidate.value);
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
            value={(currentItem && currentItem["productQTY"]) || 0}
            style={{ width: "50px" }}
          />
        </td>
      ) : (
        <p style={{ padding: "0.5rem 0" }}>0</p>
      )}
      <td size="small">
        <input
          size={5}
          type="number"
          min={1}
          // defaultValue={(currentItem && currentItem["quantity"]) || 0}
          // max={productQty}
          placeholder={0}
          value={productQtyReturn}
          style={{ width: "50px" }}
          onChange={(e) => {
            setProductQtyReturn(e.target.value);
          }}
        />
      </td>
      <td size="small">{currentItem["productCost"] || 0}</td>
      <td size="small">{currentItem["productCost"] * productQtyReturn || 0}</td>
      {/* <td size="small">{productDiscount}</td>
      <td size="small">{productTax}</td> */}
      <td>
        <Controls.ActionButton
          size="small"
          variant="contained"
          color="primary"
          onClick={(e) => {
            if (
              productId === "" ||
              productQtyReturn === undefined ||
              productQtyReturn === null ||
              productQtyReturn === ""
            ) {
              return toast.warn("Empty Form");
            } else if (productQtyReturn > currentItem["productQTY"]) {
              return toast.warn("Quantity is Greater than Purchased");
            } else if (curr_product - productQtyReturn < 0) {
              return toast.warn(
                "Product Sum Quantity is Greater than Purchased"
              );
            } else {
              props.addRow({
                productId: currentItem["productId"],
                productQTY: productQtyReturn,
                productCost: currentItem["productCost"],
                QTY: currentItem["productQTY"],
                productTotal: parseFloat(
                  currentItem["productCost"] * productQtyReturn
                ),
                productDiscount: currentItem["productDiscount"],
                productTax: currentItem["productTax"],
                saleId: saleId,
                productSubtotal: parseFloat(
                  currentItem["productCost"] * productQtyReturn
                ),
                unitId: currentItem["inhouseUnitId"],
                productName: currentItem["productName"],
                unitName: currentItem["unitName"],
              });
              setProductId("");
              setCurr_Product(
                parseFloat(
                  parseFloat(curr_product) - parseFloat(productQtyReturn)
                )
              );
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
    </tr>
  );
};

const SalesReturnForm = (props) => {
  const userSessionContext = React.useContext(UserSessionContext);
  const companyContext = React.useContext(CompanyContext);
  const [value, setValue] = useState(0);
  const [data, setData] = useState([]);
  const [description, setDescription] = useState();
  const [metadata, SetmetaData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [saveStatus, setSaveStatus] = useState(0);

  const [discount, setDiscount] = useState(0);
  const [taxPercent, setTaxPercent] = useState(13);
  const [taxRates, setTaxRates] = useState();
  const [tax, setTax] = useState(0);

  let id = props.datas.id;

  let history = useHistory();

  useEffect(() => {
    loadTaxRates();
  }, []);

  React.useEffect(async () => {
    await axios
      .get(`${config.APP_CONFIG}/Sales/SalesSummary/api/${id}`, {
        headers: { Authorization: userSessionContext.token },
      })
      .then((res) => {
        if (res.data.status_code === 200) {
          let temp = res.data.msg;
          console.log(temp)
          SetmetaData(temp.salesData[0]);
          setProductData(temp.salesProduct);
          // setData(temp.productReturnData || []);
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogout();
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

  const salesreturn = () => {
    let returnDate = format(new Date(), "yyyy-MM-dd ");
    if (value.returnDate !== undefined) {
      returnDate = format(new Date(value.returnDate), "yyyy-MM-dd HH:mm:ss");
    }
    let dateOfSales = format(new Date(metadata.dateOfSales), "yyyy-MM-dd");
    const data_with_salesId = data.map((i) => {
      return { ...i, "salesId": props.datas.id };
    });
    console.log(data_with_salesId);
    let req_data = {
      customerId: metadata.customerId,
      customerName: metadata.customerName,
      returnDate: returnDate,
      dateOfSales: dateOfSales,
      subTotal: _subtotal,
      discount: discount,
      // netTotal: _netTotal,
      taxAmount: _taxAmount.toFixed(2),
      grandTotal: _grandtotal.toFixed(2),
      fiscalYear: companyContext.fiscal[0]["fiscalYear"],
      companyId: companyContext.company.id,
      salesId: props.datas.id,
      serviceCharge: 0,
      productReturn: data_with_salesId,
      description: description,
    };

    axios
      .post(`${config.APP_CONFIG}/Sales/SalesReturn/api`, req_data, {
        headers: { Authorization: userSessionContext.token },
      })
      .then((res) => {
        if (res.data.status_code === 200) {
          setSaveStatus(1);
          //toast.success(res.data.msg);
          toast.success("Product Return Successfully");
          history.push("/sales/summary");
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

  useEffect(() => {
    const _taxAmount = taxPercent / parseInt(100);
    setTax(_taxAmount);
  }, [taxPercent]);

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

  // const _total = data.reduce((total, obj) => obj.productTotal + total, 0);
  // const _grandtotal = data.reduce((total, obj) => obj.productTotal + total, 0);
  // const _discount = data.reduce((total, obj) => obj.productDiscount + total, 0);
  // const _tax = data.reduce((total, obj) => obj.productTax + total, 0);
  // const _netTotal = _grandtotal - _discount + _tax;

  const _subtotal = data.reduce((total, obj) => obj.productTotal + total, 0);

  const _taxableAmount = _subtotal - (discount || 0);
  // const _taxableAmount = parseFloat(_subtotal) - parseFloat(discount);
  const _taxPercentDiv = taxPercent / 100 + parseInt(1);
  const _taxAmount = _taxableAmount * (taxPercent / 100) || 0;
  // const _temp_calc = _taxableAmount * parseFloat(_taxPercentDiv)
  const _grandtotal = _taxableAmount * _taxPercentDiv.toFixed(2);

  if (props.datas === undefined) {
    return <Spinner />;
  }
  return (
    <div className="purchaseReturn-form">
      <Grid container content spacing={2}>
        <Grid item xs={6}>
          <div>
            <b>Customer Name:</b>
            {metadata.customerName || ""}
          </div>
        </Grid>

        <Grid item xs={6}>
          <div>
            <b>Sales Date:</b> {metadata.dateOfSales || ""}
          </div>
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
          <th>Total</th>
          {saveStatus !== 1 ? <th>Actions</th> : null}
        </tr>

        {data
          ? data.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.productName}</td>
                  <td>{item.unitName}</td>
                  <td>{item.QTY}</td>
                  <td>{item.productQTY}</td>
                  <td>{item.productCost}</td>
                  <td>{item.productTotal}</td>
                  <td>
                    {saveStatus !== 1 ? (
                      <Controls.ActionButton
                        size="small"
                        variant="contained"
                        color="danger"
                        onClick={(e) => {
                          let _data = data.filter((row) => {
                            return row !== item;
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
            products={productData}
            setData={setData}
            salesid={props.datas.id}
            addRow={(e) => {
              setData([...data, e]);
              //  setProductData([...productData, e])
            }}
          />
        ) : null}
      </table>
      {/* 
      <div className="row">
      <div className="col-4">
    
      </div>
      </div> */}

      <div className="row">
        <div className="col-8">
          <div
            className="card"
            style={{ margin: "50px 0 20px", padding: "10px" }}
          >
            <div className="row">
              <div className="col-sm-12">
                <div>
                  <b>Description: </b>
                </div>
                {/* <textarea style={{ margin: "10px 0 0 0", width: "500px", height: "70px"}}>{description}</textarea> */}
                <textarea
                  type="text"
                  className="form-control"
                  name="description"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div
            className="card"
            style={{ margin: "50px 0 20px", padding: "10px" }}
          >
            {/* <div className="row">
              <div className="col-md-auto">
                <div>
                  <b>Sub Total</b>
                </div>
                <div>
                  <b>Total Discount</b>
                </div>
                <div>
                  <b>Taxable Amt</b>
                </div>
                <div>
                  <b>Total Tax</b>
                </div>
                <div>
                  <b>Grand Total</b>
                </div>
              </div>
              <div className="col">
                <div>: {_total}</div>
                <div>: {_discount}</div>
                <div>: {_netTotal}</div>
                <div>: {_tax}</div>
                <div>: {_grandtotal}</div>
              </div>
            </div> */}
            <div className="row">
              <div className="col-md-auto">
                <div className="col-md-auto pb-1">
                  <b>Subtotal :</b>
                </div>
                <div className="col-md-auto pb-1">
                  <b>Total Discount :</b>
                </div>
                <div className="col-md-auto  pb-1">
                  <b>Taxable Amount :</b>
                </div>
                <div className="col-md-auto pb-1">
                  <b>Tax Rate(%) :</b>
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
                    style={{
                      width: "100%",
                      border: "1px solid #ced4da",
                      borderRadius: "5px",
                      padding: "1px 0.5rem",
                      lineHeight: "1.5",
                    }}
                  />
                </div>
                <div className="col pb-1">{_taxableAmount}</div>
                <div className="col col-lg-12 pb-1">
                  <select
                    className="form-select form-select-sm"
                    name="taxPercent"
                    id="taxPercent"
                    style={{ padding: "0 .5rem" }}
                    //defaultValue={taxPercent.label}
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
                    {/* <option taxChange={taxChange}>
                          {taxChange}
                        </option> */}
                  </select>
                </div>

                <div className="col pb-1">
                  <span>{_taxAmount.toFixed(2)}</span>
                </div>
                <div className="col">
                  <span>{_grandtotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        {saveStatus !== 1 ? (
          <Controls.Button
            type="submit"
            text="Save"
            onClick={(e) => {
              e.preventDefault();
              if (data === undefined || data === null || data.length === 0) {
                toast.warn("Please Enter Product First");
              } else {
                let confirm = window.confirm(
                  "Do You Want To Save Sales Return ?"
                );
                if (confirm) {
                  salesreturn();
                  window.close();
                }
              }
            }}
          />
        ) : (
          <Controls.Button type="submit" text="Saved" disabled />
        )}
      </div>
    </div>
  );
};

export default SalesReturnForm;
