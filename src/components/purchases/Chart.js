// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import React, { useState } from 'react';
// import UserSessionContext from '../../contexts/UserSessionContext';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { toast } from 'react-toastify';
// import Spinner from '../../utils/spinner';
// import config from '../../utils/config';
// import Controls from '../controls/Controls';
// import {Grid} from '@material-ui/core';
// import {useForm,Form} from '../../components/home/useForm';
// import 'date-fns';
// import DateFnsUtils from '@date-io/date-fns';
// import {
//   MuiPickersUtilsProvider,
//   DatePicker,
//   KeyboardTimePicker,
//   KeyboardDatePicker
// } from '@material-ui/pickers'
// import '../../utils/styles.css'

// const PurchaseCharts = (props) =>{
//     const userSessionContext = React.useContext(UserSessionContext)
//     const [data, setData] =useState();
//     const [datefrom, setDatefrom] = useState(new Date("2019-09-11T12:00:00.000Z").toISOString().split('.')[0].replace('Z', '').replace('T', ' '));
//     const [dateto, setDateto] = useState(new Date("2021-09-11T12:00:00.000Z").toISOString().split('.')[0].replace('Z', '').replace('T', ' '));

//     const handleDateFromChange = (date) => {
//       setDatefrom(date.toISOString().split('.')[0].replace('Z', '').replace('T', ' '))

//   }
//   const handleDateToChange = (date) => {
//     setDateto(date.toISOString().split('.')[0].replace('Z', '').replace('T', ' '))

// }
//     React.useEffect(() => {
//         axios.get(`${config.APP_CONFIG}/Purchase/PurchaseSummaryList/api/2019-01-12%2000%3A00%3A00/2030-01-13%2000%3A00%3A00`)
//         // axios.get(`${config.APP_CONFIG}/Purchase/PurchaseSummaryList/api/${datefrom}/${dateto}`)
//         .then(res => {
//             if(res.data.status_code === 200){
//                 setData([res.data.msg])
//             }
//             else if(res.data.status_code === 400){
//                 userSessionContext.handleLogout();

//             }
//             else{
//                 toast.error("Couldn't load data");
//                 setData([])
//             }
//         })
//         .catch(err =>{
//             toast.error("Error occurred");
//             setData([]);

//         })
//     },[])

// const DisplayData = (() => {
//   return (
//   <>
//   <Form onSubmit ={e=>{
//     e.preventDefault()
//     }}
//   >
//   <MuiPickersUtilsProvider utils = {DateFnsUtils}>
//   <Grid container justify = "space-front" columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
//   <Grid item xs={3} >
//   <DatePicker
//             // disableToolbar
//             disableFuture
//             autoOk = 'true'
//             variant ='inline'
//             format= 'MM/dd/yyyy'
//             margin = 'normal'
//             placeholder = 'MM/DD/YYYY'
//             id='date-picker'
//             label='Date From'
//             value = {datefrom}
//             onChange = {date => handleDateFromChange(date)}
//             KeyboardButtonProps = {{
//                 'arial-label' : 'change date'
//             }}>

//             </DatePicker>
//     </Grid>
//     <Grid item xs={3}>
//    <DatePicker
//             // disableToolbar
//             disableFuture
//             autoOk = 'true'
//             variant ='inline'
//             format='MM/dd/yyyy'
//             placeholder = 'yyyy/MM/dd'
//             margin = 'normal'
//             id='date-picker'
//             label='Date To'
//             value = {dateto}
//             onChange = {date => handleDateToChange(date)}
//             KeyboardButtonProps = {{
//                 'arial-label' : 'change date'
//             }}

//             >
//             </DatePicker>
// </Grid>
// <Controls.Button
// type="submit"
// text="Submit"
// onClick = {e=>{
//   e.preventDefault()
//   axios.get(`${config.APP_CONFIG}/Purchase/PurchaseSummaryList/api/${datefrom}/${dateto}`)
//   .then(res => {
//       if(res.data.status_code === 200){
//           setData(res.data.msg)
//       }
//       else if(res.data.status_code === 401){
//           userSessionContext.handleLogout();
//       }
//       else{
//           toast.error("Couldn't load data");
//           setData([])
//       }
//   })
//   .catch(err =>{
//       toast.error("Error occurred");
//       setData([]);

