import React,{useEffect,useState} from 'react'
import AddIcon from "@material-ui/icons/Add";
import { makeStyles,Tooltip} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Controls from "../controls/Controls";
import UserSessionContext from "../../contexts/UserSessionContext";
import { toast } from "react-toastify";
//import Spinner from "../../utils/spinner";
import { Grid } from "@material-ui/core";
import { useForm, Form } from "../../components/home/useForm";
import axios from "axios";
import config from "../../utils/config";
import Select from "react-select";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CompanyContext from "../../contexts/CompanyContext";
import UseTable from "../home/UseTable";

//import ConfirmDialog from '../home/ConfirmDialog';
//import CardHeader from "@material-ui/core/CardHeader";
import Card from "@material-ui/core/Card";
import CardContent from "@mui/material/CardContent";
import PrintIcon from '@mui/icons-material/Print';

import { useHistory } from "react-router-dom";
const initialFValues = {
 
    date: "",
    from:"",
    to:"",
    wareHouseId:"",
    transferDeadline:  new Date(),
    Note:"",

  };
  
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
  

  const AddForm = (props) => {
    const classes = useStyles(props);
    const userSessionContext = React.useContext(UserSessionContext);
    const companyContext = React.useContext(CompanyContext);
    const [productId, setProductId] = useState("");
    const [productQty, setProductQty] = useState("1");
    const [stockQty, setStockQty] = useState("");
    const [units, setUnits] = useState();
    const [unit, setUnit] = useState("");
   // const [allProducts, setAllProducts] = useState(props.allProducts || []);
    const [currentItem, setCurrentItem] = useState();
 
  
  
 
  

  
  
  
    // useEffect(() => {
    //   if (productId.value !== undefined) {
    //     loadUnitByHouseId(productId.value);
       
    //   }
    // }, []);
  
  

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
    
        //  const defaultValue = temp.find((option) => {
        //   const data = _all_items[0].nestedData.find((i) => i.baseUnit === 1);
        //   return data && option.value === data.unitId;
        // })
        // let _curr_item = _all_items[0] || {};
        // setStockQty(parseFloat(_curr_item.nestedData.rawQuantity))
     
       // return _curr_item;
     };
  
    // React.useEffect(() => {
    //   if (productId !== undefined) {
    //     let curr_item = get_curr_item();
    //     setCurrentItem(curr_item);
    //   }
    // }, [productId]);
    
    const get_curr_item_stock = (id) => {
 
          const data = currentItem.nestedChild.filter((i) =>{
           
            return i.unitId === id});
     
          let _curr_item_stock = data[0] || {};
  
          setStockQty(parseFloat(_curr_item_stock.qty))
      
    }
    // const defaultValue = units.filter((option) => {
    //   const data = currentItem.nestedData.filter((a) => {return a.baseUnit === 1});
    //   return data && option.value === data.unitId;
    // });
     //console.log(currentItem);
    //const data = currentItem.nestedData.filter((i) => {return i.baseUnit === 1});
    //console.log(data);
   // const defaultUnitValue = units.length > 0 ? units[0] : null;

    return (
      <tr key={(Math.random() + 1).toString(36).substring(2)} hover>
    
        <td width="200px">
          <Select
            type="text"
            placeholder={"Add Product"}
            options={props.product}
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
        <td size="small">
          <input
            type="number"
            step="1"
            min={1}
            value={productQty || 0}
            onKeyDown={(e) =>
              // (e.keyCode === 69 || e.keyCode === 190 || e.keyCode === 187) && e.preventDefault()
              (e.keyCode === 69 || e.keyCode === 187) && e.preventDefault()
            }
            onChange={(e) => {
              setProductQty(e.target.value);
            }}
            style={{ width: "50px" }}
          />
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
                
                  unit === "" ||
                  unit === undefined
                ) {
                  return toast.warn("Please Fill the Form");
                }
                 else if(productQty >stockQty)
                 {
                  return toast.warn("Greater Than Stock Quantity");
                }
                 
                else {
  
                  
              
                        props.addRow({
                      
                          product_name: productId.label,
                          productId: productId.value,
                        rawQuantity: parseFloat(productQty),
                        stockQty:parseFloat(stockQty),
                       
                          unitName: unit.label,
                          unitId: unit.value,
                        
  
                        });
  
                        setProductId("");
                        setProductQty("");
                       
                      
                        setUnits("");
                        setUnit("");
                    
                        // setCurrentItem("");
                      
                   
                       
                }
              }}
  
            >
              <Tooltip title="Add">
                <AddCircleIcon color="primary" style={{ fontSize: "25px" }}   />
              </Tooltip>
            </Controls.ActionButton>
          </td>
        
      </tr>
    );
  };




