import React, { useState, useEffect, Fragment } from "react";
import { nanoid } from "nanoid";
import data from "./mock-data.json";
//import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";

import Controls from "../../controls/Controls";
import Select from "react-select";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PrintIcon from "@mui/icons-material/Print";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import EditIcon from "@mui/icons-material/Edit";
import PanToolIcon from "@mui/icons-material/PanTool";
import { Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";
import axios from "axios";
import config from "../../../utils/config";
import UserSessionContext from "../../../contexts/UserSessionContext";
import CompanyContext from "../../../contexts/CompanyContext";

const billTo = [
  { id: "cash", title: "Cash" },
  { id: "customer", title: "Customer" },
];

const useStyles = makeStyles((theme) => ({
  saveButton: {
    zIndex: 4,
    margin: 0,
  },
}));

const AddForm = (props) => {
  const [product, setProduct] = useState(props.productList);
  console.log(product)


  const handleEditClick = (event, contact) => {
    // event.preventDefault();
    // setEditContactId(contact.id);

    // const formValues = {
    //   fullName: contact.fullName,
    //   address: contact.address,
    //   phoneNumber: contact.phoneNumber,
    //   email: contact.email,
    // };

    // setEditFormData(formValues);
  };

 

  const handleDeleteClick = (contactId) => {
    // const newContacts = [...contacts];

    // const index = contacts.findIndex((contact) => contact.id === contactId);

    // newContacts.splice(index, 1);

    // setContacts(newContacts);
  };
  return (
    <div>
   
    {product&&product.map((row, idx) => {
    
        return (
          <tr key={row.idx}>
            <td>{idx + 1}</td>
            <td>{row.productName}</td>
            <td>{row.productQTY}</td>
            <td>{row.unitName}</td>
            <td>{row.productCost}</td>
            <td>{row.productTotal}</td>
            <td>{row.productDiscount}</td>
            <td>{row.productTax}</td>

            <td>{row.productSubtotal}</td>
        
            
     
      <td>
        <Controls.ActionButton type="button" size="small" variant="contained" color="warning" onClick={(event) => handleEditClick(event, product)}>
          <Tooltip title="Edit" placement="top" arrow>
            <EditIcon style={{ fontSize: "17px" }} />
          </Tooltip>
        </Controls.ActionButton>
        <Controls.ActionButton type="button" size="small" variant="contained" color="danger"  onClick={() => handleDeleteClick(product.productId)}>
          <Tooltip title="Delete" placement="top" arrow>
            <RemoveCircleIcon style={{ fontSize: "20px" }} />
          </Tooltip>
        </Controls.ActionButton>
      </td>
      
    </tr>
       );
        })
        
        }
    </div>
  );
};




const RetailSales = () => {
  const classes = useStyles();
  const userSessionContext = React.useContext(UserSessionContext);
  const [value, setValue] = useState({});
  const [customer, setCustomer] = useState("");
  const [customerNames, setCustomerNames] = useState();
  const [customerdetails, setCustomerdetails] = useState();
  const [units, setUnits] = useState([]);
  const [pay, setPay] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentModes, setPaymentModes] = useState();

  const [phoneNo, setPhoneNo] = useState();
  const [panNo, setPanNo] = useState();

  const companyContext = React.useContext(CompanyContext);
  const [productId, setProductId] = useState("");
  const [productQty, setProductQty] = useState("1");
  const [productCost, setProductCost] = useState("0");
  const [productTotal, setProductTotal] = useState("");
  const [productSubtotal, setProductSubtotal] = useState("");
  const [productTax, setProductTax] = useState("");
  const [productDiscount, setProductDiscount] = useState(0);
  const [discount, setDiscount] = useState("0");
  const [unit, setUnit] = useState();
  const [allProducts, setAllProducts] = useState();
  const [product, setProduct] = useState();
  const [currentItem, setCurrentItem] = useState({});
  const [stockQty, setStockQty] = useState();

  const [tax, setTax] = useState(0);
  const [taxRates, setTaxRates] = useState();
  const [taxPercent, setTaxPercent] = useState(13);
  const [productpercent, setProductpercent] = useState({ label: 0, value: 0 },);


  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (productId.value !== undefined) {
      loadUnitById(productId.value);
      const productPrice = product.filter((x) => {
        return x.id === productId.value;
      });
   
      setProductCost(productPrice[0]["sellPrice"]);
    }
  }, [productId]);



  // useEffect(() => {
  //   // let _discount = productDiscount || 0;
  //   const _discountAmount = (productDiscount / 100) * productTotal;
  //   setDiscount(_discountAmount);
  // }, [productQty, productDiscount]);
  
  useEffect(() => {
    if (productQty !== undefined && productCost !== undefined) {
      // let _discount = productDiscount || 0;
      // let productpercent=  0;
      let temp = parseFloat(productQty) * parseFloat(productCost)
      setProductTotal(temp.toString());


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

      setProductSubtotal(_grandsubtotal.toFixed(2));
    }
  }, [productQty, productCost, productTotal, productDiscount, productpercent]);


  useEffect(() => {
    loadCustomerNames();
    // loadUnitById();
    loadProducts();
    loadProductDetails();
    loadPaymentMode();
    loadTaxRates();
  }, []);


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
          // console.log(res.data.msg);
          let temp = res.data.msg.map((name, index) => ({
            label: name.unitName,
            value: name.unitId,
           // title: x.unitName,
           // id: x.unitId,
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
  const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    email: "",
  });

  const [editFormData, setEditFormData] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    email: "",
  });

  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      fullName: addFormData.fullName,
      address: addFormData.address,
      phoneNumber: addFormData.phoneNumber,
      email: addFormData.email,
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      fullName: editFormData.fullName,
      address: editFormData.address,
      phoneNumber: editFormData.phoneNumber,
      email: editFormData.email,
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  };



  const loadCustomerNames = async () => {
    await axios
      .get(`${config.APP_CONFIG}/usersApi/Users/customer`, {
        headers: { Authorization: userSessionContext.token },
      })
      .then((res) => {
        if (res.data && res.data.status_code && res.data.status_code === 200) {
          console.log(res.data.msg);
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

  const loadProducts = async () => {
    await axios
      .get(`${config.APP_CONFIG}/Sales/GetSalesProduct/api`, {
        headers: { Authorization: userSessionContext.token },
      })
      .then((res) => {
        if (res.data && res.data.status_code && res.data.status_code === 200) {
          // console.log(res.data.msg);
          let temp = res.data.msg.map((name) => ({
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

  const loadProductDetails = async () => {
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

  const loadTaxRates = async () => {
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



  const  addRow=(e) => {
    

    setProducts([...products, e]);

  }
  console.log(products);
  return (
    <div className="retailSales">
      <div className="customerDetails">
        <fieldset className="customer-details">
          <legend>Customer Details</legend>
          <div className="row">
            <div className="col-sm-2">
              <fieldset className="bill-to">
                <legend>Bill To</legend>

                <Controls.RadioGroup
                  name="billTo"
                  // value={values.billTo}
                  //   onChange={handleInputChange}
                  items={billTo}
                />
              </fieldset>
            </div>
            <div className="col-sm-2">
              <p style={{ marginBottom: "0", fontWeight: "400" }}>
                Customer Name
              </p>
              <Select
              type="text"
              placeholder={"Search custo...."}
                //  defaultValue={customerNames[1]}
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

                  let temp = customerdetails.filter((x) => {
                    return x.id === parseInt(e.value);
                  });
                  const temp_data = temp[0] || {};
                  setCustomer(temp_data);
                  setPhoneNo(temp_data["contactNumber1"]);
                  setPanNo(temp_data["panNo"]);
                  setValue({
                    ...value,
                    ..._temp,
                  });
                }}
                required={true}
              />
            </div>
            <div
              className="col-sm-2"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Controls.Input
                name="contactNumber"
                type="number"
                label="Contact Number "
                value={phoneNo || ""}
                onKeyDown={(e) =>
                  (e.keyCode === 69 ||
                    e.keyCode === 190 ||
                    e.keyCode === 187) &&
                  e.preventDefault()
                }
                //   onChange={handleInputChange}
                //   error={errors.contactNumber}
                // required={true}
              />
            </div>
            <div
              className="col-sm-2"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Controls.Input
                label="Pan No."
                type="number"
                name="panNo"
                value={panNo || ""}
                onKeyDown={(e) =>
                  (e.keyCode === 69 ||
                    e.keyCode === 190 ||
                    e.keyCode === 187) &&
                  e.preventDefault()
                }
                //  onChange={handleInputChange}
                //   error={errors.panNo}
              />
            </div>
            <div
              className="col-sm-2"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Controls.Input
                label="Invoice No."
                type="number"
                name="invoiceNo"
                //    value={values.panNo}
                onKeyDown={(e) =>
                  (e.keyCode === 69 ||
                    e.keyCode === 190 ||
                    e.keyCode === 187) &&
                  e.preventDefault()
                }
                //  onChange={handleInputChange}
                //   error={errors.panNo}
              />
            </div>
            <div
              className="col-sm-2"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Controls.DatePicker
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
            </div>
          </div>
        </fieldset>
      </div>
      <div className="productDetails">
        <fieldset className="product-details">
          <legend>Product Details</legend>
          <form onSubmit={handleAddFormSubmit}>
            <div className="row" style={{ marginBottom: "15px" }}>
              <div className="col-sm-3">
                <Controls.Input
                  label="Bar Code"
                  type="number"
                  name="barCode"
                  //    value={values.panNo}
                  onKeyDown={(e) =>
                    (e.keyCode === 69 ||
                      e.keyCode === 190 ||
                      e.keyCode === 187) &&
                    e.preventDefault()
                  }
                  //  onChange={handleInputChange}
                  //   error={errors.panNo}
                />
              </div>
              <div className="col-sm-3">
                <Controls.Input
                  label="Stock Quantity"
                  type="number"
                  name="stockQty"
                  //    value={values.panNo}
                  onKeyDown={(e) =>
                    (e.keyCode === 69 ||
                      e.keyCode === 190 ||
                      e.keyCode === 187) &&
                    e.preventDefault()
                  }
                  //  onChange={handleInputChange}
                  //   error={errors.panNo}
                />
              </div>
            </div>
            <div className="row" style={{ marginBottom: "15px" }}>
              <div className="col-sm-2">
                <Controls.Input
                  label="Product Code"
                  type="number"
                  name="productCode"
                  //    value={values.panNo}
                  onKeyDown={(e) =>
                    (e.keyCode === 69 ||
                      e.keyCode === 190 ||
                      e.keyCode === 187) &&
                    e.preventDefault()
                  }
                  onChange={handleAddFormChange}
                  //   error={errors.panNo}
                />
              </div>
              <div className="col-sm-2">
                <Select
                  type="text"
                  placeholder={"Add Product"}
                  options={allProducts}
                  value={productId}
                  onChange={(e) => {
                    setProductId(e);
                    loadUnitById(e.value);
                  }}
                  styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  }}
                  menuPortalTarget={document.body}
                />
              </div>
              <div className="col-sm-1">
                <Controls.Input
                  label="Qty"
                  type="number"
                  name="qty"
                  value={productQty}
                  onChange={(e) => {
                    setProductQty(e.target.value);
                  }}
                  //  onChange={handleAddFormChange}
                  //   error={errors.panNo}
                />
              </div>
              <div className="col-sm-1">
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
        ) :(
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
        )}
      </td>
              </div>
              <div className="col-sm-1">
                <Controls.Input
                  disabled
                  label="Rate"
                  type="number"
                  name="productCost"
                  value={productCost || 0}
                  onKeyDown={(e) =>
                    (e.keyCode === 69 ||
                      e.keyCode === 190 ||
                      e.keyCode === 187) &&
                    e.preventDefault()
                  }
                 
                />
              </div>
              <div className="col-sm-1">
                <Controls.Input
                  disabled
                  label="Total"
                  type="number"
                  name="productTotal"
                  value={productTotal || 0}
                />
              </div>
              <div className="col-sm-1">
                <Controls.Input
                  label="Dis.(%)"
                  type="number"
                  name="productDiscount"
                  value={productDiscount || 0}
                  // onKeyDown={(e) =>
                  //   (e.keyCode === 69 ||
                  //     e.keyCode === 190 ||
                  //     e.keyCode === 187) &&
                  //   e.preventDefault()
                  // }
                  onChange={(e) => {
                    setProductDiscount(e.target.value);
                  }}
                  //  onChange={handleAddFormChange}
                  //   error={errors.panNo}
                />
              </div>
              <div className="col-sm-1">
                <Controls.Select
                  label="Tax"
                  name="taxPercent"
                  value={taxPercent.label}
                  // onChange={handleInputChange}
                  options={taxRates}
                  onClick={(e) => {
                    setTaxPercent(e.target.value);
                  }}
                />
              </div>
              <div className="col-sm-1">
                <Controls.Input
                  disabled
                  label="Subtotal"
                  type="number"
                  name="productSubtotal"
                  value={productSubtotal || 0}
                  
                />
              </div>
              <div className="col-sm-1">
                <Controls.ActionButton
                  size="small"
                  variant="contained"
                  type="submit"
                  onClick={(e) => {
                    if (productId === "" || productQty === "" || productCost === "" || unit === "" || unit === undefined||productQty === undefined) {
                      return toast.warn("Please Fill the Form");
                    }
               
    
                    
                    else if( parseFloat(productDiscount)>parseFloat(productTotal)){
                      toast.warn("Product Discount is greater than product total");
                    }
                    else
                     {
                      addRow({

                     
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
                      setProductTax("");
                      setProductDiscount(0);
                      setUnits("");
                      setUnit("");
                      setProductTotal("");
                      setCurrentItem("");
                     }
                     
                    }}

                >
                  <Tooltip title="Add Product" placement="top" arrow>
                    <AddCircleIcon
                      color="primary"
                      style={{ fontSize: "25px" }}
                    />
                  </Tooltip>
                </Controls.ActionButton>
              </div>
            </div>
          </form>
          <div className="row">
            <div className="col-sm-12">
              <form onSubmit={handleEditFormSubmit}>
                <table className="table table-fluid">
                  <tr>
                    <th>S.No.</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Unit</th>
                    <th>Rate</th>
                    <th>Total</th>
                    <th>Discount</th>
                    <th>Tax</th>
                    <th>Subtotal</th>
                    <th>Action</th>
                  </tr>
                  {/* {contacts.map((contact) => ( */}
                  {products
                    ? products.map((p) => {
                   console.log(p);
                        return (
                          <Fragment>
                            {editContactId === products.productId ? (
                              <EditableRow
                                editFormData={editFormData}
                                handleEditFormChange={handleEditFormChange}
                                //handleCancelClick={handleCancelClick}
                              />
                            ) : (
                              < AddForm
                                product={p}
                               // handleEditClick={handleEditClick}
                               // handleDeleteClick={handleDeleteClick}
                              />
                            )}
                          </Fragment>
                        );
                      })
                    : []}
                  {/* ))}                   */}
                </table>
              </form>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="paymentDetails">
        <fieldset className="payment-details">
          <legend>Payment Details</legend>
          <div className="row">
            <div className="col-sm-4">
              <p style={{ marginBottom: "5px" }}>
                Total Quantity: <span style={{ fontWeight: "600" }}>{5}</span>
              </p>
              <div className="discount-section">
                <div>
                  <Controls.Input
                    label="Discount %"
                    type="number"
                    name="discount"
                    //    value={values.panNo}
                    onKeyDown={(e) =>
                      (e.keyCode === 69 ||
                        e.keyCode === 190 ||
                        e.keyCode === 187) &&
                      e.preventDefault()
                    }
                    //  onChange={handleInputChange}
                    //   error={errors.panNo}
                  />
                </div>
                <div>
                  <Controls.Input
                    label="Discount Amt."
                    type="number"
                    name="discount"
                    //    value={values.panNo}
                    onKeyDown={(e) =>
                      (e.keyCode === 69 ||
                        e.keyCode === 190 ||
                        e.keyCode === 187) &&
                      e.preventDefault()
                    }
                    
                  />
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <p style={{ marginBottom: "5px", fontWeight: "600" }}>Payment</p>
              <div className="payment-section">
                <div>
                  <Select
                    type="text"
                    placeholder={"Payment Mode"}
                    options={paymentModes}
                    styles={{
                      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    }}
                    menuPortalTarget={document.body}
                    value={pay}
                    onChange={(e) => {
                      setPay(e);
                    }}
                    required={true}
                    //  error={errors.companyId}
                  />
                </div>
                <div>
                  <Controls.Input
                    label="Amount"
                    type="number"
                    name="amount"
                    min={0}
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                    }}
                    //   error={errors.panNo}
                  />
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="row">
                <div className="col-md-auto">
                  <div>
                    <b>Sub Total</b>
                  </div>
                  <div>
                    <b>Discount </b>
                  </div>
                  <div>
                    <b>Taxable Amount</b>
                  </div>
                  <div>
                    <b>Total Tax</b>
                  </div>
                  <div style={{ textTransform: "uppercase" }}>
                    <b>Grand Total</b>
                  </div>
                </div>
                <div className="col">
                  <div>: {3232}</div>
                  <div>: {3223}</div>
                  <div>: {3223}</div>
                  <div>: {32}</div>
                  <div style={{ fontWeight: "700" }}>: {32332}</div>
                </div>
              </div>
              <div
                className="row"
                style={{
                  marginTop: "10px",
                  paddingTop: "10px",
                  borderTop: "2px dashed #bbb",
                }}
              >
                <div className="col-md-auto">
                  <div>
                    <b>Return Amount</b>
                  </div>
                </div>
                <div className="col">
                  <div>: {20}</div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ position: "absolute", left: "15px", bottom: "6px" }}>
            <Controls.Button
              color="primary"
              variant="contained"
              text="Save & Print"
              className={classes.saveButton}
              startIcon={<PrintIcon />}
            ></Controls.Button>
            &nbsp;
            <Controls.Button
              color="secondary"
              variant="contained"
              text="Hold"
              className={classes.saveButton}
              startIcon={<PanToolIcon />}
            ></Controls.Button>
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default RetailSales;
