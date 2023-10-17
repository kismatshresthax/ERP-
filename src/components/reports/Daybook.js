import React,{useEffect,useState,useRef} from 'react'
import {useForm,Form} from "../home/useForm";
import UserAuthenticationContext from '../../contexts/UserAuthenticationContext';
import UserSessionContext from '../../contexts/UserSessionContext';
import UseTable from '../home/UseTable';
import axios from "axios";
import config from '../../utils/config';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CompanyContext from '../../contexts/CompanyContext';
// import * as XLSX from 'xlsx/xlsx.mjs';

import { makeStyles } from "@material-ui/core/styles";
import { format } from "date-fns";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import { toast } from "react-toastify";
import Controls from '../controls/Controls';

import Spinner from '../../utils/spinner';
// Material UI

import { useHistory } from "react-router-dom";
import FilterListIcon from '@mui/icons-material/FilterList';
import { AiOutlineArrowLeft } from 'react-icons/ai'
import Grid from "@material-ui/core/Grid";

import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
import "date-fns";
import Popup from '../home/Popup';
import  DayendTable  from './Dayend/DayendTable';
import Tooltip from "@mui/material/Tooltip";
import NepaliDate from '../../utils/NepaliDate';

const useStyles = makeStyles((theme) => ({
    header: {
      backgroundColor: "white",
      color: "#546e7a",
      justifyContent: "left",
      padding: "10px 0px",
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
    table: {
      "& thead th": {
        fontWeight: "600",
        // color: theme.palette.primary.main,
        color: "#9999",
        // backgroundColor: theme.palette.primary.light,
        backgroundColor: "#454545",
        position: "sticky",
        top: "33px",
        zIndex: 9,
      },
      "& tbody td": {
        fontWeight: "300",
      },
      "& tbody tr:hover": {
        backgroundColor: "#fffbf2",
        cursor: "pointer",
      },
    },
  }));
const initialFValues = {
    dateFrom: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
    dateTo: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
  };
function Daybook(props) {
  const componentRef = React.useRef(null);
    const { values, handleInputChange } = useForm(initialFValues);
  
    const history = useHistory();
    const [isNewPopup, setIsNewPopup] = useState(false);
    const classes = useStyles();
    const [records, setRecords] = useState([]);
  
    const [open, setOpen] = React.useState(true);
   

    const userSessionContext = React.useContext(UserSessionContext);
    const companyContext = React.useContext(CompanyContext);
    const companyId=companyContext.company.id
    // React.useEffect(() => {
    //   load_table();
    // }, []);
  
  
  
    const handleSubmit = (e) => {
      e.preventDefault();
      let _data = {
        dayendDate: format(new Date(values.dateFrom), "yyyy-MM-dd"),
      
        companyId: companyContext.company.id,
      };

      const fig = {
        headers: {
          Authorization: userSessionContext.token,
        },
      };
  
     axios.post(`${config.APP_CONFIG}/Sales/POS/dayendReport/api`,_data, fig)
        .then((res) => {
      
          if (res.data.status_code === 200) {
           
            setRecords(res.data.msg);
            setOpen(false);
          } else if (res.data.status_code === 401) {
            userSessionContext.handleLogout();
          } else if (res.data.status_code === 400) {
            toast.warn(res.data.msg);
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
    if (records === undefined) {
      return <Spinner />;
    }

    const handleRoute = (e) => {
      e.preventDefault()
      history.push(`/reports/report`)
      setRecords([])
  
    }

      

    console.log(records)
      
  

        return (
        
       
          <div>
                {open? 
        <Popup 
        title=" Day End"
        openPopup={open}
        setPopups={() => {
          setOpen(false);
        }}>
    
        <Form onSubmit={handleSubmit}>
     
        {/* <div className='flex space-x-4 ' >
          
            <Controls.DatePicker
                      name="dateFrom"
                      label="DateFrom"
                      value={values.dateFrom}
                      onChange={handleInputChange}
                      

                    />

            
            <Controls.Button   type="submit" text="Submit" />
          

          </div> */}
         <Grid container direction="row">
                  <Grid item  lg={6} md={6}xs={12} sm={12}>
                  <Controls.DatePicker
                      name="dateFrom"
                      label="DateFrom"
                      value={values.dateFrom}
                      onChange={handleInputChange}
                    />
                  </Grid>
                
                  <Grid item lg={6} md={6} xs={12} sm={12} className="w-100 d-flex justify-content-end">
                    <Controls.Button type="submit" text="Submit" />
                  </Grid>
                </Grid>
        </Form>
        </Popup>
        :null}
               {isNewPopup ? (
            <Popup
              title="Day End Report"
              size="lg"
              openPopup={isNewPopup}
              setPopups={setIsNewPopup}
            >
              <DayendTable data={records.filter((x) => x.id === isNewPopup)[0] || null}  />
            </Popup>
          ) : null}
          {records.length>0?
          <>
        
        <div className="w-100  pb-2 d-flex flex-row justify-content-between">
            <span>
              <button className="btn btn-outline-success btn-sm d-flex align-items-center" onClick={(e) => handleRoute(e)}>
                <AiOutlineArrowLeft />Back
              </button>
            </span>
            <div className="d-flex flex-row gap-2">

<Controls.ActionButton
                  
                        onClick={() => {
                          setOpen(!open);
                          setRecords([])
                     
                        }}
                      >
                        <Tooltip title="filter" placement="top" arrow>
                        <FilterListIcon  sx={{mt:1,ml:5}} />
                      </Tooltip>                        
                      </Controls.ActionButton>
           
             
            </div>
          </div>
      <h3 style={{alignItems:"center", display:"flex",justifyContent:"center",padding:"15px 0px"}}> Day End Report</h3>
      <TableContainer component={Paper} sx={{marginBottom:"30px"}}>
        <Table size ="small" sx={{ minWidth: 300 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "aliceblue" }}>
              <TableCell align="center">S.N</TableCell>
              <TableCell align="center">DATE</TableCell>
              <TableCell align="center">BILL COUNT</TableCell>
      
              <TableCell align="center">OPENING BALANCE</TableCell>
              <TableCell align="center">CASH DROP</TableCell>
              <TableCell align="center">Closing</TableCell>
              <TableCell align="center">CREDIT</TableCell>
           
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.length>0?records.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="center">{row.id}</TableCell>
               
                <TableCell align="center">{ (row.createdAt.slice(0,16))+" "+NepaliDate(row.createdAt)}</TableCell>
                <TableCell align="center">{row.totalBillNo}</TableCell>
              

                <TableCell align="center">{row.openingBalance}</TableCell>
                <TableCell align="center">{row.cashDrop}</TableCell>
                <TableCell align="center">{row.closing}</TableCell>
                <TableCell align="center">{row.creditAmount}</TableCell>
               
                <TableCell align="center">

                <Controls.ActionButton
                        color="primary"
                        onClick={() => {
                         setIsNewPopup(row.id)
                        }}
                      >
                        <Tooltip title="View" placement="top" arrow>
                        <RemoveRedEyeIcon fontSize="small" />
                      </Tooltip>                        
                      </Controls.ActionButton>
           
                 </TableCell>
              </TableRow>
            )): 
         
               <TableRow  align="center" key={Math.random}>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
          
                  <TableCell align="center">No Records to Display</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  </TableRow>
                }
          </TableBody>
        </Table>
      </TableContainer>
      </>:null}
    </div>
        )
      }



export default Daybook