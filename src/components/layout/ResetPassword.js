import React, { useState, useEffect} from "react";
//import Select from "react-select";
import axios from "axios";
import config from "../../utils/config";
import { toast } from "react-toastify";
//import UserSessionContext from "../../contexts/UserSessionContext";
import { Grid, Box } from "@material-ui/core";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

//============================For Password=====================================
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Controls from "../controls/Controls";
import { useHistory } from "react-router-dom";
import Login from "../Login/Login";
//=================================================================

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
}));

const ResetPassword = (props) => {
  let history = useHistory();
  // let navigate = useNavigate();
  const token = props.token;
  const [submit, setSubmit] = useState(true);
  //========================For Password==============================
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    confirmPassword: "",
    weight: "",
    weightRange: "",
    showPassword: false,
    showConfirmPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword1 = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
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

  //const userSessionContext = React.useContext(UserSessionContext);
  // const [roleid, setRoleid] = useState();
  // const [role, setRole] = useState([]);

  // useEffect(() => {
  //   loadRoles();
  // }, []);

  // const loadRoles = () => {
  //   axios
  //     .get(`${config.APP_CONFIG}/api/userRoles`, {
  //       headers: {
  //         Authorization: userSessionContext.token,
  //       },
  //     })
  //     .then((res) => {
  //       if (res.data && res.data.status_code && res.data.status_code === 200) {
  //         //   setRole(res.data.msg || []);
  //         setRole(
  //           res.data.msg.map((name, index) => ({
  //             label: name.name,
  //             value: name.id,
  //           }))
  //         );
  //       } else if (res.data.status_code === 400) {
  //         toast.warn(res.data.msg);
  //       } else {
  //         toast.error("Cannot load roles.");
  //         setRole([]);
  //       }
  //     })
  //     .catch((err) => {
  //       toast.error("Error occured");
  //       setRole([]);
  //     });
  // };

  // const addRole = (id) => {
  //   let res_data = {
  //     user_id: props.insertId,
  //     user_role_id: parseInt(id),
  //   };
  //   axios
  //     .post(`${config.APP_CONFIG}/Settings/UserToRoleMap/api`, res_data, {
  //       headers: {
  //         Authorization: userSessionContext.token,
  //       },
  //     })
  //     .then((res) => {
  //       if (res.data.status_code === 200) {
  //         // loadRoles();
  //         toast.success(res.data.msg);
  //       } else if (res.data.status_code === 401) {
  //         userSessionContext.handleLogout();
  //       } else if (res.data.status_code === 400) {
  //         toast.warn(res.data.msg);
  //       } else {
  //         toast.warn("Unable to Assign Role");
  //       }
  //     })
  //     .catch((err) => {
  //       toast.error("Something went Wrong");
  //     });
  // };

  // const Delete = (roleid, userid) => {
  //   axios
  //     .delete(
  //       `${config.APP_CONFIG}/Settings/UserToRoleMap/api/${userid}/${roleid}`,
  //       {
  //         headers: {
  //           Authorization: userSessionContext.token,
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       if (res.data.status_code === 200) {
  //         toast.info("deleted successfully");
  //       } else if (res.data.status_code === 401) {
  //         userSessionContext.handleLogout();
  //       } else if (res.data.status_code === 400) {
  //         toast.warn(res.data.msg);
  //       } else {
  //         toast.warn("Unable to Delete Role");
  //       }
  //     })
  //     .catch((err) => {
  //       toast.error("failed to delete role");
  //     });
  // };

  // const onChangeEvent = (value, action) => {
  //   if (action.action === "select-option") {
  //     let new_role = value[value.length - 1];
  //     addRole(new_role.value);
  //   } else if (action.action === "remove-value") {
  //     let removed_role = roleid.filter((x) => {
  //       return !value.map((x) => x.value).includes(x.value);
  //     });
  //     //console.log(removed_role[0]);
  //     Delete(removed_role[0].value, props.insertId);
  //   } else if (action.action === "clear") {
  //     toast.warn("Remove role one by one");
  //   } else {
  //     toast.error("Unable to Delete");
  //   }
  //   setRoleid(value);
  // };
  // const handleLogOut = (e) => {
  //   window.localStorage.removeItem("ERP_TOKEN");
  //   window.localStorage.removeItem("user");
  //   //setToken(false);
  //  // setUsers("");
  // };

  const handlePasswordSubmit = () => {
    if (values.password === "" || values.confirmPassword === "") {
      toast.warn("Please Fill Password Fields");
    } else if (values.password === values.confirmPassword) {
      let req_data = {
        username: "admin",
        id: 1,
        password: values.password,
        password2: values.confirmPassword,
      };

      axios
        .put(`${config.APP_CONFIG}/Login/setPassword/1`, req_data, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          if (res.data.status_code === 200) {
            toast.success(res.data.msg);
             return <Login/>
            // history.push('/login');
           // setSubmit(false);
          } else if (res.data.status_code === 401) {
            //handleLogout();
            window.localStorage.removeItem("ERP_TOKEN");
            window.localStorage.removeItem("user");
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
    <div className="userPasswordForm" style={{display: "flex", height: "100vh"}}>
      <div className="card" style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
        <Box sx={{ width: "100%" }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={12}>
              <Controls.Input
                name="username"
                label="Username"
                defaultValue = "admin"                
                style={{width: "100%", margin: "8px 0"}}
                required={true}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <Item
                style={{
                  boxShadow: "none",
                  background: "inherit",
                  padding: "8px 0",
                }}
              >
                <FormControl sx={{ width: "100%" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={values.showPassword ? "text" : "password"}
                    value={values.password}
                    style={{ height: "38px", padding: "1px 14px" }}
                    onChange={handleChange("password")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword1}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? (
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
            </Grid>
            <Grid item xs={12}>
              <Item
                style={{
                  boxShadow: "none",
                  background: "inherit",
                  padding: "8px 0",
                }}
              >
                <FormControl sx={{ width: "100%" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Confirm Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={values.showConfirmPassword ? "text" : "password"}
                    value={values.confirmPassword}
                    style={{ height: "38px", padding: "1px 14px" }}
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

            <Grid item xs={12}>
              <Item
                style={{
                  boxShadow: "none",
                  background: "inherit",
                  padding: "8px 0 0",
                }}
              >
                {submit === true ? (
                  <Controls.Button
                    text="Submit"
                    color="default"
                    style={{
                      margin: "0",
                      background: "#454545",
                      color: "#fff",
                    }}
                    onClick={handlePasswordSubmit}
                  />
                ) : (
                  <Controls.Button
                    disabled
                    text="Submit"
                    style={{ margin: "0" }}
                  />
                )}
              </Item>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};
export default ResetPassword;
