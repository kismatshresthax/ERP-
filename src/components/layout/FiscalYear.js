// import React, { useState, useEffect } from "react";
// import config from "../../utils/config";
// import { useHistory, Link } from "react-router-dom";

// import axios from "axios";

// import { Switch } from "@material-ui/core";

// import PageHeaderTitle from "../../utils/PageHeaderTitle";
// import UserSessionContext from "../../contexts/UserSessionContext";
// import "date-fns";
// import { format } from "date-fns";
// import Controls from "../controls/Controls";
// import CompanyContext from "../../contexts/CompanyContext";
// import { toast } from "react-toastify";
// const FiscalYear = () => {
//   const userSessionContext = React.useContext(UserSessionContext);
//   let history = useHistory();
//   const companyContext = React.useContext(CompanyContext);
//   // const [createCoa, setCreateCoa] = useState({});
//   const [fiscalYear, setFiscalYear] = useState("");
//   const [fiscal, setFiscal] = useState("");
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(new Date());

//   const [isActive, setIsActive] = useState(0);
//   useEffect(() => {
//     axios
//       .get(`${config.APP_CONFIG}/Setting/FiscalYear/api`, {
//         headers: {
//           Authorization: userSessionContext.token,
//         },
//       })
//       .then((res) => {
//         if (res.data.status_code === 401) {
//           userSessionContext.handleLogOut();
//         } else if (res.data.status_code === 400) {
//           toast.warn(res.data.msg);
//         } else if (res.data.status_code === 200) {
//           // console.log(res.data.msg);
//           const fis_year = res.data.msg.filter((x) => {
//             if (x.isActive === 1) {
//               return true;
//             }
//             return false;
//           });

//           setFiscal(fis_year);
//         } else {
//           toast.error("error");
//         }
//       });
//   }, []);

//   const addFiscalYear = (e) => {
//     e.preventDefault();

//     if (fiscalYear === "" || undefined) {
//       toast.warn("Input Field is Empty");
//     } else if (fiscal.length > 0) {
//       toast.warn("Already Active Fiscal Year Exists");
//     } else if (
//       format(startDate, "yyyy-MM-dd HH:mm:ss") >
//       format(endDate, "yyyy-MM-dd HH:mm:ss")
//     ) {
//       toast.warn("StartDate Greater than End Date");
//     } else {
//       let req_data = {
//         fiscalYear: fiscalYear,
//         startDate: format(startDate, "yyyy-MM-dd HH:mm:ss"),
//         endDate: format(endDate, "yyyy-MM-dd HH:mm:ss"),
//         isActive: parseInt(isActive),
//         companyId: companyContext.company.id,
//       };

//       axios
//         .post(`${config.APP_CONFIG}/Setting/FiscalYear/api`, req_data, {
//           headers: {
//             Authorization: userSessionContext.token,
//           },
//         })
//         .then((res) => {
//           if (res.data.status_code === 200) {
//             toast.success(res.data.msg);
//             history.push("/settings/fiscalyearpage");
//           } else if (res.data.status_code === 400) {
//             toast.error(res.data.msg);
//           } else if (res.data.status_code === 401) {
//             userSessionContext.handleLogout();
//           } else {
//             toast.error("Error occured");
//           }
//         })
//         .catch((err) => {
//           toast.error("Failed to load data");
//         });
//     }
//   };

//   const getCheckBox = (key, callback) => {
//     return (
//       <Switch
//         checked={key === 1 ? true : false}
//         defaultValue="on"
//         color="primary"
//         onChange={(e) => {
//           let changedValue = 0;
//           if (key === 0) {
//             changedValue = 1;
//           }
//           callback(changedValue);
//         }}
//       />
//     );
//   };

