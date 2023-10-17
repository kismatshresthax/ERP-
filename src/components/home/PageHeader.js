import React from 'react'
import { Paper, Typography, makeStyles} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#fdfdff'
    },
    pageHeader:{
        padding:theme.spacing(1),
        display:'flex',
        marginBottom:theme.spacing(1)
    },
    pageIcon:{
        display:'inline-block',
        padding:theme.spacing(1),
        color:'#3c44b1'
    },
    pageTitle:{
        paddingLeft:theme.spacing(1),
        '& .MuiTypography-subtitle2':{
            opacity:'0.6'
        }
    }
}))

export default function PageHeader(props) {

    const classes = useStyles();
    const { title,} = props;
    return (
        <Paper elevation={0} square className={classes.root}>
            <div>
            
                <div className={classes.pageTitle}>
                    <Typography
                        variant="h3"
                        component="div"
                      
                      >
                        {title}</Typography>
                    
                </div>
            </div>
        </Paper>
    )
}