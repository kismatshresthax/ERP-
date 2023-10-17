// // import React,{useState,useEffect} from "react";
// // import "./styles.css"
// // import { Link} from "react-router-dom";
// // import config from './config';

// // import AdapterDateFns from '@mui/lab/AdapterDateFns';
// // import LocalizationProvider from '@mui/lab/LocalizationProvider';
// // import DateTimePicker from '@mui/lab/DateTimePicker';
// // import axios from "axios";
// // import Select from 'react-select';
// // import Alert from '@material-ui/lab/Alert';
// // import Spinner from "./spinner";
// // import { toast } from "react-toastify";
// // // Material UI
// // import { makeStyles } from "@material-ui/core/styles";
// // import Grid from "@material-ui/core/Grid";
// // import Card from "@material-ui/core/Card";
// // import Box from "@material-ui/core/Box";
// // import CardHeader from "@material-ui/core/CardHeader";
// // import Divider from "@material-ui/core/Divider";

// // import Table from "@material-ui/core/Table";
// // import TableBody from "@material-ui/core/TableBody";
// // import TableCell from "@material-ui/core/TableCell";
// // import TableHead from "@material-ui/core/TableHead";
// // import TableRow from "@material-ui/core/TableRow";
// // import Paper from "@material-ui/core/Paper";
// // import TableContainer from "@material-ui/core/TableContainer";
// // import Button from "@material-ui/core/Button";

// // //import Select from "@material-ui/core/Select";
// // import MenuItem from "@material-ui/core/MenuItem";
// // import InputLabel from "@material-ui/core/InputLabel";
// // import FormControl from "@material-ui/core/FormControl";
// // import TextField from "@material-ui/core/TextField";
// // import Autocomplete from "@material-ui/lab/Autocomplete";
// // import FormHelperText from "@material-ui/core/FormHelperText";
// // //import UserSessionContext from "../../contexts/UserSessionContext";

// // import Controls from '../components/controls/Controls';
// // import {useForm,Form} from '../components/home/useForm';
// // import CloseIcon from "@material-ui/icons/Close";
// // import DeleteIcon from "@material-ui/icons/Delete"

// // // const useStyles = makeStyles((theme) => ({
// // //     header: {
// // //       backgroundColor: "white",
// // //       color: "#546e7a",
// // //       justifyContent: "left",
// // //       padding: "10px 5px",
// // //       fontWeight: "bold"
// // //     },
// // //     content: {
// // //       padding: 0
// // //     },
// // //     status: {
// // //       marginRight: "5px"
// // //     },
// // //     actions: {
// // //       justifyContent: "flex-end"
// // //     },
// // //     summaryTable: {
// // //       width: "auto",
// // //       marginBottom: "10px",
// // //       pointerEvents: "none"
// // //     },
// // //     noBorder: {
// // //       border: "none"
// // //     },
// // //     denseCell: {
// // //       padding: "5px"
// // //     },
// // //     formControl: {
// // //       margin: theme.spacing(1),
// // //       minWidth: 120
// // //     },
// // //     inputGroup:{
// // //       marginBottom:theme.spacing(1),
// // //     },
// // //     equal:{

// // //       fontWeight: "bold",
// // //     fontsize: "9rem"
// // //     }
// // //   }));

// // // const ConverterRow = props =>{
// // //   const classes = useStyles();
// // //   const [unitOptions1, setunitOptions1] = useState([])
// // //   const [unitOptions2, setunitOptions2] = useState([props.basename])
// // //   const [number1 , setNumber1] = useState(1)
// // //   const [number2 , setratio] = useState("")
// // //   console.log(props.basename1)

// // //   const addRow = ()=>{
// // //     let _row =  {

// // //       number1: "",
// // //       unitName1: "",
// // //       number2: "",
// // //       unitName2:""
// // //       }
// // //     props.setData(_row)
// // //   }

// // //   const Deleterow =(i)=>{
// // //    // props.setData (.filter(item => item.id !== id))
// // //   //  if(i===undefined){
// // //   //  props.setData([])
// // //   //  }
// // //   //  else{
// // //   //    const values=...data)
// // //   //  }
// // //   }

// // // // (<TableRow></TableRow>

// // //     //   value={unitOptions1}
// // //     //   onChange={e=>{
// // //     //     setNumber2(e.target.value)
// // //     //   style={{margin:"10px"}}

// // //     //     <input type="number"
// // //     //     className="input"
// // //     //     style={{margin:"30px"}}
// // //     //     value={number2}
// // //     //     onChange={onChangeunit}
// // //     //     />