//   const fiscal_start = format(
//     new Date(startDate),
//     "yyyy/MM/dd"
//   );
//   const fiscal_start_nepali = format(
//     new Date(startDate),
//     "yyyy/MM/dd "
//   );
//   const fiscal_end = format(
//     new Date(endDate),
//     "yyyy/MM/dd"
//   );
//   const fiscal_end_nepali = format(
//     new Date(endDate),
//     "yyyy/MM/dd "
//   );
//   var adbs = require("ad-bs-converter");
//   var nepalidate = adbs.ad2bs(fiscal_start_nepali);
//   var nepalidate = adbs.ad2bs(fiscal_end_nepali);
//   const miti =
//     nepalidate.en["year"] +
//     "/" +
//     nepalidate.en["month"] +
//     "/" +
//     nepalidate.en["day"];

//   return (
//     <div
//       className="content-wrapper iframe-mode"
//       data-widget="iframe"
//       data-loading-screen={750}
//     >
//       <div>
//         <div>
//           <form className="form-horizontal" onSubmit={(e) => addFiscalYear(e)}>
//             <div className="card-body">
//               <div className="form-group row">
//                 <label htmlFor="text" className="col-sm-3 col-form-label">
//                   Fiscal Year
//                 </label>
//                 <div className="col-sm-9">
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Fiscal Year"
//                     name="fiscalYear"
//                     value={fiscalYear}
//                     onChange={(e) => {
//                       setFiscalYear(e.target.value);
//                     }}
//                     //required={true}
//                   />
//                 </div>
//               </div>
//               <br />
//               <div className="form-group row">
//                 <label htmlFor="text" className="col-sm-3 col-form-label">
//                   Starting Date
//                 </label>
//                 <div className="col-sm-9">
//                   <Controls.DatePicker
//                     id="startDate"
//                     name="startDate"
//                     value={startDate}
//                     onChange={(e) => {
//                       setStartDate(e.target.value);
//                     }}
//                   />
//                     <span>( {miti} BS )</span>
//                 </div>
//               </div>
//               <br />
//               <div className="form-group row">
//                 <label htmlFor="text" className="col-sm-3 col-form-label">
//                   Ending Date
//                 </label>
//                 <div className="col-sm-9">
//                   <Controls.DatePicker
//                     id="endDate"
//                     name="endDate"
//                     value={endDate}
//                     onChange={(e) => {
//                       setEndDate(e.target.value);
//                     }}
//                   />
//                    <span>( {miti} BS )</span>
//                 </div>
//               </div>
//               <div className="form-group row">
//                 <label htmlFor="text" className="col-sm-3 col-form-label">
//                   Is Active
//                 </label>
//                 <div className="col-sm-9">
//                   {getCheckBox(isActive, setIsActive)}
//                 </div>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default FiscalYear;

import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { useForm, Form } from "../../components/home/useForm";
import Controls from "../controls/Controls";
import axios from "axios";
import config from "../../utils/config";
//import UserSessionContext from "../../contexts/UserSessionContext";
//import CompanyContext from "../../contexts/CompanyContext";
import { toast } from "react-toastify";

