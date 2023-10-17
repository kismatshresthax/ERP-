import React, { useEffect, useState } from "react";
import axios from "axios";

import config from "../../../utils/config";
import { toast } from "react-toastify";

import "../../../utils/styles.css";
import UserSessionContext from "../../../contexts/UserSessionContext";
import Controls from "../../controls/Controls";

import Spinner from "../../../utils/spinner";

import Popup from "../../home/Popup";

import UseTable from "../../home/UseTable";
import AddIcon from "@material-ui/icons/Add";
import {
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
  Tooltip,
} from "@material-ui/core";

import { Search } from "@material-ui/icons";
import RecipeForm from "./RecipeForm";
const useStyles = makeStyles((theme) => ({
    pageContent: {
      margin: theme.spacing(5),
      padding: theme.spacing(3),
    },
    newButton: {
      position: "absolute",
      zIndex: 4,
      right: "10px",
    },searchInput: {
      width: "20%",
    },
  }));
  
 

const headCells = [

  { id: "productname", label: "Item" },
  { id: "Code", label: "Code" },

  { id: "unitName", label: "unitName" },
  { id: "costPrice", label: "Cost Price" },
  { id: "actions", label: "Actions", disableSorting: true },
];

function Recipe(props) {
  const userSessionContext = React.useContext(UserSessionContext);
  const classes = useStyles(props);
  const [records, setRecords] = useState();
  const [isNewPopup, setIsNewPopup] = useState(false);
  const [isRecPopup, setIsRecPopup] = useState(false);
 // const [isViewPopup, setIsViewPopup] = useState(false);
  const [warehouse, setWareHouseList] = useState();
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
  UseTable(records, headCells, filterFn);

const handleSearch = (e) => {
  let query = e.target.value;

  setFilterFn({
    fn: (items) => {
      if (query === "") return items;
      else
        return items.filter(
          (x) =>
            (
              x.categoryname +
              x.productname +
              x.displayName +
              x.code +
              x.costPrice +
              x.sellPrice
            )
              .toLowerCase()
              .includes(query.toLowerCase())
         
        );
    },
  });
};
useEffect(() => {
    load_table();

  }, []);
  const load_table = () => {
  
    axios
      .get(`${config.APP_CONFIG}/Products/productRecipe/Api/${0}`, {
        headers: { Authorization: userSessionContext.token },
      })
      .then((res) => {
        if (res.data.status_code === 200) {
          setRecords(res.data.msg);
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogout();
        } else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
        } else {
          toast.error("Cannot Load Data");
          setRecords([]);
        }
      })
      .catch((err) => {
        toast.error("Error");
        setRecords([]);
      });
  };
  useEffect(() => {
    axios.get(`${config.APP_CONFIG}/stock/warehouse/api`, {
       headers: { Authorization: userSessionContext.token },
     })
     .then((res) => {
       if (res.data.status_code === 401) {
         userSessionContext.handleLogOut();
       } else if (res.data.status_code === 200) {
   
        let temp = res.data.msg.map((name, index) => ({
            label: name.warehouse,
            value: name.id,
            isMain:name.isMain,
          }));
          setWareHouseList(temp);
        //const defaultValue = res.data.msg.filter((option) => option.isMain === 1);
      
       // setSelectedValue(defaultValue);
       } else if (res.data.status_code === 400) {
         toast.warn(res.data.msg);
       } else {
         toast.error("error");
         setWareHouseList([]);
       }
     })
     .catch((err) => {
       setWareHouseList([]);
     });
 },[])
 if (records === undefined) {
  return <Spinner />;
}
  return (
 

    <div
     
    >
      {isNewPopup ? (
        <Popup
        size="lg"
          title="Add Product Form"
          openPopup={isNewPopup}
          setPopups={setIsNewPopup}
        >
          <RecipeForm
          
      
         
          />
        </Popup>
      ) : null}

{isRecPopup ? (
        <Popup
        size="lg"
          title="Add Receipes"
          openPopup={isRecPopup}
          setPopups={setIsRecPopup}
        >
          <RecipeForm
            data={records.filter((x) => x.id === isRecPopup)[0] || null}
       
             
            setIsRecPopup={setIsRecPopup}

         warehouse={warehouse}
          
          />
        </Popup>
      ) : null}
   
   
      <div>
       
          

   
        </div>

  
 <Toolbar>
        <Controls.Input
          label="Search"
          className={classes.searchInput}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          onChange={handleSearch}
        />
      </Toolbar> 

      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
          <TblContainer>
            <TblHead />
            <TableBody>
              {recordsAfterPagingAndSorting()&&recordsAfterPagingAndSorting().map((item, index) => (
                <TableRow key={item.id}>
       
                    <TableCell>{item.productname}</TableCell>    
                    <TableCell>{item.code}</TableCell>
                    <TableCell>{item.UnitName}</TableCell>
                    <TableCell>{item.costPrice||1}</TableCell>
                 
                  <TableCell>
                    <Controls.ActionButton
                      color="primary"
                      onClick={(e) => {
                        setIsRecPopup(item.id);
                      }}
                    >
                    <Tooltip title="Add Receipe">
                              <AddIcon fontSize="small" />
                            </Tooltip>
                    </Controls.ActionButton>
                   
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TblContainer>
          {records.length > 0 ? (
                <TblPagination />
              ) : (
                <div className="reportNotFound">
                  <p>No Records to Display</p>
                </div>
              )}
        </div>
      </div>
    </div>


);
}
export default Recipe;