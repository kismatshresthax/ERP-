
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import config from "../../utils/config";
// import {useHistory, Link} from "react-router-dom";
// import Select from "react-select";
// import { toast } from "react-toastify";
// import { Switch } from "@material-ui/core";
// import Spinner from "../../utils/spinner";
// import UserSessionContext from '../../contexts/UserSessionContext';
// import CompanyContext from "../../contexts/CompanyContext";
// import Controls from '../controls/Controls';

// import {makeStyles} from "@material-ui/core/styles";
// const useStyles= makeStyles((theme)=>({
//   newButton:{
//       position:"absolute",
//       right:"10%"
  
//   }
//   })
  
//   )
// const CreateCOAPage = (props) => {
//   const userSessionContext = React.useContext(UserSessionContext)
//   const companyContext = React.useContext(CompanyContext);
//   let history = useHistory();

//   const classes=useStyles(props);
//   // const [createCoa, setCreateCoa] = useState({});
//   const [coaname, setCoaName] = useState("");
//   const [codeName, setCodeName] = useState("");
//   // const [parentLedger, setParentLedger] = useState("");
//   const [parentId, setParentid] = useState("");
//   const [name, setName] = useState([]); // populate parent name in dropdown

//   const [isVisible, setIsVisible] = useState(1);
//   const [isActive, setIsActive] = useState(1);
//   const [isNewPopup, setIsNewPopup] = useState(false);
//   const[addLedger,setAddLedger]=useState(false||props.setAddLedger)
//   console.log(addLedger)
//   const updateName = (e) => {
//     setCoaName(e.target.value);
//   };

//   const updateCode = (e) => {
//     setCodeName(e.target.value);
//   };

//   useEffect(() => {
//     loadParentname();
//   }, []);

//   const AddCoa = async (e) => {
//     e.preventDefault();
    

//     if(parentId["value"] === undefined)
//     {
//       let res_data = {
//         name: coaname,
//         codeName: codeName,
//         parentId: 0,
//         isactive: parseInt(isActive),
//         isvisible: parseInt(isVisible),
//         companyId: companyContext.company.id,
//       };
//       axios
//       .post(`${config.APP_CONFIG}/Account/COA/api`, res_data,{
//         headers: {
        
//           Authorization: userSessionContext.token,
//         },
//       })
//       .then((res) => {
//         if (res.data.status_code === 200) {
//           toast.success("insert successfull");

//           if(addLedger===true){
//             alert("yes")
//            history.push(`/accounting/journal`)
//            setIsNewPopup(false)
//           }
//           else
//           {
                     
//            history.push(`/accounting/chartOfAccounts`)
//           }
          
//         } else if(res.data.status_code === 400){
//           toast.warn(res.data.msg);
//         }
//         else if(res.data.status_code === 401){
//           userSessionContext.handleLogOut()
//         }
//         else {
//           toast.error("Error Occurred");
//         }
        
//       })
//       .catch((err) => {
//         toast.error("Something Went Wrong");
//       });
//       setIsNewPopup(false)
//     }
//     else {
//       let res_data = {
//         name: coaname,
//         codeName: codeName,
//         parentId: parentId["value"],
//         isactive: parseInt(isActive),
//         isvisible: parseInt(isVisible),
//         companyId: companyContext.company.id,
//       };
//       axios
//       .post(`${config.APP_CONFIG}/Account/COA/api`, res_data,{
//         headers: {
        
//           Authorization: userSessionContext.token,
//         },
//       })
//       .then((res) => {
//         if (res.data.status_code === 200) {
//           toast.success("Insert SuccessFull");

//           if(addLedger===true){
//            props.setIsNewPopup(false)
//             history.push("/accounting/journal")
          
//           }
//           else
//           {
               
//            history.push(`/accounting/chartOfAccounts`)
//           }
//           setIsNewPopup(false)
//           //history.push("/accounting/chartOfAccounts");
//         } else if(res.data.status_code === 400){
//           toast.warn(res.data.msg);
//         }
//         else if(res.data.status_code === 401){
//           userSessionContext.handleLogOut()
//         }
//         else {
//           toast.error("Error Occurred");
//         }
        
