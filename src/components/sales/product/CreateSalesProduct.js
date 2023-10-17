// import React, { useEffect, useState } from "react";
// import axios from "axios";
// //import { useHistory, useParams } from "react-router-dom";
// import config from "../../../utils/config";
// import { toast } from "react-toastify";
// import {
//   Switch,
 
//   makeStyles,
  
// } from "@material-ui/core";
// import "../../../utils/styles.css";
// //import Select from "react-select";
// import UserSessionContext from "../../../contexts/UserSessionContext";
// import Controls from "../../controls/Controls";
// import { Grid } from "@material-ui/core";
// import { useForm, Form } from "../../home/useForm";
// import Spinner from "../../../utils/spinner";
// // import CreateProduct from "./CreateProduct";
// // import Popup from "../../home/Popup";

// const initialFValues = {
//   name: "",
//   code: "",
//   displayName: "",
//   costPrice: "",
//   costtax: "",
//   costDiscount: "",
//   sellPrice: "",
//   selltax: "",
//   sellDiscount: "",
//   isConsumable: "",
//   isSellable: "",
//   isService: 0,
//   categoryId: "",
// };

// const useStyles = makeStyles({
//   field: {
//     marginTop: 20,
//     marginBotton: 20,
//   },
// });

// export default function CreateSalesProducts(props) {
//   const userSessionContext = React.useContext(UserSessionContext);
//   const _data = props.data || initialFValues;
//   const [loadCategory, setLoadCategory] = useState();


//   const validate = () => {
//     let temp = {}
//     temp.productname = values.productname ? "" : "This field is required."
//     temp.categoryId = values.categoryId ? "" : "This field is required."
//     temp.displayName = values.displayName ? "" : "This field is required."
//     temp.code = values.code ? "" : "This field is required."
//     temp.costPrice = values.costPrice ? "" : "This field is required."
//     temp.sellPrice = values.sellPrice ? "" : "This field is required."
//     setErrors({...temp})
//     return Object.values(temp).every(x => x == "")
//   }
//   const { values, setValues, handleInputChange, ResetForm, errors, setErrors } = useForm(_data, true, validate);


//   useEffect(() => {
//     loadCategoryname();
//   }, []);

//   useEffect(() => {
//     let new_val = values.isConsumable === 1 ? 0 : 1;
//     setValues({ ...values, isSellable: new_val });
//   }, [values.isConsumable]);

//   useEffect(() => {
//     let new_val = values.isSellable === 1 ? 0 : 1;
//     setValues({ ...values, isConsumable: new_val });
//   }, [values.isSellable]);

//   const handleSubmission = e => {
//     e.preventDefault()
//     if(validate())
//     {
//       let req_value = {
//         id: values.id,
//         name: values.productname,
//         code: values.code,
//         displayName: values.displayName,
//         costPrice: parseInt(values.costPrice),
//         costtax: parseInt(values.costtax),
//         costDiscount: parseInt(values.costDiscount),
//         sellPrice: parseInt(values.sellPrice),
//         selltax: parseInt(values.sellTax),
//         sellDiscount: parseInt(values.sellDiscount),
//         isConsumable: parseInt(values.isConsumable),
//         isSellable: parseInt(values.isSellable),
//         isService: parseInt(values.isService),
//         categoryId: values.categoryId,
//       };
//       // props.handleSubmit(req_value);
//       props.handleSubmit(req_value);
//       ResetForm();
//     }
//   }



//   const loadCategoryname = async () => {
//    await axios
//       .get(`${config.APP_CONFIG}/Products/ProductCategory/api`,{ headers: {Authorization: userSessionContext.token } })
//       .then((res) => {
//         if (res.data && res.data.status_code && res.data.status_code === 200) {
//           let temp = res.data.msg.map((name, index) => ({
//             title: name.categoryName,
//             id: name.id,
//           }));
//           setLoadCategory(temp);
//         } else if (res.data.status_code === 401) {
//           userSessionContext.handleLogout();
//         }  else if (res.data.status_code === 400) {
//           toast.warn(res.data.msg);
//         } else {
//           toast.error("Cannot load category name.");
//           setLoadCategory([]);
//         }
//       })
//       .catch((err) => {
//         toast.error("failed to load data");
//         setLoadCategory([]);
//       });
//   };

//   const onInputChange = (_key, _value) => {
//     setValues({ ...values, [_key]: _value });
//   };

//   if (loadCategory === undefined) {
//     return <Spinner />;
//   }

