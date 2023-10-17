// import React, { useEffect, useState } from "react";
// import axios from 'axios'
// import { useHistory } from "react-router-dom";
// import config from '../../utils/config';
// import { toast } from "react-toastify";
// import { Switch, Radio, RadioGroup, FormControlLabel, makeStyles, FormControl, FormLabel} from '@material-ui/core';
// import '../../utils/styles.css'
// import Select from 'react-select';


// const useStyles = makeStyles({
//   field : {
//     marginTop : 20,
//     marginBotton : 20,
  
    
//   }
// })

// const  CreateProductSales = props =>{
  
//   const classes = useStyles();
//     let history = useHistory();  
//     const [name, setName] = useState("");
//     const [code, setCode] = useState("");
//     const [displayName, setDisplayname] = useState("");
//     const [costPrice, setCostPrice] = useState("");
//     const [costtax, setCostTax] = useState("");
//     const [costDiscount, setCostDiscount] = useState("");
//     const [sellPrice, setSellPrice] = useState("");
//     const [sellTax, setSellTax] = useState("");
//     const [sellDiscount, setSellDiscount] = useState("");
//     const [isConsumable,setIsConsumable] = useState(1);
//     const [isSellable,setIsSellable] = useState(0);
//     const [isService,setIsService] = useState(0);
//     const [categoryId,setCategoryId] = useState(0);
//     const [loadCategory,setLoadCategory] = useState(0);
//    // const [type,setType] = useState("");

//     useEffect(() => 
//   {
//     loadCategoryname();
   
//   }, []);

//     const updateName= (e) => {
//       setName(e.target.value);
//     };
//     const updateCode= (e) => {
//       setCode(e.target.value);
//     };
//     const updateDisplayName= (e) => {
//       setDisplayname(e.target.value);
//     };
//     const updateCostPrice= (e) => {

//       setCostPrice(e.target.value);
//     };
//     const updateCosttax= (e) => {
//       setCostTax(e.target.value);
//     };
//     const updateCostDiscount= (e) => {
//       setCostDiscount(e.target.value);
//     };
//     const updateSellPrice= (e) => {
//       setSellPrice(e.target.value);
//     };
//     const updateSellTax= (e) => {
//       setSellTax(e.target.value);
//     };
//     const updateSellDiscount= (e) => {
//       setSellDiscount(e.target.value);
//     };
//     const updateCategoryId= (e) => {
//       setCategoryId(e.target.value);
//     };

//     const loadCategoryname = async () => {
//       axios.get(`${config.APP_CONFIG}/Products/ProductCategory/api`)
//       .then(res=>
//        {
//        if(res.data&&res.data.status_code&&res.data.status_code === 200)
//        {
//          let temp = res.data.msg.map((name,index)=> ({ label: name.name, value: name.id }))
//          setLoadCategory(temp)
//        }
//        else
//        {
//          toast.error("Cannot load category name.")
//          setLoadCategory([])
//        }
//      })
//      .catch(err=>{
//        toast.error("failed to load data")
//        setLoadCategory([])
//        })
//     };

    


//       const AddProduct = async e => {
//         e.preventDefault();
//         let prepared_data = 
//         {
//           "name":name,
//           "code":code,
//           "displayName":displayName,
//           "costPrice":parseInt(costPrice),
//           "costtax":parseInt(costtax),
//           "costDiscount":parseInt(costDiscount),
//           "sellPrice":parseInt(sellPrice),
//           "selltax":parseInt(sellTax),
//           "sellDiscount":parseInt(sellDiscount),
//           "isConsumable":parseInt(isConsumable),
//           "isSellable":parseInt(isSellable),
//           "isService":parseInt(isService),
//           "categoryId" :categoryId["value"],
//           "id" :1
//         }
//         axios.post(`${config.APP_CONFIG}/Products/product/Api`,prepared_data)
//         .then(res => 
//           {
//             if(res.data.status_code === 200)
//             {
//              toast.warn("Data insert successfully")
//              history.push("/purchase/products")
//             }
//             else 
//             {
//               toast.error("error occured")
//             }
//           })
//           .catch(err => {
//             toast.error("Error Occured")
//           })
//         }

//         const getCheckBox = (key,callback) => 
//         {
//           return <Switch 
//           // id="color"
//           color = 'primary'
//           checked={key === 1 ? true : false}
//           defaultValue="on"
//           onChange={e => {
//           let changedValue = 0
//           if (key === 0)
//           {
//             changedValue = 1
//           }
//           callback(changedValue)
//          }}
//            />
//         }

//     return <div  className="content-wrapper iframe-mode" data-widget="iframe" data-loading-screen={750}>
//         <div className='container-fluid'>
//         <div className="jumbotron">
//          <form className="row g-3" onSubmit = {e=>AddProduct(e)}>
//          <div className="col-md-4">
//            <label htmlFor="validationDefault01" className="form-label">Product Name</label>
//              <input type="text"  
//              placeholder = "Product Name"
//              className="form-control" 
//              id="validationDefault01" 
//              name = "name"
//              value ={name}
//              onChange = {updateName}
//              required />
//         </div>
     
