import React from 'react'
import { BiDotsVerticalRounded } from "react-icons/bi"
import { Avatar, Card, CardContent, makeStyles } from '@material-ui/core';
import "./widget.css"
import { roundTo2DecimalPoint } from '../../../utils/Round';


const WidgetCard1 = (props) => {
    const useStyles = makeStyles((theme) => ({
        responsiveAvatar: {
            width: theme.spacing(5),
            height: theme.spacing(5),
            fontSize: "15px",
            [theme.breakpoints.down('sm')]: {
                width: theme.spacing(3),
                height: theme.spacing(3),
                fontSize: "10px"
            },
        },

    }));
    const classes = useStyles();

    const Dash = props.data
    return (
        <>
      { Dash.filter(item => item.Type === "Income" || item.Type === "Expenses").map((data,idx)=>{
  
        return (
        <>
        <Card  key ={idx}className=' w-100  justify-content-center h-50 rounded'  >
            <CardContent className='card-body '>
                <div className='d-flex flex-row justify-content-between mt-1'>
                    <span className='d-flex flex-row gap-2 my-auto'>
                        <Avatar className={classes.responsiveAvatar} style={{ backgroundColor: "#122c53", color: 'white' }}>{(data.Type).charAt(0)}</Avatar>
                        <p className='my-auto fw-bolder '>{data.Type}</p>
                    </span>
                    <span className='text d-flex flex-row gap-2 h-100 my-auto'>
                        <p className='fw-bolder' >Nrs</p>
                        <p style={{ color: `#122c53` }}>{roundTo2DecimalPoint(data.totalSum)}</p>
                    </span>
                </div>
            </CardContent>

        </Card>
        </>
        )})}
        </>
    )
}

export default WidgetCard1