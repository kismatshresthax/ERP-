import React, {useState, useEffect,lazy, Suspense} from "react";

import "./App.css";
import Login from "./components/Login/Login";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Sidebar from "./components/home/Sidebar";
import Header from "./components/home/Header";
//import Footer from "./components/home/Footer";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {CssBaseline} from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";
import UserSessionContext from "./contexts/UserSessionContext";
// import Footer from "./components/home/Footer";
import NotFound from "./components/pages/NotFound";
import routes from "./utils/routes";
import axios from "axios";
import config from "./utils/config";
import {toast} from "react-toastify";
import Spinner from "./utils/spinner";
import UserAuthenticationContext from "./contexts/UserAuthenticationContext";
import CompanyContext from "./contexts/CompanyContext";
import CompanyForm from "./components/settings/companies/CompanyForm";
import LoginPage from "./components/Login/LoginPage";


export default function App() {
        const [token, setToken] = useState();
        const [companies, setAllCompanies] = useState();
        const [permissions, setPermissions] = useState();
      
        const [company, setCompany] = useState();
        const [fiscal, setFiscal] = useState("");
    

        useEffect(() => {
            const _token = window.localStorage.getItem("ERP_TOKEN");

            if (_token === undefined || _token === null) {
                setToken(false);

            } else {


                setToken(_token);
                getCompanies(_token);
            }
        }, [token]);
        const save_token = (e) => {
            window.localStorage.setItem("ERP_TOKEN", e);

            setToken(e);
        };
        // useEffect(() => {
        // console.log(token)

        // //false
        // if(token !== undefined ||token!==false )
        // {
        //     console.log(token) //false
        //     getCompanies(token);
        // }

        // }, [token])

        useEffect(() => {

            if (company !== undefined) {

                getPermissions(token);
                getFiscal(token);
            }
        }, [company, setCompany]);

        const handleLogOut = (e) => {
            window.localStorage.removeItem("ERP_TOKEN");
            window.localStorage.removeItem("user");
            window.localStorage.removeItem("company");
            window.localStorage.removeItem("fiscal");
            setToken(false);
           
        };

        const getCompanies = async (_token) => { // setTimeout(() => {
            fetch(`${
                config.APP_CONFIG
            }/Companies/Company`, {
                headers: {
                    Authorization: _token,
                    "Content-Type": "application/json"
                }
            }).then((res) => res.json()).then((res) => {
                if (res.status_code === 401) {
                    handleLogOut();
                } else if (res.status_code === 200) {

                    setAllCompanies(res.msg);
                    // setAllCompanies([]);
                    // if (res.msg.length === 0) {
                    //     return <CompanyForm/>;
                    // }

                    if (res.msg.length > 0) {


                        if (localStorage.getItem('company') === null) {

                            setCompany(res.msg[0]);
                            window.localStorage.setItem("company", JSON.stringify(res.msg[0]));
                        } else {

                            const reload = window.localStorage.getItem('company')

                            setCompany(JSON.parse(reload))
                        }

                       
                    } else {
                        setCompany([]);
                    }
                } else {
                    toast.error("cannot fetch Companies");
                    setAllCompanies([]);
                }
            }).catch((err) => {
                toast.error("error fetching Companies");
                // setAllCompanies([]);
            });
            // }, 1000);
        };

        const getPermissions = async (__token) => {

            await axios.get(`${
                config.APP_CONFIG
            }/UserPermission/getUserPermission/${__token}`, {
                headers: {
                    Authorization: __token,
                    "Content-Type": "application/json"
                }
            }).then((res) => {
                if (res.data.status_code === 401) {
                    handleLogOut();
                } else if (res.data.status_code === 200) {

                    const myper = res.data.msg.filter((x) => {
                        if (x.company_id === company.id) {
                            return true;
                        }
                        return false;
                    });

                    setPermissions(myper);

                } else {
                    toast.error("Error Loading Permission");
                    setPermissions([]);
                }
            }).catch((err) => {
                toast.error("Cannot fetch Permission");
           
            });
        };

        const getFiscal = async (__token) => {
            await axios.get(`${
                config.APP_CONFIG
            }/Setting/FiscalYear/api`, {
                headers: {
                    Authorization: __token,
                    "Content-Type": "application/json"
                }
            }).then((res) => {
                if (res.data.status_code === 401) {
                    handleLogOut();
                } else if (res.data.status_code === 200) {
                    const fis_year = res.data.msg.filter((x) => {
                        if (x.isActive === 1 && x.isEnd === 0) {
                            return true;
                        }
                        return false;

                    });
                    window.localStorage.setItem("fiscal", fis_year[0]["fiscalYear"]);
                    setFiscal(fis_year);
                } else {
                    toast.error("Error Loading Fiscal year");
                    setFiscal([]);
                }
            }).catch((err) => {
                toast.error("Cannot fetch Fiscal year");
            });
        };


        if (token === undefined) {
            return <Spinner msg="Authenticating..."/>;
        }

        if (token === false) {
            return (
                <div>
                    <ToastContainer rtl/>
                    <Login setToken={save_token}></Login> 
                    {/* <LoginPage setToken={save_token}></LoginPage> */}
                </div>
            );
        }


        if (company === undefined) {
            return <Spinner msg=" Company Initializing..."/>;
        }

        if (permissions === undefined) {
            return <Spinner msg="Loading permissions..."/>;
        }

        const _routes = routes.filter((route) => {


            if (route.permissions === undefined) {
                return true;
            }

            let curr_mod_permission = permissions.filter((x) => {
                return x["module_name"].toLowerCase() === route["parent"].toLowerCase();
            });

            if (curr_mod_permission.length === 0) {
                return false;
            }
            curr_mod_permission = curr_mod_permission[0];
            let permission_level = route.permissions;

            if (curr_mod_permission[permission_level] && curr_mod_permission[permission_level] === 1) {
                return true;
            }
            return false;
        });


        // //let path=window.location.pathname;
        // // const module_per_func = () =>{

        //    let curr_module=routes.filter(route=>{
        //      if(window.location.pathname===route.path){
        //      //if(currentPath===route.path){
        //        return true;

        //      }
        //      return false
        //    })
        //    console.log(curr_module)
        // let curr_module_permission={}
        // if(curr_module&&curr_module.length>0 ){
        // let curr_permissions=permissions&&permissions.filter((p)=>{

        // if(p["module_name"].toUpperCase()===curr_module[0].parent ) {
        //     // &&p["role"].toUpperCase()!==p["role"][i].toUpperCase()
        //     return true

        // }

        // return false
        // })
        // console.log(curr_permissions)
        // if(curr_permissions.length>0){
        // curr_module_permission=curr_permissions[0]
        // //setCurr_mod_permission(curr_module_permission)
        // }
        // console.log(curr_module_permission)
        // }
        //


        //const issmall = window.innerWidth <= 576;


        return (
        <div className="container-fluid" style={
            {
                display: "flex",
                flexDirection: "row",
                padding:"0px",
               height:"100vh"
              
            }
        }>
            <UserSessionContext.Provider value={
                {
                    token: token,
                    handleLogOut: handleLogOut
                }
            }>
                <UserAuthenticationContext.Provider value={
                    {permissions: permissions}
                }>
                    <CompanyContext.Provider value={
                        {
                            companies: companies,
                            company: company,
                            setCompany: setCompany,
                            fiscal: fiscal
                        }
                    }>

                        <ToastContainer rtl
                            pauseOnFocusLoss={true}
                            autoClose={5000}/>
                        <Router>


                            <div style={
                                {
                                    
                                    background: config.SIDEBAR_BG
                                }
                            }>

                                <Sidebar
                                    getPermissions={getPermissions}/>
                            </div>




                                <div className="d-flex flex-column w-100">
                            
                           
                       
                              <Header className="head" 

                             setCompany={setCompany}/>
                        
                          
                        <main style={{
                          padding:"0px 10px",
                            overflowX: "hidden",
                            
                        }}>
                                <Switch>
                                <Suspense fallback={<Spinner msg="Loading..."/>}>
                      {_routes.map((route, index) => {
                  
                        return (
                          <Route
                            key={index}
                            exact={route.exact || false}
                            path={route.path || ""}
                            component={route.component || <> </>}
                          />
                        );
                      })}
                          </Suspense>
                      <Route component={NotFound} />
                  
                    </Switch>
                    </main>
               
           
                    {/* <Footer/> */}
                    </div>
                   
                        </Router>
                   
                    <CssBaseline/>
                </CompanyContext.Provider>
            </UserAuthenticationContext.Provider>
        </UserSessionContext.Provider>
    </div>
    );
}
