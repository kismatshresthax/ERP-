// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import config from "../../../utils/config";
// import UseTable from "../../home/UseTable";
// import Popup from "../../home/Popup";

// import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

// import { Search } from "@material-ui/icons";
// import {
 
//   makeStyles,
//   TableBody,
//   TableRow,
//   Toolbar,
//   TableCell,
//   InputAdornment,
// } from "@material-ui/core";
// import Controls from "../../controls/Controls";

// import AddIcon from "@material-ui/icons/Add";
// import UserSessionContext from "../../../contexts/UserSessionContext";
// import { toast } from "react-toastify";
// import Spinner from "../../../utils/spinner";
// import PageHeaderTitle from "../../../utils/PageHeaderTitle";
// import UserAuthenticationContext from "../../../contexts/UserAuthenticationContext";
// import ProductEditStepper from "../../purchases/product//ProductEditStepper";
// import ProductStepper from "../../purchases/product/ProductStepper";

// const useStyles = makeStyles((theme) => ({
//   pageContent: {
//     margin: theme.spacing(5),
//     padding: theme.spacing(3),
//   },
//   newButton: {
//     position: "absolute",
//     zIndex: 4,
//     right: "10px",
//   },
// }));
// const headCells = [
//   { id: "categoryName", label: "Category Name" },
//   { id: "name", label: "Product Name" },
//   { id: "displayName", label: "Display Name" },
//   { id: "code", label: " Code" },
//   { id: "costPrice", label: "Cost Price" },
//   { id: "sellPrice", label: "Sell Price" },
//   { id: "actions", label: "Actions", disableSorting: true },
// ];

// export default function StoreProducts(props) {
//   const userSessionContext = React.useContext(UserSessionContext);
//   const classes = useStyles(props);
//   const [records, setRecords] = useState();
//   const [isNewPopup, setIsNewPopup] = useState(false);
//   const [isEditPopup, setIsEditPopup] = useState(false);
//   const [taxRates, setTaxRates] = useState();
//   const [insertId, setInsertId] = useState();
//   const [baseUnit, setBaseUnit] = useState({});
//   const [filterFn, setFilterFn] = useState({
//     fn:(items) => {
//       return items;
//     },
//   })
//   const permissionContext=React.useContext(UserAuthenticationContext);
//   let Permission = permissionContext.permissions;
//    let curr_mod_permission =Permission.filter( x=>{return x["module_name"].toLowerCase() === "inventory"})
//    let userPermission= curr_mod_permission[0]

//   const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting} = UseTable(records, headCells, filterFn);
  

//   const handleSearch = (e) => {
//     let query = e.target.value;

//     setFilterFn({
//       fn: (items) => {
//         if (query === "") return items;
//         else
//           return items.filter(
//             (x) =>
//             (x.categoryname + x.productname + x.displayName + x.code + x.costPrice + x.sellPrice)
//                 .toLowerCase()
//                 .includes(query.toLowerCase())
//             // items[x].toString().toLowerCase().includes(target.value)
//             // x.firstName.toLowerCase().includes(target.value)
//           );
//       },
//     });
//   };
  
  
//   useEffect(() => {
//     load_inventory_products();
//     loadTaxRates();
//   }, []);

//   const loadTaxRates = () => {
//     axios
//       .get(`${config.APP_CONFIG}/Account/TaxRates/api`, {
//         headers: { Authorization: userSessionContext.token },
//       })
//       .then((res) => {
//         if (res.data && res.data.status_code && res.data.status_code === 200) {
//           let taxList = res.data.msg.map((name, index) => ({
//             title: name.amount,
//             id: name.id,
//           }));
         
//           setTaxRates(taxList);
         
//         } else {
//           toast.error(res.data.msg || "Cannot load Tax Rates");
//           setTaxRates([]);
//         }
//       })
//       .catch((err) => {
//         toast.error("Failed to Load Tax Rates");
//         setTaxRates([]);
//       });
//   };
//   const load_inventory_products = async () => {
//     await axios
//       .get(`${config.APP_CONFIG}/Products/product/Api`,{
//         headers: {
        
//           Authorization: userSessionContext.token,
//         },
//       })
//       .then((res) => {
//         if (res.data.status_code === 200) {
//           setRecords(res.data.msg);
//         } else if (res.data.status_code === 401) {
//           userSessionContext.handleLogout();
//         }
//         else if (res.data.status_code === 400) {
//           toast.warn(res.data.msg);
//         } else {
//           toast.error("Error Occurred");
//           setRecords([]);
//         }
//       })
//       .catch((err) => {
//         toast.error("Something Went Wrong");
//         console.log(err);
//         setRecords([]);
//       });
//   };

//   // const add_Product_Inventory = (_data) => {
//   //   axios.post(`${config.APP_CONFIG}/Products/product/Api`, _data
//   //     ,{
//   //       headers: {
        
//   //         Authorization: userSessionContext.token,
//   //       },
//   //     }
//   //     )
//   //     .then((res) => {
//   //       if (res.data.status_code === 200) {
//   //         setInsertId(res.data.msg);
//   //         // props.step_handler("next")
//   //         load_inventory_products();
//   //         toast.success("Product Added Successfully");
//   //       } else if (res.data.status_code === 401) {
//   //         userSessionContext.handleLogout();
//   //       }
//   //       else if (res.data.status_code === 400) {
//   //         toast.warn(res.data.msg);
//   //       } else {
//   //         toast.error("Error Occurred");
//   //         // setRecords([]);
//   //       }
//   //     })
//   //     .catch((err) => {
//   //       toast.error("Something Went Wrong");
//   //     });
//   //     setIsNewPopup(false);
//   // };

