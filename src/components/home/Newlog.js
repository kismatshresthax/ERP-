
// // import React from "react";
// // import { makeStyles } from "@material-ui/core/styles";
// // import Box from "@material-ui/core/Box";
// // import Collapse from "@material-ui/core/Collapse";
// // import IconButton from "@material-ui/core/IconButton";
// // import Table from "@material-ui/core/Table";
// // import TableBody from "@material-ui/core/TableBody";
// // import TableCell from "@material-ui/core/TableCell";
// // import TableContainer from "@material-ui/core/TableContainer";
// // import TableHead from "@material-ui/core/TableHead";
// // import TableRow from "@material-ui/core/TableRow";
// // import Paper from "@material-ui/core/Paper";
// // import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
// // import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";


// // const useRowStyles = makeStyles({
// //   root: {
// //     "& > *": {
// //       borderBottom: "unset"
// //     }
// //   }
// // });

// // // function createData(name: string) {
// // //   return {
// // //     name,
// // //     children: [
// // //       {
// // //         key: 21,
// // //         name: "current Assets",
       
// // //       },
// // //       {
// // //         key: 21,
// // //         name: "Non current Assets",
      
// // //       }
// // //     ]
// // //   };
// // // }


// // const assetschilds=[
   
// //               {
// //                 key: 21,
// //                 name: "current Assets",
               
// //               },
// //               {
// //                 key: 21,
// //                 name: "Non current Assets",
              
// //               }
// // ]

// // const CollapsedRow = ({ childrenRow, row }) => {
// //   const [openFunction, setOpenFunction] = React.useState(false);

// //   return (
// //     <React.Fragment>
// //       <TableRow key={childrenRow.name}>
// //         <TableCell style={{ width: "62px" }}>
// //           <IconButton
// //             aria-label="expand row"
// //             size="small"
// //             onClick={() => setOpenFunction(!openFunction)}
// //           >
// //             {openFunction ? (
// //               <KeyboardArrowUpIcon />
// //             ) : (
// //               <KeyboardArrowDownIcon />
// //             )}
// //           </IconButton>
// //         </TableCell>
// //         <TableCell component="th" scope="row">
// //           {childrenRow.name}
// //         </TableCell>
// //       </TableRow>
// //       <TableRow>
// //         <TableCell
// //           style={{ paddingBottom: 0, paddingTop: 0 }}
// //           colSpan={6}
// //         >
// //           <Collapse
// //             in={openFunction}
// //             timeout="auto"
// //             unmountOnExit
// //           >
// //             <Box margin={1}>
// //               <Table size="small" aria-label="purchases">
// //                 <TableHead>
// //                   <TableRow>
// //                     <TableCell></TableCell>
// //                     <TableCell>User</TableCell>
// //                     <TableCell>User</TableCell>
// //                     <TableCell>User</TableCell>
// //                     <TableCell>User</TableCell>
// //                   </TableRow>
// //                 </TableHead>
// //                 <TableBody>
// //                   {row.children.map((childrenRow) => (
// //                     <TableRow key={childrenRow.name}>
// //                       <TableCell component="th" scope="row">
// //                         {childrenRow.name}
// //                       </TableCell>
// //                       <TableCell>{childrenRow.user}</TableCell>
// //                       <TableCell>{childrenRow.user}</TableCell>
// //                       <TableCell>{childrenRow.user}</TableCell>
// //                       <TableCell>{childrenRow.user}</TableCell>
// //                     </TableRow>
// //                   ))}
// //                 </TableBody>
// //               </Table>
// //             </Box>
// //           </Collapse>
// //         </TableCell>
// //       </TableRow>
// //     </React.Fragment>
// //   );
// // };

// // function Row(props: { row: ReturnType<typeof createData> }) {
// //   const { row } = props;
// //   const [openModule, setOpenModule] = React.useState(false);
// //   const [openFunction, setOpenFunction] = React.useState(false);
// //   // const [open, setOpen] = React.useState(false);
// //   const classes = useRowStyles();

// //   // console.log("row", row);
// //   // for (const key in row) {
// //   //   if (Object.prototype.hasOwnProperty.call(row, key)) {
// //   //     const element = row[key];
// //   //     console.log("element", element);
// //   //   }
// //   // }
// //   return (
// //     <React.Fragment>
// //       <TableRow className={classes.root} style={{ background: "#3f51b5" }}>
// //         <TableCell style={{ width: "62px" }}>
// //           <IconButton
// //             aria-label="expand row"
// //             size="small"
// //             onClick={() => setOpenModule(!openModule)}
// //             style={{ color: "white" }}
// //           >
// //             {openModule ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
// //           </IconButton>
// //         </TableCell>
// //         <TableCell style={{ color: "white" }}>{row.name}</TableCell>
// //       </TableRow>
// //       <TableRow>
// //         <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
// //           <Collapse in={openModule} timeout="auto" unmountOnExit>
// //             <Box margin={1}>
// //               <Table size="small" aria-label="purchases">
// //                 <TableBody>
// //                   {row.children.map((childrenRow) => (
// //                     <CollapsedRow
// //                       row={row}
// //                       childrenRow={childrenRow}
// //                     />
// //                   ))}
// //                 </TableBody>
// //               </Table>
// //             </Box>
// //           </Collapse>
// //         </TableCell>
// //       </TableRow>
// //     </React.Fragment>
// //   );
// // }

