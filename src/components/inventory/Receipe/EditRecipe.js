import React, { useState, useEffect } from "react";

import axios from "axios";
import Select from "react-select";
import SaveIcon from "@mui/icons-material/Save";
import { toast } from "react-toastify";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import UserSessionContext from "../../../contexts/UserSessionContext";
import Spinner from "../../../utils/spinner";
import config from "../../../utils/config";
import Controls from "../../controls/Controls";

import DeleteIcon from "@material-ui/icons/Delete";
import "date-fns";

import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Tooltip } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: "white",
    color: "#546e7a",
    justifyContent: "left",
    padding: "10px 5px",
    fontWeight: "bold",
  },

  content: {
    padding: 0,
    // size:"20px"
  },
  status: {
    marginRight: "5px",
  },
  actions: {
    justifyContent: "flex-end",
  },
  summaryTable: {
    width: "auto",
    marginBottom: "10px",
    pointerEvents: "none",
  },
  noBorder: {
    border: "none",
  },
  denseCell: {
    padding: "1px",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 100,
  },
  root: {
    margin: theme.spacing(0.5),
    marginTop: theme.spacing(2),
    minWidth: 0,
  },
  label: {
    textTransform: "none",
  },

  formInputNum: {
    width: "10px",
    // height:"100px"
  },

  formInput: {
    width: "50px",
  },
}));

//------------------------START OF INPUT ROW---------------------------

const AddForm = (props) => {
  const classes = useStyles();
  const userSessionContext = React.useContext(UserSessionContext);
  //const companyContext = React.useContext(CompanyContext);
 
 
 
  const [unit, setUnit] = useState();
  const [allProducts, setAllProducts] = useState(props.allProducts || []);
  const [warehouseId, setWarehouseId] = useState();
  const [unitId, setUnitID] = useState();
  const [productId, setProductId] = useState("");
  const [unitcost, setUnitCost] = useState("");
  const [productSubtotal, setProductSubtotal] = useState("");
  const [quantity, setQuantity] = useState(1);




  useEffect(() => {
    if (productId.value !== undefined) {
      //loadUnitById(productId.value);
      const productUnit = props.product.filter((x) => {
        return x.id === productId.value;
      });



      setUnitCost(productUnit[0]["cost_price"]);
      

      setUnit(productUnit[0]["UnitName"]);
      setUnitID(productUnit[0]["unitId"])
    }
  }, [productId]);


  useEffect(() => {
    if (quantity !== undefined && unitcost !== undefined) {
     
      let temp = parseFloat(quantity) * parseFloat(unitcost);
      setProductSubtotal(temp.toString());

    }

  }, [quantity,unitcost]);
  
  
  return (
    <tr hover>
   
      <td width="200px">
        <Select
          type="text"
          placeholder={"Add Product"}
          options={props.allProducts}
          value={productId}
          onChange={(e) => {
            setProductId(e)
           
            
          }}
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          }}
          menuPortalTarget={document.body}
        />
      </td>


      <td size="small">
        <input
          type="number"
          step="1"
          min={1}
          value={quantity || 0}
        
          onChange={(e) => {
            setQuantity(e.target.value);
          }}
          style={{ width: "50px" }}
        />
      </td>
      <td style={{color:"green"}}>
        {productId ? (
         
   
            <span>{unit}</span>
           
        ) : (
          <div
            style={{
              width: "80px",
            }}
          >
        
          </div>
        )}
      </td>
      <td>
      {productId ? (
       <Select
       type="text"
       placeholder={"Warehouse"}
       options={ props.warehouses}
       value={warehouseId}
       onChange={(e) => {
         setWarehouseId(e);
     
       }}
       styles={{
         menuPortal: (base) => ({ ...base, zIndex: 9999 }),
       }}
       menuPortalTarget={document.body}
     />
      
      ) : (
        <p style={{ padding: "0.7rem 0", margin: "0" }}>Warehouse</p>
      )}

