import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";


import SalesTransactionCompleted from "./SalesTransactionCompleted";
import SalesNotCompleted from "./SalesNotCompleted";

import PageHeaderTitle from "../../utils/PageHeaderTitle";
import Controls from "../controls/Controls";
import AddIcon from "@material-ui/icons/Add";
import UserSessionContext from "../../contexts/UserSessionContext";
import CompanyContext from "../../contexts/CompanyContext";
// import { toast } from "react-toastify";

import Popup from "../home/Popup";
import {
  makeStyles,
  
} from "@material-ui/core";
import UserAuthenticationContext from "../../contexts/UserAuthenticationContext";
import Spinner from "../../utils/spinner";
import { toast } from "react-toastify";
import axios from "axios";
import config from "../../utils/config";
import FormOne from "./FormOne";
import FormTwo from "./FormTwo";
import FormThree from "./FormThree";



const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  newButton: {
    position: "absolute",
    right: "0px",
    zIndex: 4,
    top: "45px",
    marginRight: "0",
  },
}));


export default function SalesSummaryTabs(props) {
  const userSessionContext = React.useContext(UserSessionContext);
  const companyContext = React.useContext(CompanyContext);
  const companyId = companyContext.company.id;
  const [value, setValue] = React.useState("1");
  const [records, setRecords] = useState();
  const classes = useStyles(props);
  const [isNewPopup, setIsNewPopup] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isEditPopup, setIsEditPopup] = useState(false);
  const fiscalyear = localStorage.getItem('fiscal');
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const permissionContext = React.useContext(UserAuthenticationContext);
  let userPermission = permissionContext.permissions;
 

  useEffect(() => {
    load_sales_summary();
    // loadVendorname();
  }, []);


  
  // useEffect(() => {
  //   if( companyContext.fiscal[0]["fiscalYear"]===undefined||null)
  //   userSessionContext.handleLogout();
  // }, []);
  const load_sales_summary =  () => {
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
          setRecords(res.data.msg);
        } else if (res.data.status_code === 401) {
         
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <div className="salesSummaryPage">
        {showPopup ? (
          <Popup
            title="Sales Form"
            size="lg"
            openPopup={showPopup}
            setPopups={(e) => {
              //setIsNewPopup(false);
              setIsEditPopup(false);
              setShowPopup(e);
            }}
          >
            <PopupHandler
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

        {userPermission["u_create"] !== 1 ? (
          <div className="addButton">
            <Controls.Button
              text="Add New"
              variant="outlined"
              startIcon={<AddIcon />}
              className={classes.newButton}
              //   style={{ marginTop: "65px", marginRight: "0"}}
              onClick={() => {
                // setIsNewPopup(!isNewPopup);
                setShowPopup(true);
              }}
            />
            {/* <Link className="btn btn-primary" to="/purchase/summaryform">
                create
                </Link> */}
          </div>
        ) : null}
      </div>
      <PageHeaderTitle title="Sales Summary" />
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            style={{ marginTop: "80px" }}
          >
            <Tab label="Transaction Completed" value="1" />
            <Tab label="Transaction Not Completed" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <SalesTransactionCompleted />
        </TabPanel>
        <TabPanel value="2">
          <SalesNotCompleted />
        </TabPanel>
      </TabContext>
    </Box>
  );
}

const PopupHandler = (props) => {
  const userSessionContext = React.useContext(UserSessionContext);
  const [data, setData] = useState();
  // const [updateData, setUpdateData] = useState([]);
  const [salesData, setSalesData] = useState();
  const [paymentMode, setPaymentMode] = useState();
  const fiscalYear = localStorage.getItem('fiscal');
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
   await   axios
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
        fiscal={fiscalYear}
        salesData={salesData}
        updateSetData={setData}
        step_handler={step_handler}
       
        addData={addData}
      />
    ),
    1: (
      <FormTwo
        data={data}
        step={step}
        fiscal={fiscalYear}
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
        fiscal={fiscalYear}
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
    data.isConform === undefined &&
    data.isPaymentRelease === undefined
  ) {
    return (
      <FormOne
        data={data}
        step={step}
        salesData={salesData}
        fiscal={fiscalYear}
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
        fiscal={fiscalYear}
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
        fiscal={fiscalYear}
        salesData={salesData}
        updateSetdata={setData}
        step_handler={step_handler}
        paymentMode={paymentMode}
        load_sales_summary={(e) => {
          props.load_sales_summary(e);
        }}
      />
    );
  } else if (data.id === undefined) {
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
