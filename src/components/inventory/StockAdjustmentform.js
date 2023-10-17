import React, { useEffect, useState } from "react";
//import AddIcon from "@material-ui/icons/Add";
import { makeStyles, Tooltip } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Controls from "../controls/Controls";
import UserSessionContext from "../../contexts/UserSessionContext";
import { toast } from "react-toastify";
import Spinner from "../../utils/spinner";
import { Grid } from "@material-ui/core";
import { useForm, Form } from "../../components/home/useForm";
import axios from "axios";
import config from "../../utils/config";
import Select from "react-select";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CompanyContext from "../../contexts/CompanyContext";
//import UseTable from "../home/UseTable";
import Card from "@material-ui/core/Card";
//import ConfirmDialog from "../home/ConfirmDialog";
//import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@mui/material/CardContent";
import PrintIcon from "@mui/icons-material/Print";
import { format } from "date-fns";
import { useHistory } from "react-router-dom";
//import ProductSearch from "../purchases/product/ProductSearch";
//import RecTable from "./Receipe/RecTable";
//import AdjustTable from "./AdjustTable";
const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBotton: 20,
  },
  asterisk: {
    color: "#db3131",
    "&$error": {
      color: "#db3131",
    },
  },
});

const AddForm = (props) => {
  const userSessionContext = React.useContext(UserSessionContext);
  const companyContext = React.useContext(CompanyContext);
  const [productId, setProductId] = useState("");
  const [productQty, setProductQty] = useState(0);
  const [stockQty, setStockQty] = useState("");
  const [units, setUnits] = useState();
  const [unit, setUnit] = useState("");
  //const [allProducts, setAllProducts] = useState(null);
  const [currentItem, setCurrentItem] = useState({});

  let [num, setNum] = useState(0);
  const [Type, setType] = useState();
const [qty,setQty]= useState(0);
  // useEffect(() => {
  //   load_Products();
  // }, []);
  // const load_Products = () => {
  //   axios
  //     .get(`${config.APP_CONFIG}/Products/product/Api`, {
  //       headers: {
  //         Authorization: userSessionContext.token,
  //       },
  //     })
  //     .then((res) => {
  //       if (res.data.status_code === 200) {
  //         let temp = res.data.msg.map((name, index) => ({
  //           label: name.productname,
  //           value: name.id,
  //         }));
  //         setAllProducts(temp);
  //       } else {
  //         toast.error(res.data.msg || "Cannot load Products");
  //         setAllProducts([]);
  //       }
  //     })
  //     .catch((err) => {
  //       toast.error("failed to Products");
  //       setAllProducts([]);
  //     });
  // };

  useEffect(() => {
    if (productId.value !== undefined) {
      loadUnitByHouseId(productId.value);

    }
  }, [productId.value]);

  const loadUnitByHouseId = async (id) => {
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
            label: name.unitName,
            value: name.unitId,
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
  // React.useEffect(() => {
  //   if (productId !== undefined) {
  //     let curr_item = get_curr_item();
  //     setCurrentItem(curr_item);
  //   }
  //  }, [productId]);
const get_curr_item = (id) => {

  if (productId === undefined) return {};
  let _all_items = props.allProducts.filter((x) => {return x.productId === id});
 
  setCurrentItem(_all_items[0]);
 
  let temp = _all_items[0].nestedChild.map((name, index) => ({
   label: name.unitName,
value: name.unitId,
baseUnit:name.baseUnit,
    }));
    setUnits(temp);

  //   const defaultValue = temp.find((option) => {
  //    const data = _all_items[0].nestedData.find((i) => i.baseUnit === 1);
  //    return data && option.value === data.unitId;
  //  })
  //  let _curr_item = _all_items[0] || {};
  //  setStockQty(parseFloat(_curr_item.nestedData.rawQuantity))

  // return _curr_item;
};



const get_curr_item_stock = (id) => {

     const data = currentItem.nestedChild.filter((i) =>{
      
       return i.unitId === id});
  
     let _curr_item_stock = data[0] || {};

     setStockQty(parseFloat(_curr_item_stock.qty))
 
}
const types = [
  {
    value: 1,
    label: "Addition",
  },
  {
    value: 0,
    label: "Subtract",
  },
];

  return (
    <tr key={(Math.random() + 1).toString(36).substring(2)} hover>
      <td width="250px">
        <Select
          type="text"
          placeholder={"Add Product"}
          options={ props.product}
          value={productId}
          onChange={(e) => {
            setProductId(e);
            get_curr_item(e.value);
          }}
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          }}
          menuPortalTarget={document.body}
        />
      </td>
      <td>
          {productId ? (
            <Select
              options={units}
            value={unit}
          
              onChange={(e) => {  
                setUnit(e);
                get_curr_item_stock(e.value)
              }}
              styles={{
                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
              }}
              menuPortalTarget={document.body}
            />
          ) : (
            <div
              style={{
                width: "80px",
              }}
            >
              Unit
            </div>
          )}
        </td>
        <td style={{color:"green"}}>
          {productId&&unit ? 
            parseFloat(stockQty||0) +" "+unit.label||"":null}
            </td>
      {/* <td width="150px">
        <div class="input-group">
          <div class="input-group-prepend">
            <button
              class="btn btn-outline-primary"
              type="button"
              onClick={decNum}
            >
              -
            </button>
          </div>
          <input
            type="text"
            class="form-control"
            value={num}
            onChange={handleChange}
          />
          <div class="input-group-prepend">
            <button
              class="btn btn-outline-primary"
              type="button"
              onClick={incNum}
            >
              +
            </button>
          </div>
        </div>
      </td> */}
      
      {/* <td size="small">
        <input
          type="number"
          step="1"
          min={1}
          value={qty}
        
          onChange={(e) => {
            setQty(e.target.value);
          }}
          style={{ width: "50px" }}
        />
      </td> */}
      <td className="adjust-qty">
        <input
          type="number"
          step="1"
          min={1}
          value={qty || 0}
          onKeyDown={(e) =>
         
            (e.keyCode === 69 || e.keyCode === 187) && e.preventDefault()
          }
          onChange={(e) => {
            setQty(e.target.value);
          }}
          style={{ width: "50px" }}
        />
      </td>
      <td width="150px">
        {productId ? (
          <Select
            options={types}
            value={Type}
            onChange={(e) => {
              setType(e);
            }}
            styles={{
              menuPortal: (base) => ({ ...base, zIndex: 9999 }),
            }}
            menuPortalTarget={document.body}
          />
        ) : (
          <div
            style={{
              width: "150px",
            }}
          >
            Type
          </div>
        )}
      </td>

      <td>
        <Controls.ActionButton
          size="small"
          variant="contained"
          color="secondary"
          onClick={(e) => {
            if (
              productId === "" ||
              productQty === "" ||
              Type === "" ||
              Type === undefined
            ) {
              return toast.warn("Please Fill the Form");
            }
              else {
              props.addRow({
                "productId": productId.value, 
                "product_name": productId.label,         
                "quantity": parseFloat(qty),
                "stockQty":parseFloat(stockQty),                     
                "unitName": unit.label,
                "unitId": unit.value,
                "adjustmenttype":Type.value,
              });
              
            
           
              setProductId("");
              setProductQty("1");
              setNum("0")
              setType("");
              setQty("0");
            }
          }}
        >
          <Tooltip title="Add">
            <AddCircleIcon color="primary" style={{ fontSize: "25px" }} />
          </Tooltip>
        </Controls.ActionButton>
      </td>
    </tr>
  );
};
const initialFValues = {

  adjustDate: format(new Date(), "yyyy-MM-dd HH:mm:ss")
};
const types = [
      {
        value: 1,
        label: "Addition",
      },
      {
        value: 0,
        label: "Subtract",
      },
    ];
