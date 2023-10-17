import React, { useState } from "react";
import CreateProducts from "./CreateSalesProduct";
import ProductUnit from "./ProductUnit";

const ProductStepper = (props) => {
  const [step, setStep] = useState(0);
  const step_handler = (_step) => {
    if (_step.toLowerCase() === "next") {
      setStep(step + 1);
    } else if (_step.toLowerCase() === "back") {
      setStep(step - 1);
    }
  };
  console.log(props.insertId);
  const step_mapper = {
    0: (
      <CreateProducts
        step_handler={(e) => step_handler(e)}
        handleSubmit={props.handleSubmit}
        step={props.step}
        insertId={props.insertId || 1}

      />
    ),
    1: (
      <ProductUnit
        step_handler={(e) => step_handler(e)}
        handleUnitSubmit={props.handleUnitSubmit}
        unit={props.unit}
        insertId={props.insertId}
      />
    ),
  };
  return <div>{step_mapper[step]}</div>;
};
export default ProductStepper;
