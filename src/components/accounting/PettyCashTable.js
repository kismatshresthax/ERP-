import React,{useState,useEffect,useContext} from 'react'
import Controls from '../controls/Controls'
import UseTable from '../home/UseTable';
import config from "../../utils/config";
import axios from "axios";
import { Search } from "@material-ui/icons";
import { makeStyles,TableRow,TableCell,TableBody, Toolbar, InputAdornment, } from '@material-ui/core';
import AddIcon from "@material-ui/icons/Add";
import { toast } from "react-toastify";

import Spinner from "../../utils/spinner"
import UserSessionContext from "../../contexts/UserSessionContext";
import CompanyContext from "../../contexts/CompanyContext";
import { useHistory} from "react-router-dom";
import PageHeaderTitle from '../../utils/PageHeaderTitle';
import UserAuthenticationContext from '../../contexts/UserAuthenticationContext';
import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
import ViewPettyCash from './ViewPettyCash';
import Popup from "../home/Popup";
const headCells=[
    {id:"accountingDate",label:"Date"},
    {id:"transactionid ",label:"TransactionID"},
    {id:"reference",label:"Reference"},
    {id:"narration",label:"Narration"},
    { id: "actions", label: "Actions" },

];
const useStyles= makeStyles((theme)=>({
newButton:{
    position:"absolute",
    right:"3%",
    zIndex:4

}
})

)

function PettyCashTable(props) {
    const userSessionContext = React.useContext(UserSessionContext);
    const classes=useStyles(props);
    const[records,setRecords]=useState();
    let history = useHistory();
   // const [isNewPopup, setIsNewPopup] = useState(false);
    const comp= useContext(CompanyContext);

var companyId=comp.company["id"]
const [filterFn, setFilterFn] = useState({
  fn: (items) => {
    return items;
  },
});
const permissionContext=React.useContext(UserAuthenticationContext);
let Permission = permissionContext.permissions;
let curr_mod_permission =Permission.filter( x=>{return x["module_name"].toLowerCase() === "accounting"})
let userPermission= curr_mod_permission[0]
const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    UseTable(records, headCells, filterFn);
    const handleSearch = (e) => {
      let query = e.target.value;
  
      setFilterFn({
        fn: (items) => {
          if (query == "") return items;
          else
            return items.filter(
              (x) =>
                (x.accountingDate + x.reference + x.transactionid + x.narration)
                  .toLowerCase()
                  .includes(query.toLowerCase())
              // items[x].toString().toLowerCase().includes(target.value)
              // x.firstName.toLowerCase().includes(target.value)
            );
        },
      });
    };




    const [isViewPopup, setIsViewPopup] = useState(false);
useEffect(() => {
    load_journal_transaction ();
  }, []);

  const load_journal_transaction = async () => {
  
    await axios
      .get(`${config.APP_CONFIG}/Account/Journal/journalTransaction/${companyId}`,{
        headers: {
        
          Authorization: userSessionContext.token,
        },
      })
      .then((res) => {
        if (res.data.status_code === 200) {
          setRecords(res.data.msg);
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
  // const load_journal_transaction_by_id =  (id) => {
  
  //   axios
  //     .get(`${config.APP_CONFIG}/Account/Journal/journalTransaction/${id}/${companyId}`,{ headers: { Authorization: userSessionContext.token,},})
  //     .then((res) => {
  //       if (res.data.status_code === 200) {
  //         setRecords(res.data.msg);
  //       } else if (res.data.status_code === 401) {
  //         userSessionContext.handleLogout();
  //       } else {
  //         toast.error("Warning");
  //         setRecords([]);
  //       }
  //     })
  //     .catch((err) => {
  //       toast.error("Error");
      
  //       setRecords([]);
  //     });
  // };


  // const viewTableDetailsJournal = () => {

  //   axios
  //   .get(`${config.APP_CONFIG}/Account/Journal/Api/${companyId}`,{
  //     headers: {
      
  //       Authorization: userSessionContext.token,
  //     },
  //   })
  //   .then((res) => {
  //     if (res.data.status_code === 200) {
  //       setRecords(res.data.msg);
  //     } else if (res.data.status_code === 401) {
  //       userSessionContext.handleLogout();
  //     } else {
  //       toast.error("Error Occurred");
  //       setRecords([]);
  //     }
  //   })
  //   .catch((err) => {
  //     toast.error("Something Went Wrong");
    
  //     setRecords([]);
  //   });

  // }
  if (records === undefined) {
    return <Spinner />;
  }
return (
        <div>     

{isViewPopup ? (
          <Popup
            title="Petty Cash Details"
            openPopup={isViewPopup === false ? false : true}
            setPopups={() => {
              setIsViewPopup(false);
            }}
          >
            <ViewPettyCash
              data={records.filter((x) => x.id === isViewPopup)[0] || null}

            />
          </Popup>
        ) : null}
        <div>
        <div className="row">
          <div className="col-lg-8 col-md-6 col-sm-12 col-xs-12 ">
            {/* <h3>Journal Tables</h3> */}
            <PageHeaderTitle title="Petty Cash Table" />
          </div>
          {userPermission["u_create"]===1? 
          <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 ">
            <Controls.Button
              text="Create"
              variant="outlined"
              startIcon={<AddIcon />}
              className={classes.newButton}
              onClick={() => {  history.push(`/accounting/petty_cash_form`) }
               
            }
              
            />
          </div>
          :null} 
        </div>
      </div>
      {/* <div className="pd-15"></div> */}

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
              {recordsAfterPagingAndSorting().map((item) => {
            
               return <TableRow key={item.id}>
                  <TableCell>{item.accountingDate}</TableCell>
                  <TableCell>{item.transactionid}</TableCell>
                  <TableCell>{item.reference}</TableCell>
                  <TableCell>{item.narration}</TableCell>
                  <TableCell>
                   
                  
                    <Controls.ActionButton
                      color="primary"
                      onClick={() => {
                        setIsViewPopup(item.id)
                        
                      }}
                    >
                      <RemoveRedEyeIcon fontSize="small" />
                    </Controls.ActionButton>
                  </TableCell>
                </TableRow>
})}
            </TableBody>
          </TblContainer>
          {records.length>1?
          <TblPagination />
          :null}
        </div>
      </div>
    </div>

        
    )
}

export default PettyCashTable

