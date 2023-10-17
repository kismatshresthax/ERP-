import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../utils/config";
import UseTable from "../home/UseTable";

import Popup from "../home/Popup";
import Spinner from "../../utils/spinner";


import { makeStyles, TableBody, TableRow, TableCell ,Toolbar,InputAdornment, Tooltip} from "@material-ui/core";
import Controls from "../controls/Controls";
import UserSessionContext from "../../contexts/UserSessionContext";
import { toast } from "react-toastify";
import ReactToPrint from "react-to-print";
import PageHeaderTitle from "../../utils/PageHeaderTitle";
import CompanyContext from "../../contexts/CompanyContext";
import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
import { Search } from "@material-ui/icons";
//import StockTransfer from "./StockTransfer";
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly';
import StockView from "./StockView";
import * as XLSX from "xlsx";
import * as XlsxPopulate from "xlsx-populate/browser/xlsx-populate";
import { useReactToPrint } from 'react-to-print';
import StockYieldForm from "./StockYieldForm";
import PrintIcon from "@mui/icons-material/Print";
import {AiOutlineFileExcel} from "react-icons/ai"
import Excelfile from "../../utils/Excelfile";
import { SelectFilter } from "../../utils/SelectFilter";
const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
 
  searchInput: {
    width: "20%",
  },
  newButton: {
    position: "absolute",
    zIndex: 4,
    right: "10px",
  },
  newButton1: {
    position: "absolute",
 
    right: "104px",
  },
}));

const headCells = [
  { id: "productName", label: "Product" },
  { id: "Category", label: "Category" },
  { id: "warehouseName", label: "Warehouse" },

  { id: "price", label: "Stock Amount" },
  { id: "rawQuantity", label: " Stock" },
  { id: "yield", label: " " },
  { id: "Action", label: "Action", disableSorting: true },
];

