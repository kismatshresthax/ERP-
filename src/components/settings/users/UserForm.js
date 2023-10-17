import React, { useState, useEffect } from "react";
import { Grid, Switch, FormGroup, FormControlLabel } from "@material-ui/core";
import { useForm, Form } from "../../home/useForm";
import Controls from "../../controls/Controls";
import axios from "axios";
import config from "../../../utils/config";
import UserSessionContext from "../../../contexts/UserSessionContext";
import { toast } from "react-toastify";
import Spinner from "../../../utils/spinner";
import CompanyContext from "../../../contexts/CompanyContext";
import Select from "react-select";
import "../../../App.css";
import { styled } from "@mui/material/styles";
import {  Box } from "@material-ui/core";
import Paper from "@mui/material/Paper";
//============================For Password=====================================
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useHistory } from "react-router-dom";
//import AssignUserRoles from "./AssignUserRoles";

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
}));
const initialFValues = {
  firstName: "",
  companyId: 0,
  middleName: "",
  lastName: "",
  username: "",
  userCompanyName: "",
  contactNumber1: "",
  contactNumber2: "",
  gender: "M",
  country: "",
  state: "",
  designation: "",
  address1: "",
  address2: "",
  isVendor: 0,
  isLoginAllowed: 0,
  isCustomer: 0,
  panNo: "",
};
const gender = [
  { id: "M", title: "Male" },
  { id: "F", title: "Female" },

];

