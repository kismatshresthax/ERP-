import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../utils/config";
import { toast } from "react-toastify";
import UserSessionContext from "../../contexts/UserSessionContext";
import "../../utils/styles.css";


import Controls from "../controls/Controls";
import AddIcon from "@material-ui/icons/Add";
import UseTable from "../home/UseTable";
import Popup from "../home/Popup";
import {
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
  Tooltip,
} from "@material-ui/core";
import Spinner from "../../utils/spinner";
import PageHeaderTitle from "../../utils/PageHeaderTitle";
import CompanyContext from "../../contexts/CompanyContext";
import Select from "react-select";
import UserAuthenticationContext from "../../contexts/UserAuthenticationContext";
import { Search } from "@material-ui/icons";
import OpeningStockForm from "./OpeningStockForm";
import Excelfile from "../../utils/Excelfile";
import { SelectFilter } from "../../utils/SelectFilter";

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
  { id: "categoryname", label: "Category Name" },
  { id: "productname", label: "Product Name" },
  { id: "code", label: "Code" },
  { id: "quantity", label: "cost Price" },
  { id: "Unit", label: "Unit" },

  { id: "warehouse", label: "SellPrice" },
  { id: "actions", label: "Actions", disableSorting: true },
];

export default function OpeningStock(props) {
  const userSessionContext = React.useContext(UserSessionContext);
  const companyContext = React.useContext(CompanyContext);
  const companyId = companyContext.company.id;
  const classes = useStyles(props);

  const [records, setRecords] = useState();
  const [isNewPopup, setIsNewPopup] = useState(false);

  const [searchrecord, setSearchRecords] = useState(); 

  const [warehouserecord, setWarehouseRecords] = useState(); 

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const permissionContext = React.useContext(UserAuthenticationContext);
  let Permission = permissionContext.permissions;
  let curr_mod_permission = Permission.filter((x) => {
    return x["module_name"].toLowerCase() === "purchases";
  });
  let userPermission = curr_mod_permission[0];
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
    load_product_category ();
    load_warehouse();
  }, []);


  const load_warehouse = () => {
    axios
      .get(`${config.APP_CONFIG}/stock/warehouse/api` ,{ headers: {Authorization: userSessionContext.token } })
      .then((res) => {
        if (res.data.status_code === 401) {
          userSessionContext.handleLogOut();
        }
        else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
        }
        else if (res.data.status_code === 200) {
          let temp = res.data.msg.map((item) => ({
            value: item.id,
            label: item.warehouse,

            
          }));

          setWarehouseRecords(temp)
        } else {
          toast.error("error");
          setWarehouseRecords([]);
        }
      })
      .catch((err) => {
        setWarehouseRecords([]);
      });
  };
  const load_product_category = async () => {
    await axios
       .get(`${config.APP_CONFIG}/Products/ProductCategory/api`, {
         headers: { Authorization: userSessionContext.token },
       })
       .then((res) => {
         if (res.data.status_code === 200) {
          let categoryList = res.data.msg.map((name) => ({
            label: name.categoryName,
            value: name.id,
          }
          ));
          setSearchRecords(categoryList)
           //setRecords(res.data.msg);
         } else if (res.data.status_code === 401) {
           userSessionContext.handleLogout();
         } else {
           toast.error("Warning");
           setRecords([]);
         }
       })
       .catch((err) => {
         toast.error("Error");
 
         setRecords([]);
       });
   };
  const load_table = async() => {

   await axios
   .get(`${config.APP_CONFIG}/Products/product/Api`, {
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
  const handleSelect = (e) => {


    if (e) {
    
      setFilterFn({
        fn: (items) => {
          return items.filter((x) => x.categoryId === e.value);
        },
      });
    } else {
    
      setFilterFn({
        fn: (items) => items, 
      });
    }
    };
  // const updateProduct = (data) => {
  //   axios
  //     .put(`${config.APP_CONFIG}/Products/product/api/${data.id}`, data, {
  //       headers: { Authorization: userSessionContext.token },
  //     })
  //     .then((res) => {
  //       if (res.data.status_code === 200) {
  //         toast.info("Data Updated successfully");
  //         load_table();
  //         setIsEditPopup(false);
  //       } else if (res.data.status_code === 401) {
  //         userSessionContext.handleLogout();
  //       } else if (res.data.status_code === 400) {
  //         toast.warn(res.data.msg);
  //       } else {
  //         toast.error("Couldn't Update");
  //         setRecords([]);
  //       }
  //     })
  //     .catch((err) => {
  //       toast.error("Error");
  //       setRecords([]);
  //     });
  // };


  if (records === undefined) {
    return <Spinner />;
  }

  return (
    <div>

      <div
        className="search"
        
      >
        {isNewPopup ? (
          <Popup
          size="md"
            title="Opening Stock"
            openPopup={isNewPopup}
            setPopups={setIsNewPopup}
          >
            <OpeningStockForm
      setIsNewPopup={setIsNewPopup}
      load_table={load_table}
                data={records.filter((x) => x.id === isNewPopup )[0] || null}/>
          </Popup>
        ) : null}

      
       

        <div>
         
            <div>
         
              <PageHeaderTitle title="Opening Stock" />
            </div>
            {/* {userPermission["u_create"] === 1 ? (
              <div className="addButton">
                <Controls.Button
                  text="Add New"
                  variant="outlined"
                  startIcon={<AddIcon />}
                  className={classes.newButton}
                  style={{ top: "15px", right: "0", margin: "0" }}
                  onClick={() => {
                    setIsNewPopup(!isNewPopup);
                  }}
                />
              </div>
            ) : null} */}
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
       
 
            <Select
                  className={classes.searchInput}
     
              style={{ width: "100%" }}
              options={searchrecord}
              isClearable
              isSearchable
              styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
              menuPortalTarget={document.body}
              placeholder={" Category"}
          
             onChange={handleSelect}
          
            />
   <SelectFilter   className={classes.searchInput} options={warehouserecord} placeholder="Warehouse"/>
        </Toolbar>
        </div>

        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
            <TblContainer>
              <TblHead />
              <TableBody>
                {recordsAfterPagingAndSorting().map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.categoryname}</TableCell>
                    <TableCell>{item.productname}</TableCell>
            
                    <TableCell>{item.code}</TableCell>
                    <TableCell>{item.costPrice}</TableCell>
                    <TableCell>{item.UnitName}</TableCell>
                 
                    <TableCell>{item.sellPrice}</TableCell>
                    <TableCell>
                      <Controls.ActionButton
                        color="primary"
                        onClick={(e) => {
                          setIsNewPopup(item.id);
                         /// setId_warehouse(item.warehouseId);
                        }}
                      >
                        <Tooltip title="Add">
                          <AddIcon fontSize="small" />
                        </Tooltip>
                      </Controls.ActionButton>
                      
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </TblContainer>
            <div className="d-flex flex-row justify-content-between">
              <span className="d-flex flex-row">
              <Excelfile data={records}/>
              </span>
              
              <TblPagination />
              </div>
          </div>
        </div>
      </div>
  
  );
}
