import React, { useState, useEffect } from "react";

import axios from "axios";
import Select from "react-select";
import UserSessionContext from "../../contexts/UserSessionContext";
import Controls from "../../components/controls/Controls";
import { Grid } from "@material-ui/core";
import { useForm, Form } from "../../components/home/useForm";
import Spinner from "../../utils/spinner";
import config from '../../utils/config';
import CompanyContext from "../../contexts/CompanyContext";
import Card from "@material-ui/core/Card";
import CardContent from "@mui/material/CardContent";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { toast } from "react-toastify";
const InitialValue ={
  quantity:"",
  unitId:"",
  wareHouseId:""
}
function OpeningStockForm(props) {
  const companyContext = React.useContext(CompanyContext);
    const _data = props.data||InitialValue
    
    const userSessionContext = React.useContext(UserSessionContext);
    const [units, setUnits] = useState();

    const [warehouses, setWareHouseList] = React.useState();
    const [Note, setNote] = useState();
 
    const [isSubmitting, setIsSubmitting] = useState(false);
   
    const validate = (fieldValues=values) => {
   
      let temp = { ...errors };
     
  
        if('quantity' in fieldValues){
          if (fieldValues.quantity < 0) {
            temp.quantity = "Cannot be negative.";
          } else if (fieldValues.quantity === 0) {
            temp.quantity = "Cannot be Zero.";
          } else {
            temp.quantity = ""; 
          }
        } else {
          temp.quantity = "This field is required.";
        }

        if ("warehouseId" in fieldValues)
        temp.warehouseId =
          fieldValues.warehouseId.length !== 0 ? "" : "This field is required.";
      
  
        if ("unitId" in fieldValues)
        temp.unitId =
          fieldValues.unitId.length !== 0 ? "" : "This field is required.";
  
      setErrors({ ...temp });
  
      return Object.values(temp).every((x) => x === "");
    };
  
 
  
    useEffect(() => {
        axios.get(`${config.APP_CONFIG}/stock/warehouse/api`, {
           headers: { Authorization: userSessionContext.token },
         })
         .then((res) => {
           if (res.data.status_code === 401) {
             userSessionContext.handleLogOut();
           } else if (res.data.status_code === 200) {
       
            let temp = res.data.msg.map((name, index) => ({
                title: name.warehouse,
                id: name.id,
              }));
              setWareHouseList(temp);
         
           } else if (res.data.status_code === 400) {
             toast.warn(res.data.msg);
           } else {
             toast.error("error");
             setWareHouseList([]);
           }
         })
         .catch((err) => {
           setWareHouseList([]);
         });
         loadUnitById(values.id)
     },[])
     const loadUnitById = async (id) => {
        await axios
          .get(
            `${config.APP_CONFIG}/Products/ProductInhouseUnit/ByProductId/api/${id}`,
            {
              headers: {
                Authorization: userSessionContext.token,
              },
            }
          )
          .then((res) => {
            if (res.data && res.data.status_code && res.data.status_code === 200) {
              let temp = res.data.msg.map((name, index) => ({
                title: name.unitName,
                id: name.unitId,
              }));
              setUnits(temp);
            } else {
              toast.error("Cannot load Unit Measurement.");
              setUnits([]);
            }
          })
          .catch((err) => {
            // toast.error("failed to load units");
            setUnits([]);
          });
      };
    const { values, setValues, errors,handleInputChange, setErrors,ResetForm } = useForm(_data ,true,validate);
    const updatenote = (e) => {
      setNote(e.target.value);
    };
   

    const handleSubmission = e => {
      setIsSubmitting(true);
        e.preventDefault();
       
         if (validate()) {
       
        let req_value=[{
        "quantity": parseFloat(values.quantity),
        "wareHouseId": parseInt(values.wareHouseId),
        "productId": parseInt(values.id),
        "unitId": parseInt(values.unitId),
        "companyId":  companyContext.company.id,
        "username":localStorage.getItem('user'),
        "note":Note||""
      }]

      axios
      .post(`${config.APP_CONFIG}/Stock/openingStock/api`, req_value,{ headers: {Authorization: userSessionContext.token } })
      .then((res) => {
        if (res.data.status_code === 200) {

          toast.success(res.data.msg);
        
             props.setIsNewPopup(false);
             setIsSubmitting(false);
             props.load_table();
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogout();
        }
        else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
        } else {
          toast.error("Unable to Transfer Stock");
        }
      })
      .catch((err) => {
        setIsSubmitting(false);
        toast.error("Something went Wrong");
      });
    
  };
}
  return (
    <Form  onSubmit={handleSubmission}>
    <Grid container spacing={2}>
    <Grid  item xs={7}>
    <Grid container spacing={1}>
    <Grid  item xs={6}>
    <Controls.Select
            label="warehouses"
            name="wareHouseId"
            value={values.wareHouseId}
            onChange={handleInputChange}
            options={warehouses}
            error={errors.warehouses}
          />

     <Controls.Select
            label="Unit"
            name="unitId"
            value={values.unitId}
            onChange={handleInputChange}
            options={units}
            error={errors.unitId}
          />
    
            <Controls.Input
            label="Quantity"
            type="number"
            name="quantity"
            step="0.1"
            value={values.quantity}
            onKeyDown={(e) =>
              (e.keyCode === 69 || e.keyCode === 187 || e.keyCode === 189) &&
              e.preventDefault()
            }
            onChange={handleInputChange}
            error={errors.quantity}
            required={true}
          />
          </Grid>
          <Grid  item xs={6}>
          <Controls.Input
            name="categoryname"
            label="Category Name"
            value={values.categoryname}
            inputProps={{ readOnly: true }}
            disabled={true}
          />
         
          <Controls.Input
            name="productname"
      label="Product Name"
            value={values.productname}
            inputProps={{ readOnly: true }}
            disabled={true}
          
          />
         
          </Grid>
          </Grid>
          </Grid>
              <Grid  item xs={5}>
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
            inputProps={{ readOnly: true }}
            disabled={true}
            error={errors.costPrice}
            required={true}
          />

          <Controls.Input
            label="Sell  Price"
            type="number"
            name="sellPrice"
            step="0.1"
            onKeyDown={(e) =>
              (e.keyCode === 69 || e.keyCode === 187 || e.keyCode === 189) &&
              e.preventDefault()
            }
            value={values.sellPrice}
            inputProps={{ readOnly: true }}
            disabled={true}
            error={errors.sellPrice}
            required={true}
          />
              {/* <Autocomplete
      id="combo-box-demo"
      variant="outlined"
      fullWidth
      options={warehouses}
      value={selectedOption}
      getOptionLabel={(option) => option.title}
      style={{ width: 500 }}
     onChange={handleAutocompleteSelect} 


      renderInput={(params) => <TextField {...params} label="Warehouse" variant="outlined" />}
    /> */}
 
{/* <div style={{marginBottom:"15px",marginLeft:"-36px",width: "483px"}}> */}
{/* <Autocomplete
      id="autocomplete"
      options={options}
      getOptionLabel={(option) => option}
      style={{ width: 300 }}
      value={selectedOption}
      onChange={(event, newValue) => {
        setSelectedOption(newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Autocomplete"
          variant="outlined"
        />
      )}
    /> 
    //           <Select 
    //    type="text"
    //    placeholder={"Warehouse"}
    //    options={ warehouses}
    //    value={warehouseId}
    //    onChange={(e) => {
    //      setWarehouseId(e);
     
    //    }}
    //    styles={{
    //      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
    //    }}
    //    menuPortalTarget={document.body}
    //  />
     </div> 
   
      <Select 
    //    type="text"
    //    placeholder={"Measure Units"}
    //    options={ units}
    //    value={unit}
    //    onChange={(e) => {
    //      setUnit(e);
     
    //    }}
    //    styles={{
    //      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
    //    }}
    //    menuPortalTarget={document.body}
    //  />
     {/* </div> */}


       
  
           
              </Grid>
    </Grid>
    <div>
    {/* <Card variant="outlined"> */}
        <CardContent>
          <div className="input-group journal-tab1">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" style={{paddingLeft: "0"}}>Note</span>
              </div>
              <textarea
                className="form-control"
                placeholder="Note"
                name="remarks"
                value={Note}
                onChange={updatenote}
                aria-label="With textarea"
              ></textarea>
            </div>
            </div>
            </CardContent>
      {/* </Card> */}
      </div>
              <Controls.Button
                type="submit"
                text="submit"  
                disabled={isSubmitting}     
              />
      
  
    </Form>
  )
}

export default OpeningStockForm