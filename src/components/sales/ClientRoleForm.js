import React, {  useEffect } from "react";
import { Grid } from "@material-ui/core";
import { useForm, Form } from "../../components/home/useForm";
import Controls from "../controls/Controls";
import Spinner from "../../utils/spinner";
import CompanyContext from "../../contexts/CompanyContext";
const initialFValues = {
  name: "",
  company_id: 0,
};

export default function ClientRoleForm(props) {
 
  const companyContext = React.useContext(CompanyContext);
  const _data = props.data || initialFValues;
  const { values, handleInputChange, ResetForm } = useForm(_data);
  // const [companyList, setCompanyList] = useState();

  useEffect(() => {
    // axios
    //   .get(`${config.APP_CONFIG}/Companies/Company`)
    //   .then((res) => {
    //     if (res.data.status_code === 400) {
    //       userSessionContext.handleLogOut();
    //     } else if (res.data.status_code === 200) {
    //       let companyList = res.data.msg.map((item) => ({
    //         id: item.id,
    //         title: item.name,
    //       }));
    //       companyList = [{ id: 0, title: "Select" }].concat(companyList);
    //       setCompanyList(companyList);
    //     } else {
    //       toast.error("error");
    //       setCompanyList([]);
    //     }
    //   })
    //   .catch((err) => {
    //     setCompanyList([]);
    //     console.log(err);
    //   });
    // let select_companies = companyContext.companies.map((x) => {
    //   return { id: x.id, title: x.name };
    // });
    // setCompanyList(select_companies);
  }, []);

  if (companyContext.company.id === undefined) {
    return <Spinner />;
  }

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        let req_value = {
          id: values.id,
          name: values.name,
          company_id: companyContext.company.id,
        };
        props.handleSubmit(req_value);
      }}
    >
      {/* // return <Form onSubmit ={props.handleSubmit}></Form> */}
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name="name"
            label="Role Name"
            value={values.name}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={6}>
          {/* <Select
            className="col-sm-25 search-bar"
            style={{ width: "90%" }}
            options={select_companies}
            value={{
              label: companyContext.company.name,
              value: companyContext.company.id,
            }}
            onChange={(e) => {
              const res = {
                id: e.value,
                name: e.label,
              };
              console.log(res);
              setCompanyList(res);
              // companyContext.setCompany(res);
            }}
          ></Select> */}
          {/* <Controls.Select
            label="CompanyName"
            name="companyId"
            value={values.companyId}
            onChange={handleInputChange}
            options={companyList}
          /> */}
        </Grid>

        <div>
          <Controls.Button
            type="submit"
            text="Submit"
            onClick={(e) => {
              e.preventDefault();
              let req_value = {
                id: values.id,
                name: values.name,
                company_id: companyContext.company.id,
              };
         
              props.handleSubmit(req_value);
            }}
          />
          <Controls.Button text="Reset" color="default" onClick={ResetForm} />
        </div>
      </Grid>
    </Form>
  );
}