export default function UserForm(props) {
  //  const userSessionContext = React.useContext(UserSessionContext);
  const companyContext = React.useContext(CompanyContext);
  const _data = props.data || initialFValues;

  // const [isVendor, setIsVendor] = useState(0);
  const [isLoginAllowed, setIsLoginAllowed] = useState(0);
  //const [isCustomer, setIsCustomer] = useState(1);
  const [userName, setUserName] = useState();
  const [firstName, setFirstName] = useState();
 
  const [companyId, setCompanyId] = useState();


  useEffect(
    (e) => {
      if (firstName !== undefined) {
        setUserName(firstName);
      }
    },
    [firstName]
  );



  const userSessionContext = React.useContext(UserSessionContext);
  const [companyList, setCompanyList] = useState();

  useEffect(() => {
   axios
      .get(`${config.APP_CONFIG}/Companies/Company`, {
        headers: {
          Authorization: userSessionContext.token,
        },
      })

      .then((res) => {
        if (res.data.status_code === 401) {
          userSessionContext.handleLogOut();
        } else if (res.data.status_code === 200) {
          
          let companyList = res.data.msg.map((item) => ({
            value: item.id,
            label: item.name,
          }));

          companyList = [{ id: 0, title: "Select" }].concat(companyList);
          setCompanyList(companyList);
        } else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
        } else {
          toast.error("error");
          setCompanyList([]);
        }
      })
      .catch((err) => {
        setCompanyList([]);
      });
  }, []);



  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("firstName" in fieldValues)
      temp.firstName = firstName
        ? firstName.match(/^[a-zA-Z0-9 !@#\$%\^\&*\)\(+=._-]+$/g)
          ? ""
          : "Invalid Data"
        : "This field is required.";

 

    if ("lastName" in fieldValues)
      temp.lastName = fieldValues.lastName
        ? fieldValues.lastName.length < 26
          ? fieldValues.lastName.match(/^[a-zA-Z0-9 !@#\$%\^\&*\)\(+=._-]+$/g)
            ? ""
            : "Invalid Data"
          : "Maximum 25 characters"
        : "This field is required.";

    if ("userName" in fieldValues)
      temp.userName = fieldValues.userName
        ? fieldValues.userName.match(/^[a-zA-Z0-9 !@#\$%\^\&*\)\(+=._-]+$/g)
          ? ""
          : "Invalid Data"
        : "This field is required.";

  

    if ("designation" in fieldValues)
      temp.designation = fieldValues.designation
        ? fieldValues.designation.length < 26
          ? fieldValues.designation.match(
              /^[a-zA-Z0-9 !@#\$%\^\&*\)\(+=._-]+$/g
            )
            ? ""
            : "Invalid Data"
          : "Maximum 25 characters"
        : "This field is required.";

    if ("contactNumber1" in fieldValues)
      temp.contactNumber1 = fieldValues.contactNumber1
        ? fieldValues.contactNumber1.length < 11
          ? ""
          : "maximum 10 Characters"
        : "This field is required.";

    if ("panNo" in fieldValues)
      temp.panNo = fieldValues.panNo
        ? fieldValues.panNo.length < 10
          ? fieldValues.panNo.length === 9
            ? ""
            : "Minimum 9 Characters"
          : "Maximum 9 Characters"
        : "";

    if ("address1" in fieldValues)
      temp.address1 = fieldValues.address1
        ? fieldValues.address1.length < 100
          
         
            ? ""
    
          : "Maximum 99 characters"
        : "This field is required.";
    setErrors({
      ...temp,
    });
    if (fieldValues === values) return Object.values(temp).every((x) => x === "");
  };



  const { values, setValues, handleInputChange, ResetForm, errors, setErrors } =
    useForm(_data, true, validate);
    console.log(props.insertId)

  const handleSubmission = (e) => {
    e.preventDefault();
if(companyId===undefined||null){
  toast.warn("Please Choose company");
}
    if (validate()) {
      let req_value = {
        id: values.id,
        firstName: firstName,
 
        companyId: companyId.value,
        userCompanyName: "",
 
        middleName: values.middleName,
        lastName: values.lastName,
        username:  firstName + " " + values.middleName +  " " + values.lastName,
        contactNumber1: values.contactNumber1,
        contactNumber2: "",
        gender: values.gender,
        country:"",
        state: "",
        designation: values.designation,
        address1: values.address1,
        address2: "",
        isVendor: 0,
        isLoginAllowed: parseInt(isLoginAllowed),
        isCustomer: 0,
        panNo: values.panNo,
      };

      if ( isLoginAllowed === 0) {
        props.handleSubmit(req_value);
        setFirstName("");
        setUserName("");
        ResetForm();
     
      } else  {
        console.log(props.insertId)
        props.handleSubmit(req_value);
          setFirstName("");
          setUserName("");
          props.step_handler("next");
        } 
      
    }
  };

  // useEffect(() => {
  //   let select_companies = companyContext.companies.map((x) => {
  //     return { id: x.id, title: x.name };
  //   });
  //   setCompanyList(select_companies);
  // }, []);

  if (companyContext.company.id === undefined) {
    return <Spinner />;
  }

  const getSwitch = (key, callback, label) => {
    return (
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              color="primary"
              size="small"
              checked={key === 1 ? true : false}
              defaultValue="on"
              onChange={(e) => {
                let changedValue = 0;
                if (key === 0) {
                  changedValue = 1;
                }
                callback(changedValue);
              }}
            />
          }
          label={label}
        />
      </FormGroup>
    );
  };
  return (
    <div className="userForm">
      <Form onSubmit={handleSubmission}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Controls.Input
              name="firstName"
              label="First Name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              onClick={(e) => {
                setUserName(e.target.value);
              }}
              error={errors.firstName}
              required={true}
            />

            <Controls.Input
              name="lastName"
              label="Last Name"
              value={values.lastName}
              onChange={handleInputChange}
              error={errors.lastName}
              required={true}
            />
            
            

            <Select
              type="text"
              placeholder={"Select Company"}
              options={companyList}
              styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
              menuPortalTarget={document.body}
              value={companyId}
              onChange={setCompanyId}
              required={true}
              error={errors.companyId}
            />
          

            <Controls.Input
              name="address1"
              label="Address 1"
              value={values.address1}
              onChange={handleInputChange}
              error={errors.address1}
              required={true}
            />
           <Controls.Input
              name="contactNumber1"
              type="number"
              label="Contact Number 1"
              value={values.contactNumber1}
              onKeyDown={(e) =>
                (e.keyCode === 69 || e.keyCode === 190 || e.keyCode === 187) &&
                e.preventDefault()
              }
              onChange={handleInputChange}
              error={errors.contactNumber1}
              required={true}
            />

            {/* <Grid container spacing={1} style={{ margin: "0 10px" }}>
             
              <Grid>
                {getSwitch(
                  isLoginAllowed,
                  setIsLoginAllowed,
                  "Is LoginAllowed"
                )}
              </Grid>
            </Grid> */}
          </Grid>
          <Grid item xs={4}>
          <Controls.Input
              name="username"
              label="User Name"
              value={userName || ""}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              error={errors.userName}
              required={true}
            />
          <Controls.Input
              name="middleName"
              label="Middle Name"
              value={values.middleName}
              onChange={handleInputChange}
            />
  <Controls.Input
              name="designation"
              label="Designation"
              value={values.designation}
              onChange={handleInputChange}
              error={errors.designation}
              required={true}
            />
             
                
          <Controls.Input
              label="Pan No."
              type="number"
              name="panNo"
              value={values.panNo}
              onKeyDown={(e) =>
                (e.keyCode === 69 || e.keyCode === 190 || e.keyCode === 187) &&
                e.preventDefault()
              }
              onChange={handleInputChange}
              error={errors.panNo}
            />
              {getSwitch(
                  isLoginAllowed,
                  setIsLoginAllowed,
                  "Is LoginAllowed"
                )}
             {/* <Controls.Input
              name="country"
              label="Country (optional)"
              value={values.country}
              onChange={handleInputChange}
            /> */}
          </Grid>
          <Grid item xs={4}>
         
          <Controls.RadioGroup
              name="gender"
              label="Gender"
              value={values.gender}
              onChange={handleInputChange}
              items={gender}
            />
       
        
          

           


            {/* <Controls.Input
              name="state"
              label="State (optional)"
              value={values.state}
              onChange={handleInputChange}
            />

            <Controls.Input
              name="address2"
              label="Address 2(optional)"
              value={values.address2}
              onChange={handleInputChange}
            />
            <Controls.Input
              name="contactNumber2"
              type="number"
              label="Contact Number 2(optional)"
              value={values.contactNumber2}
              onKeyDown={(e) =>
                (e.keyCode === 69 || e.keyCode === 190 || e.keyCode === 187) &&
                e.preventDefault()
              }
              onChange={handleInputChange}
            /> */}
          </Grid>

          <div>
            <Controls.Button type="submit" text="Submit" />
           
          </div>
        </Grid>
      </Form>
    </div>
  );
}
