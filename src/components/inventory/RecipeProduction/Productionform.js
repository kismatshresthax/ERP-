import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Select from "react-select";
//import SaveIcon from "@mui/icons-material/Save";
import { toast } from "react-toastify";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import UserSessionContext from "../../../contexts/UserSessionContext";
import Spinner from "../../../utils/spinner";
import config from "../../../utils/config";
import Controls from "../../controls/Controls";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import PrintIcon from "@mui/icons-material/Print";
import Popup from "../../home/Popup";
import ReactToPrint from "react-to-print";

import "date-fns";
import CompanyContext from "../../../contexts/CompanyContext";

import Card from '@mui/material/Card';
//import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
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






      const TableRecipe=(props)=>{
        //const {load_table}=props
        const [products, setProducts] = useState(props.IngreProduct||[]);
        const userSessionContext = React.useContext(UserSessionContext);
      
        return (
          <div>
         
          <div className="table-ingre" > 
       
       <div style={{MarginTop:"50px"}}><h3 style={{alignItems:"center",textAlign:"center"}}>Ingredients</h3></div>
       <Paper>
             <TableContainer>
               <Table size="small" stickyHeader>
                 <TableHead>
<TableRow>
{products ? <TableCell style={{ width: "40px" }}>S.No.</TableCell> : null}
 <TableCell  style={{   verticalAlign:"middle",textAlign:"center"}}>Product Name</TableCell>
 <TableCell  style={{ verticalAlign:"middle"}}>Quantity</TableCell>
 <TableCell  style={{  verticalAlign:"middle"}}>Unit</TableCell>
 <TableCell  style={{  verticalAlign:"middle"}}>Warehouse</TableCell>
 <TableCell  style={{  verticalAlign:"middle"}}>Unit Cost</TableCell>
 <TableCell  style={{  verticalAlign:"middle"}}>Sub-Total</TableCell>


</TableRow>
</TableHead>
                 <TableBody>
{products&& products.map((row, idx) => {
      return (
       <TableRow key={row.idx}>
         <TableCell>{idx + 1}</TableCell>
 <TableCell style={{   verticalAlign:"middle",textAlign:"center"}}>{row.ingProductName||""}</TableCell>

 <TableCell>{row.quantity*parseFloat(props.qty)||""}</TableCell>
 <TableCell style={{color:"green"}}>{row.unitName||""}</TableCell>
 <TableCell>{row.wareHouseName||""}</TableCell>
 <TableCell>{row.cost_price||""}</TableCell>
 <TableCell>{row.cost_price*parseFloat(row.quantity)*parseFloat(props.qty)||""}</TableCell>
 </TableRow>
)})}
</TableBody>
               </Table>
             </TableContainer>
           </Paper>
</div>
            
           
    
    </div>
        )}
