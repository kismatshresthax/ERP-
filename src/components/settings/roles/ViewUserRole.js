import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { useForm, Form } from "../../../components/home/useForm";
import { toast } from "react-toastify";
//import Spinner from "../../../utils/spinner";
import UserSessionContext from "../../../contexts/UserSessionContext";


import config from "../../../utils/config";

import axios from "axios";
const initialFValues = {
  firstName: "",
  companyId: 0,
  middleName: "",
  lastName: "",
  designation: "",
  userCompanyName: "",
  role: "",
};

export default function ViewUserRole(props) {
  const userSessionContext = React.useContext(UserSessionContext);
  const _data = props.data || initialFValues;
  const { values } = useForm(_data);
  //const [userToRole, setUserToRole] = useState();
  const [roleid, setRoleid] = useState();
  //const [role, setRole] = useState([]);


  useEffect(() => {
    getSpecificRoleId();
  }, []);

 const getSpecificRoleId = async() => {
  await  axios.get(`${config.APP_CONFIG}/Settings/UserToRoleMap/api/${_data.id}`,{
        headers:{
          Authorization:userSessionContext.token
        }
      })
      .then((res) => {
        if (res.data && res.data.status_code && res.data.status_code === 200) {
          // setRoleid(res.data.msg.map(x=>({label: x.roleName, value: x.roleId})))

          let temp = res.data.msg.map((x) => ({
            label: x.roleName,
            value: x.roleId,
          }));
          setRoleid(temp);
        } 
       else if(res.data && res.data.status_code && res.data.status_code === 400){
          toast.warn(res.data.msg);
        }
       else if(res.data && res.data.status_code && res.data.status_code === 401){
          userSessionContext.handleLogout();
        }
       else {
          toast.error("Couldn't load roles.");
          setRoleid([]);
        }
      })
      .catch((err) => {
        toast.error("Error occured");
        setRoleid([]);
      });
  };

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        let req_value = {
          id: values.id,
          firstName: values.firstName,
          companyId: values.companyId,
          middleName: values.middleName,
          lastName: values.lastName,
          designation: values.designation,
          isLoginAllowed: values.isLoginAllowed,
        };
        props.handleSubmit(req_value);
      }}
    >
      <Grid container>
        <Grid item xs={6}>
          <div className="row">
            <div className="col-md-4">
              <b>Full Name</b>
            </div>
            <div className="col-md-8">
              : {values.firstName} {values.middleName} {values.lastName}
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <b>Company</b>
            </div>
            <div className="col-md-8">: {values.companyName}</div>
          </div>
          {/* <div className="row">
            <div className="col-md-4">
              <b>Company</b>
            </div>
            <div className="col-md-8">: {values.companyName}</div>
          </div> */}
        </Grid>
        <Grid item xs={6}>
          <div className="row">
            <div className="col-md-4">
              <b>Designation</b>
            </div>
            <div className="col-md-8">: {values.designation}</div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <b>Role</b>
            </div>
            <div className="col-md-8">: {roleid?roleid.map((x)=> { return <span>{x.label}/ </span>
            }): "no role are assigned"
          
          }</div>
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
