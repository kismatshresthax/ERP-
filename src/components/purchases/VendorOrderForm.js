import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { useForm, Form } from "../home/useForm";
import Controls from "../controls/Controls";
import axios from "axios";
import config from "../../utils/config";
import UserSessionContext from "../../contexts/UserSessionContext";
import { toast } from "react-toastify";
import Spinner from "../../utils/spinner";
import CompanyContext from "../../contexts/CompanyContext";
import { format } from "date-fns";
// import "date-fns";
import UserAuthenticationContext from "../../contexts/UserAuthenticationContext";
import Select from "react-select";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import Popup from "../home/Popup";
import VendorsForm from "./VendorsForm";

const initialFValues = {
 // vendorId: "",
  vendorname: "",
  vendorReference:"",
  orderDeadline:  new Date(),
  description:"",
  recepitDate: new Date(),
};

export default function VendorOrderForm(props) {
  const userSessionContext = React.useContext(UserSessionContext);
  const companyContext = React.useContext(CompanyContext);
  const _data = initialFValues||props.data;

  
  const [vendorName, setVendorName] = useState();
  const [vendorId, setVendorId] = useState([] || "");
  const [isNewPopup, setIsNewPopup] = useState(false);
  console.log("vendorName",vendorName)
  const validate = (fieldValues=values) => {
    let temp = { ...errors }
    
    if ("vendorReference" in fieldValues)
      temp.vendorReference=fieldValues.vendorReference?"":"This field is required"
    // if ("description" in fieldValues)
    //   temp.description=fieldValues.description?"":"This field is required"
    setErrors({
      ...temp,

    });
    if (fieldValues === values)
      return Object.values(temp).every(x => x === ""||undefined)
  }

  const {values,setValues, handleInputChange, ResetForm, errors,  setErrors } = useForm(_data, true, validate);
// console.log("values",values)

  var adbs = require("ad-bs-converter");
  const permissionContext = React.useContext(UserAuthenticationContext);
  let Permission = permissionContext.permissions;

  let curr_mod_permission = Permission.filter((x) => {
    return x["module_name"].toLowerCase() === "purchases";
  });
  let userPermission = curr_mod_permission[0];
  useEffect(() => {
    loadVendorname();
  }, []);

  const loadVendorname = async () => {
    await axios
      .get(`${config.APP_CONFIG}/Setting/Vendor/api`, {
        headers: {
          Authorization: userSessionContext.token,
        },
      })
      .then((res) => {
        if (res.data && res.data.status_code && res.data.status_code === 200) {
          let temp = res.data.msg.map((name, index) => ({
            label: name.firstName,
            value: name.id,
            address:name.address1,
            panNo:name.panNo,
            contact:name.contactNumber1
          }));
          setVendorName(temp);
        } else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
        } else {
          toast.error(res.data.msg);
          setVendorName([]);
        }
      })
      .catch((err) => {
        toast.error("Something Went Wrong");
        setVendorName([]);
      });
  };

  const AddVendor = (_data) => {
    axios
      .post(`${config.APP_CONFIG}/Setting/Vendor/api`, _data, {
        headers: { Authorization: userSessionContext.token },
      })
      .then((res) => {
        if (res.data.status_code === 200) {
          toast.success("Successfully Inserted Vendor");
          loadVendorname();
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogout();
        } else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
        }
      })
      .catch((err) => {
        toast.error("Something went Wrong");
      });
    setIsNewPopup(false)
  };

 
 
  const OrderHandler = (e) => {
    e.preventDefault();

    if(vendorId.value===undefined||null){

      toast.warn("please select vendor");
    }
else{

    if (validate()) {

      let orderDeadline = format(new Date(), "yyyy/MM/dd");
      let receiptDate = format(new Date(), "yyyy/MM/dd");
     
   
      if (values.orderDeadline !== undefined) {
        orderDeadline = format(new Date(values.orderDeadline), "yyyy/MM/dd");
        
    

      }
      if (values.recepitDate !== undefined) {
        receiptDate = format(new Date(values.recepitDate), "yyyy/MM/dd");
 
      }
      let req_data = {
        vendorId: vendorId.value,
        vendorReference: values.vendorReference,
        orderDeadline: orderDeadline,
        recepitDate: receiptDate ,
        description: values.description,
        companyId: companyContext.company.id,
        createdBy: localStorage.getItem("user"),
        
      }


      axios.post(`${config.APP_CONFIG}/Purchase/ProductPurchaseSummary/api`, req_data, { headers: { Authorization: userSessionContext.token } })
        .then((res) => {
          if (res.data.status_code === 200) {
            const mydata = {
              id: res.data.msg,
              vendorId: vendorId.value,
              vendorReference: values.vendorReference,
              orderDeadline:   orderDeadline,
              recepitDate:  receiptDate ,
              description: values.description,
              companyId: companyContext.company.id,
              createdBy: localStorage.getItem("user"),
              vendorname:vendorId.label,
              address: vendorId.address,
              contact:vendorId.contact,
              panNo: vendorId.panNo,

            };

            props.updateSetdata({ ...props.data, ...mydata });

            // props.load_purchase_summary()
            props.step_handler("next");
          } else if (res.data.status_code === 400) {
            toast.warn(res.data.msg);
          } else if (res.data.status_code === 401) {
            userSessionContext.handleLogOut();
            
          } else {
            toast.error(res.data.msg);
          }
        })
        .catch((err) => {
          toast.error("Something Went Wrong");
        });
    }
  }
  };


  if (vendorName === undefined) {
    return <Spinner />;
  }


  return (
    <Form onSubmit={OrderHandler}>

      {isNewPopup ? (
        <Popup
          title="Add Vendor"
          openPopup={isNewPopup}
          setPopups={setIsNewPopup}
        >
          <VendorsForm
            handleSubmit={AddVendor}
            // setAddLedger={true}
            setIsNewPopup={setIsNewPopup}
            loadVendorname={props.loadVendorname}
          />
        </Popup>
      ) : null}

      <Grid container  spacing={2}className="purchaseForm">
   
      <Grid item xs={12} sm={12} md={6} lg={6}>
      <div style={{position:"relative"}}>
      <Grid container spacing={0.5}>
       
        <Grid item xs={11}>
       
          <Select
            type="text"
            placeholder={"Search Vendor...."}
            options={vendorName}
            styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
            menuPortalTarget={document.body}
            value={values.vendorId}
            onChange={setVendorId}
            required={true}

          />
       
              </Grid> 
              
 <Grid item xs={1}>
 <div style={{position:"absolute",right:"-10px",top:"10px"}}>
          <Controls.ActionButton
            size="small"
            variant="contained"
            color="#ffffff"
            onClick={() => {
              setIsNewPopup(!isNewPopup);
            }}
       
          >

            <Tooltip title="Add Vendor">
              <AddIcon  />
            </Tooltip>
          </Controls.ActionButton>
          </div>
  
        </Grid> 
        </Grid> 
        </div>
          <Controls.Input
          fullWidth="fullWidth"
            name="vendorReference"
            label="Bill no"
            value={values.vendorReference}
            onChange={handleInputChange}
            error={errors.vendorReference}
          
          />

<Controls.Input
            name="description"
            label="Description"
            multiline="multiline"
          maxRows={2}
            rows={2}
          
            value={values.description}
            onChange={handleInputChange}

 

          />
         
        </Grid>
   

        
        <Grid item xs={12} sm={12} md={6} lg={6}>
        <Controls.DatePicker sx={{mb:2}}
            name="orderDeadline"
            label="Order Deadline"
            value={values.orderDeadline}
            onChange={handleInputChange}
            disableFuture={true}
          />
          <Controls.DatePicker sx={{mb:2}}
            name="recepitDate"
            label="Receipt Date"
            value={values.recepitDate}
            onChange={handleInputChange}
            disableFuture={true}
          />
       
          
        </Grid>
        <div>
          <Controls.Button
            type="submit"
            text="Next"
        />
        </div>
       
      </Grid>
    </Form>
  );
}
