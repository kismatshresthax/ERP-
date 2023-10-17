// import React from "react";
// import { Grid } from '@material-ui/core';
// import {useForm, Form} from '../../components/home/useForm';
// import Controls from '../controls/Controls';
// import axios from 'axios';
// import config from '../../utils/config';
// import UserSessionContext from '../../contexts/UserSessionContext';
// import { toast } from 'react-toastify';
// import Spinner from '../../utils/spinner';

// const initialFValues = {
//     id: 0,
//     name: ''
// }

// const WareHouseForm = props =>{
//     const userSessionContext = React.useContext(UserSessionContext)
//     const _data = props.data || initialFValues
//     const {values,setValues,handleInputChange,ResetForm} = useForm(_data);

//     return (
//         <Form onSubmit = {e=>{
//             e.preventDefault()
//             let req_value = {
//                 "name": values.name
//             }
//             props.handleSubmit(req_value)

//         }}
//         >

//             <Grid container item xs={7}>
//                 <Controls.Input
//                 name = "name"
//                 label = 'Warehouse Name'
//                 value = {values.name}
//                 onChange = {handleInputChange}

//                 />
//             </Grid>
//             <Grid></Grid>
//             <div>
//                         <Controls.Button
//                             type="submit"
//                             text="Submit"
//                             onClick={e=>{
//                                 e.preventDefault()
//                                 let req_value={
//                                     "name": values.name
//                                 }
//                                 props.handleSubmit(req_value)

//                             }}
//                         />
//                         <Controls.Button
//                             text="Reset"
//                             color="default"
//                             onClick={ResetForm}
//                         />
//                     </div>
//         </Form>
//     )

// }
// export default WareHouseForm

import React from "react";
import { Grid } from "@material-ui/core";
import { useForm, Form } from "../../components/home/useForm";
import Controls from "../controls/Controls";



const initialFValues = {
 
  warehouse: "",
};

const WareHouseForm = (props) => {
 // const userSessionContext = React.useContext(UserSessionContext);
  const _data = props.data || initialFValues;

  


  const validate = (fieldValues=values) => {
    let temp = { ...errors }
    if ('warehouse' in fieldValues)
    temp.warehouse = fieldValues.warehouse
    ? fieldValues.warehouse.length<51
    ?fieldValues.warehouse.match(/^[a-zA-Z0-9 !@#\$%\^\&*\)\(+=._-]+$/g)
    ? ""
      : "Invalid Data"
       :"maximum 50 Characters"
    : "This field is required."
    setErrors({
      ...temp
    })
    if (fieldValues === values)
    return Object.values(temp).every(x => x === "")
  }
  const { values,  handleInputChange, ResetForm, errors, setErrors } = useForm(_data,true,validate);
  
  const handleSubmission = e => {
    e.preventDefault()
    if (validate()) {
      let req_value = {
        "id":values.id,
        "warehouse": values.warehouse,
        "isMain":0
      };

      props.handleSubmit(req_value);
      ResetForm();
    }
    // toast.warn("Please Complete the Form.")
  }



  return (
    <Form  onSubmit={handleSubmission}
     
    >
      <Grid container item xs={7}>
        <Controls.Input
          name="warehouse"
          label="Warehouse Name"
          value={values.warehouse}
          onChange={handleInputChange}
          required = {true}
          error={errors.warehouse}
        />
      </Grid>
      <div>
                      
                      {_data.id?
                        <Controls.Button
                        type="submit"
                        text="Update" 
                      
                    />
                        
                        : <div>
                            <Controls.Button type="submit"text="Submit" />
      
                              <Controls.Button
                                  text="Reset"
                                  color="default"
                                  onClick={ResetForm}  
                              />
                              </div>
                        }
                  </div>       
    </Form>
  );
};
export default WareHouseForm;
