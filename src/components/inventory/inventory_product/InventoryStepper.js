// import React, { useState } from "react";
// import StoreProductsForm from "./StoreProductsForm";
// import ProductUnit from "../../purchases/product/ProductUnit";

// const InventoryStepper = (props) => {
//   const [step, setStep] = useState(0);
//   const step_handler = (_step) => {
//     if (_step.toLowerCase() === "next") {
//       setStep(step + 1);
//     } else if (_step.toLowerCase() === "back") {
//       setStep(step - 1);
//     }
//   };
//   const step_mapper = {
//     0: (
//       <StoreProductsForm
//         step_handler={(e) => step_handler(e)}
//         handleSubmit={props.handleSubmit}
//         step={props.step}
//         insertId={props.insertId}
//         setInsertId={props.setInsertId}
//         load_inventory_products={(e) => {props.load_inventory_products(e)}}
//       />
//     ),
//     1: (
//       <ProductUnit
//         step_handler={(e) => step_handler(e)}
//         handleUnitSubmit={props.handleUnitSubmit}
//         unit={props.unit}
//         insertId={props.insertId}
//       />
//     ),
//   };
//   return <div>{step_mapper[step]}</div>;
// };
// export default InventoryStepper;
