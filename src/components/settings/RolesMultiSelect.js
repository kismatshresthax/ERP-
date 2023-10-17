import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import config from "../../utils/config";
import { toast } from "react-toastify";
import AssignUserRoles from "./users/AssignUserRoles";
import UserSessionContext from "../../contexts/UserSessionContext";
export { useStyles, MenuProps, options };
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: 300,
  },
  indeterminateColor: {
    color: "#f50057",
  },
  selectAllText: {
    fontWeight: 500,
  },
  selectedAll: {
    backgroundColor: "rgba(0, 0, 0, 0.08)",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.08)",
    },
  },
}));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
  getContentAnchorEl: null,
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "center",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "center",
  },
  variant: "menu",
};

let options = [];

const RolesMultiSelect = () => {
  const userSessionContext = React.useContext(UserSessionContext);
  const [role, setRole] = React.useState();

  React.useEffect(() => {
    loadRoles();
  }, []);

  const loadRoles = async() => {
   await axios
      .get(`${config.APP_CONFIG}/api/userRoles`,{
        headers:{
          Authorization:userSessionContext.token
        }
      })
      .then((res) => {
        if (res.data && res.data.status_code && res.data.status_code === 200) {
          setRole(res.data.msg || []);
        }
        else if (res.data.status_code === 401) {
          userSessionContext.handleLogOut();
        } else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
        }else {
          toast.error("Cannot load roles.");
          setRole([]);
        }
      })
      .catch((err) => {
        toast.error("Error occured");
        setRole([]);
      });
  };
  const options = [role];
  <AssignUserRoles options={options} />;
};
export default RolesMultiSelect;
