import React from "react";
import  FormHelperText from "@mui/material/FormHelperText";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import {Select as MuiSelect } from '@mui/material';
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));
export default function Select(props) {
  const classes = useStyles();

  const { name, label, value, variant, onChange, options, required , error=null, disabled } = props;

  return (
    <FormControl  className={classes.formControl} variant={variant}
      {...(error && {error:true})}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect    label={label} name={name} value={value} onChange={onChange} disabled={disabled} required = {required} >
        {options&&options.map((item, index) => {return(
       
          <MenuItem key={item.id} value={item.id}>
            {item.title}
          </MenuItem>
       
        )})}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
