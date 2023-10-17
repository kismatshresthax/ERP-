import React, {useState, useEffect}from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import config from '../../utils/config';
import Select from "react-select";
import { toast } from 'react-toastify';
//import CompanyContext from '../../contexts/CompanyContext';
import UserSessionContext from '../../contexts/UserSessionContext';
const CreateRolePage = () => {
  // const companyContext = useContext(CompanyContext)
   const userSessionContext = React.useContext(UserSessionContext);

    let history = useHistory();
    const [user, setUser] = useState({});
   const [name,setName] = useState([]);
    const [id,setId] = useState([]);
    const [companyid,setCompanyId] = useState([]);
    let fields = ["company_id", "name"]
    const onInputChange = (_key, _val) => {
    setUser({ ...user, [_key]: _val });
  };


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
  const AddRole = async e => {
    e.preventDefault();
    let prepared_data = {...user}
    for(let field in fields){
      let _field = fields[field]
    }
    //prepared_data["companyId"] = parseInt(prepared_data["companyId"]);
    prepared_data["company_id"] = id.value;
   
    axios.post(`${config.APP_CONFIG}/api/userRoles`, prepared_data,{
      headers:{
        Authorization:userSessionContext.token
      }
    }) 
    .then(res => {
     if(res.data.status_code === 200){
      setUser(res.data.msg)
      history.push("/settings/roles"); 
     }
     else if (res.data.status_code === 401) {
      userSessionContext.handleLogOut();
    } else if (res.data.status_code === 400) {
      toast.warn(res.data.msg);
    }
   })
   .catch((err) => {
    toast.error("Error occured");
   
  });
   
  };
 


    return (
        <div className="content-wrapper iframe-mode" data-widget="iframe" data-loading-screen={750}>
        <div className="container">
         <form onSubmit={e => AddRole(e)}>
            <label align="center"><h3>Add Role</h3></label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Role Name"
              name="name"
              value={user.name}
              onChange={e => onInputChange(e.target.name, e.target.value)}
          
              />              
            <br/>
            <Select className="form-control-lg" options = {name} value={companyid} onChange={setCompanyId} ></Select> 
            <br/> 
            <button class="btn btn-primary mr-2 ">create</button>
            </form>
        </div>
        </div>
    );
};

export default CreateRolePage;