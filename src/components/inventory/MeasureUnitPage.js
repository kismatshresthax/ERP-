import React, { useState,} from "react";

import axios from "axios";
import config from "../../utils/config";
import DeleteIcon from "@material-ui/icons/Delete";
import Controls from "../controls/Controls";
import AddIcon from "@material-ui/icons/Add";
import UserSessionContext from "../../contexts/UserSessionContext";
import { toast } from "react-toastify";

const AddForm = (props) => {
  const userSessionContext = React.useContext(UserSessionContext);
  const [unitname, setUnitname] = useState("");
  const [measuretype, setMeasuretype] = useState("");

  return (
    <tr hover>
      <td></td>
      <td>
        <input
          type="text"
          min={1}
          value={unitname}
          onChange={(e) => {
            setUnitname(e.target.value);
          }}
          style={{ width: "50px" }}
        />
      </td>
      <td>
        <input
          type="text"
          value={measuretype}
          onChange={(e) => {
            setMeasuretype(e.target.value);
          }}
          style={{ width: "50px" }}
        />
      </td>

      <td>
        <Controls.ActionButton
          size="small"
          variant="contained"
          color="secondary"
          onClick={(e) => {
            if (unitname === "" || measuretype === "") {
              return toast.warn("Fill the Form");
            }

            let _row = {
            //  id:props.data.id
              name: unitname,
              mesurementType: measuretype,
            };

            axios
              .post(
                `${config.APP_CONFIG}/Products/ProductInhouseUnit/api`,
                _row,
                {
                  headers: {
                    Authorization: userSessionContext.token,
                  },
                }
              )

              .then((res) => {
                if (res.data.status_code === 200) {
                  props.addRow({
                    id:res.data.msg.id,
                    name: unitname,
                    mesurementType: measuretype,
                  });

                  toast.info("UnitName Added successfully");

                  setUnitname("");
                  setMeasuretype("");
                } else if (res.data.status_code === 401) {
                  userSessionContext.handleLogout();
                } else if (res.data.status_code === 400) {
                  toast.warn(res.data.msg);
                } else {
                  toast.error("Error occured");
                }
              })
              .catch((err) => {
                toast.error("failed to Add data");
              });
          }}
        >
          <AddIcon style={{ fontSize: "15px" }} />
        </Controls.ActionButton>
      </td>
    </tr>
  );
};
// const ALLData = (props) => {
// const [datas,setDatas]=useState(props.data||[])
//   return (
//     <table className="table table-fluid">
//       <tr>
//         <th>S.N</th>
//         <th>Unit Name</th>
//         <th>MeasureMent Type</th>

//         <th>Actions</th>
//       </tr>

//       {datas&&datas.map((item, index) => {
//             return (
//               <tr key={item.id}>
//                 <td>{index}</td>
//                 <td>{item.name}</td>
//                 <td>{item.mesurementType}</td>
//                 </tr>
//                 )})
//             }
//                 </table>
//   )
// }

function MeasureUnitPage(props) {
  const userSessionContext = React.useContext(UserSessionContext);
  const [data, setData] = useState([]);
  return (
    <table className="table table-fluid">
      <tr>
        <th>S.N</th>
        <th>Unit Name</th>
        <th>MeasureMent Type</th>
        <th>Actions</th>
      </tr>

      {data
        ? data.map((item, index) => {
            return (
              <tr key={item.id}>
                <td>{index}</td>
                <td>{item.name}</td>
                <td>{item.mesurementType}</td>

                <td>
                  <Controls.ActionButton
                    size="small"
                    variant="contained"
                    color="danger"
                    onClick={(e) => {
                      axios
                        .delete(
                          `${config.APP_CONFIG}/Products/ProductInhouseUnit/api/${item.id}` , {
                          headers: {
                            Authorization: userSessionContext.token,
                          }
                        })
                        .then((res) => {
                          if (
                            res.data &&
                            res.data.status_code &&
                            res.data.status_code === 200
                          ) {
                            let _data = data.filter((row) => {
                              return row.id !== item.id;
                            });
                            // setData(_data)
                            setData(_data);
                            toast.success(res.data.msg);
                          } else if (res.data.status_code === 400) {
                            toast.error(res.data.msg.toString());
                          } else if (res.data.status_code === 401) {
                            userSessionContext.handleLogout();
                          }
                        })
                        .catch((err) => {
                          toast.error("failed to Delete Unit Measurement");
                        });
                    }}
                  >
                    <DeleteIcon style={{ fontSize: "15px" }} />
                  </Controls.ActionButton>
                </td>
              </tr>
            );
          })
        : []}
      <AddForm
        data={props.data}
        setData={setData}
        addRow={(e) => {
     
          setData([...data, e]);
        }}
      />
    {/* < ALLData
    data={props.data}
    /> */}
    </table>
   
  );
}

export default MeasureUnitPage;
