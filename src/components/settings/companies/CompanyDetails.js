
import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import UserSessionContext from "../../../contexts/UserSessionContext";
import config from "../../../utils/config";

import axios from "axios";
import Spinner from "../../../utils/spinner";
import {toast} from 'react-toastify';
import { useForm, Form } from "../../../components/home/useForm";
export default function CompanyDetails(props) {
  const userSessionContext = React.useContext(UserSessionContext);
  // const companyContext = React.useContext(CompanyContext);
  const _data = props.data || [];
  //const { values, setValues, handleInputChange, ResetForm }  = useForm(_data);
  const [companyDetails, setCompanyDetails] = useState();


  useEffect(()=> {
    loadCompanieById();

  },[])

  const loadCompanieById = async() => {
   await axios
      .get(`${config.APP_CONFIG}/Companies/Company/${_data.id}`
      , {
        headers: {
          Authorization: userSessionContext.token,
        },
      }
      )
      .then((res) => {
        if (res.data.status_code === 401) {
          userSessionContext.handleLogOut();
        } else if (
          res.data &&
          res.data.status_code &&
          res.data.status_code === 200
        ) {
          setCompanyDetails(res.data.msg || []);
        } else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
          setCompanyDetails([]);
        } 
        else {
          toast.error("Error Occurred");
          setCompanyDetails([]);
        }
      })
      .catch((err) => {
        toast.error("Something went Wrong");
        setCompanyDetails([]);
      });
  };

  if (companyDetails === undefined) {
    return <Spinner />;
  }

  return (
    <Form>
 
      <Grid container>
      <Grid item xs={6}>
          <div className="row">
            <div className="col-md-4">
              <b>Company Name</b>
            </div>
            <div className="col-md-8">: {companyDetails[0].name}</div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <b>Address</b>
            </div>
            <div className="col-md-8">: {companyDetails[0].address}</div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <b>Phone No.</b>
            </div>
            <div className="col-md-8">: {companyDetails[0].phone_no}</div>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="row">
            <div className="col-md-4">
              <b>Pan No.</b>
            </div>
            <div className="col-md-8">: {companyDetails[0].panNo}</div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <b>Calendar Type</b>
            </div>
            <div className="col-md-8">: {companyDetails[0].calenderType}</div>
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
