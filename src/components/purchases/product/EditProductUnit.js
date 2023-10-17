
import React, { useState, useEffect } from "react";
import config from "../../../utils/config";
import axios from "axios";
import { toast } from "react-toastify";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";

import UserSessionContext from "../../../contexts/UserSessionContext";
import Controls from "../../controls/Controls";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@mui/icons-material/Add";
import Select from "react-select";
import Tooltip from '@mui/material/Tooltip';

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: "white",
    color: "#546e7a",
    justifyContent: "left",
    padding: "10px 5px",
    fontWeight: "bold",
  },
  content: {
    padding: 0,
  },
  status: {
    marginRight: "5px",
  },
  actions: {
    justifyContent: "flex-end",
  },
  summaryTable: {
    width: "auto",
    marginBottom: "10px",
    pointerEvents: "none",
  },
  noBorder: {
    border: "none",
  },
  denseCell: {
    padding: "5px",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  inputGroup: {
    marginBottom: theme.spacing(1),
  },
  equal: {
    fontWeight: "bold",
    fontsize: "9rem",
  },
}));

const ConverterRow = (props) => {
  //const userSessionContext = React.useContext(UserSessionContext);
  const classes = useStyles();
 

  
  const [ratio, setratio] = useState("");
   const [unitId, setUnitId] = useState();

  return (
    <tr hover>
      <td>
        <span>1</span>
      </td>
    
            <td width="200px">

        <Select options={props.unitList}
         styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
         menuPortalTarget={document.body}
          value={unitId}
          onChange={setUnitId}
          
        />
     
</td>

    
      <td className={classes.equal}>
        <p>=</p>
      </td>
      <td>
        <input
          onChange={(e) => {
            setratio(e.target.value);
          }}
          type="number"
          value={ratio}
        />
      </td>
      <td>
        <span> {props.basename} </span>
      </td>
      <td>
        <Controls.ActionButton
          size="small"
          variant="contained"
          color="primary"
          onClick={(e) => {
            // let req_value = {
            
            // };

            props.addRow({
              productId: props.productId,
              unitName: unitId.label||"",
              unitId: unitId.value,
              baseUnit: 0,
              ratio: parseFloat(ratio),

            });
            //setSelectedUnit("");
            setUnitId("");
            setratio("");
          }}
        >
          <AddIcon style={{ fontSize: "15px" }} />
        </Controls.ActionButton>
      </td>
    </tr>
  );
};

export default function EditProductUnit(props) {
  const userSessionContext = React.useContext(UserSessionContext);
  let product_id = props.data.id;

  const classes = useStyles();

  const [data, setData] = useState(props.datas||[]);

  const [basename, setBaseName] = useState("");

  const [unitList, setunitList] = useState([]);
  useEffect(async() => {
    await axios.get(`${config.APP_CONFIG}/Products/ProductInhouseUnit/api`, {headers: { Authorization: userSessionContext.token }, })
    .then((res) => {
      if (res.data.status_code === 200) {
        let temp = res.data.msg.map(item => ({value: item.id, label: item.name}));
        setunitList(temp);
      } else if (res.data.status_code === 401) {
        userSessionContext.handleLogout();
      // } else if (res.data.status_code === 400) {
      //   toast.warn(res.data.msg);
      // } else {
        toast.error("Cannot load Unit Name.");
        setunitList([]);
      }
    })
    .catch((err) => {
      toast.error("failed to load data");
      setunitList([]);
    });
  }, []);
 
    





//  console.log(props.data.id)
 
  useEffect(async() => {
   await axios.get(`${config.APP_CONFIG}/product/ProductUnit/api/${props.data.id}`, {headers: { Authorization: userSessionContext.token }, })
    .then((res) => {
      if (res.data.status_code === 200) {
   console.log(res.data.msg)
        setData(res.data.msg);
        setBaseName(res.data.msg[0]["unitName"])
      
      } else if (res.data.status_code === 401) {
        userSessionContext.handleLogout();
  
        toast.error("Cannot load Unit Name.");
        setData([]);
      }
    })
    .catch((err) => {
      toast.error("failed to load data");
      setData([]);
    });
  }, []);

  const update_row = (req_value) => {


    axios.post(`${config.APP_CONFIG}/product/ProductUnit/api`, req_value, {headers: { Authorization: userSessionContext.token },
      })
      .then((res) => {
        if (res.data.status_code === 200) {
          toast.success( "Unit Added Successfully.");
          setData([...data, req_value]);
        } else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogout();
        } else {
          toast.error(res.data.msg || "Cannot insert unit.");
        }
      })
      .catch((err) => {
        toast.error("Failed to insert unit!");
        // setBaseName([]);
      });
  };


  

  return (
    <div
      className="content-wrapper iframe-mode"
      data-widget="iframe"
      data-loading-screen={750}
    >
      <Grid container direction="row">
        <Grid item lg={12} md={12} xs={12}>
          <Card>
            <CardHeader
              className={classes.header}
              title={"Edit BaseConverter"}
              classes={{
                title: classes.header,
              }}
            />

            <Divider />
            <Grid container>
              <Grid item md={6}>
                <span>Base Unit : {basename}</span>
              </Grid>
            </Grid>
            </Card>
        </Grid>
      </Grid>
          
            <table className="table table-fluid">


<tr>
                      <th>Quantity</th>
                      <th>UnitName</th>
                      <th>Equal</th>
                      <th>Quantity</th>
                      <th>UnitName</th>
                      <th>Actions</th>
                </tr>

                  {/* <TableBody> */}
                    {data &&
                      data.map((row, idx) => {
                     
                        return (
                          <tr key={idx}>
                            <td>{1}</td>

                            <td>{row.unitName}</td>
                            <td className={classes.equal}>
                              <p>=</p>
                            </td>
                            <td>{row.ratio}</td>
                            <td>{basename}</td>
                            <td>
                            {row.baseUnit===1&&row.ratio===1?null:
                              <Controls.ActionButton
                                size="small"
                                variant="contained"
                                color="danger"
                                onClick={(e) => {
                                
                                    axios
                                      .delete(
                                        `${config.APP_CONFIG}/product/ProductUnit/api/${row.id}`,
                                        {
                                          headers: {
                                            Authorization: userSessionContext.token,
                                          },
                                        }
                                      )
                                      .then((res) => {
                                        if (
                                          res.data &&
                                          res.data.status_code &&
                                          res.data.status_code === 200
                                        ) {
                                          let _data = data.filter((item) => {
                                            return item.id !== row.id;
                                          });
                                          // setData(_data)
                                          setData(_data);
                                          toast.info(res.data.msg);
                                        } else if (res.data.status_code === 400) {
                                          toast.error(res.data.msg.toString());
                                        }
                                      })
                                      .catch((err) => {
                                        toast.error("failed to Delete UnitName");
                                        setData([]);
                                      });
                                  }}
                                ><Tooltip  title="Delete">

                                
                                <DeleteIcon style={{ fontSize: "15px" }} /></Tooltip>
                              </Controls.ActionButton>
                      }
                            </td>
                           
                          </tr>
                        );
                      })}

                    <ConverterRow
                
                      productId={product_id}
                      addRow={(row) => {
                        // post code
                        update_row(row);
                      }}
                      basename={basename}
                      unitList={unitList}
                    />
                
                
                </table>
          
      

     
    </div>
  );
}
