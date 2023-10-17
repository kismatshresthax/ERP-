import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
// import Purchasesummarytab from "./Purchasesummarytab";
//import PurchaseReturnForm from "./PurchaseReturnForm";
import PageHeaderTitle from "../../utils/PageHeaderTitle";
import PurchaseNotCompleted from './PurchaseNotCompleted';
import PurchaseTransactionCompleted from './PurchaseTransactionCompleted';
import Controls from "../controls/Controls";
import AddIcon from "@material-ui/icons/Add";
import UserSessionContext from "../../contexts/UserSessionContext";
import { toast } from "react-toastify";

import Popup from "../home/Popup";
import {
  makeStyles,
 
} from "@material-ui/core";
import UserAuthenticationContext from "../../contexts/UserAuthenticationContext";
import CompanyContext from "../../contexts/CompanyContext";
import Spinner from "../../utils/spinner";
import axios from "axios";
import config from "../../utils/config";
import FormTwo from "./FormTwo";
import FormThree from "./FormThree";
import VendorOrderForm from "./VendorOrderForm";
import ConfirmDialog from "../home/ConfirmDialog";
import PurchaseSummaryClosed from "./PurchaseSummaryClosed";
import PurchaseReturnForm from "./PurchaseReturnForm";


const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(0),
  },
  newButton: {
    position: "absolute",
    right: "0px",
    zIndex: 4,
    marginRight: 0,
  },
}));

const headCells = [
  { id: "vendorname", label: "Vendor Name" },
  { id: "vendorReference", label: "Vendor Reference" },
  { id: "description", label: "Description" },
  { id: "grandTotal", label: "Grand Total" },
  { id: "actions", label: "Actions", disableSorting: true },
];
export default function Purchasesummarytab(props) {
  const userSessionContext = React.useContext(UserSessionContext);
  const [value, setValue] = React.useState('1');
  const [records, setRecords] = useState();
  const classes = useStyles(props);
  const [showPopup, setShowPopup] = useState(false);
  const [isNewPopup, setIsNewPopup] = useState(false);
  const [isEditPopup, setIsEditPopup] = useState(false);
  const [isPurchaseReturnPopup, setIsPurchaseReturnPopup] = useState(false);
  const companyContext = React.useContext(CompanyContext);
  const companyId = companyContext.company.id;
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  
  // const [filterFn, setFilterFn] = useState({
  //   fn: (items) => {
  //     return items;
  //   },
  // });
  const permissionContext = React.useContext(UserAuthenticationContext);
  let Permission = permissionContext.permissions;

  let curr_mod_permission = Permission.filter((x) => {
    return x["module_name"].toLowerCase() === "purchases";
  });
  let userPermission = curr_mod_permission[0];

  useEffect(() => {
    load_purchase_summary();
  }, []);

  const load_purchase_summary = async () => {
    await axios
      .get(`${config.APP_CONFIG}/Purchase/ProductPurchaseSummary/api/${companyId}`, {
        headers: {
          Authorization: userSessionContext.token,
        },
      })
      .then((res) => {
        if (res.data.status_code === 200) {
          setRecords(res.data.msg);
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogout();
        } else {
          toast.error("Warning");
          setRecords([]);
        }
      })
      .catch((err) => {
        toast.error("Error in tab");
        setRecords([]);
      });
  };

//   const handleSearch=()=>{
//     if(value===1){
//     childRef.current.handleSearch1();
//   }
//    else{
//     childRef.current.handleSearch2();
//    }
//  }
  // const handleSearch = (e) => {
  //   let query = e.target.value;

  //   setFilterFn({
  //     fn: (items) => {
  //       if (query === "") return items;
        
  //       else
  //         return items.filter(
  //           (x) =>
  //             (x.vendorname )
  //               .toLowerCase()
  //               .includes(query.toLowerCase())
  //         );
  //     },
  //   });
  // };


  if (records === undefined) {
    return <Spinner />;
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (

    <Box sx={{ width: '100%', typography: 'body1' }}>
      
      <PageHeaderTitle title="Purchase Summary"/>
      
      <div>
      {showPopup ? (
          <Popup
      //size={step_mapper[0]>1?"lg":""}
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

   {userPermission["u_create"] === 1 ? (
     <div className="addButton">
       <Controls.Button
         text="Add New"
         variant="outlined"
         startIcon={<AddIcon />}
         className={classes.newButton}
         style={{ top: "-3px"}}
         onClick={() => {
           setShowPopup(true);
         }}
       />
     </div>
   ) : null}

</div>
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
   onChange={props.handleSearch}
 />
</Toolbar> */}

      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" style={{marginTop: "80px"}}>
            <Tab label="Transaction Completed" value="1" />
            <Tab label="Transaction Not Completed" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1"><PurchaseTransactionCompleted /></TabPanel>
        <TabPanel value="2"><PurchaseNotCompleted /></TabPanel>
      </TabContext>
    </Box>
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
  const companyContext = React.useContext(CompanyContext);
  const companyId = companyContext.company.id;
  let Permission = permissionContext.permissions;

  let curr_mod_permission = Permission.filter((x) => {
    return x["module_name"].toLowerCase() === "purchases";
  });
  let userPermission = curr_mod_permission[0];

  React.useEffect(async() => {
    if (props.isEditPopup) {
   await   axios
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
      <VendorOrderForm
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
      <FormTwo
      size="lg"
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
      <FormThree
      size="lg"
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
      <FormThree
      size="lg"
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