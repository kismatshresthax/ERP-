import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../../utils/config";
import { toast } from "react-toastify";
import UserSessionContext from "../../../contexts/UserSessionContext";
import "../../../utils/styles.css";

import Controls from "../../controls/Controls";
import UseTable from "../../home/UseTable";
import Popup from "../../home/Popup";
import { Search } from "@material-ui/icons";
import { makeStyles, TableBody, TableRow, TableCell, Toolbar,InputAdornment,  } from "@material-ui/core";
import Spinner from "../../../utils/spinner";
import PageHeaderTitle from "../../../utils/PageHeaderTitle";
import ProductStepper from "./ProductStepper";
import ProductEditStepper from "./ProductEditStepper";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  newButton: {
    position: "absolute",
    right: "10px",
  },
}));

const headCells = [
  { id: "categoryname", label: "Category Name" },
  { id: "productname", label: "Product Name" },
  { id: "displayName", label: "Display Name" },
  { id: "code", label: "Code" },
  { id: "costPrice", label: "Cost Price" },
  { id: "sellPrice", label: "Sell Price" },
 // { id: "actions", label: "Actions", disableSorting: true },
];

export default function SalesProducts(props) {
  const userSessionContext = React.useContext(UserSessionContext);
  const classes = useStyles(props);
  const [records, setRecords] = useState();
  const [isNewPopup, setIsNewPopup] = useState(false);
  const [isEditPopup, setIsEditPopup] = useState(false);
  const [insertId, setInsertId] = useState();

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
                (x.categoryname + x.productname + x.displayName + x.code + x.costPrice + x.sellPrice)
                  .toLowerCase()
                  .includes(query.toLowerCase())
              // items[x].toString().toLowerCase().includes(target.value)
              // x.firstName.toLowerCase().includes(target.value)
            );
        },
      });
    };

  useEffect(() => {
    load_table();
  }, []);

  const load_table = async() => {
   await axios
      .get(`${config.APP_CONFIG}/Products/product/Api`,{ headers: {Authorization: userSessionContext.token } })
      .then((res) => {
        if (res.data.status_code === 200) {
          setRecords(res.data.msg);
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogout();
        }  else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
        }else {
          toast.error("Error Occurred");
          setRecords([]);
        }
      })
      .catch((err) => {
        toast.error("Something Went Wrong");
        setRecords([]);
      });
  };

  const loadCategoryname = async () => {
   await axios
      .get(`${config.APP_CONFIG}/Products/ProductCategory/api`,{ headers: {Authorization: userSessionContext.token } })
      .then((res) => {
        if (res.data && res.data.status_code && res.data.status_code === 200) {
          let temp = res.data.msg.map((name, index) => ({
            label: name.name,
            value: name.id,
          }));
          setRecords(temp);
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogout();
        } else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
        } else {
          toast.error("Error Occurred");
          setRecords([]);
        }
      })
      .catch((err) => {
        toast.error("Something Went Wrong");
        setRecords([]);
      });
  };

  const AddProduct = (_data) => {
    axios
      .post(`${config.APP_CONFIG}/Products/product/Api`, _data,{ headers: {Authorization: userSessionContext.token } })
      .then((res) => {
        if (res.data.status_code === 200) {
          setInsertId(res.data.msg);
          toast.success(res.data.msg);
          // setIsNewPopup(false);
          load_table();
        }  else if (res.data.status_code === 401) {
          userSessionContext.handleLogout();
        } else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
        }else {
          toast.error("Error Occured");
        }
      })
      .catch((err) => {
        toast.error("Something Went Wrong");
      });
  };

  const updateProduct = (data) => {
    axios
      .put(`${config.APP_CONFIG}/Products/product/api/${data.id}`, data,{ headers: {Authorization: userSessionContext.token } })
      .then((res) => {
        if (res.data.status_code === 200) {
          toast.success(res.data.msg);
          load_table();
          setIsEditPopup(false);
        } else if (res.data.status_code === 401) {
          userSessionContext.handleLogout();
        } else if (res.data.status_code === 400) {
          toast.warn(res.data.msg);
        } else {
          toast.error("Error Occurred");
          setRecords([]);
        }
      })
      .catch((err) => {
        toast.error("Something Went Wrong");
        setRecords([]);
      });
  };

  const deleteProduct = (id) => {
    let confirm = window.confirm("Do you Want To Delete ?");
    if (confirm) {
      axios
        .delete(`${config.APP_CONFIG}/Products/product/api/${id}`,{ headers: {Authorization: userSessionContext.token } })
        .then((res) => {
          if (res.data.status_code === 200) {
            toast.warn("Deleted Successfully!");
            load_table();
          } else if (res.data.status_code === 401) {
            userSessionContext.handleLogout();
          } 
          else if(res.data.status_code === 400){
            toast.warn(res.data.msg);
          }
          else {
            toast.error("Error Occurred");
          }
        })
        .catch((err) => {
          toast.error("Something Went Wrong");
       
        });
    } else {
    }
  };

  if (records === undefined) {
    return <Spinner />;
  }

  return (
    <div>
      {/* <div className="py-4"> */}
      <div
        className="content-wrapper iframe-mode"
        data-widget="iframe"
        data-loading-screen={750}
      >
        {isNewPopup ? (
          <Popup
            title="Product Form"
            openPopup={isNewPopup}
            setPopups={setIsNewPopup}
          >
            <ProductStepper handleSubmit={AddProduct} insertId={insertId}/>
          </Popup>
        ) : null}

        {isEditPopup ? (
          <Popup
            title="Product Form"
            openPopup={isEditPopup === false ? false : true}
            setPopups={() => {
              setIsEditPopup(false);
            }}
          >
            <ProductEditStepper
              handleSubmit={updateProduct}
              data={records.filter((x) => x.id === isEditPopup)[0] || null}
            />
          </Popup>
        ) : null}

        <div>
          <div className="row">
            <div className="col-lg-8 col-md-6 col-sm-12 col-xs-12">
              {/* <h3>Product Table</h3> */}
              <PageHeaderTitle title="Product Table" />
            </div>
            {/* <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12  ">
              <Controls.Button
                text="Add New"
                variant="outlined"
                startIcon={<AddIcon />}
                className={classes.newButton}
                onClick={() => {
                  setIsNewPopup(!isNewPopup);
                }}
              />
            </div> */}
          </div>
        </div>
        {/* <div className="pd-15"></div> */}

        <Toolbar>
          <Controls.Input
            label="Search Users"
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
                {recordsAfterPagingAndSorting().map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.categoryname}</TableCell>
                    <TableCell>{item.productname}</TableCell>
                    <TableCell>{item.displayName}</TableCell>
                    <TableCell>{item.code}</TableCell>
                    <TableCell>{item.costPrice}</TableCell>
                    <TableCell>{item.sellPrice}</TableCell>
                    {/* <TableCell>
                      <Controls.ActionButton
                        color="primary"
                        onClick={(e) => {
                          setIsEditPopup(item.id);
                        }}
                      ><Tooltip  title="Edit">
                        <EditOutlinedIcon fontSize="small" /></Tooltip>
                      </Controls.ActionButton>
                      <Controls.ActionButton
                        color="secondary"
                        onClick={() => {
                          deleteProduct(item.id);
                        }}
                      ><Tooltip  title="Delete">
                        <CloseIcon fontSize="small" /></Tooltip>
                      </Controls.ActionButton> 
                    </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </TblContainer>
            {records.length>0?
      <TblPagination /> 
      : <div className="reportNotFound">
      <p >No Records to Display</p>
          </div>}
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}
