import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { useForm, Form } from "../../home/useForm";
import Controls from "../../controls/Controls";
import axios from "axios";
import config from "../../../utils/config";
import UserSessionContext from "../../../contexts/UserSessionContext";
import { toast } from "react-toastify";
import Spinner from "../../../utils/spinner";
import { Switch} from "@material-ui/core";
import {   BlockPicker, TwitterPicker } from 'react-color';
const initialFValues = {
  categoryName: "",
  description: "",
  colour:"",
 
};

export default function CategoryForm(props) {
  const userSessionContext = React.useContext(UserSessionContext);

  const validate = (fieldValues=values) => {
    let temp = { ...errors }
    if ('categoryName' in fieldValues)
    temp.categoryName = fieldValues.categoryName 
    ? fieldValues.categoryName.length<61 
    ?fieldValues.categoryName.match(/^[a-zA-Z0-9 !@#\$%\^\&*\)\(+=._-]+$/g)
    ? ""
      : "Invalid Data"
       :"Maximum 60 Characters"
    : "This field is required.";

    if ('description' in fieldValues)
    temp.description = fieldValues.description 
    ?fieldValues.description.match(/^[a-zA-Z0-9 !@#\$%\^\&*\)\(+=._-]+$/g)
    ? ""
      : "Invalid Data" 
    : "This field is required.";
    //temp.parentId = values.parentId !== 0 ? "" : "This field is required.";

    setErrors({
      ...temp
    })
    if (fieldValues == values)
    return Object.values(temp).every(x => x == "")
  }
  const _data = props.data || initialFValues;
  const [colour, setColor] = useState(_data.colour||'#f47373')
  const [showColorPicker, setShowColorPicker] = useState(false)

  const { values,  setValues, handleInputChange, ResetForm, errors,  setErrors } = useForm(_data, true, validate);
  const onInputChange = (_key, _value) => {
   
  
     setValues({ ...values, [_key]: _value });
   };
  const handleSubmission = (e) => {
    e.preventDefault();
    if (validate()) {
      let req_value = { 
        id: values.id,
        categoryName: values.categoryName,
        description: values.description,
        parentId: values.parentId ||1,
        //parentId: 1,
        isService: parseInt(values.isService),
        isSaleable: parseInt(values.isSaleable),
        colour:colour.toString()
      };

      props.handleSubmit(req_value);
      ResetForm();
    }
  };

  const [categoryList, setCategoryList] = useState();

  useEffect(() => {
   axios
      .get(`${config.APP_CONFIG}/Products/ProductCategory/api`,{ headers: {Authorization: userSessionContext.token } })

      .then((res) => {
        if (res.data.status_code === 401) {
          userSessionContext.handleLogOut();
        } else if (res.data.status_code === 200) {
          let categoryList = res.data.msg.map((item) => ({
            id: item.id,
            title: item.categoryName,
          }
          ));

          categoryList = [{ id: 0, title: 'Parent' }].concat(categoryList);
          setCategoryList(categoryList);
        } else {
          toast.error("error");
          setCategoryList([]);
        }
      })
      .catch((err) => {
        
        toast.error("Something Went Wrong");
        setCategoryList([]);
      });
  }, []);

  React.useEffect(() => {
    let new_val = values.isService === 1 ? 0 : 1;
    setValues({ ...values, isSaleable: new_val });
  }, [values.isService]);

  React.useEffect(() => {
    let new_val = values.isSaleable === 1 ? 0 : 1;
    setValues({ ...values, isService: new_val });
  }, [values.isSaleable]);

  if (categoryList === undefined) {
    return <Spinner />;
  }

  return (
    <div style={{height:"60vh"}}>
    <Form onSubmit={handleSubmission}>
  
      <Grid container>
        <Grid item xs={7}>
          <Controls.Input
            name="categoryName"
            label="Category Name"
            value={values.categoryName}
            onChange={handleInputChange}
            error={errors.categoryName}
            required={true}
            style={{ marginBottom: '1.2rem' }}
          />

          <Controls.Input
            label="Description"
            name="description"
            value={values.description}
            onChange={handleInputChange}
            error={errors.description}
            style={{ marginBottom: '1.2rem' }}
           required
          />
 <Controls.Select
            label="ParentName"
            name="parentId"
            value={values.parentId||0}
            onChange={handleInputChange}
            options={categoryList}
            style={{ marginBottom: '1.2rem' }}
            required={true}
          />
          <div    style={{ marginBottom: '1rem' }}>
              <Switch
              color="primary"
              checked={values.isService === 1 ? true : false}
              defaultValue="on"
              onChange={(e) => {
                let new_val = e.target.checked ? 1 : 0;
                onInputChange("isService", new_val);
              }}
              label="Service"
            />
            Consumable

            
         
            <Switch
              color="primary"
              checked={values.isSaleable === 1 ? true : false}
              defaultValue="on"
              onChange={(e) => {
                let new_val = e.target.checked ? 1 : 0;
                onInputChange("isSaleable", new_val);
              }}
              label="Service"
            />
            Sellable
            </div>
        </Grid>
        <Grid item xs={5}>
         

{_data.id ?
   <TwitterPicker color={colour} onChange={updatedColor => setColor(updatedColor.hex)}/> 
: 
<div>
            <Controls.Button color="primary"  
            onClick={() => setShowColorPicker(showColorPicker => !showColorPicker)} 
            text= {showColorPicker ? 'Close color picker' : 'Pick a color'}/> 
           
           {showColorPicker && (   
           <TwitterPicker  width="150px"
           color={colour} 
           onChange={updatedColor => setColor(updatedColor.hex)}/> )}
           </div> }
           
  </Grid>
  
        <div style={{marginTop:"30px"}}>
          {_data.id ? 
          <Controls.Button
          type="submit"
          text="Update"
       
        />
       
          : 
          <div>
        <Controls.Button
          type="submit"
          text="Submit"
       
        />
        <Controls.Button text="Reset" color="default" onClick={ResetForm} />
          </div>
          
          }
        </div>
      </Grid>
    </Form>
    </div>
  );
}
