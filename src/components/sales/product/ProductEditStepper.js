import React, { useState } from "react";
import EditProductUnit from "./EditProductUnit";
import EditPurchaseProduct from "./EditSalesProduct";


const ProductEditStepper = (props) => {
  const [step, setStep] = useState(0);
  const step_handler = (_step) => {
    if (_step.toLowerCase() === "next") {
      setStep(step + 1);
    } else if (_step.toLowerCase() === "back") {
      setStep(step - 1);
    }
  };
 
  const step_mapper = {
    0: (
      <EditPurchaseProduct
        data={props.data}
        step_handler={(e) => step_handler(e)}
        handleSubmit={props.handleSubmit}
      />
    ),
    1: (
      <EditProductUnit
        data={props.data}
        step_handler={(e) => step_handler(e)}
        handleUnitSubmit={props.handleUnitSubmit}
      />
    ),
  };
  return <div>{step_mapper[step]}</div>;
};
export default ProductEditStepper;
