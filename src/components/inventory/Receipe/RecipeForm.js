import React, { useState, useEffect } from "react";

import axios from "axios";
import Select from "react-select";
import Spinner from "../../../utils/spinner";
import { toast } from "react-toastify";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import UserSessionContext from "../../../contexts/UserSessionContext";
// import CompanyContext from "../../../contexts/CompanyContext";
import config from "../../../utils/config";
import Controls from "../../controls/Controls";

import "date-fns";

import ProductSearch from "../../purchases/product/ProductSearch";

import { useHistory } from "react-router-dom";
import RecTable from "./RecTable";
import { Box, Grid } from "@mui/material";
import {

  Table,
  TableRow,
  TableCell,
  TableContainer,
  InputAdornment,
  Tooltip,
} from "@material-ui/core";
import { roundTo2DecimalPoint } from "../../../utils/Round";
function RecipeForm(props) {
  const {
 
    id,
 
 
 
 
} = props;
    const [products, setProducts] = useState([]);

    //const [allProducts, setAllProducts] = useState();
    const [updateProducts, setUpdateProducts] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const userSessionContext = React.useContext(UserSessionContext);
    const [warehouses, setWareHouseList] = useState();
    const [unitcost, setUnitCost] = useState(10);
    //const defaultValue = props.warehouse.filter((option) => option.isMain === 1); // Set the default value to the option with "isMain" equal to 1
    const [quantity, setQuantity] = useState(1);
  
    const[selectedValue, setSelectedValue]=useState(()=>{
      if (Object.keys(props.warehouse).length === 0) {
        return null; // If defaultValue is an empty object, return null or an appropriate default value.
      }
    
      // Assuming defaultValue and props.warehouse are defined elsewhere
      const filteredOptions = props.warehouse
        .filter((option) => option.isMain === 1)
        .map((name, index) => ({
          value: name.value,
          label: name.label,
        }));
    
      return filteredOptions;
    });
   
    let history = useHistory();
   
    useEffect(() => {

      axios
      .get(`${config.APP_CONFIG}/Ingredients/productWithCalculatedCost/api`, {
        headers: {
          Authorization: userSessionContext.token,
        },
      })
      .then((res) => {
        if (res.data && res.data.status_code && res.data.status_code === 200) {
          setProducts(res.data.msg);
       
        } else {
          toast.error(res.data.msg || "Cannot load Products");
          setProducts([]);
        }
      })
      .catch((err) => {
        toast.error("Failed to Products");
        setProducts([]);
      });
    
    }, []);
   
    useEffect(() => {
      axios.get(`${config.APP_CONFIG}/stock/warehouse/api`, {
         headers: { Authorization: userSessionContext.token },
       })
       .then((res) => {
         if (res.data.status_code === 401) {
           userSessionContext.handleLogOut();
         } else if (res.data.status_code === 200) {
     
          let temp = res.data.msg.map((name, index) => ({
              label: name.warehouse,
              value: name.id,
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
   },[])
   const updatedQty = (qty) => {
    setQuantity(qty);
};

    //  const handleCost = (id) => {
    
    //   axios
    //   .get(`${config.APP_CONFIG}Ingredients/productWithCost/api/${id}`, {
    //     headers: {
    //       Authorization: userSessionContext.token,
    //     },
    //   })
    //   .then((res) => {
    //     if (res.data && res.data.status_code && res.data.status_code === 200) {
    //       setUnitCost(res.data.msg.unitprice);
       
    //     } else {
    //       toast.error(res.data.msg || "Cannot load Product cost");
    //       setUnitCost([]);
    //     }
    //   })
    //   .catch((err) => {
    //     toast.error("Failed to load Product cost");
    //     setUnitCost([]);
    //   });

    //  };

    useEffect(() => {
      setUpdateProducts(updateProducts);
    
  }, [updateProducts,quantity,selectedValue]);

  if (products === undefined) {
    return <Spinner />;
  }


    const preparePurchaseProductArray = (products) => {
     
  
      let purchaseProductRowArray = [];
      let mainproductId=props.data.id;
      products.forEach((product) => {

        purchaseProductRowArray.push({
          ingProductName: product.productName,
          code: product.code,
          cost_price: parseFloat(product.cost),
          unitName: product.unitName,
          unitId:product.unitId,
          product_id:product.productId,
          mainproductId:mainproductId,
          wareHouseId:
          product.wareHouseId === undefined
            ? selectedValue[0]["value"]
            : "" ,
          quantity:quantity,
          total: parseFloat(roundTo2DecimalPoint(parseFloat(unitcost)*parseFloat(quantity)))
        });
        //handleCost(product.id);
      });
      return purchaseProductRowArray;
    };
    const customProducts = preparePurchaseProductArray(products);
 

    const AddReceipe =() => {
      const put_data = updateProducts.map(({ mainproductId, quantity, unitId, wareHouseId,product_id,cost_price}) => ({ mainproductId, quantity, unitId, wareHouseId,product_id,cost_price}));
      const filter_data = put_data.map((i) => {
          
        return {
          ...i,
          "mainproductId":i.mainproductId,
          "quantity":i.quantity,
          "unitId":i.unitId,
          "wareHouseId":i.wareHouseId,
          "product_id":i.product_id ,
          "cost_price": i.cost_price,
          "created_by":localStorage.getItem('user'),
        }
      });
     
  
      setIsSubmitting(true);
      axios.post(`${config.APP_CONFIG}/Ingredients/recipe/api`, filter_data, {
           headers: { Authorization: userSessionContext.token },
         })
         .then((res) => {
           if (res.data.msg === undefined) {
             return <Spinner />;
           }
   
           if (res.data.status_code === 200) {
               toast.success(res.data.msg);
           history.push(`/inventory/recipe`);
           setIsSubmitting(false);
           props.setIsRecPopup(false);
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
        // props.setIsRecPopup(false);
     };
  
  
  return (
   <div className="dialog-receipe">
    <h2>For MenuItem : {props.data.productname}</h2>
    <div>
    <h5>Add Receipe</h5>
    </div>
         <div className='col-md-12 mb-1'>
                       
                        <ProductSearch products={products} 
                                      updateProducts={updateProducts}
                                       setUpdateProducts={setUpdateProducts}
                                    customProducts={customProducts}/>
                                
                    </div>
    <table className="table table-fluid recipe align-middle">
    <tr>
    
      <th  style={{   verticalAlign:"middle"}}>Product Name</th>
      <th  style={{ verticalAlign:"middle"}}>Quantity</th>
      <th  style={{  verticalAlign:"middle"}}>Unit</th>
      <th  style={{  verticalAlign:"middle"}}>Warehouse</th>
      <th  style={{  verticalAlign:"middle"}}>Unit Cost</th>
      <th  style={{  verticalAlign:"middle"}}>Sub-Total</th>
  
      <th  style={{  verticalAlign:"middle"}}>Action</th>
    </tr>
    {updateProducts &&
              updateProducts.map((singleProduct, index) => {
                return (
                  <RecTable
                    singleProduct={singleProduct}
                    index={index}
                     updateQty={updatedQty}
                     selectedValue={selectedValue}
  warehouses={warehouses}
  
                    updateProducts={updateProducts}
                    setUpdateProducts={setUpdateProducts}
                  />
                );
              })}
       
            
     
       {!updateProducts.length && (
              <tr>
                <td colSpan={8} className="fs-5 px-3 py-6 custom-text-center">
                  No Data
                </td>
              </tr>
            )}
      
  </table>
  <Grid item xs={12} className='mt-4 d-flex justify-content-end'>
  

       
            <Box>
    <TableContainer>
        <Table>
            <TableRow>
                <TableCell className='fw-bold'>Total Receipe Cost</TableCell>
                <TableCell>Rs.{roundTo2DecimalPoint(updateProducts.reduce(
    (tot, obj) => parseFloat(obj.cost_price*obj.quantity) + parseFloat(tot),
    0
  ))}</TableCell>
            </TableRow>
           
        </Table>
    </TableContainer>
    </Box>
 </Grid>
    <Controls.Button 
             type="submit"
             text="Save"
             disabled={isSubmitting}
             onClick={(e) => {
              e.preventDefault();
        AddReceipe();
             }}

       />  
       <div className="d-flex  align-content-center justify-content-between">
        <div className="border-0 border-secondary">
       <h4>Selling Price </h4>
       <p>{props.data.sellPrice}</p>
       </div>
      <div className="border-0 border-secondary">
       <h4> Calcualted Cost Price </h4>
       <p>{updateProducts.reduce(
    (tot, obj) => parseFloat(obj.cost_price*obj.quantity) + parseFloat(tot),
    0
  )}</p>
       </div>
       <div className="border-0 border-secondary">
       <h4>Profit </h4>
       <p>{""}</p>
       </div>

       </div>
   
       </div>        
  )
};

export default RecipeForm;