// // const rows = [
// //   // createData({ moduleName :String,  functionName :String,  featureName :String, userTypeList:Array}),
// //   createData("Assets"),
// //   createData("Liability"),
 
// // ];

// // export default function  Newlog() {
// //   return (
// //     <TableContainer component={Paper}>
// //       <Table aria-label="collapsible table">
// //         <TableHead></TableHead>
// //         <TableBody>
// //           {rows.map((row) => (
// //             <Row key={row.name} row={row} />
// //           ))}
// //         </TableBody>
// //       </Table>
// //     </TableContainer>
// //   );
// // }

// import React, { useState, useEffect } from "react";
// import { useHistory, Link, useParams } from "react-router-dom";

// import CloseIcon from "@material-ui/icons/Close";

// import Spinner from "../../utils/spinner";

// // Material UI
// import { Grid } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";

// import config from "../../utils/config";

// import { useForm, Form } from "../../components/home/useForm";
// import UseTable from "../../components/home/UseTable";
// import { Search } from "@material-ui/icons";
// import {

//   TableBody,
//   TableRow,
//   TableCell,
//   Toolbar,
//   InputAdornment,
//   Tooltip,
// } from "@material-ui/core";
// import Controls from "../../components/controls/Controls";
// const useStyles = makeStyles((theme) => ({
//     pageContent: {
//       margin: theme.spacing(5),
//       padding: theme.spacing(3),
//     },
//     newButton: {
//       position: "absolute",
//       margin: 0,
//       zIndex: 4,
//       right: 0,
//       top: "15px",
//     },
//   }));


//   const data=[

//     {
//         "id": 1,
//         "name": "Plastic Wrap",
//         "price": 431,
//         "quantity": 3,
//         "image": "http://dummyimage.com/143x100.png/cc0000/ffffff"
//       }, {
//         "id": 2,
//         "name": "Shrimp, Dried, Small / Lb",
//         "price": 467,
//         "quantity": 4,
//         "image": "http://dummyimage.com/111x100.png/ff4444/ffffff"
//       }, {
//         "id": 3,
//         "name": "Sauerkraut",
//         "price": 488,
//         "quantity": 3,
//         "image": "http://dummyimage.com/113x100.png/dddddd/000000"
//       }, {
//         "id": 4,
//         "name": "Horseradish Root",
//         "price": 391,
//         "quantity": 1,
//         "image": "http://dummyimage.com/160x100.png/dddddd/000000"
//       }, {
//         "id": 5,
//         "name": "Wine - Zinfandel California 2002",
//         "price": 226,
//         "quantity": 5,
//         "image": "http://dummyimage.com/125x100.png/5fa2dd/ffffff"
//       }, {
//         "id": 6,
//         "name": "Seaweed Green Sheets",
//         "price": 457,
//         "quantity": 1,
//         "image": "http://dummyimage.com/102x100.png/5fa2dd/ffffff"
//       }, {
//         "id": 7,
//         "name": "Pasta - Shells, Medium, Dry",
//         "price": 485,
//         "quantity": 4,
//         "image": "http://dummyimage.com/152x100.png/cc0000/ffffff"
//       }, {
//         "id": 8,
//         "name": "Curry Powder",
//         "price": 356,
//         "quantity": 4,
//         "image": "http://dummyimage.com/191x100.png/cc0000/ffffff"
//       }, {
//         "id": 9,
//         "name": "Wine - Magnotta - Pinot Gris Sr",
//         "price": 368,
//         "quantity": 2,
//         "image": "http://dummyimage.com/160x100.png/cc0000/ffffff"
//       }, {
//         "id": 10,
//         "name": "Wine - Clavet Saint Emilion",
//         "price": 355,
//         "quantity": 2,
//         "image": "http://dummyimage.com/224x100.png/cc0000/ffffff"
//       }, {
//         "id": 11,
//         "name": "Kellogs Special K Cereal",
//         "price": 445,
//         "quantity": 1,
//         "image": "http://dummyimage.com/164x100.png/ff4444/ffffff"
//       }, {
//         "id": 12,
//         "name": "Bread - White Epi Baguette",
//         "price": 322,
//         "quantity": 3,
//         "image": "http://dummyimage.com/210x100.png/cc0000/ffffff"
//       }, {
//         "id": 13,
//         "name": "Pork - Back, Long Cut, Boneless",
//         "price": 436,
//         "quantity": 3,
//         "image": "http://dummyimage.com/138x100.png/cc0000/ffffff"
//       }, {
//         "id": 14,
//         "name": "Vinegar - Red Wine",
//         "price": 466,
//         "quantity": 4,
//         "image": "http://dummyimage.com/107x100.png/dddddd/000000"
//       }, {
//         "id": 15,
//         "name": "Soup - Campbellschix Stew",
//         "price": 490,
//         "quantity": 3,
//         "image": "http://dummyimage.com/156x100.png/5fa2dd/ffffff"
//       }, {
//         "id": 16,
//         "name": "Muskox - French Rack",
//         "price": 461,
//         "quantity": 5,
//         "image": "http://dummyimage.com/128x100.png/cc0000/ffffff"
//       }, {
//         "id": 17,
//         "name": "Salad Dressing",
//         "price": 401,
//         "quantity": 2,
//         "image": "http://dummyimage.com/239x100.png/cc0000/ffffff"
//       }, {
//         "id": 18,
//         "name": "Juice - V8, Tomato",
//         "price": 234,
//         "quantity": 1,
//         "image": "http://dummyimage.com/145x100.png/5fa2dd/ffffff"
//       }, {
//         "id": 19,
//         "name": "Ham - Smoked, Bone - In",
//         "price": 425,
//         "quantity": 4,
//         "image": "http://dummyimage.com/221x100.png/cc0000/ffffff"
//       }, {
//         "id": 20,
//         "name": "Whmis - Spray Bottle Trigger",
//         "price": 274,
//         "quantity": 2,
//         "image": "http://dummyimage.com/214x100.png/dddddd/000000"
//       }];



  
// function Newlog(props) {
//     const classes = useStyles(props);
//     const [records, setRecords] = useState();
//     const [cart, setCart] = useState([]);
//     const [filterFn, setFilterFn] = useState({
//         fn: (items) => {
//           return items;
//         },
//       });
    