</td>
   
     

      <td size="small">
      <input
          type="number"
          step="1"
          min={1}
          value={unitcost}
        
          onChange={(e) => {
            setUnitCost(e.target.value);
          }}
          style={{ width: "50px" }}
        />
      </td>
      <td size="small">
        <span>{parseFloat(productSubtotal || 0)}</span>
      </td>
  
    
      
      {props.disable === 0 ?
        <td>
          <Controls.ActionButton
            size="small"
            variant="contained"
            color="secondary"
            onClick={(e) => {

              if (
                productId === "" ||
                quantity === "" 
             
               
              ) {
                return toast.warn("Please Fill the Form");
              }
              
              else{
              let _row = [{
          "mainproductId":props.data.id,
          "quantity":quantity,
          "unitId":unitId,
          "wareHouseId":warehouseId.value,
          "product_id":productId.value,
      
          "cost_price": unitcost,
          "created_by":localStorage.getItem('user'),


              }];
            
              axios.post(`${config.APP_CONFIG}/Ingredients/recipe/api`, _row,{ headers:{Authorization: userSessionContext.token} })
                .then((res) => {
                  if (
                    res.data.status_code === undefined ||
                    res.data.status_code === null ||
                    res.data.status_code === ""
                  ) {
                    return <Spinner />;
                  }
                  if (res.data.status_code === 200) {
                    props.addRow({
          ingProductName: productId.label,
          cost_price: parseFloat(unitcost),
          unitName: unit,
          unitId:unitId,
          product_id:productId.value,
          mainproductId:props.data.id,
          wareHouseId:warehouseId.label,
          wareHouseName:warehouseId.value,
          quantity:quantity,
          total: parseFloat(parseFloat(unitcost)*parseFloat(quantity))
                    });


                      setProductId("");
                      setQuantity("1");
                   
                    
                     
                      setUnit("");
                   
                    
                     props.load_table();
                    
                    
                    } else if (res.data.status_code === 401) {
                      userSessionContext.handleLogOut();
                    } else if (res.data.status_code === 400) {
                      toast.warn(res.data.msg);
                    } else {
                      toast.error("Error Occured");
                    }
                  })
                  .catch((err) => {
                    toast.error("failed to Add data");
                  });
              
            }}
          }
          >
            <Tooltip title="Add">
              <AddCircleIcon color="primary" style={{ fontSize: "25px" }} />
            </Tooltip>
          </Controls.ActionButton>
        </td>
        : null}
    </tr>
  );
};


