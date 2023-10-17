/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./Login.css";
import config from "../../utils/config";
import Spinner from "../../utils/spinner";
import { toast } from "react-toastify";
import { Link, useHistory } from "react-router-dom";
import logo from "./img/smtech-logo-light.png";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import MailIcon from "@mui/icons-material/Mail";

export default function Login(props) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [iscalling, setiscalling] = useState(false);
  // const [error, setError] = useState("");
  const [loginErrorStatus, setLoginErrorStatus] = useState(0);
  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      toast.warn("Please Fill The Fields");
    } else if (username === undefined || password === undefined) {
      toast.warn("Please Fill The Fields");
    } else {
      setiscalling(true);
      // const user = { username };
      fetch(`${config.APP_CONFIG}/Login/api`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 5000,
        body: JSON.stringify({
          username,
          password,
        }),
      })
        .then((data) => data.json())
        .then((data) => {
        
          if (data.status_code === 200) {
            window.localStorage.setItem("user", username);
            props.setToken(data.msg);
            window.localStorage.setItem("user", username);
          } else if (data.status_code === 400) {
            toast.warn(data.msg);
            // setError(data.msg);
          }
        })
        .catch((err) => {
          
          setLoginErrorStatus(1);
          setiscalling(false);
       
        });
    }
  };
  if (iscalling) {
   
    return <Spinner />;
  }
  return loginErrorStatus === 1 ? (
    <div>
      <p align="center">Database Connection Error.</p>
      <p align="center">Please Check Your Internet. And Try Again Later.</p>
    </div>
  ) : (
    <div className="login-wrapper">
      <div className="row">
        <div className="col-sm-7 login-img-cover">
          <div className="img-cover-inner">
            <img src={logo} alt="smtech"/>
            </div>
            <div className="add-info">
              <p>Subidhanagar, Tinkune, Kathmandu</p>
              <p>
                <MailIcon /> info@smtechme.com &nbsp;&nbsp; <PhoneIphoneIcon />{" "}
                +977 9851186839
              </p>
              <p>
                <span>ERP 1.0.0</span>
              </p>
        
          </div>
        </div>
        <div className="col-sm-5">
          <div className="login-form">
            <h3> Login</h3>
            <form>
              <label>
                <p style={{ marginBottom: "3px" }}>Username</p>
                <input
                  type="text"
                  onChange={(e) => setUserName(e.target.value)}
                  style={{
                    marginBottom: "7px",
                    width: "100%",
                    border: "0",
                    borderRadius: "10px",
                    padding: "2px 8px",
                  }}
                />
              </label>
              <br></br>
              <label>
                <p style={{ marginBottom: "3px" }}>Password</p>
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    marginBottom: "7px",
                    width: "100%",
                    border: "0",
                    borderRadius: "10px",
                    padding: "2px 8px",
                  }}
                />
              </label>
              <hr></hr>
              {/* <p className='error-text'>{error}</p> */}
              <div>
                <button onClick={handleSubmit} className="button">
                  Login
                </button>
                {/* <a href="#" style={{textDecoration: "none"}}>Forgot Password?</a> */}
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="copyright">
        <small>
          All rights reserved. Copyright &copy; {new Date().getFullYear()}{" "}
          <a href="https://www.smtechme.com/" target="_blank">
            SMTech Software
          </a>
        </small>
      </div>
    </div>
  );
}

// import React,{useState} from 'react';
//  import {useFormik} from 'formik';

// import * as Yup from 'yup';

// import config from '../../utils/config';
// import Spinner from '../../utils/spinner'
// import {toast} from 'react-toastify';
// import Controls from '../controls/Controls';
// import { Grid, Switch, FormGroup, FormControl } from "@material-ui/core";
// import { RiEyeCloseLine } from 'react-icons/ri';
// import IconButton from '@mui/material/IconButton';
//  import { Col } from 'react-bootstrap';

// const validationSchema = Yup.object({
//   username: Yup.string()
//     .required('Enter your Username'),
//   password: Yup.string()
//     .required('Password is Required!')

// });
// export default function Login(props) {
//   //    const [username, setUserName] = useState();
//   //  const [password, setPassword] = useState();
//   const [showPw, setShowPw] = useState(false);
//      const [iscalling,setiscalling]=useState(false);

//   const handleShowPw = () => {setShowPw(!showPw);}

//   const formik = useFormik({
//     initialValues: {
//       username:  '',
//       password:  '',

//     },
//     validationSchema: validationSchema,
//     onSubmit: (values) => {

//           // e.preventDefault()
//     setiscalling(true)
//     fetch(`${config.APP_CONFIG}/Login/api`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//           },
//       body: JSON.stringify({
//         values
//       })
//     })
//    .then(data => data.json())
//    .then(data=>{
//      setiscalling(false)
//     if(data.status_code===200){
//       props.setToken(data.msg)
//     }
//     else{
//       toast.warn("Unable to login")
//     }
//    })
//    .catch(err=>{
//     //  setiscalling(false)
//      toast.error("Cannot login!")
//      console.log(err)
//    })
//   }

//   });

//   return  <>
//   <Col
//     lg={6}
//     className="container mt-5 pb-3 px-5 border rounded-3 absolute"
//     style={{ boxShadow: '6px 3px 30px rgba(0, 0, 0, 0.1)' }}>

//     <form onSubmit={formik.handleSubmit}>
//       <div className="row pt-3">
//         <div className="col">
//             <Controls.Input
//               type="username"
//               id="username"
//               value={formik.values.email}
//               varient="outlined"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               focusBorderColor="blue.500"
//               isRequired
//               placeholder="Enter username"
//               _placeholder={{ fontSize: '14px' }}
//             />
//             {formik.errors.username && formik.touched.username && (
//               <span className="text-secondary mt-1">
//                 {formik.errors.username}
//               </span>
//             )}

//         </div>
//       </div>

//       <div className="row pt-3">
//         <div className="col">

//               <Controls.Input
//                 pr="4.5rem"
//                 type={showPw ? 'text' : 'password'}
//                 value={formik.values.password}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 focusBorderColor="blue.500"
//                 isRequired
//                 placeholder="Enter Password"
//                 _placeholder={{ fontSize: '14px' }}
//               />
//               {formik.values.password && (

//                   <IconButton
//                     aria-label="show password"
//                     w="2.5rem"
//                     size="sm"
//                     onClick={handleShowPw}
//                     icon={<RiEyeCloseLine />}
//                   />

//               )}
//             {formik.errors.password && formik.touched.password && (
//               <span className="text-secondary mt-1">
//                 {formik.errors.password}
//               </span>
//             )}

//         </div>
//       </div>

//     </form>
//   </Col>
// </>

// };
