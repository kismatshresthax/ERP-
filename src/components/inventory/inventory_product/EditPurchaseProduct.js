// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import config from "../../../utils/config";
// import { toast } from "react-toastify";
// import { Switch, } from "@material-ui/core";
// import "../../../utils/styles.css";
// import UserSessionContext from "../../../contexts/UserSessionContext";
// import Controls from "../../controls/Controls";
// import { Grid } from "@material-ui/core";
// import { useForm, Form } from "../../home/useForm";
// import Spinner from "../../../utils/spinner";
// import Select from "react-select";
// import { BlockPicker } from 'react-color';



// // const useStyles = makeStyles({
// //   field: {
// //     marginTop: 20,
// //     marginBotton: 20,
// //   },
// // });
// const KOTPrint = [
//   { id: "K1", title: "K1" },
//   { id: "K2", title: "K2" },
//   { id: "K3", title: "K3" },
//    { id: "K4", title: "K4" },
//   { id: "K5", title: "K5" },
//   { id: "K6", title: "K6" },
//   { id: "K7", title: "K7" },
//   { id:"K8", title: "K8" },
//   { id: "K9", title: "K9" },
//   { id: "K10", title: "K10" },
//   { id: "K11", title: "K11" },
//   { id: "K12", title: "K12" },
//   { id: "K13" , title: "K13" },
//   { id: "K14", title: "K14" },
//   { id: "K15", title: "K15" },
//   { id: "B1", title: "B1" },
//   { id: "B2", title: "B2" },
// ];
// export default function EditPurchaseProduct(props) {
//   const userSessionContext = React.useContext(UserSessionContext);
//   const _data = props.data;
//   console.log(_data);
// //console.log(props.taxRate)

//   const [loadCategory, setLoadCategory] = useState();
//   const [unitList, setunitList] = useState();
//   const [unitlist, setunitlist] = useState();
//   const [unitListById, setunitListById] = useState({});
//   const[kot,setKot]=useState(_data.kot_print);
//   const [taxRates, setTaxRates] = useState(props.taxRate);
//   const [color, setColor] = useState(_data.imageColour||'#f47373')
//   const [displayName, setDisplayName] = useState();
//   //const [productname, setProductName] = useState();
//   const [showColorPicker, setShowColorPicker] = useState(false)
//   const[isTax, setIsTax]=useState(_data.isTax);
//   const[isServiceCharge, setIsServiceCharge]=useState(_data.isServiceCharge);


//   const validate = (fieldValues = values) => {
//     let temp = {...errors}
//     if('productname' in fieldValues){
//       temp.productname = fieldValues.productname ? "" : "This field is required."
//     }
//     if('categoryId' in fieldValues){
//       temp.categoryId = fieldValues.categoryId ? "" : "This field is required."
//     }
//     // if('displayName' in fieldValues){
//     //   temp.displayName = fieldValues.displayName ? "" : "This field is required."
//     // }
//     if('code' in fieldValues){
//       temp.code = fieldValues.code ? "" : "This field is required."
//     }
//     if('costPrice' in fieldValues){
//       temp.costPrice = fieldValues.costPrice ? "" : "This field is required."
//     }
//     if('sellPrice' in fieldValues){
//       temp.sellPrice = fieldValues.sellPrice ? "" : "This field is required."
//     }
//     setErrors({...temp})
//     if (fieldValues == values)
//     return Object.values(temp).every(x => x == "")
//   }
//   useEffect(() => {
//    // loadTaxRates();
//     loadCategoryname();
//     // load_warehouse();
//     loadunitList();
//     loadunit();
    
    
//     // if(unitListById !== undefined){
//       loadUnitById();
//     // }
//   }, []);

//   const { values, setValues, handleInputChange, ResetForm, errors, setErrors } = useForm(_data, true, validate);
//   useEffect(
//     (e) => {
//       if (values.productname !== undefined) {
//         setDisplayName(values.productname);
//       }
//     },
//     [values.productname]
//   );
//   console.log(_data.selltax)
//   console.log(taxRates);
//   if(_data.selltax!==undefined){
//     let default_value= taxRates.filter(x=>x.title===_data.selltax)
//     console.log(default_value);
//     if(default_value.length > 0){
//       _data.selltax = default_value[0]["id"]
//     }
//   }


