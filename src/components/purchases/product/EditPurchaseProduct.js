import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../../utils/config";
import { toast } from "react-toastify";
import { Switch, } from "@material-ui/core";
import "../../../utils/styles.css";
import UserSessionContext from "../../../contexts/UserSessionContext";
import Controls from "../../controls/Controls";
import { Grid } from "@material-ui/core";
import { useForm, Form } from "../../home/useForm";
import Spinner from "../../../utils/spinner";
import Select from "react-select";
import { BlockPicker, TwitterPicker } from 'react-color';

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
];;
export default function EditPurchaseProduct(props) {
  const userSessionContext = React.useContext(UserSessionContext);
  const _data = props.data;

  const [loadCategory, setLoadCategory] = useState();
  const [unitList, setunitList] = useState();
  const [unitlist, setunitlist] = useState();
  const [unitListById, setunitListById] = useState({});
   const [unitBaseId, setunitBaseId] = useState();
  const [taxRates, setTaxRates] = useState(props.taxRate);
  const [color, setColor] = useState(_data.imageColour||'#f47373')
  const [displayName, setDisplayName] = useState();
  //const [productname, setProductName] = useState();
  const [showColorPicker, setShowColorPicker] = useState(false)
  const[isTax, setIsTax]=useState(_data.isTax||0);
  const[isServiceCharge, setIsServiceCharge]=useState(_data.isServiceCharge||0);
  const[kot,setKot]=useState(()=>{
    if(Object.keys(KOTPrint).length === 0){
      return
    }
    return {
      value:0,
      label:_data.kot_print,

    }
  })

  const [Cat, setCat] = React.useState(()=>{
    if(_data === undefined){
      return
    }
    if(Object.keys(_data).length === 0){
      return
    }
    return {
      value:_data.categoryId,
      label:_data.categoryname,

    }
  });
  const [unit, setUnit] = React.useState(()=>{
    if(_data === undefined){
      return
    }
    if(Object.keys(_data).length === 0){
      return
    }
    return {
      value:_data.unitId,
      label:_data.UnitName,

    }
  });
  // const [BaseUnit, setBaseunit] = React.useState(()=>{
  //   if(_data === undefined){
  //     return
  //   }
  //   if(Object.keys(_data).length === 0){
  //     return
  //   }
  //   return {
  //     value:_data.unitId,
  //     label:_data.UnitName,

  //   }
  // });
  const [barcode, setBarcode]=useState(_data.barcode||"000000");
  const[productBarcode, setProductBarcode]=useState(null);

  const validate = (fieldValues = values) => {
    let temp = {...errors}
    if('productname' in fieldValues){
      temp.productname = fieldValues.productname? "" : "This field is required."
    }
   
    if('code' in fieldValues){
      temp.code = fieldValues.code ? "" : "This field is required."
    }
     if('costPrice' in fieldValues){
      temp.costPrice = fieldValues.costPrice ? "" : "This field is required."
    }
    if('sellPrice' in fieldValues){
      temp.sellPrice = fieldValues.sellPrice ? "" : "This field is required."
    }
    setErrors({...temp})
    if (fieldValues == values)
    return Object.values(temp).every(x => x === "")
  }
  useEffect(() => {
   // loadTaxRates();
    loadCategoryname();
  
    loadunitList();
    loadunit();
    
    
    // if(unitListById !== undefined){
      loadUnitById();
    // }
  }, []);

  const { values, setValues, handleInputChange, ResetForm, errors, setErrors } = useForm(_data, true, validate);
  useEffect(
    (e) => {
      if (values.productname !== undefined) {
        setDisplayName(values.productname);
      }
    },
    [values.productname]
  );



  // useEffect(() => {
  //   let new_val = values.isConsumable === 1 ? 0 : 1;
  //   setValues({ ...values, isSellable: new_val });
  // }, [values.isConsumable]);

  // useEffect(() => {
  //   let new_val = values.isSellable === 1 ? 0 : 1;
  //   setValues({ ...values, isConsumable: new_val });
  // }, [values.isSellable]);
 
  const loadunit = async () => {
   await axios
      .get(`${config.APP_CONFIG}/Products/ProductInhouseUnit/api`, {
        headers: { Authorization: userSessionContext.token },
      })
      .then((res) => {
        if (res.data.status_code === 200) {
          let temp = res.data.msg.map((x, index) => ({
            title: x.name,
            id: x.id,
          }));
          setunitlist(temp);
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogout();
        } else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
        } else {
          toast.error("Cannot load bases name.");
          setunitlist([]);
        }
      })
      .catch((err) => {


        
        toast.error("failed to load data");
        setunitlist([]);
      });
  };
  const loadunitList = async() => {
   await axios
      .get(`${config.APP_CONFIG}/Products/ProductInhouseUnit/api`, {
        headers: { Authorization: userSessionContext.token },
      })
      .then((res) => {
        if (res.data.status_code === 200) {
          let temp = res.data.msg.map((x, index) => ({
            label: x.name,
            value: x.id,
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


  const loadUnitById = async() => {
   await axios
      .get(`${config.APP_CONFIG}/product/ProductUnit/api/${props.data.id}`, {
        headers: { Authorization: userSessionContext.token },
      })
      .then((res) => {
        if (res.data.status_code === 200) {
    console.log("baseunits",res.data.msg)
          if(res.data.msg[0]["baseUnit"]===1)
          {

          //  const _tempBaseMeasurement = [res.data.msg[0]]
          //   let temp = _tempBaseMeasurement.map((x, index) => ({
          //     title: x.unitName,
          //     id: x.unitId,
          //   }));
          const _tempUnitId = res.data.msg[0]["id"]
          const _tempUnitName = res.data.msg[0]["unitName"]
          // console.log(_tempUnitId)
            
            // setunitListById(_tempBaseMeasurement);
              
            setunitBaseId(_tempUnitId)

            setunitListById({ ...unitListById, label:_tempUnitName, value:_tempUnitId});
          
          }
          
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogout();
        } else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
        } else {
          toast.error("Something Went Wrong");
          setunitListById([]);
        }
      })
      .catch((err) => {
    
        toast.error("Failed to load Base Unit Name");
        setunitListById([]);
      });
  };


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
        toast.error("failed to load data");
        setLoadCategory([]);
      });
  };

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

  if (loadCategory === undefined) {
    return <Spinner />;
  }

  // const getCheckBox = (key, callback) => {
  //   return (
  //     <Switch
  //       color="primary"
  //       checked={key === 1 ? true : false}
  //       defaultValue="on"
  //       onChange={(e) => {
  //         let changedValue = 0;
  //         if (key === 0) {
  //           changedValue = 1;
  //         }
  //         callback(changedValue);
  //       }}
  //     />
  //   );
  // };

  const updateProduct = (data) => {
  
   // let cat_id= loadCategory.filter(x=>(x.value=== Cat) )
   
    const res_data = {
    

      productname: values.productname,
      code: values.code,
      displayName: values.displayName,
      costPrice: parseFloat(values.costPrice) || 0,
      costtax:  values.costtax||0,
      costDiscount:  values.costDiscount||0,
      sellPrice: parseFloat(values.sellPrice) || 0,
      selltax:  parseFloat(  parseInt(values.isTax)===1?parseFloat(values.sellPrice)*0.13:0), 
      sellDiscount:   values.sellDiscount||0,
      isConsumable: parseInt(values.isConsumable),
      isSellable: parseInt(values.isSellable),
      isService: parseInt(values.isService),
      categoryId: Cat.value,
      unitId:unit.value,
      imageColour:color,
      kot_print:kot.label ,
      barcode: barcode,
      isTax: parseInt(values.isTax),
      isServiceCharge:isServiceCharge,
      serviceCharge: 0
    }
   
    axios.put(`${config.APP_CONFIG}/Products/product/api/${data.id}`, res_data, {
        headers: { Authorization: userSessionContext.token },
      })
      .then((res) => {
        if (res.data.status_code === 200) {
          // props.setIsEditPopup(false);
          const req_data = {
          productId: data.id,
          baseUnit: 1,
          ratio: 1,
          unitId:unit.value,                 
        };
       //props.setDatas([...data,req_data]);
     

        axios.put(`${config.APP_CONFIG}/product/ProductUnit/api/${unitBaseId}`, req_data , { headers: { Authorization: userSessionContext.token }})
        .then((es) => {
          if (es.data.status_code === 200) {
            toast.success(es.data.msg || "  Change BaseUnitName Successfully.");
            // const _baseMeasurement = {
            //   baseUnit: 1,
            //   ratio: 1,
            //   unitId:unitListById.value,  
            //   unitName:unitListById.label,
            // }
            //props.setBaseUnit({...props.baseUnit, ..._baseMeasurement}) // updating PurchaseProducts.js for loading _baseMeasurement to EditProductUnit.js through ProductEditStepper
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
          //  console.log(res.data.msg)
         toast.success("successfully Updated")

        props.step_handler("next")
       props.load_table();
          ResetForm();
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogout();
        } else if (res.data.status_code === 400) {
       
          toast.warn(res.data.msg);
        } else {
          toast.error("Error Occurred");
        }
      })
      .catch((err) => {
        toast.error("Something Went Wrong");
      });
  
  };
  const genBarCode = ()=>{
   
    
    if(barcode!==null||undefined){
      getBarCode();
     // setProductBarcode(barcode);
    }
    else{
      
      getBarCode();
      setProductBarcode(null);
 
    }
  }

  const getBarCode = () =>{

    axios
    .get(`${config.APP_CONFIG}/Products/productBarcode/Api`, {

      headers: {
        Authorization: userSessionContext.token,
      },
    })
    .then((res) => {
      if (res.data.status_code === 200) {
        let a=res.data.msg;
        setBarcode(a);
      } 
      else {
        toast.error("Warning");
        setBarcode([]);
      }
    })
    .catch((err) => {
      toast.error("Error");
      setBarcode([]);
    });

  };

  const handleSubmission = (e) => {
    e.preventDefault();
    if (validate()) {
      let req_value = {
        id: values.id,
       

      };

 
      updateProduct(req_value);
      ResetForm();
    }
  };

  //let sel_cat= loadCategory.filter(x=>(x.value=== Cat) )

  return (
    <Form
      onSubmit={handleSubmission}
    
    >
      <Grid container spacing={0.01}>
        <Grid item xs={3}>
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
                
                <div className="productsAdd addProductsForm">
            <Select
       
        
          
          
            options={unitList}
            styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
            menuPortalTarget={document.body}
       
            value={unit}
            onChange={(e) => {
              const _temp = {
                label: e.label,
                value: e.value,
              };
              setUnit(_temp);
            }}
          />
</div>
   

</Grid>
{/* </Grid> */}
    
          
     


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

         
     

        <Grid item xs={3}>
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
            label="Sell Price"
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
                 <Grid item xs={3}>
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
            <Grid item xs={3}>
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
  );
}
