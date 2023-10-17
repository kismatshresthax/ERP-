import  React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import StockLog from './StockLog';
import StockDetailReport from './StockDetailReport';
import StoreStock from './StoreStock';
import StockTransferReport from './StockTransferReport';
import StockAdjustReport from './StockAdjustReport';
function StockReportTab() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
      
          <Tab label="Stock Warehouse " value="1" />
          <Tab label="Stock Detail" value="2" />
          <Tab label="Stock Log " value="3" />
          <Tab label="Stock Transfer" value="4" />
          <Tab label="Stock Adjust" value="5" />
        
        </TabList>
      </Box>
      <TabPanel value="1"><StoreStock/></TabPanel>
      <TabPanel value="2"><StockDetailReport/></TabPanel>
      <TabPanel value="3"><StockLog/></TabPanel>
      <TabPanel value="4"><StockTransferReport/></TabPanel> 
      <TabPanel value="5"><StockAdjustReport/></TabPanel> 
    </TabContext>
  </Box>
  )
}

export default StockReportTab