// // //     //     <input type="text"
// // //     //      className="input"
// // //     //      value={unitOptions2}
// // //     //       onChange={onChangeunit2}
// // //     //       />

// // // return <TableRow className={classes.inputGroup}  hover>
// // // <TableCell>
// // // <input
// // // readonly
// // //  type="number"
// // //  value={number1}
// // // //  onChange={e=>{
// // // //   setNumber1(e.target.value)
// // // //  }}
// // //    />
// // // </TableCell>
// // //  <TableCell>
// // //   <input
// // //           type="text"
// // //           value={props.basename1.title}
// // //         // onChange={e=>{
// // //         //   setunitOptions1(e.target.value)
// // //         // }}
// // //       />
// // //   </TableCell>
// // //   <TableCell className={classes.equal}><p>=</p></TableCell>
// // //   <TableCell>
// // //       <input
// // //         onChange={e=>{
// // //           setNumber2(e.target.value)
// // //          }}
// // //         type="number"
// // //         value={number2}
// // //       />
// // //       </TableCell>
// // //        <TableCell>
// // //          <input
// // //          readonly
// // //           type="text"
// // //           value={props.basename1.title}

// // //       />
// // //        </TableCell>

// // //         {/* <TableCell>
// // //          <Button variant="contained" color="secondary"
// // //        onclick={DeleteRow}
// // //        > Remove
// // //        </Button>
// // //        </TableCell> */}

// // //             <TableCell>
// // //         <Controls.ActionButton
// // //         size="small"
// // //           variant="contained"
// // //           color="secondary"
// // //            onClick={Deleterow}

// // //         >
// // //           <DeleteIcon style={{ fontSize: "15px" }}/>
// // //         </Controls.ActionButton>
// // //       </TableCell>

// // // </TableRow>
// // // }
// // // const initialValues = [
// // //   {
// // //   unitName: "",
// // //   number1: "",
// // //   number2:"",
// // //   unitName1: "",
// // //   id:"0"

// // //   }
// // // ];

// // // export default function Baseconverter() {
// // //   const classes = useStyles();
// // //      const [unitOptions, setunitOptions] = useState([])
// // //      const [data, setData] = useState([])
// // //      const [basename, setBaseName] = useState([])
// // //      const [basename1, setBaseName1] = useState([])
// // //     //  const _data = props.data || initialFValues
// // //      const {values,handleInputChange} = useForm(initialValues);
// // //   //  const [number , setNumber] = useState("")
// // //   //  const [number1 , setNumber1] = useState("")
// // //   //  const [number2 , setNumber2] = useState("")
// // //   console.log(basename1);
// // //   useEffect(() => {
// // //     loadbasename();

// // //   }, []);
// // //   const loadbasename = () => {
// // //     axios
// // //       .get(`${config.APP_CONFIG}/Products/ProductInhouseUnit/api`)
// // //       .then((res) => {
// // //         console.log(res.data.msg)
// // //         if (res.data && res.data.status_code && res.data.status_code === 200) {
// // //           let temp = res.data.msg.map((x) => {
// // //               return { title: x.name, id: x.id };});
// // //           setBaseName(temp);
// // //         } else {
// // //           toast.error("Cannot load bases name.");
// // //           setBaseName([]);
// // //         }
// // //       })
// // //       .catch((err) => {
// // //         toast.error("failed to load data");
// // //         setBaseName([]);
// // //       });
// // //   };

// // //   const addRow = (row) => {
// // //     setData([...data, row])
// // // }
// // //     return (
// // //     <div
// // //       className="content-wrapper iframe-mode"
// // //       data-widget="iframe"
// // //       data-loading-screen={750}>
// // //        <Grid container direction="row">
// // //           <Grid item lg={12} md={12} xs={12}>
// // //             <Card>
// // //               <CardHeader
// // //                 className={classes.header}
// // //                 title={"BaseConverter"}
// // //                 classes={{
// // //                   title: classes.header
// // //                 }}

// // //               />
// // // {/* <div className="container">
// // //         <div className="w-50 mx-auto shadow p-5">
// // //           <h2 className="text-center mb-4">Converter</h2> */}
// // // {/*
// // //             <div className="card-body">
// // //             <div className="form-group row ">
// // //                   <label htmlFor="text" className="col-sm-3 col-form-label">
// // //                    BaseName
// // //                   </label>
// // //                   <Select

