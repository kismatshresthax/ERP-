import React, { useState, useEffect } from "react";
//import ReactExport from "react-export-excel";
import { toast } from "react-toastify";
import { Route } from "react-router-dom";
// Material UI

import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";

import Controls from "../../controls/Controls";


import * as XLSX from "xlsx";
import * as XlsxPopulate from "xlsx-populate/browser/xlsx-populate";
import Spinner from "../../../utils/spinner";

import { useForm, Form } from "../../home/useForm";
import ReactToPrint from "react-to-print";
import axios from "axios";
import config from "../../../utils/config";

import UserSessionContext from "../../../contexts/UserSessionContext";

import { format } from "date-fns";
import "date-fns";
import CompanyContext from "../../../contexts/CompanyContext";
import PrintIcon from "@mui/icons-material/Print";

import Select from "react-select";
import ReportHeader from "../../reports/ReportHeader";

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
  companyId: "",
};
const search_data=[
  {
    "label":"all",
     "value":1,
  },
  
  {
    "label":"items",
    "value":2,
},
{
    "label":"category",
    "value":3,
},
 {
    "label":"customer",
     "value":4,
 },



]
export default function SalesReportByProduct() {
  const componentRef = React.useRef(null);
  const { values, handleInputChange } = useForm(initialFValues);
  const userSessionContext = React.useContext(UserSessionContext);
  const companyContext = React.useContext(CompanyContext);
  const companyId = companyContext.company.id;
  // let history = useHistory();
  const classes = useStyles();
  const [records, setRecords] = useState([]);
  const thStyle = {
    fontSize: 'small',
    fontWeight: 'bold',
  };
  // const [productList, setProductList] = useState([]);
  const [Data, setData] = useState([]);
  const [voidData, setVoidData] = useState([]);
  const [searchData, setSearchData] = useState(search_data||[]);
  const [search, setSearch] = useState([]);
  const [all, setAll] = useState("");
  const [Category, setCategory] = useState([]);
  const [List, setList] = useState([]);


  var adbs = require("ad-bs-converter");
  useEffect(() => {
    if (searchData.label!== undefined) {
   
    loaddataById(searchData.label);
    
}
}, [searchData])
const loaddataById = async (type) => {
   
    if(type==="items"){
    await axios.get(
        `${config.APP_CONFIG}/Sales/GetSalesProduct/api`,
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
          toast.error("Cannot load Unit Measurement.");
          setList([]);
        }
      })
      .catch((err) => {
        // toast.error("failed to load units");
        setList([]);
      });
  }

  else if(type==="category")
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
            // toast.error("failed to load units");
            setList([]);
          });
      }
      else if(type==="customer"){
        await axios.get(
          `${config.APP_CONFIG}/usersApi/Users/customer`,
          {
            headers: { Authorization: userSessionContext.token },
          }
        )
        .then((res) => {
          if (res.data && res.data.status_code && res.data.status_code === 200) {
            let temp = res.data.msg.map((name, index) => ({
              label: name.username,
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


  const handleSubmit = (e) => {

    e.preventDefault();
    if(searchData.length===0){
      toast.warn("Please Enter Search ");
    }
    // if(search.length===0){
    //   toast.warn("Please Enter Search Type");
    // }
   else if(search.label.length===0){
      toast.warn("Please Enter Search Type");
    }
    else if(search.label===undefined){
      toast.warn("Please Enter Search Type");
    }
    else if(all==="all"){

      let _data = {
        dateFrom: format(new Date(values.dateFrom), "yyyy-MM-dd"),
        dateTo: format(new Date(values.dateTo), "yyyy-MM-dd"),
        companyId: companyContext.company.id,
        reportType:searchData.label,
       id:0
      };
    
      axios.post(`${config.APP_CONFIG}/Sales/Report/api/byDate`, _data, {
          headers: { Authorization: userSessionContext.token },
        })
        .then((res) => {
          if (res.data.status_code === 200) {
           
            setRecords(res.data.msg);
    
        
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
    
    }
    
    else{

    let _data = {
      dateFrom: format(new Date(values.dateFrom), "yyyy-MM-dd"),
      dateTo: format(new Date(values.dateTo), "yyyy-MM-dd"),
      companyId: companyContext.company.id,
      reportType:searchData.label,
     id:search.value
    };
  
    axios.post(`${config.APP_CONFIG}/Sales/Report/api/byDate`, _data, {
        headers: { Authorization: userSessionContext.token },
      })
      .then((res) => {
        if (res.data.status_code === 200) {
         
          setRecords(res.data.msg);
  
      
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
  
  };
}

  



if (records === undefined) {
  return <Spinner />;
}
  
if (Data === undefined) {
  return <Spinner />;
}

  const productcost_total = records
    .reduce((total, obj) => obj.productcost + total, 0)
    .toFixed(2);
  const quantity_total = records
    .reduce((total, obj) => obj.productQTY + total, 0)
    .toFixed(2);
  const totalsales_total = records
    .reduce((total, obj) => obj.producttotal + total, 0)
    .toFixed(2);
  const discount_total = records
    .reduce((total, obj) => obj.discount + total, 0)
    .toFixed(2);
  const Taxable_total = parseFloat(totalsales_total - discount_total).toFixed(
    2
  );
  const tax_total = records
    .reduce((total, obj) => obj.taxAmount + total, 0)
    .toFixed(2);


    //sales return 
    const total_sales_return= Data
    .reduce((total, obj)=> obj.producttotal + total, 0)
    .toFixed(2);

    const total_discount_return= Data
    .reduce((total, obj)=> obj.discount + total, 0)
    .toFixed(2);

    const total_taxableamount_return= Data
    .reduce((total, obj)=> parseFloat(obj.producttotal - obj.discount) + total, 0)
    .toFixed(2);

    const total_vat_return= Data
    .reduce((total, obj)=> obj.taxAmount + total, 0)
    .toFixed(2);

//granttotal

const grand_total=totalsales_total-total_sales_return;
const grand_total_discount=discount_total-total_discount_return;
const grand_total_taxableamount=Taxable_total-total_taxableamount_return;
const grand_total_vat=tax_total-total_vat_return;

  //  const ts = data.reduce((total, obj) => obj.ts + total, 0);
  //  console.log(q_total);
  //console.log( NepaliDate(format(new Date(values.dateFrom), "yyyy-MM-dd")),"YYYY-MM-DD");

  const date_of_sales_nepali = format(new Date(values.dateFrom), "yyyy/MM/dd ");
  const date_nepali = format(new Date(values.dateTo), "yyyy/MM/dd ");

  const nepalidate = adbs.ad2bs(date_of_sales_nepali);
  const nepali = adbs.ad2bs(date_nepali);
  const miti =
    nepalidate.en["year"] +
    "/" +
    nepalidate.en["month"] +
    "/" +
    nepalidate.en["day"];
  const miti1 =
    nepali.en["year"] + "/" + nepali.en["month"] + "/" + nepali.en["day"];

  //excel export
  const createDownLoadData = () => {
    handleExport().then((url) => {
      // console.log(url);
      const downloadAnchorNode = document.createElement("a");
      downloadAnchorNode.setAttribute("href", url);
      downloadAnchorNode.setAttribute("download", "sales_report.xlsx");
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    });
  };

  const workbook2blob = (workbook) => {
    const wopts = {
      bookType: "xlsx",
      bookSST: false,
      type: "binary",
    };

    const wbout = XLSX.write(workbook, wopts);
    const blob = new Blob([s2ab(wbout)], {
      type: "application/octet-stream",
    });

    return blob;
  };

  const s2ab = (s) => {
    // The ArrayBuffer() constructor is used to create ArrayBuffer objects.
    // create an ArrayBuffer with a size in bytes
    const buf = new ArrayBuffer(s.length);

    // console.log(buf);

    //create a 8 bit integer array
    const view = new Uint8Array(buf);

    // console.log(view);
    //charCodeAt The charCodeAt() method returns an integer between 0 and 65535 representing the UTF-16 code
    for (let i = 0; i !== s.length; ++i) {
      // console.log(s.charCodeAt(i));
      view[i] = s.charCodeAt(i);
    }

    return buf;
  };
  const handleExport = () => {

    const company = [{ A: companyContext.company.name }];
    const address = [{ A: companyContext.company.address || "Address" }];
    const panNo = [{ A: "Pan No:" + companyContext.company.panNo }];
    const title = [{ A: "VAT Sales Register Report" }];
    const dateFrom = [
      {
        A:
          "From: " + format(new Date(values.dateFrom), "yyyy-MM-dd").toString(),
      },
    ];
    const dateTo = [
      { A: "To: " + format(new Date(values.dateTo), "yyyy-MM-dd").toString() },
    ];
   // const salesReturn = [{ G: "Sales Return" }];
    //onst Void = [{ G: "Void" }];


    let table1 = [
      {
        A: "S.N.",
        B: "Date",
        C: "Miti",
        D: "Invoice Number",
        E: "Buyer Name",
        F: "Buyer PAN",
        G: "Item Name",
        H: "Quantity",
        I: "Cost",
        J: "Unit",
        K: "Total Sales",
        L: "Discount",
        M: "Taxable Amount",
        N: "VAT",
        O: "Export Sales",
        P: "Country",
        Q: "Pragyapan Patra No.",
        R: "Pragyapan Patra Miti",
      },
    ];

    let table2 = [
      {
        G: "Total",
        // H: quantity_total,
        // I: productcost_total,
        K: totalsales_total,
        L: discount_total,
        M: Taxable_total,
        N: tax_total,
      }
    ];
    let table3 = [{

    }];

    // let table4 = [{
    //   G: "Total Void",
    //   // H: quantity_total,
    //   // I: productcost_total,
   
    // }];

     let table5 = [{

     }];

    // let table6 = [{
    //   G: "Total Return",
    //   // H: quantity_total,
    //   // I: productcost_total,
    //   K: "-" + total_sales_return,
    //   L: "-" + total_discount_return,
    //   M: "-" + total_taxableamount_return,
    //   N: "-" + total_vat_return,
    // }];

    let table7 = [{
      G: "Grandtotal",
      // H: quantity_total,
      // I: productcost_total,
      K: grand_total,
      L: grand_total_discount,
      M: grand_total_taxableamount,
      N: grand_total_vat,
    }];

    records.map((item, index) => {
      table1.push({
        A: index + 1,
        B: format(new Date(item.dateOfSales), "yyyy/MM/dd  HH:mm:ss"),
        C:
          adbs.ad2bs(format(new Date(item.dateOfSales), "yyyy/MM/dd ")).en[
            "year"
          ] +
          "/" +
          adbs.ad2bs(format(new Date(item.dateOfSales), "yyyy/MM/dd ")).en[
            "month"
          ] +
          "/" +
          adbs.ad2bs(format(new Date(item.dateOfSales), "yyyy/MM/dd ")).en[
            "day"
          ],
        D: item.bill_no,
        E: item.customerName,
        F: item.panNo,
        G: item.productName,
        H: item.productQTY,
        I: item.productcost,
        J: item.unitName,
        K: item.productTotal,
        L: item.discount,
        M: parseFloat(item.producttotal - item.discount),
        N: item.taxAmount,
        O: item.expsales,
        P: item.country,
        Q: item.num,
        R: item.pragmiti,
      });
    });


    // Void.map((item, index)=>{
    //   table3.push({
    //     A:index+1,
     
    //   })
    // })

    Data.map((item, index) => {
      table5.push({
        A: index + 1,
        B: format(new Date(item.dateOfSales), "yyyy/MM/dd  HH:mm:ss"),
        C:
        adbs.ad2bs(
          format(new Date(item.dateOfSales), "yyyy/MM/dd ")
        ).en["year"] +
          "/" +
          adbs.ad2bs(
            format(new Date(item.dateOfSales), "yyyy/MM/dd ")
          ).en["month"] +
          "/" +
          adbs.ad2bs(
            format(new Date(item.dateOfSales), "yyyy/MM/dd ")
          ).en["day"],
        D: item.refBillNo,
        E: item.customerName,
        G: item.productName,
        H: item.productQTY,
        K: item.producttotal,
        // J: item.unitName,
        L: item.discount,
        M: parseFloat(item.producttotal - item.discount),
        N: item.taxAmount,
    
      });
    })


    table1 = table1.concat(table2)
   // .concat(Void)
    .concat(table3)
    // .concat(table4)
    // .concat(salesReturn)
    // .concat(table5)
    // .concat(table6)
    .concat(table7);

    const finalData = [
      ...company,
      ...address,
      ...panNo,
      ...title,
      ...dateFrom,
      ...dateTo,
      ...table1,
    ];

    
    //create a new workbook
    const wb = XLSX.utils.book_new();

    const sheet = XLSX.utils.json_to_sheet(finalData, {
      skipHeader: true,
    });

    XLSX.utils.book_append_sheet(wb, sheet, "sales_report");

    // binary large object
    // Since blobs can store binary data, they can be used to store images or other multimedia files.
    const workbookBlob = workbook2blob(wb);

    var headerIndexes = [];
    finalData.forEach((data, index) =>
      data["A"] === "S.N." ? headerIndexes.push(index) : null
    );

    const dataInfo = {
      companyCell: "A1",
      companyRange: "A1:R1",
      addressCell: "A2",
      addressRange: "A2:R2",
      panCell: "A3",
      panRange: "A3:R3",
      titleCell: "A4",
      titleRange: "A4:R4",
      dateFromCell: "A5",
      dateFromRange: "A5:R5",
      dateToCell: "A6",
      dateToRange: "A6:R6",
      tbodyRange: `A7:R${finalData.length}`,
      theadRange:
        headerIndexes?.length >= 1
          ? `A${headerIndexes[0] + 1}:R${headerIndexes[0] + 1}`
          : null,
    };
    return addStyle(workbookBlob, dataInfo);
  };

  const addStyle = (workbookBlob, dataInfo) => {
    return XlsxPopulate.fromDataAsync(workbookBlob).then((workbook) => {
      workbook.sheets().forEach((sheet) => {
        sheet.usedRange().style({
          fontFamily: "Arial",
          verticalAlignment: "center",
        });

        sheet.column("A").width(10);
        sheet.column("B").width(30);
        sheet.column("C").width(10);
        sheet.column("D").width(10);
        sheet.column("E").width(20);
        sheet.column("F").width(20);
        sheet.column("G").width(25);
        sheet.column("H").width(10);
        sheet.column("I").width(10);
        sheet.column("J").width(10);
        sheet.column("K").width(10);
        sheet.column("L").width(10);
        sheet.column("M").width(10);
        sheet.column("N").width(10);
        sheet.column("O").width(10);
        sheet.column("P").width(10);
        sheet.column("Q").width(10);
        sheet.column("R").width(10);

        sheet.range(dataInfo.companyRange).merged(true).style({
          bold: true,
          horizontalAlignment: "center",
          verticalAlignment: "center",
        });

        sheet.range(dataInfo.addressRange).merged(true).style({
          // bold: true,
          horizontalAlignment: "center",
          verticalAlignment: "center",
        });

        sheet.range(dataInfo.panRange).merged(true).style({
          // bold: true,
          horizontalAlignment: "center",
          verticalAlignment: "center",
        });

        sheet.range(dataInfo.titleRange).merged(true).style({
          bold: true,
          horizontalAlignment: "center",
          verticalAlignment: "center",
        });

        sheet.range(dataInfo.dateFromRange).merged(true).style({
          // bold: true,
          horizontalAlignment: "center",
          verticalAlignment: "center",
        });

        sheet.range(dataInfo.dateToRange).merged(true).style({
          // bold: true,
          horizontalAlignment: "center",
          verticalAlignment: "center",
        });

        if (dataInfo.tbodyRange) {
          sheet.range(dataInfo.tbodyRange).style({
            horizontalAlignment: "left",
          });
        }
        sheet.range(dataInfo.theadRange).style({
          bold: true,
          horizontalAlignment: "center",
        });
      });

      return workbook
        .outputAsync()
        .then((workbookBlob) => URL.createObjectURL(workbookBlob));
    });
  };

  return (
    <div
     
    >
     
    
        <div>
        <ReportHeader title="Sales Report By Product"/>
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
  
      {records.length !== 0 ? (
        <button
          style={{
            position: "absolute",
            marginLeft: "0px",
            textAlign: "left",
          }}
          onClick={() => {
            createDownLoadData();
          }}
          className="btn btn-success btn-sm ml-1"
        >
          Excel Export
        </button>
      ) : 
      null}
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
                <p className="companyReport"> Sales Register Report</p>
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
                    {format(new Date(values.dateTo), "yyyy/MM/dd").toString() +
                      " (" +
                      miti1 +
                      " B.S.)"}
                  </p>
                </div>
              </div>
              <table>
                <thead>
                  <tr>
                    <th style={thStyle}>Date</th>
                    <th>Miti</th>
                    <th>Invoice Number</th>
                    <th>Buyer Name</th>
                    <th>Buyer PAN</th>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Cost</th>
                    <th>Unit</th>
                    <th>Total Sales</th>
                    <th>Discount</th>
                    <th>Taxable Amount</th>
                    <th>VAT</th>
                    <th>Export Sales</th>
                    <th>Country</th>
                    <th>Pragyapan Patra No.</th>
                    <th>Pragyapan Patra Miti</th>
                  </tr>
                </thead>
                <tbody>
                  {records &&
                    records.map((i) => (
                      <tr>
                        <td>
                          {format(
                            new Date(i.dateOfSales),
                            "yyyy/MM/dd  HH:mm:ss"
                          )}
                        </td>
                        <td>
                          {adbs.ad2bs(
                            format(new Date(i.dateOfSales), "yyyy/MM/dd ")
                          ).en["year"] +
                            "/" +
                            adbs.ad2bs(
                              format(new Date(i.dateOfSales), "yyyy/MM/dd ")
                            ).en["month"] +
                            "/" +
                            adbs.ad2bs(
                              format(new Date(i.dateOfSales), "yyyy/MM/dd ")
                            ).en["day"]}
                        </td>
                        <td>{i.bill_no}</td>
                        <td>{i.customerName}</td>
                        <td>{i.panNo}</td>
                        <td>{i.productName}</td>
                        <td>{i.productQTY}</td>
                        <td>{i.productcost}</td>
                        <td>{i.unitName}</td>
                        <td>{i.producttotali.taxAmount.toFixed(2)}</td>
                        <td>{i.discount}</td>
                        <td>{parseFloat(i.producttotal - i.discount)}</td>
                        <td>{i.taxAmount.toFixed(2)}</td>
                        <td>{i.expsales}</td>
                        <td>{i.country || ""}</td>
                        <td>{i.num || ""}</td>
                        <td>{i.pragmiti || ""}</td>
                      </tr>
                    ))}
                  <tr>
                    <th colSpan={8}>Total</th>
                    <th>{""}</th>
                    <th>{quantity_total}</th>
                    <th>{productcost_total}</th>
                    <th>{""}</th>
                    <th>{totalsales_total}</th>
                    <th>{discount_total}</th>
                    <th>{Taxable_total}</th>
                    <th>{tax_total}</th>
                    <th>{""}</th>
                    <th>{""}</th>
                    <th>{""}</th>
                    <th>{""}</th>
                  </tr>
                  <tr>
                    <th colSpan={17}> Sales Return</th>
                  </tr>
                  {Data &&
                    Data.map((i) => (
                  <tr>
                    <td>{format(new Date(i.dateOfSales), "yyyy/MM/dd  HH:mm:ss")}</td>
                    <td>{adbs.ad2bs(
                          format(new Date(i.dateOfSales), "yyyy/MM/dd ")
                        ).en["year"] +
                          "/" +
                          adbs.ad2bs(
                            format(new Date(i.dateOfSales), "yyyy/MM/dd ")
                          ).en["month"] +
                          "/" +
                          adbs.ad2bs(
                            format(new Date(i.dateOfSales), "yyyy/MM/dd ")
                          ).en["day"]}
                    </td>
                    <td>{i.refBillNo}</td>
                    <td>{i.customerName}</td>
                    <td>{""}</td>
                    <td>{i.productName}</td>
                    <td>{i.productQTY}</td>
                    <td>{""}</td>
                    <td>{""}</td>
                    <td>{i.producttotal}</td>
                    <td>{i.discount}</td>
                    <td>{parseFloat(i.producttotal - i.discount)}</td>
                    <td>{i.taxAmount}</td>
                    <td>{""}</td>
                    <td>{""}</td>
                    <td>{""}</td>
                    <td>{""}</td>
                  </tr>
                    ))}

                  <tr>
                    <th colSpan={6}>Total Return</th>
                    <th>{""}</th>
                    <th>{""}</th>
                    <th>{""}</th>
                    <th>{"-" + total_sales_return}</th>
                    <th>{"-" + total_discount_return}</th>
                    <th>{"-" + total_taxableamount_return}</th>
                    <th>{"-" + total_vat_return}</th>
                    <th>{""}</th>
                    <th>{""}</th>
                    <th>{""}</th>
                    <th>{""}</th>
                  </tr>

                  <tr>
                  <th colSpan={6}>Grand Total</th>
                    <th>{""}</th>
                    <th>{""}</th>
                    <th>{""}</th>
                    <th>{grand_total}</th>
                    <th>{grand_total_discount}</th>
                    <th>{grand_total_taxableamount}</th>
                    <th>{grand_total_vat}</th>
                    <th>{""}</th>
                    <th>{""}</th>
                    <th>{""}</th>
                    <th>{""}</th>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="reportNotFound">
          <p>No records to display</p>
        </div>
      )}
    </div>
  );
}


