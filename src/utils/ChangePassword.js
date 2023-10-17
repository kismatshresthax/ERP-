import React ,{useState}from 'react'
import TextField from '@mui/material/TextField';
import { Grid } from "@material-ui/core";
import Button from '@mui/material/Button';
import { toast } from "react-toastify";
import UserSessionContext from "../contexts/UserSessionContext";
import axios from "axios";
import config from "./config";
function ChangePassword(props) {
    const userSessionContext = React.useContext(UserSessionContext);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
   
        if (newPassword !== confirmPassword) {
          setError("New password and confirm password don't match.");
          return;
        }
        const req_data={
            "password":currentPassword ,
      "password2": "newPassword"
        }
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
          
           
       
          } else if (res.data.status_code === 401) {
            userSessionContext.handleLogout();
          } else if (res.data.status_code === 400) {
            toast.warn(res.data.msg);
          }
        })
        .catch((err) => {
          toast.error("Something went Wrong");
        });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setError('');
      };
  return (

    <form onSubmit={handleSubmit}>
            <Grid container spacing={4}>
        <Grid item xs={12} md={12} sm={12}>
    
    <TextField
      label="Current Password"
      type="password"
      value={currentPassword}
      onChange={(e) => setCurrentPassword(e.target.value)}
      required
  fullWidth
      margin="normal"
    />
  
  
    <TextField
      label="New Password"
      type="password"
      value={newPassword}
      onChange={(e) => setNewPassword(e.target.value)}
      required
      fullWidth
      margin="normal"
    /> 
  
    <TextField
      label="Confirm Password"
      type="password"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      required
      fullWidth
      margin="normal"
      error={error !== ''}
      helperText={error}
    />
    </Grid>
     </Grid>
    <Button type="submit" variant="contained" color="primary">
      Change Password
    </Button>
  </form>
 
  )
}

export default ChangePassword