import { Box, Button, Checkbox, CircularProgress, FormControlLabel, FormGroup, Stack, TextField, Typography, circularProgressClasses, colors } from "@mui/material";
import React, { useState } from "react";
//import { images } from "../Assets";
import LoginImage from "../Assets/images/3d-render-tax-payment-financial-business-concept.jpg"
// import logo from "./img/smtech-logo-light.png";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import MailIcon from "@mui/icons-material/Mail";
import Animate from "../../utils/Animate";
import { Link, useHistory } from "react-router-dom";
import config from "../../utils/config";
import Spinner from "../../utils/spinner";
import { toast } from "react-toastify";

const LoginPage = (props) => {
  //const navigate = useNavigate();
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [onRequest, setOnRequest] = useState(false);
  const [loginProgress, setLoginProgress] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let history = useHistory();
  const onSignin = (e) => {
    e.preventDefault();
    setOnRequest(true);

    const interval = setInterval(() => {
      setLoginProgress(prev => prev + 100 / 40);
    }, 50);

    setTimeout(() => {
      clearInterval(interval);
    }, 2000);

    setTimeout(() => {
      setIsLoggedIn(true);
    }, 2100);

    setTimeout(() => {
       history.push("/")
    }, 3300);
  



     fetch(`${config.APP_CONFIG}/Login/api`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
    
  
      setTimeout(() => {
        clearInterval(interval);
        setIsLoggedIn(true);
      }, 2100);

      // setTimeout(() => {
      //   history.push('/');
      // }, 3300);
    }
    else if (data.status_code === 400) {
      toast.warn(data.msg);

    }
  })
    .catch((err) => {
      
     
    });
  }


  return (
    <Box
      position="relative"
      height="100vh"
      sx={{ "::-webkit-scrollbar": { display: "none" } }}
    >
      {/* background box */}
      <Box sx={{
        position: "absolute",
        right: 0,
        height: "100%",
        width: "70%",
        backgroundPosition: "center",
        backgroundSize: "cover",
     
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(${LoginImage})`
      }}
   
      />
      {/* background box */}

      {/* Login form */}
      <Box sx={{
        position: "absolute",
        left: 0,
        height: "100%",
        width: isLoggedIn ? "100%" : { xl: "30%", lg: "40%", md: "50%", xs: "100%" },
        transition: "all 1s ease-in-out",
        backgroundColor: "#ffff"
      }}>
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          opacity: isLoggedIn ? 0 : 1,
          transition: "all 0.3s ease-in-out",
          height: "100%",
          "::-webkit-scrollbar": { display: "none" }
        }}>
          {/* logo */}
          <Box sx={{ textAlign: "center", p: 5 }}>
            <Animate type="fade" delay={0.5}>
              {/* <img src={logo} alt="logo" height={60}></img> */}
            </Animate>
          </Box>
          {/* logo */}

          {/* form */}
          <Box sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "::-webkit-scrollbar": { display: "none" }
          }}>
            <Animate type="fade" sx={{ maxWidth: 400, width: "100%" }}>
              <Box component="form" maxWidth={400} width="100%" onSubmit={onSignin}>
                <Stack spacing={3}>
                  <TextField label="username"   onChange={(e) => setUserName(e.target.value)}fullWidth />
                  <TextField label="password" type="password"     onChange={(e) => setPassword(e.target.value)}fullWidth />
                  <Button type="submit" size="large" variant="contained" color="success">
                   Login
                  </Button>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <FormGroup>
                      <FormControlLabel control={<Checkbox />} label="Remember me" />
                    </FormGroup>
                    <Typography color="error" fontWeight="bold">
                  
                        Forgot password?
                  
                    </Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <div style={{color:"black"}}className="add-info">
              <p>Subidhanagar, Tinkune, Kathmandu</p>
              <p>
                <MailIcon /> info@smtechme.com &nbsp;&nbsp; <PhoneIphoneIcon />{" "}
                +977 9851186839
              </p>
              <p>
                <span>ERP 1.0.0</span>
              </p>
        
          </div>
          </Stack>
                </Stack>
              </Box>
            </Animate>
          </Box>
          {/* form */}

    
          {onRequest && (
            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{
                height: "100%",
                width: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                bgcolor:" #ffff",
                zIndex: 1000
              }}
            >
              <Box position="relative">
                <CircularProgress
                  variant="determinate"
                  sx={{ color: "#eeeeee"}}
                  size={100}
                  value={100}
                />
                <CircularProgress
                  variant="determinate"
                  disableShrink
                  value={loginProgress}
                  size={100}
                  sx={{
                    [`& .${circularProgressClasses.circle}`]: {
                      strokeLinecap: "round"
                    },
                    position: "absolute",
                    left: 0,
                    color: "#43a047"
                  }}
                />
              </Box>
            </Stack>
          )}
   
        </Box>
      </Box>

    </Box>
  );
};

export default LoginPage;