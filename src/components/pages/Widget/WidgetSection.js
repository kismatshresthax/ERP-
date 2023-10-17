import React ,{useState,useEffect}from 'react'
import WidgetCard from './WidgetCard'
import { Grid } from '@mui/material'
import jsonData from "./widget.json"
import Data from "./widget1.json"
import config from '../../../utils/config'
import WidgetCard1 from './WidgetCard1'
import axios from 'axios'
import UserSessionContext from '../../../contexts/UserSessionContext'
import CompanyContext from '../../../contexts/CompanyContext'
import { toast } from "react-toastify";
const WidgetSection = (props) => {
  const userSessionContext = React.useContext(UserSessionContext);
  const companyContext = React.useContext(CompanyContext);
  const [Dash, setDash] = useState([]);
  const companyId = companyContext.company.id;
  useEffect(() => {
  
    axios
    .get(`${config.APP_CONFIG}/dashBoard/report/api/${companyId}/1`)
    .then((res) => {
      if (res.data.status_code === 200) {
   


        setDash(res.data.msg);
      
      } else if (res.data.status_code === 401) {
        userSessionContext.handleLogout();
      } else if (res.data.status_code === 400) {
        toast.warn(res.data.msg);
      } else {
        toast.error("Couldn't load data");
        //   setSales([]);
      }
    })
    .catch((err) => {
      toast.error("Error occurred ");
    });


  }, []);

 

  return (
    <Grid container spacing={1} className='w-100 d-flex flex-row' >
        <Grid item xs={12} sm={12} md={8} className='d-flex flex-row gap-2 w-25'>
                {/* {Dash?Dash.filter(item => item.Type === "Sales" || item.Type === "Purchase").map((items)=>{
                    return <WidgetCard   key={Math.random()} data={items}  />
                }):[]} */}
                <WidgetCard data={Dash} />
        </Grid>
        <Grid item xs={12}  md={4} className='d-flex flex-column gap-2'>
                {/* {Dash?Dash.filter(item => item.Type !== "Sales" || item.Type !== "Purchase").map((items)=>{
                    return <WidgetCard1  key={Math.random()} data={items} />
                }):[]} */}
                 <WidgetCard1  data={Dash}/> 
        </Grid>
    </Grid>
  )
}

export default WidgetSection