//         <div className="col-md-4">
//          <label htmlFor="validationDefault02" className="form-label">Code</label>
//           <input type="text" 
//             placeholder = "Code"
//             className="form-control" 
//             id="validationDefault02" 
//             name = "code"
//             value = {code}
//             onChange = {updateCode}
//             required />
//         </div>

//        <div className="col-md-4">
//         <label htmlFor="validationDefault03" className="form-label">Display Name</label>
//          <input type="text" 
//          className="form-control" 
//          placeholder = "Display Name"
//          id="validationDefault03"
//          name = "displayName"
//          value = {displayName}
//          onChange = {updateDisplayName}
//          required />
//        </div>

//        <div className="col-md-4">
//         <label htmlFor="validationDefault04" className="form-label">Cost Price</label>
//          <input type="text" 
//          placeholder = "Cost Price"
//          className="form-control" 
//          id="validationDefault04" 
//          name = "costPrice"
//          value ={costPrice}
//          onChange = {updateCostPrice}
//          pattern = "[+-]?([0-9]*[.])?[0-9]+|''"
//          required />
//        </div>

//        <div className="col-md-4">
//         <label htmlFor="validationDefault05" className="form-label">Cost Tax</label>
//           <input type="text" 
//           placeholder = "Cost Tax"
//           className="form-control" 
//           id="validationDefault05"
//           name = "costtax"
//           value = {costtax}
//           onChange = {updateCosttax}
//           pattern = "[+-]?([0-9]*[.])?[0-9]+|''"
//           />
//        </div>

//        <div className="col-md-4">
//         <label htmlFor="validationDefault06" className="form-label">Cost Discount</label>
//          <input type="text" 
//          className="form-control" 
//          placeholder = "Cost Discount"
//          id="validationDefault06"
//          name = "costDiscount"
//          value = {costDiscount}
//          onChange = {updateCostDiscount}
//          pattern = "[+-]?([0-9]*[.])?[0-9]+|''"
//         />
//        </div>

//        <div className="col-md-4">
//         <label htmlFor="validationDefault07" className="form-label">Sell Price</label>
//          <input type="text" 
//          placeholder = "Sell Price"
//          className="form-control" 
//          id="validationDefault07"
//          name = "sellPrice"
//          value = {sellPrice}
//          onChange = {updateSellPrice}
//          pattern = "[+-]?([0-9]*[.])?[0-9]+|''"
//          />
//        </div>

//        <div className="col-md-4">
//         <label htmlFor="validationDefault08" className="form-label">Sell Tax</label>
//          <input type="text" 
//          className="form-control" 
//          placeholder = "Sell Tax"
//          id="validationDefault08" 
//          name = "sellTax"
//          value={sellTax}
//          onChange = {updateSellTax}
//          pattern = "[+-]?([0-9]*[.])?[0-9]+|''"
//         />
//        </div>

//        <div className="col-md-4">
//         <label htmlFor="validationDefault09" className="form-label">Sell Discount</label>
//          <input type="text" 
//          className="form-control" 
//          placeholder = "Sell Discount"
//          id="validationDefault09" 
//          name = "sellDiscount"
//          value ={sellDiscount}
//          onChange = {updateSellDiscount}
//          pattern = "[+-]?([0-9]*[.])?[0-9]+|''"
//          />
//        </div>
      
//        <div className="col-md-4">
//            <label htmlFor="validationDefault10" className="col-md-6 form-label ">Category Name</label>
//            <Select className="col-sm-14 form-label" options = {loadCategory} value = {categoryId} onChange = {setCategoryId}></Select>
//         </div>
        
//         <div className='col-md-4'>
//         <div className="form-check ">
//          {
//            getCheckBox(isService, setIsService)
//          }
//          <label className="form-check-label" htmlFor="invalidCheck2">
//           Service
//          </label>
//         </div>
//         </div>
      
//       <FormControl className = {classes.field}>
//         <FormLabel> Type </FormLabel>
//       <RadioGroup>
//         <FormControlLabel 
//           value = 'consumable'
//           checked={isConsumable === 1 ? true:false}
//           onChange ={e => {
//             let changedValue = 0
//             if (isConsumable === 0)
//             {
//               changedValue = 1
//               setIsConsumable(changedValue)
//               setIsSellable(0)
//             }
//           }
//           } 
//           control = {<Radio   color = 'primary' />} 
//           label ="Consumable"/>
//         <FormControlLabel  
//           value = 'sellable'
//           onChange = {e => {
//             let value = 0
//             if(isSellable === 0)
//             {
//               value = 1
//               setIsSellable(value)
//               setIsConsumable(0)
//             }
//           }
//           } 
//           control = {<Radio color = 'primary' />} 
//           label ="Sellable"/>
//       </RadioGroup>
//       </FormControl>

//   <div className="col-12">
//     <button className="btn btn-primary" type="submit">Add Product</button>
//   </div>
// </form>
// </div>
// </div>
// </div>
// }
// export default CreateProductSales