// // //           style={{ width: "20px" }}
// // //           options={basename}
// // //           value={{
// // //             label:basename.name ,
// // //             value: basename.id,
// // //           }}
// // //           onChange={(e) => {
// // //             const res = {
// // //               id: e.value,
// // //               name: e.label,
// // //             };
// // //             console.log(res);
// // //             setBaseName(res);
// // //           }}
// // //         ></Select> */}
// // //             <Divider/>
// // //             <Grid container>
// // //             <Grid item md={6}>
// // //          <Controls.Select
// // //                         label="select your BaseName"
// // //                         // value={{
// // //                         //   title:basename.name ,
// // //                         //   value: basename.id,
// // //                         // }}
// // //                        values={values.id}
// // //                        options={basename}
// // //                         onChange={(e) => {
// // //                           console.log(e.target)
// // //                           const res = {
// // //                             id: e.id,
// // //                             name: e.name,

// // //                           };
// // //                           setBaseName1(res);
// // //                         }}
// // //                         // onchange={(e)=>{setBaseName(e.target.value)}}
// // //                         // onchange={handleInputChange;
// // //                         //   setBaseName1(values.)
// // //                         // }

// // //                         // }}

// // //                     />
// // //                     </Grid>

// // //                     </Grid>
// // //             {/* </div>
// // // </div> */}
// // //           {/* </div>
// // //           </div>     */}

// // //               {/* <Controls.Input
// // //                         name="base"
// // //                         label="Enter Your baseName"
// // //                         value={basename}
// // //                         onChange={e=>{setBaseName(e.target.value)
// // //                         }}

// // //                     /> */}
// // //       <Paper>

// // //               <TableContainer>
// // //                   <Table stickyHeader>
// // //                      <TableHead>
// // //                        <TableRow>
// // //                         <TableCell>Quantity</TableCell>
// // //                         <TableCell>UnitName</TableCell>
// // //                         <TableCell>Equal</TableCell>
// // //                             <TableCell>Quantity</TableCell>
// // //                                <TableCell>UnitName</TableCell>
// // //                                   <TableCell>Actions</TableCell>
// // //                          </TableRow>
// // //                       </TableHead>

// // //                 <TableBody>
// // //         {[...data, ...initialValues].map( (row, idx)=>{
// // //            return <ConverterRow  setData = {addRow} data = {row} key={idx} DeleteRow={idx}
// // //            basename1={basename1}/>})}

// // //         <Box>
// // //                                 <Button
// // //                                   variant="contained"
// // //                                   color="primary"
// // //                                   onClick={() =>
// // //                                     addRow({
// // //                                       number1: "",
// // //                                       unitName1: "",
// // //                                       number2 : "",
// // //                                       unitName2:""
// // //                                     })
// // //                                   }
// // //                                 >
// // //                                   Add Row
// // //                                 </Button>
// // //                               </Box>
// // //                       <Divider/>
// // //         </TableBody>
// // //          </Table>
// // //                               </TableContainer>
// // //                               </Paper>

// // //   </Card>
// // //           </Grid>
// // //         </Grid>

// // //         <div className="card-footer">
// // //       <button type="submit" className="btn btn-info"

// // //       >Submit</button>
// // //       <Link to="/accounting/chartOfAccounts" className="btn btn-danger float-right">Cancel</Link>
// // //     </div>
// // //     </div>

// // //     );
// // //   }
// // // import React,{useState,useEffect} from "react";
// // // import "./styles.css"
// // // import { Link} from "react-router-dom";
// // // import config from './config';

// // // import AdapterDateFns from '@mui/lab/AdapterDateFns';
// // // import LocalizationProvider from '@mui/lab/LocalizationProvider';
// // // import DateTimePicker from '@mui/lab/DateTimePicker';
// // // import axios from "axios";
// // // import Select from 'react-select';
// // // import Alert from '@material-ui/lab/Alert';
// // // import Spinner from "./spinner";
// // // import { toast } from "react-toastify";
// // // // Material UI
// // // import { makeStyles } from "@material-ui/core/styles";
// // // import Grid from "@material-ui/core/Grid";
// // // import Card from "@material-ui/core/Card";
// // // import Box from "@material-ui/core/Box";
// // // import CardHeader from "@material-ui/core/CardHeader";
// // // import Divider from "@material-ui/core/Divider";

// // // import Table from "@material-ui/core/Table";
// // // import TableBody from "@material-ui/core/TableBody";
// // // import TableCell from "@material-ui/core/TableCell";
// // // import TableHead from "@material-ui/core/TableHead";
// // // import TableRow from "@material-ui/core/TableRow";
// // // import Paper from "@material-ui/core/Paper";
// // // import TableContainer from "@material-ui/core/TableContainer";
// // // import Button from "@material-ui/core/Button";

