import React from "react";
import Avatar from "@material-ui/core/Avatar";

import { toast } from "react-toastify";

import CssBaseline from "@material-ui/core/CssBaseline";

import QrCodeIcon from '@mui/icons-material/QrCode';
import {useForm,Form} from "../../components/home/useForm"
import Paper from "@material-ui/core/Paper";
import Controls from "../controls/Controls";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import UserSessionContext from "../../contexts/UserSessionContext";
import config from "../../utils/config";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
    Root: {
      height: "60vh",
      //backgroundImage: `url(${image})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundColor:
        theme.palette.type === "light"
          ? theme.palette.grey[50]
          : theme.palette.grey[900],
  
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },

    // input: {
    //         padding: "18.5px 14px"
    //     },
    
    size: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    },
  
    paper: {
      margin: theme.spacing(2, 8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    avatar: {
      margin: theme.spacing(0),
      backgroundColor: theme.palette.secondary.main
    },
    Form: {
      width: "100%", 
      //marginTop: theme.spacing(1)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    }
  }));
  const initialFValues = {
  
    user_name: "",
    pass_word:"",
    key:"",
  };
function DigitalPay(props) {
    const classes = useStyles();
    const userSessionContext = React.useContext(UserSessionContext);
    
    const _data = props.data || initialFValues;

         
   
        const validate = (fieldValues=values) => {
            let temp = { ...errors }
            if ('user_name' in fieldValues)
            temp.user_name = fieldValues.user_name
            ?fieldValues.user_name.length<30
            ?fieldValues.user_name.match(/^[a-zA-Z0-9 !@#\$%\^\&*\)\(+=._-]+$/g)
              ? ""
                : "Invalid Data" 
               :"maximum 16 Characters"
            : "This field is required."
            if ('pass_word' in fieldValues)
            temp.pass_word = fieldValues.pass_word?"": "This field is required."
            if ('key' in fieldValues)
            temp.key = fieldValues.key?"": "This field is required."
           
            setErrors({
              ...temp
            })
            if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
          }
          const { values, handleInputChange, ResetForm, errors, setErrors } =useForm(_data,true,validate);
          
    
   
      
    const handleSubmission = (e)=>{
        e.preventDefault()
        if (validate()) {
          let req_value = {
            //id:values.id,
            user_name: values.user_name,
            pass_word:values.pass_word,
            key:values.key,
          };
          Submit_Fonepay_Auth(req_value);
      ResetForm(); 
        }
    }
    const  Submit_Fonepay_Auth = (data)=>{
        axios.post(`${config.APP_CONFIG}/`, data, {
          headers: {
            Authorization: userSessionContext.token,
          },
        })
        .then((res) => {
          if (res.data.status_code === 200) {
         
            toast.success(res.data.msg);
          } else if (res.data.status_code === 401) {
            userSessionContext.handleLogout();
          } else if (res.data.status_code === 400) {
            toast.warn(res.data.msg);
          } else {
            toast.error("Unable to Submit");
          }
        })
        .catch((err) => {
          toast.error("Something went Wrong");
        });
    }

  return (
    <Grid container component="main" className={classes.Root}>
      {/* <CssBaseline /> */}
   
      <Grid className={classes.size}
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={1}
        square
      >
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <QrCodeIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
          Fone Pay
          </Typography>
          <Form className={classes.form} onSubmit={handleSubmission}>

          <Controls.Input
          className={classes.input}
            label="UserName"
            required
            fullWidth
            name="user_name"
            margin="normal"
            variant="outlined"
            value={values.user_name}
            onKeyDown={(e) =>
              (e.keyCode === 69 || e.keyCode === 187 || e.keyCode === 189) &&
              e.preventDefault()
            }
            onChange={handleInputChange}
            error={errors.user_name}
         
            />
              <Controls.Input
                className={classes.input}
            label="Password"
            margin="normal"
            name="pass_word"
            variant="outlined"
            fullWidth
            value={values.pass_word}
            onKeyDown={(e) =>
              (e.keyCode === 69 || e.keyCode === 187 || e.keyCode === 189) &&
              e.preventDefault()
            }
            onChange={handleInputChange}
            error={errors.pass_word}
         
            />
              <Controls.Input
            className={classes.input}
            label="Secret Key"
            fullWidth
            name="key"
            margin="normal"
       
            value={values.key}
            
            onChange={handleInputChange}
            error={errors.key}
         
            />
            {/* <TextField
            onChange={(event)=>handelAccount("username",event)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
             // id="username"
              label="Username"
              type="text"
              name="username"
              autoComplete="off"
            />
            <TextField
            onChange={(event)=>handelAccount("password",event)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="text"
             / id="password"
              autoComplete="off"
            />
            <TextField
            onChange={(event)=>handelAccount("key",event)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="key"
              label="SecretKey"
              name="key"
              autoFocus
            /> */}
            <Controls.Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
                type="submit"
                text="Submit"       
              />
          
            
           
          </Form>
        </div>
      </Grid>
    </Grid>
  )
}

export default DigitalPay;