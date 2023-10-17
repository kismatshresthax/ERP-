import React from "react";
import { Grid } from "@material-ui/core";
import { useForm, Form } from "../../components/home/useForm";




//User to role map

// import { MenuProps, useStyles, options } from "./RolesMultiSelect";

const initialFValues = {
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
  isVendor: 0,
  isLoginAllowed: "",
  isCustomer: 0,
  userCompanyName:"",
};

export default function ViewUserDetailForm(props) {
  //const userSessionContext = React.useContext(UserSessionContext);
// const companyContext = React.useContext(CompanyContext);
  const _data = props.data || initialFValues;
  const { values } = useForm(_data);
  //const [companyList, setCompanyList] = useState();
 // const role = props.userToRole;

  //user to role map
  // const classes = useStyles();
  // const [role, setRole] = useState();
  // const [selected, setSelected] = useState([]);
  // const isAllSelected =
  //   options.length > 0 && selected.length === options.length;

  // const handleChange = (event) => {
  //   const value = event.target.value;
  //   if (value[value.length - 1] === "all") {
  //     setSelected(selected.length === options.length ? [] : options);
  //     return;
  //   }
  //   setSelected(value);
  // };

  // useEffect(() => {
  //   props.userToRole()
  // }, []);

  // const roles = () => {
  //   axios
  //     .get(`${config.APP_CONFIG}/api/userRoles`)
  //     .then((res) => {
  //       if (res.data && res.data.status_code && res.data.status_code === 200) {
  //         setRole(res.data.msg || []);
  //       } else {
  //         toast.error("Cannot load roles.");
  //         setRole([]);
  //       }
  //     })
  //     .catch((err) => {
  //       toast.error("Error occured");
  //       setRole([]);
  //     });
  // };
  // if (companyList === undefined) {
  //   return <Spinner />;
  // }
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
        console.log(values.companyId);
        console.log(req_value);
        props.handleSubmit(req_value);
      }}
    >
      {/* // return <Form onSubmit ={props.handleSubmit}></Form> */}
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
              <b>User Name</b>
            </div>
            <div className="col-md-8">: {values.username}</div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <b>Company</b>
            </div>
            <div className="col-md-8">: {values.userCompanyName}</div>
          </div>
        
          <div className="row">
            <div className="col-md-4">
              <b>Designation</b>
            </div>
            <div className="col-md-8">: {values.designation}</div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <b>Country</b>
            </div>
            <div className="col-md-8">: {values.country}</div>
          </div>
        </Grid>
        <Grid item xs={6}>          
          <div className="row">
            <div className="col-md-4">
              <b>State</b>
            </div>
            <div className="col-md-8">: {values.state}</div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <b>Address 1</b>
            </div>
            <div className="col-md-8">: {values.address1}</div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <b>Address 2</b>
            </div>
            <div className="col-md-8">: {values.address2}</div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <b>Contact Number 1</b>
            </div>
            <div className="col-md-8">: {values.contactNumber1}</div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <b>Contact Number 2</b>
            </div>
            <div className="col-md-8">: {values.contactNumber2}</div>
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