// // // //import Select from "@material-ui/core/Select";
// // // import MenuItem from "@material-ui/core/MenuItem";
// // // import InputLabel from "@material-ui/core/InputLabel";
// // // import FormControl from "@material-ui/core/FormControl";
// // // import TextField from "@material-ui/core/TextField";
// // // import Autocomplete from "@material-ui/lab/Autocomplete";
// // // import FormHelperText from "@material-ui/core/FormHelperText";
// // // //import UserSessionContext from "../../contexts/UserSessionContext";

// // // import Controls from '../components/controls/Controls';
// // // import {useForm,Form} from '../components/home/useForm';
// // // import CloseIcon from "@material-ui/icons/Close";
// // // import DeleteIcon from "@material-ui/icons/Delete"

// // const useStyles = makeStyles((theme) => ({
// //     header: {
// //       backgroundColor: "white",
// //       color: "#546e7a",
// //       justifyContent: "left",
// //       padding: "10px 5px",
// //       fontWeight: "bold"
// //     },
// //     content: {
// //       padding: 0
// //     },
// //     status: {
// //       marginRight: "5px"
// //     },
// //     actions: {
// //       justifyContent: "flex-end"
// //     },
// //     summaryTable: {
// //       width: "auto",
// //       marginBottom: "10px",
// //       pointerEvents: "none"
// //     },
// //     noBorder: {
// //       border: "none"
// //     },
// //     denseCell: {
// //       padding: "5px"
// //     },
// //     formControl: {
// //       margin: theme.spacing(1),
// //       minWidth: 120
// //     },
// //     inputGroup:{
// //       marginBottom:theme.spacing(1),
// //     },
// //     equal:{

// //       fontWeight: "bold",
// //     fontsize: "9rem"
// //     }
// //   }));

// // const ConverterRow = props =>{
// //   const classes = useStyles();
// //   // const [unitOptions1, setunitOptions1] = useState([])
// //   // const [unitOptions2, setunitOptions2] = useState([])
// //   //const [number1 , setNumber1] = useState(1)
// //   const[unit,setunit]=useState("")
// //   const [number2 , setNumber2] = useState("")

// //   // console.log(props.basename1["label"])
// //   // const addRow = ()=>{
// //   //   let _row =  {

// //   //     number1: "",
// //   //     unitName1:"",
// //   //     number2: "",
// //   //     unitName2:""
// //   //     }
// //   //   props.setData(_row)
// //   // }

// //   const Deleterow =(i)=>{
// //    // props.setData (.filter(item => item.id !== id))
// //   //  if(i===undefined){
// //   //  props.setData([])
// //   //  }
// //   //  else{
// //   //    const values=...data)
// //   //setdata(values)
// //   //  }
// //   }

// // return <TableRow className={classes.inputGroup}  hover>
// // <TableCell>
// // <input
// // readonly
// //  type="number"
// //  value={1}

// //    />
// // </TableCell>
// //  <TableCell>
// //   <input
// //           type="text"
// //           value={unit}
// //           onChange={e=>{setunit(e.target.value)}}

// //       />
// //   </TableCell>
// //   <TableCell className={classes.equal}><p>=</p></TableCell>
// //   <TableCell>
// //       <input
// //         onChange={e=>{
// //           setNumber2(e.target.value)
// //          }}
// //         type="number"
// //         value={number2}
// //       />
// //       </TableCell>
// //        <TableCell>
// //          <input
// //          readonly
// //           type="text"
// //           value={props.basename}

// //       />
// //        </TableCell>

// //             <TableCell>
// //         <Controls.ActionButton
// //         size="small"
// //           variant="contained"
// //           color="secondary"
// //            onClick={Deleterow}

// //         >
// //           <DeleteIcon style={{ fontSize: "15px" }}/>
// //         </Controls.ActionButton>
// //       </TableCell>

// // </TableRow>
// // }
// // const initialValues = [
// //   {
// //   unitName: "",
// //   number1: "",
// //   number2:"",
// //   unitName1: "",
// //   id:"0"

// //   }
// // ];

// // export default function Baseconverter() {
// //   const classes = useStyles();
// //      //const [unitOptions, setunitOptions] = useState([])
// //      const [data, setData] = useState([])
// //      const [basename, setBaseName] = useState()
// //      //const [basename1, setBaseName1] = useState([])
// //     // const[unitName1,setunitName1]=useState("")
// //     //  const _data = props.data || initialFValues

// //   //  const [number , setNumber] = useState("")
// //    // const [number1 , setNumber1] = useState(1)

// //   // useEffect(() => {
// //   //   loadbasename();

// //   // }, []);