function StockTransferForm(props) {
  const classes = useStyles(props);
    const userSessionContext = React.useContext(UserSessionContext);
    const companyContext = React.useContext(CompanyContext);
    const [records, setRecords] = useState();
    const [allProducts, setAllProducts] = useState();
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState();
    const [Note, setNote] = useState();
    const [SaveStatus, setSaveStatus] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [warehouses, setWareHouseList] = useState();
    const [warehouse1, setWareHouse1] = useState(null);
    const [warehouse2, setWareHouse2] = useState(null);

    const [confirmDialog, setConfirmDialog] = useState({
      isOpen: false,
      title: "",
      subTitle: "",
      Icon:PrintIcon,
    });
    let history = useHistory();
    useEffect(() => {
       
        load_warehouse();
      }, []);
     
      
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
  
      const transferStock = (e) => {
     
               if( warehouse2 === undefined ||warehouse2 ===""||warehouse2 ===null)
                 
                  {
                
                    toast.warn("Please Enter   Warehouse To");
                  }
                  else if ( warehouse1 === undefined ||warehouse1 ===""||warehouse1 ===null)
                  {
                          
                    toast.warn("Please Enter Warehouse From ");
                  }
                  else if(warehouse1 ===warehouse2

                  ){
               
                    toast.warn("Please Enter different Warehouse");
                  }
                  else{
       // e.preventDefault();
       setIsSubmitting(true);
        const transfer_data = products.map((i) => {
          return {
            ...i,
            "note":Note,
            "wareHouseId": warehouse2.value,
            "oldwareHouseId": warehouse1.value,
            "companyId": companyContext.company.id,
            "username": localStorage.getItem("user"),
          };
        })
        axios
          .post(`${config.APP_CONFIG}/InventoryTransfer/api`, transfer_data,{ headers: {Authorization: userSessionContext.token } })
          .then((res) => {
            if (res.data.status_code === 200) {
           
              history.push(`/inventory/stocktab`)
              toast.success(res.data.msg);
              setSaveStatus(1)
              props.setIsNewPopup(false);
              //props.load_table();
              setIsSubmitting(false)
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
         // props.setIsNewPopup(false);
      };
      }
    const _data = props.data || initialFValues;

   
    const updatenote = (e) => {
        setNote(e.target.value);
      };


    const { values,  handleInputChange, ResetForm, errors, setErrors } = useForm(_data);
    return (
      <div>
      <div>
      {/* <ConfirmDialog
      confirmDialog={confirmDialog}
      setConfirmDialog={setConfirmDialog}
      PrintIcon={PrintIcon}
    /> */}
    </div>
        {/* <Form  onSubmit={handleSubmission}> */}
             <Grid container>
        <Grid item xs={6}>

          <div className="productsAdd addProductsForm">
           <Select
            type="text"
             isDisabled={products.length > 0}
            placeholder={"Choose Warehouse(From)"}
            options={warehouses}
            value={warehouse1}
            onChange={(e) => {
              setWareHouse1(e);
               load_detail_by_warehouse_product(e.value);
            }}
            styles={{
              menuPortal: (base) => ({ ...base, zIndex: 9999 }),
            }}
            menuPortalTarget={document.body}
          />
          </div>
          </Grid>
          <Grid item xs={6}>
         
              <div className="productsAdd addProductsForm">
          <Select
            type="text"
            placeholder={"Choose Warehouse(To)"}
            options={warehouses}
            value={warehouse2}
            onChange={(e) => {
              setWareHouse2(e);
               //load_detail_by_warehouse_product(e.value);
            }}
            styles={{
              menuPortal: (base) => ({ ...base, zIndex: 9999 }),
            }}
            menuPortalTarget={document.body}
          />
        </div>
          </Grid>
          </Grid>
          <div className='purchase-form'>
          <div style={{marginTop:'30px'}}>
          <table className="table table-fluid">
              <tr style={{color:"#c99"}}>
              
                <th style={{color:"#999"}}>Product Name</th>
                <th style={{color:"#999"}}>Unit Name</th>
                <th style={{color:"#999"}}>Stock Qty</th>
                <th style={{color:"#999"}}>Quantity</th>
              
              
   
                <th style={{color:"#999"}}>Action</th>
              </tr>
              {products&&
                 products.map((row, idx) => {
                  return (
                    <tr key={row.id}>
                
                      <td>{row.product_name}</td>
                      <td>{row.unitName}</td>
                      <td style={{color:"green"}}>{row.stockQty+" "+row.unitName}</td>
                      <td style={{color:"red"}}>{row.rawQuantity +" "+row.unitName}</td>
                  
                     
               

                    
                        <td>
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
                })
              
           
            }
              <AddForm  product={product} products={products} allProducts={allProducts} addRow={(e) => {setProducts([...products, e])}}/>
            </table>
            </div>
            </div>
            <Card variant="outlined">
        <CardContent>
          <div className="input-group journal-tab1">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" style={{paddingLeft: "0"}}>Note</span>
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
                text="Save"
                disabled={isSubmitting}
                onClick={(e) => {
                  //e.preventDefault();
             
                  
                  if (
                    products === undefined ||
                    products === null ||
                    products.length === 0
                  ) {
                    toast.warn("Please Enter Data First");
                  }
                  else {
                    transferStock();
                  }

                }}
              />
            ) : (
              <Controls.Button type="submit" text="Saved" disabled={isSubmitting}  />
            )}

          

          
         
          </div>
        </CardContent>
      </Card>
   
                            
                       
        {/* </Form> */}
        </div>
  )
}

export default StockTransferForm