//   useEffect(() => {
//     let new_val = values.isConsumable === 1 ? 0 : 1;
//     setValues({ ...values, isSellable: new_val });
//   }, [values.isConsumable]);

//   useEffect(() => {
//     let new_val = values.isSellable === 1 ? 0 : 1;
//     setValues({ ...values, isConsumable: new_val });
//   }, [values.isSellable]);
 
//   const loadunit = () => {
//     axios
//       .get(`${config.APP_CONFIG}/Products/ProductInhouseUnit/api`, {
//         headers: { Authorization: userSessionContext.token },
//       })
//       .then((res) => {
//         if (res.data.status_code === 200) {
//           let temp = res.data.msg.map((x, index) => ({
//             title: x.name,
//             id: x.id,
//           }));
//           setunitlist(temp);
//         } else if (res.data.status_code === 401) {
//           userSessionContext.handleLogout();
//         } else if (res.data.status_code === 400) {
//           toast.warn(res.data.msg);
//         } else {
//           toast.error("Cannot load bases name.");
//           setunitlist([]);
//         }
//       })
//       .catch((err) => {
//         toast.error("failed to load data");
//         setunitlist([]);
//       });
//   };
//   const loadunitList = async() => {
//    await axios
//       .get(`${config.APP_CONFIG}/Products/ProductInhouseUnit/api`, {
//         headers: { Authorization: userSessionContext.token },
//       })
//       .then((res) => {
//         if (res.data.status_code === 200) {
//           let temp = res.data.msg.map((x, index) => ({
//             label: x.name,
//             value: x.id,
//           }));
//           setunitList(temp);
//         } else if (res.data.status_code === 401) {
//           userSessionContext.handleLogout();
//         } else if (res.data.status_code === 400) {
//           toast.warn(res.data.msg);
//         } else {
//           toast.error("Cannot load bases name.");
//           setunitList([]);
//         }
//       })
//       .catch((err) => {
//         toast.error("failed to load data");
//         setunitList([]);
//       });
//   };


//   const loadUnitById = async() => {
//    await axios
//       .get(`${config.APP_CONFIG}/product/ProductUnit/api/${props.data.id}`, {
//         headers: { Authorization: userSessionContext.token },
//       })
//       .then((res) => {
//         if (res.data.status_code === 200) {
    
//           if(res.data.msg[0]["baseUnit"]===1)
//           {

//           //  const _tempBaseMeasurement = [res.data.msg[0]]
//           //   let temp = _tempBaseMeasurement.map((x, index) => ({
//           //     title: x.unitName,
//           //     id: x.unitId,
//           //   }));
//           const _tempUnitId = res.data.msg[0]["unitId"]
//           const _tempUnitName = res.data.msg[0]["unitName"]
//           // console.log(_tempUnitId)
            
//             // setunitListById(_tempBaseMeasurement);
              


//             setunitListById({ ...unitListById, label:_tempUnitName, value:_tempUnitId});
          
//           }
          
//         } else if (res.data.status_code === 401) {
//           userSessionContext.handleLogout();
//         } else if (res.data.status_code === 400) {
//           toast.warn(res.data.msg);
//         } else {
//           toast.error("Something Went Wrong");
//           setunitListById([]);
//         }
//       })
//       .catch((err) => {
    
//         toast.error("Failed to load Base Unit Name");
//         setunitListById([]);
//       });
//   };


//   const loadCategoryname = async () => {
//    await axios
//       .get(`${config.APP_CONFIG}/Products/ProductCategory/api`, {
//         headers: { Authorization: userSessionContext.token },
//       })
//       .then((res) => {
//         if (res.data && res.data.status_code && res.data.status_code === 200) {
//           let temp = res.data.msg.map((name, index) => ({
//             title: name.categoryName,
//             id: name.id,
//           }));
//           setLoadCategory(temp);
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
//   const onServiceInputChange = (_key, _value) => {
//     setValues({ ...values, [_key]: _value });
//   };
//   const onServiceChargeInputChange = (_key, _value) => {
//     setIsServiceCharge(_value)
//     setValues({ ...values, [_key]: _value });
//   };
 
//   const onTaxInputChange = (_key, _value) => {
//     setIsTax(_value)
//     setValues({ ...values, [_key]: _value });
//   };

