import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../utils/config";
import UseTable from "../home/UseTable";
import Popup from "../home/Popup";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
import CloseIcon from "@material-ui/icons/Close";
//import ReactExport from "react-export-excel";
import { Search } from "@material-ui/icons";
import Tooltip from "@mui/material/Tooltip";
import {
  makeStyles,
  TableBody,
  TableRow,
  Toolbar,
  TableCell,
  InputAdornment,
} from "@material-ui/core";
import Controls from "../controls/Controls";

import UserSessionContext from "../../contexts/UserSessionContext";
import { toast } from "react-toastify";
import VendorOrderForm from "./VendorOrderForm";
import Spinner from "../../utils/spinner";
import FormTwo from "./FormTwo";
import FormThree from "./FormThree";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

// import Purchasesummarytab from "./Purchasesummarytab";
import ConfirmDialog from "../home/ConfirmDialog";
import PurchaseSummaryClosed from "./PurchaseSummaryClosed";
import PurchaseReturnForm from "./PurchaseReturnForm";
import UserAuthenticationContext from "../../contexts/UserAuthenticationContext";
import CompanyContext from "../../contexts/CompanyContext";

import * as XLSX from "xlsx";
import * as XlsxPopulate from "xlsx-populate/browser/xlsx-populate";
//import {forwardRef, useImperativeHandle, useRef} from 'react';

import DeleteIcon from '@material-ui/icons/Delete';
import NepaliDate from "../../utils/NepaliDate";
const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(0),
  },
  newButton: {
    position: "absolute",
    margin: 0,
    zIndex: 4,
    right: 0,
    top: "15px",
  },searchInput: {
    width: "20%",
 color: "#3e52c1"
  },
}));

const headCells = [
  { id: "vendorname", label: "Vendor Name" },
  { id: "vendorReference", label: "Vendor Ref" },
  { id: "orderDeadline", label: "Date" },
  { id: "grandTotal", label: "Grand Total" },
  { id: "actions", label: "Actions", disableSorting: true },
];

export default function PurchaseNotCompleted(props) {
  //console.log(props.records);
  const userSessionContext = React.useContext(UserSessionContext);
  const classes = useStyles(props);
   const [records, setRecords] = useState(props.records || []);
  //const [values, setValues] = useState();
  const [isNewPopup, setIsNewPopup] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isEditPopup, setIsEditPopup] = useState(false);
  const [isPurchaseReturnPopup, setIsPurchaseReturnPopup] = useState(false);
  const companyContext = React.useContext(CompanyContext);
  const companyId=companyContext.company.id;
  const fiscalyear = companyContext.fiscal[0]["fiscalYear"];
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
    Icon:DeleteIcon,
  });

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });


  const permissionContext = React.useContext(UserAuthenticationContext);
  let Permission = permissionContext.permissions;

  let curr_mod_permission = Permission.filter((x) => {
    return x["module_name"].toLowerCase() === "purchases";
  });
  let userPermission = curr_mod_permission[0];

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    UseTable(records, headCells, filterFn);

    // const filteredData=recordsAfterPagingAndSorting().filter(item=>{
    //   return item.isCompleted!=1;
    // })

  useEffect(() => {
    load_purchase_summary();
  }, []);


  // const handleSearch2 = forwardRef((e, ref) => {
  //   useImperativeHandle(ref, ()=>({

  //     handleSearch2(){
