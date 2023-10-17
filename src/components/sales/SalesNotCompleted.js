import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../utils/config";
import UseTable from "../home/UseTable";
import Popup from "../home/Popup";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import PrintIcon from "@mui/icons-material/Print";
import { Search } from "@material-ui/icons";
import {
  makeStyles,
  TableBody,
  TableRow,
  Toolbar,
  Tooltip,
  TableCell,
  InputAdornment,
} from "@material-ui/core";
import Controls from "../controls/Controls";

import UserSessionContext from "../../contexts/UserSessionContext";
import { toast } from "react-toastify";
import Spinner from "../../utils/spinner";

import FormOne from "./FormOne";
import FormTwo from "./FormTwo";
import FormThree from "./FormThree";
//import Reprint from "./Reprint";
import Reprintpdf from "./Reprintpdf";
import SalesReturnForm from "./SalesReturnForm";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

import UserAuthenticationContext from "../../contexts/UserAuthenticationContext";
import CompanyContext from "../../contexts/CompanyContext";
import * as XLSX from "xlsx";
import * as XlsxPopulate from "xlsx-populate/browser/xlsx-populate";
//import ReactExport from "react-export-excel";
import ViewSalesSummary from "./ViewSalesSummary";
import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
import NepaliDate from "../../utils/NepaliDate";
const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  newButton: {
    margin: 0,
    zIndex: 4,
  },searchInput: {
    width: "20%",
  },
}));

const headCells = [
  { id: "customerName", label: "Customer Name" },
  { id: "bill_no", label: "Bill No." },
  { id: "dateOfSales", label: "Date Of Sales", disableSorting: true },
  { id: "grandTotal", label: "Total Amt.", disableSorting: true },
  { id: "cashierName", label: "Cashier Name", disableSorting: true },
  { id: "actions", label: "Actions", disableSorting: true },
];

