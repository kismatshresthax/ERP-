// import React from 'react';
// import {
//     Typography,
//     TextField,
//     Button,
//     Stepper,
//     Step,
//     StepLabel,
//     Grid,
//     Select,
//     MenuItem,
//     Accordion,
//     AccordionSummary,
//     AccordionDetails,
//     ListItemText,
//     IconButton,
//     Container
    
//   } from "@material-ui/core";

//   const useStyles = makeStyles((theme) => ({
//     button: {
//       marginRight: theme.spacing(2),
//       marginTop:theme.spacing(2),
      
//     },
//     stepper:{
//       paddingTop:'0%',
      
//     }
//   }));

//   function getSteps() {
//     return [
//       "Order",
//       "Product",
//       "Confirm",
//       "Payment", 
//     ];
//   }

//   export default function Stepper(props) {
 
//     const handleNext = (data) => {
//         console.log(data);
//         if (activeStep == steps.length - 1) {
//           // fetch("https://jsonplaceholder.typicode.com/comments")
//           //   .then((data) => data.json())
//           //   .then((res) => {
//           //     console.log(res);
//               setActiveStep(activeStep + 1);
//             // });
    
//           // let request_payload = {
//           //   "vendorId": ,
//           //   "vendorReference": "",
//           //   "orderDeadline": "2021-10-26T20:48:41.713Z",
//           //   "recepitDate": "2021-10-26T20:48:41.713Z",
//           //   "description": "",
//           // }
    
//         } else {
//           setActiveStep(activeStep + 1);
//           setSkippedSteps(
//             skippedSteps.filter((skipItem) => skipItem !== activeStep)
//           );
//         }
//         // if(activeStep == )
//       };
 
  
//       return(
//           <div>
//         <Stepper activeStep={activeStep} className={classes.stepper}>
//         {steps.map((step, index) => {
//           const labelProps = {labelProps};
//           const stepProps = {stepProps};
//           // if (isStepSkipped(index)) {
//           //   stepProps.completed = false;
//           // }
//           return (
//             <Step {...stepProps} key={index} >
//               <StepLabel {...labelProps}>{step}</StepLabel>
//             </Step>
//           );
//         })}
//       </Stepper>

//       {/* {activeStep === steps.length ?(
//         <Typography>
//             Thank You
//         </Typography>

//       ):()} */}
//       </div>

//       )
     
//   }



