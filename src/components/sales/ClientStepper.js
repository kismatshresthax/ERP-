// import LinearStepper from "./LinearStepper";
// import { CssBaseline, Container, Paper, Box } from "@material-ui/core";

// function ClientStepper() {
//   return (
//     <>
//       <CssBaseline />
//       <Container component={Box} p={4}
//       // className="w-75 mx-auto shadow p-5"
//        className="content-wrapper iframe-mode w-75"
//        data-widget="iframe" data-loading-screen={750} >
//         <Paper component={Box} p={3} >
//           <LinearStepper />
//         </Paper>
//       </Container>
//     </>
//   );
// }

// export default ClientStepper;

import React, { useState } from "react";

import MaterialClientForm from "./MaterialClientForm";
import AssignClientRoles from "./AssignClientRoles";

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
      <MaterialClientForm
        step_handler={(e) => step_handler(e)}
        handleSubmit={props.handleSubmit}
      />
    ),
    1: (
      <AssignClientRoles
        step_handler={(e) => step_handler(e)}
        handleRoleSubmit={props.handleRoleSubmit}
        role={props.role}
        insertId={props.insertId}
      />
    ),
  };
  return <div>{step_mapper[step]}</div>;
};
export default UserStepper;
