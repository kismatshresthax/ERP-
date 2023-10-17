import React from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

export default function DatePickers(props) {
                 
  const {id, name, label, value, onChange, onFocus, disabled,disableFuture } = props;

  const convertToDefEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        // disableToolbar
        id={id}
        variant="inline"
        autoOk
        label={label}
        format="yyyy-MM-dd"
        name={name}
        value={value}
        onFocus = {onFocus}
        size="small"
        disabled = {disabled}
        disableFuture={disableFuture}
        // variant = 'dialog'
        onChange={(date) => onChange(convertToDefEventPara(name, date))}
      ></KeyboardDatePicker>
    </MuiPickersUtilsProvider>
  );
}
