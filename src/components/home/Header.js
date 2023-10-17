import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import UserSessionContext from "../../contexts/UserSessionContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faSignOutAlt ,} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import config from "../../utils/config";
import { toast } from "react-toastify";
import InventoryIcon from '@mui/icons-material/Inventory';
import { useHistory } from "react-router-dom";
//import Sidebar from "./Sidebar";
//import MenuIcon from "@material-ui/icons/Menu";
import ChangePassword from "../../utils/ChangePassword";
import Popup from "./Popup";
import CompanyContext from "../../contexts/CompanyContext";
import Select from "react-select";
import HSelect from "../controls/HSelect";
const Header = ({ props, setCompany }) => {
  const companyContext = React.useContext(CompanyContext);
  let history = useHistory();
  const [isNewPopup, setIsNewPopup] = React.useState(false);
  const [iscompany, setIscompany] = React.useState(
    { label: companyContext.company.name,
     value: companyContext.company.id,});
  let _user = "admin";
  

 // let Company=window.localStorage.getItem("company");

//let company_name= JSON.parse(Company);


const select_companies = companyContext.companies.map((x) => {
  return { label: x.name, value: x.id };
});
  const userSessionContext = React.useContext(UserSessionContext);
 
  return (
    
    <>
   
  {isNewPopup ? (        
      <Popup
      size="xs"
        title="Change Password"
        openPopup={isNewPopup}
        setPopups={setIsNewPopup}
      >
        <ChangePassword />
      </Popup>
    ) : null}
       
     
  <div className="d-flex justify-content-between">  


  
   <Select className="p-2 border-0"
             
            
                options={select_companies}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999, width: '350px',borderStyle:'none !important' }) ,control: (base) => ({
                  ...base,
                  width: '350px !important', // Set the width
                  height: '40px',
                  borderStyle:'none !important',
    fontWeight:"bold",
                }),}}
                menuPortalTarget={document.body}
                // value={iscompany}
                value={{
                  label: companyContext.company.name,
                  value: companyContext.company.id,
                }}
//                  onChange={(e) => {
                
//                 setIscompany(e);

//                   const comp = companyContext.companies.filter((x) => {
      
                    
//                     if (x.id === e.value) {
//                       return true;
//                     }
//                     return false;
//                   });
// //setCompany(iscompany);
//                   console.log(iscompany)
                
//                   companyContext.setCompany(iscompany);
//                   window.localStorage.setItem(
//                     "company",
//                     JSON.stringify(comp[0])
//                   );

//                   toast.success("Company Changed");
//                 }}
onChange={(e) => {
  const res = {
    id: e.value,
    name: e.label,
  };

  const comp = companyContext.companies.filter((x) => {
    if (x.id === res.id) {
      return true;
    }
    return false;
  });

  setCompany(res);

  companyContext.setCompany(res);
  window.localStorage.setItem(
    "company",
    JSON.stringify(comp[0])
  );

  toast.success("Company Changed");
}}
              /> 

    
  
 
       

         <div  className="p-3 header-section-right">
       
             
          
          {/* hello {_user}! &nbsp;
           */}
        
              <Link
                style={{
                  textDecoration: "none",
                  color: "#444",
                  wordSpacing: "1px",
                }}
                to=""
                onClick={(e) => {
                  e.preventDefault();
                  axios
                    .post(`${config.APP_CONFIG}/logout/userlogout`, {
                      headers: { Authorization: userSessionContext.token },
                    })
                    .then((res) => {
                      if (res.data.status_code === 401) {
                        userSessionContext.handleLogOut();
                      }
                    })
                    .catch((err) => {
                      toast.error("cannot Logout");
                      //setPermissions([]);
                    });
                }}
              >
                <FontAwesomeIcon size="1x" color="#444" icon={faSignOutAlt} />
                Log Out
              </Link>
              
    

    </div>
  

     </div> 
     
</>
  );
};


export default Header;
