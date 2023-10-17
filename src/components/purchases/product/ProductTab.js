import  React,{useState} from 'react';
import Box from '@mui/material/Box';


import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
//import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import PurchaseProducts from './PurchaseProducts';
import ProductSellable from './ProductSellable';
import ProductConsumable from './ProductConsumable';
import axios from 'axios';
import UserSessionContext from '../../../contexts/UserSessionContext';
import config from '../../../utils/config';
import { toast } from 'react-toastify';
//import Typography from '@mui/material/Typography'

//import { styled } from '@mui/material/styles'

// function TabPanel(props) {
//   const { children, value, index, ...other } = props

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   )
// }


// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`,
//   }
// }

// const CustomTabs = styled(Tabs)(() => ({
//   '& .MuiTabs-indicator': {
//     backgroundColor: 'green',
   
//   },
// }))

// const CustomTab = styled(Tab)(() => ({
//   '&.Mui-selected': {
//     color: 'crimson',
//     padding:"10px"
//   },
// }))
function ProductTab() {
  const [value, setValue] = React.useState("1")

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%', typography: 'body1' ,mt:"-15px"}}>
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
        <Tab label="Sellable" value="1" />
        <Tab label="Consumable " value="2" />
          <Tab label="ALL " value="3" />
      

 
        </TabList>
      </Box> 
      <TabPanel value="1"><ProductSellable /></TabPanel>
      <TabPanel value="2"><ProductConsumable /></TabPanel>
      <TabPanel value="3"><PurchaseProducts /></TabPanel>
     
 
    
    </TabContext>
  </Box>
  )
}

export default ProductTab
;