import React from "react";
import axios from "axios";
//import { Link } from "react-router-dom";
import config from '../../../utils/config';
import { toast } from "react-toastify";
import Spinner from '../../../utils/spinner';
import { Switch } from '@material-ui/core'
import UserSessionContext from '../../../contexts/UserSessionContext';
import { Link} from "react-router-dom";
import UserAuthenticationContext from "../../../contexts/UserAuthenticationContext";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const RoleToModuleMap = (props) => {
  const userSessionContext = React.useContext(UserSessionContext);
  const [users, setUsers] = React.useState();
  const [name, setName] = React.useState();
  React.useEffect(() => {
    loadData();
    loadRoleById();
  }, []);

  let role_name = props.match.params.id
  const permissionContext=React.useContext(UserAuthenticationContext);
  let Permission = permissionContext.permissions;
  let curr_mod_permission =Permission.filter( x=>{return x["module_name"].toLowerCase() === "settings"})
  let userPermission= curr_mod_permission[0]

  const loadRoleById =  async() => {
  await  axios.get(`${config.APP_CONFIG}/api/userRoles/${role_name}`,{
      headers:{
        Authorization:userSessionContext.token
      }
    })
      .then(res => {
        if (res.data.status_code === 200) {
          setName(res.data.msg || [])
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogOut();
          setName([])
      
        }else if(res.data.status_code===400) {
          toast.warn(res.data.msg)
        } else {
          setName([])
          toast.error("Cannot read data")
        }
      })
      .catch(err => {
        setName([])
        toast.error("Failed to load data!")
      })
  };




  const loadData = async () => {
   await axios.get(`${config.APP_CONFIG}/userTomoduleMap/api/${role_name}`,{
      headers:{
        Authorization:userSessionContext.token
      }
    })
      .then(res => {
        if (res.data.status_code === 200) {
          setUsers(res.data.msg || [])
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogOut();
          setUsers([])
          
        } else if(res.data.status_code===400) {
          toast.warn(res.data.msg)
        }else {
          setUsers([])
          toast.error("Cannot read data")
        }
      })
      .catch(err => {
        setUsers([])
        toast.error("Failed to load data!")
      })
  };

  if (users === undefined) {
    return <Spinner />
  }

  const getCheckBox = (rowid, columnid) => {
    let cell_value = (users[rowid][columnid] && parseInt(users[rowid][columnid])) || 0
    return <Switch
      color = "primary"
      checked={cell_value === 1 ? true : false}
      defaultValue="on"
      onChange={e => {
        let changedValue = 0
        if (cell_value === 0 || null) {
          changedValue = 1
        }
        let _tmp_users = [...users]
        _tmp_users[rowid][columnid] = changedValue
        let request_payload = {
          "u_admin":  _tmp_users[rowid]["u_admin"] || 0 ,
          "u_create":  _tmp_users[rowid]["u_create"] || 0,
          "u_read":  _tmp_users[rowid]["u_read"] || 0,
          "u_write":  _tmp_users[rowid]["u_write"] || 0,
          "u_delete":  _tmp_users[rowid]["u_delete"] || 0,
          "urmid":  _tmp_users[rowid]["urmid"] || 0,
          "role_id":  _tmp_users[rowid]["roleId"],
          "module_id":  _tmp_users[rowid]["moduleId"]
        }
          axios.post(`${config.APP_CONFIG}/userTomoduleMap/api`,request_payload,{
            headers:{
              Authorization:userSessionContext.token
            }
          })
          .then(res => {
            if(res.data.status_code === 200)
            {
              setUsers(_tmp_users)
              loadData()
            }
            else if (res.data.status_code === 401)
            {
              userSessionContext.handleLogOut();
            }
            else if (res.data.status_code === 400) {
              toast.warn(res.data.msg);
            }else 
            {
              setUsers([])
              toast.error("can't update data")
            }
          })
          .catch(err => {
            setUsers([])
            toast.error("Error occured")
          })
    }
    }
    
    />
      
  }
if(name === undefined){
  return <Spinner/>

}
if (users === undefined){
  return<Spinner/>
}
  return (
    <div className="content-wrapper iframe-mode" data-widget="iframe" data-loading-screen={750}>
      <div className="container-fluid">
        <div className="py-4">
          <table class="table">
            <thead class="thead-dark">
              <h3 style={{textTransform: "capitalize"}}> {name[0].name} </h3>
              <tr>
                <th scope="col">Module Name</th>
                <th scope="col">Admin</th>
                <th scope="col">Create</th>
                <th scope="col">Read</th>
                <th scope="col">Write</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              
              {users.map((cell, index) => (
                <tr key={index}>
                  <td>{cell.moduleName}</td>
                  <td>
                    {
                      getCheckBox(index, 'u_admin',cell.id)
                    }
                  </td>
                  <td>
                    {
                      getCheckBox(index, 'u_create',cell.id)
                    }
                  </td>
                  <td>
                    {
                      getCheckBox(index, 'u_read',cell.id)
                    }
                  </td>
                  <td>
                    {
                      getCheckBox(index, 'u_write',cell.id)
                    }
                  </td>
                  <td>
                    {
                      getCheckBox(index, 'u_delete',cell.id)
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link className="btn btn-primary addbtn" to="/settings/roles">
        <ArrowBackIcon /> Back
        </Link>
      </div>
     
    </div>
  );
}

export default RoleToModuleMap;
