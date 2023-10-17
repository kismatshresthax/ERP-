import React, { useState } from "react";
import UserForm from "./UserForm";
import AssignUserRoles from "./AssignUserRoles";

const UserStepper = (props) => {
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
      <UserForm
        step_handler={(e) => step_handler(e)}
        handleSubmit={props.handleSubmit}
        insertId={props.insertId}
      />
    ),
    
    1: (
      <AssignUserRoles
        step_handler={(e) => step_handler(e)}
        role={props.role}
        insertId={props.insertId}
        handlePasswordSubmit={props.handlePasswordSubmit}
        // setIsNewPopup={props.setIsNewPopup}
      />
    ),
  };
  return <div>{step_mapper[step]}</div>;
};
export default UserStepper;
