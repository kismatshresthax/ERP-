
import React, { useState, useEffect } from "react"
import { Search } from "@material-ui/icons";
import {
 
  makeStyles,
  TableRow,
  TableCell,
  TableBody,
  Toolbar,
  InputAdornment,
  Tooltip,
  CardActionArea,
  Grid,

} from "@material-ui/core";
import Box from '@mui/material/Box';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ListIcon from '@mui/icons-material/List';
import BalanceIcon from '@mui/icons-material/Balance';
import GroupIcon from '@mui/icons-material/Group';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import CottageIcon from '@mui/icons-material/Cottage';


import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SummarizeIcon from '@mui/icons-material/Summarize';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

import GroupsIcon from '@mui/icons-material/Groups';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AddCardIcon from '@mui/icons-material/AddCard';
import { CommentBank } from "@mui/icons-material";
const useStyles = makeStyles((theme) => ({
    card: {
        width: '20%',
        margin: theme.spacing(1),
        display: 'flex',
        flexDirection: 'row',
      },
      cardActionArea: {
        flexGrow: 1,
        flexDirection: 'row',
        alignItems: 'stretch',
      },
      header: {
        backgroundColor: "green",
        color:"#fff",
        width: '100%',
      },
      headerTitle: {
        color:"#fff",
      },
      headerSubheader: {
        color:"#fff",
      },
      content: {
        flexGrow: 1,
      },
}));

function BussinessSetting(props) {


    const data=[{
        id:1,
        "title":"Company Setup",
        "icon":<GroupIcon/>,
        "children":[{
      id:1,  
      "title":"Company Setup",
      "icon":<BalanceIcon/>
        }]
    },{
        id:2,
        "title":"Inventory Setup",
        "icon":<CommentBank/>,
        "children":[{
            id:1,  
            "title":"Warehouse",
            "icon":<CottageIcon/>
    }]},{
    id:3,
    "title":"Setup",
    "icon":<CommentBank/>,
    "children":[{
        id:1,  
        "title":"Warehouse",
        "icon":<CottageIcon/>
}]
    }
    ]
    const classes = useStyles(props);
  return (
  
      <div>
 <Grid container spacing={2}>
 {data.map((item,index)=>{
            return (
              
                <Card className={classes.card}>
    <CardActionArea
      className={classes.cardActionArea}
 
    >
      <CardHeader
        avatar=
        {item.icon}
        
        classes={{
          root: classes.header,
          title: classes.headerTitle,
          subheader: classes.headerSubheader
        }}
        title={item.title}
       
      />
      <CardContent className={classes.content}>
      {item.children.map((i,index)=>{
            return (
              <li>
                {i.title}
              </li>)})}
      </CardContent>
    </CardActionArea>

       
  </Card>
 

  )})}
    </Grid>
  </div> 

  )
}

export default BussinessSetting;