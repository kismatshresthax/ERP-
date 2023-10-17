import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import config from "../../../utils/config";
import { toast } from "react-toastify";
import UserSessionContext from "../../../contexts/UserSessionContext";
import { Grid, Box } from "@material-ui/core";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";


const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
}));

const AssignUserRoles = (props) => {
  const userSessionContext = React.useContext(UserSessionContext);
  const [name,setName] = useState([]);
 // const [companyid,setCompanyId] = useState([]);
  const [roleid, setRoleid] = useState();
  const [role, setRole] = useState([]);
  useEffect(() => {
    loadcompany();
 }, []);
  const loadcompany = async () => {
    axios.get(`${config.APP_CONFIG}/Companies/Company` ,{ headers:{
      Authorization:userSessionContext.token}
    })
    .then(res=>
     {
     if(res.data&&res.data.status_code&&res.data.status_code === 200)
     {
       let temp = res.data.msg.map((name,index)=> ({ label: name.name, value: name.id }))
       setName(temp)
     }
     else
     {
       toast.error("Cannot load Company name.")
       setName([])
     }
   })
   .catch(err=>{
     toast.error("failed to load data")
     setName([])
     })
  };
  useEffect(() => {
    loadRoles();
    getSpecificRoleId();
  }, []);

  const loadRoles = async() => {
   await axios
      .get(`${config.APP_CONFIG}/api/userRoles`, {
        headers: {
          Authorization: userSessionContext.token,
        },
      })
      .then((res) => {
        if (res.data && res.data.status_code && res.data.status_code === 200) {
          //   setRole(res.data.msg || []);
          setRole(
            res.data.msg.map((name, index) => ({
              label: name.name,
              value: name.id,
            }))
          );
        } else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
        } else {
          toast.error("Cannot load roles.");
          setRole([]);
        }
      })
      .catch((err) => {
        toast.error("Error occured");
        setRole([]);
      });
  };

  // const addRole = (id) => {
  //   let res_data = {
  //     // user_id: props.userToRole.userId,
  //     user_id: props.data.id,
  //     user_role_id: parseInt(id),
  //   };
  //   axios
  //     .post(`${config.APP_CONFIG}/Settings/UserToRoleMap/api`, res_data, {
  //       headers: {
  //         Authorization: userSessionContext.token,
  //       },
  //     })
  //     .then((res) => {
  //       if (res.data.status_code === 200) {
  //         // loadRoles();
  //         toast.success(res.data.msg);
  //       } else if (res.data.status_code === 401) {
  //         userSessionContext.handleLogout();
  //       } else if (res.data.status_code === 400) {
  //         toast.warn(res.data.msg);
  //       } else {
  //         toast.warn("Unable to Assign Role");
  //       }
  //     })
  //     .catch((err) => {
  //       toast.error("Something went Wrong");
  //     });
  // };

  const Delete = (roleid, userid) => {
    axios
      .delete(
        `${config.APP_CONFIG}/Settings/UserToRoleMap/api/${userid}/${roleid}`,
        {
          headers: {
            Authorization: userSessionContext.token,
          },
        }
      )
      .then((res) => {
        if (res.data.status_code === 200) {
          toast.info("Deleted successfully");
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogout();
        } else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
        } else {
          toast.warn("Unable to Delete Role");
        }
      })
      .catch((err) => {
        toast.error("failed to delete role");
      });
  };

  const getSpecificRoleId = async() => {
  await  axios.get(`${config.APP_CONFIG}/Settings/UserToRoleMap/api/${props.data.id}`,{
        headers:{
          Authorization:userSessionContext.token
        }
      })
      .then((res) => {
        if (res.data && res.data.status_code && res.data.status_code === 200) {
          // setRoleid(res.data.msg.map(x=>({label: x.roleName, value: x.roleId})))

          let temp = res.data.msg.map((x) => ({
            label: x.roleName,
            value: x.roleId,
          }));
          setRoleid(temp);
        } 
       else if(res.data && res.data.status_code && res.data.status_code === 400){
          toast.warn(res.data.msg);
        }
       else if(res.data && res.data.status_code && res.data.status_code === 401){
          userSessionContext.handleLogout();
        }
       else {
          toast.error("Couldn't load roles.");
          setRoleid([]);
        }
      })
      .catch((err) => {
        toast.error("Error occured");
        setRoleid([]);
      });
  };

  const updateRole = (id) => {
    let res_data = {
      user_id: props.data.id,
      user_role_id: parseInt(id),
    };
    axios
      .post(`${config.APP_CONFIG}/Settings/UserToRoleMap/api`, res_data,{
        headers:{
          Authorization:userSessionContext.token
        }
      })
      .then((res) => {
        if (res.data.status_code === 200) {
          // loadRoles();
          toast.success(res.data.msg);
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogout();
        } else {
          toast.error("Unable to Update Role");
        }
      })
      .catch((err) => {
        toast.error("Something went Wrong");
      });
  };

  const onChangeEvent = (value, action) => {
    // if (action.action === "select-option") {
    //   let new_role = value[value.length - 1];
    //   addRole(new_role.value);
      if (action.action === "select-option") {
        let new_role = value[value.length - 1];
        updateRole(new_role.value);
    } else if (action.action === "remove-value") {
      let removed_role = roleid.filter((x) => {
        return !value.map((x) => x.value).includes(x.value);
      });
      //console.log(removed_role[0]);
      Delete(removed_role[0].value, props.data.id);
    } else if (action.action === "clear") {
      toast.warn("Remove role one by one");
    } else {
      toast.error("Unable to Delete");
    }
    setRoleid(value);
  };

  return (
    <div className="userPasswordForm">
      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          
         
            {/* <Grid item xs={6}>
            <p style={{paddingLeft:"8px", margin:"0"}}> Company:</p>  
            <Item style={{ boxShadow: "none" }}>
              <Select
              
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }), width: "100%" }}
                menuPortalTarget={document.body}
                //isSearchable={false}
             
                options={name}
               // value={role.value}
               value={companyid}
                onChange={setCompanyId}
              ></Select>              
            </Item>
          </Grid> */}
          <Grid item xs={6}>
            <p style={{paddingLeft:"8px", margin:"0"}}> Select Roles:</p>  
            <Item style={{ boxShadow: "none" }}>
              <Select
                id="multi-select"
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }), width: "100%" }}
                menuPortalTarget={document.body}
                isSearchable={false}
                isMulti
                options={role}
               // value={role.value}
               value={roleid}
                onChange={(e, action) => {
                  onChangeEvent(e, action);
                }}
              ></Select>              
            </Item>
            </Grid>
        </Grid>
      </Box>
    </div>
  );
};
export default AssignUserRoles;
