import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import axios from "axios";
import config from "../../utils/config";

import { toast } from "react-toastify";
// import { useHistory } from "react-router-dom";

import MaterialClientForm from "./MaterialClientForm"
import MaterialCustomerForm from "./MaterialCustomerForm"
import UserSessionContext from "../../contexts/UserSessionContext";

export default function LabTabs(props) {

  const{addUser}=props;
  const{AddCustomer}=props;
  const{updateClient}=props;
  const{updateCustomer}=props;
  const{data}=props;

  const userSessionContext = React.useContext(UserSessionContext);
  const [records, setRecords] = useState();
  const [value, setValue] = React.useState('1');
  const [role, setRole] = useState([]);
  const [insertId, setinsertId] = useState();
  const [isNewPopup, setIsNewPopup] = useState(false);

  // let history = useHistory();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    //loadVendors();
    loadUsers();
  }, []);

  // const loadVendors = async () => {
  //   axios
  //     .get(`${config.APP_CONFIG}/Customer/UsersAPI`,{ headers: {Authorization: userSessionContext.token } })
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

  // useEffect(() => {
    
  // }, [records]);
  const loadUsers =  async() => {
  await  axios
      .get(`${config.APP_CONFIG}/usersApi/Users/customer`, {
        headers: {
          Authorization: userSessionContext.token,
        },
      })
      .then((res) => {
  
        if (res.data.status_code === 401) {
          userSessionContext.handleLogOut();
        } else if (
          res.data &&
          res.data.status_code &&
          res.data.status_code === 200
        ) {
          setRecords(res.data.msg || []);
        } else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
          setRecords([]);
        } else {
          toast.error("Error Occurred");
          setRecords([]);
        }
      })
      .catch((err) => {
        toast.error("Something went Wrong");
        setRecords([]);
      });
  };


  // const addUser = (data) => {
    
  //   axios.post(`${config.APP_CONFIG}/usersApi/Users`, data, {
  //          headers: {
  //            Authorization: userSessionContext.token,
  //          },
  //        })
  //        .then((res) => {
  //          if (res.data.status_code === 200) {
  //            loadUsers();
  //            setinsertId(res.data.msg);
  //            toast.success("Successfully Added User");
  //            setIsNewPopup(false);
  //           //  history.push("/sales/Clients"); 
  //          } else if (res.data.status_code === 401) {
  //            userSessionContext.handleLogout();
  //          } else if (res.data.status_code === 400) {
  //            toast.warn(res.data.msg);
  //          }
  //        })
  //        .catch((err) => {
  //          toast.error("Something went Wrong");
  //        });
  //        // {data.isCustomer===1?setIsNewPopup(false) : setIsNewPopup(true)}
  //        setIsNewPopup(false);
  //    };

  //    const AddCustomer = (_data) => {
  //     axios
  //       .post(`${config.APP_CONFIG}/usersApi/Users`, _data, {
  //         headers: { Authorization: userSessionContext.token },
  //       })
  //       .then((res) => {
  //         if (res.data.status_code === 200) {
  //           toast.success("Successfully Inserted Customer");
  //           loadUsers();
  //           setIsNewPopup(false);
  //           // history.push("/sales/Clients"); 
  //         } else if (res.data.status_code === 401) {
  //           userSessionContext.handleLogout();
  //         } else if (res.data.status_code === 400) {
  //           toast.warn(res.data.msg);
  //         }
  //       })
  //       .catch((err) => {
  //         toast.error("Something went Wrong");
  //       });
  //       setIsNewPopup(false)
  //   };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab 
                className='tab'
                label="Organization" 
                value="1" 
            />
            <Tab 
                className='tab'
                label="Customer" 
                value="2" 
            />
          </TabList>
        </Box>
        <TabPanel value="1">
        <MaterialClientForm
              handleSubmit={addUser}
              role={role}
              insertId={insertId}
              handleUpdate={updateClient}
              data={data}
            />
        </TabPanel>
        <TabPanel value="2">
          <MaterialCustomerForm 
              handleSubmit={AddCustomer}
              handleUpdate={updateCustomer}
              data={data}
          />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
