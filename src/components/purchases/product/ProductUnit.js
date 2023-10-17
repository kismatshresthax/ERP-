// import React, { useState, useEffect } from "react";
// // import "./styles.css"
// import { Link } from "react-router-dom";
// import config from "../../../utils/config";
// import axios from "axios";
// import { toast } from "react-toastify";
// // Material UI
// import { makeStyles } from "@material-ui/core/styles";
// import Grid from "@material-ui/core/Grid";
// import Card from "@material-ui/core/Card";
// import CardHeader from "@material-ui/core/CardHeader";
// import Divider from "@material-ui/core/Divider";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
// import Paper from "@material-ui/core/Paper";
// import TableContainer from "@material-ui/core/TableContainer";
// import UserSessionContext from "../../../contexts/UserSessionContext";
// import Controls from "../../controls/Controls";
// import DeleteIcon from "@material-ui/icons/Delete";
// import AddIcon from "@mui/icons-material/Add";
// const useStyles = makeStyles((theme) => ({
//   header: {
//     backgroundColor: "white",
//     color: "#546e7a",
//     justifyContent: "left",
//     padding: "10px 5px",
//     fontWeight: "bold",
//   },
//   content: {
//     padding: 0,
//   },
//   status: {
//     marginRight: "5px",
//   },
//   actions: {
//     justifyContent: "flex-end",
//   },
//   summaryTable: {
//     width: "auto",
//     marginBottom: "10px",
//     pointerEvents: "none",
//   },
//   noBorder: {
//     border: "none",
//   },
//   denseCell: {
//     padding: "5px",
//   },
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120,
//   },
//   inputGroup: {
//     marginBottom: theme.spacing(1),
//   },
//   equal: {
//     fontWeight: "bold",
//     fontsize: "9rem",
//   },
// }));

// const ConverterRow = (props) => {
//   const userSessionContext = React.useContext(UserSessionContext);
//   const classes = useStyles();
//   //const[unit,setunit]=useState("")
//   const [unitName1, setunitName1] = useState("");
//   const [ratio, setratio] = useState("");
//   // const [productId, setproductId] = useState(props.product_id);
//   const [baseunit, setbaseunit] = useState("");
//   const [selectedUnit, setSelectedUnit] = useState("");
//   const handleChange = (event) => {
//     setSelectedUnit(event.target.value);
//   };
//   return (
//     <TableRow className={classes.inputGroup} hover>
//       <TableCell>
//         <span>1</span>
//       </TableCell>
//       <TableCell>
//         <input
//           id="unitName"
//           list="listOfUnits"
//           onChange={handleChange}
//           value={selectedUnit.split("___")[1]}
//         ></input>
//         <datalist id="listOfUnits">
//           {props.unitList && props.unitList.length > 0 ? (
//             props.unitList.map((u, idx) => {
//               return (
//                 <option key={idx} value={u.value + " : " + u.label}>
//                   {u.label}
//                 </option>
//               );
//             })
//           ) : (
//             <div>Data loading in progress...</div>
//           )}
//         </datalist>
//       </TableCell>
//       <TableCell className={classes.equal}>
//         <p>=</p>
//       </TableCell>
//       <TableCell>
//         <input
//           onChange={(e) => {
//             setratio(e.target.value);
//           }}
//           type="number"
//           value={ratio}
//         />
//       </TableCell>
//       <TableCell>
//         <span> {props.basename} </span>
//       </TableCell>
//       <TableCell>
//         <Controls.ActionButton
//           size="small"
//           variant="contained"
//           color="primary"
//           onClick={(e) => {
//             let req_value = {
//               productId: props.productId,
//               unitName: selectedUnit.split(" : ")[1],
//               unitId: parseInt(selectedUnit.split(" : ")[0]),
//               baseUnit: 0,
//               ratio: parseFloat(ratio),
//             };

