import React from "react";
import { Grid } from "@material-ui/core";
import { useForm, Form } from "../../components/home/useForm";

export default function ViewPettyCash(props) {
  // const userSessionContext = React.useContext(UserSessionContext);
  // const companyContext = React.useContext(CompanyContext);
  const _data = props.data 
  const { values } = useForm(_data);
 // const [companyList, setCompanyList] = useState();
  //const role = props.userToRole;

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
          username: values.username,
          contactNumber1: values.contactNumber1,
          contactNumber2: values.contactNumber2,
          gender: values.gender,
          country: values.country,
          state: values.state,
          designation: values.designation,
          address1: values.address1,
          address2: values.address2,
          isVendor: values.isVendor,
          isLoginAllowed: values.isLoginAllowed,
          isCustomer: values.isCustomer,
        };

        props.handleSubmit(req_value);
      }}
    >
      {/* // return <Form onSubmit ={props.handleSubmit}></Form> */}
      <Grid container>
        <Grid item xs={6}>
         <div>
            <b>accountingDate:</b> {values.accountingDate} 
           
          </div>
          <div>
            <b>Reference</b>: {values.reference}
          </div>
          <div>
            <b>narration:</b> {values.narration}
          </div>
          <div>
            <b>amount</b>: {values.amount}
          </div>
       
          
         
          {/* <div>
          <b>Role:</b>
            {role.map((item,index) => (
            item.roleName.concat(",")
            ))}
          </div> */}
          
        </Grid>
      </Grid>
    </Form>
  );
}