// //   // const addbasename = (_data) => {
// //   //   // let req:{
// //   //   //   "number1": number1,
// //   //   //   "unitName": unitName,
// //   //   //    "number2":number2,
// //   //   //   "unitName1": unitName1,
// //   //   // }
// //   //   axios
// //   //     .post(`${config.APP_CONFIG}/Products/ProductInhouseUnit/api`,req)
// //   //     .then((res) => {
// //   //       if (res.data && res.data.status_code && res.data.status_code === 200) {
// //   //         toast.success("enter sucessfully.");
// //   //       }
// //   //       else{
// //   //         toast.error("enter sucessfully.");
// //   //       }
// //   //     })
// //   //       .catch((err) => {
// //   //         toast.error("failed to load data");
// //   //         setBaseName([]);
// //   //       });
// //   //     }
// //   const loadbasename = () => {
// //     axios
// //       .get(`${config.APP_CONFIG}/Products/ProductInhouseUnit/api`)
// //       .then((res) => {
// //         console.log(res.data.msg)
// //         if (res.data && res.data.status_code && res.data.status_code === 200) {
// //           let temp = res.data.msg.map((x) => {
// //               return { label: x.name, value: x.id };});
// //           setBaseName(temp);
// //         } else {
// //           toast.error("Cannot load bases name.");
// //           setBaseName([]);
// //         }
// //       })
// //       .catch((err) => {
// //         toast.error("failed to load data");
// //         setBaseName([]);
// //       });
// //   };

// //   const addRow = (row) => {
// //     setData([...data, row])
// // }
// //     return (
// //     <div
// //       className="content-wrapper iframe-mode"
// //       data-widget="iframe"
// //       data-loading-screen={750}>
// //        <Grid container direction="row">
// //           <Grid item lg={12} md={12} xs={12}>
// //             <Card>
// //               <CardHeader
// //                 className={classes.header}
// //                 title={"BaseConverter"}
// //                 classes={{
// //                   title: classes.header
// //                 }}

// //               />
// // {/* <div className="container">
// //         <div className="w-50 mx-auto shadow p-5">
// //           <h2 className="text-center mb-4">Converter</h2> */}
// // {/*
// //             <div className="card-body">
// //             <div className="form-group row ">
// //                   <label htmlFor="text" className="col-sm-3 col-form-label">
// //                    BaseName
// //                   </label>
// //                   <Select

// //           style={{ width: "20px" }}
// //           options={basename}
// //           value={{
// //             label:basename.name ,
// //             value: basename.id,
// //           }}
// //           onChange={(e) => {
// //             const res = {
// //               id: e.value,
// //               name: e.label,
// //             };
// //             console.log(res);
// //             setBaseName(res);
// //           }}
// //         ></Select> */}
// //             <Divider/>
// //             <Grid container>
// //             <Grid item md={6}>

// //        <input type="text" value={basename} onChange={e=>{setBaseName(e.target.value)}}/>
// //                       {/* <Select
// //                         label="select your BaseName"
// //                          value={{
// //                           value:basename.id,
// //                            label:basename.name

// //                        }}
// //                       //  values={values.id}
// //                        options={basename}
// //                         onChange={e => {
// //                          // console.log(e.target.value)
// //                           // const res = {
// //                           //   value: e.id,
// //                           //   label: e.name,

// //                           // };
// //                            console.log(e)
// //                           // setBaseName1(res);
// //                           setBaseName1(e);
// //                           console.log(basename1)
// //                         }}
// //                         // onchange={(e)=>{setBaseName(e.target.value)}}
// //                         // onchange={handleInputChange;
// //                         //   setBaseName1(values.)
// //                         // }

// //                         // }}
// //                         ></Select> */}
// //                      {/* /> */}
// //                     </Grid>

// //                     </Grid>
// //             {/* </div>
// // </div> */}
// //           {/* </div>
// //           </div>     */}

// //       <Paper>

// //               <TableContainer>
// //                   <Table stickyHeader>
// //                      <TableHead>
// //                        <TableRow>
// //                         <TableCell>Quantity</TableCell>
// //                         <TableCell>UnitName</TableCell>
// //                         <TableCell>Equal</TableCell>
// //                             <TableCell>Quantity</TableCell>
// //                                <TableCell>UnitName</TableCell>
// //                                   <TableCell>Actions</TableCell>
// //                          </TableRow>
// //                       </TableHead>

// //                 <TableBody>
// //         {[...data, ...initialValues].map( (row, idx)=>{
// //            return <ConverterRow  setData = {addRow} data = {row} key={idx} DeleteRow={idx}
// //            basename={basename}/>})}

