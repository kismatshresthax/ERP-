import React from "react";
import { Grid } from "@material-ui/core";
import { useForm, Form } from "../../home/useForm";
import Controls from "../../controls/Controls";

//import UserSessionContext from "../../../contexts/UserSessionContext";
//import { toast } from "react-toastify";
import Spinner from "../../../utils/spinner";
import CompanyContext from "../../../contexts/CompanyContext";
import "../../../App.css";


const initialFValues = {
  name: "",
  address: "",
  phone_no: "",
  panNo: "",
  calendarType: "English",
};

const calendarType = [
  { id: "Nepali", title: "Nepali" },
  { id: "English", title: "English" },
];

export default function CompanyForm(props) {
  //const userSessionContext = React.useContext(UserSessionContext);
  const companyContext = React.useContext(CompanyContext);
  const _data = props.data || initialFValues;

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("name" in fieldValues)
      temp.name = fieldValues.name
        ? fieldValues.name.length < 151
        ?fieldValues.name.match(/^[a-zA-Z0-9 !@#\$%\^\&*\)\(+=._-]+$/g)
        ? ""
          : "Invalid Data"
          : "maximum 150 Characters"
        : "This field is required.";
    if ("address" in fieldValues)
      temp.address = fieldValues.address 
      ?fieldValues.address.match(/^[a-zA-Z0-9 !@#\$%\^\&*\)\(+=.,_-]+$/g)
      ? ""
        : "Invalid Data"
      : "This field is required.";

    if ("phone_no" in fieldValues)
      temp.phone_no = fieldValues.phone_no
        ? fieldValues.phone_no.length < 11
          ? ""
          : "maximum 10 Characters"
        : "This field is required.";
   
    if ("panNo" in fieldValues)
      temp.panNo = fieldValues.panNo
        ? fieldValues.panNo.length < 10
          ? ""
          : "maximum 9 Characters"
        : "";
    setErrors({
      ...temp,
    });
    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, handleInputChange, ResetForm, errors, setErrors } = useForm(
    _data,
    true,
    validate
  );
  const handleSubmission = (e) => {
    e.preventDefault();
    if (validate()) {
      let req_value = {
        id: values.id,
        name: values.name,
        address: values.address,
        phone_no: values.phone_no,
        panNo: values.panNo,
        logo: "logo",
        calendarType: values.calendarType,
      };
      props.handleSubmit(req_value);
      ResetForm();
    }
  };

  if (companyContext.company.id === undefined) {
    return <Spinner />;
  }


  

  return (
   
    <Form onSubmit={handleSubmission}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name="name"
            label="Company Name"
            value={values.name}
            onChange={handleInputChange}
            error={errors.name}
           
            required={true}
          />
          <Controls.Input
            name="address"
            label="Address"
            value={values.address}
            onChange={handleInputChange}
            error={errors.address}
            required={true}
          />
          <Controls.Input
            name="phone_no"
            label="Phone No."
            type="number"
            value={values.phone_no}
            onKeyDown={(e) =>
              (e.keyCode === 69 || e.keyCode === 190 || e.keyCode === 187) &&
              e.preventDefault()
            }
            onChange={handleInputChange}
            error={errors.phone_no}
            required={true}
          />
        </Grid>

        <Grid item xs={6}>
          <Controls.Input
            label="Pan No."
            name="panNo"
            type="number"
            value={values.panNo}
            onKeyDown={(e) =>
              (e.keyCode === 69 || e.keyCode === 190 || e.keyCode === 187) &&
              e.preventDefault()
            }
            onChange={handleInputChange}
            error={errors.panNo}
          />
          {/* {<p className="helper-text">enter 9 digits pan no.</p>} */}
          <Controls.RadioGroup
            name="calendarType"
            label="Calendar Type"
            value={values.calendarType}
            onChange={handleInputChange}
            items={calendarType}
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
   //</MuiThemeProvider> 
  );
}
