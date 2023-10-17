import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { useForm, Form } from "../../components/home/useForm";
import Controls from "../controls/Controls";
import axios from "axios";
import config from "../../utils/config";
import UserSessionContext from "../../contexts/UserSessionContext";
import { toast } from "react-toastify";
import Spinner from "../../utils/spinner";
const initialFValues = {
  name: "",
  amount: "",
  ledgerName: "",
  companyId: "",
};

export default function TaxForm(props) {
  const userSessionContext = React.useContext(UserSessionContext);
  const _data = props.data || initialFValues;
 
  const validate = (fieldValues = values) => {

    let temp = { ...errors };
    if ("name" in fieldValues)
      temp.name = fieldValues.name  
      ? fieldValues.name.match(/^[a-zA-Z0-9 !@#\$%\^\&*\)\(+=._]+$/g)
      ? ""
      : "Invalid Data"
      :"This field is required";

    if ("amount" in fieldValues)
      temp.amount = fieldValues.amount
        ? /^\d+(\.\d{1,4})?$/.test(fieldValues.amount)
          ? ""
          : "Please Enter Integer"
        : "This field is required.";
  
    if ("ledgerName" in fieldValues)
      temp.ledgerName = fieldValues.ledgerName  
      ? fieldValues.ledgerName.match(/^[a-zA-Z0-9 !@#\$%\^\&*\)\(+=._-]+$/g)
      ? ""
      : "Invalid Data"
      :"This field is required";

    if ("companyId" in fieldValues)
      temp.companyId =
        fieldValues.companyId.length !== 0 ? "" : "This field is required.";

    setErrors({
      ...temp,
    });
    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, errors, setErrors, handleInputChange, ResetForm } = useForm(
    _data,
    true,
    validate
  );

  const [companyList, setCompanyList] = useState();

  const handleSubmission = (e) => {
    e.preventDefault();
    if (validate()) {
      let req_value = {
        id: values.id,
        name: values.name,
        amount: parseFloat(values.amount),
        ledgerName: values.ledgerName,
        companyId: values.companyId,
      };
      props.handleSubmit(req_value);
      ResetForm();
    }
  };
  // const validate_data = (fieldValues = values) => {

  //     let check_fields = [
  //         {
  //             name: "name",
  //             msg:"please enter TaxName"
  //         },
  //         {
  //             name: "ledgerName",
  //             msg:"please enter ledgerName"
  //         },
  //         {
  //             name: "amount",
  //             msg:"please enter amount"
  //         },
  //         {
  //             name: "companyId",
  //             msg:"please enter companyId"
  //         },
  //     ]
  //     for(const checks in check_fields)
  //     {
  //          console.log(checks)
  //         console.log(fieldValues)
  //         let _checks = check_fields[checks]
  //         if (fieldValues[_checks["name"]] === "" || fieldValues[_checks["name"]] === undefined)
  //          {
  //             toast.error(_checks["msg"])
  //             return false
  //          }
  //     }
  //     return true

  //  }

  useEffect(async() => {
    await axios
      .get(`${config.APP_CONFIG}/Companies/Company`)

      .then((res) => {
        if (res.data.status_code === 401) {
          userSessionContext.handleLogOut();
        } else if (res.data.status_code === 200) {
          let companyList = res.data.msg.map((item) => ({
            id: item.id,
            title: item.name,
          }));

          // companyList = [{ id: 0, title: 'Select' }].concat(companyList);
          setCompanyList(companyList);
        } else {
          toast.error("error");
          setCompanyList([]);
        }
      })
      .catch((err) => {
        setCompanyList([]);
      });
  }, []);

  if (companyList === undefined) {
    return <Spinner />;
  }

  return (
    <Form >
      <Grid container>
      <Grid item xs={12} sm={12} md={6} lg={6}>
          <Controls.Input
            name="name"
            label="TaxName"
            value={values.name}
            onChange={handleInputChange}
            error={errors.name}
           required={true}
          />
          <Controls.Input
            label="LedgerName"
            name="ledgerName"
            value={values.ledgerName}
            onChange={handleInputChange}
            error={errors.ledgerName}
            required={true}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Controls.Input
            id="taxrate"
            label="Tax rate"
            type="number"
            name="amount"
            step="0.1"
            onKeyDown={(e) =>
              (e.keyCode === 69 || e.keyCode === 187) && e.preventDefault()
            }
            value={values.amount}
            onChange={handleInputChange}
            error={errors.amount}
            required={true}
          />

          <Controls.Select
            label="CompanyName"
            name="companyId"
            value={values.companyId}
            onChange={handleInputChange}
            options={companyList}
            error={errors.companyId}
            required={true}
          />
        </Grid>

        <div>
          {_data.id ? (
            <Controls.Button type="submit" text="Update" />
          ) : (
            <div>
              <Controls.Button type="submit" text="Submit" onClick={handleSubmission} />

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
