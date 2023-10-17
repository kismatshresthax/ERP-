import React, { useState, useEffect } from "react";
import axios from "axios";
import { Route, Link } from "react-router-dom";
import config from "../../utils/config";
import { toast } from "react-toastify";
import UserSessionContext from "../../contexts/UserSessionContext";
import "../../utils/styles.css";

import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import Controls from "../controls/Controls";
import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
import AddIcon from "@material-ui/icons/Add";
import UserAuthenticationContext from "../../contexts/UserAuthenticationContext";
import PageHeaderTitle from "../../utils/PageHeaderTitle";
import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  newButton: {
    position: "absolute",
    zIndex: 4,
    margin: 0,
    right: "0px",
    top: "15px",
  },
}));
const Clients = (props) => {
  const [users, setUser] = useState([]);
  // const [roles,setRoles] = useState([]);
  const userSessionContext = React.useContext(UserSessionContext);
  const classes = useStyles(props);
  //const { id } = useParams();
  useEffect(() => {
    loadUsers();
    // loadRoles();
  }, []);
  const permissionContext = React.useContext(UserAuthenticationContext);
  let userPermission = permissionContext.permissions;

  const loadUsers = async () => {
   await axios
      .get(`${config.APP_CONFIG}/usersApi/Users`)
      .then((res) => {
        if (res.data.status_code === 400) {
          userSessionContext.handleLogOut();
        } else if (res.data.status_code === 200) {
          setUser(res.data.msg);
        } else {
          toast.error("error");
          setUser([]);
        }
      })
      .catch((err) => {
        toast.error("can't load data");
        setUser([]);
      });
  };

  const deleteUser = async (id) => {
    let confirm = window.confirm("Do You Want to Delete?");
    if (confirm) {
      axios
        .delete(`${config.APP_CONFIG}/usersApi/Users/${id}`, {
          headers: { Authorization: userSessionContext.token },
        })
        .then((res) => {
          if (res.data.status_code === 200) {
            toast.warn("Deleted successfully!");
            loadUsers();
          } else {
            toast.error("Unable to delete data");
          }
        })
        .catch((err) => {
          toast.error("error occurred");
          loadUsers();
        });
    } else {
      <Link to="settings/users"></Link>;
    }
  };

  return (
   
      <div>
        <div className="row ">
          <div className="col-lg-8 col-md-6 col-sm-12 col-xs-12 ">
            {/* <h5>Purchase Summary</h5> */}
            <PageHeaderTitle title="Clients" />
          </div>
          {userPermission["u_create"] === 1 ? (
            <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 ">
              <div className="addButton">
                <Route
                  render={({ history }) => (
                    <Controls.Button
                      text="Add New"
                      variant="outlined"
                      startIcon={<AddIcon />}
                      className={classes.newButton}
                      onClick={() => {
                        history.push(`/settings/add-users`);
                      }}
                    />
                  )}
                />
              </div>
            </div>
          ) : null}
          {/* <div className="title">Clients Details</div> */}
          <table className="table border shadow">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Full Name</th>
                <th scope="col">Gender</th>
                <th scope="col">Company Name</th>
                <th scope="col">Designation</th>
                <th scope="col">Phone Number</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user, index) => (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>
                      {user.firstName} {user.middleName} {user.lastName}{" "}
                    </td>
                    <td>{user.gender}</td>
                    <td>{user.companyName}</td>
                    <td>{user.designation}</td>
                    <td>{user.contactNumber1}</td>
                    {/* <td>
                  <Select isMulti options={RolesName} onChange={RoleHandle}></Select>
                </td> */}
                    <td>
                      {/* <Link class="btn btn-primary mr-2" to={`/settings/viewUser/${user.id}`}>
                    View
                  </Link> */}
                      {/* <Link to={`/settings/editUsers/${user.id}`}
                    class="btn btn-outline-primary mr-2">
                    Edit
                  </Link>
                  <Link to = {`/settings/users`}
                    class="btn btn-danger"
                    onClick={() => deleteUser(user.id)}>
                    Delete
                  </Link> */}
                      <Route
                        render={({ history }) => (
                          <Controls.ActionButton
                            // type='button'
                            color="primary"
                            onClick={() => {
                              history.push(`/settings/viewUsers/${user.id}`);
                            }}
                          >
                            <RemoveRedEyeIcon fontSize="small" />
                          </Controls.ActionButton>
                        )}
                      />
                      <Route
                        render={({ history }) => (
                          <Controls.ActionButton
                            // type='button'
                            color="primary"
                            onClick={() => {
                              history.push(`/settings/editUsers/${user.id}`);
                            }}
                          >
                            <EditOutlinedIcon fontSize="small" />
                          </Controls.ActionButton>
                        )}
                      />

                      <Controls.ActionButton
                        color="secondary"
                        onhover="open"
                        onClick={() => {
                          deleteUser(user.id);
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </Controls.ActionButton>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    
  );
};

export default Clients;
