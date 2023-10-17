import  React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import SalesReportByDate from './Report/SalesReportByDate';
import VatSalesReport from './VatSalesReport'; 
import SalesMaterializedReport from './Report/SalesMaterializedReport';
import Report from "./Report/Report";
function SalesReportTab() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab label="Vat Sales Report" value="1" />
          <Tab label="Materialized Report" value="2" />
       
          <Tab label="Sales Report By Date" value="3" />
          <Tab label="Sales Detail Report By Date" value="4" />
        </TabList>
      </Box>
      <TabPanel value="1">
      <VatSalesReport/>

      </TabPanel>
      <TabPanel value="2"><SalesMaterializedReport/></TabPanel>
      <TabPanel value="3"><Report/></TabPanel>
      <TabPanel value="4"><SalesReportByDate/></TabPanel>
   
    </TabContext>
  </Box>
  )
}

export default SalesReportTab


