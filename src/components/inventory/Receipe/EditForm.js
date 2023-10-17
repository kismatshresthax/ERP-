import React, { useState, useEffect } from "react";

import axios from "axios";


import { toast } from "react-toastify";
// Material UI

import UserSessionContext from "../../../contexts/UserSessionContext";
import Spinner from "../../../utils/spinner";
import config from "../../../utils/config";
import Controls from "../../controls/Controls";

import "date-fns";

import ProductSearch from "../../purchases/product/ProductSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import RecTable from "./RecTable";
function EditForm(props) {
  const {
 
    id,
 
 
 
 
} = props;
    const [products, setProducts] = useState([]);

  
    const [updateProducts, setUpdateProducts] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const userSessionContext = React.useContext(UserSessionContext);
    const [warehouses, setWareHouseList] = useState();
    const [unitcost, setUnitCost] = useState(10);
   // const defaultValue = props.warehouse.filter((option) => option.isMain === 1); // Set the default value to the option with "isMain" equal to 1
    const [quantity, setQuantity] = useState(1);
    const [records, setRecords] = useState();
     const [selectedValue, setSelectedValue] = useState()
        const [edit, isEdit] = useState(false);
    let history = useHistory();

    const[selectedvalue, setSelectedvalue]=useState(()=>{
      if (Object.keys(props.warehouse).length === 0) {
        return null; 
      }
    

      const filteredOptions = props.warehouse
        .filter((option) => option.isMain === 1)
        .map((name, index) => ({
          value: name.value,
          label: name.label,
        }));
    
      return filteredOptions;
    });



    React.useEffect(() => {
      load_table();
      isEdit(true);
    }, []);
 
    const load_table =  () => {
      const fig = {
        headers: {
          Authorization: userSessionContext.token,
        },
      };
      axios
        .get(`${config.APP_CONFIG}/Ingredients/recipe/api/${props.data.id}`, fig)
        .then((res) => {
          if (res.data.status_code === 200) {
      
              setUpdateProducts(res.data.msg);
              let temp = res.data.msg.map((name, index) => ({
                label: name.wareHouseName,
                value: name.wareHouseId,
              }));  
              setSelectedValue(temp);
           
          } else if (res.data.status_code === 401) {
            userSessionContext.handleLogout();
          } else {
            toast.error("Warning");
            setRecords([]);
          }
        })
        .catch((err) => {
          toast.error("Error");
  
          setRecords([]);
        });
    };
    useEffect(() => {

      axios
      .get(`${config.APP_CONFIG}/Products/product/Api`, {
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

     const handleChange = (selectedOption) => {
       setSelectedValue(selectedOption);
     };
    useEffect(() => {
      setUpdateProducts(updateProducts);
    
  }, [updateProducts,quantity,selectedValue]);

  if (products === undefined) {
    return <Spinner />;
  }


  const preparePurchaseProductArray = (products) => {
    let purchaseProductRowArray = [];
    let productId=props.data.id;
    products.forEach((product) => {
   
      purchaseProductRowArray.push({
        ingProductName: product.productname,
        id:0,
        cost_price: parseFloat(unitcost),
        unitName: product.UnitName,
        unitId:product.unitId,
        product_id:product.id,
        mainproductId:productId,
        
        wareHouseName:product.wareHouseId === undefined
        ? selectedValue[0]["label"]
        : "" ,
        wareHouseId:product.wareHouseId === undefined
          ? selectedValue[0]["value"]
          : "" ,
        quantity:quantity,
        total: parseFloat(parseFloat(unitcost)*parseFloat(quantity))
      });
 
    });
    return purchaseProductRowArray;
  };
  const customProducts = preparePurchaseProductArray(products);


  const  EditReceipe =() => {
    const put_data = updateProducts.map(({ mainproductId, quantity, unitId, wareHouseId,product_id,cost_price,id}) => ({ mainproductId, quantity, unitId, wareHouseId,product_id,cost_price,id}));
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
        "id":i.id,
      }
    });
  
      setIsSubmitting(true);
    
      axios.put(`${config.APP_CONFIG}/Ingredients/recipe/api/${props.data.id}`, filter_data, {
           headers: { Authorization: userSessionContext.token },
         })
         .then((res) => {
           if (res.data.msg === undefined) {
             return <Spinner />;
           }
   
           if (res.data.status_code === 200) {
               toast.success(res.data.msg);
           history.push(`/inventory/recipe`);
           props.setIsEditPopup(false);
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
         props.setIsEditPopup(false);
     };
  
   console.log(updateProducts)
  return (
   <div>
    <h2>{props.data.productname}</h2>
    <div>
 
    </div>
         <div className='col-md-12 mb-3'>
                       
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
    { updateProducts &&
               updateProducts.map((singleProduct, index) => {
                return (
                  <RecTable
                    singleProduct={singleProduct}
                    index={index}
                     updateQty={updatedQty}
                     selectedValue={selectedValue}
  warehouses={warehouses}
  records={records}
  edit={edit}
                    updateProducts={updateProducts}
                    setUpdateProducts={setUpdateProducts}
                  />
                );
              })}
       
            
     
      
      
  </table>

 
      <div style={{marginTop:"100px"}}>
   <Controls.Button
             type="submit"
             text="Update"
            // disabled={isSubmitting}
             onClick={(e) => {
              e.preventDefault();
        EditReceipe();
             }}

       />
       </div>
           </div>
  )
};

export default EditForm;