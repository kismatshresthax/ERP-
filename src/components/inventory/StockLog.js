import React, { useState } from "react";
import { toast } from "react-toastify";
import { Route } from "react-router-dom";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Controls from "../controls/Controls";
import CardHeader from "@material-ui/core/CardHeader";

import { useForm, Form } from "../../components/home/useForm";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";

import ReactToPrint from "react-to-print";
import * as XLSX from "xlsx";

import * as XlsxPopulate from "xlsx-populate/browser/xlsx-populate";
//import ReactExport from "react-export-excel";
import axios from "axios";
import Select from "react-select";
import PrintIcon from "@mui/icons-material/Print";
import config from "../../utils/config";
//import UserAuthenticationContext from "../../contexts/UserAuthenticationContext";

import UserSessionContext from "../../contexts/UserSessionContext";
import CompanyContext from "../../contexts/CompanyContext";

import { format } from "date-fns";

import "date-fns";
import ReportHeader from "../reports/ReportHeader";
//import * as XLSX from 'xlsx/xlsx.mjs';
const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: "white",
    color: "#546e7a",
    justifyContent: "left",
    padding: "10px 0px",
    fontWeight: "bold",
  },
  content: {
    padding: 0,
  },
  status: {
    marginRight: "5px",
  },
  actions: {
    justifyContent: "flex-end",
  },
  summaryTable: {
    width: "auto",
    marginBottom: "10px",
    pointerEvents: "none",
  },
  noBorder: {
    border: "none",
  },
  denseCell: {
    padding: "5px",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  inputGroup: {
    marginBottom: theme.spacing(1),
  },
}));
const initialFValues = {
  dateFrom: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
  dateTo: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
};
const search_data=[
  {
    "label":"all",
     "value":1,
  },
  
 
{
    "label":"category",
    "value":2,
},
{
  "label":"Product",
  "value":3,
},
 {
    "label":"Warehouse",
     "value":4,
 },



]
const ops=[{
    label:"all",
    value:0,
},]
export default function StockLog() {
  const { values, handleInputChange } = useForm(initialFValues);
  const [searchData, setSearchData] = useState(search_data||[]);
  const [search, setSearch] = useState([]);
  const [List, setList] = useState([]);
  const [all, setAll] = useState("");
  const classes = useStyles();
  const componentRef = React.useRef(null);
  const [records, setRecords] = useState([]);
  const userSessionContext = React.useContext(UserSessionContext);
  const companyContext = React.useContext(CompanyContext);
  var adbs = require("ad-bs-converter");
  const date_of_sales_nepali = format(new Date(values.dateFrom), "yyyy/MM/dd ");
  const date_nepali = format(new Date(values.dateTo), "yyyy/MM/dd ");
  const [issubmit, setSubmit] = useState(false);
  const [Loading, setLoading] = useState(false);
  const nepalidate = adbs.ad2bs(date_of_sales_nepali);
  const nepali = adbs.ad2bs(date_nepali);
  React.useEffect(() => {
    if (searchData.label!== undefined) {
   
    loaddataById(searchData.label);
    
}
}, [searchData])


const loaddataById = async (type) => {
   
    if(type==="Product"){
    await axios.get(
        `${config.APP_CONFIG}/Products/product/Api`,
        {
          headers: { Authorization: userSessionContext.token },
        }
      )
      .then((res) => {
        if (res.data && res.data.status_code && res.data.status_code === 200) {
          let temp = res.data.msg.map((name, index) => ({
            label: name.productname,
            value: name.id,
          }));
          setList(temp);
        
        } else {
          toast.error("Cannot load .");
          setList([]);
        }
      })
      .catch((err) => {
        // toast.error("failed to load units");
        setList([]);
      });
  }

   if(type==="category")
    {
        await axios.get(
            `${config.APP_CONFIG}/Products/ProductCategory/api`,
            {
              headers: { Authorization: userSessionContext.token },
            }
          )
          .then((res) => {
            if (res.data && res.data.status_code && res.data.status_code === 200) {
              let temp = res.data.msg.map((name, index) => ({
                label: name.categoryName,
                value: name.id,
              }));
              setList(temp);
            
            } else {
              toast.error("Cannot load.");
              setList([]);
            }
          })
          .catch((err) => {
         
            setList([]);
          });
      }
      else if(type==="Warehouse"){
        await axios.get(
          `${config.APP_CONFIG}/stock/warehouse/api`,
          {
            headers: { Authorization: userSessionContext.token },
          }
        )
        .then((res) => {
          if (res.data && res.data.status_code && res.data.status_code === 200) {
            let temp = res.data.msg.map((name, index) => ({
              label: name.warehouse,
              value: name.id,
            }));
            setList(temp);
          
          } else {
            toast.error("Cannot load ");
            setList([]);
          }
        })
        .catch((err) => {
          // toast.error("failed to load units");
          setList([]);
        });
      }
    
    else{
      if(type==="all")
{
  setAll("all");
}
    
}
}

  const miti =
    nepalidate.en["year"] +
    "/" +
    nepalidate.en["month"] +
    "/" +
    nepalidate.en["day"];
  const miti1 =
    nepali.en["year"] + "/" + nepali.en["month"] + "/" + nepali.en["day"];

  const handleSubmit = (e) => {
    e.preventDefault();

    e.preventDefault();
    if(searchData.length===0){
      toast.warn("Please Enter Search ");
    }
 
    else if(all==="all"){

      let _data = {
        dateFrom: format(new Date(values.dateFrom), "yyyy-MM-dd"),
        dateTo: format(new Date(values.dateTo), "yyyy-MM-dd"),
       // companyId: companyContext.company.id,
       searchType:searchData.label,
       searchData:0
      };
    
      axios.post(`${config.APP_CONFIG}/Stock/StockLog`, _data, {
          headers: { Authorization: userSessionContext.token },
        })
        .then((res) => {
          if (res.data.status_code === 200) {
           
            if(res.data.msg.length<1){
              toast.warn("No Records")
            }
            else{
              setRecords(res.data.msg);
              setLoading(true);
              setSubmit(true)
            }
          
        
          } else if (res.data.status_code === 401) {
        
            userSessionContext.handleLogout();
    
          } else if (res.data.status_code === 400) {
           
            toast.warn(res.data.msg);
          } else {
          
            toast.error("Warning");
          }
        })
        .catch((err) => {
          toast.error("Error");
        });
    setAll("")
    }
  
   else if(search.label.length===0){
      toast.warn("Please Enter Search Type");
    }
    else if(search.label===undefined){
      toast.warn("Please Enter Search Type");
    }
    else{

    let _data = {
      dateFrom: format(new Date(values.dateFrom), "yyyy-MM-dd"),
      dateTo: format(new Date(values.dateTo), "yyyy-MM-dd"),
      //companyId: companyContext.company.id,
      searchType:searchData.label,
      searchData:search.value
    };
  
    axios.post(`${config.APP_CONFIG}/Stock/StockLog`, _data, {
        headers: { Authorization: userSessionContext.token },
      })
      .then((res) => {
        if (res.data.status_code === 200) {
         
          if(res.data.msg.length<1){
            toast.warn("No Records")
          }
          else{
            setRecords(res.data.msg);
            setLoading(true);
            setSubmit(true)
          }
        
        } else if (res.data.status_code === 401) {
      
          userSessionContext.handleLogout();
  
        } else if (res.data.status_code === 400) {
         
          toast.warn(res.data.msg);
        } else {
        
          toast.error("Warning");
        }
      })
      .catch((err) => {
        toast.error("Error");
      });
      setAll("")
  };
}

  // const purchasetotal = Math.round(
  //   records.reduce((total, obj) => obj.Purchase + total, 0),
  //   2
  // );

  
  // const Salestotal = Math.round(
  //   records.reduce((total, obj) => obj.Sales + total, 0),
  //   2
  // );

  // //excelexport

  // const createDownLoadData = () => {
  //   handleExport().then((url) => {
  //     console.log(url);
  //     const downloadAnchorNode = document.createElement("a");
  //     downloadAnchorNode.setAttribute("href", url);
  //     downloadAnchorNode.setAttribute("download", "bl_report.xlsx");
  //     downloadAnchorNode.click();
  //     downloadAnchorNode.remove();
  //   });
  // };

  // const workbook2blob = (workbook) => {
  //   const wopts = {
  //     bookType: "xlsx",
  //     bookSST: false,
  //     type: "binary",
  //   };

  //   const wbout = XLSX.write(workbook, wopts);
  //   const blob = new Blob([s2ab(wbout)], {
  //     type: "application/octet-stream",
  //   });

  //   return blob;
  // };

  // const s2ab = (s) => {
  //   // The ArrayBuffer() constructor is used to create ArrayBuffer objects.
  //   // create an ArrayBuffer with a size in bytes
  //   const buf = new ArrayBuffer(s.length);

  //   console.log(buf);

  //   //create a 8 bit integer array
  //   const view = new Uint8Array(buf);

  //   console.log(view);
  //   //charCodeAt The charCodeAt() method returns an integer between 0 and 65535 representing the UTF-16 code
  //   for (let i = 0; i !== s.length; ++i) {
  //     console.log(s.charCodeAt(i));
  //     view[i] = s.charCodeAt(i);
  //   }

  //   return buf;
  // };
  // const handleExport = () => {
  //   const title = [{ A: "Balance Sheet Report" }];
  //   const dateFrom = [
  //     {
  //       A:
  //         "From: " + format(new Date(values.dateFrom), "yyyy-MM-dd").toString(),
  //     },
  //   ];
  //   const dateTo = [
  //     { A: "To: " + format(new Date(values.dateTo), "yyyy-MM-dd").toString() },
  //   ];

  //   let table1 = [
  //     {
  //       A: "Ledger Name",
  //       B: "Debit",
  //       C: "Credit",
  //     },
  //   ];

  //   let table2 = [
  //     {
  //       A: "Total",
  //       B: drtotal,
  //       C: crtotal,
  //     },
  //   ];

  //   //const total = [{B:'Total'}, {C: drtotal}, {D: crtotal}];

  //   records.map((item) => {
  //     table1.push({
  //       A: item.ledgerName,
  //       B: item.dr_cr === "dr" ? Math.round(item.amount, 2) : 0,
  //       C: item.dr_cr === "cr" ? Math.round(item.amount, 2) : 0,
  //     });
  //   });

  //   table1 = table1.concat(table2);

  //   const finalData = [...title, ...dateFrom, ...dateTo, ...table1];

  //   console.log(finalData);
  //   //create a new workbook
  //   const wb = XLSX.utils.book_new();

  //   const sheet = XLSX.utils.json_to_sheet(finalData, {
  //     skipHeader: true,
  //   });

  //   XLSX.utils.book_append_sheet(wb, sheet, "bl_report");

  //   // binary large object
  //   // Since blobs can store binary data, they can be used to store images or other multimedia files.
  //   const workbookBlob = workbook2blob(wb);

  //   var headerIndexes = [];
  //   finalData.forEach((data, index) =>
  //     data["A"] === "Ledger Name" ? headerIndexes.push(index) : null
  //   );

  //   const totalRecords = records.length;
  //   const dataInfo = {
  //     titleCell: "A1",
  //     titleRange: "A1:C1",
  //     dateFromCell: "A2",
  //     dateFromRange: "A2:C2",
  //     dateToCell: "A3",
  //     dateToRange: "A3:C3",
  //     tbodyRange: `A4:C${finalData.length}`,
  //     theadRange:
  //       headerIndexes?.length >= 1
  //         ? `A${headerIndexes[0] + 1}:C${headerIndexes[0] + 1}`
  //         : null,

  //   };
  //   return addStyle(workbookBlob, dataInfo);
  // };

  // const addStyle = (workbookBlob, dataInfo) => {
  //   return XlsxPopulate.fromDataAsync(workbookBlob).then((workbook) => {
  //     workbook.sheets().forEach((sheet) => {
  //       sheet.usedRange().style({
  //         fontFamily: "Arial",
  //         verticalAlignment: "center",
  //       });

  //       sheet.column("A").width(35);
  //       sheet.column("B").width(25);
  //       sheet.column("C").width(15);

  //       sheet.range(dataInfo.titleRange).merged(true).style({
  //         bold: true,
  //         horizontalAlignment: "center",
  //         verticalAlignment: "center",
  //       });

  //       sheet.range(dataInfo.dateFromRange).merged(true).style({
  //         // bold: true,
  //         horizontalAlignment: "center",
  //         verticalAlignment: "center",
  //       });

  //       sheet.range(dataInfo.dateToRange).merged(true).style({
  //         // bold: true,
  //         horizontalAlignment: "center",
  //         verticalAlignment: "center",
  //       });

  //       if (dataInfo.tbodyRange) {
  //         sheet.range(dataInfo.tbodyRange).style({
  //           horizontalAlignment: "left",
  //         });
  //       }

  //       sheet.range(dataInfo.theadRange).style({
  //         bold: true,
  //         horizontalAlignment: "center",
  //       });

  //     });

  //     return workbook
  //       .outputAsync()
  //       .then((workbookBlob) => URL.createObjectURL(workbookBlob));
  //   });
  // };
  const ReportComponent=()=>{
    return (
    
      <div>
   <ReportHeader title="Stock Log"/>
      <Form onSubmit={handleSubmit}>
      <Grid container direction="row">
          <Grid item lg={12} md={12} xs={12}>
           
              <Card>
                <Grid container>
                  <Grid item xs={12} sm={3}>
                    <label>Search Type </label>
                    <Select
                      defaultValue={searchData}
                      options={search_data}
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                      }}
                      menuPortalTarget={document.body}
                      onChange={setSearchData}
                      // onChange={(e) => {
                      //     setProductId(e);
              
                      //   }}
                    />
                  </Grid>
              {all==="all"?
                  <Grid item xs={12} sm={3}>
                    <label>Search </label>
                    <Select
                    disabled
                    defaultValue={{ label: "all", value: 0 }}
                      options={ops}
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                      }}
                      menuPortalTarget={document.body}
                    //  onChange={setSearch}
                    />
                  </Grid>
                  :    (
                  <Grid item xs={12} sm={3}>
                    <label>Search </label>
                    <Select
                      defaultValue={search}
                      options={List}
                      
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                      }}
                      menuPortalTarget={document.body}
                      onChange={setSearch}
                    />
                  </Grid>
                  )
}
                  <Grid item xs={12} sm={3}>
                    <label
                      htmlFor="text"
                      style={{
                        paddingTop: "0",
                        marginLeft: "4px",
                        width: "100%",
                      }}
                      className="col-sm-12 col-form-label"
                    >
                      Date From
                    </label>
                    <Controls.DatePicker
                      name="dateFrom"
                      value={values.dateFrom}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <label
                      htmlFor="text"
                      style={{
                        paddingTop: "0",
                        marginLeft: "4px",
                        width: "100%",
                      }}
                      className="col-sm-12 col-form-label"
                    >
                      Date To
                    </label>
                    <Controls.DatePicker
                      name="dateTo"
                      value={values.dateTo}
                      onChange={handleInputChange}
                    />
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sm={3}
                    style={{ display: "flex", margin: "5px 0" }}
                  >
                    <Controls.Button type="submit" text="Submit" />
                  </Grid>
                </Grid>
              </Card>
           
          </Grid>
        </Grid>
        </Form>
      </div>
   
    
          )
          }
  return (
    <div
      className="content-wrapper iframe-mode"
      data-widget="iframe"
      data-loading-screen={750}
    >
     
       
   <div>
        {records.length !== 0 ? (
          <button
            style={{
              position: "absolute",
              marginBottom: "10px",
              marginLeft: "1px",
              textAlign: "left",
            }}
            onClick={() => {
              // createDownLoadData();
            }}
            className="btn btn-success btn-sm ml-1"
          >
            Excel Export
          </button>
        ) : <ReportComponent/>}
        {records.length !== 0 ? (
          <div>
            <div style={{ textAlign: "right", marginRight: "10px" }}>
              <ReactToPrint
                pageStyle={"@page{size: landscape;}"}
                trigger={() => (
                  <Controls.Button
                    text="Print"
                    variant="outlined"
                    startIcon={<PrintIcon />}
                    className="printBtn"
                  />
                )}
                content={() => componentRef.current}
              />
            </div>

            <div ref={componentRef} className="salesReport">
              <div className="reportPage">
                <div className="reportHeader">
                  <p className="companyName">{companyContext.company.name}</p>
                  <p className="companyAddress">
                    {companyContext.company.address || ""}
                  </p>
                  <p className="companyPan">
                    Pan No : {companyContext.company.panNo}
                  </p>
                  <p className="companyReport">Stock Log Report</p>
                  <div className="date">
                    <p>
                      From:{" "}
                      {format(
                        new Date(values.dateFrom),
                        "yyyy/MM/dd"
                      ).toString() +
                        " (" +
                        miti.toString() +
                        " B.S.)"}
                    </p>
                    <p>
                      To:{" "}
                      {format(
                        new Date(values.dateTo),
                        "yyyy/MM/dd"
                      ).toString() +
                        " (" +
                        miti1 +
                        " B.S.)"}
                    </p>
                  </div>
                </div>
</div>
                <Paper>
                  <TableContainer>
                    <Table stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell>Date</TableCell>
                          <TableCell>ProductName</TableCell>
                          <TableCell>Warehouse</TableCell>
                          <TableCell>Purchase</TableCell>
                           <TableCell>Sales</TableCell>
                          <TableCell>Transfer</TableCell>
                          <TableCell>Yield</TableCell>
                          <TableCell>Increment</TableCell>
                          <TableCell>Decrement</TableCell>
                          <TableCell>STOCK</TableCell> 
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {records &&
                          records.map((item, idx) => {
                            return (
                              <TableRow key={item.id} hover>
                                <TableCell>
                                  {new Date(
                                    item.transactionDate
                                  ).toLocaleDateString("en-US")}
                                </TableCell>
                                <TableCell>{item.ProductName||""}</TableCell>
                                <TableCell>{item.warehouseName||""}</TableCell>

                                <TableCell>{item.Purchase}</TableCell>
                                <TableCell>{item.Sales}</TableCell>
                                <TableCell>{item.Transfer }</TableCell>
                           
                                <TableCell>{item.Yield }</TableCell>
                                <TableCell style={{color:"green"}}>{item.Increment }</TableCell>
                                <TableCell style={{color:"red"}}>{item.Decrement }</TableCell>
                                <TableCell>{item.Closing||""}</TableCell>
                              </TableRow>
                            );
                          })}
                           
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </div>
            </div>
          // </div>
        ) : (
          <div className="reportNotFound">
      <p >No Records to Display</p>
          </div>
        )}
      </div>
    </div>
  );
}
