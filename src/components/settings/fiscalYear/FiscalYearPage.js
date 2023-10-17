import axios from "axios";
import config from "../../../utils/config";
import React, { useState, useEffect } from "react";
import { Switch } from "@material-ui/core";
import { Route } from "react-router-dom";
import UserSessionContext from "../../../contexts/UserSessionContext";
import { toast } from "react-toastify";
import Spinner from "../../../utils/spinner";
import Controls from "../../controls/Controls";
import AddIcon from "@material-ui/icons/Add";
import PageHeaderTitle from "../../../utils/PageHeaderTitle";
import Popup from "../../home/Popup";
import FiscalForm from "./FiscalForm";
import { format } from "date-fns";

export default function FiscalYearPage(props) {
  const [fiscalYear, setFiscalYear] = useState([]);
  const [fiscal, setFiscal] = useState([]);
  const userSessionContext = React.useContext(UserSessionContext);
  const [isNewPopup, setIsNewPopup] = useState(false);
 

  var adbs = require("ad-bs-converter");
  useEffect(() => {
    LoadFiscalYear();
  }, []);
  const LoadFiscalYear = async () => {
   await axios
      .get(`${config.APP_CONFIG}/Setting/FiscalYear/api`, {
        headers: {
          Authorization: userSessionContext.token,
        },
      })
      .then((res) => {
        if (res.data.status_code === 401) {
          userSessionContext.handleLogOut();
        } else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
        } else if (res.data.status_code === 200) {
          setFiscalYear(res.data.msg);
          setFiscal(
            res.data.msg.filter((x) => {
              return x.isActive === 1;
            })
          );
        } else {
          toast.error("error");
          setFiscalYear([]);
        }
      });
  };
  if (fiscalYear === undefined) {
    return <Spinner />;
  }
  // const  fis_year = fiscalYear.filter((x) => { return x.isActive === 1 });
  const addFiscalYear = (data) => {
    axios
      .post(`${config.APP_CONFIG}/Setting/FiscalYear/api`, data, {
        headers: {
          Authorization: userSessionContext.token,
        },
      })
      .then((res) => {
        if (res.data.status_code === 200) {
          toast.success(res.data.msg);
          LoadFiscalYear();
          setIsNewPopup(false);
          //  history.push("/settings/fiscalyearpage");
        } else if (res.data.status_code === 400) {
          toast.error(res.data.msg);
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogout();
        } else {
          toast.error("Error occured");
        }
      })
      .catch((err) => {
        toast.error("Failed to load data");
      });
    setIsNewPopup(false);
  };

  const getFiscalYearEndButton = (rowid, columnid, id) => {
    return (
      <Controls.ActionButton
        color="primary"
        text="End Fiscal"
        onClick={(e) => {
          let confirm = window.confirm(
            "Do you Want To End Current Fiscal Year ?"
          );
          if (confirm) {
            let endFiscal = 1;
            let _tmp_users = [...fiscalYear];
            _tmp_users[rowid][columnid] = endFiscal;
            let request_payload = {
              isEnd: _tmp_users[rowid]["isEnd"],
              companyId: _tmp_users[rowid]["companyId"],
            };

            axios
              .put(
                `${config.APP_CONFIG}/Setting/FiscalYear/updateStatus/api/${id}`,
                request_payload,
                {
                  headers: {
                    Authorization: userSessionContext.token,
                  },
                }
              )
              .then((res) => {
                if (res.data.status_code === 200) {
                  setFiscalYear(_tmp_users);
                  toast.success(res.data.msg);
                } else if (res.data.status_code === 401) {
                  userSessionContext.handleLogOut();
                } else if (res.data.status_code === 400) {
                  toast.info(res.data.msg);
                } else {
                  setFiscalYear([]);
                  toast.error("can't read data");
                }
              })
              .catch((err) => {
                setFiscalYear([]);
                toast.error("Failed to load data!");
              });
          }
        }}
      />
    );
  };

  const getCheckBox = (rowid, columnid, id) => {
    let cell_value =
      (fiscalYear[rowid][columnid] && parseInt(fiscalYear[rowid][columnid])) ||
      0;

    return (
      <Switch
        color="primary"
        checked={cell_value === 1 ? "checked" : null}
        defaultValue="on"
        onChange={(e) => {
          let confirm = window.confirm(
            cell_value === 0
              ? "Do you Want To Active Fiscal Year ?"
              : "Do you Want To deActive Fiscal Year ?"
          );

          if (confirm) {
            let changedValue = 0;
            if (cell_value === 0) {
              // if(fiscal.length>0){
              //   toast.warn("multiple fiscal active")
              //  }
              //  else{
              changedValue = 1;
            }
            let _tmp_users = [...fiscalYear];
            _tmp_users[rowid][columnid] = changedValue;

            let request_payload = {
              isActive: _tmp_users[rowid]["isActive"],
              companyId: _tmp_users[rowid]["companyId"],
            };
            axios
              .put(
                `${config.APP_CONFIG}/Setting/FiscalYear/updateStatus/api/${id}`,
                request_payload,
                { headers: { Authorization: userSessionContext.token } }
              )
              .then((res) => {
                if (res.data.status_code === 200) {
                  setFiscalYear(_tmp_users);
                  toast.success(res.data.msg);
                  alert("Please Logout To Load Changed fiscal Year")
                  LoadFiscalYear();
                } else if (res.data.status_code === 401) {
                  userSessionContext.handleLogOut();
                } else if (res.data.status_code === 400) {
                  toast.warn(res.data.msg);
                } else {
                  setFiscalYear([]);
                  toast.error("can't read data");
                }
              })
              .catch((err) => {
                setFiscalYear([]);
                toast.error("Failed to load data!");
              });
          }
        }}
      />
    );
  };

  if (fiscalYear === undefined) {
    return <Spinner />;
  }

  return (
    <div>
      {isNewPopup ? (
        <Popup
        
          title="Fiscal Form"
          openPopup={isNewPopup}
          setPopups={setIsNewPopup}
        >
          <FiscalForm
            handleSubmit={addFiscalYear}
            // setAddLedger={true}
            setIsNewPopup={setIsNewPopup}
            //LoadCOA={props.LoadCOA}
          />
        </Popup>
      ) : null}
      
        <PageHeaderTitle title="Fiscal Year" />
        {/* {userPermission["u_create"]===1? */}
        <Route
          render={({ history }) => (
            <Controls.Button
              text="Add New"
              variant="outlined"
              startIcon={<AddIcon />}
              className="addbtn"
              // onClick={() => {
              //   history.push(`/settings/createfiscalyear`);
              // }}
              onClick={() => {
                setIsNewPopup(!isNewPopup);
              }}
            />
          )}
        />
        {/* :null} */}

        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Fiscal Year</th>
              <th scope="col">Start Date</th>
              <th scope="col">End Date</th>
              <th scope="col">Active</th>
            </tr>
          </thead>
          <tbody>
            {fiscalYear.map((row, index) => {

              const start_date_nepali = format(
                new Date(row.startDate),
                "yyyy/MM/dd "
              );
              const end_date_nepali = format(
                new Date(row.endDate),
                "yyyy/MM/dd "
              );

              const nepalidate_start = adbs.ad2bs(start_date_nepali);
              const nepalidate_end = adbs.ad2bs(end_date_nepali);
              const miti_start =
                nepalidate_start.en["year"] +
                "-" +
                nepalidate_start.en["month"] +
                "-" +
                nepalidate_start.en["day"];
                
              const miti_end =
                nepalidate_end.en["year"] +
                "-" +
                nepalidate_end.en["month"] +
                "-" +
                nepalidate_end.en["day"];

              return (
                <tr key={row.id}>
                  <td>{row.fiscalYear} </td>
                  <td>{format(new Date(row.startDate), "yyyy-MM-dd")} ({miti_start} BS)</td>
                  <td>{format(new Date(row.endDate), "yyyy-MM-dd")} ({miti_end} BS)</td>
                  <td width="200px">
                    {row.isEnd === 1
                      ? null
                      : getCheckBox(index, "isActive", row.id)}

                    {row.isEnd ===  0
                      ? getFiscalYearEndButton(index, "isEnd", row.id)
                      : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
     
    </div>
  );
}