const handleSearch=(e)=>{
    let query = e.target.value;

    setFilterFn({
      fn: (items) => {
        if (query === "") return items;
        else
          return items.filter(
            (x) =>
              (x.vendorname + x.vendorReference + x.grandTotal)
                .toLowerCase()
                .includes(query.toLowerCase())
          );
      },
    });
  }
 

  const load_purchase_summary =   () => {
    let company_data={
      "companyId":companyId,
      "fiscalyear":fiscalyear
     }
    axios
      .post(`${config.APP_CONFIG}/Purchase/ProductPurchaseSummary/api/byCompany`,company_data, {
        headers: {
          Authorization: userSessionContext.token,
        },
      })
      .then((res) => {
        if (res.data.status_code === 200) {
          const completerecords=res.data.msg.filter(filtered=>{
            return filtered.isCompleted!==1 ||null
                });
              setRecords(completerecords);
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

  const deleteSummary = (id) => {
    setConfirmDialog({ ...confirmDialog, isOpen: false });
    axios
      .delete(
        `${config.APP_CONFIG}/Purchase/ProductPurchaseSummary/api/${id}`,
        {
          headers: {
            Authorization: userSessionContext.token,
          },
        }
      )
      .then((res) => {
        if (res.data.status_code === 200) {
          toast.warn("Deleted Successfully");
          load_purchase_summary();
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogout();
        } else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
        } else {
          toast.error("Delete unsuccessful");
        }
      })
      .catch((err) => {
        toast.error("Error");
      });
  };

  if (records === undefined) {
    return <Spinner />;
  }

  // const handleChange = (event, newValue) => {
  //   setValues(newValue);
  // };

  //excel export
  const createDownLoadData = () => {
    handleExport().then((url) => {
      // console.log(url);
      const downloadAnchorNode = document.createElement("a");
      downloadAnchorNode.setAttribute("href", url);
      downloadAnchorNode.setAttribute("download", "purchase_summary.xlsx");
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

    const title = [{ A: 'Purchase Summary' }]

    let table1 = [
      {
        A: "S.N.",
        B: "Vendor Name",
        C: "Vendor Reference",
        D: "Sub Total",
        E: "Discount",
        F: "Net Total",
        G: "Tax Amount",
        H: "Grand Total",
        I: "Order Deadline",
        J: "Receipt Date",
        K: "Fiscal Year",
        L: "Description",
      },
    ];

    records.map((item, index) => {
      table1.push({
        A: index + 1,
        B: item.vendorname,
        C: item.vendorReference,
        D: item.subtotal,
        E: item.discount,
        F: item.netTotal,
        G: item.taxAmount,
        H: item.grandTotal,
        I: item.orderDeadline,
        J: item.recepitDate,
        K: item.fiscalyear,
        L: item.description,
      });
    });

    table1 = (table1);

    const finalData = [...title, ...table1];

    // console.log(finalData);
    //create a new workbook
    const wb = XLSX.utils.book_new();

    const sheet = XLSX.utils.json_to_sheet(finalData, {
      skipHeader: true,
    });

    XLSX.utils.book_append_sheet(wb, sheet, "purchase_summary");

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
      titleRange: "A1:L1",
      tbodyRange: `A2:L${finalData.length}`,
      theadRange:
        headerIndexes?.length >= 1
          ? `A${headerIndexes[0] + 1}:L${headerIndexes[0] + 1}`
          : null,
      // tFirstColumnRange:
      //   headerIndexes?.length >= 1
      //     ? `A${headerIndexes[0] + 1}:A${totalRecords + headerIndexes[0] + 1}`
      //     : null,
      // tLastColumnRange:
      //   headerIndexes?.length >= 1
      //     ? `C${headerIndexes[0] + 1}:C${totalRecords + headerIndexes[0] + 1}`
      //     : null,

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
        sheet.column("H").width(10);
        sheet.column("I").width(30);
        sheet.column("J").width(30);
        sheet.column("K").width(15);
        sheet.column("L").width(20);


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

//function for tab

  return (
    <div>
   <div className="search">
        {showPopup ? (
          <Popup
          size="lg"
            title="Purchase Form"
            openPopup={showPopup}
            setPopups={(e) => {
              setIsNewPopup(false);
              setIsEditPopup(false);
              setShowPopup(e);
            }}
          >
            <PopupHandler
           size="lg"
              isEditPopup={isEditPopup}
              load_purchase_summary={(e) => {
                load_purchase_summary(e);
              }}
            />
          </Popup>
        ) : null}

        <ConfirmDialog
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        />

        {isPurchaseReturnPopup ? (
          <Popup
          size="lg"
            title="Purchase Return"
            openPopup={isPurchaseReturnPopup}
            setPopups={setIsPurchaseReturnPopup}
          >
            <PurchaseReturnForm
              datas={
                records.filter((x) => x.id === isPurchaseReturnPopup)[0] || null
              }
            />
          </Popup>
        ) : null}

        <Toolbar>
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
        </Toolbar>
</div>

        <div className="row purchaseSummaryTable">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 " style={{ position: "relative" }}>
        
            <TblContainer id="table-to-xls">
              <TblHead />

              {recordsAfterPagingAndSorting().map((item) => (
                        // console.log(item);
                // item.isCompleted != 1 ? (
              <TableBody>
                  <TableRow key={item.id}>
                    <TableCell>{item.vendorname}</TableCell>
                    <TableCell>{item.vendorReference}</TableCell>
                    <TableCell>{(item.orderDeadline.slice(0,16))+" "+NepaliDate(item.orderDeadline)}</TableCell>
                    <TableCell>{item.grandTotal}</TableCell>

                    <TableCell>
                      {item.isCompleted === 1 ? (
                        <Controls.ActionButton
                          color="primary"
                          onClick={(e) => { 
                            setIsPurchaseReturnPopup(item.id);
                          }}
                        >
                          <Tooltip title="Return">
                            <ShoppingCartCheckoutIcon fontSize="small" />
                          </Tooltip>
                        </Controls.ActionButton>
                      ) : null}

                      {item.isPaymentRelease !== 1 ? (
                        <Controls.ActionButton
                          color="primary"
                          onClick={(e) => {
                            setIsEditPopup(item.id);
                            setShowPopup(item.id);
                          }}
                        >
                          <Tooltip title="Edit">
                            <EditOutlinedIcon fontSize="small" />
                          </Tooltip>
                        </Controls.ActionButton>
                      ) : (
                        <Controls.ActionButton
                          color="primary"
                        >
                          <RemoveRedEyeIcon fontSize="small" />
                        </Controls.ActionButton>
                      )}

                      {item.isConformed === 1 ? null : (
                        <Controls.ActionButton
                          color="secondary"
                          onClick={() => {
                            setConfirmDialog({
                              isOpen: true,
                              title: "Are you sure to delete this record?",
                              subTitle: "You can't undo this operation",
                              Icon:DeleteIcon,
                              onConfirm: () => {
                                deleteSummary(item.id);
                              },
                            });
                          }}
                        >
                          <CloseIcon fontSize="small" />
                        </Controls.ActionButton>
                      )}
                    </TableCell>
                  </TableRow>
              </TableBody>
                // ):null

                 ))}
            </TblContainer>
            {records.length>0?
      <TblPagination /> 
      : <div className="reportNotFound">
      <p >No Records to Display</p>
          </div>}
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
 
  );
}

const PopupHandler = (props) => {
  const [data, setData] = React.useState();
  const [productData, setProductData] = useState();
  const [temp, setTemp] = useState();
  const [paymentMode, setPaymenttMode] = useState();
  const [step, setStep] = React.useState(0);
  const userSessionContext = React.useContext(UserSessionContext);
  const permissionContext = React.useContext(UserAuthenticationContext);
  let Permission = permissionContext.permissions;
  //const companyContext = React.useContext(CompanyContext);
 //const companyId = companyContext.company.id;
  let curr_mod_permission = Permission.filter((x) => {
    return x["module_name"].toLowerCase() === "purchases";
  });
  let userPermission = curr_mod_permission[0];

  React.useEffect(async() => {
    if (props.isEditPopup) {
    await  axios
        .get(
          `${config.APP_CONFIG}/Purchase/ProductPurchaseSummary/api/${props.isEditPopup}`,
          {
            headers: {
              Authorization: userSessionContext.token,
            },
          }
        )
        .then((res) => {
          if (res.data.status_code === 200) {
            let temp = res.data.msg;
            setData(temp.mydata[0]);
            setProductData(temp.productData);
            setPaymenttMode(temp.paymentMode);
          } else {
            toast.error(res.data.msg);
            setData([]);
            setProductData([]);
            setPaymenttMode([]);
          }
        })
        .catch((err) => {
          setData({});
          setProductData([]);
          setPaymenttMode([]);
        });
    } else {
      setData({});
      setProductData([]);
      setPaymenttMode([]);
    }
  }, []);

  const step_handler = (_step) => {
    if (_step.toLowerCase() === "next") {
      setStep(step + 1);
    } else if (_step.toLowerCase() === "back") {
      setStep(step - 1);
    }
  };

  const addDataId = (id) => {
    setData({ ...data, id: id });
  };

  const step_mapper = {
    0: (
      <VendorOrderForm
      size="lg"
        data={data}
        step={step}
        updateSetdata={setData}
        step_handler={step_handler}
        addDataId={addDataId}
        setShowPopup={props.setShowPopup}
        showPopup={props.showPopup}
      />
    ),
    1: (
      <FormTwo
      size="lg"
        data={data}
        productData={productData}
        step={step}
        updateSetdata={setData}
        updateSetProductData={setProductData}
        step_handler={step_handler}
        setTemp={setTemp}
        temp={temp}
      />
    ),

    2: (
      <FormThree
      size="lg"
        data={data}
        productData={productData}
        step={step}
        updateSetdata={setData}
        updateSetProductData={setProductData}
        step_handler={step_handler}
        // setPopups={props.setPopups}
        temp={temp}
      />
    ),
    3: (
      <PurchaseSummaryClosed
      size="lg"
        data={data}
        step={step}
        productData={productData}
        updateSetdata={setData}
        step_handler={step_handler}
        paymentMode={paymentMode}
      />
    ),
    4: (
      <PurchaseReturnForm
      size="lg"
        data={data}
        step={step}
        productData={productData}
        updateSetdata={setData}
        step_handler={step_handler}
        paymentMode={paymentMode}
      />
    ),
  };

  if (data === undefined || productData === undefined) {
    return <div>Please Wait...</div>;
  }

  if (data.id === undefined) {
    return (
      <VendorOrderForm     size="lg"
        data={data}
        productData={productData}
        step={step}
        updateSetdata={setData}
        step_handler={step_handler}
      />
    );
  }

  else if (data.id !== undefined && data.isConformed === undefined) {
    return (
      <FormTwo     size="lg"
        data={data}
        productData={productData}
        step={step}
        updateSetdata={setData}
        step_handler={step_handler}
        load_purchase_summary={(e) => {
          props.load_purchase_summary(e);
        }}
      />
    );
  }

  else if (data.isConformed === 1) {
    return (
      <FormThree     size="lg"
        data={data}
        productData={productData}
        step={step}
        updateSetdata={setData}
        step_handler={step_handler}
        load_purchase_summary={(e) => {
          props.load_purchase_summary(e);
        }}
      />
    );
  } else if (
    data.isPaymentRelease &&
    data.isPaymentRelease === 1 &&
    data.isCompleted &&
    data.isCompleted === 1
  ) {
    return (
      <FormThree     size="lg"
        data={data}
        productData={productData}
        load_purchase_summary={(e) => {
          props.load_purchase_summary(e);
        }}
      />
    );
  }
  return (
    <div>
      {data.id === undefined ? step_mapper[0] : step_mapper[step + 1]}
    </div>
  );
};