//   const getCheckBox = (key, callback) => {
//     return (
//       <Switch
//         color="primary"
//         size="small"
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
//     <Form
//       onSubmit={handleSubmission}
//     >
//       <Grid container>
//         <Grid item xs={6}>
//           <Controls.Input
//             name="productname"
//             label="Product Name"
//             value={values.productname}
//             onChange={handleInputChange}
//           />
//           <Controls.Input
//             label="Display Name"
//             name="displayName"
//             value={values.displayName}
//             onChange={handleInputChange}
//           />
//           <Controls.Input
//             label="Cost Tax"
//             name="costtax"
//             value={values.costtax}
//             onChange={handleInputChange}
//           />
//           <Controls.Input
//             label="Sell Price"
//             name="sellPrice"
//             value={values.sellPrice}
//             onChange={handleInputChange}
//           />
//           <Controls.Input
//             label="Sell Discount"
//             name="sellDiscount"
//             value={values.sellDiscount}
//             onChange={handleInputChange}
//           />
//         </Grid>

//         <Grid item xs={6}>
//           <Controls.Input
//             name="code"
//             label="Code"
//             value={values.code}
//             onChange={handleInputChange}
//           />
//           <Controls.Input
//             label="Cost Price"
//             name="costPrice"
//             value={values.costPrice}
//             onChange={handleInputChange}
//           />

//           <Controls.Input
//             name="costDiscount"
//             label="Cost Discount"
//             value={values.costDiscount}
//             onChange={handleInputChange}
//           />
//           <Controls.Input
//             label="Sell Tax"
//             name="selltax"
//             value={values.selltax}
//             onChange={handleInputChange}
//           />
//           <Controls.Select
//             label="Category Name"
//             name="categoryId"
//             value={values.categoryId}
//             onChange={handleInputChange}
//             options={loadCategory}
//           />
//         </Grid>
//         <Grid item xs={12}>
//           {/* <Switch 
//           color = 'primary'
//           checked={product.isConsumable === 1 ? true : false}
//           defaultValue="on"
//           onChange={e => {
//             let new_val = e.target.checked ? 1: 0
//             onInputChange("isConsumable",new_val )
//           }}
//           label="Service"
//           /> */}
//           {/* <b>Service</b> */}
//           {/* Service  */}
//           {/* {
//            getCheckBox(isService, setIsService)
//          } */}
//           {/* {getCheckBox(values.isService, (ee) => {
//             onInputChange("isService", ee);
//           })} */}
//           <Switch
//             color="primary"
//             // checked={values.isService === 1 ? 1 : 0}
//             defaultValue="on"
//             onChange={(e) => {
//               let new_val = e.target.checked ? 1 : 0;
//               onInputChange("isService", new_val);
//             }}
//             label="Service"
//           />
//           Service
//         </Grid>
//         <Grid item xs={12}>
//           <Switch
//             color="primary"
//             checked={values.isConsumable === 1 ? true : false}
//             defaultValue="on"
//             onChange={(e) => {
//               let new_val = e.target.checked ? 1 : 0;
//               onInputChange("isConsumable", new_val);
//             }}
//             label="Service"
//           />
//           {/* <b>Service</b> */}
//           Consumable
//           {/* {getCheckBox(isService, setIsService)} */}
//         </Grid>
//         <Grid item xs={12}>
//           <Switch
//             color="primary"
//             checked={values.isSellable === 1 ? true : false}
//             defaultValue="on"
//             onChange={(e) => {
//               let new_val = e.target.checked ? 1 : 0;
//               onInputChange("isSellable", new_val);
//             }}
//             label="Service"
//           />
//           {/* <b>Service</b> */}
//           Sellable
//         </Grid>

//         <div>
//           <Controls.Button
//             type="submit"
//             text="Submit"
//             onClick={(e) => {
//               e.preventDefault();
//               let req_value = {
//                 name: values.productname,
//                 code: values.code,
//                 displayName: values.displayName,
//                 costPrice: parseInt(values.costPrice),
//                 costtax: parseInt(values.costtax),
//                 costDiscount: parseInt(values.costDiscount),
//                 sellPrice: parseInt(values.sellPrice),
//                 selltax: parseInt(values.selltax),
//                 sellDiscount: parseInt(values.sellDiscount),
//                 isConsumable: parseInt(values.isConsumable),
//                 isSellable: parseInt(values.isSellable),
//                 isService: parseInt(values.isService),
//                 categoryId: values.categoryId,
//               };
//               props.handleSubmit(req_value);
//               if (props.insertId === undefined) {
//                 return <Spinner />;
//               } else {
//                 props.step_handler("next");
//               }
//             }}
//           />
//           <Controls.Button text="Reset" color="default" onClick={ResetForm} />
//         </div>
//       </Grid>
//     </Form>
//   );
// }