// //         <Box>
// //                                 <Button
// //                                   variant="contained"
// //                                   color="primary"
// //                                   onClick={() =>
// //                                     addRow({
// //                                       number1: 1,
// //                                       unitName1: "",
// //                                       number2 : "",
// //                                       unitName2:basename
// //                                     })
// //                                   }
// //                                 >
// //                                   Add Row
// //                                 </Button>
// //                               </Box>
// //                       <Divider/>
// //         </TableBody>
// //          </Table>
// //                               </TableContainer>
// //                               </Paper>

// //   </Card>
// //           </Grid>
// //         </Grid>

// //         <div className="card-footer">
// //       <button type="submit" className="btn btn-info">Submit</button>
// //       <Link to="/accounting/chartOfAccounts" className="btn btn-danger float-right">Cancel</Link>
// //     </div>
// //     </div>

// //     );
// //   }

// import React, { useState, useEffect } from "react";
// import "./styles.css";
// import { Link } from "react-router-dom";
// import config from "./config";


// import axios from "axios";

// import { toast } from "react-toastify";
// // Material UI
// import { makeStyles } from "@material-ui/core/styles";
// import Grid from "@material-ui/core/Grid";
// import Card from "@material-ui/core/Card";
// //import Box from "@material-ui/core/Box";
// import CardHeader from "@material-ui/core/CardHeader";
// import Divider from "@material-ui/core/Divider";

// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
// import Paper from "@material-ui/core/Paper";
// import TableContainer from "@material-ui/core/TableContainer";


// //import Select from "@material-ui/core/Select";

// //import UserSessionContext from "../../contexts/UserSessionContext";

// import Controls from "../components/controls/Controls";


// import DeleteIcon from "@material-ui/icons/Delete";
// import AddIcon from "@mui/icons-material/Add";
// //import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
// //import ReactHTMLDatalist from "react-html-datalist";
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
//   const classes = useStyles();
//   //const[unit,setunit]=useState("")
//   //const [unitName1, setunitName1] = useState("");
//   const [ratio, setratio] = useState("");
//   const [productId, setproductId] = useState(props.product_id);
//   //const [baseunit, setbaseunit] = useState("");
//   const [selectedUnit, setSelectedUnit] = useState("");

//   //   React.useEffect(() => {
//   //     return () => {
//   //         setunitName1("")
//   //         setratio("")

//   //     }
//   // }, [])
//   // const handleChange = e => {
//   //   setunitName1({ ...unitName1, [e.target.name]: e.target.value });
//   // };
//   //
//   const handleChange = (event) => {
//     console.log(event.target.value);
//     setSelectedUnit(event.target.value);
//   };
//   return (
//     <TableRow className={classes.inputGroup} hover>
//       <TableCell>
//         {/* <input
// readonly
//  type="number" 
//  value={1}  */}

//         <span>1</span>
//       </TableCell>
//       <TableCell>
//         {/* <input 
//           type="text" 
//           value={unitName1} 
//           onChange={e=>{setunitName1(e.target.value)}}
//       /> */}

//         {/* <ReactHTMLDatalist
//             name={"text"}
//             // onChange={handleChange}
//             onChange={e=>{setunitName1(e.target.value)}}
//             className={"classone"}
//              options={props.unitList} */}

//         {/* <input
//         value={value}
//         type="input"
//         list="optionsList"
//         onChange={onChange}
//         onFocus={onFocusClear}
//         placeholder="Select an option"
//       />
//       <datalist id="optionsList">
//         {props.unitList.map((o) => (
//           <option key={o}>{o.text}</option>
//         ))}
//       </datalist> */}

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
//             console.log(selectedUnit);
//             let req_value = {
//               productId: productId,
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

// export default function Baseconverter(props) {
//   let product_id = props.product_id || 23;
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
//       .get(`${config.APP_CONFIG}/Products/ProductInhouseUnit/api`)
//       .then((res) => {
//         if (res.data.status_code === 200) {
//           let temp = res.data.msg.map((x) => {
//             return { label: x.name, value: x.id };
//           });
//           setunitList(temp);
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

//   //const Deleterow =(i)=>{

//   //     if(i===undefined){
//   //     setData([])
//   //     }
//   //     else{
//   //      const filteredData = data.filter((value, index) => index !== i);
//   //      setData(filteredData);
//   //    }
//   //}

