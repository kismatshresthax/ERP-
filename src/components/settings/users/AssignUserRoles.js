import React, { useState } from "react";

import axios from "axios";
import config from "../../../utils/config";
import { toast } from "react-toastify";
import UserSessionContext from "../../../contexts/UserSessionContext";

import { styled } from "@mui/material/styles";
import { Grid, Box } from "@material-ui/core";
import Paper from "@mui/material/Paper";
//============================For Password=====================================
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Controls from "../../controls/Controls";
import { useHistory } from "react-router-dom";
//=================================================================

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
}));

const AssignUserRoles = (props) => {
  let history = useHistory();
  const [submit, setSubmit] = useState(true);
  //========================For Password==============================
  const [values, setValues] = React.useState({
   
    password: "",
    confirmPassword: "",
  
    showPassword: false,
    showConfirmPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword1 = () => {
   
   
    setValues({...values,showPassword: !values.showPassword});
  
   
  };

  const handleClickShowPassword2 = () => {
    setValues({
      ...values,
      showConfirmPassword: !values.showConfirmPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();

  };

  //=================================================================

  const userSessionContext = React.useContext(UserSessionContext);


  const handlePasswordSubmit = () => {
    if (values.password === "" || values.confirmPassword === "") {
      toast.warn("Please Fill Password Fields");
    }
    else if (values.password !== values.confirmPassword ) {
      toast.warn("Password Don't match");
    }
  
     else if (values.password === values.confirmPassword) {
      let req_data = {
        password: values.password,
        password2: values.confirmPassword,
      };
     
      axios
        .put(
          `${config.APP_CONFIG}/Login/setPassword/${props.insertId}`,
          req_data,
          {
            headers: {
              Authorization: userSessionContext.token,
            },
          }
        )
        .then((res) => {
          if (res.data.status_code === 200) {
            toast.success(res.data.msg);
            history.push(`/settings/users`);
            setSubmit(false);
       
          } else if (res.data.status_code === 401) {
            userSessionContext.handleLogout();
          } else if (res.data.status_code === 400) {
            toast.warn(res.data.msg);
          }
        })
        .catch((err) => {
          toast.error("Something went Wrong");
        });
    } else {
      toast.warn("Password Not Matched");
    }
  };

  return (
    <div className="userPasswordForm">
      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12}>
            <p style={{paddingLeft:"8px", margin:"0"}}> Create Password:</p>
          </Grid>
          <Grid item xs={6}>
            <Item style={{ boxShadow: "none" }}>
              <FormControl sx={{ width: "100%" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  style={{height:"38px", padding:"1px 14px"}}
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword1}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword.length>0 ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </Item>
            
          <Grid item xs={6}>
            <Item style={{ boxShadow: "none" }}>
              <FormControl sx={{ width: "100%" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment">
                  Confirm Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment"
                  type={values.showConfirmPassword ? "text" : "password"}
                  value={values.confirmPassword}
                  style={{height:"38px", padding:"1px 14px"}}
                  onChange={handleChange("confirmPassword")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword2}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Confirm Password"
                />
              </FormControl>
            </Item>
            </Grid>
          </Grid>
      
          
          <Grid item xs={12}>
            <Item style={{ boxShadow: "none" }}>
              {submit === true? 
              <Controls.Button
                text="Create"
                color="default"                
                style={{ margin: "4px 0", background: "#454545", color: "#fff" }}
                onClick={handlePasswordSubmit}
              />:
              <Controls.Button
                disabled
                text="Create"      
                style={{ margin: "4px 0" }}
              />
            }
            </Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
export default AssignUserRoles;
