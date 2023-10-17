import React, { useState } from "react";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Autocomplete(props) {
  const classes = useStyles();

  const {
    name,
    label,
    value,
    variant,
    onChange,
    options,
    required,
    error = null,
    disabled,
  } = props;

  const [selectedOption, setSelectedOption] = useState(value);

  const handleAutocompleteChange = (event) => {
    const newValue = event.target.value;
    setSelectedOption(newValue);
    onChange(newValue);
  };

  return (
    <FormControl
      className={classes.formControl}
      variant={variant}
      {...(error && { error: true })}
    >
      <InputLabel>{label}</InputLabel>
      <TextField
        name={name}
        select
        value={selectedOption}
        onChange={handleAutocompleteChange}
        disabled={disabled}
        required={required}
        label={label}
        variant={variant}
        error={error}
      >
        {options &&
          options.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.title}
            </MenuItem>
          ))}
      </TextField>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}