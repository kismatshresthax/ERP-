import React from "react";

import "./styles.css";

const FormFour = () => {
  // const myContext = useContext(AppContext);
  // const updateContext = myContext.purchaseDetails;

  //const next = () => {
    //     if (updateContext.userOTP == null || updateContext.userOTP.length !== 4) {
    //         console.log('Please enter the OTP correctly')
    //     } else (updateContext.setStep(updateContext.currentPage + 1))
  //};

  //const back = () => {
    //     const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    //     if (updateContext.userName == null) {
    //         console.log('Please enter your Name')
    //     } else if (updateContext.userMail == null || regex.test(updateContext.userMail) !== true) {
    //         console.log('Please enter your email correctly')
    //     } else if (updateContext.userPhone == null || updateContext.userPhone.length !== 10 ) {
    //         console.log('Please enter your phone number correctly')
    //     } else (updateContext.setStep(updateContext.currentPage - 1))
    // updateContext.setStep(updateContext.currentPage - 1)
 // };

  return (
    <div className="container">
      Payment Mode
      {/* <p>Enter the OTP recieved on your Phone no. <b>{updateContext.userPhone}</b></p> */}
      {/* <img className="otpimg" src="https://ecall-messaging.com/wp-content/uploads/2020/11/eCall_Illustration_mTAN.svg" alt="otp-img" /> */}
      {/* <div className="formContain">
                <form className="form">
                    <button className="formSubmit" value="Next" type="submit" onClick={next}>Next </button>
                    <button type="button" className="formSubmit" onClick={back} >Back</button>
                </form>
            </div> */}
    </div>
  );
};

export default FormFour;
