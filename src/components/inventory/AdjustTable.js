import React, { useEffect, useState } from "react";
import { InputGroup } from "react-bootstrap-v5";

import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import axios from "axios";

import Spinner from "../../utils/spinner";
import { toast } from "react-toastify";
// Material UI

import UserSessionContext from "../../contexts/UserSessionContext";

//import config from "../../../utils/config";
//import Controls from "../../controls/Controls";
const AdjustTable = (props) => {
  const {
    singleProduct,
    index,
 
    selectedValue,
    updateProducts,
    setUpdateProducts,
  } = props;
  const [updateData, setUpdateData] = useState([]);
  const [warehouses, setWareHouseList] = useState(props.warehouses);

  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const userSessionContext = React.useContext(UserSessionContext);
  const onDeleteCartItem = (id) => {
   
          const newProduct = updateProducts.filter((item) => item.product_id !== id);
          setUpdateProducts(newProduct);
      
    
  };

  const onProductUpdateInCart = (item) => {
    setUpdateData(item);
  };

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
    console.log(obj);
    setUpdateProducts((updateProducts) =>
      updateProducts.map((item) =>
        item.product_id === singleProduct.product_id
          ? { ...item, adjustmenttype: obj.value}
          : item
      )
    );
    // setUpdateProducts(updateProducts =>
    //     updateProducts.map((item)=>{
    //        if (item.id === singleProduct.id){
    //            const compareQty = posAllProducts.filter((pro)=>pro.id === singleProduct.id).map((pro)=> pro.attributes.stock.quantity)
    //            return {...item, quantity: item.adjustMethod === 2 ? compareQty[0] > item.quantity ? item.quantity++ + 0 : compareQty[0] : item.quantity++}
    //        }else{
    //            return item
    //        }
    //     }))
  };

  console.log(updateProducts);

//   const filteredSelectedValue = updateProducts.filter(
//     (pro) => pro.product_id === singleProduct.product_id
//   );

//   // Map the filtered results to a new format with label and value properties
//   const mappedSelectedValue = filteredSelectedValue.map((name, index) => ({
//     label: name.wareHouseName,
//     value: name.warehouseId,
//   }));
//   console.log(mappedSelectedValue);
  return (
    <>
      <tr key={index} className="align-middle">
        <td style={{ verticalAlign: "middle" }} className="ps-3">
          <h4 className="product-name">{singleProduct.product_name}</h4>
          <div className="d-flex align-items-center"></div>
        </td>
<td>{"1"}</td>
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
                className="text-center px-0 py-2 rounded-0 hide-arrow"
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
         
            <Select
              placeholder="Choose one"
              options={props.Type}
              defaultValue={props.selectedValue}
              onChange={onMethodChange}
              styles={{
                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
              }}
              menuPortalTarget={document.body}
            />
        
        </td>

    
        
        <td className="text-start">
          <button className="btn px-2 text-danger fs-3">
     <FontAwesomeIcon
            icon={faTrash}
            onClick={() => onDeleteCartItem(singleProduct.product_id)}
          />
          </button>
        </td>
      </tr>
    </>
  );
};

export default AdjustTable ;