//   const update_row = (req_value) => {
//     axios
//       .post(`${config.APP_CONFIG}/product/ProductUnit/api`, req_value)
//       .then((res) => {
//         if (res.data.status_code === 200) {
//           console.log(res.data);
//           toast.success(res.data.msg || "Enter Successfully.");
//           setData([...data, req_value]);
//           console.log(data);
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
//       <div>
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
//               productId: product_id,
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
//   console.log(data);
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
//                 {/* <input type="text"
//         value={basename} 
//         onChange={e=>{setBaseName(e.target.value)}}/>
//                       */}
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
//                             <TableCell>
//                               {/* <Controls.ActionButton
//                           // type='button'
//                           color="primary"
//                           onClick={e => {update_row(row.idx )}}
//                         >
//                           <EditOutlinedIcon style={{ fontSize: "15px" }} />
//                         </Controls.ActionButton> */}
//                             </TableCell>
//                           </TableRow>
//                         );
//                       })}

//                     <ConverterRow
//                       product_id={product_id}
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
//         {/* <Controls.Button
//                             type="submit"
//                             text="Submit" 
//                             onClick={e=>{
//                                 e.preventDefault()

//                                 // let req_value={
//                                 //   "productId": productId,
//                                 //     "unitname": unitname,
//                                 //     "baseunit": baseunit,
//                                 //      "ratio": ratio
//                                 // }
//                                 // axios.post(`${config.APP_CONFIG}/Products/ProductInhouseUnit/api`,req_value)
//                                 // .then((res) => {
//                                 //   if ( res.data.status_code === 200) {
//                                 //     toast.success("Enter Successfully.");
//                                 //   }
//                                 //   else{
//                                 //     toast.error("enter sucessfully.");
//                                 //   }
//                                 // })
//                                 //   .catch((err) => {
//                                 //     toast.error("failed to load data");
//                                 //     setBaseName([]);
//                                 //   });
                                
                                
//                             }}
//                         /> */}
//         {/* <Controls.Button
//                             text="Reset"
//                             color="default"
//                             onClick={ResetForm}  
//                         /> */}
//         <Link to="" className="btn btn-danger float-right">
//           Cancel
//         </Link>
//       </div>

//       {/* <div className="card-footer">
//       <button type="submit" className="btn btn-info">Submit</button>
//       <Link to="/accounting/chartOfAccounts" className="btn btn-danger float-right">Cancel</Link>
//     </div> */}
//     </div>
//   );
// }

// //   import React from "react";
// //   const AddForm = (props) => {
// //       const [id, setId] = React.useState();
// //       const [ name, setName] = React.useState();
// //       const [ gender, setGender]= React.useState();

// //       React.useEffect(() => {
// //           return () => {
// //               setId()
// //               setName()
// //               setGender()
// //           }
// //       }, [])

// //       return <tr>
// //           <td>
// //               <input
// //               type="text"
// //               value = {id}
// //               onChange = {e => {
// //                   setId(e.target.value)
// //               }}
// //               >
// //               </input>
// //           </td>
// //           <td>
// //               <input
// //               type="text"
// //               value = {name}
// //               onChange = {e => {
// //                   setName(e.target.value)
// //               }}
// //               >
// //               </input>
// //           </td>
// //           <td>
// //               <select value = {gender}
// //               onChange={e =>
// //               {
// //                   setGender(e.target.value)
// //               }}
// //               >
// //                   <option value="male">Male</option>
// //                   <option value="male">Female</option>
// //                   <option value="other">Other</option>
// //               </select>
// //           </td>
// //           <td>
// //               <span
// //                   onClick={e=>{

// //                       props.addRow({
// //                           id:id,
// //                           name:name,
// //                           gender:gender
// //                       })
// //                       setId()
// //                       setName()
// //                       setGender()
// //                   }}

// //                   >
// //                       Add
// //               </span>
// //           </td>

// //       </tr>

// //   }

// //   const TestApp = props => {
// //       const [data, setData] = React.useState()

// //       return  <div>
// //           <table>
// //           <tr>
// //               <th>
// //               Id
// //               </th>
// //           <th>Name</th>

// //           <th>Gender</th>

// //           <th>Action</th>

// //           </tr>

// //           {data.map((row,idx) => {
// //               return <tr
// //                   key={idx}
// //                   >
// //                       <td>{row.id}</td>
// //                       <td>{row.name}</td>
// //                       <td>{row.gender}</td>
// //                       <td><span
// //                           onClick = {e => {
// //                               let _data = data.filter(item=> {return item.id !== row.id})
// //                               setData(_data)
// //                           }}
// //                           >
// //                               Delete
// //                           </span></td>

// //               </tr>

// //           })}
// //           <AddForm
// //           addRow={e=> {
// //               setData([...data, e])
// //           }}