//       const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =UseTable(records ,filterFn);
    
//       const handleSearch = (e) => {
//         let query = e.target.value;
    
//         setFilterFn({
//           fn: (items) => {
//             if (query === "") return items;
//             else
//               return items.filter(
//                 (x) =>
//                   (x.accountNumber + x.bankName + x.companyName)
//                     .toLowerCase()
//                     .includes(query.toLowerCase())
               
//               );
//           },
//         });
//       };
//       const addToCart = (product) => {
//         setCart([...cart, product]);
//       };
//       const removeFromCart = (productToRemove) => {
//         setCart(cart.filter(product => product !== productToRemove))
//     }

//       const renderCart = () => (
//         <>
//         <h1>Cart</h1>
//            <div className="products">
//            {cart.map((product , index) => (
//            <div className="product" key={index}>
//               <h3>{product.name}</h3>
//               <h4>{product.cost}</h4>
//               <img src={product.image} alt={product.name}/>
//               <button onClick={() => removeFromCart(product)}>
//                   Remove
//                </button>
//            </div>
               
//                ))}
//         </div>
//         </>
//     )
//   return (
//     <div>
//     <div style={{textAlign:'center'}}><h3>POS Terminal</h3></div>

//     <div className="productDetails_">
//         <fieldset className="product--details">
//           <legend>Product Details</legend>
//           <Toolbar>
//         <Controls.Input
//           label="Search"
//           className={classes.searchInput}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <Search />
//               </InputAdornment>
//             ),
//           }}
//           onChange={handleSearch}
//         />
//       </Toolbar>
//       <ul>
//       {data.map((product) => (
//         <li key={product.id}>
//           <img src={product.image} alt={product.name} onClick={() => addToCart(product)} />
//           {/* <button onClick={() => addToCart(product)}>
//                    Add to Cart
//                 </button> */}
//           <div>
//             <h3>{product.name}</h3>
//             <p>${product.price}</p>
//           </div>
//         </li>
//       ))}
//     </ul>
//         </fieldset>
//       </div>
//       <div className="productcart">
//         <fieldset className="productcart">
//           <legend>Cart</legend>
//           {cart.map((product , index) => (
//                <div className="product" key={index}>
//                   <h3>{product.name}</h3>
//                   <h4>{product.cost}</h4>
//                   <img src={product.image} alt={product.name}/>
//                   <button onClick={() => removeFromCart(product)}>
//                       Remove
//                    </button>
//                </div>
// ))}
//           </fieldset>
//       </div>
//       </div>
//   )
// }

// export default Newlog