//       })
//       .catch((err) => {
//         toast.error("Something Went Wrong");
//       });
//     }
//     //props.journalcoa()
//     props.setIsNewPopup(false)
//     props.reload()

//   };

//   const loadParentname = async () => {
//     axios
//       .get(`${config.APP_CONFIG}/Account/COA/api`,{ headers: { Authorization: userSessionContext.token,},})
//       .then((res) => {
//         if (res.data && res.data.status_code && res.data.status_code === 200) {
//           let temp = res.data.msg.map((name, index) => ({
//             label: name.coaname,
//             value: name.id,
//           }));
//           setName(temp);
//         } 
//         else if(res.data.status_code === 400)
//         {
//           toast.warn(res.data.msg);
//         }
//         else if(res.data.status_code === 401)
//         {
//           userSessionContext.handleLogOut()
//         }
        
//         else {
//           toast.error("Error Occurred");
//           setName([]);
//         }
//       })
//       .catch((err) => {
//         toast.error("Something Went Wrong");
//         setName([]);
//       });
//   };

//   if (name === undefined) {
//     return <Spinner />;
//   }

//   const getCheckBox = (key, callback) => {
//     return (
//       <Switch
//       color = "primary"
//         checked={key === 1 ? true : false}
//         defaultValue="on"
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
 
//   return (
//     <div
//       className="content-wrapper iframe-mode"
//       data-widget="iframe"
//       data-loading-screen={750}
//     >
//       <div className="container">
//         <div className="w-75 mx-auto shadow p-5">
//           <h2 className="text-center mb-4">Chart of Account</h2>
//           <form className="form-horizontal" onSubmit={(e) => AddCoa(e)}>
//             <div className="card-body">
//               <div className="form-group row">
//                 <label htmlFor="text" className="col-sm-3 col-form-label">
//                   COA
//                 </label>
//                 <div className="col-sm-7">
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Ledger Name"
//                     name="coaname"
//                     value={coaname}
//                     onChange={updateName}
//                   />
//                 </div>
//               </div>
//               <div className="form-group row">
//                 <label htmlFor="text" className="col-sm-3 col-form-label">
//                   Code
//                 </label>
//                 <div className="col-sm-7">
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Code Name"
//                     name="codename"
//                     value={codeName}
//                     onChange={updateCode}
//                   />
//                 </div>
//               </div>
//               <div>
//                 <div className="form-group row ">
//                   <label htmlFor="text" className="col-sm-3 col-form-label">
//                     Parent Ledger:
//                   </label>
//                   <Select
//                     className="col-sm-7"
//                     styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
//                     menuPortalTarget={document.body}
//                     options={name}
//                     value={parentId}
//                     onChange={setParentid}
//                   ></Select>
//                 </div>
//               </div>
//               <label htmlFor="text" className="col-sm-3 col-form-label">
//                 Is Active
//               </label>
//               <div className="col-sm-4">
//                 {getCheckBox(isActive, setIsActive)}
//               </div>
//               <label htmlFor="text" className="col-sm-3 col-form-label">
//                 Is Visible
//               </label>
//               <div className="col-sm-4">
//                 {getCheckBox(isVisible, setIsVisible)}
//               </div>
//             </div>
//             {/* /.card-body */}
//             <div className="card-footer">
//             {/* <Controls.Button
//               text="Create"
//               variant="outlined"
//               startIcon={<AddIcon />}
//               className={classes.newButton}
//               onClick={() => {  history.push(`/accounting/journal`) }
               
//             }
              
//             /> */}
//                {/* <button type="submit" className="btn btn-success">
//                 Create
//               </button> */}
//               <Controls.Button
//                           type="submit"
//                           text="submit" 
                        
//                       />
//               {/* {addLedger ?
//               <Link to="/accounting/chartOfAccounts" className="btn btn-default float-right">
//                 Cancel
//               </Link>
//               :
//               <Link
//               to="/accounting/chartOfAccounts"
//               className="btn btn-default float-right"
//             >
//               Cancel
//             </Link>} */}
//             </div>
//             {/* /.card-footer */}
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default CreateCOAPage;
