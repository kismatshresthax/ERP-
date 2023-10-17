import React from "react";
import { Grid } from "@material-ui/core";
import { useForm, Form } from "../home/useForm";
import Controls from "../controls/Controls";

import Spinner from "../../utils/spinner";
import CompanyContext from "../../contexts/CompanyContext";
import "../../App.css";
import { toast } from "react-toastify";
import UserSessionContext from "../../contexts/UserSessionContext";
import config from "../../utils/config";
import axios from "axios";

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
  const token = props.token;
  const userSessionContext = React.useContext(UserSessionContext);
  //const companyContext = React.useContext(CompanyContext);
  const _data = props.data || initialFValues;

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("name" in fieldValues)
      temp.name = fieldValues.name
        ? fieldValues.name.length < 101
          ? ""
          : "maximum 100 Characters"
        : "This field is required.";

    if ("address" in fieldValues)
      temp.address = fieldValues.address ? "" : "This field is required.";

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

  //  const handleLogOut = () => {
  //   window.localStorage.removeItem("ERP_TOKEN");
  //   window.localStorage.removeItem("user");
  //  // setToken(false);
  //  // setUsers("");
  // };
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
        companyId: values.id,
        calendarType: values.calendarType,
      };
      addCompany(req_value);
      ResetForm();
    }
  };

  const addCompany = (data) => {
    axios
      .post(`${config.APP_CONFIG}/Companies/Company`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        if (res.data.status_code === 200) {
          //loadCompanies();
          toast.success(res.data.msg);
          props.step_handler("next");
        } else if (res.data.status_code === 401) {
          // handleLogout();
          window.localStorage.removeItem("ERP_TOKEN");
          window.localStorage.removeItem("user");
        } else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
        }
      })
      .catch((err) => {
        toast.error("Something went Wrong");
      });
    // props.step_handler("next");
  };

  return (
    <Form onSubmit={handleSubmission} style={{display: "flex", height: "100vh"}}>
      <div className="card" style={{padding: "20px", maxWidth: "500px", margin: "auto"}}>
        <Grid container>
          <Grid item xs={12}>
            <Controls.Input
              name="name"
              label="Company Name"
              value={values.name}
              onChange={handleInputChange}
              error={errors.name}
              style={{width: "100%", margin: "8px 0"}}
              required={true}
            />
            <Controls.Input
              name="address"
              label="Address"
              value={values.address}
              onChange={handleInputChange}
              error={errors.address}
              style={{width: "100%", margin: "8px 0"}}
              required={true}
            />
          </Grid>

          <Grid item xs={12}>
            <Controls.Input
              name="phone_no"
              label="Phone No."
              type="number"
              value={values.phone_no}
              onChange={handleInputChange}
              error={errors.phone_no}
              style={{width: "100%", margin: "8px 0"}}
              required={true}
            />
            <Controls.Input
              label="Pan No."
              name="panNo"
              type="number"
              value={values.panNo}
              onChange={handleInputChange}
              error={errors.panNo}
              style={{width: "100%", margin: "8px 0"}}
            />
          </Grid>

          <div>
            <Controls.Button type="submit" text="Submit" style={{margin: "8px 0 0"}}/>
          </div>
        </Grid>
      </div>
    </Form>
  );
}
