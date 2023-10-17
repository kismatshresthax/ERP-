import  React from 'react';
import Box from '@mui/material/Box';


import LinkedRecipe from './LinkedRecipe';

import Recipe from './Recipe';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
//import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
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
function ReceipeTab() {
  const [value, setValue] = React.useState("1")

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
      
          <Tab label="Unlinked Recipe " value="1" />
          <Tab label="Linked Receipe" value="2" />
       
        </TabList>
      </Box>
      <TabPanel value="1"><Recipe /></TabPanel>
      <TabPanel value="2"><LinkedRecipe/></TabPanel>
     
    
    </TabContext>
  </Box>
  )
}
// return (
//   <Box sx={{ width: '100%' }}>
//     <Box sx={{ borderBottom: 0, borderColor: 'divider' }}>
//       <CustomTabs
//         value={value}
//         onChange={handleChange}
//         aria-label="basic tabs example"
//       >
//         <CustomTab label="UnlinkRecipe" {...a11yProps(0)} />
//         <CustomTab label="linkRecipe" {...a11yProps(1)} />
       
//       </CustomTabs>
//     </Box>
//     <TabPanel value={value} index={0}>
//  <Recipe/>
//     </TabPanel>
//     <TabPanel value={value} index={1}>
//      <LinkedRecipe/> 
//     </TabPanel>
    
//   </Box>
// )
// }
export default ReceipeTab
;