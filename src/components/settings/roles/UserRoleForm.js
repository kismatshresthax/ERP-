import React, {useState,  useEffect } from "react";
import { Grid } from "@material-ui/core";
import { useForm, Form } from "../../home/useForm";
import Controls from "../../controls/Controls";
import axios from "axios";
import config from "../../../utils/config";
import UserSessionContext from "../../../contexts/UserSessionContext";
import { toast } from "react-toastify";
import Spinner from "../../../utils/spinner";
import CompanyContext from "../../../contexts/CompanyContext";
const initialFValues = {
 
  name: "",
  companyId: "",
};

export default function UserRoleForm(props) {
  const userSessionContext = React.useContext(UserSessionContext);
  const companyContext = React.useContext(CompanyContext);
console.log(props.data)
  const _data = props.data || initialFValues;
  console.log(_data)
  const [companyList, setCompanyList] = useState();
 
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("name" in fieldValues)
    temp.name = fieldValues.name
     ?fieldValues.name.length<101
     ?fieldValues.name.match(/^[a-zA-Z0-9 !@#\$%\^\&*\)\(+=._]+$/g)
     ? ""
       : "Invalid Data"  
      :"Maximum 100 Characters"
    : "This field is required.";
    if ("companyId" in fieldValues)
    temp.companyId = fieldValues.companyId.length !== 0 ? "" : "This field is required.";
    setErrors({
      ...temp,
    });
    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };
 
  const {values, errors, setErrors, handleInputChange, ResetForm  } = useForm(_data,true ,validate);
  useEffect(() => {
   axios
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
  if (companyContext.company.id === undefined) {
    return <Spinner />;
  }
  const handleSubmission = (e) => {
    e.preventDefault();
    if (validate()) {
      let req_value = {
        id: values.id,
        name: values.name,
       
     companyId: values.companyId,
      };
      props.handleSubmit(req_value);
      ResetForm();
    }
  };
  return (
    <Form
      onSubmit={handleSubmission } >
      {/* // return <Form onSubmit ={props.handleSubmit}></Form> */}
      <Grid container>
        <Grid item xs={6}>
        
           <Controls.Select
           label="Company Name"
           disableEnforceFocus
           name="companyId"
           value={values.companyId}
           onChange={handleInputChange}
           options={companyList}
           error={errors.companyId}
         />
       
        </Grid>
        <Grid item xs={6}>
          <Controls.Input
            name="name"
            label="Role Name"
            value={values.name}
            onChange={handleInputChange}
            required={true}
            error={errors.name}
          />
        </Grid>
     
        <div>
          <Controls.Button
            type="submit"
            text="Submit"
            
          />
        
        </div>
      </Grid>
    </Form>
  );
}
