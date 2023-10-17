import React,{useState} from 'react'
import Card from '@mui/material/Card';
import { makeStyles } from "@material-ui/core";
import CardContent from '@mui/material/CardContent';
import CardHeader from "@material-ui/core/CardHeader";
import Controls from '../controls/Controls';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Route } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
    header: {
      backgroundColor: "white",
      color: "#546e7a",
      justifyContent: "left",
      padding: "8px 0px",
      fontWeight: "bold",
      MarginTop: "5px",
    },
    content: {
      padding: 0,
    },
   
  }));
function ReportHeader(props) {
    const classes=useStyles();
  return (
    <div className='d-flex justify-content-between'>
   
    <CardHeader
    className={classes.header}
    title={props.title}
 
  />
     {/* <CardContent> */}
     <Route
    render={({ history }) => (
      <Controls.Button
        text="Report"
        variant="outlined"
        startIcon={<ArrowBackIcon />}
    
        
        onClick={() => {
          history.push(`/reports/report`);
        }}
      />
    )}
  />

  </div>
  )
}

export default ReportHeader