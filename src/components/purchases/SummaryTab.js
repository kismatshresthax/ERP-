import React from 'react'

import Box from '@mui/material/Box';


import PurchaseTransactionCompleted from './PurchaseTransactionCompleted';

import PurchaseNotCompleted from './PurchaseNotCompleted';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
//import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
function SummaryTab(props) {
    const [value, setValue] = React.useState("1");

    const handleChange = (event, newValue) => {
      setValue(newValue)
    }
    
    return (
      <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab label="Transaction Completed" value="1" />
            <Tab label="Transaction Not Completed" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1"><PurchaseTransactionCompleted /></TabPanel>
        <TabPanel value="2"><PurchaseNotCompleted /></TabPanel>
       
      
      </TabContext>
    </Box>
    )
  }
  

export default SummaryTab