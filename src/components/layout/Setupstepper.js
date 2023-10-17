import React,{useState} from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CompanySetup from "./CompanySetup";
import ResetPassword from "./ResetPassword";
import FiscalYear from "./FiscalYear";
import { toast } from "react-toastify";
import UserSessionContext from "../../contexts/UserSessionContext";
import config from "../../utils/config";
import axios from "axios";

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     // root: {
//     //   width: "100%",
//     // },
//     button: {
//       marginTop: theme.spacing(1),
//       marginRight: theme.spacing(1),
//     },
//     actionsContainer: {
//       marginBottom: theme.spacing(2),
//     },
//     resetContainer: {
//       padding: theme.spacing(3),
//     },
//   })
// );

// function getSteps() {
//   return [
//     <b style={{ color: "purple" }}>Company Setup</b>,
//     <b style={{ color: "purple" }}>Fiscal Year Setup</b>, 
//     <b style={{ color: "purple" }}>Set Password</b>,
//   ];
// }

// function getStepContent(step: number, token) {
 
//   switch (step) {
//     case 0:
//       return <CompanySetup  />;
//     case 1:
//       return <FiscalYear />;
//     case 2:
//       return <ResetPassword />;
//     default:
//       return "Unknown step";
//   }
// }

// export default function Setupstepper(token) {
//   const classes = useStyles();
//   const [activeStep, setActiveStep] = React.useState(0);
//   const steps = getSteps();
//   const userSessionContext = React.useContext(UserSessionContext);

//   const handleNext = (data) => {
//     //const addCompany = (data) => {
//     window.alert("hello");
//       axios
//         .post(`${config.APP_CONFIG}/Companies/Company`, data
//         , {
//           headers: {
//             Authorization: userSessionContext.token,
//           },
//         }
  
//         )
//         .then((res) => {
//           if (res.data.status_code === 200) {
//             //loadCompanies();
//             toast.success(res.data.msg);
//             //setIsNewPopup(false)
//           } else if (res.data.status_code === 401) {
//             userSessionContext.handleLogout();
//           } else if (res.data.status_code === 400) {
//             toast.warn(res.data.msg);
//           }
//         })
//         .catch((err) => {
//           toast.error("Something went Wrong");
//         });
    
//     //handleSubmit={addCompany}
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   };

//   const addCompany = (data) => {

//     axios
//       .post(`${config.APP_CONFIG}/Companies/Company`, data
//       , {
//         headers: {
//           Authorization: userSessionContext.token,
//         },
//       }

//       )
//       .then((res) => {
//         if (res.data.status_code === 200) {
//           //loadCompanies();
//           toast.success(res.data.msg);
//           //setIsNewPopup(false)
//         } else if (res.data.status_code === 401) {
//           userSessionContext.handleLogout();
//         } else if (res.data.status_code === 400) {
//           toast.warn(res.data.msg);
//         }
//       })
//       .catch((err) => {
//         toast.error("Something went Wrong");
//       });
//   };

//   // const handleBack = () => {
//   //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   // };

//   // const handleReset = () => {
//   //   setActiveStep(0);
//   // };

//   return (
//     <div className="setupStepper">
//       <h3 style={{textAlign: "center", color: "purple"}}>Please fill the given form before proceeding forward</h3>
//       <Stepper activeStep={activeStep} orientation="horizontal">
//         {steps.map((label, index) => (
//           <Step key={label}>
//             <StepLabel>{label}</StepLabel>
//             <StepContent
//               style={{
//                 position: "absolute",
//                 width: "40vw",
//                 left: "30%",
//                 margin: "24px 0 0 0",
//                 background: "#fff",
//                 border: "0",
//                 padding: "0 15px",
//               }}
//             >
//               <Typography>{getStepContent(index, token)}</Typography>
//               <div className={classes.actionsContainer}>
//                 <div style={{textAlign: "right", marginRight: "8px"}}>
//                   {/* <Button
//                     disabled={activeStep === 0}
//                     onClick={handleBack}
//                     className={classes.button}
//                   >
//                     Back
//                   </Button> */}
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     type="submit"
//                     onClick={handleNext}
//                     className={classes.button}
//                   >
//                     {activeStep === steps.length - 1 ? "Finish" : "Next"}
//                   </Button>
//                 </div>
//               </div>
//             </StepContent>
//           </Step>
//         ))}
//       </Stepper>
//       {/* {activeStep === steps.length && (
//         <Paper square elevation={0} className={classes.resetContainer}>
//           <Typography>Form is submitted</Typography>
//           <Button onClick={handleReset} className={classes.button}>
//             Reset
//           </Button>
//         </Paper>
//       )} */}
//     </div>
//   );
// }



// import React, { useState } from "react";
// import CreateProducts from "./CreateProduct";
// import ProductUnit from "./ProductUnit";

const Setupstepper = (props) => {
  const token=localStorage.getItem("ERP_TOKEN")
 // console.log(token);
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
      <CompanySetup
        step_handler={(e) => step_handler(e)}
        handleSubmit={props.handleSubmit}
        step={props.step}
        token={token}
       // insertId={props.insertId}
        //setInsertId={props.setInsertId}
        //load_table={(e)=> {props.load_table(e)}}
      />
    ),
    1: (
      <FiscalYear
        step_handler={(e) => step_handler(e)}
        handleUnitSubmit={props.handleUnitSubmit}
        step={props.step}
        token={token}
       // unit={props.unit}
        //insertId={props.insertId}
      />
    ),
    2: (
      <ResetPassword
        step_handler={(e) => step_handler(e)}
        handleUnitSubmit2={props.handleUnitSubmit2}
        token={token}
       // unit={props.unit}
        //insertId={props.insertId}
      />
    ),
  };
  return <div>{step_mapper[step]}</div>;
};
export default Setupstepper;
