import axios from "axios";
import React, { useState } from "react";
import UserSessionContext from "../../contexts/UserSessionContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { toast } from "react-toastify";
//import Spinner from "../../utils/spinner";
import config from "../../utils/config";
//import Controls from "../controls/Controls";
import { Form } from "../../components/home/useForm";
import { Grid } from "@material-ui/core";
import { format } from "date-fns";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  DatePicker,
} from "@material-ui/pickers";

const Charts = () => {
  const userSessionContext = React.useContext(UserSessionContext);
  const [data, setData] = useState();
  let newDate = format(new Date(), "yyyy-MM-dd HH:mm:ss");
  // console.log(date.setMonth(date.getMonth()-1))
  const [datefrom, setDatefrom] = useState("2017-01-01 00:00:00");
  const [dateto, setDateto] = useState(newDate);

  const handleDateFromChange = (date) => {
    setDatefrom(date);
    loadSalesChart()
  };
  const handleDateToChange = (date) => {
    setDateto(date);
    loadSalesChart()
  };

  // React.useEffect(() => {
  //   loadSalesChart(datefrom,dateto );
  // }, [datefrom, dateto]);

 

  const loadSalesChart = async() => {
   await axios
    .get(
      `${config.APP_CONFIG}/Sales/SalesSummaryList/api/${datefrom}/${dateto}`,{
        headers: {
          Authorization: userSessionContext.token,
        },
      }
    )
    .then((res) => {
      if (res.data.status_code === 200) {
        setData(res.data.msg);
      } else if (res.data.status_code === 401) {
        userSessionContext.handleLogout();
      } 
      else if (res.data.status_code === 400) {
        toast.warn(res.data.msg)
      }
      else {
        toast.error("Couldn't load data");
        setData([]);
      }
    })
    .catch((err) => {
      toast.error("Error occurred");
      setData([]);
    });
  }

  const DisplayData = () => {
    return (
      <>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid
              container
              justify="space-front"
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={3}>
                <DatePicker
                  //disableToolbar
                  disableFuture
                  autoOk
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  placeholder="MM/DD/YYYY"
                  // id='date-picker'
                  label="Date From"
                  value={datefrom}
                  onChange={(date) => handleDateFromChange(date)}
                ></DatePicker>
              </Grid>
              <Grid item xs={3}>
                <DatePicker
                  // disableToolbar
                  disableFuture
                  autoOk="true"
                  variant="inline"
                  format="MM/dd/yyyy"
                  placeholder="yyyy/MM/dd"
                  margin="normal"
                  id="date-picker"
                  label="Date To"
                  value={dateto}
                  onChange={(date) => handleDateToChange(date)}
                  KeyboardButtonProps={{
                    "arial-label": "change date",
                  }}
                ></DatePicker>
              </Grid>
             
            </Grid>
          </MuiPickersUtilsProvider>
          <ResponsiveContainer width="100%" aspect="3">
            <LineChart
              width={300}
              height={100}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="2 2" horizontal="" vertical="" />
              <XAxis dataKey="Date" />
              <YAxis />
              <Tooltip
                contentStyle={{ backgroundColor: "#8884d8", color: "#fff" }}
                itemStyle={{ color: "#fff" }}
                cursor={false}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="Total"
                dot={{
                  fill: "#2e4355",
                  stroke: "#8884d8",
                  strokeWidth: 2,
                  r: 5,
                }}
                activeDot={{
                  fill: "#2e4355",
                  stroke: "#8884d8",
                  strokeWidth: 5,
                  r: 10,
                }}
                strokeWidth="2"
              />
            </LineChart>
          </ResponsiveContainer>
        </Form>
      </>
    );
  };


  if (data === undefined) {
    return (
      <div>
        <DisplayData />
      </div>
    );
  }
  if (data.length === 0) {
    return (
      <div
        className="content-wrapper iframe-mode"
        data-widget="iframe"
        data-loading-screen={750}
      >
        <DisplayData />
      </div>
    );
  }
  return (
    <div
      className="content-wrapper iframe-mode"
      data-widget="iframe"
      data-loading-screen={750}
    >
      <DisplayData />
    </div>
  );
};
export default Charts;
