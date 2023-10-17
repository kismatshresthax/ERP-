import React, { useState } from "react";
import { Grid } from "@material-ui/core";
const initialvalue = {
  firstName: "",
  companyId: 0,
  middleName: "",
  lastName: "",
  username: "",
  contactNumber1: "",
  contactNumber2: "",
  gender: "",
  country: "",
  state: "",
  designation: "",
  address1: "",
  address2: "",
  panNo: "",
};
export default function ViewVendorDetailForm(props) {
  const Data = props.data || initialvalue;
  const [values, setvalues] = useState(Data);
  return (
    <div>
      <Grid container>
        <Grid item xs={6}>
          <div className="row">
            <div className="col-md-4">
              <b>Full Name</b>
            </div>
            <div className="col-md-8">: {values.firstName}</div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <b>Pan No</b>
            </div>
            <div className="col-md-8">: {values.panNo}</div>
          </div>
          <div className='row'>
            <div className='col-md-4'>
            <b>Contact Number 1</b>
            </div>
            <div className='col-md-8'>
            :  {values.contactNumber1}
            </div>
          </div>
          <div className='row'>
            <div className='col-md-4'>
            <b>Contact Number 2</b>
            </div>
            <div className='col-md-8'>
            : {values.contactNumber2}
            </div>
          </div>
        </Grid>
        <Grid item xs={6}>          
          <div className="row">
            <div className="col-md-4">
              <b>Country</b>
            </div>
            <div className="col-md-8">: {values.country}</div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <b>State</b>
            </div>
            <div className="col-md-8">: {values.state}</div>
          </div>
          <div className='row'>
            <div className='col-md-4'>
            <b>Address 1</b> 
            </div>
            <div className='col-md-8'>
            : {values.address1}
            </div>
          </div>
          <div className='row'>
            <div className='col-md-4'>
            <b>Address 2</b> 
            </div>
            <div className='col-md-8'>
            : {values.address2}
            </div>
          </div>          
        </Grid>
      </Grid>
    </div>
  );
}
