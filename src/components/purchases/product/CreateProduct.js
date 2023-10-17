import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../../utils/config";
import { toast } from "react-toastify";
import { Switch } from "@material-ui/core";
import "../../../utils/styles.css";
import UserSessionContext from "../../../contexts/UserSessionContext";
import Controls from "../../controls/Controls";
import { Grid } from "@material-ui/core";
import { useForm, Form } from "../../home/useForm";
import Spinner from "../../../utils/spinner";
import Select from "react-select";

import Popup from "../../home/Popup";
import UnitForm from "../../inventory/UnitForm";
import {  TwitterPicker } from "react-color";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import CategoryForm from "./CategoryForm";
const initialFValues = {
  productname: "",
  code: "",
  displayName: "",
  costPrice: "",
  costtax: 0,
  costDiscount: 0,
  sellPrice: "",
  selltax: 0,
  sellDiscount: "",
  isConsumable: 1,
  isSellable: 0,
  isService: 0,
  isTax: 0,
  isServiceCharge: 0,
  serviceCharge: "",
  barcode: "",
  categoryId: "",
  unitId: "",
};




export default function CreateProducts(props) {
 
  const userSessionContext = React.useContext(UserSessionContext);
  const _data = props.data || initialFValues;


  const [loadCategory, setLoadCategory] = useState();

  const [unitList, setunitList] = useState();

  const [kot, setKot] = useState("");

  const [color, setColor] = useState("#fff");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [displayName, setDisplayName] = useState();
 // const [productname, setProductName] = useState();
  //const [taxPercent, setTaxPercent] = useState(13);
  const [taxRates, setTaxRates] = useState();
  const [barcode, setBarcode]=useState(_data.barcode||null);
  const[productBarcode, setProductBarcode]=useState(null);
  const[isTax, setIsTax]=useState(false);
  const[isServiceCharge, setIsServiceCharge]=useState(0);
   const [Cat, setCat] = React.useState();
   const [isNewPopup, setIsNewPopup] = useState(false);
   const [isNewCatPopup, setIsNewCatPopup] = useState(false);
  // const genBarCode = ()=>{
  //   if(barcode!==null||undefined){
  //     setProductBarcode(barcode);
  //   }
  //   else{
  //     getBarCode();
  //     setProductBarcode(null);
 
  //   }
  // }

  // const getBarCode = () =>{

  //   axios
  //   .get(`${config.APP_CONFIG}/Products/productBarcode/Api`, {

  //     headers: {
  //       Authorization: userSessionContext.token,
  //     },
  //   })
  //   .then((res) => {
  //     if (res.data.status_code === 200) {
  //       let a=res.data.msg;
  //       setBarcode(a);
  //     } 
  //     else {
  //       toast.error("Warning");
  //       setBarcode([]);
  //     }
  //   })
  //   .catch((err) => {
  //     toast.error("Error");
  //     setBarcode([]);
  //   });

  // };


  useEffect(() => {
    //loadTaxRates();
    loadCategoryname();
  }, []);
  // const loadTaxRates = () => {
  //   axios
  //     .get(`${config.APP_CONFIG}/Account/TaxRates/api`, {
  //       headers: { Authorization: userSessionContext.token },
  //     })
  //     .then((res) => {
  //       if (res.data && res.data.status_code && res.data.status_code === 200) {
  //         let taxList = res.data.msg.map((name, index) => ({
  //           title: name.amount,
  //           id: name.id,
  //         }));
  //          taxList= [{ id: 0, title: 0 }].concat(taxList);
  //         setTaxRates(taxList);
         
  //       } else {
  //         toast.error(res.data.msg || "Cannot load Tax Rates");
  //         setTaxRates([]);
  //       }
  //     })
  //     .catch((err) => {
  //       toast.error("Failed to Load Tax Rates");
  //       setTaxRates([]);
  //     });
  // };

  useEffect(() => {
    loadunitList();
  }, []);

  const KOTPrint = [
    { value: 1, label: "K1" },
    { value: 2, label: "K2" },
    { value: 3, label: "K3" },
    { value: 4, label: "K4" },
    { value: 5, label: "K5" },
    { value: 6, label: "K6" },
    { value: 7, label: "K7" },
    { value: 8, label: "K8" },
    { value: 9, label: "K9" },
    { value: 10, label: "K10" },
    { value: 11, label: "K11" },
    { value: 12, label: "K12" },
    { value: 13, label: "K13" },
    { value: 14, label: "K14" },
    { value: 15, label: "K15" },
    { value: 16, label: "B1" },
    { value: 17, label: "B2" },
  ];

  // const validate = (fieldValues = values) => {
  //   let temp = {...errors}

  //   if('categoryId' in fieldValues){
  //     temp.categoryId = fieldValues.categoryId ? "" : "This field is required."
  //   }
  //   // if('displayName' in fieldValues){
  //   //   temp.displayName = fieldValues.displayName ? "" : "This field is required."
  //   // }
  //   if('code' in fieldValues){
  //     temp.code = fieldValues.code ? "" : "This field is required."
  //   }
  //   if('costPrice' in fieldValues){
  //     temp.costPrice = fieldValues.costPrice ? "" : "This field is required."
  //   }
  //   if('sellPrice' in fieldValues){
  //     temp.sellPrice = fieldValues.sellPrice ? "" : "This field is required."
  //   }

  //   if('unitId' in fieldValues){
  //     temp.unitId = fieldValues.unitId ? "" : "This field is required."
  //   }
  //   setErrors({...temp})
  //   if (fieldValues == values)
  //   return Object.values(temp).every(x => x == "")
  // }
  //const selectedOption = loadCategory.find((option) => option.value === values.categoryId);
  const validate = (fieldValues=values) => {
   
    let temp = { ...errors };
    // if ("categoryId" in fieldValues)
    // temp.categoryId = fieldValues.categoryId ?"" : "This field is required.";
    if ("productname" in fieldValues)
    temp.productname = fieldValues.productname?"": "This field is required.";

    // temp.displayName = displayName?"": "This field is required.";

    if ("code" in fieldValues)
      temp.code = fieldValues.code ?"" : "This field is required.";

      if('costPrice' in fieldValues){
        temp.costPrice = fieldValues.costPrice ? "" : "This field is required."
      }

    if ("sellPrice" in fieldValues)
      temp.sellPrice = fieldValues.sellPrice?"" : "This field is required.";

    if ("unitId" in fieldValues)
      temp.unitId = fieldValues.unitId?"" : "This field is required.";

    

    setErrors({ ...temp });

    return Object.values(temp).every((x) => x === "");
  };



  const { values, setValues, handleInputChange, ResetForm, errors, setErrors } = useForm(_data, true, validate);

    
  useEffect((e) => {
    if (values.productname !== undefined) {
      setDisplayName(values.productname);
    }
  },
  [values.productname]
);

//  useEffect(() => {
//   let new_val = values.isConsumable === 1 ? 0 : 1;
//   setValues({ ...values, isSellable: new_val });
// }, [values.isConsumable]);

// useEffect(() => {
//   let new_val = values.isSellable === 1 ? 0 : 1;
//   setValues({ ...values, isConsumable: new_val });
// }, [values.isSellable]);

    

    const loadCategoryname = async () => {
      await axios
        .get(`${config.APP_CONFIG}/Products/ProductCategory/api`, {
          headers: { Authorization: userSessionContext.token },
        })
        .then((res) => {
          if (res.data && res.data.status_code && res.data.status_code === 200) {
            let temp = res.data.msg.map((name, index) => ({
              label: name.categoryName,
              value: name.id,
            }));
            setLoadCategory(temp);
          } else {
            toast.error("Cannot load category name.");
            setLoadCategory([]);
          }
        })
        .catch((err) => {
          toast.error("Failed to load data");
          setLoadCategory([]);
        });
    };

  const loadunitList = () => {
    axios
      .get(`${config.APP_CONFIG}/Products/ProductInhouseUnit/api`, {
        headers: { Authorization: userSessionContext.token },
      })
      .then((res) => {
        if (res.data.status_code === 200) {
          let temp = res.data.msg.map((x, index) => ({
            title: x.name,
            id: x.id,
          }));
          setunitList(temp);
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogout();
        } else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
        } else {
          toast.error("Cannot load bases name.");
          setunitList([]);
        }
      })
      .catch((err) => {
        toast.error("failed to load data");
        setunitList([]);
      });
  };
 
  // if (taxRates=== undefined) {
  //   return <Spinner />;
  // }

  const onInputChange = (_key, _value) => {
 
    setValues({ ...values, [_key]: _value });
  };

  const onServiceInputChange = (_key, _value) => {
    setValues({ ...values, [_key]: _value });
  };

  // const onServiceChargeInputChange = (_key, _value) => {
  //   setIsServiceCharge(_value)
  //   setValues({ ...values, [_key]: _value });
  // };
 
  const onTaxInputChange = (_key, _value) => {
    setIsTax(_value)
    setValues({ ...values, [_key]: _value });
  };
  // useEffect(() => {
  //   const onInputChange = (_key, _value) => {
  //     console.log(_value)
  //    {_value===1?setService(true):setService(false)}
  //     setValues({ ...values, [_key]: _value });
  //   }
  // }, [values]);
  

  const handleSubmission = (e) => {
   
    e.preventDefault();
    if(Cat.value===undefined||null){

      toast.warn("please select Category");
    }
else{
    if (validate()) {



      let req_value = {
        id: values.id,
        productname: values.productname,
        code: values.code,
        displayName: displayName||values.productname,
        costPrice: parseFloat(values.costPrice) || 0,
        costtax:  0,
        costDiscount: 0,
        sellPrice: parseFloat(values.sellPrice) || 0,
        selltax:parseFloat(  parseInt(values.isTax)===1?parseFloat(values.sellPrice)*0.13:0),
        sellDiscount: parseInt(values.sellDiscount) || 0,
        isConsumable: parseInt(values.isConsumable),
        isSellable: parseInt(values.isSellable),
        isTax:parseInt(values.isTax),
        isService: parseInt(values.isService),
        barcode: barcode||"000000",
        categoryId:Cat.value,
        unitId: values.unitId,
        serviceCharge: parseInt(values.serviceCharge) || 0,
        imageColour: color,
        isServiceCharge: parseInt(values.isServiceCharge),
        kot_print: kot.label || "K1",
      };
      
      AddProduct(req_value);
      ResetForm();
    }
  }
  };
  const AddProduct =async (_data) => {
   
  
   await axios.post(`${config.APP_CONFIG}/Products/product/Api`, _data, {
        headers: { Authorization: userSessionContext.token },
      })
      .then((res) => {
        if (res.data.msg === undefined) {
          return <Spinner />;
        }

        if (res.data.status_code === 200) {
          const req_data = {
            productId: res.data.msg,
            baseUnit: 1,
            ratio: 1,
            unitId: values.unitId,
          };

          axios
            .post(`${config.APP_CONFIG}/product/ProductUnit/api`, req_data, {
              headers: { Authorization: userSessionContext.token },
            })
            .then((es) => {
              if (es.data.status_code === 200) {
                toast.success("Added UnitName");
                props.load_table();
              } else if (es.data.status_code === 400) {
                toast.warn(es.data.msg);
              } else if (es.data.status_code === 401) {
                userSessionContext.handleLogout();
              } else {
                toast.error(es.data.msg || "Cannot insert unit.");
              }
            })
            .catch((err) => {
              toast.error("Failed to insert unit");
            });
          props.setInsertId(res.data.msg);
          props.step_handler("next");
          toast.success("Successfully inserted Product");
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogout();
        } else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
        } else {
          toast.error("error occured");
        }
      })
      .catch((err) => {
        toast.error("Failed to insert Product");
      });
  };
    if (loadCategory === undefined) {
    return <Spinner />;
  }

 
 
