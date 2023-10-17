import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { useForm, Form } from "../home/useForm";
import Controls from "../controls/Controls";
import axios from "axios";
import config from "../../utils/config";
import UserSessionContext from "../../contexts/UserSessionContext";
import { toast } from "react-toastify";
import Spinner from "../../utils/spinner";
const initialFValues = {
  accountNumber: "",
  bankName: "",
  companyName: "",
  remarks: "",
  companyId: "",
};

export default function BankForm(props) {
  const validate = (fieldValues = values) => {

    let temp = { ...errors };

    if ("bankName" in fieldValues)
      temp.bankName = fieldValues.bankName
      ? fieldValues.bankName.length < 101
     
      ? ""
   
        : "Maximum 100 characters"
        : "This field is required.";
  
    if ("accountNumber" in fieldValues)
      temp.accountNumber =fieldValues.accountNumber
      ?fieldValues.accountNumber.length < 26
      ?fieldValues.accountNumber.match(/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g)
      ? ""
        : "Invalid Data"
        : "Maximum 25 characters ."
        : "This field is required.";
         
    if ("companyId" in fieldValues)
      temp.companyId =
        fieldValues.companyId.length !== 0 ? "" : "This field is required.";

    if ("remarks" in fieldValues)
      temp.remarks = fieldValues.remarks
        ? fieldValues.remarks.length < 251
  
        ? ""
    
          : "Maximum 250 characters"
        : "This field is required.";
    setErrors({
      ...temp,
    });
    if (fieldValues === values) return Object.values(temp).every((x) => x === "");
  };

  
  // (/^$|.+@.+..+/).test(fieldValues.remarks)
  //   const validate_data = (fieldValues = values) => {

  //     let check_fields = [
  //         {
  //             name: "bankName",
  //             msg:"please enter BankName"
  //         },
  //         {
  //             name: "accountNumber",
  //             msg:"please enter AccountNumber",
  //             minlength:12,
  //             minlengthmsg:"AccountNumber must Greater than 12 Characters"
  //         },

  //         {
  //             name: "companyId",
  //             msg:"please enter companyId"
  //         },
  //         {
  //           name: "remarks",
  //           msg:"please enter Remarks"
  //       },
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
  //          else if (_checks['minlength'] && (fieldValues[_checks["name"]]).length < _checks['minlength'])  {
  //                                toast.error(_checks["minlengthmsg"])
  //                              return false
  //                            }

  //     }
  //     return true

  //  }
  const userSessionContext = React.useContext(UserSessionContext);

  const _data = props.data || initialFValues;
  const { values, errors, setErrors, handleInputChange, ResetForm } =useForm(_data,true,validate);

  const [companyList, setCompanyList] = useState();

  useEffect(async() => {
   await axios
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
            id: item.id,
            title: item.name,
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

  if (companyList === undefined) {
    return <Spinner />;
  }

  const handleSubmission = (e) => {
    e.preventDefault();
    if (validate()) {
      let req_value = {
        id: values.id,
        accountNumber: values.accountNumber,
        bankName: values.bankName,
        remarks: values.remarks,
        companyId: values.companyId,
        createdBy: localStorage.getItem('user'),
      };
      props.handleSubmit(req_value);
      ResetForm();
    }
  };
  return (
    <Form onSubmit={handleSubmission} >
      {/* // return <Form onSubmit ={props.handleSubmit}></Form> */}
      <Grid container spacing={0.5}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          {_data.id ? (
            <Controls.Input
              name="accountNumber"
              label="Account Number"
              value={values.accountNumber}
              inputProps={{ readOnly: true }}
              disabled={true}
            />
          ) : (
            <Controls.Input
            required
              name="accountNumber"
              label="Account Number"
              value={values.accountNumber}
              onKeyDown={(e) =>
                (e.keyCode === 190 || e.keyCode === 187||e.keyCode === 107) && e.preventDefault()
              }
              onChange={handleInputChange}
              error={errors.accountNumber}
            />
          )}
          <Controls.Input
            required
            label="Bank Name"
            name="bankName"
            id="bankName"
            value={values.bankName}
            onChange={handleInputChange}
            error={errors.bankName}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Controls.Select
            label="Company Name"
            name="companyId"
            value={values.companyId}
            onChange={handleInputChange}
            options={companyList}
            error={errors.companyId}
          />

          <Controls.Input
            label="Remarks"
            name="remarks"
            value={values.remarks}
            onChange={handleInputChange}
            error={errors.remarks}
            required
          />
        </Grid>

        <div>
          {_data.id ? (
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
