import React from 'react'



// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Controls from "../components/controls/Controls";


import { useForm, Form } from "../components/home/useForm";








import { format } from "date-fns";

import "date-fns";





const initialFValues = {
    dateFrom: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
    dateTo: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
  };
  

    const DateFilter = ({initialFValues,handleSubmit, values, handleInputChange}) => {
  return (
    <Form onSubmit={handleSubmit}>
    <Grid container direction="row">
            <Grid item xs={12} sm={4}>
              <Controls.DatePicker
                name="dateFrom"
                label="DateFrom"
                value={values.dateFrom}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controls.DatePicker
                name="dateTo"
                label="DateTo"
                value={values.dateTo}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4} className="w-100 d-flex justify-content-end">
              <Controls.Button type="submit" text="Submit" />
            </Grid>
          </Grid>
  </Form>
  )
}

export default DateFilter