//   let current_tax = taxRates.filter(x=>(x.id === values.selltax) )
//   //let current_tax = taxRates.filter(x=>(x["title"].toUpperCase() === values.selltax.toUpperCase()) )
 
//   values.selltax=0
// if(current_tax.length!==0){
//   values.selltax= current_tax[0]["id"]
// }
const AddUnitName = (_data) => {
  axios
    .post(`${config.APP_CONFIG}/Products/ProductInhouseUnit/api`, _data, {
      headers: {
        Authorization: userSessionContext.token,
      },
    })
    .then((res) => {
      if (res.data.status_code === 200) {
        loadunitList ();
        setIsNewPopup(false);
        toast.success("UnitName Added");
      } else if (res.data.status_code === 401) {
        userSessionContext.handleLogout();
      } else if (res.data.status_code === 400) {
        toast.warn(res.data.msg);
      } else {
        toast.error("Unable to Add UnitName");
      }
    })
    .catch((err) => {
      toast.error("Something went Wrong");
    });
    setIsNewPopup(false)
};
const addCategory = (_data) => {
  axios
    .post(`${config.APP_CONFIG}/Products/ProductCategory/api`, _data, {
      headers: { Authorization: userSessionContext.token },
    })
    .then((res) => {
      if (res.data.status_code === 200) {
        toast.success(res.data.msg || "successfully added");
        loadCategoryname();
        setIsNewCatPopup(false);
      } else if (res.data.status_code === 401) {
        userSessionContext.handleLogout();
      } else if (res.data.status_code === 400) {
        toast.error(res.data.msg);
        //setRecords([]);
      }
    })
    .catch((err) => {
      toast.error("Something Went Wrong");
      //setRecords([]);
    });
    setIsNewCatPopup(false);
};

  return (
   <div>
    {isNewPopup ? (
    <Popup
      title="Add Unit Conversion Rate"
      openPopup={isNewPopup}
      setPopups={setIsNewPopup}
    >
      <UnitForm
           handleSubmit={AddUnitName }
       
           setIsNewPopup={setIsNewPopup}
           loadunitList ={props.loadunitList }
      />
    </Popup>
  ) : null}
  {isNewCatPopup ? (
    <Popup
      title="Add Category"
      openPopup={isNewCatPopup}
      setPopups={setIsNewCatPopup}
    >
      <CategoryForm
           handleSubmit={addCategory }
       
           setIsCatNewPopup={setIsNewCatPopup}
           loadCategoryname ={props.loadCategoryname }
      />
    </Popup>
  ) : null}
    <Form
      onSubmit={handleSubmission}
    >
      <Grid container spacing={0.01}>
        <Grid item xs={4}>
        <Grid container spacing={0.01}>
        <Grid item xs={11}>
        <div className="productsAdd addProductsForm">
            <Select
              style={{ width: "25%" }}
              options={loadCategory}
              styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
              menuPortalTarget={document.body}
              placeholder={" Choose Category"}
              value={Cat}
              onChange={(e) => {
                const _temp = {
                  label: e.label,
                  value: e.value,
                };
                setCat(_temp);
              }}
            />
            </div>
            </Grid>
            <Grid item xs={1}>
            <div style={{position:"relative"}}>
        <Controls.ActionButton
          size="small"
          variant="contained"
          color="#ffffff"
          onClick={() => {
            setIsNewCatPopup(!isNewCatPopup);
          }}
        
         >
          
           <Tooltip title="Add Category">
            <AddIcon style={{ fontSize: "20px", top: "10px",right:"0px",position:"absolute",color:"red"}} />
          </Tooltip>
         </Controls.ActionButton> 
</div>
</Grid>
            </Grid>
          <Controls.Input
            name="productname"
            label="Product Name"
            value={values.productname}
            onChange={handleInputChange}
            // onChange={(e) => {
            //   setProductName(e.target.value);
            // }}
             onClick={(e) => {
              setDisplayName(e.target.value);
             }}
            error={errors.productname}
            
          />
                 <Grid container spacing={0.1}>
                    <Grid item xs={10}>
                <Controls.Select
            label="Base Unit"
            name="unitId"
            value={values.unitId}
            onChange={handleInputChange}
            options={unitList}
            error={errors.unitId}
          />
</Grid>
<Grid item xs={2} >
    <div style={{position:"relative"}}>
        <Controls.ActionButton
          size="small"
          variant="contained"
          color="#ffffff"
          onClick={() => {
            setIsNewPopup(!isNewPopup);
          }}
        
         >
          
           <Tooltip title="Add Unit">
            <AddIcon style={{ fontSize: "20px", top: "10px",right:"0px",position:"absolute",color:"red"}} />
          </Tooltip>
         </Controls.ActionButton> 
</div>
</Grid>
</Grid>
</Grid>
    
          
     


          {/* <Grid container>
           
           <Grid item xs={6}>
            <Controls.CheckBox
            name="serviceCharge"
            label="Service Charge"
            // value={values.isServiceCharge}
           
            onChange={(e) => {
              let new_val = e.target.value ? 1 : 0;
              onServiceChargeInputChange("isServiceCharge", new_val);
            }}
          />
          </Grid>
  
          <Grid item xs={6}>
            <Controls.CheckBox
              name="tax"
              label="Tax"
              // value={values.isTax}             
              onChange={(e) => {
                let new_val = e.target.value ? 1 : 0;
                onTaxInputChange("isTax", new_val);
              }}
            />
          </Grid>
          </Grid>  */}
      {/* {isServiceCharge ?
          <Controls.Input
            label="Service Charge"
            type="number"
            name="serviceCharge"
            step="0.1"
            onKeyDown={(e) =>
              (e.keyCode === 69 || e.keyCode === 190 || e.keyCode === 187) &&
              e.preventDefault()
            }
            value={values.serviceCharge}
            onChange={handleInputChange}
          />
      :null} 
      {isTax ? 
         <Controls.Select
            label="Sell Tax"
            name="selltax"
            value={values.selltax}
            onChange={handleInputChange}
            options={taxRates}           
          
          />
      :null}
          <Controls.Input
            label="Sell Discount"
            type="number"
            name="sellDiscount"
            step="0.1"
            onKeyDown={(e) =>
              (e.keyCode === 69 || e.keyCode === 190 || e.keyCode === 187) &&
              e.preventDefault()
            }
            value={values.sellDiscount}
            onChange={handleInputChange}
          />  */}

         
     

        <Grid item xs={3} >
        <Controls.Input
            name="code"
            label="Code"
            value={values.code}
            onChange={handleInputChange}
            onKeyDown={(e) =>
              (e.keyCode === 190 || e.keyCode === 187 || e.keyCode === 189) &&
              e.preventDefault()
            }
            error={errors.code}
            required={true}
          />
        <Controls.Input
            label="Cost Price"
            type="number"
            name="costPrice"
            step="0.1"
            value={values.costPrice}
            onKeyDown={(e) =>
              (e.keyCode === 69 || e.keyCode === 187 || e.keyCode === 189) &&
              e.preventDefault()
            }
            onChange={handleInputChange}
            error={errors.costPrice}
            required={true}
          />

          <Controls.Input
            label="Sell Taxable Price"
            type="number"
            name="sellPrice"
            step="0.1"
            onKeyDown={(e) =>
              (e.keyCode === 69 || e.keyCode === 187 || e.keyCode === 189) &&
              e.preventDefault()
            }
            value={values.sellPrice}
            onChange={handleInputChange}
            error={errors.sellPrice}
            required={true}
          />
          
          <Controls.CheckBox
              name="tax"
              label="Tax"
              value={values.isTax}             
              onChange={(e) => {
                let new_val = e.target.value ? 1 : 0;
                onTaxInputChange("isTax", new_val);
              }}
            />
          </Grid>
                 <Grid item xs={2} >
          <Controls.Input
            name="displayName"
            label="Display Name"
            value={displayName || ""}
            onChange={(e) => {
              setDisplayName(e.target.value);
            }}
            error={errors.displayName}
          
          />
         
    
       
          <Controls.Input
            name="barcode"
           label="Barcode"
            value={barcode}
            onChange={(e) => setProductBarcode(e.target.value)}
            onKeyDown={(e) =>
              (e.keyCode === 190 || e.keyCode === 187 || e.keyCode === 189) &&
              e.preventDefault()
            }
            
          />
      

          {/* <Grid item xs={6}>
          <Controls.Button
            
             text="Generate Barcode" 
             onClick={genBarCode} 
             style={{marginTop: "16px", right: "05px", width: "auto",fontSize:"10px"}}
             />
          </Grid> */}
          {/* </Grid> */}

        {/* {barcode ?(
         <Barcode 
          value={barcode}
          options={{width: 1, height: 50}}
      
        />): null}  */}

    
<div className="productsAdd addProductsForm">
            <Select
              style={{ width: "25%" }}
              options={KOTPrint}
              styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
              menuPortalTarget={document.body}
              placeholder={"KOT Print"}
              value={kot}
              onChange={(e) => {
                const _temp = {
                  label: e.label,
                  value: e.value,
                };
                setKot(_temp);
              }}
            />
            </div>
            </Grid>
            <Grid item xs={2}>
            <Controls.Button
              color="primary"
              onClick={() =>
                setShowColorPicker((showColorPicker) => !showColorPicker)
              }
              text={showColorPicker ? "Close color picker" : "Pick a color"}
            />
            {showColorPicker && (
              <TwitterPicker
                color={color}
                onChange={(updatedColor) => setColor(updatedColor.hex)}
              />
            )}

         
           
        
        </Grid>
        <Grid item xs={12}>
            <Switch
              color="primary"
              // checked={values.isService === 1 ? 1 : 0}
              defaultValue="on"
              onChange={(e) => {
                let new_val = e.target.checked ? 1 : 0;
                onServiceInputChange("isService", new_val);
              }}
              label="Service"
            />
            Service
          </Grid>

          <Grid item xs={12}>
            <Switch
              color="primary"
              checked={values.isConsumable === 1 ? true : false}
              defaultValue="on"
              onChange={(e) => {
                let new_val = e.target.checked ? 1 : 0;
                onInputChange("isConsumable", new_val);
              }}
              label="Service"
            />
            Consumable
          </Grid>
          <Grid item xs={12}>
            <Switch
              color="primary"
              checked={values.isSellable === 1 ? true : false}
              defaultValue="on"
              onChange={(e) => {
                let new_val = e.target.checked ? 1 : 0;
                onInputChange("isSellable", new_val);
              }}
              label="Service"
            />
            Sellable
          </Grid>
     

        <div>          
          <Controls.Button type="submit" text="Submit" />
          <Controls.Button text="Reset" color="default" onClick={ResetForm} />
        </div>
      </Grid>
      
    </Form>
    </div>
  );
}
