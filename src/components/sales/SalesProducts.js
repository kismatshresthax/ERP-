import React, { useState, useEffect } from "react";
import axios from "axios";
import {Route} from "react-router-dom";
import config from '../../utils/config';
import { toast } from "react-toastify";
import UserSessionContext from "../../contexts/UserSessionContext"
import '../../utils/styles.css'
import { Switch } from '@material-ui/core';
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import Controls from "../controls/Controls";
import AddIcon from "@material-ui/icons/Add";

const  SalesProducts = props =>{
  const [product, setProduct] = useState([]);

  const userSessionContext = React.useContext(UserSessionContext)
  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
   await axios.get(`${config.APP_CONFIG}/Sales/GetSalesProduct/api`)
    .then(res => {
      if(res.data.status_code === 200)
      {
        setProduct(res.data.msg)
      }
      else if(res.data.status_code === 400)
      {
        userSessionContext.handleLogOut()
      }
      else 
      {
        toast.error("can't load data");
        setProduct([])
      }
    })
    .catch(err => {
      toast.error("Error Occured")
      setProduct([])
    })
  };

  const getCheckBox = (rowid, columnid,id) => {
    let cell_value = (product[rowid][columnid] && parseInt(product[rowid][columnid])) || 0

    return <Switch
      color = 'primary'
      checked={cell_value === 1 ? true : false}
      defaultValue="on"
      onChange={e => {
        let changedValue = 0
        if (cell_value === 0) {
          changedValue = 1
        }
        
        let _tmp_users = [...product]
        _tmp_users[rowid][columnid] = changedValue
        let request_payload = {
          "name": _tmp_users[rowid]["productname"],
          "code":  _tmp_users[rowid]["code"],
          "displayName":  _tmp_users[rowid]["displayName"],
          "costPrice":  _tmp_users[rowid]["costPrice"],
          "costtax":  _tmp_users[rowid]["costtax"],
          "costDiscount":  _tmp_users[rowid]["costDiscount"],
          "sellPrice":  _tmp_users[rowid]["sellPrice"],
          "selltax":  _tmp_users[rowid]["selltax"],
          "sellDiscount":  _tmp_users[rowid]["sellDiscount"],
          "isConsumable":  _tmp_users[rowid]["isConsumable"],
          // "isConsumable": isConsumable,
          "isSellable":  _tmp_users[rowid]["isSellable"],
          // "isSellable": isSellable,
          "isService":  _tmp_users[rowid]["isService"],
          "categoryId":  _tmp_users[rowid]["categoryId"]

        }
        axios.put(`${config.APP_CONFIG}/Sales/SalesProduct/api/${id}`,request_payload)
        .then(res => {
          if(res.data.status_code === 200)
          {
            setProduct(_tmp_users)
          }
          else if (res.data.status_code === 401)
          {
            userSessionContext.handleLogOut();
          }
          else 
          {
            setProduct([])
            toast.error("can't read data")
          }
        })
        .catch(err => {
          setProduct([])
          toast.error("Failed to load data!")
        })
      }}
    />
  }


  const deleteProduct = async id => {
    let confirm = window.confirm("Do You Want to Delete?");
    if(confirm)
    {
      axios.delete(`${config.APP_CONFIG}/Sales/SalesProduct/api/${id}`)
      .then(res => 
        {
          if(res.data.status_code === 200)
          {
            toast.warn("Delete successfully")
            loadProduct();
          }
          else if (res.data.status_code === 400)
          {
            userSessionContext.handleLogOut()
          }
          else 
          {
            toast.error("Unable to delete Product");
            loadProduct();
          }
          
        })
        .catch(err => {
          toast.error("error occured");
          loadProduct();
        })
    }
  }
    return (
    <div className="content-wrapper iframe-mode" data-widget="iframe" data-loading-screen={750}>
      <div>
      {/* <Link class="btn btn-primary mr-2 addbtn"to={`/sales/addSalesProduct`}>Add Product</Link> */}
      <Route render={({ history}) => (
              <Controls.Button
              text="Add New"
              variant="outlined"
              startIcon={<AddIcon />}
              className="addbtn"
              onClick={() => { history.push(`/sales/addSalesProduct`) }}
            />
            )} />
        <div className="title">Product</div>
        <div className="py-4">
          <table class="table border shadow">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Category Name</th>
                <th scope="col">Product Name</th>
                <th scope="col">Code</th>
                <th scope="col">Cost Discount</th>
                <th scope="col">Cost Price</th>
                <th scope="col">Cost Tax</th>
                <th scope="col">Display Name</th>
                <th scope="col">Consumable</th>
                <th scope="col">Sellable</th>
                <th scope="col">Service</th>
                <th scope="col">Sell Discount</th>
                <th scope="col">Sell Price</th>
                <th scope="col">Sell Tax</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
             {product && product.map((product,index) => (
               <tr>
                 {/* <th scope="row">{index + 1}</th> */}
                 <td>{product.categoryname}</td>
                 <td>{product.productname}</td>
                 <td>{product.code}</td>
                 <td>{product.costDiscount}</td>
                 <td>{product.costPrice}</td>
                 <td>{product.costtax}</td>
                 <td>{product.displayName}</td>
                 <td>
                  {
                    getCheckBox(index, 'isConsumable',product.id)
                  }
                  </td>
                  <td>
                   {
                    getCheckBox(index, 'isSellable',product.id)
                  }
                  </td>
                  <td>
                   {
                    getCheckBox(index, 'isService',product.id)
                  }
                  </td>
                 <td>{product.sellDiscount}</td>
                 <td>{product.sellPrice}</td>
                 <td>{product.selltax}</td>
                 {/* <Link to={`/purchase/product/${product.id}/edit`}
                    class="btn btn-outline-primary mr-2">
                    Edit
                  </Link>
                  <Link to = {`/purchase/products`}
                    class="btn btn-danger"
                    onClick = {() => deleteProduct(product.id)}
                   >
                    Delete
                  </Link> */}

                  <Route render={({ history}) => (
                        <Controls.ActionButton
                          // type='button'
                          color="primary"
                          onClick={() => { history.push(`/sales/product/${product.id}/edit`) }}
                        >
                          <EditOutlinedIcon fontSize="small" />
                        </Controls.ActionButton>
                      )} />
  
                    <Controls.ActionButton
                      color="secondary"
                      onClick={() => {
                        deleteProduct(product.id);
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </Controls.ActionButton>

               </tr>
             ))}

            </tbody>
          </table>
        </div>
      </div>
    </div>
    )
}


export default SalesProducts