//   if (loadCategory === undefined) {
//     return <Spinner />;
//   }

//   const getCheckBox = (key, callback) => {
//     return (
//       <Switch
//         color="primary"
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

//   const updateProduct = (data) => {
//     const res_data = {
    

//       productname: values.productname,
//       code: values.code,
//       displayName: values.displayName,
//       costPrice: parseFloat(values.costPrice) || 0,
//       costtax: parseFloat(values.costtax) || 0,
//       costDiscount: parseFloat(values.costDiscount) || 0,
//       sellPrice: parseFloat(values.sellPrice) || 0,
//       selltax: parseFloat(values.selltax) || 0,
//       sellDiscount: parseFloat(values.sellDiscount) || 0,
//       isConsumable: parseInt(values.isConsumable),
//       isSellable: parseInt(values.isSellable),
//       isService: parseInt(values.isService),
//       categoryId: values.categoryId,
//       unitId:values.unitId,
//       imageColour:color,
//       kot_print:values.kot_print,
//       barcode: "string",
//       isTax: 0,
//       isServiceCharge: 0,
//       serviceCharge: 0
//     }
 
//     axios.put(`${config.APP_CONFIG}/Products/product/api/${data.id}`, res_data, {
//         headers: { Authorization: userSessionContext.token },
//       })
//       .then((res) => {
//         if (res.data.status_code === 200) {
//           // props.setIsEditPopup(false);
//         //   const req_data = {
//         //   productId: data.id,
//         //   baseUnit: 1,
//         //   ratio: 1,
//         //   unitId:unitListById.value,                 
//         // };
//        // props.setDatas([...datas,req_data]);
     

//         // axios.put(`${config.APP_CONFIG}/product/ProductUnit/api/${data.id}`, req_data , { headers: { Authorization: userSessionContext.token }})
//         // .then((es) => {
//         //   if (es.data.status_code === 200) {
//         //     toast.success(es.data.msg || "Enter UnitName Successfully.");
//         //     const _baseMeasurement = {
//         //       baseUnit: 1,
//         //       ratio: 1,
//         //       unitId:unitListById.value,  
//         //       unitName:unitListById.label,
//         //     }
//         //     props.setBaseUnit({...props.baseUnit, ..._baseMeasurement}) // updating PurchaseProducts.js for loading _baseMeasurement to EditProductUnit.js through ProductEditStepper
//         //   } else if (es.data.status_code === 400) {
//         //     toast.warn(es.data.msg);
//         //   } else if (es.data.status_code === 401) {
//         //     userSessionContext.handleLogout();
//         //   } else {
//         //     toast.error(es.data.msg || "Cannot insert unit.");
//         //   }
//         // })
//         // .catch((err) => {
//         //   toast.error("Failed to insert unit");
         
//         // }); 
//           //  console.log(res.data.msg)
//          toast.success("successfully Updated")

//         props.step_handler("next")
//        props.load_table();
//           ResetForm();
//         } else if (res.data.status_code === 401) {
//           userSessionContext.handleLogout();
//         } else if (res.data.status_code === 400) {
       
//           toast.warn(res.data.msg);
//         } else {
//           toast.error("Error Occurred");
//         }
//       })
//       .catch((err) => {
//         toast.error("Something Went Wrong");
//       });
  
//   };

//   const handleSubmission = (e) => {
//     e.preventDefault();
//     if (validate()) {
//       let req_value = {
//         id: values.id,
//         // productname: values.productname,
//         // code: values.code,
//         // displayName: values.displayName,
//         // costPrice: parseInt(values.costPrice),
//         // costtax: parseInt(values.costtax),
//         // costDiscount: parseInt(values.costDiscount),
//         // sellPrice: parseInt(values.sellPrice),
//         // selltax: parseInt(values.selltax),
//         // sellDiscount: parseInt(values.sellDiscount),
//         // isConsumable: parseInt(values.isConsumable),
//         // isSellable: parseInt(values.isSellable),
//         // isService: parseInt(values.isService),
//         // categoryId: values.categoryId,

//       };

//       // props.handleSubmit(req_value);
//       updateProduct(req_value);
//       ResetForm();
//     }
//   };

