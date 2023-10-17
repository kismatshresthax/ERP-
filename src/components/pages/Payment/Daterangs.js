// import TextField from "@mui/material/TextField";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { useState } from "react";
// const DateRange = () => {
//   const [value, setValue] = useState(null);
//   const [todate, setToDate] = useState(null);
//   return (
//     <LocalizationProvider
//       dateAdapter={AdapterDayjs}
//       className="d-flex flex-row gap-2"
//     >
//       <div className="d-flex flex-row gap-2 align-middle">
//         <DatePicker
//           label="From"
//           value={value}
//           onChange={(newValue) => {
//             setValue(newValue);
//           }}
//           renderInput={(params) => <TextField {...params} />}
//         />
//         <p className="my-auto">-</p>
//         <DatePicker
//           label="To"
//           value={todate}
//           onChange={(newValue) => {
//             setToDate(newValue);
//           }}
//           renderInput={(params) => <TextField {...params} />}
//         />
//       </div>
//     </LocalizationProvider>
//   );
// };
// export default DateRange;