import { format } from "date-fns";
import { Switch } from "@material-ui/core";
const initialFValues = {
  fiscalYear: "",
  startDate: new Date(),
  endDate: new Date(),
  isActive: 0,
  companyId: 0,
};
export default function FiscalYear(props) {
  const token = props.token;

  //const userSessionContext = React.useContext(UserSessionContext);
 // const companyContext = React.useContext(CompanyContext);
//  const [fiscal, setFiscal] = useState("");
  const _data = props.data || initialFValues;

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("fiscal" in fieldValues) {
      temp.name = fieldValues.name ? "" : "This field is required";
    }

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
  //   useEffect(() => {
  //     axios.get(`${config.APP_CONFIG}/Setting/FiscalYear/api`, {
  //         headers: {
  //           Authorization: userSessionContext.token,
  //         },
  //       })
  //       .then((res) => {
  //         if (res.data.status_code === 401) {
  //           userSessionContext.handleLogOut();
  //         } else if (res.data.status_code === 400) {
  //           toast.warn(res.data.msg);
  //         } else if (res.data.status_code === 200) {
  //          // console.log(res.data.msg);
  //           const fis_year = res.data.msg.filter((x) => {
  //             if (x.isActive === 1) {
  //               return true;

  //             }
  //             return false;
  //           });

  //           setFiscal(fis_year);

  //         } else {
  //           toast.error("error");

  //         }
  //       });

  // }, []);

  const handleSubmission = (e) => {
    e.preventDefault();

    //  if (fiscal.length > 0) {
    //  toast.warn("Already Active Fiscal Year Exists")

    // }
    if (
      format(values.startDate, "yyyy-MM-dd HH:mm:ss") >
      format(values.endDate, "yyyy-MM-dd HH:mm:ss")
    ) {
      toast.warn("StartDate Greater than End Date");
    } else {
      let req_value = {
        fiscalYear: values.fiscalYear,
        startDate: format(values.startDate, "yyyy-MM-dd HH:mm:ss"),
        endDate: format(values.endDate, "yyyy-MM-dd HH:mm:ss"),
        isActive: parseInt(isActive),
        // companyId: companyContext.company.id,
        companyId: 1,
      };

      addFiscalYear(req_value);
      ResetForm();
    }
  };
  const addFiscalYear = (data) => {
    axios
      .post(`${config.APP_CONFIG}/Setting/FiscalYear/api`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        if (res.data.status_code === 200) {
          toast.success(res.data.msg);

          props.step_handler("next");
        } else if (res.data.status_code === 400) {
          toast.error(res.data.msg);
        } else if (res.data.status_code === 401) {
          //handleLogout();
          window.localStorage.removeItem("ERP_TOKEN");
          window.localStorage.removeItem("user");
        } else {
          toast.error("Error occured");
        }
      })
      .catch((err) => {
        toast.error("Failed to load data");
      });
  };

  const handleLogOut = (e) => {
    window.localStorage.removeItem("ERP_TOKEN");
    window.localStorage.removeItem("user");
    //  setToken(false);
    // setUsers("");
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

  return (
    <Form onSubmit={handleSubmission} style={{display: "flex", height: "100vh"}}>
      <div className="card setupFiscal" style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
        <Grid container>
          {/* <Grid item xs={6} spacing={5}> */}
            <Controls.Input
              name="fiscalYear"
              type="text"
              label="Fiscal Year"
              value={values.fiscalYear}
              onKeyDown={(e) =>
                (e.keyCode === 190 || e.keyCode === 187) && e.preventDefault()
              }
              onChange={handleInputChange}
              error={errors.name}
              style={{ width: "100%", margin: "8px 0" }}
              required={true}
            />
          {/* </Grid>
          <Grid item xs={6} spacing={5}> */}
            <Controls.DatePicker
              name="startDate"
              label="Start Date"
              value={values.startDate}
              onChange={handleInputChange}
              style={{ width: "100%", margin: "8px 0" }}
            />
          {/* </Grid>
          <Grid item xs={6} spacing={5}> */}
            <Controls.DatePicker
              name="endDate"
              label="End Date"
              value={values.endDate}
              onChange={handleInputChange}
              style={{ width: "100%", margin: "8px 0" }}
            />
          {/* </Grid>
          <Grid item xs={6} spacing={5}> */}
            <label htmlFor="text" className="col-sm-3 col-form-label">
              Is Active
            </label>
            <div className="col-sm-9">{getCheckBox(isActive, setIsActive)}</div>
          {/* </Grid>
          <Grid item xs={6} spacing={5}> */}
            <div>
              <Controls.Button
                type="submit"
                text="Submit"
                style={{ margin: "8px 0 0" }}
              />
            </div>
          {/* </Grid> */}
        </Grid>
      </div>
    </Form>
  );
}
