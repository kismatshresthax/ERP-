import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../utils/config";
import { toast } from "react-toastify";
import "../../utils/styles.css";
import UserSessionContext from "../../contexts/UserSessionContext";
import Controls from "../../components/controls/Controls";
import { Grid } from "@material-ui/core";
import { useForm, Form } from "../../components/home/useForm";
import Spinner from "../../utils/spinner";
import Select from "react-select";

import CardContent from "@mui/material/CardContent";
import { useHistory } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from '@mui/material/Tooltip';
import AddIcon from "@mui/icons-material/Add";
import CompanyContext from "../../contexts/CompanyContext";
import {
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  TableBody,
  Paper,
  Table,
  tableCellClasses
} from "@mui/material";

import { styled } from "@mui/material/styles";
const initialFValues = {
 "stockQuantity":"",
  "warehouseId": "",
  "yield_productId": "",
  "yield_quantity": "",
  "yield_unitId": "",
  "yield_wareHouseId": "",
  "waste_qty": "",
  "note": "",
  "yield_percent": 0,
  "company_id": "",
  "created_by": "",

};


export default  function StockYieldForm(props){


  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#F3F6F9",
      fontSize: 15,
      fontWeight: "bold",
      width:"28%"
    }
  }));



 
 

  const _data =props.data||initialFValues ;

  const companyContext = React.useContext(CompanyContext);
  const userSessionContext = React.useContext(UserSessionContext);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [Data, setData] = useState([])
  const [Note, setNote] = useState();
   const [qty, setQty] = React.useState(_data.rawQuantity||1);
   //const [isNewPopup, setIsNewPopup] = useState(false);
   const [warehouse1, setWareHouse1] = useState();
   const [warehouses, setWareHouseList] = useState();
  

   //const [YieldQty, setYieldQty] = useState();
   //const [units, setUnits] = useState();

   let history = useHistory();
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

 
 
  const validate = (fieldValues=values) => {
    const actualRawQuantity = parseFloat(qty);
    let temp = { ...errors };
     
if ("stockQuantity" in fieldValues) {
  if (fieldValues.stockQuantity && fieldValues.stockQuantity > actualRawQuantity) {
      temp.stockQuantity = `Cannot input more than raw quantity (${actualRawQuantity}).`;
  } else {
      temp.stockQuantity = fieldValues.stockQuantity ? "" : "This field is required.";
  }
}

    setErrors({ ...temp });

    return Object.values(temp).every((x) => x === "");
  };


  const { values, setValues, errors,handleInputChange, setErrors,ResetForm } = useForm(_data,true, validate);
  
  



  // useEffect(
  //   (e) => {
  //     if (values.yield_percent !== undefined) {
  //       const stockQuantity = parseFloat(values.stockQuantity);
  //     const yieldPercent = parseFloat(values.yield_percent);

  //      if (!isNaN(stockQuantity) && !isNaN(yieldPercent)) {
  //        const calculatedYieldQty = (stockQuantity * yieldPercent) / 100
  //       setYieldQty( parseFloat(calculatedYieldQty));
  //     }
  //     }
  //     },  [values.yield_percent,values.stockQuantity]
  // )
 

  
  const AddProductyield =() => {
    setIsSubmitting(true);
    const _sub_total_waste = Data.reduce(
      (total, obj) => parseFloat(obj.yield_quantity
      ) + parseFloat(total),
      0
    );
    const total_waste_qty=parseFloat(values.stockQuantity)-_sub_total_waste
    const product_data = Data.map((i) => {
      return {
        ...i,
        "note":Note,
        "productId": values.productId,
        "rawQuantity":parseFloat(values.stockQuantity),
        "unitId": values.unitId,
       "wareHouseId": values.warehouseId,
        "yield_wareHouseId":  warehouse1.value,
         "waste_qty":parseFloat(total_waste_qty),
        "company_id": companyContext.company.id,
        "created_by":localStorage.getItem('user'),
      };
     
    })
    axios.post(`${config.APP_CONFIG}/Yield/stockYield/api`, product_data, {
         headers: { Authorization: userSessionContext.token },
       })
       .then((res) => {
         if (res.data.msg === undefined) {
           return <Spinner />;
         }
 
         if (res.data.status_code === 200) {
             toast.success(res.data.msg);
        props.setIsYieldPopup(false);
        history.push('/inventory/stocktab');
        setIsSubmitting(false);
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
   };
  



    


    

   

  
 


 
  


  const ReadonlyTable=(data)=>{
   
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
      [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#F3F6F9",
        fontSize: 15,
        fontWeight: "bold",
    
      }
     
    }));
  return (

    <>
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
          <StyledTableCell>S.N</StyledTableCell>
            <StyledTableCell>Category</StyledTableCell>
            <StyledTableCell>ProductName</StyledTableCell>
            <StyledTableCell>Stock</StyledTableCell>
            <StyledTableCell>Warehouse</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
       
           
              <TableRow key={(Math.random() + 1).toString(36).substring(2)}>
              <TableCell className="text-truncate">
                  {"1"}
                </TableCell>
                <TableCell className="text-truncate">
                  {data.data.categoryName}
                </TableCell>
                <TableCell className="text-truncate">
                  {data.data.productName}
                </TableCell>
                <TableCell>{data.data.rawQuantity +" "+data.data.unitName}</TableCell>
                <TableCell>{data.data.warehouseName}</TableCell>
              </TableRow>
            
      
        </TableBody>
      </Table>
    </TableContainer>
  </>

  )
  }
  const ProductYieldTable=(props)=>{
    const [Yield_percent,setYieldPercent]=useState();
    const [YieldQty, setYieldQty] = useState();
    //const [Yield_qty,setYieldQty]=useState();
const userinput_qty=props.RawQuantity
const [allProducts, setAllProducts] = useState();
const [units, setUnits] = useState();
const [unit, setUnit] = useState();
const [product, setProduct] = useState("");
const companyContext = React.useContext(CompanyContext);
const companyId = companyContext.company.id;
useEffect(() => {
  loadProducts();
}, []);
const  loadProducts =  () => {
 
  axios
   .get(`${config.APP_CONFIG}/InventorySummary/api/${companyId}`, {
     headers: {
       Authorization: userSessionContext.token,
     },
   })
   .then((res) => {
     if (res.data && res.data.status_code && res.data.status_code === 200) {

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

useEffect(() => {
  if (product.value !== undefined) {
    loadUnitById(product.value)
  }
}, [product]);

    useEffect(() => {
      if (Yield_percent !== undefined) {
        const rawQuantity = parseFloat(userinput_qty);
     
      const Percent = parseFloat(Yield_percent);

       if (!isNaN(rawQuantity) && !isNaN(Yield_percent)) {
         const calculatedYieldQty = (rawQuantity * Percent) / 100
    
        setYieldQty( calculatedYieldQty);
      }
      }
      },  [Yield_percent]);



 
 const loadUnitById =  (id) => {
  axios
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


  return (


              <TableRow key={(Math.random() + 1).toString(36).substring(2)}>
          
                <TableCell className="text-truncate">
                <div className="productsAdd addProductsForm">

<Select
  type="text"
  placeholder={"choose product"}
  options={allProducts}
  value={product}
  onChange={(e) => {
    setProduct(e);
    loadUnitById(e.value);
  }}
  styles={{
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  }}
  menuPortalTarget={document.body}
/>
</div>
                </TableCell>
                <TableCell>
                <Controls.Input
                   name="Yield_percent"
            label="Yield %"
            value={Yield_percent}
            onChange={(e) => {
         
              setYieldPercent(e.target.value);}
            }
            error={errors.Yield_percent}
            required={true}
          />
                </TableCell>
                <TableCell>
                  <Controls.Input
  label="Yield Quantity"
 type="number"
 name="YieldQty"
 step="0.1"

 onKeyDown={(e) =>
   (e.keyCode === 69 || e.keyCode === 187 || e.keyCode === 189) &&
   e.preventDefault()
 }
 value={YieldQty}
 onChange={(e) => {
   setYieldQty(e.target.value);
 }}

 required={true}
/></TableCell>
                <TableCell>
                  
                {product ? (
            <Select
              options={units}
            value={unit}
          
              onChange={(e) => {  
                setUnit(e);
              
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
          </TableCell>
             
            
              <TableCell><Controls.ActionButton
          size="small"
          variant="contained"
          color="primary"
          onClick={(e) => {
            if (
              product === "" ||
           Yield_percent === "" ||
            unit===""||unit===undefined||
              YieldQty===""|| YieldQty=== undefined
            ) {
              return toast.warn("Please Fill the Form");
            }
    else{
            props.addRow({
              "yield_productName":product.label,
              "yield_productId": product.value,
              "yield_unitId": unit.value,
              "yield_unitName":unit.label,    
              "yield_percent": parseFloat(Yield_percent),
              "yield_quantity": parseFloat((YieldQty).toFixed(2)),
            
             })
             setProduct("")
             setYieldPercent(0);
             setYieldQty(0);
             setUnit("")
             
            }}
          }
            ><Tooltip title="Add">
            <AddIcon style={{ fontSize: "20px" }} /></Tooltip>
          </Controls.ActionButton>
             </TableCell>
        
             </TableRow>
             
 

  )
  }
   
  const updatenote = (e) => {
    setNote(e.target.value);
  };

  return (
   <div>
<span  style={{ fontSize: "18px", paddingTop: "0", width: "100%" ,paddingLeft:"400px" ,fontWeight:"600px",color:"red"}}>Master Product</span>
 <ReadonlyTable data={props.data}/>
   
     
      
       
       
 
        

      

       
      
        
<label
                    htmlFor="text"
                    style={{ fontSize: "18px", paddingTop: "0", width: "100%" ,paddingLeft:"400px" ,fontWeight:"600px",color:"green"}}
                    className="col-sm-12 col-form-label"
                  >
                    Product To Be Yield
                  </label>

        <Grid item xs={12} >
        <Grid container spacing={0.2}>
      
            <Grid item xs={6}>
  <div className="productsAdd addProductsForm">

  <Select
            type="text"
            placeholder={"Warehouse"}
            isDisabled={Data.length > 0}
            options={warehouses}
            value={warehouse1}
            onChange={(e) => {
              setWareHouse1(e);
            
            }}
            styles={{
              menuPortal: (base) => ({ ...base, zIndex: 9999 }),
            }}
            menuPortalTarget={document.body}
          />
        </div>
        
        </Grid>
        <Grid item xs={6}>
          <Controls.Input
            label=" Quantity  yield"
     type="number"
            name="stockQuantity"
            disabled={Data.length > 0}
            step="0.1"
            value={values.stockQuantity}
            onKeyDown={(e) =>
              (e.keyCode === 69 || e.keyCode === 187 || e.keyCode === 189) &&
              e.preventDefault()
            }
            onChange={handleInputChange}
            error={errors.stockQuantity}
         
            />
      
        </Grid>
       
        </Grid>
   
        </Grid>
        <div >
      <Table size="small" >
        <TableHead size="small">
          <TableRow>
       
         
            <StyledTableCell>ProductName</StyledTableCell>
            <StyledTableCell>Yield %</StyledTableCell>
            <StyledTableCell>Yield Qty</StyledTableCell>
            <StyledTableCell>Unit</StyledTableCell>
            <StyledTableCell>Action</StyledTableCell>
          </TableRow>
        </TableHead>

        {Data &&
                      Data.map((row, idx) => {
                   
                        return (
                          <TableRow key={row.idx}>

            <TableCell>{row.yield_productName}</TableCell>
            <TableCell>{row.yield_percent}</TableCell>
            <TableCell>{row.yield_quantity}</TableCell>
            <TableCell>{row.yield_unitName}</TableCell>
            <TableCell>  <Controls.ActionButton>
                      <span
                        onClick={(e) => {
                          const _data = Data.filter((item) => {
                            return item.id !== row.id;
                          });

                          setData(_data);
                        }}
                      >
                        <Tooltip title="Delete" placement="top" arrow>
                          <DeleteIcon style={{ fontSize: "15px" }} />
                        </Tooltip>
                      </span>
                    </Controls.ActionButton></TableCell>
            </TableRow>
                        );
                      })}

    <ProductYieldTable addRow={(e) => {
    
                        setData([...Data, e]);
                       // ResetForm();
                      }} RawQuantity={values.stockQuantity}/> 
                   
                      </Table>
                  </div>
    
        <CardContent style={{marginTop:"0px"}} >
          <div className="input-group journal-tab1">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" style={{paddingLeft: "0"}}>Note</span>
              </div>
              <textarea
                className="form-control"
                name="remarks"
                value={Note}
                placeholder="Note"
                onChange={updatenote}
                aria-label="With textarea"
              ></textarea>
            </div>

             

          
         
          </div>
        </CardContent>
     
      <div style={{marginTop:"20px"}}>    
      <Controls.Button
                type="submit"
                text="submit"
                disabled={isSubmitting}
                onClick={(e) => {
                  e.preventDefault();

                  if (
                    warehouse1=== undefined ||warehouse1===""||warehouse1===null
                   
                  ) {
                    toast.warn("Please Fill Forms");
                  }
                
                  else {
                    AddProductyield()
                  }
                
                }}
              />
              <Controls.Button text="Reset" color="default" onClick={ResetForm} />
          
        </div>
    {/* </Form> */}
    </div>
  );
}
