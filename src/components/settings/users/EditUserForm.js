import React, { useState, useEffect } from "react";
import { Grid, Switch, FormGroup, FormControlLabel } from "@material-ui/core";
import { useForm, Form } from "../../home/useForm";
import Controls from "../../controls/Controls";
import axios from "axios";
import config from "../../../utils/config";
import UserSessionContext from "../../../contexts/UserSessionContext";
import { toast } from "react-toastify";
import Spinner from "../../../utils/spinner";
//import CompanyContext from "../../../contexts/CompanyContext";
import Select from "react-select";
import "../../../App.css";

const gender = [
  { id: "M", title: "Male" },
  { id: "F", title: "Female" },
  { id: "O", title: "Others" },
];

export default function EditUserForm(props) {
  //  const userSessionContext = React.useContext(UserSessionContext);
  //const companyContext = React.useContext(CompanyContext);
  const _data = props.data || [];

  const [username, setUserName] = useState(_data.username);
  const [firstName, setFirstName] = useState(_data.firstName);
  const [isLoginAllowed, setIsLoginAllowed] = useState(_data.isLoginAllowed);
  const [isCustomer, setIsCustomer] = useState(_data.isCustomer);
  const [companyId, setCompanyId] = React.useState(()=>{
  if(_data === undefined){
    return
  }
  if(Object.keys(_data).length === 0){
    return
  }
  return {
    value:_data.companyId,
    label:_data.companyName,

  }
});
 // console.log(companyId)
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

          //companyList = [{ id: 0, title: "Select" }].concat(companyList);
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

  //user to role map
  const [roleid, setRoleid] = useState([]);
  // const validate = () => {
  //   let temp = {};
  //   temp.firstName = values.firstName ? "" : "This field is required.";
  //   temp.lastName = values.lastName ? "" : "This field is required.";
  //   temp.username = values.username ? "" : "This field is required.";
  //   temp.gender = values.gender.length != 0 ? "" : "This field is required.";
  //   temp.designation = values.designation ? "" : "This field is required.";
  //   temp.contactNumber1 =
  //     values.contactNumber1.length > 9 ? "" : "Minimum 10 numbers required.";
  //   temp.address1 = values.address1 ? "" : "This field is required.";
  //   setErrors({
  //     ...temp,
  //   });
  //   return Object.values(temp).every((x) => x == "");
  // };

  // const validate = (fieldValues = values) => {
  //   let temp = {...errors}
  //   if('firstName' in fieldValues){
  //     temp.productname = fieldValues.productname ? "" : "This field is required."
  //   }
  //   if('lastName' in fieldValues){
  //     temp.lastName = fieldValues.lastName
  //     ? fieldValues.lastName.length<21
  //      ? ""
  //       : "Maximum 20 characters"
  //     :"This field is required."
  //   }
  //   if('username' in fieldValues){
  //     temp.username = fieldValues.username ? "" : "This field is required."
  //   }
  //   if('gender' in fieldValues){
  //     temp.gender = fieldValues.gender ? "" : "This field is required."
  //   }
  //   if('designation' in fieldValues){
  //     temp.designation = fieldValues.designation
  //   ? fieldValues.designation.length<21
  //    ? ""
  //     : "Maximum 20 characters"
  //   : "This field is required."

  //   }
  //   if('contactNumber1' in fieldValues){
  //     if (fieldValues.contactNumber1 === "") {
  //       temp.contactNumber1 = "This field is required.";
  //     }
  //     // else if(values.contactNumber1.length > 0)
  //     // {
  //     //     if(values.contactNumber1.length !== 10)
  //     //     {
  //     //       temp.contactNumber1 = "Number must be of 10 digits."
  //     //     }
  //     // }
  //     else if (fieldValues.contactNumber1.length > 10 ){
  //       temp.contactNumber1 = "Number mustn't be Greater than 10 digits.";
  //     } else if (fieldValues.contactNumber1.length < 9) {
  //       temp.contactNumber1 = "Number mustn't Less Than 9 digits.";
  //     }

  //   }
  //   if('panNo' in fieldValues){
  //     if (fieldValues.panNo === null || fieldValues.panNo === undefined) {
  //       setValues({ ...values, panNo: "" });
  //     } else if (fieldValues.panNo.length > 0) {
  //       if (fieldValues.panNo.length !== 9) {
  //         temp.panNo = " Pan no. must be of 9 digits.";
  //       }
  //     }
  //   }
  //   if('address1' in fieldValues){
  //     temp.address1 = fieldValues.address1
  //     ? fieldValues.address1.length<21
  //      ? ""
  //       : "Maximum 20 characters"
  //      : "This field is required."
  //   }
  //   setErrors({...temp})
  //   if (fieldValues == values)
  //   return Object.values(temp).every(x => x == "")
  // }
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


  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("firstName" in fieldValues)
      temp.firstName = firstName ? "" : "This field is required.";
    if ("lastName" in fieldValues)
      temp.lastName = fieldValues.lastName
        ? fieldValues.lastName.length < 51
          ? ""
          : "Maximum 50 characters"
        : "This field is required.";
    if ("username" in fieldValues)
      temp.username = username ? "" : "This field is required.";
    // if ("gender" in fieldValues)
    //   temp.gender =fieldValues.gender.length !== 0 ? "" : "This field is required.";
    if ("companyId" in fieldValues)
      temp.companyId =fieldValues.companyId.length !== 0 ? "" : "This field is required.";

    if ("designation" in fieldValues)
      temp.designation = fieldValues.designation
        ? fieldValues.designation.length < 21
          ? ""
          : "Maximum 20 characters"
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
          : "Maximum 20 characters"
        : "This field is required.";
    setErrors({
      ...temp,
    });
    if (fieldValues === values)
      return Object.values(temp).every((x) => x == "");
  };

  const { values, setValues, handleInputChange, errors, setErrors } = useForm(
    _data,
    true,
    validate
  );

  // const onInputChange = (_key, _value) => {
  //   setValues({ ...values, [_key]: _value });
  // };

  // useEffect(() => {
  //    let new_val = values.isCustomer === 1 ? 0 : 1;

  //      setValues({ ...values, isLoginAllowed: new_val });

  // }, [values.isCustomer]);

  // useEffect(() => {
  //    let new_val = values.isLoginAllowed === 1 ? 0 : 1;

  //      setValues({ ...values, isCustomer: new_val });

  // }, [values.isLoginAllowed]);

  // useEffect(() => {
  //   if (isCustomer === 1) {
  //     setIsLoginAllowed(0);
  //   } else {
  //     setIsLoginAllowed(1);
  //   }
  // }, [isCustomer]);

  // useEffect(() => {
  //   if (isLoginAllowed === 1) {
  //     setIsCustomer(0);
  //   } else {
  //     setIsCustomer(1);
  //   }
  // }, [isLoginAllowed]);

  // const getSpecificRoleId = () => {
  //   axios
  //     .get(`${config.APP_CONFIG}/Settings/UserToRoleMap/api/${values.id}`,{
  //       headers:{
  //         Authorization:userSessionContext.token
  //       }
  //     })
  //     .then((res) => {
  //       if (res.data && res.data.status_code && res.data.status_code === 200) {
  //         // setRoleid(res.data.msg.map(x=>({label: x.roleName, value: x.roleId})))
  //         // console.log(res.data.msg.map(x=>({label: x.roleName, value: x.roleId})))
  //         let temp = res.data.msg.map((x) => ({
  //           label: x.roleName,
  //           value: x.roleId,
  //         }));
  //         setRoleid(temp);
  //       } else {
  //         toast.error("Cannot load roles.");
  //         setRoleid([]);
  //       }
  //     })
  //     .catch((err) => {
  //       toast.error("Error occured");
  //       setRoleid([]);
  //     });
  // };
  if (roleid === undefined) {
    <Spinner />;
  }
  // const updateRole = (id) => {
  //   let res_data = {
  //     user_id: values.id,
  //     user_role_id: parseInt(id),
  //   };
  //   axios
  //     .post(`${config.APP_CONFIG}/Settings/UserToRoleMap/api`, res_data,{
  //       headers:{
  //         Authorization:userSessionContext.token
  //       }
  //     })
  //     .then((res) => {
  //       if (res.data.status_code === 200) {
  //         // loadRoles();
  //         toast.info("Successfully Updated Role to User");
  //       } else if (res.data.status_code === 401) {
  //         userSessionContext.handleLogout();
  //       } else {
  //         toast.error("Unable to Update Role");
  //       }
  //     })
  //     .catch((err) => {
  //       toast.error("Something went Wrong");
  //     });
  // };

  // const roles = () => {
  //   axios
  //     .get(`${config.APP_CONFIG}/api/userRoles`)
  //     .then((res) => {
  //       if (res.data && res.data.status_code && res.data.status_code === 200) {
  //         setRole(res.data.msg || []);
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

  // const Delete = (roleid, userid) => {
  //   axios
  //     .delete(
  //       `${config.APP_CONFIG}/Settings/UserToRoleMap/api/${userid}/${roleid}`,{
  //         headers:{
  //           Authorization:userSessionContext.token
  //         }
  //       }
  //     )
  //     .then((res) => {
  //       if (res.data.status_code === 200) {
  //         toast.info("deleted successfully");
  //       } else if (res.data.status_code === 401) {
  //         userSessionContext.handleLogout();
  //       } else if (res.data.status_code === 400) {
  //         toast.warn(res.data.msg);
  //       }else {
  //         toast.warn("Unable to Delete Role");
  //       }
  //     })
  //     .catch((err) => {
  //       toast.error("failed to delete role");
  //     });
  // };

  if (_data === undefined) {
    return <Spinner />;
  }

  // const onChangeEvent = (value, action) => {
  //   if (action.action === "select-option") {
  //     let new_role = value[value.length - 1];
  //     updateRole(new_role.value);
  //   } else if (action.action === "remove-value") {
  //     let removed_role = roleid.filter((x) => {
  //       return !value.map((x) => x.value).includes(x.value);
  //     });
  //     // getSpecificRoleId(removed_role[0].value)

  //     // console.log(removed_role[0].value)
  //     // console.log(specificRoleId[0].value)
  //     Delete(removed_role[0].value, values.id);
  //   } else {
  //     toast.error("Unable to Delete");
  //   }
  //   setRoleid(value);
  // };

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

  const handleSubmission = (e) => {
    e.preventDefault();

    if (validate) {
    let req_value = {
      id: values.id,
      firstName: firstName,
       companyId: companyId.value,
     // companyId: values.companyId,
      userCompanyName: "",
      // userCompanyName: values.userCompanyName,
      middleName: values.middleName,
      lastName: values.lastName,
      username: username,
      contactNumber1: values.contactNumber1,
      contactNumber2: values.contactNumber2||"",
      gender: values.gender,
      country: values.country||"",
      state: values.state||"",
      designation: values.designation,
      address1: values.address1,
      address2: values.address2 ||"",
      isVendor: 0,
      isLoginAllowed: parseInt(isLoginAllowed),
      isCustomer: 0,
      panNo: values.panNo,
    };

      // if ( isLoginAllowed === 0) {
      //   toast.warn("Please Choose  Either User Type");
      // } else {
        props.handleSubmit(req_value);

        // if (parseInt(isLoginAllowed) === 1) {
        //   props.step_handler("next");
        // } else {
        //   return null;
        // }
        
      
    }
  };

  return (
    <div className="userForm">
      <Form onSubmit={handleSubmission}>
        <Grid container>
          <Grid item xs={6}>
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
            {/* <Controls.Input
            label="Company Name"
            name="userCompanyName"
            value={values.userCompanyName}
            onChange={handleInputChange}
            required={true}
          /> */}
            {/* <Controls.Select
            label="Company Name"
            name="companyId"
            value={values.companyId}
            onChange={handleInputChange}
            options={companyList}
            required={true}
            error={errors.companyId}
          /> */}

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
              onKeyDown={(e) =>
                (e.keyCode === 69 || e.keyCode === 190 || e.keyCode === 187) &&
                e.preventDefault()
              }
              onChange={handleInputChange}
              error={errors.contactNumber1}
              required={true}
            />

            <Grid container spacing={1} style={{ margin: "0 10px" }}>
              {/* <Grid item xs={5}>
                {getSwitch(isCustomer, setIsCustomer, "Is Customer")}
              </Grid> */}
              {/* <Grid>
                {getSwitch(
                  isLoginAllowed,
                  setIsLoginAllowed,
                  "Is LoginAllowed"
                )}
              </Grid> */}
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Controls.Input
              name="middleName"
              label="Middle Name"
              value={values.middleName}
              onChange={handleInputChange}
            />

            <Controls.Input
              name="username"
              label="User Name"
              value={username || ""}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              error={errors.username}
              required={true}
            />
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
              onKeyDown={(e) =>
                (e.keyCode === 69 || e.keyCode === 190 || e.keyCode === 187) &&
                e.preventDefault()
              }
              onChange={handleInputChange}
            />
          </Grid>

          <div>
            <Controls.Button type="submit" text="Submit" />
            {/* <Controls.Button text="Reset" color="default" onClick={ResetForm} /> */}
          </div>
        </Grid>
      </Form>
    </div>
  );
}
