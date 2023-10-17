import React, { useContext, useEffect, useState } from 'react'
import MatrixReportTable from './MatrixReportTable'
import CompanyContext from '../../../contexts/CompanyContext'
import axios from 'axios'
import UserSessionContext from '../../../contexts/UserSessionContext'
import { Grid, Tooltip } from '@material-ui/core'
import { Form, useForm } from '../../home/useForm'
import Controls from '../../controls/Controls'
import Popup from '../../home/Popup'
import { format } from 'date-fns'
import { toast } from 'react-toastify'
import config from "../../../utils/config";
import NepaliDate from '../../../utils/NepaliDate'
import { useHistory } from "react-router-dom";
import FilterListIcon from '@mui/icons-material/FilterList';
import { AiOutlineArrowLeft } from 'react-icons/ai'
const initialFValues = {
  dateFrom: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
  dateTo: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
};
const MatrixReportPOS = () => {

  const [open,setOpen] = useState(true)
  const [product,setProducts] = useState([])
  const { values, handleInputChange } = useForm(initialFValues);
  const companyContext= useContext(CompanyContext)
  const userSessionContext = useContext(UserSessionContext)

  const companyId = companyContext.companies[0].id
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    let _data = {
     
      dateFrom: format(new Date(values.dateFrom), "yyyy-MM-dd"),
      dateTo: format(new Date(values.dateTo), "yyyy-MM-dd"),
      companyId:companyId,
    };
  

    
      axios.post(
        
        `${config.APP_CONFIG}/Sales/salesMatrix/api`, _data,{
          headers:{
            Authorization : userSessionContext.token
          }
        })
        .then((res) => {
          if (res.data.status_code === 200) {
  
            if (res.data.msg.length < 1) {
              toast.warn("No Records")
            }
            else {
              setProducts(res.data.msg);
             
              setOpen(false);
            
            }
          } else if (res.data.status_code === 401) {
            userSessionContext.handleLogout();
          } else if (res.data.status_code === 400) {
            toast.warn(res.data.msg);
          } else {
            toast.error("Warning");
          }
        })
        .catch((err) => {
          toast.error("Error");
        });
   
  }
  
  const handleRoute = (e) => {
    e.preventDefault()
    history.push(`/reports/report`)
    setProducts([])

  }

 
  return (

    <div className='d-flex flex-column'>
      {
        open ?
        <Popup 
        title="Matrix Report"
        openPopup={open}
        setPopups={() => {
          setOpen(false);
        }}>
     
        <Form onSubmit={handleSubmit}>
          <Grid container direction="row">
                  <Grid item xs={12} sm={4}>
                    <Controls.DatePicker
                      name="dateFrom"
                      label="DateFrom"
                      value={values.dateFrom}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controls.DatePicker
                      name="dateTo"
                      label="DateTo"
                      value={values.dateTo}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} className="w-100 d-flex justify-content-end">
                    <Controls.Button type="submit" text="Submit" />
                  </Grid>
                </Grid>
        </Form>
        </Popup>
        : null
      }
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
                          setProducts([])
                     
                        }}
                      >
                        <Tooltip title="filter" placement="top" arrow>
                        <FilterListIcon  sx={{mt:1,ml:5}} />
                      </Tooltip>                        
                      </Controls.ActionButton>
           
             
            </div>
          </div>
      <div className='d-flex  justify-content-center'>
        <div className='d-flex flex-column '>
        <p className='d-flex justify-content-center my-0 fs-4 fw-bold'>Matrix Report</p>
        <p className='d-flex justify-content-center my-0 fs-6 fw-bolder'>{companyContext.company.name}</p>
        <p className='d-flex justify-content-center my-0 fs-6 fw-bolder'>{companyContext.company.panNo}</p>
        </div>
      </div>
      <div className='d-flex flex-row justify-content-between my-0'>
        <span>
        <p>From:{" "}
                    {format(
                     new Date(values.dateFrom),
                  "yyyy/MM/dd"
                    ).toString()+" "+NepaliDate(values.dateFrom)} </p>
               
        </span>
        <span>
          <p>To :{format(
                     new Date(values.dateTo),
                  "yyyy/MM/dd"
                    ).toString()+" "+NepaliDate(values.dateFrom)}</p>
        </span>
      </div>
      <hr className='my-1'/>
      {product.length>0?
        <MatrixReportTable product={product}/>
        :null}
      
    
    </div>
  )
}

export default MatrixReportPOS