//   })

// }
// }

// >

// </Controls.Button>
// </Grid>
// </MuiPickersUtilsProvider>
// <ResponsiveContainer width="100%" aspect="3">

// <LineChart
//   width={300}
//   height={100}
//   data={data}
//   margin={{
//     top: 90,
//     right: 30,
//     left: 20,
//     bottom: 5,
//   }}
// >
//   <CartesianGrid strokeDasharray="2 2" horizontal="" vertical=""/>
//   <XAxis dataKey="Date" />
//   <YAxis />
//   <Tooltip contentStyle={{ backgroundColor: "#8884d8", color: "#fff" }} itemStyle={{ color: "#fff" }} cursor={false} />
//   <Legend />
//   <Line type="monotone" dataKey="Total" dot={{fill:"#2e4355",stroke:"#8884d8",strokeWidth: 2,r:5}} activeDot={{fill:"#2e4355",stroke:"#8884d8",strokeWidth: 5,r:10}} strokeWidth="2" />
// </LineChart>
// </ResponsiveContainer>
// </Form>
//    </>
// )
// })

//   if(data === null ){
//     return <div>No Data</div>

//    }
//     if(data === undefined){
//         return <div>
//             <Spinner/>
//         </div>
//       }

//       if(data.length === 0){
//         toast.warn('No Data between the given Dates')
//         return <div className="content-wrapper iframe-mode" data-widget="iframe" data-loading-screen={750}>
//           <DisplayData/>
//         </div>

//       }
//     return(
//         <div className="content-wrapper iframe-mode" data-widget="iframe" data-loading-screen={750}>
//          <DisplayData/>
//         </div>
//     )
// }
// export default PurchaseCharts;

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
import Spinner from "../../utils/spinner";
import config from "../../utils/config";
import Controls from "../controls/Controls";
import { Grid } from "@material-ui/core";
import { useForm, Form } from "../../components/home/useForm";
import "date-fns";
import { format } from "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import "../../utils/styles.css";