export default function SalesSummaryTablePage(props) {
  const userSessionContext = React.useContext(UserSessionContext);
  const companyContext= React.useContext(CompanyContext);

  const classes = useStyles(props);
  const [records, setRecords] = useState();
  const [isNewPopup, setIsNewPopup] = useState(false);
  const [isEditPopup, setIsEditPopup] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isViewPopup, setIsViewPopup] = useState(false);
  const [isPrintPopup, setIsPrintPopup] = useState(false);
  const [copyCount, setCopyCount] = useState(0);
  const companyId=companyContext.company.id;
  const fiscalyear =  localStorage.getItem('fiscal')
  //const [vendorName, setVendorName] = useState();
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const permissionContext = React.useContext(UserAuthenticationContext);
  let userPermission = permissionContext.permissions;
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    UseTable(records, headCells, filterFn);

  useEffect(() => {
    load_sales_summary();
    // loadVendorname();
  }, []);

  const load_sales_summary = async () => {
    let company_data={
      "companyId":companyId,
      "fiscalyear":fiscalyear
     }
         axios
          .post(
            `${config.APP_CONFIG}/Sales/SalesSummary/api/byCompany`,company_data,
            {
              headers: { Authorization: userSessionContext.token },
            }
          )
      .then((res) => {
        if (res.data.status_code === 200) {
          const completerecords=res.data.msg.filter(filtered=>{
            return filtered.isPaymentRelease!=1
                });
              setRecords(completerecords);
          } else if (res.data.status_code === 401) {
          userSessionContext.handleLogout();
        } else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
        } else {
          toast.error("Error Occurred");
          setRecords([]);
        }
      })
      .catch((err) => {
        toast.error("Something Went Wrong");
        setRecords([]);
      });
  };


  const handleSearch=(e)=>{
    let query = e.target.value;

    setFilterFn({
      fn: (items) => {
        if (query === "") return items;
        else
          return items.filter(
            (x) =>
              (x.customerName + x.bill_no)
                .toLowerCase()
                .includes(query.toLowerCase())
    
          );
      },
    });
  };
  // const deleteSummary = (id) => {
  //   axios
  //     .delete(`${config.APP_CONFIG}/Sales/SalesSummary/api/${id}`)
  //     .then((res) => {
  //       if (res.data.status_code === 200) {
  //         toast.warn("Deleted Successfully!");
  //         load_sales_summary();
  //       } else if (res.data.status_code === 401) {
  //         userSessionContext.handleLogout();
  //       } else if (res.data.status_code === 400) {
  //         toast.warn(res.data.msg);
  //       } else {
  //         toast.error("Error Occurred");
  //       }
  //     })
  //     .catch((err) => {
  //       toast.error("Error");
  //     });
  // };

  if (records === undefined) {
    return <Spinner />;
  }

  //excel export
  const createDownLoadData = () => {
    handleExport().then((url) => {
     
      const downloadAnchorNode = document.createElement("a");
      downloadAnchorNode.setAttribute("href", url);
      downloadAnchorNode.setAttribute("download", "sales_summary.xlsx");
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



    //create a 8 bit integer array
    const view = new Uint8Array(buf);


    //charCodeAt The charCodeAt() method returns an integer between 0 and 65535 representing the UTF-16 code
    for (let i = 0; i !== s.length; ++i) {
      view[i] = s.charCodeAt(i);
    }

    return buf;
  };
  const handleExport = () => {
    const title = [{ A: "Sales Summary" }];

    let table1 = [
      {
        A: "S.N.",
        B: "Bill No",
        C: "Customer Name",
        D: "Customer Id",
        E: "Sub Total",
        F: "Discount",
        G: "Net Total",
        H: "Tax Amount",
        I: "Grand Total",
        J: "Date",
        K: "Payment Mode",
        L: "Fiscal Year",
        M: "Cashier Name",
      },
    ];

    records.map((item, index) => {
      table1.push({
        A: index + 1,
        B: item.bill_no,
        C: item.customerName,
        D: item.customerId,
        E: item.subTotal,
        F: item.discount,
        G: item.netTotal,
        H: item.taxAmount,
        I: item.grandTotal,
        J: item.dateOfSales,
        K: item.paymentMode,
        L: item.fiscalyear,
        M: item.cashierName,
      });
    });

    table1 = table1;

    const finalData = [...title, ...table1];

    //create a new workbook
    const wb = XLSX.utils.book_new();

    const sheet = XLSX.utils.json_to_sheet(finalData, {
      skipHeader: true,
    });

    XLSX.utils.book_append_sheet(wb, sheet, "sales_summary");

    // binary large object
    // Since blobs can store binary data, they can be used to store images or other multimedia files.
    const workbookBlob = workbook2blob(wb);

    var headerIndexes = [];
    finalData.forEach((data, index) =>
      data["A"] === "S.N." ? headerIndexes.push(index) : null
    );

    const totalRecords = records.length;
    const dataInfo = {
      titleCell: "A1",
      titleRange: "A1:M1",
      tbodyRange: `A2:M${finalData.length}`,
      theadRange:
        headerIndexes?.length >= 1
          ? `A${headerIndexes[0] + 1}:M${headerIndexes[0] + 1}`
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
        sheet.column("B").width(10);
        sheet.column("C").width(15);
        sheet.column("D").width(10);
        sheet.column("E").width(10);
        sheet.column("F").width(10);
        sheet.column("G").width(10);
        sheet.column("H").width(10);
        sheet.column("I").width(10);
        sheet.column("J").width(30);
        sheet.column("K").width(15);
        sheet.column("L").width(20);
        sheet.column("M").width(20);

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

  const incrementCopyCount = () => {
    setCopyCount(copyCount + 1);
  };

  // const handleSearch = (e) => {
  //   let query = e.target.value;

  //   setFilterFn({
  //     fn: (items) => {
  //       if (query === "") return items;
  //       else
  //         return items.filter((x) =>
  //           (x.customerName)
  //             .toLowerCase()
  //             .includes(query.toLowerCase())
  //         );
  //     },
  //   });
  // };



 // const discountPercent = (records.reduce((discountPercent, obj) => (obj.discount)/(obj.subTotal) * 100 + discountPercent, 0)).toFixed(2);
  // const percentCalculate = () => {
  //   const discountPercent = ((records.discount)/(records.subTotal) * 100).toFixed(2);
  //   const taxPercent = ((records.taxAmount) / ((records.subTotal)-(records.discount)) * 100).toFixed(2);
  //   console.log(discountPercent);
  //   console.log(taxPercent);
  // };
  // console.log(discountPercent);

  



  return (
    <div>
      <div>
      
        {showPopup ? (
          <Popup
            title="Payment Form"
            size="lg"
            openPopup={showPopup}
            setPopups={(e) => {
              //setIsNewPopup(false);
              setIsEditPopup(false);
              setShowPopup(e);
            }}
          >
            <PopupHandler
                size="lg"
              isEditPopup={isEditPopup}
              setIsEditPopup={setIsEditPopup}
              setShowPopup={setShowPopup}
              setIsNewPopup={setIsNewPopup}
              isNewPopup={isNewPopup}
              load_sales_summary={(e) => {
                load_sales_summary(e);
              }}
            />
          </Popup>
        ) : null}
        {isNewPopup ? (
          <Popup
            title="Sales Return"
            openPopup={isNewPopup}
            setPopups={setIsNewPopup}
            // setPopups={() => {
            //   setIsNewPopup(false);
            // }}
          >
            <SalesReturnForm
              datas={records.filter((x) => x.id === isNewPopup)[0] || null}
            />
          </Popup>
        ) : null}
        {isViewPopup ? (
          <Popup
            title="Sales  Details"
            openPopup={isViewPopup === false ? false : true}
            setPopups={() => {
              setIsViewPopup(false);
            }}
          >
            <ViewSalesSummary
              data={records.filter((x) => x.id === isViewPopup)[0] || null}
            />
          </Popup>
        ) : null}

        {/* {print() ? */}
        {isPrintPopup ? (
          <Popup
          size="lg"
            title="Re-Print Preview"
            openPopup={isPrintPopup}
            setPopups={setIsPrintPopup}
          >
            <Reprintpdf
              // taxPercent = {taxPercent}
              // discountPercent = {discountPercent}
              copyCount={copyCount}
              data={records.filter((x) => x.id === isPrintPopup)[0] || null}
            />
          </Popup>
        ) : null}
        {/* // :null} */}

        <div style={{position:"relative"}}>

          {/* <Toolbar>
              <Controls.Input
                label="Search"
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
            </Popup>
          ) : null}
          {isNewPopup ? (
            <Popup
              title="Sales Return"
              openPopup={isNewPopup}
              setPopups={setIsNewPopup}
              // setPopups={() => {
              //   setIsNewPopup(false);
              // }}
            >
              <SalesReturnForm
                datas={records.filter((x) => x.id === isNewPopup)[0] || null}
              />
            </Popup>
          ) : null}
          {isViewPopup ? (
            <Popup
              title="Sales Return Details"
              openPopup={isViewPopup === false ? false : true}
              setPopups={() => {
                setIsViewPopup(false);
              }}
            >
              <ViewSalesSummary
                data={records.filter((x) => x.id === isViewPopup)[0] || null}
              />
            </Popup>
          ) : null}


  {/* {print() ? */}
          {isPrintPopup ? (
            <Popup
            size="lg"
              title="Re-Print Preview"
              openPopup={isPrintPopup}
              setPopups={setIsPrintPopup}
            >
              <Reprintpdf              
                // taxPercent = {taxPercent}
                // discountPercent = {discountPercent}
                copyCount={copyCount}
                data={records.filter((x) => x.id === isPrintPopup)[0] || null}
              />
            </Popup>
          ) : null}

   <Toolbar style={{minHeight: 0}}>
        <Controls.Input
          label="Search"
          className={classes.searchInput}
          style={{position: "absolute", left: "0", top: "-137px"}}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          onChange={handleSearch}
        />
        </Toolbar>

          <div className="row salesSummaryTable">
            <div
              className="col-lg-12 col-md-12 col-sm-12 col-xs-12 "
              style={{ position: "relative" }}
            >
              <TblContainer>
                <TblHead />
                <TableBody>
                  {recordsAfterPagingAndSorting().map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.customerName}</TableCell>
                      <TableCell>{item.bill_no}</TableCell>

                      <TableCell>{(item.dateOfSales.slice(0,16))+ " " + NepaliDate(item.dateOfSales)}</TableCell>
                      <TableCell>{item.grandTotal}</TableCell>
                      <TableCell>{item.cashierName}</TableCell>
                      <TableCell>
                        <Controls.ActionButton
                          color="primary"
                          onClick={(e) => {
                            setIsViewPopup(item.id);
                          }}
                        >
                          <Tooltip title="View">
                            <RemoveRedEyeIcon fontSize="small" />
                          </Tooltip>
                        </Controls.ActionButton>

                        {item.isConform === 1 ? (
                          <Controls.ActionButton
                            color="primary"
                            onClick={(e) => {
                              // updataPurchase(item.id)
                              setIsNewPopup(item.id);
                              //  setShowPopup(true);
                            }}
                          >
                            <Tooltip title="Sales Return">
                              <ShoppingCartCheckoutIcon fontSize="small" />
                            </Tooltip>
                          </Controls.ActionButton>
                        ) : null}

                        {item.isPaymentRelease !== 1 ? (
                          <Controls.ActionButton
                            color="primary"
                            onClick={(e) => {
                              // updataPurchase(item.id)
                              setIsEditPopup(item.id);
                              //console.log(item);
                              setShowPopup(true);
                            }}
                          >
                            <Tooltip title="Edit">
                              <EditOutlinedIcon fontSize="small" />
                            </Tooltip>
                          </Controls.ActionButton>
                        ) : null}

                          {/*  <Controls.ActionButton
                          color="primary"
                          onClick={(e) => {
                            setIsPrintPopup(item.id);
                            incrementCopyCount();
                          }}
                        >
                          <Tooltip title="Re-print">
                            <PrintIcon fontSize="small" />
                          </Tooltip>
                        </Controls.ActionButton>

                     
                    <Controls.ActionButton
                      color="primary"
                      onClick={(e) => {
                        console.log(item.id)
                        setIsEditPopup(item.id);
                        setShowPopup(true)
                      }}
                    >
                      <EditOutlinedIcon fontSize="small" />
                    </Controls.ActionButton> */}
                        {/* <Controls.ActionButton
                      color="secondary"
                      onClick={() => {
                        deleteSummary(item.id);
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </Controls.ActionButton> */}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </TblContainer>
              <TblPagination />
              {records.length !== 0 ? (
                <button
                  style={{
                    position: "absolute",
                    left: "10px",
                    bottom: "10px",
                  }}
                  onClick={() => {
                    createDownLoadData();
                  }}
                  className="btn btn-success btn-sm ml-1"
                >
                  Excel Export
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const PopupHandler = (props) => {
  const userSessionContext = React.useContext(UserSessionContext);
  const [data, setData] = useState();
  const companyContext= React.useContext(CompanyContext);
  const companyId=companyContext.company.id;
  // const companyId=companyContext.company.id;
  // const [updateData, setUpdateData] = useState([]);
  const [salesData, setSalesData] = useState();
  const [paymentMode, setPaymentMode] = useState();
  const [step, setStep] = useState(0);
  const step_handler = (_step) => {
    if (_step.toLowerCase() === "next") {
      setStep(step + 1);
    } else if (_step.toLowerCase() === "back") {
      setStep(step - 1);
    }
  };

  const permissionContext = React.useContext(UserAuthenticationContext);
  let userPermission = permissionContext.permissions;

  const addData = (e) => {
    // setUpdateData({...updateData, e})
    // setData({...data, updateData})
    setData({ ...data, e });
  };
  useEffect(async() => {
    if (props.isEditPopup) {
    await  axios
        .get(
          `${config.APP_CONFIG}/Sales/SalesSummary/api/${props.isEditPopup}`,
          {
            headers: { Authorization: userSessionContext.token },
          }
        )
        .then((res) => {
          if (res.data.status_code === 200) {
            let temp = res.data.msg;
            setData(temp.salesData[0]);
            setSalesData(temp.salesProduct);
            setPaymentMode(temp.paymentMode);
          } else {
            toast.error(res.data.msg);
            setData([]);
            setSalesData([]);
          }
        })
        .catch((err) => {
          setData([]);
          setSalesData([]);
        });
    } else {
      setData({});
      setSalesData([]);
    }
  }, []);

  const step_mapper = {
    0: (
      <FormOne
        data={data}
        step={step}
        salesData={salesData}
        updateSetData={setData}
        step_handler={step_handler}
        // addData={
        //   (salesData) => {
        //     setData({...data, salesData});
        // }}
        addData={addData}
      />
    ),
    1: (
      <FormTwo
        data={data}
        step={step}
        salesData={salesData}
        updateSetData={setData}
        step_handler={step_handler}
        load_sales_summary={(e) => {
          props.load_sales_summary(e);
        }}
      />
    ),
    2: (
      <FormThree
        data={data}
        step={step}
        salesData={salesData}
        // paymentMode={paymentMode}
        updateSetdata={setData}
        step_handler={step_handler}
        load_sales_summary={(e) => {
          props.load_sales_summary(e);
        }}
      />
    ),
   
  };
  if (data === undefined || salesData === undefined) {
    return <Spinner />;
  }
  if (
    data.id === undefined &&
    data.dateOfSales === undefined &&
    data.isConform === undefined 
    //data.isPaymentRelease === undefined
  ) {
    return (
      <FormOne
        data={data}
        step={step}
        salesData={salesData}
        updateSetData={setData}
        step_handler={step_handler}
        addData={addData}
      />
    );
  } else if (
    data !== null &&
    data.dateOfSales !== null &&
    data.isConform !== 1 &&
    data.isPaymentRelease !== 1
  ) {
    return (
      <FormTwo
        data={data}
        step={step}
        salesData={salesData}
        updateSetData={setData}
        step_handler={step_handler}
        load_sales_summary={(e) => {
          props.load_sales_summary(e);
        }}
      />
    );
  } else if (data.isConform === 1 && data.isPaymentRelease !== 1) {
    return (
      <FormThree
        data={data}
        step={step}
        salesData={salesData}
        updateSetdata={setData}
        step_handler={step_handler}
        paymentMode={paymentMode}
        load_sales_summary={(e) => {
          props.load_sales_summary(e);
        }}
      />
    );
  }  else if (data.id === undefined) {
    return (
      <FormOne
        data={data}
        step={step}
        salesData={salesData}
        updateSetData={setData}
        step_handler={step_handler}
      />
    );
  } else if (
    data.id === undefined &&
    data.dateOfSales === undefined &&
    data.isConform === 1
  ) {
    return (
      <FormTwo
        data={data}
        step={step}
        salesData={salesData}
        updateSetData={setData}
        step_handler={step_handler}
        load_sales_summary={(e) => {
          props.load_sales_summary(e);
        }}
      />
    );
  }
  return (
    <div>
      {/* {step_mapper[step]} */}
      {/* {data.id === undefined ? step_mapper[0] : salesData === undefined ? step_mapper[0] : step_mapper[step + 1]} */}

      {data.id === undefined ? step_mapper[0] : step_mapper[step]}
    </div>
  );
};
