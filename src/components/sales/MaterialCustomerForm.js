
import React, { useState, useEffect } from "react";
import { Grid, Switch, FormGroup, FormControlLabel } from "@material-ui/core";
import { useForm, Form } from "./../home/useForm";
import Controls from "./../controls/Controls";

//import UserSessionContext from "../../../contexts/UserSessionContext";
import { toast } from "react-toastify";
import Spinner from "./../../utils/spinner";
import CompanyContext from "./../../contexts/CompanyContext";
import "../../App.css";


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
  isCustomer: 0,
  panNo: "",
};
const gender = [
  { id: "M", title: "Male" },
  { id: "F", title: "Female" },
  { id: "O", title: "Other" },
];

export default function MaterialCustomerForm(props) {
  //  const userSessionContext = React.useContext(UserSessionContext);
  const companyContext = React.useContext(CompanyContext);
  const _data = props.data || initialFValues;


  // const [isVendor, setIsVendor] = useState(0);
  // const [isLoginAllowed, setIsLoginAllowed] = useState(0);
  const [isCustomer, setIsCustomer] = useState(1);
  const [userName, setUserName] = useState()
  const [firstName, setFirstName] = useState()

  useEffect((e) => {
    if (firstName !== undefined) {
      setUserName(firstName)
    }

  }, [firstName])



  // useEffect(() => {
  //   if (isCustomer === 1)
  // }, [isCustomer])

  // useEffect(() => {
  //   if (isLoginAllowed === 1) {

  //     setIsCustomer(0)
  //   }
  //   else {
  //     setIsCustomer(1)
  //   }
  // }, [isLoginAllowed])

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
    : "This field is required."

    // if ("userName" in fieldValues)
    //   temp.userName = fieldValues.userName
    //     ? fieldValues.userName.match(/^[a-zA-Z0-9 !@#\$%\^\&*\)\(+=._-]+$/g)
    //       ? ""
    //       : "Invalid Data"
    //     : "This field is required.";

    if ("gender" in fieldValues)
      temp.gender = fieldValues.gender.length != 0
        ? ""
        : "This field is required.";

    if ("userCompanyName" in fieldValues)
      temp.userCompanyName = fieldValues.userCompanyName
        ? fieldValues.userCompanyName.match(/^[a-zA-Z0-9 !@#\$%\^\&*\)\(+=._-]+$/g)
          ? ""
          : "Invalid Data"
        : "This field is required.";

    if ("designation" in fieldValues)
      temp.designation = fieldValues.designation
        ? fieldValues.designation.length < 26
          ? fieldValues.designation.match(/^[a-zA-Z0-9 !@#\$%\^\&*\)\(+=._-]+$/g)
            ? ""
            : "Invalid Data"
          : "Maximum 25 characters"
        : "This field is required."

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
          ? fieldValues.address1.match(/^[a-zA-Z0-9 !@#\$%\^\&*\)\(+=.,_]+$/g)
            ? ""
            : "Invalid Data"
          : "Maximum 99 characters"
        : "This field is required."
    setErrors({
      ...temp,
    });
    if (fieldValues == values)
      return Object.values(temp).every((x) => x == "");
  };

  // const validate = (fieldValues = values) => {
  //   let temp = {...errors};
  //   temp.firstName = firstName ? "" : "This field is required.";  // firstName isnot from values but from useState

  //   if ('lastName' in fieldValues)
  //   temp.lastName = fieldValues.lastName 
  //   ? values.lastName.length<21 
  //    ? "" 
  //     : "Maximum 20 characters"
  //   :"This field is required."


  //   temp.username = username ? "" : "This field is required."; // same as firstName

  //   if ('gender' in fieldValues)
  //   temp.gender = fieldValues.gender.length != 0 ? "" : "This field is required.";

  //   if ('designation' in fieldValues)
  //   temp.designation = fieldValues.designation  
  //   ? values.designation.length<21
  //    ? "" 
  //     : "Maximum 20 characters"
  //   : "This field is required."

  //   if ('contactNumber1' in fieldValues)
  //   if (temp.contactNumber1 === "") {
  //     temp.contactNumber1 = "This field is required.";
  //   }
  //   // else if(values.contactNumber1.length > 0)
  //   // {
  //   //     if(values.contactNumber1.length !== 10)
  //   //     {
  //   //       temp.contactNumber1 = "Number must be of 10 digits."
  //   //     }
  //   // }
  //   else if (temp.contactNumber1.length > 10 ){
  //     temp.contactNumber1 = "Number mustn't be Greater than 10 digits.";
  //   } else if (temp.contactNumber1.length < 9) {
  //     temp.contactNumber1 = "Number mustn't Less Than 9 digits.";
  //   }

  //   if ('panNo' in fieldValues)
  //   if (temp.panNo === null || temp.panNo === undefined) {
  //     setValues({ ...values, panNo: "" });
  //   } else if (temp.panNo.length > 0) {
  //     if (temp.panNo.length !== 9) {
  //       temp.panNo = " Pan no. must be of 9 digits.";
  //     }
  //   }

  //   if ('address1' in fieldValues)
  //   temp.address1 = fieldValues.address1 
  //   ?values.address1.length<21 
  //    ? ""  
  //     : "Maximum 20 characters"
  //    : "This field is required."
  //   setErrors({
  //     ...temp,
  //   });
  //   if (fieldValues == values)
  //   return Object.values(temp).every((x) => x == "");
  // };

  const { values, setValues, handleInputChange, ResetForm, errors, setErrors } = useForm(_data, true, validate);
  
  const handleSubmission = (e) => {
    e.preventDefault();
    if (validate()) {
      let req_value = {
        id: values.id,
        firstName: firstName,
        companyId: companyContext.company.id,
        userCompanyName: values.userCompanyName,
        middleName: values.middleName,
        lastName: values.lastName,
        username: firstName + " " + values.middleName +  " " + values.lastName,
        contactNumber1: values.contactNumber1,
        contactNumber2: values.contactNumber2,
        gender: values.gender,
        country: values.country,
        state: values.state,
        designation: values.designation,
        address1: values.address1,
        address2: values.address2,
        isCustomer: parseInt(isCustomer),
        panNo: values.panNo,
      };

      if (isCustomer === 0 ) {
        toast.warn("Please Choose User Type")
      }
      else {
        props.handleSubmit(req_value);
        setFirstName("");
        setUserName("");
        // ResetForm();

        // if (parseInt(isLoginAllowed) === 1) {
        //   setFirstName("");
        //   setUserName("");
        //   props.step_handler("next");
        // }

        // else {

        //   return null;
        // }

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
    <Form onSubmit={handleSubmission}>
      <Grid container>
      <Grid item xs={12} sm={12} md={6} lg={6}>
          <Controls.Input
            name="firstName"
            label="First Name"
            value={firstName}
            onChange={(e) => { setFirstName(e.target.value) }}
            onClick={(e) => { setUserName(e.target.value) }}
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
          <Controls.Input
            label="Company Name"
            name="userCompanyName"
            value={values.userCompanyName}
            onChange={handleInputChange}
            required={true}
            error={errors.userCompanyName}
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
            onKeyDown={e => (e.keyCode === 69 || e.keyCode === 190 || e.keyCode === 187) && e.preventDefault()}
            onChange={handleInputChange}
            error={errors.contactNumber1}
            required={true}

          />
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6}>
        <Controls.Input
            name="middleName"
            label="Middle Name"
            value={values.middleName}
            onChange={handleInputChange}
          />
          {/* <Controls.Input
            name="username"
            label="User Name"
            value={userName || ''}
            onChange={(e) => { setUserName(e.target.value) }}
            error={errors.userName}
            required={true}
          /> */}
          <Controls.RadioGroup
            name="gender"
            label="Gender"
            value={values.gender}
            onChange={handleInputChange}
            items={gender}
          />

          <Controls.Input
            name="country"
            label="Country (optional)"
            value={values.country}
            onChange={handleInputChange}
          />
          <Controls.Input
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
            onKeyDown={e => (e.keyCode === 69 || e.keyCode === 190 || e.keyCode === 187) && e.preventDefault()}
            onChange={handleInputChange}
          />          
        </Grid>

        <div>
          {_data.id ? (
            <Controls.Button type="submit" text="Update" />
          ) : (
            <div>
              <Controls.Button type="submit" text="Submit" />
            </div>
          )}
        </div>
      </Grid>
    </Form>
  );
}