const EditRecipe = (props) => {

  const [products, setProducts] = useState([]);
  const [productIngre_id, setProductIngre_id] = useState([]);
  //const [saveDisable, setSaveDisable] = useState(0);
  const userSessionContext = React.useContext(UserSessionContext);
  //const companyContext = React.useContext(CompanyContext);
  const [product, setProduct] = useState();
  const [allProducts, setAllProducts] = useState();
  const [disable, setDisable] = useState(0);
 


  const [isSubmitting, setIsSubmitting] = useState(false);

  const [warehouses, setWareHouseList] = useState();
  const [unitcost, setUnitCost] = useState("");

  const [productSubtotal, setProductSubtotal] = useState("");
  const [qty, setQty] = useState(1);

  const [edit, isEdit] = useState(false);
  const [editing, isEditing] = useState(false);
  const [warehouse, setWareHouse] = useState();
  useEffect(() => {
    loadProducts();
  
  }, []);
  React.useEffect(() => {
    load_table();
 
  }, []);
  useEffect(() => {
    if (qty !== undefined) {
     
      let temp = parseFloat(qty) * parseFloat(unitcost);
      setProductSubtotal(temp.toString());

    }

  }, [qty,unitcost]);
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
    
          setProducts(res.data.msg);
          
         
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogout();
        } else {
          toast.error("Warning");
          setProducts([]);
        }
      })
      .catch((err) => {
        toast.error("Error");

        setProducts([]);
      });
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
  const loadProducts = async () => {
   
    await axios
      .get(`${config.APP_CONFIG}/Ingredients/productWithCalculatedCost/api`, {
        headers: {
          Authorization: userSessionContext.token,
        },
      })
      .then((res) => {
        if (res.data && res.data.status_code && res.data.status_code === 200) {
          setProduct(res.data.msg);
          let temp = res.data.msg.map((name, index) => ({
            label: name.productName,
            value: name.productId,
          }));
          setAllProducts(temp);
        } else {
          toast.error(res.data.msg || "Cannot load Products");
          setAllProducts([]);
        }
      })
      .catch((err) => {
        toast.error("failed to Products");
        setAllProducts([]);
      });
  };

  

 

 


   

        if (allProducts === undefined) {
          return <Spinner />;
        }
      
      
       
                   
        return (
          <div className="purchase-form">


       
        <h2>{props.data.productname}</h2>
    <div>

    </div>
 
           
              <table className="table table-fluid recipe align-middle">
    <tr>
    {/* {products ? <th style={{ width: "40px" }}>S.No.</th> : null} */}
      <th  style={{   verticalAlign:"middle"}}>Product Name</th>
      <th  style={{ verticalAlign:"middle"}}>Quantity</th>
      <th  style={{  verticalAlign:"middle"}}>Unit</th>
      <th  style={{  verticalAlign:"middle"}}>Warehouse</th>
      <th  style={{  verticalAlign:"middle"}}>Unit Cost</th>
      <th  style={{  verticalAlign:"middle"}}>Sub-Total</th>
  
      <th  style={{  verticalAlign:"middle"}}>Action</th>
    </tr>
    {products? products.map((row, idx) => {
      console.log(products);
   
                  if (edit === row.id&&editing === true) {
                    return (
                      <tr key={idx}>
            <td width="200px">
           <Select
          type="text"
          placeholder={"Add Product"}
          options={allProducts}
          value={productIngre_id}
          onChange={(e) => {
            setProductIngre_id(e);
            
          }}
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          }}
          menuPortalTarget={document.body}
        />
      </td>


      <td size="small">
        <input
          type="number"
          step="1"
          min={1}
          value={qty || 0}
        
          onChange={(e) => {
            setQty(e.target.value);
          }}
          style={{ width: "50px" }}
        />
      </td>
      <td style={{color:"green"}}>
    
         
   
            <span>{row.unitName||""}</span>
           
       
      </td>
      <td>
     
       <Select
       type="text"
       placeholder={"Warehouse"}
       options={warehouses}
       value={warehouse}
       onChange={(e) => {
        setWareHouse(e);
     
       }}
       styles={{
         menuPortal: (base) => ({ ...base, zIndex: 9999 }),
       }}
       menuPortalTarget={document.body}
     />
      

</td>
   
     

      <td size="small">
      <input
          type="number"
          step="1"
          min={1}
          value={unitcost}
        
          onChange={(e) => {
            setUnitCost(e.target.value);
          }}
          style={{ width: "50px" }}
        />
      </td>
      <td size="small">
        <span>{parseFloat(productSubtotal || 0)}</span>
      </td>
  
    
      
     
        <td>
          <Controls.ActionButton
            size="small"
            variant="contained"
            color="secondary"
            onClick={(e) => {

            
              let temp =[ {
          "mainproductId":props.data.id,
          "quantity":parseInt(qty),
          "unitId":row.unitId,
          "wareHouseId":warehouse.value===undefined?row.wareHouseId:warehouse.value,
          "product_id":productIngre_id.value===undefined?row.product_id:productIngre_id.value,
     
          "cost_price": unitcost,
          "created_by":localStorage.getItem('user'),
              }];
              let temp1 = {
                "mainproductId":props.data.id,
                "ingProductName": productIngre_id.label===undefined?row.ingProductName:productIngre_id.label,
                "quantity":parseFloat(qty),
                "unitId":row.unitId,
                "unitName":row.unitName,
                "wareHouseId":warehouse.value===undefined?row.wareHouseId:warehouse.value,
                "product_id":productIngre_id.value===undefined?row.product_id:productIngre_id.value,
                "wareHouseName":warehouse.label===undefined?row.wareHouseName:warehouse.label,
            "id":row.id,
                "cost_price": unitcost,
                "created_by":localStorage.getItem('user'),
                    };
             
       
             // isEditing(false);
             setIsSubmitting(true)
              axios.put(`${config.APP_CONFIG}/Ingredients/recipe/api/${row.id}`, temp , {
                    
                      headers:{
                        Authorization: userSessionContext.token
                      }
                    }
                )
                .then((res) => {
              
                  if (res.data.status_code === 200) {  
                    const new_data = [...products];
              
                    const index = products.findIndex((x) => x.id === edit);
                
                    new_data[index] = temp1;
                
                    setProducts(new_data);
                    toast.success(res.data.msg);
                    load_table();
                    isEditing(false);
                    setIsSubmitting(false)
                    } else if (res.data.status_code === 401) {
                      userSessionContext.handleLogOut();
                    } else if (res.data.status_code === 400) {
                      toast.warn(res.data.msg);
                    } else {
                      toast.error("Error Occured");
                    }
                  })
                  .catch((err) => {
                    setIsSubmitting(false)
                    toast.error("failed to Add data");
                  });
              
            }}

          >
            <Tooltip title="Save">
              <SaveIcon color="primary" style={{ fontSize: "30px" }}   disabled={isSubmitting} />
            </Tooltip>
          </Controls.ActionButton>
        </td>
</tr>

)



          }

          else {
          

                return (
                    <tr key={row.idx}>
                   
                      <td>{row.ingProductName}</td>

                      <td>{row.quantity}</td>
                      <td style={{color:"green"}}>{row.unitName}</td>
                      <td>{row.wareHouseName}</td>
                      <td>{row.cost_price}</td>
               
                      <td>{Number(parseFloat(row.cost_price* row.quantity)).toFixed(3)}</td>

                 
                       {editing ===false ? 
                      <td>
                      <Controls.ActionButton
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={(e) => {
                          isEdit(row.id);
                          isEditing(true);
                       
                          const filteredOptions = products
                          .filter((option) => option.id === row.id)
                          .map((name, index) => ({
                            value: name.product_id,
                            label: name.ingProductName,
                          }));
                       

                          setProductIngre_id(filteredOptions);
                          const filtered_ware = products
                          .filter((option) => option.id === row.id)
                          .map((name, index) => ({
                            value: name.wareHouseId,
                            label: name.wareHouseName,
                          }));
                      
                        setWareHouse(filtered_ware)
                        setQty(parseFloat(row.quantity));
                        setUnitCost(parseFloat(row.cost_price));
                        }}
                        
                          >
                                 <Tooltip title="Edit" placement="top" arrow>
                          <EditIcon style={{ fontSize: "25px" }} />
                        </Tooltip>
                          </Controls.ActionButton>
                     
                          </td>
                          : null} 
                      {editing === false ?
                        <td>
                          <Controls.ActionButton>

                            <span
                              onClick={(e) => {
                                axios.delete(`${config.APP_CONFIG}/Ingredients/recipe/api/${row.id}`, {headers: {Authorization: userSessionContext.token}})
                              .then((res) => {
                       if (res.data && res.data.status_code && res.data.status_code === 200) {
                       let _data = products.filter((item) => {
                          return item.id !== row.id;
                            });
        
          setProducts(_data);
          toast.info(res.data.msg);
        } else if (res.data.status_code === 400) {
          toast.error(res.data.msg.toString());
        }
      })
      .catch((err) => {
        toast.error("failed to Delete Product");
    
      });
    
  
                               
                              }}
                            >
                              <Tooltip title="Delete" placement="top" arrow>
                                <DeleteIcon style={{ fontSize: "30px" }} />
                              </Tooltip>

                            </span>

                          </Controls.ActionButton>
                        </td>
                        : null}
                    </tr>
                  )
                            }           
                })


                : []}

              <AddForm
                data={props.data}
                products={products}
                allProducts={allProducts}
                disable={disable}
                warehouses={warehouses}
                isEdit={isEdit}
                product={product}
                load_table={load_table}
                addRow={(e) => {
                  setProducts([...products, e]);
                }}
              />
            </table>

           
         

          </div>
        );
      };

    export default EditRecipe;