// //           />

// //       </table>
// //       </div>
// //   }

// //   export default TestApp;

// // import React, { useState, useEffect } from "react";
// // import CloseIcon from "@material-ui/icons/Close";
// // import Controls from "../components/controls/Controls";
// // import AddIcon from "@material-ui/icons/Add";
// // import axios from "axios";
// // import config from "./config";
// // //import UserSessionContext from "../../contexts/UserSessionContext";
// // import { toast } from "react-toastify";
// // import Spinner from "./spinner";
// // import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

// // const AddForm = (props) => {
// //   // const [id, setId] = React.useState(1);
// //  // const userSessionContext = React.useContext(UserSessionContext);

// //   const [gender, setGender] = useState("bank");
// //   const [name, setName] = useState();
// //   const [companyList, setCompanyList] = useState();

// //   useEffect(() => {
// //     // return () => {
// //     // setId();
// //     setGender();
// //     setName();
// //     // setCompanyList();
// //     // };
// //   }, []);

// //   // useEffect(() => {
// //   //   axios
// //   //     .get(`${config.APP_CONFIG}/Companies/Company`)

// //   //     .then((res) => {
// //   //       if (res.data.status_code === 400) {
// //   //         userSessionContext.handleLogOut();
// //   //       } else if (res.data.status_code === 200) {
// //   //         let companyList = res.data.msg.map((item) => ({
// //   //           id: item.id,
// //   //           title: item.name,
// //   //         }));

// //   //         companyList = [{ id: 0, title: "Select" }].concat(companyList);
// //   //         setCompanyList(companyList);
// //   //       } else {
// //   //         toast.error("error");
// //   //         setCompanyList([]);
// //   //       }
// //   //     })
// //   //     .catch((err) => {
// //   //       setCompanyList([]);
// //   //       console.log(err);
// //   //     });
// //   // }, []);

// //   // if (companyList === undefined) {
// //   //   return <Spinner />;
// //   // }

// //   return (
// //     <tr>

// //       <td>
// //         <select
// //           value={gender}
// //           onChange={(e) => {
// //             setGender(e.target.value);
// //           }}
// //         >
// //           <option value="bank">Bank</option>
// //           <option value="cash">Cash</option>
// //           {/* <option value="male">No money</option> */}
// //         </select>
// //       </td>

// //       <td>
// //         <input
// //           type="text"
// //           value={name}
// //           onChange={(e) => {
// //             setName(e.target.value);
// //           }}
// //         />
// //       </td>

// //       <td>

// //         <Controls.Button
// //           // text="Add"
// //           variant="outlined"
// //           startIcon={<AddIcon />}
// //           fontSize="small"
// //           // className={classes.newButton}
// //           onClick={(e) => {
// //             props.addRow({
// //               // id: id,
// //               gender: gender,
// //               name: name,
// //               // companyList: companyList,
// //             });
// //           }}
// //         />
// //       </td>
// //     </tr>
// //   );
// // };

// // const TestApp = (props) => {
// //   const [data, setData] = useState([]);

// //   const updateTax = (data) => {
// //     axios
// //       .put(`${config.APP_CONFIG}/Purchase/StatusUpdate/api/{id}`, data)
// //       .then((res) => {
// //         if (res.data.status_code === 200) {
// //           // load_tax_rates();
// //         } else if (res.data.status_code === 401) {
// //           // userSessionContext.handleLogout();
// //         } else {
// //           toast.error("Warning");
// //         }
// //       })
// //       .catch((err) => {
// //         toast.error("Error");
// //       });
// //     // setIsEditPopup(false);
// //   };

// //   return (
// //     <table>
// //       <tr>

// //         <th>Payment</th>
// //         <th>Amount</th>

// //         <th>Action</th>
// //       </tr>
// //       {data.map((row, idx) => {
// //         return (
// //           <tr key={idx}>
// //             {/* <td>{row.id}</td> */}
// //             <td>{row.gender}</td>
// //             <td>{row.name}</td>
// //             <td>

// //               <Controls.ActionButton
// //                 color="secondary"

// //                 onClick={(e) => {
// //                   let _data = data.filter((item) => {
// //                     return item !== row;
// //                   });
// //                   setData(_data);
// //                 }}
// //               >
// //                 <CloseIcon fontSize="small" />
// //               </Controls.ActionButton>
// //             </td>
// //           </tr>
// //         );
// //       })}

// //       <AddForm
// //         addRow={(e) => {
// //           setData([...data, e]);
// //         }}
// //       />
// //     </table>
// //   );
// // };

// // export default TestApp;
