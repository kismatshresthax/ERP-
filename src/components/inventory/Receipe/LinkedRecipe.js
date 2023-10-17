import React, { useEffect, useState } from "react";
import axios from "axios";

import config from "../../../utils/config";
import { toast } from "react-toastify";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import "../../../utils/styles.css";
import UserSessionContext from "../../../contexts/UserSessionContext";
import Controls from "../../controls/Controls";

import Spinner from "../../../utils/spinner";


import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
import Popup from "../../home/Popup";

import UseTable from "../../home/UseTable";

import ConfirmDialog from "../../home/ConfirmDialog";
import CloseIcon from "@material-ui/icons/Close";
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
import ViewRecipe from "./ViewRecipe";

import EditRecipe from "./EditRecipe";
import Excelfile from "../../../utils/Excelfile";
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

  { id: "productname", label: "Recipe" },
  { id: "Code", label: "Code" },

  { id: "unitName", label: "unitName" },
  { id: "costPrice", label: "Cost Price" },
  { id: "actions", label: "Actions", disableSorting: true },
];

function LinkedRecipe(props) {
  const userSessionContext = React.useContext(UserSessionContext);
  const classes = useStyles(props);
  const [records, setRecords] = useState();
  const [isNewPopup, setIsNewPopup] = useState(false);
  //const [isRecPopup, setIsRecPopup] = useState(false);
  const [isViewPopup, setIsViewPopup] = useState(false);
  const [isEditPopup, setIsEditPopup] = useState(false);
  const [warehouse, setWareHouseList] = useState();
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
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
      .get(`${config.APP_CONFIG}/Products/productRecipe/Api/${1}`, {
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
            isMain:name.isMain
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

 const  deleteRecipe= async (id) => {
    setConfirmDialog({ ...confirmDialog, isOpen: false });
    await axios.delete(`${config.APP_CONFIG}/Ingredients/recipe/api/${id}`, {headers: { Authorization: userSessionContext.token,},})
      .then((res) => {
        if (res.data.status_code === 200) {
          toast.success(res.data.msg);
          load_table();
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogOut();
        } else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
        }
      })
      .catch((err) => {
        load_table();
        toast.error("Error occured");
      });
  };
 if (records === undefined) {
  return <Spinner />;
}
  return (
    <div>

      {isNewPopup ? (
        <Popup
        size="lg"
          title="Add Product Form"
          openPopup={isNewPopup}
          setPopups={setIsNewPopup}
        >
          <RecipeForm
          
      
            load_table={(e) => {
              load_table(e);
            }}
          />
        </Popup>
      ) : null}
 <ConfirmDialog
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        />
 {isEditPopup ? (
        <Popup
        size="lg"
          title="Edit Receipe Form"
          openPopup={isEditPopup}
          setPopups={setIsEditPopup}
        >
          <EditRecipe
            data={records.filter((x) => x.id === isEditPopup)[0] || null}
       
             
            //setIsEditPopup={setIsEditPopup}

         warehouse={warehouse}
            load_table={(e) => {
              load_table(e);
            }}
          />
        </Popup>
      ) : null} 
   
   {isViewPopup ? (
            <Popup
            size="lg"
              title=" Recipe Details"
              openPopup={isViewPopup=== false ? false : true}
              setPopups={() => {
                setIsViewPopup(false);
              }}
            >
              <ViewRecipe 
            data={records.filter((x) => x.id === isViewPopup)[0] || null}
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
                        setIsViewPopup(item.id);
                      }}
                    >
                    <Tooltip title="Add Receipe">
                    <RemoveRedEyeIcon fontSize="small"/>
                            </Tooltip>
                    </Controls.ActionButton>
                    <Controls.ActionButton
                          color="primary"
                          onClick={(e) => {
                            setIsEditPopup(item.id);
                          }}
                        ><Tooltip title="Edit">
                          <EditOutlinedIcon fontSize="small" /></Tooltip>
                        </Controls.ActionButton>
                     
                    <Controls.ActionButton
                        color="secondary"
                        onClick={() => {
                          setConfirmDialog({
                            isOpen: true,
                            title: "Are you sure to delete this record?",
                            subTitle: "You can't undo this operation",
                            onConfirm: () => {
                              deleteRecipe(item.id);
                            },
                          });
                        }}
                      ><Tooltip title="Delete">
                        <CloseIcon fontSize="small" /></Tooltip>
                      </Controls.ActionButton>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </TblContainer>
          {records.length > 0 ? (
              <div className="d-flex flex-row justify-content-between">
              <span className="d-flex flex-row">
              <Excelfile data={records}/>
              </span>
              
              <TblPagination />
              </div>
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
export default LinkedRecipe;