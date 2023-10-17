import React, { useState } from "react";
import Select from "react-select";
import axios from "axios";
import config from "../../utils/config";
import { toast } from "react-toastify";
import UserSessionContext from "../../contexts/UserSessionContext";
import {
  Grid,
  Box,

} from "@material-ui/core";

const AssignClientRoles = (props) => {
  const userSessionContext = React.useContext(UserSessionContext);
  const [roleid, setRoleid] = useState();

  const addRole = (id) => {
    let res_data = {
      user_id: props.insertId,
      user_role_id: parseInt(id),
    };
    axios
      .post(`${config.APP_CONFIG}/Settings/UserToRoleMap/api`,{
        headers: {
          Authorization: userSessionContext.token,
        },
      } ,res_data)
      .then((res) => {
        if (res.data.status_code === 200) {
          // loadRoles();
          toast.info("Successfully Assigned Role to User");
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogout();
        } else {
          toast.error("Unable to Assign Role");
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
          headers: {
            Authorization: userSessionContext.token,
          },
        }
      )
      .then((res) => {
        if (res.data.status_code === 200) {
          toast.info("deleted successfully");
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogout();
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
      addRole(new_role.value);
    } else if (action.action === "remove-value") {
      let removed_role = roleid.filter((x) => {
        return !value.map((x) => x.value).includes(x.value);
      });
      console.log(removed_role[0]);
      Delete(removed_role[0].value, props.insertId);
    } else {
      toast.error("Unable to Delete");
    }
    setRoleid(value);
  };

  return (
    <div>
      <Box sx={{ height: "100%" }}>
        <Grid container>
          <Grid item xs={6}>
            <Select
              isMulti
              options={props.role}
              value={props.role.value}
              onChange={(e, action) => {
                onChangeEvent(e, action);
              }}
            ></Select>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
export default AssignClientRoles;