//   return (
//     <Form
//       onSubmit={handleSubmission}
//       // onSubmit={(e) => {
//       //   e.preventDefault();
//       //   let req_value = {
//       //     id: values.id,
//       //     name: values.productname,
//       //     code: values.code,
//       //     displayName: values.displayName,
//       //     costPrice: parseInt(values.costPrice),
//       //     costtax: parseInt(values.costtax),
//       //     costDiscount: parseInt(values.costDiscount),
//       //     sellPrice: parseInt(values.sellPrice),
//       //     selltax: parseInt(values.sellTax),
//       //     sellDiscount: parseInt(values.sellDiscount),
//       //     isConsumable: parseInt(values.isConsumable),
//       //     isSellable: parseInt(values.isSellable),
//       //     isService: parseInt(values.isService),
//       //     categoryId: values.categoryId,
//       //   };
//       //   props.handleSubmit(req_value);
//       // }}
//     >
//       <Grid container>
//         <Grid item xs={6}>
//         <Controls.Select
//             label="Category Name"
//             name="categoryId"
//             value={values.categoryId}
//             onChange={handleInputChange}
//             options={loadCategory}
//             error={errors.categoryId}
//             required={true}
//           />
//           <Controls.Input
//             name="productname"
//             label="Product Name"
//             value={values.productname}
//             onChange={handleInputChange}
//             error={errors.productname}
//             required={true}
//           />
         
//          <Controls.Input
//             label="Cost Price"
//             type="number"
//             name="costPrice"
//             onKeyDown={(e) =>
//               (e.keyCode === 69 || e.keyCode === 187||e.keyCode === 189) &&
//               e.preventDefault()
//             }
//             value={values.costPrice}
//             onChange={handleInputChange}
//             error={errors.costPrice}
//             required={true}
//           />
//           <Controls.Input
//             label="Sell Price"
//             type="number"
//             name="sellPrice"
//             onKeyDown={(e) =>
//               (e.keyCode === 69  || e.keyCode === 187||e.keyCode === 189) &&
//               e.preventDefault()
//             }
//             value={values.sellPrice}
//             onChange={handleInputChange}
//             error={errors.sellPrice}
//             required={true}
//           />
//           <Grid container>
           
//            <Grid item xs={6}>
//              <Controls.CheckBox
//              name="serviceCharge"
//              label="Service Charge"
//               value={values.isServiceCharge}
            
//              onChange={(e) => {
//                let new_val = e.target.value ? 1 : 0;
//                onServiceChargeInputChange("isServiceCharge", new_val);
//              }}
//            />
//            </Grid>
   
//            <Grid item xs={6}>
//              <Controls.CheckBox
//                name="tax"
//                label="Tax"
//                 value={values.isTax}             
//                onChange={(e) => {
//                  let new_val = e.target.value ? 1 : 0;
//                  onTaxInputChange("isTax", new_val);
//                }}
//              />
//            </Grid>
//            </Grid>  

//  {isServiceCharge ?
//           <Controls.Input
//             label="Service Charge"
//             type="number"
//             name="serviceCharge"
//             step="0.1"
//             onKeyDown={(e) =>
//               (e.keyCode === 69 || e.keyCode === 190 || e.keyCode === 187) &&
//               e.preventDefault()
//             }
//             value={values.serviceCharge}
//             onChange={handleInputChange}
//           />
//       :null} 
//       {isTax ? 
//          <Controls.Select
//             label="Sell Tax"
//             name="selltax"
//             value={values.selltax}
//             onChange={handleInputChange}
//             options={taxRates}           
          
//           />
//       :null} 
//           <Grid item xs={12}>
//             <Switch
//               color="primary"
//               // checked={values.isService === 1 ? 1 : 0}
//               defaultValue="on"
//               onChange={(e) => {
//                 let new_val = e.target.checked ? 1 : 0;
//                 onServiceInputChange("isService", new_val);
//               }}
//               label="Service"
//             />
//             Service
//           </Grid>
//           <Grid item xs={12}>
//             <Switch
//               color="primary"
//               checked={values.isConsumable === 1 ? true : false}
//               defaultValue="on"
//               onChange={(e) => {
//                 let new_val = e.target.checked ? 1 : 0;
//                 onInputChange("isConsumable", new_val);
//               }}
//               label="Service"
//             />
//             Consumable
//           </Grid>
//           <Grid item xs={12}>
//             <Switch
//               color="primary"
//               checked={values.isSellable === 1 ? true : false}
//               defaultValue="on"
//               onChange={(e) => {
//                 let new_val = e.target.checked ? 1 : 0;
//                 onInputChange("isSellable", new_val);
//               }}
//               label="Service"
//             />
//             Sellable
//           </Grid>
//         </Grid>