//             props.addRow(req_value);
//             setSelectedUnit("");
//             setratio("");
//           }}
//         >
//           <AddIcon style={{ fontSize: "15px" }} />
//         </Controls.ActionButton>
//       </TableCell>
//     </TableRow>
//   );
// };

// export default function ProductUnit(props) {
//   const userSessionContext = React.useContext(UserSessionContext);
//   let product_id = props.product_id;
//   const classes = useStyles();
//   //const [unitOptions, setunitOptions] = useState([])
//   const [data, setData] = useState([]);
//   const [basename, setBaseName] = useState();
//   const [isBasenameconfirmed, setBasenameconfirmed] = useState(false);
//   const [unitList, setunitList] = useState([]);
//   useEffect(() => {
//     loadunitList();
//   }, []);
//   const loadunitList = () => {
//     axios
//       .get(`${config.APP_CONFIG}/Products/ProductInhouseUnit/api`, {
//         headers: { Authorization: userSessionContext.token },
//       })
//       .then((res) => {
//         if (res.data.status_code === 200) {
//           let temp = res.data.msg.map((x) => {
//             return { label: x.name, value: x.id };
//           });
//           setunitList(temp);
//         } else if (res.data.status_code === 401) {
//           userSessionContext.handleLogout();
//         } else if (res.data.status_code === 400) {
//           toast.warn(res.data.msg);
//         } else {
//           toast.error("Cannot load bases name.");
//           setunitList([]);
//         }
//       })
//       .catch((err) => {
//         toast.error("failed to load data");
//         setunitList([]);
//       });
//   };

//   const update_row = (req_value) => {
//     axios
//       .post(`${config.APP_CONFIG}/product/ProductUnit/api`, req_value, {
//         headers: { Authorization: userSessionContext.token },
//       })
//       .then((res) => {
//         if (res.data.status_code === 200) {
//           toast.success(res.data.msg || "Enter Successfully.");
//           setData([...data, req_value]);
//         } else if (res.data.status_code === 400) {
//           toast.warn(res.data.msg);
//         } else if (res.data.status_code === 401) {
//           userSessionContext.handleLogout();
//         } else {
//           toast.error(res.data.msg || "Cannot insert unit.");
//         }
//       })
//       .catch((err) => {
//         toast.error("Failed to insert unit!");
//         // setBaseName([]);
//       });
//   };

//   if (isBasenameconfirmed === false) {
//     return (
//       <div className="form-group">
//         <label>Base Unit:</label>
//         <input
//           type="text"
//           value={basename}
//           onChange={(e) => {
//             setBaseName(e.target.value);
//           }}
//         />

//         <input
//           type="button"
//           onClick={(e) => {
//             let req_data = {
//               productId: props.insertId,
//               unitName: basename,
//               baseUnit: 1,
//               ratio: 1,
//               unitId: 0,
//             };
         
//             update_row(req_data);
//             setBasenameconfirmed(true);
//             // post code
//           }}
//           value={"SAVE"}
//         ></input>
//       </div>
//     );
//   }

//   return (
//     <div
//       className="content-wrapper iframe-mode"
//       data-widget="iframe"
//       data-loading-screen={750}
//     >
//       <Grid container direction="row">
//         <Grid item lg={12} md={12} xs={12}>
//           <Card>
//             <CardHeader
//               className={classes.header}
//               title={"BaseConverter"}
//               classes={{
//                 title: classes.header,
//               }}
//             />

//             <Divider />
//             <Grid container>
//               <Grid item md={6}>
//                 <span>Base Unit : {basename}</span>
//               </Grid>
//             </Grid>

//             <Paper>
//               <TableContainer>
//                 <Table stickyHeader>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>Quantity</TableCell>
//                       <TableCell>UnitName</TableCell>
//                       <TableCell>Equal</TableCell>
//                       <TableCell>Quantity</TableCell>
//                       <TableCell>UnitName</TableCell>
//                       <TableCell>Actions</TableCell>
//                     </TableRow>
//                   </TableHead>