export default function StockAdjustmentform(props) {
  const userSessionContext = React.useContext(UserSessionContext);
  const companyContext = React.useContext(CompanyContext);
  const _data = props.data || initialFValues;
  const [allProducts, setAllProducts] = useState();
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { values, handleInputChange, errors, setErrors, ResetForm } =
    useForm(_data);
  const [warehouses, setWareHouseList] = useState();
  const [warehouse, setWareHouse] = useState(null);
  //const [loadProductUnit, setLoadProductUnit] = useState();
  const [Note, setNote] = useState();
  const [SaveStatus, setSaveStatus] = useState(0);

  //const [isDisabled, setIsDisabled] = useState(false);
  const [input, setInput] = useState("");
  let history = useHistory();
 

  //const defaultValue = props.warehouse.filter((option) => option.isMain === 1); // Set the default value to the option with "isMain" equal to 1
  // const [quantity, setQuantity] = useState(1);

;
  useEffect(() => {
    load_warehouse();
  }, []);
  const load_warehouse = async () => {
    await axios
      .get(`${config.APP_CONFIG}/stock/warehouse/api`, {
        headers: { Authorization: userSessionContext.token },
      })
      .then((res) => {
        if (res.data.status_code === 401) {
          userSessionContext.handleLogOut();
        } else if (res.data.status_code === 200) {
          let temp = res.data.msg.map((item) => ({
            value: item.id,
            label: item.warehouse,
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
  };

  

  const updatenote = (e) => {
    setNote(e.target.value);
  };
 



 const  load_detail_by_warehouse_product = async (id) => {

  await axios
  .get(`${config.APP_CONFIG}/stock/warehouse/getProductStockByWareHouse/api/${id}`, {
    headers: { Authorization: userSessionContext.token },
  })
  .then((res) => {
    if (res.data.status_code === 401) {
      userSessionContext.handleLogOut();
    } else if (res.data.status_code === 200) {
      setAllProducts(res.data.msg);
      let temp = res.data.msg.map((item) => ({
        value: item.productId,
        label: item.productName,
      }));

      setProduct(temp);
    } else if (res.data.status_code === 400) {
      toast.warn(res.data.msg);
    } else {
      toast.error("error");
      setProduct([]);
    }
  })
  .catch((err) => {
    setProduct([]);
  });
}
//  const updatedQty = (qty) => {
//   setQuantity(qty);
// };

//    const handleChange = (selectedOption) => {
//      setSelectedValue(selectedOption);
//    };
//   useEffect(() => {
//     setUpdateProducts(updateProducts);
  
// }, [updateProducts,quantity,selectedValue]);

if (products === undefined) {
  return <Spinner />;
}


//   const preparePurchaseProductArray = (products) => {
//     console.log(products)
//     let purchaseProductRowArray = [];

//     products.forEach((product) => {
// console.log(product)
//       purchaseProductRowArray.push({
//         "product_id": product.id, 
//         "product_name": product.productname, 
//         code: product.code,
//         unitName: product.UnitName,
//         unitId:product.unitId,
//         id:product.id,
//         quantity:quantity,
//         "adjustmenttype": 1,

//       });
                      
      
    


//     });
//     return purchaseProductRowArray;
//   };
//   const customProducts = preparePurchaseProductArray(products);
  
  
  var   adjustDate = format(new Date(values.adjustDate), "yyyy-MM-dd HH:mm:ss");
  if (values.accountingDate !== undefined) {
    adjustDate = format(new Date(values.adjustDate), "yyyy-MM-dd HH:mm:ss" );
  }

 ;
  const  handleadjust = () => {

    setIsSubmitting(true);
     const adjust_data = products.map((i) => {
       return {
         ...i,
         "note":Note,
         "wareHouseId": warehouse.value,
        
    "oldwareHouseId": 0,
         "companyId": companyContext.company.id,
         "username": localStorage.getItem("user"),
       };
     })
  
     axios
       .post(`${config.APP_CONFIG}/Inventory/stockAdjust/api`, adjust_data,{ headers: {Authorization: userSessionContext.token } })
       .then((res) => {
         if (res.data.status_code === 200) {
          history.push(`/inventory/stocktab`)
           toast.success(res.data.msg);
         
              props.setIsNewPopup(false);
            
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
         toast.error("Something went Wrong");
       });
       props.setIsNewPopup(false);
   };
 
  return (
    <div className="purchase-form">
      <Grid container spacing={2}> 
        <Grid item xs={6}>
          <Select
            type="text"
            placeholder={"Search Warehouse...."}
            isDisabled={products.length > 0}
            onChange={(e) => {
              setWareHouse(e);
               load_detail_by_warehouse_product(e.value);
            }}
            value={warehouse}
            options={warehouses}
        
            styles={{
              menuPortal: (base) => ({ ...base, zIndex: 9999 }),
            }}
            menuPortalTarget={document.body}
          />
        </Grid>

        <Grid item xs={6}>
          <Controls.DatePicker
            name="Date"
            value={values.adjustDate}
            onChange={handleInputChange}
            onFocus={(e) => e.target.blur()}
            component="div"
            inputProps={{ readOnly: true }}
            disabled={true}
          />
        </Grid>
      </Grid>
      <div style={{ marginTop: "30px" }}>
        <table className="table">
          <tr style={{ color: "#c99" }}>
            <th style={{ color: "#999"  ,verticalAlign:"middle"}}>Product</th>
            <th style={{ color: "#999"  ,verticalAlign:"middle"}}>Unit</th>
            <th style={{ color: "#999" ,verticalAlign:"middle" }}>Stock</th>
            <th style={{ color: "#999" ,verticalAlign:"middle" }}>Quantity</th>
            <th style={{ color: "#999" ,verticalAlign:"middle" }}>Type</th>
          
            <th style={{ color: "#999" ,verticalAlign:"middle" }}>Action</th>
          </tr>
          {products &&
            products.map((row, idx) => {
              return (
                <tr key={row.id}>
                  <td style={{color:"green",verticalAlign:"middle"}}>{row.product_name}</td>
                  <td style={{color:"green",verticalAlign:"middle"}}>{row.unitName}</td>
                      <td style={{color:"green",verticalAlign:"middle"}}>{row.stockQty+" "+row.unitName}</td>
                      <td style={{color:"red"}}>{row.quantity +" "+row.unitName}</td>
                  <td style={{color:"green",verticalAlign:"middle"}}>{row.adjustmenttype===1?"Addition":"Subtraction"}</td>
                  <td style={{verticalAlign:"middle"}}>
                    <Controls.ActionButton>
                      <span
                        onClick={(e) => {
                          const _data = products.filter((item) => {
                            return item.id !== row.id;
                          });

                          setProducts(_data);
                        }}
                      >
                        <Tooltip title="Delete" placement="top" arrow>
                          <DeleteIcon style={{ fontSize: "15px" }} />
                        </Tooltip>
                      </span>
                    </Controls.ActionButton>
                  </td>
                </tr>
              );
            })}
          <AddForm  product={product} products={products} allProducts={allProducts} addRow={(e) => {setProducts([...products, e])}}/>
        </table>
      </div>
      <Card variant="outlined">
        <CardContent>
          <div className="input-group journal-tab1">
            <div className="input-group">
              <div className="input-group-prepend">
                <span
                  className="input-group-text"
                  style={{ paddingLeft: "0", marginTop: "40px" }}
                >
                  Note
                </span>
              </div>
              <textarea
                className="form-control"
                name="remarks"
                value={Note}
                onChange={updatenote}
                aria-label="With textarea"
              ></textarea>
            </div>

            {SaveStatus === 0 ? (
              <Controls.Button
                type="submit"
                text="submit"
                disabled={isSubmitting}
                onClick={(e) => {
                  e.preventDefault();

                  if (
                    warehouse=== undefined ||warehouse===""||warehouse===null
                   
                  ) {
                    toast.warn("Please Enter Warehouse First");
                  }
                
                  else {
                    handleadjust();
                  }
                
                }}
              />
            ) : (
              <Controls.Button type="submit" text="Saved" disabled />
            )}

           
          </div>
        </CardContent>
      </Card>
      </div>
  );
}

//    <Grid container spacing={3}> 
//          <Grid item xs={6}>
//           <Select
//             type="text"
//             placeholder={"Search Warehouse...."}
//             // isDisabled={products.length > 0}
//             onChange={(e) => {
//               setWareHouse(e);
//                load_detail_by_warehouse_product(e.value);
//             }}
//             value={warehouse}
//             options={warehouses}
        
//             styles={{
//               menuPortal: (base) => ({ ...base, zIndex: 9999 }),
//             }}
//             menuPortalTarget={document.body}
//           />
//         </Grid>

//         <Grid item xs={6}>
//           <Controls.DatePicker
//             name="Date"
//             value={values.adjustDate}
//             onChange={handleInputChange}
//             onFocus={(e) => e.target.blur()}
//             component="div"
//             inputProps={{ readOnly: true }}
//             disabled={true}
//           />
//         </Grid>
//       </Grid>

// <div style={{marginTop:"30px"}}>
// <div className='col-md-12 mb-3'>
                       
//                        <ProductSearch products={products} 
//                                      updateProducts={updateProducts}
//                                       setUpdateProducts={setUpdateProducts}
//                                    customProducts={customProducts}/>
                               
//                    </div>
//                    </div>
//    <table className="table table-fluid recipe align-middle">
//    <tr>
   
//      <th  style={{   verticalAlign:"middle"}}>Product Name</th>
//      <th  style={{   verticalAlign:"middle"}}>Stock</th>
//      <th  style={{  verticalAlign:"middle"}}>Unit</th>
//      <th  style={{ verticalAlign:"middle"}}>Quantity</th>
//      <th  style={{  verticalAlign:"middle"}}>Type</th>
//      <th  style={{  verticalAlign:"middle"}}>Action</th>
//    </tr>
//    {updateProducts &&
//              updateProducts.map((singleProduct, index) => {
//                return (
//                  <AdjustTable
//                    singleProduct={singleProduct}
//                    index={index}
//                     updateQty={updatedQty}
//                     selectedValue={selectedValue}
//  Type={Type}
 
//                    updateProducts={updateProducts}
//                    setUpdateProducts={setUpdateProducts}
//                  />
//                );
//              })}
      
           
    
//       {!updateProducts.length && (
//              <tr>
//                <td colSpan={8} className="fs-5 px-3 py-6 custom-text-center">
//                  No Data Available
//                </td>
//              </tr>
//            )}
     
//  </table>
// <div>
//  <Card variant="outlined">
//         <CardContent>
//           <div className="input-group journal-tab1">
//             <div className="input-group">
//               <div className="input-group-prepend">
//                 <span
//                   className="input-group-text"
//                   style={{ paddingLeft: "0", marginTop: "40px" }}
//                 >
//                   Note
//                 </span>
//               </div>
//               <textarea
//                 className="form-control"
//                 name="remarks"
//                 value={Note}
//                 onChange={updatenote}
//                 aria-label="With textarea"
//               ></textarea>
//             </div>
//             </div>
//             </CardContent>
//             </Card>
//             </div>
//   <Controls.Button
//             type="submit"
//             text="Save"
//             disabled={isSubmitting}
//             onClick={(e) => {
//              e.preventDefault();
//        //AddReceipe();
//             }}

//       />
//           </div>
//  )
// }; 