const initialFValues = {
  datefrom: "2019-1-10 00:00:00",
  dateto: "2022-1-10 00:00:00",
};
const PurchaseCharts = (props) => {
  const userSessionContext = React.useContext(UserSessionContext);
  const [data, setData] = useState();

  let newDate = format(new Date(), "yyyy-MM-dd HH:mm:ss");
  
  const [datefrom, setDatefrom] = useState("2017-01-01 00:00:00");
  const [dateto, setDateto] = useState(newDate);
  const { values } = useForm(initialFValues);

  const handleDateFromChange = (date) => {
    setDatefrom(date);
  };
  const handleDateToChange = (date) => {
    setDateto(date);
  };

  React.useEffect(async () => {
    await axios
      .get(
        `${config.APP_CONFIG}/Purchase/PurchaseSummaryList/api/${datefrom}/${dateto}`,
        {
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
        } else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
        } else {
          toast.error("Couldn't load data");
          setData([]);
        }
      })
      .catch((err) => {
        toast.error("Error occurred");
        setData([]);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    getData(values.datefrom, values.dateto);
  };

  const getData = async(datefrom, dateto) => {
   await axios
      .get(
        `${config.APP_CONFIG}/Purchase/PurchaseSummaryList/api/${datefrom}/${dateto}`,
        {
          headers: {
            Authorization: userSessionContext.token,
          },
        }
      )
      .then((res) => {
        if (res.data.status_code === 200) {
          setData(res.data.msg);
        } else if (res.data.status_code === 400) {
          userSessionContext.handleLogout();
        } else {
          toast.warn("Couldn't load data");
          setData([]);
        }
      })
      .catch((err) => {
        toast.error("Error occurred");
        setData([]);
      });
  };

  const DisplayData = () => {
    return (
      <>
        <Form onSubmit={handleSubmit}>
          {/* onSubmit={(e) => { 
             e.preventDefault();
          }}
       > */}
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justifyContent="center">
              <Grid item xs={3}>
                <Controls.DatePicker
                  name="dateFrom"
                  label="DateFrom"
                  value={datefrom}
                  // onChange={handleInputChange}
                  onChange={(date) => handleDateFromChange(date)}
                />
              </Grid>
              <Grid item xs={3}>
                <Controls.DatePicker
                  name="dateTo"
                  label="DateTo"
                  value={dateto}
                  onChange={(date) => handleDateToChange(date)}
                />
              </Grid>
              {/* <Controls.Button
                type="submit"
                text="Submit"
                // onClick={(e) => {
                //   e.preventDefault();
                //  let res_value = {
                //    "dateFrom" : values.dateFrom,
                //    "dateTo": values.dateTo
                //  }
                // console.log(res_value)
                //  getData()
                // }}
              ></Controls.Button> */}
            </Grid>
          </MuiPickersUtilsProvider>
          <ResponsiveContainer width="100%" aspect="3">
            <LineChart
              width={300}
              height={100}
              data={data}
              margin={{
                top: 90,
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

  // if (data === undefined) {
  //   return (
  //     <div>
  //       <Spinner />
  //     </div>
  //   );
  // }

  if (data === undefined) {
    return <Spinner msg="loading chart..." />;
  }
  if (data.length === 0) {
    toast.warn("No Data between the given Dates");
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
export default PurchaseCharts;

// import axios from "axios";
// import React, { useState } from "react";
// import UserSessionContext from "../../contexts/UserSessionContext";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import { toast } from "react-toastify";
// import Spinner from "../../utils/spinner";
// import config from "../../utils/config";
// import Controls from "../controls/Controls";
// import { useForm, Form } from "../../components/home/useForm";
// import { Grid } from "@material-ui/core";
// import { format } from "date-fns";
// import "date-fns";
// import DateFnsUtils from "@date-io/date-fns";
// import {
//   MuiPickersUtilsProvider,
//   DatePicker,
//   KeyboardTimePicker,
//   KeyboardDatePicker,
// } from "@material-ui/pickers";

// const PurchaseCharts = () => {
//   const userSessionContext = React.useContext(UserSessionContext);
//   const [data, setData] = useState();
//   // const [datefrom, setDatefrom] = useState(new Date("2019-09-11T12:00:00.000Z").toISOString().split('.')[0].replace('Z', '').replace('T', ' '));
//   // const [dateto, setDateto] = useState(new Date("2021-09-11T12:00:00.000Z").toISOString().split('.')[0].replace('Z', '').replace('T', ' '));
//   let newDate = format(new Date(), "yyyy-MM-dd HH:mm:ss");
//   // console.log(date.setMonth(date.getMonth()-1))
//   const [datefrom, setDatefrom] = useState("2017-01-01 00:00:00");
//   const [dateto, setDateto] = useState(newDate);

//   const handleDateFromChange = (date) => {
//     setDatefrom(date);
//   };
//   const handleDateToChange = (date) => {
//     setDateto(date);
//   };

//   React.useEffect(() => {
//     axios
//       .get(
//         `${config.APP_CONFIG}/Purchase/PurchaseSummaryList/api/${datefrom}/${dateto}`
//       )
//       .then((res) => {
//         if (res.data.status_code === 200) {
//           setData(res.data.msg);
//         } else if (res.data.status_code === 401) {
//           userSessionContext.handleLogout();
//         }
//         else if (res.data.status_code === 400) {
//           toast.warn(res.data.msg)
//         }
//         else {
//           toast.error("Couldn't load data");
//           setData([]);
//         }
//       })
//       .catch((err) => {
//         toast.error("Error occurred");
//         setData([]);
//       });
//   }, []);

//   const DisplayData = () => {
//     return (
//       <>
//         <Form
//           onSubmit={(e) => {
//             e.preventDefault();
//           }}
//         >
//           <MuiPickersUtilsProvider utils={DateFnsUtils}>
//             <Grid
//               container
//               justify="space-front"
//               columnSpacing={{ xs: 1, sm: 2, md: 3 }}
//             >
//               <Grid item xs={3}>
//                 <DatePicker
//                   //disableToolbar
//                   disableFuture
//                   autoOk
//                   id='date-picker'
//                   variant="inline"
//                   format="MM/dd/yyyy"
//                   margin="normal"
//                   placeholder="MM/DD/YYYY"
//                   // id='date-picker'
//                   label="Date From"
//                   value={datefrom}
//                   onChange={(date) => handleDateFromChange(date)}
//                   KeyboardButtonProps = {{
//                                     'arial-label' : 'change date'
//                                 }}
//                 ></DatePicker>
//               </Grid>
//               <Grid item xs={3}>
//                 <DatePicker
//                   // disableToolbar
//                   disableFuture
//                   autoOk="true"
//                   variant="inline"
//                   format="MM/dd/yyyy"
//                   placeholder="yyyy/MM/dd"
//                   margin="normal"
//                   id="date-picker"
//                   label="Date To"
//                   value={dateto}
//                   onChange={(date) => handleDateToChange(date)}
//                   KeyboardButtonProps={{
//                     "arial-label": "change date",
//                   }}
//                 ></DatePicker>
//               </Grid>
//               <Controls.Button
//                 type="submit"
//                 text="Submit"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   axios
//                     .get(
//                       `${config.APP_CONFIG}/Purchase/PurchaseSummaryList/api/${datefrom}/${dateto}`
//                     )
//                     .then((res) => {
//                       if (res.data.status_code === 200) {
//                         setData(res.data.msg);
//                       } else if (res.data.status_code === 401) {
//                         userSessionContext.handleLogout();
//                       }
//                       else if (res.data.status_code === 400) {
//                           toast.warn(res.data.msg)
//                       }
//                       else {
//                         toast.error("Couldn't load data");
//                         setData([]);
//                       }
//                     })
//                     .catch((err) => {
//                       toast.error("Error occurred");
//                       setData([]);
//                     });
//                 }}
//               ></Controls.Button>
//             </Grid>
//           </MuiPickersUtilsProvider>
//           <ResponsiveContainer width="100%" aspect="3">
//             <LineChart
//               width={300}
//               height={100}
//               data={data}
//               margin={{
//                 top: 5,
//                 right: 30,
//                 left: 20,
//                 bottom: 5,
//               }}
//             >
//               <CartesianGrid strokeDasharray="2 2" horizontal="" vertical="" />
//               <XAxis dataKey="Date" />
//               <YAxis />
//               <Tooltip
//                 contentStyle={{ backgroundColor: "#8884d8", color: "#fff" }}
//                 itemStyle={{ color: "#fff" }}
//                 cursor={false}
//               />
//               <Legend />
//               <Line
//                 type="monotone"
//                 dataKey="Total"
//                 dot={{
//                   fill: "#2e4355",
//                   stroke: "#8884d8",
//                   strokeWidth: 2,
//                   r: 5,
//                 }}
//                 activeDot={{
//                   fill: "#2e4355",
//                   stroke: "#8884d8",
//                   strokeWidth: 5,
//                   r: 10,
//                 }}
//                 strokeWidth="2"
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </Form>
//       </>
//     );
//   };

//   if (data === undefined) {
//     return (
//       <div>
//         <DisplayData />
//       </div>
//     );
//   }
//   if (data.length === 0) {
//     return (
//       <div
//         className="content-wrapper iframe-mode"
//         data-widget="iframe"
//         data-loading-screen={750}
//       >
//         <DisplayData />
//       </div>
//     );
//   }
//   return (
//     <div
//       className="content-wrapper iframe-mode"
//       data-widget="iframe"
//       data-loading-screen={750}
//     >
//       <DisplayData />
//     </div>
//   );
// };
// export default PurchaseCharts;