//   const update_Product_Inventory = (_data) => {

//     axios
//       .put(`${config.APP_CONFIG}/Products/product/api/${_data.id}`, _data
//       ,{
//         headers: {
//           Authorization: userSessionContext.token,
//         },
//       }
//       )
//       .then((res) => {
//         if (res.data.status_code === 200) {
//           toast.success(res.data.msg)
//           load_inventory_products();
//           setIsEditPopup(false);
//         } else if (res.data.status_code === 401) {
//           userSessionContext.handleLogout();
//         } else if (res.data.status_code === 400) {
//           toast.warn(res.data.msg);
//         }else {
//           toast.error("Error Occurred");
//         }
//       })
//       .catch((err) => {
//         window.alert("here")
//         toast.error("Something Went Wrong");
//       });
//       setIsEditPopup(false)
//   };

//   const delete_Product_Inventory = (id) => {
//     axios
//       .delete(`${config.APP_CONFIG}/Products/product/api/${id}`
//       ,{
//         headers: {
//           Authorization: userSessionContext.token,
//         },
//       })
//       .then((res) => {
//         if (res.data.status_code === 200) {
//           toast.success(res.data.msg);
//           load_inventory_products();
//         } else if (res.data.status_code === 401) {
//           userSessionContext.handleLogout();
//         }
//         else if (res.data.status_code === 400) {
//           toast.warn(res.data.msg);
//         }else {
//           toast.error("Error Occurred");
//         }
//       })
//       .catch((err) => {
//         toast.error("Something Went Wrong");
//       });
//   };

//   if (records === undefined) {
//     return <Spinner />;
//   }

//   return (
//     // <div className="content-wrapper iframe-mode" data-widget="iframe" data-loading-screen={750}>
//     <div>
//       <div className="">
//         <div
//           className="content-wrapper iframe-mode"
//           data-widget="iframe"
//           data-loading-screen={750}
//         >
//           {isNewPopup ? (
//             <Popup
//               title="Add Product Form"
//               openPopup={isNewPopup}
//               setPopups={setIsNewPopup}
//             >
//               <ProductStepper
//                 insertId={insertId}
//                 setInsertId={setInsertId}
//                 load_inventory_products={(e) => {load_inventory_products(e)}}
//                 taxRates={taxRates}
              
//               />
//             </Popup>
//           ) : null}

//           {isEditPopup ? (
//             <Popup
//               title="Edit Product"
//               openPopup={isEditPopup === false ? false : true}
//               setPopups={() => {
//                 setIsEditPopup(false);
//               }}
//             >
            
//             <ProductEditStepper
//             load_inventory_products = {(e) =>{load_inventory_products(e)}}
//               handleSubmit={update_Product_Inventory}
//               setBaseUnit={setBaseUnit}
//               baseUnit = {baseUnit}
//               data={records.filter((x) => x.id === isEditPopup)[0] || null}
//               taxRates={taxRates}
//               // warehouse={warehouse}
//             />
//           </Popup>
//           ) : null}

//           <div>
//             <div>
//               <div>
              
//                 <PageHeaderTitle title="Inventory Products" />
//               </div>
//               {userPermission["u_create"]===1?
//               <div className="addButton">
//                 <Controls.Button
//                   text="Add New"
//                   variant="outlined"
//                   startIcon={<AddIcon />}
//                   className={classes.newButton}
//                   style = {{top: "20px", right: "0", margin: "0"}}
//                   onClick={() => {
//                     setIsNewPopup(!isNewPopup);
//                   }}
//                 />
//               </div>
//               :null}
//             </div>
//           </div>
//           {/* <div className="pd-15"></div> */}


//           <Toolbar>
//           <Controls.Input
//             label="Search"
//             className={classes.searchInput}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <Search />
//                 </InputAdornment>
//               ),
//             }}
//             onChange={handleSearch}
//           />
//         </Toolbar>


//           <div className="row inventoryProducts">
//             <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
//               <TblContainer>
//                 <TblHead />
//                 <TableBody>
//                   {recordsAfterPagingAndSorting().map((item) => {
                  
//                   return <TableRow key={item.id}>
//                       <TableCell>{item.categoryname}</TableCell>
//                       <TableCell>{item.productname}</TableCell>
//                       <TableCell>{item.displayName}</TableCell>
//                       <TableCell>{item.code}</TableCell>
//                       <TableCell>{item.costPrice}</TableCell>
//                       <TableCell>{item.sellPrice}</TableCell>
//                       <TableCell>{userPermission["u_write"]===1?
//                         <Controls.ActionButton
//                           color="primary"
//                           onClick={(e) => {
//                             setIsEditPopup(item.id);
//                           }}
//                         >
//                           <EditOutlinedIcon fontSize="small" />
//                         </Controls.ActionButton>
//                         :null}
                  
//                       </TableCell>
//                     </TableRow>
// })}
//                 </TableBody>
//               </TblContainer>
//               {records.length!==0?
//               <TblPagination />
//               :null}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     // </div>
//   );
// }
