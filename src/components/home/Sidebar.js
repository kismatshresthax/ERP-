import React from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";
import routes from "../../utils/routes";
import UserSessionContext from "../../contexts/UserSessionContext";
import config from "../../utils/config";
import Select from "react-select";
import MenuIcon from "@material-ui/icons/Menu";
import { AiFillDashboard } from "react-icons/ai";
// import {MUI} from '@material-ui/core'
import CompanyContext from "../../contexts/CompanyContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalculator,
  faCog,
  faFileInvoiceDollar,
  faAddressBook,
  faCopy,
  faHome,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";

import axios from "axios"; //
import { toast } from "react-toastify";

//accordion

import Accordion from "@mui/material/Accordion";

import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
//import { auto } from "@popperjs/core";
//import UserAuthenticationContext from '../../contexts/UserAuthenticationContext';

const TopLevelNavItems = [
  // {
  //   name: "Dashboard",
  //   icon: <FontAwesomeIcon icon={faCalculator} size="md" />,
  // },
  {
    name: "ACCOUNTING",
    icon: <FontAwesomeIcon icon={faCalculator} size="1.5x" />,
  },
  {
    name: "PURCHASES",
    icon: <FontAwesomeIcon icon={faFileInvoiceDollar} size="1.5x" />,
  },
  { name: "SALES", icon: <FontAwesomeIcon icon={faAddressBook} size="1.5x" /> },
  { name: "INVENTORY", icon: <FontAwesomeIcon icon={faCopy} size="1.5x" /> },
  { name: "REPORTS", icon: <FontAwesomeIcon icon={faChartLine} size="1.5x" /> },
  { name: "SETTINGS", icon: <FontAwesomeIcon icon={faCog} size="1.5x" /> },
];

const max_width = "250px";
const Sidebar = ({ props, setCompany }) => {
  const companyContext = React.useContext(CompanyContext);

  const select_companies = companyContext.companies.map((x) => {
    return { label: x.name, value: x.id };
  });
  const [menuWidth, setMenuWidth] = React.useState("50px");
  const userSessionContext = React.useContext(UserSessionContext);
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (index) => (event, isExpanded) => {
    setExpanded(isExpanded ? index : false);
  };
  const issmall = window.innerWidth <= 576;
  return (
    <aside
      style={{
        borderRightWidth: "1px",
        borderRightColor: config.THEME_COLOR,
        display: "flex",
        flexDirection: "column",
        top: 0,
        left: 0,
        //position: window.innerWidth <= 576?"absolute":"relative",
        //height:"100vh",
overflowY:"scroll",
        transition: "0.3s",
        background: config.SIDEBAR_BG,
        width: menuWidth,
        // flex: 1,
position:"stickey",
        zIndex: window.innerWidth <= 576?"9999":"1",
      }}
      className="main-sidebar sidebar-dark-primary elevation-4"
    >
      <div
        style={{
          cursor: "pointer",
          display:"flex",
          justifyContent:menuWidth ==="50px"?"center":"space-between",
          height:"45px",
          lineHeight:"45px",
       padding:"5px 20px"
        }}
        onClick={(e) => {
          setMenuWidth(menuWidth === max_width ? "50px" : max_width);
        }}
      >
        {menuWidth === max_width ? (
          <Link to="">
                            <Typography sx={{mt:1}} color="#ffff">SMART ERP</Typography>

          </Link>
        ): null}
        <MenuIcon fontSize="large" 
        style={{
            color: "#fff",
            // display:"flex",
            // justifyContent:menuWidth ==="50px"?"intial":"center",
            // placeContent:menuWidth ==="50px"?"intial":"center"
           
          }}
     
        />
      </div>

      <div className="sidebar" style={{ textAlign: "center" }}>
        {/* <div> */}
          {/* {menuWidth === max_width ? (
            <span
              style={{
                width: "100%",
              }}
            >
              <Select
                className="search-bar"
                style={{
                  width: "90%",
                  margin: "5px 20px",
                }}
                options={select_companies}
                value={{
                  label: companyContext.company.name,
                  value: companyContext.company.id,
                }}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                menuPortalTarget={document.body}
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
              ></Select>
            </span>
          ) :
          null 
        
          }*/}

          {menuWidth === max_width ? (
            <Link to="/">
              <div className="d-flex flex-row p-2">
                <div className="p-2">
            
                  <AiFillDashboard color="white"  size="2rem"/> 
                 

                  
                </div>
                <div className="p-2">
                  <Typography color="#C084FC">Dashboard</Typography>
                </div>
              </div>
            </Link>
          ) : (
            <Link to="/">
              <AiFillDashboard color="white"  size="2rem"/> 
            </Link>
          )}
        {/* </div> */}
        {TopLevelNavItems.map((nav, index) => {
          return (
            <div key={index} className="nav-item">
              <i className={"nav-icon" + nav.icon || "" + nav.size} />
              <span
                style={{
                  color: "white",
                }}
              >
                {menuWidth === max_width ? (
                  <Accordion
                    expanded={expanded === index}
                    onChange={handleChange(index)}
                  >
                    <AccordionSummary
                      expandIcon={
                        <ExpandMoreIcon
                          color="white"
                          style={{ fill: "white" }}
                        />
                      }
                    >
                      <Typography margin="3px" color="white">
                        {nav.icon} {nav.name}
                        {nav.size}
                      </Typography>
                    </AccordionSummary>
                    {routes
                      .filter(
                        (route) =>
                          route.showInNav & (route["showInNav"] === true)
                      )
                      .filter((item) => item.hasOwnProperty("parent"))
                      .filter(
                        (item) =>
                          item.parent.toUpperCase() === nav.name.toUpperCase()
                      )
                      .map((route, index) => {
                        return (
                          <div key={index}>
                            <Link
                              style={{
                                textDecoration: "none",
                                textTransform: "uppercase",
                                fontSize: "small",
                              }}
                              to={route.path}
                            >
                              {menuWidth === max_width ? (
                                <AccordionDetails
                                  sx={{
                                    borderBottom: "1px solid #111",
                                    border: "none",
                                    paddingRight: "5px",
                                  }}
                                  color="black"
                                  aria-controls="panel2a-content"
                                  id="panel2a-header"
                                >
                                  <Typography
                                    style={{ paddingLeft: "10px" }}
                                    fontSize="small"
                                    color="white"
                                  >
                                    {route.icon} {route.title}{" "}
                                  </Typography>
                                </AccordionDetails>
                              ) : (
                                "null"
                              )}
                            </Link>
                          </div>
                        );
                      })}
                  </Accordion>
                ) : (
                  <Typography
                    color="white"
                    margin="10px"
                    marginTop="40px"
                    onClick={(e) => {
                      setMenuWidth(
                        menuWidth === max_width ? "50px" : max_width
                      );
                    }}
                  >
                    {nav.icon}
                  </Typography>
                )}
              </span>
            </div>
          );
        })}
         {menuWidth === max_width ? (
            <Link to="/bussiness/setting">
              <div className="d-flex flex-row p-2">
         <div className="p-2">
                  <Typography color="#C084FC">  Bussiness Settings</Typography>
                </div>
              </div>
            </Link>
          ) : (
            <Link to="/">
              <FontAwesomeIcon
                color="white"
                icon={faHome}
                size="lg
"
              />
            </Link>
          )}
        </div>

    </aside>
  );
};
export default Sidebar;