function Productionform(props) {
  const componentRef = React.useRef(null);
  //const [productIngre_id, setProductIngre_id] = useState([]);
  const classes = useStyles();
  const userSessionContext = React.useContext(UserSessionContext);
  //const companyContext = React.useContext(CompanyContext);
 
  const [IngreProduct, setIngreProduct] = useState([]);
 
  const [unit, setUnit] = useState();

  const [warehouseId, setWarehouseId] = useState();
  const [unitId, setUnitID] = useState();
  const [productId, setProductId] = useState("");
  const [unitcost, setUnitCost] = useState();

  const [quantity, setQuantity] = useState(1);

  const [product, setProduct] = useState();
  const [allProducts, setAllProducts] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
 
  const [isNewPopup, setIsNewPopup] = useState(false);
  const companyContext = React.useContext(CompanyContext);


  const [warehouses, setWareHouseList] = useState();
  

  const [productSubtotal, setProductSubtotal] = useState("");
  const [reset, setReset] = useState(false);
  //const [records, setRecords] = useState();

  const companyId = companyContext.company.id;
  useEffect(() => {
    loadProducts();
  
  }, [productId]);

  const PrintComponent=(props) =>{
    //const componentRef = React.useRef(null);
    const currentDate = new Date().toLocaleDateString(); // Get the current date
    const currentTime = new Date().toLocaleTimeString(); // Get the current time
  
   
    return (
      <div className="">
     <div style={{ textAlign: "left", marginLeft: "1px" }}>
              <ReactToPrint
                
               
                trigger={() => (
                  <Controls.Button
                    text="Print"
                    variant="outlined"
                    startIcon={<PrintIcon />}
                    className="printBtn"
                  />
                )}
                content={() => componentRef.current}
              />
            </div>
      <div ref={componentRef} className="salesReturnReport">
      <div className="jreportPage">
            <div>
            <div className="reportHeader">
              <p className="companyName">{companyContext.company.name}</p>
              <p className="companyAddress">
                    {companyContext.company.address || ""}
                  </p>
              <p className="companyPan">
                Pan No : {companyContext.company.panNo}
              </p>
             
              <p className="companyReport">Production Details</p>
             
            </div>
            <p>{productId.label}</p>
  <div className="row">
 
          <table className="table table-fluid journal-entry-table col-lg-12 col-md-12 col-sm-12 col-xs-12">
         
            <thead>
              <tr>
               
              <th width="37px">S.N</th>
              <th  style={{   verticalAlign:"middle",textAlign:"center"}}>Product Name</th>
      <th  style={{ verticalAlign:"middle"}}>Quantity</th>
      <th  style={{  verticalAlign:"middle"}}>Unit</th>
      <th  style={{  verticalAlign:"middle"}}>Warehouse</th>
      <th  style={{  verticalAlign:"middle"}}>Unit Cost</th>
      <th  style={{  verticalAlign:"middle"}}>Sub-Total</th>
  
              </tr>
            </thead>
            <tbody>
              {props.records &&
                props.records.map((i,index) => (
                  <tr key={index}>
                     <td width="37px">{index+1}</td>
                     <td>{i.productName}</td>
                        <td>{i.quantity}</td>
                        <td>{i.unitName}</td>
                        <td>{i.wareHouseName}</td>
                        <td>{parseFloat(i.cost_price)}</td>
                        <td>{parseFloat(i.cost_price)*parseFloat(i.quantity)}</td>
                     
                     
                
                  </tr>
                ))}
  
             
              
            </tbody>
          </table>
        </div>
        </div>
        </div>
      <div style={{display:'flex', justifyContent: 'space-between', marginTop: '35px', alignContent:'center'}}>
  <div style={{width:'200px', textAlign:'center'}}>    
  <span>-------------------</span><br />
  
  <span>Prepared By:</span><br />
  
  </div>
  <div style={{width:'200px', textAlign:'center'}}>
  <span>-------------------</span><br />
  <span>Approved By:</span><br />
  </div>
  </div>
  <div style={{width:'300px', textAlign:'left',marginTop: '5px'}}>
  
    <p className="date-time">Printed on {currentDate} at {currentTime} by {localStorage.getItem('user')} </p>
  </div>
    </div>
    </div>
  
    )
  };
  useEffect(() => {
    if (productId.value !== undefined) {
      //loadUnitById(productId.value);
      const productUnit = product.filter((x) => {
        return x.id === productId.value;
      });

console.log(productUnit)

setUnitCost(productUnit[0]["cost_price"])
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
  const load_table =  (id) => {
      const fig = {
        headers: {
          Authorization: userSessionContext.token,
        },
      };
      axios
        .get(`${config.APP_CONFIG}/Ingredients/recipe/api/${id}`, fig)
        .then((res) => {
          if (res.data.status_code === 200) {
      
            setIngreProduct(res.data.msg);
            setReset(true);
           
          } else if (res.data.status_code === 401) {
            userSessionContext.handleLogout();
          } else {
            toast.error("Warning");
            setIngreProduct([]);
          }
        })
        .catch((err) => {
          toast.error("Error");
  
          setIngreProduct([]);
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
      .get(`${config.APP_CONFIG}/Products/productRecipe/Api/${1}`, {
        headers: {
          Authorization: userSessionContext.token,
        },
      })
      .then((res) => {
        if (res.data && res.data.status_code && res.data.status_code === 200) {
          setProduct(res.data.msg);
          let temp = res.data.msg.map((name, index) => ({
            label: name.productname,
            value: name.id,
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
        const decimalValidate = (event) => {
          if (!/^\d*\.?\d*$/.test(event.key)) {
            event.preventDefault();
          }
        };  
  return (
  
  


            <div style={{position:"relative"}}><h3 style={{alignItems:"center",textAlign:"center"}}>Add Receipe for Production</h3>
  {isNewPopup ? (
      <Popup
      size="lg"
        title="Print Preview"
        openPopup={isNewPopup}
        setPopups={setIsNewPopup}
      >
        <PrintComponent
          records={IngreProduct}
     
        />
      </Popup>
    ) : null}
            <div className="purchase-form">
         
          <Card sx={{ minWidth: 800 }}>
          <CardContent>
           <table className="table table-fluid align-middle">
    <tr>
   
      <th className="col-md-3" style={{   verticalAlign:"middle"}}>Product Name</th>
      <th className="col-md-2"  style={{ verticalAlign:"middle"}}>Quantity</th>
      <th className="col-md-1"  style={{  verticalAlign:"middle"}}>Unit Name</th>
      <th className="col-md-3" style={{  verticalAlign:"middle"}}>Warehouse</th>
      <th className="col-md-1" style={{  verticalAlign:"middle"}}>UnitCost</th>
      <th className="col-md-1" style={{  verticalAlign:"middle"}}>Total</th>
  
    
    </tr>
          <tr hover>
         
            <td>
              <Select
                type="text"
                placeholder={"Add Product"}
                options={allProducts}
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
      
      
            <td >
              <input
                type="number"
                step="1"
                min={1}
                value={quantity }
              
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
                style={{ width: "100px" }}
              />
            </td>
            <td style={{color:"green"}}>
              {productId ? (
               
         
                  <span>{unit}</span>
                 
              ) : (
                <span style={{fontSize:"13px"}}>Select unit</span>
              )}
            </td>
            <td>
      {productId ? (
       <Select
       type="text"
       placeholder={"Warehouse"}
       options={ warehouses}
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
        <p style={{ padding: "0.7rem 0", margin: "0" }}>Select Warehouse</p>
      )}

</td>
      
            <td size="small">
            <div className="custom-qty">
        <Form.Control
                aria-label="unit cost"
                onKeyPress={(event) => decimalValidate(event)}
                className="text-center px-0 py-2 rounded hide-arrow"
                value={unitcost}
                type="number"
                step={0.01}
                min={0.0}
                onChange={(e) => setUnitCost(e.target.value)}
              />
        
          </div>
            </td>
            <td>
              <span>{parseFloat(productSubtotal || 0)}</span>
            </td>
        
          
            
    
             
          
          </tr>
          </table>
       
          <div className="Load-inc">
          {reset?(

              <Controls.Button
             type="submit"
             text="Reset"
           
             onClick={(e) => {
           
         
              setIngreProduct("")
              setProductId("")
              setReset(false)
             }}
           
       />
          ):(

          <Controls.Button
             type="submit"
             text="Load Ingredients"
           
             onClick={(e) => {
              //e.preventDefault();
          
              load_table(productId.value)
          
    
             }}
           
       />
          )}
         </div>
         
         </CardContent>
       </Card>

       </div>
       <div  style={{height:"480px"}}>
{IngreProduct.length>0?
         <TableRecipe IngreProduct={IngreProduct}  setIngreProduct={setIngreProduct}qty={quantity}/>
         :null}
         </div>
         <div style={{position:"relative",MarginTop:"100px"}}>
         <div style={{position:"absolute",right:"100px"}}>
         {IngreProduct.length>0?<div>
          <Controls.Button
             type="submit"
             text="Save"
             disabled={isSubmitting} 
             onClick={(e) => {
              e.preventDefault();
              if (
                productId === "" ||
                quantity === "" 
             
               
              ) {
                return toast.warn("Please Fill the Form");
              }
              
              else{
                setIsSubmitting(true)
              let _row = {
          "productId":productId.value,
          "quantity":parseFloat(quantity),
          "unitId":unitId,
          "wareHouseId": warehouseId.value,
          "company_id": companyId,
          "created_by":localStorage.getItem('user')
              };
            
              axios.post(`${config.APP_CONFIG}/production/product/api`, _row,{ headers:{Authorization: userSessionContext.token} })
                .then((res) => {
                  if (
                    res.data.status_code === undefined ||
                    res.data.status_code === null ||
                    res.data.status_code === ""
                  ) {
                    return <Spinner />;
                  }
                  if (res.data.status_code === 200) {
        


                     toast.success(res.data.msg)
                    
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
                }
            }}
      
           
           
       />
 
          
           <Controls.Button
          //type="submit"
          text="Print"
          startIcon={<PrintIcon />}
          onClick={(e) => {
           e.preventDefault();
           setIsNewPopup(!isNewPopup)
          }}

    /> 
    </div> :null}
            </div>
          </div>
          </div>
    
   
  )
}

export default Productionform