import React, { useState, useEffect} from "react";
import Select from "react-select";
import axios from "axios";
import config from "../../../utils/config";
import { toast } from "react-toastify";
import UserSessionContext from "../../../contexts/UserSessionContext";
import Spinner from "../../../utils/spinner";
import {
  Grid,
  Box,
} from "@material-ui/core";

const EditAssignUserRoles = (props) => {
  const userSessionContext = React.useContext(UserSessionContext);
  const [roleid, setRoleid] = useState();
  const [role, setRole] = useState([]);

  useEffect(() => {
    loadRoles();
    getSpecificRoleId();
  }, []);

  const loadRoles = async() => {
  await  axios
      .get(`${config.APP_CONFIG}/api/userRoles`,{
        headers:{
          Authorization:userSessionContext.token
        }
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
        } 
       else if (res.data && res.data.status_code && res.data.status_code === 400) {
          toast.warn(res.data.msg);
        }
        else if (res.data && res.data.status_code && res.data.status_code === 401) {
          userSessionContext.handleLogout();
        }
        else {
          toast.error("Cannot load roles.");
          setRole([]);
        }
      })
      .catch((err) => {
        toast.error("Error occured");
        setRole([]);
      });
  };

  const getSpecificRoleId = async() => {
   await axios.get(`${config.APP_CONFIG}/Settings/UserToRoleMap/api/${props.data.id}`,{
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
  if (roleid === undefined) {
    <Spinner />;
  }
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

  const Delete = (roleid, userid) => {
    axios
      .delete(
        `${config.APP_CONFIG}/Settings/UserToRoleMap/api/${userid}/${roleid}`,{
          headers:{
            Authorization:userSessionContext.token
          }
        })
      .then((res) => {
        if (res.data.status_code === 200) {
          toast.success("Deleted Successfully");
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogout();
        }else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
        } else {
          toast.warn("Unable to Delete Role");
        }
      })
      .catch((err) => {
        toast.error("failed to delete role");
      });
  };

  const onChangeEvent = (value, action) => {
    if (action.action === "select-option") {
      let new_role = value[value.length - 1];
      updateRole(new_role.value);
    } else if (action.action === "remove-value") {
      let removed_role = roleid.filter((x) => {
        return !value.map((x) => x.value).includes(x.value);
      });
      Delete(removed_role[0].value, props.data.id);
    } else {
      toast.error("Unable to Delete");
    }
    setRoleid(value);
  };

  return (
    <div>
      <Box sx={{ height: "100%" }}>
      Select Roles:
        <Grid container>
          <Grid item xs={6}>
             <Select
              isMulti 
              isSearchable= {false} 
              options={role}
              value={roleid}
              onChange={(e, action) => {
              onChangeEvent(e, action);
              }}
              styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }), width: "100%" }}
                menuPortalTarget={document.body}
            ></Select>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
export default EditAssignUserRoles;