//                   <TableBody>
//                     {data &&
//                       data.map((row, idx) => {
//                         return (
//                           <TableRow key={idx}>
//                             <TableCell>{1}</TableCell>

//                             <TableCell>{row.unitName}</TableCell>
//                             <TableCell className={classes.equal}>
//                               <p>=</p>
//                             </TableCell>
//                             <TableCell>{row.ratio}</TableCell>
//                             <TableCell>{basename}</TableCell>
//                             <TableCell>
//                               <Controls.ActionButton
//                                 size="small"
//                                 variant="contained"
//                                 color="danger"
//                                 onClick={(e) => {
//                                   let _data = data.filter((item) => {
//                                     return item.id !== row.id;
//                                   });
//                                   setData(_data);
//                                 }}
//                               >
//                                 <DeleteIcon style={{ fontSize: "15px" }} />
//                               </Controls.ActionButton>
//                             </TableCell>
//                             <TableCell></TableCell>
//                           </TableRow>
//                         );
//                       })}

//                     <ConverterRow
//                       productId={props.insertId}
//                       addRow={(row) => {
//                         // post code
//                         update_row(row);
//                       }}
//                       basename={basename}
//                       unitList={unitList}
//                     />
//                     <Divider />
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </Paper>
//           </Card>
//         </Grid>
//       </Grid>

//       <div>
//         <Link to="" className="btn btn-danger float-right">
//           Cancel
//         </Link>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
// import "./styles.css"

import config from "../../../utils/config";
import axios from "axios";
import { toast } from "react-toastify";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";

import UserSessionContext from "../../../contexts/UserSessionContext";
import Controls from "../../controls/Controls";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from '@mui/material/Tooltip';
import AddIcon from "@mui/icons-material/Add";
import Select from "react-select";
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
    padding: "5px",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  inputGroup: {
    marginBottom: theme.spacing(1),
  },
  equal: {
    fontWeight: "bold",
    fontsize: "9rem",
  },
}));

const ConverterRow = (props) => {
  const userSessionContext = React.useContext(UserSessionContext);
  const classes = useStyles();
 

 
  const [ratio, setratio] = useState("");
   const [unitId, setUnitId] = useState();
 
  

  return (
    <tr hover>
      <td>
        <span>1</span>
      </td>
    
            <td width="200px">

        <Select 
        options={props.unitList}
        styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
        menuPortalTarget={document.body}
          value={unitId}
          onChange={setUnitId}
          
        />
     
</td>

      {/* <td>
        <input
          id="unitName"
          list="listOfUnits"
          onChange={handleChange}
          value={selectedUnit.split("___")[1]}
        ></input>
        <datalist id="listOfUnits">
          {props.unitList && props.unitList.length > 0 ? (
            props.unitList.map((u, idx) => {
              return (
                <option key={idx} value={u.value + " : " + u.label}>
                  {u.label}
                </option>
              );
            })
          ) : (
            <div>Data loading in progress...</div>
          )}
        </datalist>
      </td> */}
      <td className={classes.equal}>
        <p>=</p>
      </td>
      <td>
        <input
          onChange={(e) => {
            setratio(e.target.value);
          }}
          type="number"
          value={ratio}
        />
      </td>
      <td>
        <span> {props.basename} </span>
      </td>
      <td>
        <Controls.ActionButton
          size="small"
          variant="contained"
          color="primary"
          onClick={(e) => {
             let req_value = {
              productId: props.productId,
              unitName: unitId.label||"",
              unitId: unitId.value,
              baseUnit: 0,
              ratio: parseFloat(ratio),
            
             };
            axios.post(`${config.APP_CONFIG}/product/ProductUnit/api`, req_value, {headers: { Authorization: userSessionContext.token },
          })
          .then((res) => {
            if (res.data.status_code === 200) {
              toast.success( "Unit Added SuccessFully.");
         
              props.addRow({
                id:res.data.msg,
                productId: props.productId,
                unitName: unitId.label||"",
                unitId: unitId.value,
                baseUnit: 0,
                ratio: parseFloat(ratio),
    
              })
              setUnitId("");
              setratio("");
            
            } else if (res.data.status_code === 400) {
              toast.warn(res.data.msg);
            } else if (res.data.status_code === 401) {
              userSessionContext.handleLogout();
            } else {
              toast.error(res.data.msg || "Cannot insert unit.");
            }
          })
          .catch((err) => {
            toast.error("Failed to insert unit!");
            // setBaseName([]);
          });

            // props.addRow({
            //   productId: props.productId,
            //   unitName: unitId.label||"",
            //   unitId: unitId.value,
            //   baseUnit: 0,
            //   ratio: parseFloat(ratio),

            // });
            //setSelectedUnit("");
            // setUnitId("");
            // setratio("");
          }}
        ><Tooltip title="Add">
          <AddIcon style={{ fontSize: "15px" }} /></Tooltip>
        </Controls.ActionButton>
      </td>
    </tr>
  );
};

