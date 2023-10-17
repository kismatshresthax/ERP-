import React from 'react';

import axios from "axios";

import config from '../../utils/config';
import { toast } from "react-toastify";
import Spinner from '../../utils/spinner';
import UserSessionContext from '../../contexts/UserSessionContext';
const PreferencesPage = props => {
    const userSessionContext = React.useContext(UserSessionContext);
    const [rules, setRules] = React.useState()

    React.useEffect(() => {
        loadData();
    }, []);

    // let role_name = props.match.params.id

    const loadData = async () => {
      await  axios.get(`${config.APP_CONFIG}/Config/api`,{
            headers:{
              Authorization:userSessionContext.token
            }
           })
            .then(res => {
                if (res.data.status_code === 200) {
                    setRules(res.data.msg || [])
                } else if (res.data.status_code === 401) {
                    setRules([])
                    userSessionContext.handleLogOut();
                }
             else if (res.data.status_code === 400) {
                toast.warn(res.data.msg);
              } else {
                    // setUsers([])
                    setRules([])
                    toast.error("Cannot read data")
                }
            })
            .catch(err => {
                setRules([])
                toast.error("Failed to load data!")
            })
    };


    if (rules === undefined) {
        return <Spinner />
    }

    return <div className="content-wrapper iframe-mode" data-widget="iframe" data-loading-screen={750}>
        <div>
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                    <h1>Preferences</h1>
                </div>
            </div>
            {
                rules && rules.map((rule, index) => {
                    return <div
                        style={{
                            borderBottom: "1px solid",
                            borderColor: "#cde",
                            //paddingTop: 10,
                            paddingTop: 20
                        }}
                        className="row"
                    >
                        <div className="col-lg-2 col-md-12 col-sm-12 col-xs-12 ">
                            {rule["conKey"]}
                        </div>
                        <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 ">
                            {rule["description"]}
                        </div>
                        <div className="col-lg-2 col-md-12 col-sm-12 col-xs-12 ">
                            <ConfigEditComponent
                                data={rule["value"]}
                                rowdata={rule}
                                reload = {loadData}
                            />
                        </div>
                    </div>
                })
            }

        </div>

    </div>
}


const ConfigEditComponent = props => {
    const [data, setData] = React.useState(props.data)
    const userSessionContext = React.useContext(UserSessionContext);
    const saveChanges = e => {
        let req_data = {
            "conKey": props.rowdata["conKey"],
            "companyId": props.rowdata["companyId"],
            "description": props.rowdata["description"],
            "value": data
        }
        axios.put(`${config.APP_CONFIG}/Config/api/${props.rowdata["id"]}`, req_data,{
            headers:{
              Authorization:userSessionContext.token
            }
           })
            .then(res => {
                if (res.data.status_code === 200) {
                    toast.success("Updated successfully!!!")
                    props.reload()
                } else if (res.data.status_code === 401) {
                    userSessionContext.handleLogOut();
                }
            else if (res.data.status_code === 400) {
                toast.warn(res.data.msg);
              } else {
                    toast.error("Cannot save data")
                }
            })
            .catch(err => {
                toast.error("Failed to save data!")
            })
    }
    return <div>
        <input
            type="text"
            value={data}
            onChange={e => {
                setData(e.target.value)
            }}
        />
        {
            props.data === data ? null :
                <input
                    type="button"
                    className="btn btn-primary"
                    value="Submit"
                    onClick={e => {
                        saveChanges()
                    }}
                />
        }
    </div>
}

export default PreferencesPage