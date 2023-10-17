import React from 'react'
import TextField from '@mui/material/TextField';
export default function Input(props) {

    const {id, name, label, onKeyDown,type, value,error=null,  fullWidth,onChange,onClick,step, inputProps,maxRows,multiline, ...other } = props;
    return (
     
        <TextField
           // id="outlined-basic"
            id={id||"outlined-basic"}
            variant="outlined"
            size="small"
            label={label} 
            name={name}
            fullWidth={fullWidth}
            onKeyDown={onKeyDown}
            onClick={onClick}
            value={value}
            onChange={onChange}
            //required={required}
            inputProps={ inputProps}
            step={step}
            {...other}
            {...(error && {error:true,helperText:error})}
            // error
            // helperText="some validation error"
            type = {type}
            multiline = {multiline}
            maxRows = {maxRows}
            
        />
         
    )
}