export default function ProductUnit(props) {
  const userSessionContext = React.useContext(UserSessionContext);
  let product_id = props.insertId;

  const classes = useStyles();

  const [data, setData] = useState(props.datas||[]);

  const [basename, setBaseName] = useState("");

  const [unitList, setunitList] = useState([]);
  useEffect(async () => {
    await  axios.get(`${config.APP_CONFIG}/product/ProductUnit/api/${props.insertId}`, {headers: { Authorization: userSessionContext.token } })
    .then((res) => {
      if (res.data.status_code === 200) {

        setBaseName(res.data.msg[0]["unitName"]);
        setData(res.data.msg);
      } else if (res.data.status_code === 401) {
        userSessionContext.handleLogout();
      } else if (res.data.status_code === 400) {
        toast.error("Cannot load Unit Name.");
        setData([]);
      }
    })
    .catch((err) => {
      toast.error("Failed to load Base Unit");
      //setData([]);
    });
  }, []);

  useEffect(async() => {
  await  axios.get(`${config.APP_CONFIG}/Products/ProductInhouseUnit/api`, {headers: { Authorization: userSessionContext.token }, })
    .then((res) => {
      if (res.data.status_code === 200) {
        let temp = res.data.msg.map(item => ({value: item.id, label: item.name}));
        setunitList(temp);
      } else if (res.data.status_code === 401) {
        userSessionContext.handleLogout();
       } else if (res.data.status_code === 400) {
      //   toast.warn(res.data.msg);
      // } else {
        toast.error("Cannot load Unit Name.");
        setunitList([]);
      }
    })
    .catch((err) => {
      toast.error("Failed to load data");
     // setunitList([]);
    });
  }, []);

 
  // const loadunitList = () => {
    
  // };
  
  // const update_row = (req_value) => {

  //   // addRow={
  //   //   (e) => {

  //   //       console.log(e)
  //   //       setData([
  //   //           ...data,
  //   //           e
  //   //       ]);

  //   //       console.log(data);
  //   //   }
  //   axios.post(`${config.APP_CONFIG}/product/ProductUnit/api`, req_value, {headers: { Authorization: userSessionContext.token },
  //     })
  //     .then((res) => {
  //       if (res.data.status_code === 200) {
  //         toast.success(res.data.msg || "Enter Successfully.");
  //         const _temp={
  //           id:res.data.msg,
  //           productId: props.productId,
  //           unitName: unitId.label||"",
  //           unitId: unitId.value,
  //           baseUnit: 0,
  //           ratio: parseFloat(ratio),

  //         }

  //         setData([...data, req_value]);
  //       } else if (res.data.status_code === 400) {
  //         toast.warn(res.data.msg);
  //       } else if (res.data.status_code === 401) {
  //         userSessionContext.handleLogout();
  //       } else {
  //         toast.error(res.data.msg || "Cannot insert unit.");
  //       }
  //     })
  //     .catch((err) => {
  //       toast.error("Failed to insert unit!");
  //       // setBaseName([]);
  //     });
  // };

  // if (isBasenameconfirmed === false) {
  //   return (
  //     <div className="form-group">
  //       <label>Base Unit:</label>
  //       <input
  //         type="text"
  //         value={basename}
  //         onChange={(e) => {
  //           setBaseName(e.target.value);
  //         }}
  //       />

  //       <input
  //         type="button"
  //         onClick={(e) => {
  //           let req_data = {
  //             productId: props.insertId,
  //             unitName: basename,
  //             baseUnit: 1,
  //             ratio: 1,
  //             unitId: 0,
  //           };
         
  //           update_row(req_data);
  //           setBasenameconfirmed(true);
  //           // post code
  //         }}
  //         value={"SAVE"}
  //       ></input>
  //     </div>
  //   );
  

  return (
    <div
      className="content-wrapper iframe-mode"
      data-widget="iframe"
      data-loading-screen={750}
    >
      <Grid container direction="row">
        <Grid item lg={12} md={12} xs={12}>
          <Card>
            <CardHeader
              className={classes.header}
              title={"Add Unit Conversion Rate"}
              classes={{
                title: classes.header,
              }}
            />

            <Divider />
            <Grid container>
              <Grid item md={6}>
                <span>Base Unit : {basename}</span>
              </Grid>
            </Grid>
            </Card>
        </Grid>
      </Grid>
          
            <table className="table table-fluid">


<tr>
                      <th>Quantity</th>
                      <th>UnitName</th>
                      <th>Equal</th>
                      <th>Quantity</th>
                      <th>UnitName</th>
                      <th>Actions</th>
                </tr>

          
                    {data &&
                      data.map((row, idx) => {
                   
                        return (
                          <tr key={row.id}>
                            <td>{1}</td>

                            <td>{row.unitName}</td>
                            <td className={classes.equal}>
                              <p>=</p>
                            </td>
                            <td>{row.ratio}</td>
                            <td>{basename}</td>
                       
                            <td>
                            {row.baseUnit===1?null:
                              <Controls.ActionButton
                                size="small"
                                variant="contained"
                                color="danger"
                                onClick={(e) => {
                                
                                    axios
                                      .delete(
                                        `${config.APP_CONFIG}/product/ProductUnit/api/${row.id}`,
                                        {
                                          headers: {
                                            Authorization: userSessionContext.token,
                                          },
                                        }
                                      )
                                      .then((res) => {
                                        if (
                                          res.data &&
                                          res.data.status_code &&
                                          res.data.status_code === 200
                                        ) {
                                          let _data = data.filter(item=> {return item !== row});
                                          // setData(_data)
                                          setData(_data);
                                          toast.info(res.data.msg);
                                        } else if (res.data.status_code === 400) {
                                          toast.error(res.data.msg.toString());
                                        }
                                      })
                                      .catch((err) => {
                                        toast.error("failed to Delete UnitName");
                                        setData([]);
                                      });
                                  }}
                                ><Tooltip title="Delete">

                                  {/* let _data = data.filter((item) => {
                                    return item.id !== row.id;
                                  });
                                  setData(_data);
                                }}
                              > */}
                                <DeleteIcon style={{ fontSize: "15px" }} /></Tooltip>
                              </Controls.ActionButton>
                      }
                            </td>
                           
                          </tr>
                        );
                      })}

                    <ConverterRow
                      productId={props.insertId}
                      // addRow={(row) => {
                      //   // post code
                      //   update_row(row);
                      // }}
                      addRow={(e) => {
                        setData([...data, e]);
                      }}
                      basename={basename}
                      unitList={unitList}
                    />
                
             
                </table>
          
      

     
    </div>
  );
}
