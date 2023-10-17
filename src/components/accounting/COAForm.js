import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { useForm, Form } from "../home/useForm";
import Controls from "../controls/Controls";
import axios from "axios";
import Select from "react-select";
import config from "../../utils/config";
import UserSessionContext from "../../contexts/UserSessionContext";
import { toast } from "react-toastify";
import Spinner from "../../utils/spinner";
import { Switch } from "@material-ui/core";
import CompanyContext from "../../contexts/CompanyContext";
const initialFValues = {
  codeName: "",
  name: "",
  parentId: "",
};

export default function COAForm(props) {
  const userSessionContext = React.useContext(UserSessionContext);
  const companyContext = React.useContext(CompanyContext);
  const _data = props.data || initialFValues;

  const [Name, setName] = useState([]);
  const [isVisible, setIsVisible] = useState(1);
  const [isActive, setIsActive] = useState(1);
  const [parentId, setParentid] = useState("");

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("name" in fieldValues){
      temp.name = fieldValues.name
      ? fieldValues.name.match(/^[a-zA-Z0-9 !@#\$%\^\&*\)\(+=._-]+$/g)
      ? ""
      : "Invalid Data"
      :"This field is required";
    }

    if ("codeName" in fieldValues){
      temp.codeName = fieldValues.codeName  
      ? fieldValues.codeName.match(/^[a-zA-Z0-9 !@#\$%\^\&*\)\(+=._-]+$/g)
      ? ""
      : "Invalid Data" 
      : "This field is required.";
    } 

    
    // if ("parentId" in fieldValues)
    // temp.parentId = fieldValues.parentId ?"" : "This field is required.";


    setErrors({
      ...temp,
    });
    // eslint-disable-next-line eqeqeq
    return Object.values(temp).every((x) => x == "");
  };

  const { values, errors, setErrors, handleInputChange, ResetForm } = useForm(
    _data,
    true,
    validate
  );

  // const [companyList, setCompanyList] = useState();
  useEffect(() => {
    loadParentname();
  }, []);

  const loadParentname = async () => {
   await axios
      .get(`${config.APP_CONFIG}/Account/COA/api`, {
        headers: { Authorization: userSessionContext.token },
      })
      .then((res) => {
        if (res.data && res.data.status_code && res.data.status_code === 200) {
          let temp = res.data.msg.map((x, index) => ({
            label: x.coaname,
            value: x.id,
          }));
          temp = [{ value: 0, label: "Root" }].concat(temp);
          setName(temp);
        } else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
         
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogOut();
        } else {
          toast.error("Error Occurred");
          setName([]);
        }
      })
      .catch((err) => {
        toast.error("Something Went Wrong");
        setName([]);
      });
  };
  // console.log(Name);
  if (Name === undefined) {
    return <Spinner />;
  }

  const handleSubmission = (e) => {
    e.preventDefault();
    if (validate()) {
      if (parentId["value"] === undefined) {
        let req_value = {
          id: values.id,
          name: values.name,
          codeName: values.codeName,
          parentId: 0,
          isactive: parseInt(isActive),
          isvisible: parseInt(isVisible),
          companyId: companyContext.company.id,
        };
        props.handleSubmit(req_value);
        ResetForm();
      } else {
        let req_value = {
          id: values.id,
          name: values.name,
          codeName: values.codeName,
          parentId: parentId["value"],
          isactive: parseInt(isActive),
          isvisible: parseInt(isVisible),
          companyId: companyContext.company.id,
        };
        props.handleSubmit(req_value);
        ResetForm();
      }
    }
  };

  const getCheckBox = (key, callback) => {
    return (
      <Switch
        color="primary"
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
    );
  };
  return (
    <Form onSubmit={handleSubmission}>
      {/* // return <Form onSubmit ={props.handleSubmit}></Form> */}
      <Grid container spacing={2} className="coatable-popup">
      <Grid item xs={12} sm={12} md={6} lg={6}>
          <Controls.Input
            name="name"
            type="text"
            label="Ledger Name"
            value={values.name}
            onKeyDown={(e) =>
              (e.keyCode === 190 || e.keyCode === 187) && e.preventDefault()
            }
            onChange={handleInputChange}
            error={errors.name}
            required={true}
          />

          <Controls.Input
            name="codeName"
            type="text"
            label="codename"
            value={values.codeName}
            onKeyDown={(e) =>
              (e.keyCode === 190 || e.keyCode === 187) &&
              e.preventDefault()
            }
            onChange={handleInputChange}
            error={errors.codeName}
             required={true}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          {/* <Controls.Select
            label="CompanyName"
            name="companyId"
            value={values.companyId}
            onChange={handleInputChange}
            options={companyList}
            error={errors.companyId} */}
          <Select
            className="col-sm-10"
            type="text"
            placeholder={"Select Parent Ledger...."}
            options={Name}
            value={parentId}
            styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
            menuPortalTarget={document.body}
            onChange={setParentid}
            error={errors.parentId}
          />

          {/* // /> */}
          <div className="row">
            <div
              className="col-sm-5"
              style={{ padding: "8px 16px", marginTop: "8px" }}
            >
              <label htmlFor="text" className="col-sm-5 col-form-label">
                Is Active
              </label>
              {getCheckBox(isActive, setIsActive)}
            </div>
            <div
              className="col-sm-5"
              style={{ padding: "8px 16px", marginTop: "8px" }}
            >
              <label htmlFor="text" className="col-sm-5 col-form-label">
                Is Visible
              </label>
              {getCheckBox(isVisible, setIsVisible)}
            </div>
          </div>
        </Grid>

        <div>
          <Controls.Button type="submit" text="Submit" />

          {/* <Controls.Button text="Reset" color="default" onClick={ResetForm} /> */}
        </div>

        {/* </div> */}
      </Grid>
    </Form>
  );
}