export default function StoreSummarytable(props) {
  const componentRef = React.useRef(null);
  const [isPrinting, setIsPrinting] = useState(false);
  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  // });
  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
       window.print();

      setIsPrinting(false);
    }, 500); // Delay the print action to ensure the component is visible
  };


  const userSessionContext = React.useContext(UserSessionContext);
  const companyContext = React.useContext(CompanyContext);
  const companyId = companyContext.company.id;
  const classes = useStyles(props);
  const [records, setRecords] = useState([]);
  const [isNewPopup, setIsNewPopup] = useState(false);
  const [isViewPopup, setIsViewPopup] = useState(false);
  const [isYieldPopup, setIsYieldPopup] = useState(false);
  //const [Wareid, setIsWareId] = useState(false);

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = UseTable(records, headCells, filterFn);
    const handleSearch = (e) => {

      let query = e.target.value;
      setFilterFn({
        fn: (items) => {
          if (query === "") 
          return items;
          else
            return items.filter( (x) =>(x.productName+x.warehouseName).toLowerCase().includes(query.toLowerCase()))
        },
      });
    };

  useEffect(() => {
    load_table();
   
  }, []);

  const load_table = async() => {
    const fig = {
      headers: {
        
        Authorization: userSessionContext.token,
      },
    };
  await axios
      .get(`${config.APP_CONFIG}/InventorySummary/api/${companyId}`,fig)
      .then((res) => {
       
        if (res.data.status_code === 200) {
         // console.log(res.data.msg);
          setRecords(res.data.msg);
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogout();
        } else {
          toast.error("Warning");
          setRecords([]);
        }
      })
      .catch((err) => {
        toast.error("Error");
  
        setRecords([]);
      });
  };
  if (records === undefined) {
    return <Spinner />;
  }
  const handleSelect = (e) => {


    if (e) {
    
      setFilterFn({
        fn: (items) => {
          return items.filter((x) => x.warehouseId === e.value);
        },
      });
    } else {
    
      setFilterFn({
        fn: (items) => items, 
      });
    }
    };
  // const transferStock = (_data) => {
  //   axios
  //     .post(`${config.APP_CONFIG}/InventoryTransfer/api`, _data,{ headers: {Authorization: userSessionContext.token } })
  //     .then((res) => {
  //       if (res.data.status_code === 200) {
  //         load_table();
  //         setIsViewPopup(false);
  //         toast.success(res.data.msg);
  //       } else if (res.data.status_code === 401) {
  //         userSessionContext.handleLogout();
  //       }
  //       else if (res.data.status_code === 400) {
  //         toast.warn(res.data.msg);
  //       } else {
  //         toast.error("Unable to Transfer Stock");
  //       }
  //     })
  //     .catch((err) => {
  //       toast.error("Something went Wrong");
  //     });
  // };




  //excel export
  const createDownLoadData = () => {
    handleExport().then((url) => {
      // console.log(url);
      const downloadAnchorNode = document.createElement("a");
      downloadAnchorNode.setAttribute("href", url);
      downloadAnchorNode.setAttribute("download", "Stock_Summary.xlsx");
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
    const title = [{ A: "Stock Summary Report" }];

    let table1 = [
      {
        A: "S.N.",
        B: "Product",
        C: "Category",
        D: "Warehouse",
        E: "Stock Amount",
        F: "Stock",
        G: "Unit",
       
      },
    ];

    records.map((item, index) => {
      table1.push({
        A: index + 1,
        B: item.productName,
        C: item.categoryName,
        D: item.warehouseName,
        E: item.actualStockAmount,
        F: item.rawQuantity,
        G: item.unitName,
       
      });
    });
  
    table1 = (table1);

    const finalData = [  ...company,
      ...address,
      ...panNo,
      ...title, ...table1];

    // console.log(finalData);
    //create a new workbook
    const wb = XLSX.utils.book_new();

    const sheet = XLSX.utils.json_to_sheet(finalData, {
      skipHeader: true,
    });

    XLSX.utils.book_append_sheet(wb, sheet, "Stock_summary");

    // binary large object
    // Since blobs can store binary data, they can be used to store images or other multimedia files.
    const workbookBlob = workbook2blob(wb);

    var headerIndexes = [];
    finalData.forEach((data, index) =>
      data["A"] === "S.N." ? headerIndexes.push(index) : null
    );

    const totalRecords = records.length;
    const dataInfo = {
      companyCell: "A1",
      companyRange: "A1:G1",
      addressCell: "A2",
      addressRange: "A2:G2",
      panCell: "A3",
      panRange: "A3:G3",
      titleCell: "A4",
      titleRange: "A4:G4", 
      tbodyRange: `A5:G${finalData.length}`,
      theadRange:
        headerIndexes?.length >= 1
          ? `A${headerIndexes[0] + 1}:G${headerIndexes[0] + 1}`
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
        sheet.column("B").width(15);
        sheet.column("C").width(25);
        sheet.column("D").width(10);
        sheet.column("E").width(10);
        sheet.column("F").width(10);
        sheet.column("G").width(10);
   

        sheet.range(dataInfo.companyRange).merged(true).style({
          bold: true,
          horizontalAlignment: "center",
          verticalAlignment: "center",
        });

        sheet.range(dataInfo.addressRange).merged(true).style({
           bold: true,
          horizontalAlignment: "center",
          verticalAlignment: "center",
        });

        sheet.range(dataInfo.panRange).merged(true).style({
           bold: true,
          horizontalAlignment: "center",
          verticalAlignment: "center",
        });

        sheet.range(dataInfo.titleRange).merged(true).style({
          bold: true,
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

//PDF report
console.log(props.warehouse)
const PrintComponent=(props) =>{
  //const componentRef = React.useRef(null);
  const currentDate = new Date().toLocaleDateString(); // Get the current date
  const currentTime = new Date().toLocaleTimeString(); // Get the current time

 
  return (
    <div className="">
   <div style={{ textAlign: "left", marginLeft: "1px" }}>
            <ReactToPrint
              
             
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
    <div ref={componentRef} className="salesReturnReport">
    <div className="jreportPage">
          <div>
          <div className="reportHeader">
            <p className="companyName">{companyContext.company.name}</p>
            <p className="companyAddress">
                  {companyContext.company.address || ""}
                </p>
            <p className="companyPan">
              Pan No : {companyContext.company.panNo}
            </p>
           
            <p className="companyReport">Stock Details</p>
           
          </div>

<div className="row">
        <table className="table table-fluid journal-entry-table col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <thead>
            <tr>
             
            <th width="37px">S.N</th>
              <th >Product Name</th>
              <th>Category</th>
              <th>Warehouse</th>
              <th>Avg Price</th>
              <th>Quantity</th>
              <th>unit</th>
           
            </tr>
          </thead>
          <tbody>
            {props.records &&
              props.records.map((i,index) => (
                <tr key={index}>
                   <td width="37px">{index+1}</td>
                   <td>{i.productName||""}</td>
                      <td>{i.categoryName||""}</td>
                      <td>{i.warehouseName||""}</td>
                      <td>{parseFloat(i.actualStockAmount||0)}</td>
                      <td>{i.rawQuantity}</td>
                      {/* <td><span>{i.rawQuantity+" "+i.unitName}</span></td> */}
                       <td>{i.unitName||""}</td> 
              
                </tr>
              ))}

           
            
          </tbody>
        </table>
      </div>
      </div>
      </div>
    <div style={{display:'flex', justifyContent: 'space-between', marginTop: '35px', alignContent:'center'}}>
<div style={{width:'200px', textAlign:'center'}}>    
<span>-------------------</span><br />

<span>Prepared By:</span><br />

</div>
<div style={{width:'200px', textAlign:'center'}}>
<span>-------------------</span><br />
<span>Approved By:</span><br />
</div>
</div>
<div style={{width:'300px', textAlign:'left',marginTop: '5px'}}>

  <p className="date-time">Printed on {currentDate} at {currentTime} by {localStorage.getItem('user')} </p>
</div>
  </div>
  </div>

  )
};

  return (
    <div>
   
       
        
        {isNewPopup ? (
        <Popup
        size="lg"
          title="Print Preview"
          openPopup={isNewPopup}
          setPopups={setIsNewPopup}
        >
          <PrintComponent
            records={records}
       
          />
        </Popup>
      ) : null}
          {isViewPopup ? (
            <Popup
            size="lg"
              title="View Stock Product Details"
              openPopup={isViewPopup=== false ? false : true}
              setPopups={() => {
                setIsViewPopup(false);
              }}
            >
              <StockView
            data={records.filter((x) => x.productId === isViewPopup)[0] || null}
            />
           </Popup>
        ) : null}
         {isYieldPopup ? (
            <Popup
            size="lg"
              title="Product Yield Form"
              openPopup={isYieldPopup=== false ? false : true}
              setPopups={() => {
                setIsYieldPopup(false);
              }}
            >
              <StockYieldForm
            data={records.filter((x) => x.productId === isYieldPopup)[0] || null}
            setIsYieldPopup={ setIsYieldPopup}
            />
           </Popup>
        ) : null}

<div>
        
            <div>
          
              <PageHeaderTitle title=" Stock Summary" />
            </div>
           
            
        
          {records.length>1?
          <Controls.Button
          text="Print"
          variant="outlined"
          startIcon={<PrintIcon />}
          className={classes.newButton1}
          onClick={() => {
            setIsNewPopup(!isNewPopup);
          }}
       
        />
      
  :null}
     {records.length>1?
      <Controls.Button
          text="Excel"
          variant="outlined"
          startIcon={<AiOutlineFileExcel />}
          className={classes.newButton}
          onClick={() => {
            createDownLoadData();
          }}
       
        />
        :null}
        
    
     
                
     
        
        </div>

          <Toolbar>
            <Controls.Input
              label="Search products"
              className={classes.searchInput}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              onChange={handleSearch}
            />
            <SelectFilter   className={classes.searchInput}  onChange={handleSelect}options={props.warehouse} placeholder="Warehouse"/>
          </Toolbar>

          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
              <TblContainer>
                <TblHead />
                <TableBody>
                  {recordsAfterPagingAndSorting().map((item, index) => {
             
                    return<TableRow key={item.id}>
                      <TableCell>{item.productName||""}</TableCell>
                       <TableCell>{item.categoryName||""}</TableCell> 
                      <TableCell>{item.warehouseName||""}</TableCell>
                   
                      <TableCell>{"Rs."+" "+item.actualStockAmount||0}</TableCell> 
                      <TableCell style={{color:"green"}}><span style={{color:"green"}}>{item.rawQuantity +" "+item.unitName}</span></TableCell>
     
                      <TableCell>
                      <Controls.ActionButton
                      color="primary" 


                      
                      onClick={(e) => {
                        setIsViewPopup(item.productId);
                     
                      }}
                    ><Tooltip title="View">
                      <RemoveRedEyeIcon fontSize="small" /></Tooltip>
                    </Controls.ActionButton>
                      </TableCell>
                      <TableCell>
                      <Controls.ActionButton
                      color="primary"
                      onClick={(e) => {
                    
                   
                        setIsYieldPopup(item.productId);
                     
                      }}
                    ><Tooltip title="Yield">
                      <ChildFriendlyIcon  fontSize="small" /></Tooltip>
                    </Controls.ActionButton>
                      </TableCell>
                    </TableRow>
})}
                </TableBody>
              </TblContainer>
              {records.length>0?
    <div className="d-flex flex-row justify-content-between">
    <span className="d-flex flex-row">
    <Excelfile data={records}/>
    </span>
    
    <TblPagination />
    </div>
      : <div className="reportNotFound">
      <p >No Records to Display</p>
          </div>}
       
         
            </div>
          </div>
        </div>
     
 
  );
}
