import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams, Link } from "react-router-dom";
import config from '../../../utils/config';
import { toast } from "react-toastify";
import UserSessionContext from "../../../contexts/UserSessionContext"

const EditRolePage = () => {

    const userSessionContext = React.useContext(UserSessionContext)
    let history = useHistory();
    const { id } = useParams();
    const [role, setRole] = useState({
      });

      let fields = ["company_id", "name"]

      const onInputChange = (_key, _val) => 
      {
      setRole({ ...role, [_key]: _val });
      }
 
  
    // const {name} = role;

    // const onInputChange = e => {
    //   e.preventDefault();
    //   let prepared_data = {...role}
    //     setRole({...role, [e.target.name]: e.target.value});
    // };
    
      useEffect(() => {
        loadRole();
      }, []);
       
      const loadRole = async () => {
      await  axios.get(`${config.APP_CONFIG}/api/userRoles/${id}`,{
          headers:{
            Authorization:userSessionContext.token
          }
        })
        .then(res => {
            if(res.data.status_code === 401){
              userSessionContext.handleLogOut();
            }
            else if(res.data.status_code === 200)
            {
              setRole(res.data.msg[0])
            }
            else if (res.data.status_code === 400) {
              toast.warn(res.data.msg);
            }else{
              toast.error('error occured');
              setRole([])
            }
           })
           .catch(err => {
             toast.error("Couldnot load data")
             setRole([])
           })        
      };

      const Update = async e => {
        e.preventDefault();
        let prepared_data = {...role}
        prepared_data["company_id"] = 1;
        axios.put(`${config.APP_CONFIG}/api/userRoles/${id}`, prepared_data,{
          headers:{
            Authorization:userSessionContext.token
          }
        })
        .then(res => {
          if(res.data.status_code === 200)
          {
            toast.warn("Role Name updated successfully!")
            setRole(res.data.msg[0])
            history.push("/settings/roles");
          }
          else if(res.data.status_code === 400)
          {
            userSessionContext.handleLogOut();
          }
          else 
          {
            toast.error("couldn't update!")
          }
        })
        .catch(err => {
          toast.error("error occured!")
          setRole([])
        })
      };
    return (

        <div className="row">
        <div className="w-75 mx-auto shadow p-5">
          <h2 className="text-center mb-4">Edit Role Name</h2>
          <form onSubmit={e => Update(e)}>
            <label>Role Name:</label>
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Role"
                name="name"
                value={role.name}
                onChange={e => onInputChange(e.target.name, e.target.value)}
              />
            </div>
            <button className="btn btn-warning btn-block">Edit</button>
            <Link to="/settings/roles" className="btn btn-danger ml-2">Cancel</Link>
        </form>
      </div>
    </div>

    );
}

export default EditRolePage;



