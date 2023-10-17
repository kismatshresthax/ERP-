import React ,{useState}from 'react'

import { Grid } from '@mui/material'
import { Avatar, Card, CardContent,  Dialog, DialogActions, DialogContent,  makeStyles } from '@material-ui/core';

// import UserSessionContext from '../../../contexts/UserSessionContext'
// import CompanyContext from '../../../contexts/CompanyContext'
// import config from '../../../utils/config';
import { BiDotsVerticalRounded } from "react-icons/bi";
import DatePickers from '../../controls/DatePicker';
import {AiOutlineCloseCircle} from "react-icons/ai";
import "./widget.css"

import { roundTo2DecimalPoint } from '../../../utils/Round';
const WidgetCard = (props) => {
//     const userSessionContext = React.useContext(UserSessionContext);
//     const companyContext = React.useContext(CompanyContext);


//     const companyId = companyContext.company.id;

//   const [Dash, setDash] = useState([]);

//   useEffect(() => {
  
//     axios
//     .get(`${config.APP_CONFIG}/dashBoard/report/api/${companyId}/1`)
//     .then((res) => {
//       if (res.data.status_code === 200) {
   


//         setDash(res.data.msg);
      
//       } else if (res.data.status_code === 401) {
//         userSessionContext.handleLogout();
//       } else if (res.data.status_code === 400) {
//         toast.warn(res.data.msg);
//       } else {
//         toast.error("Couldn't load data");
//         //   setSales([]);
//       }
//     })
//     .catch((err) => {
//       toast.error("Error occurred ");
//     });


//   }, []);

 
   
  
const Dash = props.data

    const [open, setOpen] = useState(false)

    const handleOpen = (e) => {
        e.preventDefault()
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }


    const useStyles = makeStyles((theme)=>({
        responsiveAvatar: {
            width: theme.spacing(5), 
            height: theme.spacing(5),
            fontSize:"15px", 
            [theme.breakpoints.down('sm')]: {
              width: theme.spacing(3),   
              height: theme.spacing(3),
              fontSize:"10px"  
            },
          },
    }));
    const classes = useStyles();
    //console.log((data.Type).charAt(0));
    return (

    <>
       { Dash.filter(item => item.Type === "Sales" || item.Type === "Purchase").map((data,idx)=>{

        return (
        <>
            <Card  key ={idx}className="w-100 " >
                <CardContent className='card-body'>
                    <div className='d-flex flex-row justify-content-between align-items-center'>
                        <span className='d-flex flex-row gap-2 my-auto'>
                            <Avatar className={classes.responsiveAvatar}style={{ backgroundColor: "crimson", color: 'white' }}>{(data.Type).charAt(0)}</Avatar>
                            <p className='text-head my-auto fw-bolder'>{data.Type}</p>
                        </span>
                        <span className='d-flex flex-row dropdown'>
                            <BiDotsVerticalRounded className='fs-5' type="button" data-bs-toggle="dropdown" aria-expanded="false" />
                            <ul class="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Today</a></li>
                                <li><a className="dropdown-item" href="#">This week</a></li>
                                <li><a className="dropdown-item" href="#">This Month</a></li>
                                <li><a className="dropdown-item" href="#" onClick={(e) => handleOpen(e)}>Custom Date</a></li>
                            </ul>
                        </span>
                    </div>
                </CardContent>
                <CardContent >
                    <div className='  d-flex flex-column flex-sm-row justify-content-center justify-content-sm-between px-1 '>
                        <span className='text d-flex flex-row sm:mx-auto  gap-2'>
                            <p className='fw-bolder'>Nrs</p>
                            <p style={{ color: `crimson` }}>{roundTo2DecimalPoint(data.totalSum)}</p>
                        </span>
                        <div className='text d-flex flex-row gap-1 ' >
                            <p className='fw-bolder'>Invoices Count: </p>
                            <p>{"6"}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Dialog open={open} onClose={handleClose}>
                <DialogActions onClick={handleClose} style={{ cursor: 'pointer', fontSize: '19px' }}><AiOutlineCloseCircle /></DialogActions>
                <DialogContent className='d-flex flex-row gap-2 align-items-center'>
                    <DatePickers />
                    <p className='my-auto fw-bolder'>To</p>
                    <DatePickers />
                </DialogContent>
                <DialogActions>
                    <button className='btn btn-info text-white me-2' >Submit</button>
                </DialogActions>
            </Dialog>
        </>
        )})}
        </>
    )
}

export default WidgetCard