import React, { useEffect, useState } from "react";
import { InputGroup } from "react-bootstrap-v5";
//import "./search.css";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import axios from "axios";

import Spinner from "../../../utils/spinner";
import { toast } from "react-toastify";
// Material UI

import UserSessionContext from "../../../contexts/UserSessionContext";

import config from "../../../utils/config";
import Controls from "../../controls/Controls";
const RecTable = (props) => {
  const {
    singleProduct,
    index,
    edit,
    selectedValue,
    updateProducts,
    setUpdateProducts,
  } = props;
  //const [updateData, setUpdateData] = useState([]);
  const [warehouses, setWareHouseList] = useState(props.warehouses);

  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const userSessionContext = React.useContext(UserSessionContext);
  const onDeleteCartItem = (id) => {
   
          const newProduct = updateProducts.filter((item) => item.product_id !== id);
          setUpdateProducts(newProduct);
      
    
  };

  // const onProductUpdateInCart = (item) => {
  //   setUpdateData(item);
  // };

  const handleIncrement = () => {
    setUpdateProducts((updateProducts) =>
      updateProducts.map((item) =>
        item.product_id === singleProduct.product_id
          ? { ...item, quantity: item.quantity++ + 1 }
          : item
      )
    );
  };

  const handleDecrement = () => {
    if (singleProduct.quantity - 1 > 0.0) {
      setUpdateProducts((updateProducts) =>
        updateProducts.map((item) =>
          item.product_id === singleProduct.product_id
            ? { ...item, quantity: item.quantity > 0.0 && item.quantity-- - 1 }
            : item
        )
      );
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    // check if value includes a decimal point
    if (value.match(/\./g)) {
      const [, decimal] = value.split(".");
      // restrict value to only 2 decimal places
      if (decimal?.length > 2) {
        // do nothing
        return;
      }
    }
   
    setUpdateProducts((updateProducts) =>
      updateProducts.map((item) =>
        item.product_id === singleProduct.product_id
          ? { ...item, quantity: Number(value) }
          : item
      )
    );
  };


  const handleChangecost = (e) => {
    e.preventDefault();
    const { value } = e.target;
    // check if value includes a decimal point
    if (value.match(/\./g)) {
      const [, decimal] = value.split(".");
      // restrict value to only 2 decimal places
      if (decimal?.length > 2) {
        // do nothing
        return;
      }
    }
   
    setUpdateProducts((updateProducts) =>
      updateProducts.map((item) =>
        item.product_id === singleProduct.product_id
          ? { ...item, cost_price:Number(value) }
          : item
      )
    );
  };
  const decimalValidate = (event) => {
    if (!/^\d*\.?\d*$/.test(event.key)) {
      event.preventDefault();
    }
  };
  const handleSelectChange = (selectedOption) => {
    setSelectedWarehouse(selectedOption);

    onMethodChange(selectedOption);
  };

  const onMethodChange = (obj) => {
    
    setUpdateProducts((updateProducts) =>
      updateProducts.map((item) =>
        item.product_id === singleProduct.product_id
          ? { ...item, wareHouseId: obj.value,wareHouseName:obj.label }
          : item
      )
    );
  
  };



  const filteredSelectedValue = updateProducts.filter(
    (pro) => pro.product_id === singleProduct.product_id
  );
  console.log(filteredSelectedValue);
  // Map the filtered results to a new format with label and value properties
  const mappedSelectedValue = filteredSelectedValue.map((name, index) => ({
    label: name.wareHouseName,
    value: name.warehouseId,
  }));
  console.log(mappedSelectedValue);
  return (
    <>
      <tr key={index} className="align-middle">
        <td style={{ verticalAlign: "middle" }} className="ps-3">
          <h4 className="product-name">{singleProduct.ingProductName}</h4>
          <div className="d-flex align-items-center"></div>
        </td>

        <td style={{ verticalAlign: "middle" }}>
          <div className="custom-qty">
            <InputGroup>
              <InputGroup.Text
                className="btn btn-primary btn-sm px-4 pt-2"
                onClick={() => handleDecrement()}
              >
                -
              </InputGroup.Text>
              <Form.Control
                aria-label="Product Quantity"
                onKeyPress={(event) => decimalValidate(event)}
                className="text-center px-0 py-2 rounded hide-arrow"
                value={singleProduct.quantity}
                type="number"
                step={0.01}
                min={0.0}
                onChange={(e) => handleChange(e)}
              />
              <InputGroup.Text
                className="btn btn-primary btn-sm px-4 px-4 pt-2"
                onClick={(e) => handleIncrement(e)}
              >
                +
              </InputGroup.Text>
            </InputGroup>
          </div>
        </td>
        <td style={{ verticalAlign: "middle" }}>
          <span>{singleProduct.unitName}</span>{" "}
        </td>

        <td width="200px">
          {edit ? (
            <Select
              placeholder="Choose"
              options={warehouses}
              value={mappedSelectedValue}
              onChange={handleSelectChange}
              styles={{
                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
              }}
              menuPortalTarget={document.body}
            />
          ) : (
            <Select
              placeholder="Choose one"
              options={warehouses}
              defaultValue={props.selectedValue}
              onChange={onMethodChange}
              styles={{
                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
              }}
              menuPortalTarget={document.body}
            />
          )}
        </td>

        <td style={{ verticalAlign: "middle" }}>
        <div className="custom-qty">
        <Form.Control
                aria-label="unit cost"
                onKeyPress={(event) => decimalValidate(event)}
                className="text-center px-0 py-2 rounded hide-arrow"
                value={singleProduct.cost_price}
                type="number"
                step={0.01}
                min={0.0}
                onChange={(e) => handleChangecost(e)}
              />
          {/* {singleProduct.cost_price} */}
          </div>
          </td>
        <td>
          {(parseFloat(singleProduct.quantity) *
            parseFloat(singleProduct.cost_price)).toFixed(3)}
        </td>
        <td className="text-start">
          <button className="btn px-2 text-danger fs-3">
          {edit ? (
            <FontAwesomeIcon
              icon={faTrash}
              onClick={() => onDeleteCartItem(singleProduct.productId)}
            />
          ):( <FontAwesomeIcon
            icon={faTrash}
            onClick={() => onDeleteCartItem(singleProduct.product_id)}
          />)}
          </button>
        </td>
      </tr>
    </>
  );
};

export default RecTable;
