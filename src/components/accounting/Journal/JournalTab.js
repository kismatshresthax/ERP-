import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import JournalUI from "./JournalUI";
import SalesJournal from "./SalesJournal";
import PurchaseJournal from "./PurchaseJournal";
import PettyCashJournal from "./PettyCashJournal";
import PaymentVoucher from "./PaymentVoucher";
import ReceiptForm from "./ReceiptForm";
import CompanyContext from "../../../contexts/CompanyContext";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const companyContext = React.useContext(CompanyContext);
  // const companyFiscalyear = companyContext.fiscal[0]["fiscalYear"];
  // console.log(companyFiscalyear);
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function JournalTab() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          className="journal-tabs"
        >
          <Tab label="Journal Voucher" {...a11yProps(0)} style={{maxWidth: "160px", fontSize: "0.7rem"}} />
          <Tab label="Purchase Voucher" {...a11yProps(1)} style={{maxWidth: "160px", fontSize: "0.7rem"}} />
          <Tab label="Sales Voucher" {...a11yProps(2)} style={{maxWidth: "160px", fontSize: "0.7rem"}} />
          <Tab label="Petty Cash Voucher" {...a11yProps(3)} style={{maxWidth: "160px", fontSize: "0.7rem"}} />
          <Tab label="Receipt Voucher" {...a11yProps(4)} style={{maxWidth: "160px", fontSize: "0.7rem"}} />
          <Tab label="Payment Voucher" {...a11yProps(5)} style={{maxWidth: "160px", fontSize: "0.7rem"}} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <JournalUI />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <PurchaseJournal />
      </TabPanel>

      <TabPanel value={value} index={2}>
        <SalesJournal />
      </TabPanel>

      <TabPanel value={value} index={3}>
        <PettyCashJournal />
      </TabPanel>

      <TabPanel value={value} index={4}>
        <ReceiptForm />
      </TabPanel>

      <TabPanel value={value} index={5}>
        <PaymentVoucher />
      </TabPanel>
    </Box>
  );
}
