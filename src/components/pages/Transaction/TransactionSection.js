import { Card, CardContent, Tab, TextField, styled } from "@mui/material";
import { TabPanel, TabList, TabContext } from "@mui/lab";
import TransactionTable from "./TransactionTable";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import jsonData from "./TransactionData.json";
import ExcelFile from "../Excel/Excelfile";
import { BsThreeDotsVertical } from "react-icons/bs";
import { jsPDF } from "jspdf";
import { useRef } from "react";
import {BsFiletypePdf} from 'react-icons/bs'


const TransactionSection = () => {
  // Table Export 

  const componentPDF = useRef();

  const generatePDF = () => {
    const doc = new jsPDF({
      format: "a3 ",
      unit: "px"
    });
    doc.html(componentPDF.current, {
      async callback(doc) {
        await doc.save("Transaction FIle");
      }
    });
  };

  //Table Tabs
  const [value, setValue] = useState("all");
  const [all, setAll] = useState(jsonData);


  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };
  const filteredData = (Stats) => {
    const updatedData = jsonData.filter((items) => {
      return items.Status === Stats;
    });
    setAll(updatedData);
  };
  


  return (
    <Card className="d-flex flex-column" >
      <CardContent>
        <div className="d-flex flex-column gap-2">
          <div>
            <span className="d-flex flex-row justify-content-between">
              <p className="text-secondary fs-5 text-uppercase fw-semibold">
                Transaction List
              </p>
              <span className={all.length === 0 ?"d-none" : "d-flex flex-row gap-2"}>
                <ExcelFile data={all} />
                <button
                  className="btn btn-primary btn-sm text-white fw-bold fs-4 d-flex mx-auto my-auto"
                  onClick={(e) => generatePDF(e)}
                >
                  <BsFiletypePdf/>
                </button>
              </span>
              </span>
          </div>
        </div>
      </CardContent>
      <TabContext value={value}>
            <TabList onChange={handleChange} aria-label="lab API tabs example" className="position-relative">
              <Tab label="All" value="all" />
              <Tab
                label="Sale"
                value="sale"
                onClick={() => filteredData("Sales")}
              />
              <Tab
                label="Purchase"
                value="purchase"
                onClick={() => filteredData("Purchased")}
              />
              <span className="d-flex flex-row gap-1 position-absolute end-0 ">
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date"
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField size="small" {...params} />
                    )}
                  />
                </LocalizationProvider> */}
                <BiSearch
                  className="d-flex fs-4  my-auto  fw-semibold "
                  style={{ color: "#5e52a5", cursor: 'pointer' }}
                />
              </span>
            </TabList>
            <TabPanel value="all" useRef={componentPDF} >
              <TransactionTable data={jsonData} />
            </TabPanel>
            <TabPanel value="sale" useRef={componentPDF}>
              <TransactionTable data={all} />
            </TabPanel>
            <TabPanel value="purchase" useRef={componentPDF}>
              <TransactionTable data={all} />
            </TabPanel>
          </TabContext>

    </Card>
  );
};
export default TransactionSection;
