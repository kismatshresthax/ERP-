
import React from "react";
import { Grid } from "@material-ui/core";
import { useForm, Form } from "../../components/home/useForm";
import Controls from "../controls/Controls";

const initialFValues = {
  
  name: "",
  id:"",
  mesurementType:"Volume",
};
const mesurementTypes = [
  { id: 'Volume', title: 'Volume' },
  { id: 'Weight', title: 'Weight' },
 
]
const UnitForm = (props) => {

  const _data = props.data || initialFValues;

  const validate = (fieldValues=values) => {
    let temp = { ...errors }
    if ('name' in fieldValues)
    temp.name = fieldValues.name
    ?fieldValues.name.length<16
    ?fieldValues.name.match(/^[a-zA-Z0-9 !@#\$%\^\&*\)\(+=._-]+$/g)
      ? ""
        : "Invalid Data" 
       :"maximum 16 Characters"
    : "This field is required."

   
    setErrors({
      ...temp
    })
    if (fieldValues == values)
    return Object.values(temp).every(x => x === "")
  }
  const { values, handleInputChange, ResetForm, errors, setErrors } =useForm(_data,true,validate);
  
  const handleSubmission = e => {
    e.preventDefault()
    if (validate()) {
      let req_value = {
        id:values.id,
        name: values.name,
        mesurementType:values.mesurementType
      };

      props.handleSubmit(req_value);
    }
    
  }



  return (
    <Form  onSubmit={handleSubmission}>
      <Grid container item xs={6}>
        <Controls.Input
         name="name"
         label="UnitName"
         value={values.name}
         onChange={handleInputChange} 
         error={errors.name}
         required={true}
        />
      </Grid>
      
      <Grid container item xs={6}> 
      <Controls.RadioGroup
         name="mesurementType"
         label="MeasureMent Type"
         value={values.mesurementType}
         onChange={handleInputChange} 
         items={mesurementTypes}
   
    
        
        />

      </Grid>
      <div>
      {_data.id ? (
            <Controls.Button
              type="submit" 
              text="Update" 
            />
          ):
          (
              <Controls.Button
                type="submit"
                text="Add"       
              />
      )}
      </div>
    </Form>
  );
};
export default UnitForm;

