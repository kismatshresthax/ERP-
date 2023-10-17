import  React,{useState} from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import config from '../../utils/config';
import StoreSummaryTable from './StoreSummaryTable';
import StockTransfer from './StockTransfer';
import StockAdjustment from './StockAdjustment';
import UserSessionContext from '../../contexts/UserSessionContext';
import CompanyContext from '../../contexts/CompanyContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap-v5';
function StockTab(props) {
  const userSessionContext = React.useContext(UserSessionContext);
  const companyContext = React.useContext(CompanyContext);
  const companyId = companyContext.company.id;
    const [value, setValue] = React.useState('1');
    const [records, setRecords] = useState([]);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    React.useEffect(() => {
      load_table();
     
    }, []);
  
    const load_table = async() => {
      const fig = {
        headers: {
          
          Authorization: userSessionContext.token,
        },
      };
    await axios
        .get(`${config.APP_CONFIG}/stock/warehouse/api`,fig)
        .then((res) => {
         
          if (res.data.status_code === 200) {
      
           let temp = res.data.msg.map((item) => ({
            value: item.id,
            label: item.warehouse,
          }));
            setRecords(temp);
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
    if (records === undefined) {
      return <Spinner />;
    }
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
      
          <Tab label="Summary " value="1" />
          <Tab label="Transfer" value="2" />
          <Tab label="Adjust" value="3" /> 
        </TabList>
      </Box>
      <TabPanel value="1"><StoreSummaryTable  warehouse={records}/></TabPanel>
      <TabPanel value="2"><StockTransfer warehouse={records}/></TabPanel>
      <TabPanel value="3"><StockAdjustment warehouse={records}/></TabPanel>
    
    </TabContext>
  </Box>
  )
}

export default StockTab;