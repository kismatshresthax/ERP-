import React  from "react";
import { useForm, Form } from "../../components/home/useForm";
import { Grid} from "@material-ui/core";
import Controls from "../controls/Controls";
//import axios from "axios";
//import config from "../../utils/config";
//import UserSessionContext from "../../contexts/UserSessionContext";
import CompanyContext from "../../contexts/CompanyContext";
import "../../App.css";
//import { toast } from "react-toastify";

const initialFValues = {
  firstName: "",
  username: "",
  companyId: 0,
  contactNumber1: "",
  contactNumber2: "",
  country: "",
  state: "",
  address1: "",
  address2: "",
  isCustomer: "",
  panNo: "",
};

export default function MaterialClientForm(props) {
  //const userSessionContext = React.useContext(UserSessionContext);
  const companyContext = React.useContext(CompanyContext);
  const _data = props.data ||initialFValues;

  const validate = (fieldValues=values) => {

    let temp = { ...errors }
    if ('firstName' in fieldValues)
      temp.firstName = fieldValues.firstName
      ?fieldValues.firstName.length<101  
      ?fieldValues.firstName.match(/^[a-zA-Z0-9 !@#\$%\^\&*\)\(+=._-]+$/g)
        ? ""
          : "Invalid Data"
          : "Maximum 100 Characters"
          : "This field is required.";
  
    if ("contactNumber1" in fieldValues)
      temp.contactNumber1 = fieldValues.contactNumber1
        ? fieldValues.contactNumber1.length < 11
          ? ""
          : "maximum 10 Characters"
          : "This field is required.";

    if ("contactNumber2" in fieldValues)
      temp.contactNumber2 = fieldValues.contactNumber2.length < 11
          ? ""
          : "maximum 10 Characters"         

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
      ?fieldValues.address1.length<101 
      ?fieldValues.address1.match(/^[a-zA-Z0-9 !@#\$%\^\&*\)\(+=.,_-]+$/g)
      ? ""
        : "Invalid Data" 
        : "Maximum 100 characters"
      : "This field is required."

   

     setErrors({
      ...temp,
    });

    if (fieldValues === values)
    return Object.values(temp).every(x => x === "")
  
  };
  const { values, setValues, errors, setErrors, handleInputChange, ResetForm } =useForm(_data,true,validate);

 

  const handleSubmission = (e) => {
    e.preventDefault();
    if (validate()) {
      let req_value = {
        id: values.id,
        firstName: values.firstName,
        lastName: "",
        middleName: "",
        username:  values.firstName,
        userCompanyName: "",
        companyId: companyContext.company.id,
        contactNumber1: values.contactNumber1,
        contactNumber2: values.contactNumber2,
        country: values.country,
        state: values.state,
        address1: values.address1,
        address2: values.address2,
        isCustomer: 1,
        panNo: values.panNo,
      };
      props.handleSubmit(req_value);
      ResetForm();
    }
  };

  return (
    <Form onSubmit={handleSubmission}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name="firstName"
            label="Organization Name"
            value={values.firstName}
            onChange={handleInputChange}
            error={errors.firstName}
            required={true}
          />
          <Controls.Input
            label="Pan No."
            type="number"
            name="panNo"
            onKeyDown={(e) =>
              (e.keyCode === 69 || e.keyCode === 190 || e.keyCode === 187) &&
              e.preventDefault()
            }
            value={values.panNo}
            onChange={handleInputChange}
            error={errors.panNo}
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
            label="Contact Number 1 "
            type="number"
            name="contactNumber1"
            onKeyDown={(e) =>
              (e.keyCode === 69 || e.keyCode === 190 || e.keyCode === 187) &&
              e.preventDefault()
            }
            value={values.contactNumber1}
            onChange={handleInputChange}
            error={errors.contactNumber1}
            required={true}
          />
        </Grid>
        <Grid item xs={6}>         
        <Controls.Input
            name="country"
            label="country(optional)"
            value={values.country}
            onChange={handleInputChange}
            error={errors.country}
          />
          <Controls.Input
            name="state"
            label="state(optional)"
            value={values.state}
            onChange={handleInputChange}
            error={errors.state}
          />
          <Controls.Input
            name="address2"
            label="Address 2(optional)"
            value={values.address2}
            onChange={handleInputChange}
            error={errors.address2}
          />
          <Controls.Input
            name="contactNumber2"
            type="number"
            label="Contact Number 2(optional)"
            onKeyDown={(e) =>
              (e.keyCode === 69 || e.keyCode === 190 || e.keyCode === 187) &&
              e.preventDefault()
            }
            value={values.contactNumber2}
            onChange={handleInputChange}
            error={errors.contactNumber2}
          />
        </Grid>

        <div>
          {_data.id? (
            <Controls.Button type="submit" text="Update" />
          ) : (
            <div>
              <Controls.Button type="submit" text="Submit" />
             
              <Controls.Button
                text="Reset"
                color="default"
                onClick={ResetForm}
              />
            </div>
          )}
        </div>
      </Grid>
    </Form>
  );
}


