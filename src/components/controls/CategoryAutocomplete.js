import React from "react";
import { Autocomplete, TextField } from "@mui/material";

const CategoryAutocomplete = ({
  label,
  name,
  value,
  onChange,
  options,
  error
}) => {
  const getOptionLabel = (option) => option.label;

  const handleSelect = (event, newValue) => {
    const selectedValue = newValue ? newValue.value : null;
    onChange(name, selectedValue);
  };
  const selectedOption = options.find((option) => option.value === value);

  return (
    <Autocomplete
      options={options}
      getOptionLabel={getOptionLabel}
      //getOptionSelected={(option, value) => option.value === value}
      value={selectedOption}
      disableClearable
      onChange={onChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          name={name}
          error={error ? true : false}
          helperText={error}
        />
      )}
    />
  );
};

export default CategoryAutocomplete;