import React from 'react'
import { Button, makeStyles } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 0,
        margin: theme.spacing(0.5)
    },
    secondary: {
        // backgroundColor: theme.palette.secondary.light,
       backgroundColor: '#ff8A8A',
      // backgroundColor: '#c6cef9',
        '& .MuiButton-label': {
            color: theme.palette.secondary.main,
        }
    },
    primary: {
        //backgroundColor: theme.palette.primary.light,
        backgroundColor: '#c6cef9',
        '& .MuiButton-label': {
            color: theme.palette.primary.main,
        }
    },
    danger: {
        //backgroundColor: theme.palette.primary.light,
        margin: 0,
        backgroundColor: '#c6cef9',
        '& .MuiButton-label': {
            color: "#c92121",
        }
    },
    warning: {
        //backgroundColor: theme.palette.primary.light,
        margin: 0,
        backgroundColor: '#c6cef9',
        '& .MuiButton-label': {
            color: "#198754",
        }
    },
}))

export default function ActionButton(props) {

    const { text, color, children, onClick } = props;
    const classes = useStyles();

    return (
        <Button
        disableEnforceFocus
            className={`${classes.root} ${classes[color]}`}
            onClick={onClick}>
            {children}
            {text}
        </Button>
    )
}