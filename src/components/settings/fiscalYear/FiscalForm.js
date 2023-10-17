import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { useForm, Form } from "../../../components/home/useForm";
import Controls from "../../controls/Controls";
import axios from "axios";
import config from "../../../utils/config";
import UserSessionContext from "../../../contexts/UserSessionContext";
import { toast } from "react-toastify";
import CompanyContext from "../../../contexts/CompanyContext";
import { format } from "date-fns";
import { Switch } from "@material-ui/core";
const initialFValues = {
  fiscalYear: "",
  startDate: new Date(),
  endDate: new Date(),
  isActive: 0,
  companyId: 0,
};
export default function COAForm(props) {
  const userSessionContext = React.useContext(UserSessionContext);
  const companyContext = React.useContext(CompanyContext);
  const [fiscal, setFiscal] = useState("");
  const _data = props.data || initialFValues;

  var adbs = require("ad-bs-converter");

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    // if ("fiscalYear" in fieldValues) {
    //   temp.fiscalYear = fieldValues.fiscalYear ? "" : "This field is required";
    // }
    temp.fiscalYear = fieldValues.fiscalYear
        ? ""
       
      : "This field is required.";

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

  const [isActive, setIsActive] = useState(0);
  useEffect(async() => {
   await axios
      .get(`${config.APP_CONFIG}/Setting/FiscalYear/api`, {
        headers: {
          Authorization: userSessionContext.token,
        },
      })
      .then((res) => {
        if (res.data.status_code === 401) {
          userSessionContext.handleLogOut();
        } else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
        } else if (res.data.status_code === 200) {
          // console.log(res.data.msg);
          const fis_year = res.data.msg.filter((x) => {
            if (x.isActive === 1) {
              return true;
            }
            return false;
          });

          setFiscal(fis_year);
        } else {
          toast.error("error");
        }
      });
  }, []);

  const handleSubmission = (e) => {
    e.preventDefault();

    if (fiscal.length > 0) {
      toast.warn("Already Active Fiscal Year Exists");
    } else if (
      format(values.startDate, "yyyy-MM-dd HH:mm:ss") >
      format(values.endDate, "yyyy-MM-dd HH:mm:ss")
    ) {
      toast.warn("StartDate Greater than End Date");
    } else {
      if (validate()) {
        let req_value = {
          fiscalYear: values.fiscalYear,
          startDate: format(values.startDate, "yyyy-MM-dd HH:mm:ss"),
          endDate: format(values.endDate, "yyyy-MM-dd HH:mm:ss"),
          isActive: parseInt(isActive),
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
        checked={key === 1 ? true : false}
        defaultValue="on"
        color="primary"
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

  const start_date_nepali = format(new Date(values.startDate), "yyyy/MM/dd ");
  const end_date_nepali = format(new Date(values.endDate), "yyyy/MM/dd ");

  const nepalidate_start = adbs.ad2bs(start_date_nepali);
  const nepalidate_end = adbs.ad2bs(end_date_nepali);
  const miti_start =
    nepalidate_start.en["year"] +
    "/" +
    nepalidate_start.en["month"] +
    "/" +
    nepalidate_start.en["day"];
  const miti_end =
    nepalidate_end.en["year"] +
    "/" +
    nepalidate_end.en["month"] +
    "/" +
    nepalidate_end.en["day"];

  return (
    <Form onSubmit={handleSubmission}>
      {/* <Grid container> */}
      <div className="row">
        <Grid item xs={4} spacing={5}>
          <Controls.Input
            name="fiscalYear"
            type="text"
            label="Fiscal Year"
            value={values.fiscalYear}
            onKeyDown={(e) =>
              (e.keyCode === 190 || e.keyCode === 187) && e.preventDefault()
            }
            onChange={handleInputChange}
            error={errors.fiscalYear}
            required={true}
          />
        </Grid>
        <div className="col-sm-4">
          <Controls.DatePicker
            name="startDate"
            label="Start Date"
            value={values.startDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-sm-4">
          <Controls.DatePicker
            disabled = {true}
            label="Start Date Nepali"
            value={miti_start}
          />
        </div>

        <div className="col-sm-4">
          <div>
            <label htmlFor="text" style={{ padding: "10px" }}>
              Is Active
            </label>
            {getCheckBox(isActive, setIsActive)}
          </div>
        </div>
        <div className="col-sm-4">
          <Controls.DatePicker
            name="endDate"
            label="End Date"
            value={values.endDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-sm-4">
          <Controls.DatePicker
            disabled = {true}
            label="End Date Nepali"
            value={miti_end}
          />
        </div>
        <div className="col-sm-12">
          <Controls.Button type="submit" text="Submit" />
        </div>
      </div>

      {/* </Grid> */}
    </Form>
  );
}
