import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Form } from "../home/useForm";
import Controls from "../controls/Controls";
import axios from "axios";
import config from "../../utils/config";
import UserSessionContext from "../../contexts/UserSessionContext";
import { toast } from "react-toastify";
import Spinner from "../../utils/spinner";
import CompanyContext from "../../contexts/CompanyContext";
import "date-fns";
import { format } from "date-fns";
import Select from "react-select";
//import UserAuthenticationContext from "../../contexts/UserAuthenticationContext";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import Popup from "../home/Popup";
import CustomerForm from "./CustomerForm";

export default function FormOne(props) {
  const userSessionContext = React.useContext(UserSessionContext);
  const companyContext = React.useContext(CompanyContext);
  const companyId=companyContext.company.id;
  // const _data = props.data || {};
  // const { values, setValues, handleInputChange, ResetForm } = useForm(_data);
  const [value, setValue] = useState(props.data || {});
  const [customerNames, setCustomerNames] = useState();
  const [customer, setCustomer] = useState("");
  const [customerdetails, setCustomerdetails] = useState();
  const [isNewPopup, setIsNewPopup] = useState(false);
  const [records, setRecords] = useState();
  
  useEffect(() => {
    loadCustomerNames();
  }, []);

  const loadCustomerNames = async() => {
   await axios
      .get(`${config.APP_CONFIG}/usersApi/Users/customer`, {
        headers: { Authorization: userSessionContext.token },
      })
      .then((res) => {
        if (res.data && res.data.status_code && res.data.status_code === 200) {
          setCustomerdetails(res.data.msg);
          console.log(res.data.msg)
          let temp = res.data.msg.map((name, index) => ({
         
            label: name.firstName.concat(" " + name.lastName||""),
            value: name.id,
            address : name.address1,
            panNo: name.panNo

          }));
          console.log(temp)
          setCustomerNames(temp);
          
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogout();
        } else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
        } else {
          toast.error(res.data.msg);
          setCustomerNames([]);
        }
      })
      .catch((err) => {
        toast.error("Something Went Wrong");
        setCustomerNames([]);
      });
  };

  // useEffect(() => {
  //   loadCustomers();
  // }, []);

  // const loadCustomers = async () => {
  //   axios
  //     .get(`${config.APP_CONFIG}/Setting/Vendor/api`,{ headers: {Authorization: userSessionContext.token } })
  //     .then((res) => {
  //       if (res.data.status_code === 401) {
  //         userSessionContext.handleLogOut();
  //       } else if (
  //         res.data &&
  //         res.data.status_code &&
  //         res.data.status_code === 200
  //       ) {
  //         setRecords(res.data.msg || []);
  //       }
  //       else if(res.data.status_code === 400){
  //         toast.error(res.data.msg);
  //         setRecords([]); 
  //       }
  //       else {
  //         toast.error("Cannot load Users");
  //         setRecords([]);
  //       }
  //     })
  //     .catch((err) => {
  //       toast.error("Something went Wrong");
  //       setRecords([]);
  //     });
  // };

  const AddCustomer = (_data) => {
    axios
      .post(`${config.APP_CONFIG}/usersApi/Users`, _data, {
        headers: { Authorization: userSessionContext.token },
      })
      .then((res) => {
        if (res.data.status_code === 200) {
          toast.success("Successfully Inserted Customer");
          loadCustomerNames();
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


console.log(customerNames)
console.log(props.data)
  const SalesHandler = () => {
    if (
    
      customer === undefined || null || ""
    ) {
      return toast.warn("Please Select Customer");
    } else {
      let _dateOfSales = format(new Date(), "yyyy-MM-dd HH:mm:ss");
      if (value.dateOfSales !== undefined) {
        _dateOfSales = format(
          new Date(value.dateOfSales),
          "yyyy-MM-dd HH:mm:ss"
        );
      }
      const req_data = {
        fiscalYear: companyContext.fiscal[0]["fiscalYear"],
        customerId: customer.value,
              customerName: customer.label,      
        dateOfSales: _dateOfSales,
        companyId: companyContext.company.id,
        cashierName: localStorage.getItem('user'),
      };
      axios
        .post(`${config.APP_CONFIG}/Sales/SalesSummary/api`, req_data, {
          headers: { Authorization: userSessionContext.token },
        })
        .then((res) => {
          if (res.data.status_code === 200) {
            // toast.info(res.data.msg);
       
            const mydata = {
              id: res.data.msg,
              fiscalYear: companyContext.fiscal[0]["fiscalYear"],
              customerId: customer.value,
              customerName: customer.label, 
              dateOfSales: _dateOfSales,
              companyId: companyContext.company.id,
              address: customer.address,
              panNo: customer.panNo

            };
         
            toast.success("Successfully Added Customer");
            props.updateSetData({ ...props.data, ...mydata });
 
        
            props.step_handler("next");
          } else if (res.data.status_code === 400) {
            toast.error(res.data.msg);
          } else if (res.data.status_code === 401) {
            userSessionContext.handleLogOut();
          } else if (res.data.status_code === 101) {
            toast.warn(res.data.msg);
          } else {
            toast.error(res.data.msg);
          }
        })
        .catch((err) => {
          // console.log(err);
          toast.error("Something Went Wrong");
        });
    }
  };

  if (customerNames === undefined) {
    return <Spinner />;
  }
  return (
    <Form
      // onSubmit={(e) => {
      //   e.preventDefault();
      //   SalesHandler();
      // }}
    >

{isNewPopup ? (
    <Popup
      title="Add Customer"
      openPopup={isNewPopup}
      setPopups={setIsNewPopup}
    >
      <CustomerForm
           handleSubmit={AddCustomer}
        // setAddLedger={true}
           setIsNewPopup={setIsNewPopup}
           LoadCustomerName={props.LoadCustomerName}
      />
    </Popup>
  ) : null}

      <Grid container>
        <Grid item xs={5}>
          <label>Customer Name</label>
          <Select
            placeholder={"Search customer...."}
            type="text"
            defaultValue={customerNames[0]}
            options={customerNames}
            styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
            menuPortalTarget={document.body}
            value ={customer}
            onChange={setCustomer}
          //   value={{
          //     label: value.customerName,
          //     value: value.customerId,
          //   }}
          //   onChange={(e) => {
          //     const _temp = {
          //       customerName: e.label,
          //       customerId: e.value,
          //     };
          
          //      let temp=customerdetails.filter((x) => {return x.id === parseInt(e.value)})
          //      const temp_data=temp[0]||{};
        
          //  setCustomer(temp_data);
            
              
          //     setValue({
          //       ...value,
          //       ..._temp,
          //     });
          //   }}
            required={true}
          />
        </Grid>
        <Grid item xs>
        <Controls.ActionButton
          size="small"
          variant="contained"
          color="#ffffff"
          onClick={() => {
            setIsNewPopup(!isNewPopup);
          }}
          // style={{marginTop: "30px"}}
         >
          
           <Tooltip title="Add Customer">
            <AddIcon style={{ fontSize: "20px", marginTop: "25px"}} />
          </Tooltip>
         </Controls.ActionButton> 

        </Grid>
        <Grid item xs={6}>
          <Controls.DatePicker
            name="dateOfSales"
            label="Date Of Sales"
            value={value.dateOfSales}
            onChange={(e) => {
              setValue({
                ...value,
                dateOfSales: e.target.value,
              });
            }}
          />
        </Grid>
        <div>
          <Controls.Button
            type="submit"
            text="Next"
            onClick={(e) => {
              e.preventDefault();
              SalesHandler();
              // props.step_handler("next");
            }}
            style={{marginLeft: "30px"}}

          />
         
        </div>
      </Grid>
    </Form>
  );
}