//         <Grid item xs={6}>

//         <Controls.Input
//             name="displayName"
//             label="Display Name"
//             value={displayName || ""}
//             onChange={(e) => {
//               setDisplayName(e.target.value);
//             }}
//             error={errors.displayName}
//             required={true}
//             />
//           <Controls.Input
//             name="code"
//             label="Code"
//             value={values.code}
//             onChange={handleInputChange}
//             error={errors.code}
//             required={true}
//           />
//           {/* <Controls.Select
//             label="Base Name"
//             name="unitId"
//             // defaultValue={}
//             value={unitListById}
//             onChange={handleBaseUnit}
//             options={unitList}
//             // error={errors.Id}
//           /> */}
//           <Grid item xs={12}>
            
//               <div className="productsAdd addProductsForm">
//               {/* {unitListById.length > 1 ?
               
//                 <Select
//                   style={{ width: "50%" }}
//                   type="text"
//           placeholder={"Base Unit"}
//                   options={unitList}
//                   isDisabled
//                   value={unitListById}
//                   onChange={(e) => {
//                     const _temp = {
//                       label: e.label,
//                       value: e.value,
//                     }
//                     setunitListById(_temp);
//                   }}
//                 >
//                 </Select>
//                 : */}
//                 <Controls.Select
//                   label="Base Unit"
//                   name="unitId"
//                   value={values.unitId}
//                   inputProps={{ readOnly: true }}
//                   disabled={true}
//                   // onChange={handleInputChange}
//                   options={unitlist}
//                   error={errors.unitId}
//                 />
// {/* } */}
//               </div>
         
//             {/* KOT Print:
//             <Select
//               style={{ width: "50%"}}
//               styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
//               menuPortalTarget={document.body}
//               options= {KOTPrint}
         
//               value={kot}
//               onChange = {(e) => {
//                 const _temp = {
//                   label: e.label,
//                   value: e.value,
//                 }
//                 setKot(_temp);
//               }}
             
//               /> */}
//           <Controls.Select
//             label="KOT"
//             name="kot_print"
//             value={values.kot_print}
//             onChange={handleInputChange}
//             options={KOTPrint}
//             error={errors.kot_print}
//           /> 
          
          
        
//             {_data.id ?
//    <BlockPicker color={color} onChange={updatedColor => setColor(updatedColor.hex)}/> 

// : 
// <div>
// <Controls.Button color="primary"   onClick={() => setShowColorPicker(showColorPicker => !showColorPicker)} text= {showColorPicker ? 'Close color picker' : 'Pick a color'}/> 
//            {showColorPicker && (    <BlockPicker color={color} onChange={updatedColor => setColor(updatedColor.hex)}/> )}
//            </div> 
//            }
// </Grid>
//         </Grid>

//         <div>
//           <Controls.Button
//             type="submit"
//             text="Submit"
//             // onClick={(e) => {
//             //   e.preventDefault();
//             //   let req_value = {
//             //     name: values.productname,
//             //     code: values.code,
//             //     displayName: values.displayName,
//             //     costPrice: parseInt(values.costPrice),
//             //     costtax: parseInt(values.costtax),
//             //     costDiscount: parseInt(values.costDiscount),
//             //     sellPrice: parseInt(values.sellPrice),
//             //     selltax: parseInt(values.selltax),
//             //     sellDiscount: parseInt(values.sellDiscount),
//             //     isConsumable: parseInt(values.isConsumable),
//             //     isSellable: parseInt(values.isSellable),
//             //     isService: parseInt(values.isService),
//             //     categoryId: values.categoryId,
//             //   };
//             //   props.handleSubmit(req_value);
//             //   if (props.insertId === undefined) {
//             //     return <Spinner />;
//             //   } else {
//             //     props.step_handler("next");
//             //   }
//             // }}
//           />
//           {/* <Controls.Button text="Reset" color="default" onClick={ResetForm} /> */}
//         </div>
//       </Grid>
//     </Form>
//   );
// }
