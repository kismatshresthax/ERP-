import React, { useState } from "react";
import EditUserForm from "./EditUserForm";
//import EditAssignUserRoles from "./EditAssignUserRoles";

const EditUserStepper = (props) => {
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
      <EditUserForm
        step_handler={(e) => step_handler(e)}
        handleSubmit={props.handleSubmit}
        data = {props.data}
        loadRoles = {props.loadRoles}
        role={props.role}
      />
    ),
   
  };
  return <div>{step_mapper[step]}</div>;
};
export default EditUserStepper;
