import React, { lazy } from "react";
 import Home from "../components/pages/Home";


import RoleToModuleMap from "../components/settings/roles/RoleToModuleMap";

import CompanyDetails from "../components/settings/companies/CompanyDetails";
import PreferencesPage from "../components/settings/PreferencesPage";

import ReportingPage from "../components/accounting/ReportingPage";
import TaxRatesPage from "../components/accounting/TaxRatesPage";

import Popup from "../components/home/Popup";
import ChartOfAccountsPage from "../components/accounting/ChartOfAccountsPage";

//import CreateCOAPage from "../components/accounting/CreateCOAPage";

import Vendors from "../components/purchases/Vendors";
import PurchaseProducts from "../components/purchases/product/PurchaseProducts";
import PurchaseProductCategories from "../components/purchases/product/PurchaseProductCategories";



import Warehouses from "../components/inventory/Wareshouses";
import CreateRolePage from "../components/settings/CreateRolePage";
import EditRolePage from "../components/settings/roles/EditRolePage";
import AssignRolePage from "../components/settings/roles/AssignRolePage";

import CreateProduct from "../components/purchases/product/CreateProduct";

import EditPurchaseProduct from "../components/purchases/product/EditPurchaseProduct";

import VendorsForm from "../components/purchases/VendorsForm";

import JournalEntryTable from "../components/accounting/JournalEntryTable";


import MaterialClients from "../components/sales/MaterialClients";
import MaterialClientForm from "../components/sales/MaterialClientForm";
//import WareHouseForm from "../components/inventory/WareHouseForm";





import BankPage from "../components/accounting/BankPage";
//import BankForm from "../components/accounting/BankForm";

import Baseconverter from "./Baseconverter";
import ConfirmDialog from "../components/home/ConfirmDialog";

//import CreateFiscalPage from "../components/settings/fiscalYear/CreateFiscalYear";


import Purchasepdf from "../components/purchases/Purchasepdf";
import JournalUI from "../components/accounting/Journal/JournalUI";

import UnitPageSummary from "../components/inventory/UnitPageSummary";
import PettyCashTable from "../components/accounting/PettyCashTable";

//import PettyCashForm from "../components/accounting/PettyCashForm";
//import ReceiptForm from "../components/accounting/ReceiptForm";
//import ReceiptVoucher from "../components/accounting/ReceiptVoucher";
import Login from "../components/Login/Login";
import PurchaseReturnTable from "../components/purchases/purchaseReturn/PurchaseReturnTable";
import SalesReturnTable from "../components/sales/salesReturn/SalesReturnTable";
//import SalesJournal from "../components/accounting/SalesJournal";
import SalesVoucher from "../components/accounting/SalesVoucher";
//import PettyCashJournal from "../components/accounting/PettyCashJournal";
//import PurchaseJournal from "../components/accounting/PurchaseJournal";
import JournalTab from "../components/accounting/Journal/JournalTab";

//import { faPlus, faCheck, faCalculator, faCog, faFileInvoice, faFileInvoiceDollar ,faAddressBook, faCopy, faAnchor, faCogs, faSignOutAlt, faHome } from '@fortawesome/free-solid-svg-icons'
//Icons//

import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AddchartIcon from '@mui/icons-material/Addchart';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import ListIcon from '@mui/icons-material/List';
import BalanceIcon from '@mui/icons-material/Balance';
import GroupIcon from '@mui/icons-material/Group';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import CottageIcon from '@mui/icons-material/Cottage';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SummarizeIcon from '@mui/icons-material/Summarize';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import GroupsIcon from '@mui/icons-material/Groups';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AddCardIcon from '@mui/icons-material/AddCard';

//icons//


//import Report from "../components/sales/Report/Report";

import Summarytab from "./../components/sales/Summarytab";

//import SalesReportTab from "../components/sales/SalesReportTab";


import StockReportTab from "../components/inventory/StockReportTab";

import StockTab from "../components/inventory/StockTab";
import StockYield from "../components/inventory/StockYield";

import ReceipeTab from "../components/inventory/Receipe/ReceipeTab";


import SummaryTab from "../components/purchases/SummaryTab";

import BussinessSetting from "../components/settings/BussinessSetting";
import ProductTab from "../components/purchases/product/ProductTab";
import PurchaseDetailReportByDate from "../components/purchases/Report/PurchaseDetailReportByDate";
import PurchaseReportDate from "../components/purchases/Report/PurchaseReportDate"
import BLreport from "../components/accounting/Report/BLReport";
import PLreport from "../components/accounting/Report/PLReport";
import TrialReport from "../components/accounting/Report/TrialReport";
import LedgerReport from "../components/accounting/Report/LedgerReport";
import MatrixReportPOS from "../components/reports/POS/MatrixReportPOS";
import ReportSales from "../components/sales/Report/Report";

const CompaniesPage = lazy(() => import("../components/settings/companies/CompaniesPage"));
const UsersPage= lazy(() => import("../components/settings/users/UsersPage"));



const UsersRolesPage = lazy(() => import("../components/settings/roles/UserRolesPage"));
const Productionform = lazy(() => import("../components/inventory/RecipeProduction/Productionform"));
const ReportPage = lazy(() => import("../components/reports/ReportPage"));



const  VatSalesReport  = lazy(() => import("../components/sales/Report/VatSalesReport"));
const SalesReportByDate  = lazy(() => import("../components/sales/Report/SalesReportByDate"));


const  PurchaseReport= lazy(() => import("../components/purchases/PurchaseReport"));
//const  PurchaseReportDetailReportByDate= lazy(() => import("../components/purchases/Report/PurchaseReportDetailReportByDate"));
//const  PurchaseReportbyDate= lazy(() => import("../components/purchases/Report/PurchaseReportbyDate"));
const SalesMaterializedReport = lazy(() => import("../components/sales/Report/SalesMaterializedReport"));
const StockTransferReport = lazy(() => import("../components/inventory/Report/StockTransferReport"));
const StockAdjustReport = lazy(() => import("../components/inventory/Report/StockAdjustReport"));
const SalesVoid = lazy(() => import("../components/sales/SalesVoid"));
const Voidreport = lazy(() => import("../components/sales/Report/Voidreport"));
//const MatrixReport = lazy(() => import("../components/reports/POS/MatrixReport"));
const POSReportCenter = lazy(() => import("../components/reports/POS/POSReportCenter"));
const   StockLog = lazy(() => import("../components/inventory/StockLog"));
//const  Purchasedetailreport= lazy(() => import("../components/purchases/Report/Purchasedetailreport"));
const  StockDetailReport = lazy(() => import("../components/inventory/Report/StockDetailReport"));



const  OpeningStock = lazy(() => import("../components/inventory/OpeningStock"));
const StoreStock= lazy(() => import("../components/inventory/StoreStock"));
const FiscalYearPage= lazy(() => import("../components/settings/fiscalYear/FiscalYearPage"));
const Daybook= lazy(() => import("../components/reports/Daybook"));
const DigitalPay = lazy(() => import("../components/pages/DigitalPay"));





const routes = [
  {
    path: "/",
    component: Home,
    exact: true,
    title: "Dashboard",
    showInNav: true,
    parent: "Core",
  },
 
  {
  path: "/login",
  component: Login,
  exact: true,
  title: "Login",
  showInNav: false,
  parent: "Core",
},
{
  path: "/bussiness/setting",
  component: BussinessSetting,
  exact: true,
  title: "BussinessSetting",
  showInNav: false,
  parent: "Core",
},
  // settings part
  {
    path: "/settings/users",
    component: UsersPage,
    exact: true,
    parent: "SETTINGS",
    title: "Users",
    showInNav: true,
    permissions:'u_read',
    icon:<GroupIcon/>
    // permissions:[{"u_read":1,"u_write":1,"u_create":1}]
  },
 
  {
    path: "/settings/roles",
    component: UsersRolesPage,
    title: "User Roles",
    parent: "SETTINGS",
    exact: true,
    showInNav: true,
    icon:<PersonAddIcon/>
    //permissions:'u_admin',
    // permissions:[{"u_read":1,"u_write":1,"u_create":1}]
  },
  {
    path: "/settings/roles/assign",
    component: AssignRolePage,
    exact: true,
    parent: "SETTINGS",
    title: "Assign Role",
    showInNav: true,
    icon:<EventSeatIcon/>
    //permissions:'u_admin'
  },
  {
    path: "/settings/companies",
    component: CompaniesPage,
    exact: true,
    parent: "SETTINGS",
    title: "Companies",
    showInNav: true,
    icon:<AddBusinessIcon/>
  },
 
  {
    path: "/settings/roles/:id/view_permission",
    component: RoleToModuleMap,
    exact: true,
    parent: "SETTINGS",
    title: "Role Module",
    showInNav: false,
    //permissions:'u_admin'
  },
  {
    path: "/settings/roles/create",
    component: CreateRolePage,
    exact: true,
    parent: "SETTINGS",
    showInNav: false,
    //permissions:'u_admin'
  },
  {
    path: "/settings/roles/:id/edit",  
    component: EditRolePage,
    exact: true,
    parent: "SETTINGS",
    showInNav: false,
    //permissions:'u_admin'
  },
  
  {
    path: "/settings/viewCompany/:id",
    component: CompanyDetails,
    exact: true,
    parent: "SETTINGS",
    title: "View Company Details",
    showInNav: false,
  },


  {
    path: "/settings/fiscalyearpage",
    component: FiscalYearPage,
    exact: true,
    parent: "SETTINGS",
    title: "Fiscal year",
    showInNav: true,
    permissions:'u_read',
    icon:<CalendarMonthIcon/>
  },
  // {
  //   path: "/settings/createfiscalyear",
  //   component: CreateFiscalPage,
  //   exact: true,
  //   parent: "SETTINGS",
  //   title: "Fiscal page",
  //   showInNav: false,
  //   permissions:'u_read',
  // },


  // accounting part
  {
    path: "/accounting/bankpage",
    component: BankPage,
    exact: true,
    parent: "ACCOUNTING",
    title: "Bank Account",
    showInNav: true,
   // permissions:{"u_read":1,"u_write":1,"u_create":1,"u_delete":1,"u_admin":1,}
    permissions:'u_read',
    icon:<AccountBalanceIcon/> ,

  },
  
  
  // {
  //   path: "/accounting/bankform",
  //   component: BankForm,
  //   exact: true,
  //   parent: "ACCOUNTING",
  //   title: "Bank Form",
  //   showInNav: false,

  // },
  {
    path: "/accounting/journal-entries-table",
    component: JournalEntryTable,
    exact: true,
    parent: "ACCOUNTING",
    title: "Journal Table",
    showInNav: true,
    permissions:'u_read',
    icon:<ContentPasteIcon/>
  },
  // {
  //   path: "/accounting/journal-entries",
  //   component: JournalEntriesPage,
  //   exact: true,
  //   parent: "ACCOUNTING",
  //   title: "Entries",
  //   showInNav: false,
  // },
  {
    path: "/accounting/journal",
    component: JournalUI,
    exact: true,
    parent: "ACCOUNTING",
    title: "Journals",
    showInNav: false,
  },
 
  {
    path: "/accounting/reporting",
    component: ReportingPage,
    exact: true,
    parent: "ACCOUNTING",
    title: "Reports",
    showInNav: false,
    //permissions:'u_read'
    icon:<AssessmentIcon/>
  },
  {
    path: "/accounting/reporting/plreport",
    component: PLreport,
    exact: true,
    parent: "ACCOUNTING",
    title: "Reports",
    showInNav: false,
   // permissions:'u_read',

  },
  {
    path: "/accounting/reporting/blreport",
    component: BLreport,
    exact: true,
    parent: "ACCOUNTING",
    title: "BLreport",
    showInNav: false,
   // permissions:'u_read',
  },
  {
    path: "/accounting/taxRates",
    component: TaxRatesPage,
    exact: true,
    parent: "ACCOUNTING",
    title: "Tax Rates",
    showInNav: true,
    permissions:'u_read',
    icon:<AddchartIcon/>
  },
  {
    path: "/accounting/chartOfAccounts",
    component: ChartOfAccountsPage,
    exact: true,
    parent: "ACCOUNTING",
    title: "Chart Of Accounts",
    showInNav: true,
    permissions:'u_admin',
    icon:<ListAltIcon/>
  },
  {
    path: "/accounting/add",
    component: Popup,
    exact: true,
    parent: "ACCOUNTING",
    title: "Common Popup",
    showInNav: false,
  },

  {
    path: "/accounting/ledgerreportingpage",
    component: LedgerReport,
    exact: true,
    parent: "ACCOUNTING",
    title: "Ledger",
    showInNav: false,
    //permissions:'u_read'
  },
  {
    path: "/accounting/trialreporting",
    component: TrialReport,
    exact: true,
    parent: "ACCOUNTING",
    title: "Reports",
    showInNav: false,
    //permissions:'u_read',
  },
  {
    path: "/accounting/petty_cash_table",
    component: PettyCashTable,
    exact: true,
    parent: "ACCOUNTING",
    title: "Petty Cash",
    showInNav: false,
    //permissions:'u_read',
  },
 
  {
    path: "/accounting/journaltab",
    component: JournalTab,
    exact: true,
    parent: "ACCOUNTING",
    title: " Journal",
    showInNav: false,
    //permissions:'u_read',
  },


  {
    path: "/accounting/salesvoucher",
    component:SalesVoucher,
    exact: true,
    parent: "ACCOUNTING",
    title: "Sales Voucher",
    showInNav: false,

    // permissions:{"u_read":1,"u_write":1,"u_create":1,"u_delete":1,"u_admin":1,}
    //permissions:'u_read',

  },
  
 
  {
    path: "/purchase/summary/new",
    component: SummaryTab,
    exact: true,
    parent: "PURCHASES",
    title: "Summary",
    showInNav: true,
    permissions:'u_read',
    icon:<SummarizeIcon/>
  },
  {
    path: "/purchase/vendors",
    component: Vendors,
    exact: true,
    parent: "PURCHASES",
    title: "Vendors",
    showInNav: true,
    permissions:'u_read',
    icon:<AddCardIcon/>
  },
  // {
  //   path: "/purchase/products",
  //   component: PurchaseProducts,
  //   exact: true,
  //   parent: "PURCHASES",
  //   title: "Products",
  //   showInNav: true,
  //   permissions:'u_read',
  //   icon:<ProductionQuantityLimitsIcon/>
  // },
  {
    path: "/purchase/products",
    component: ProductTab,
    exact: true,
    parent: "PURCHASES",
    title: "Products",
    showInNav: true,
    permissions:'u_read',
    icon:<ProductionQuantityLimitsIcon/>
  },
  {
    path: "/purchase/categories",
    component: PurchaseProductCategories,
    exact: true,
    parent: "PURCHASES",
    title: "Products Categories",
    showInNav: true,
    permissions:'u_read',
    icon:<ListIcon/>
  },
  {
    path: "/purchase/addproduct",
    component: CreateProduct,
    exact: true,
    parent: "PURCHASES",
    title: "Create Product",
    showInNav: false,
  },
  {
    path: "/purchase/product/:id/edit",
    component: EditPurchaseProduct,
    exact: true,
    parent: "PURCHASES",
    title: "Edit Product",
    showInNav: false,
  },
 
  {
    path: "/purchase/vendorform",
    component: VendorsForm,
    exact: true,
    parent: "PURCHASES",
    title: "Vendors",
    showInNav: false,
  },
  {
    "path": "/purchase/purchase_return",
    component: PurchaseReturnTable,
    exact: true,
    parent:"PURCHASES",
    title:"Purchase Return",
    showInNav:true,
    icon:<KeyboardReturnIcon/>
  },

  // {
  //   path: "/purchase/tabreport",
  //   component: PurchaseReportTab,
  //   exact: true,
  //   parent: "PURCHASES",
  //   title: "Report",
  //   showInNav: false,
  //  // permissions:'u_read',
  //   icon:<AnalyticsIcon/>
  // },
  // {
  //   path: "/purchase/detail/report",
  //   component: Purchasedetailreport,
  //   exact: true,
  //   parent: "PURCHASES",
  //   title: " Purchase Detail Report",
  //   showInNav: false,
 
  //   // icon:<AnalyticsIcon/>
  // },

  // sales part
  {
    path: "/sales/summary",
    component: Summarytab,
    exact: true,
    parent: "SALES",
    title: "Summary",
    showInNav: true,
    permissions:'u_read',
    icon:<SummarizeIcon/>
  },

 

  

  {
    path: "/sales/vat/report",
    component: VatSalesReport,
    exact: true,
    parent: "SALES",
    title: "Vat Sales Report",
    showInNav: false,
    // icon:<AnalyticsIcon/>
  },
  // {
  //   path: "/sales/tabreport",
  //   component: SalesReportTab,
  //   exact: true,
  //   parent: "SALES",
  //   title: " Report",
  //   showInNav: false,
  //   icon:<AnalyticsIcon/>
  // },
  {
    path: "/sales/materialized/report",
    component: SalesMaterializedReport,
    exact: true,
    parent: "SALES",
    title: "Materialized Report",
    showInNav: false,
    // icon:<AssessmentIcon/>
  },
  {
    path: "/sales/salesvoid/:Id",
    component: SalesVoid,
    exact: true,
    parent: "SALES",
    title: "sales void",
    showInNav: false,
    
  },

  {
    path: "/sales/salesbydate",
    component: SalesReportByDate,
    exact: true,
    parent: "SALES",
    title: "Sales Detail Report",
    showInNav: false,
    // icon:<AssessmentIcon/>
  },

  {
    path: "/sales/salesreport",
    component: ReportSales,
    exact: true,
    parent: "SALES",
    title: "Sales Report",
    showInNav: false,
    // icon:<AssessmentIcon/>
  },


  {
    path: "/purchase/categories",
    component: PurchaseProductCategories,
    exact: true,
    parent: "SALES",
    title: "Products Categories",
    showInNav: false,
  },
  {
    path: "/purchase/addproduct",
    component: CreateProduct,
    exact: true,
    parent: "SALES",
    title: "Create Product",
    showInNav: false,
  },
  
  {
    path: "/sales/Clients",
    component: MaterialClients,
    exact: true,
    parent: "SALES",
    title: "Clients",
    showInNav: true,
    permissions:'u_read',
    icon:<GroupsIcon />
  },
  {
    path: "/sales/ClientsForm",
    component: MaterialClientForm,
    exact: true,
    parent: "SALES",
    title: "ClientForm",
    showInNav: false,
  },


  {
    path: "/sales/sales_return",
    component: SalesReturnTable,
    exact: true,
    parent:"SALES",
    title:"Sales Return",
    showInNav:true,
    icon:<KeyboardReturnIcon/>
  },
 

  // inventory part
  {
    path: "/inventory/recipe",
    component: ReceipeTab,
    exact: true,
    parent: "INVENTORY",
    title: "Recipe",
    showInNav: true,
    permissions:'u_read',
    icon:<SummarizeIcon/>
  },
  {
    path: "/inventory/opening",
    component: OpeningStock,
    exact: true,
    parent: "INVENTORY",
    title: "Physical Stock",
    showInNav: true,

    icon:<SummarizeIcon/>
  },
 
  {
    path: "/inventory/yield",
    component: StockYield,
    exact: true,
    parent: "INVENTORY",
    title: "Yield",
    showInNav: true,
 
    icon:<CottageIcon/>
  },
  // {
  //   path: "/inventory/yield/form",
  //   component: StockYieldForm,
  //   exact: true,
  //   parent: "INVENTORY",
  //   title: "Yieldform",
  //   showInNav: true,
 
  //   icon:<SummarizeIcon/>
  // },
  {
    path: "/inventory/stocktab",
    component: StockTab,
    exact: true,
    parent: "INVENTORY",
    title: "Stock",
    showInNav: true,
    permissions:'u_read',
    icon:<SummarizeIcon/>
  },
  {
    path: "/inventory/products",
    component: PurchaseProducts,
    exact: true,
    parent: "INVENTORY",
    title: "Products",
    showInNav: false,
    permissions:'u_read',
    icon:<ProductionQuantityLimitsIcon/>
  },
  {
    path: "/inventory/product-categories",
    component: PurchaseProductCategories,
    exact: true,
    parent: "INVENTORY",
    title: "Product Categories",
    showInNav: false,
    permissions:'u_read',
    icon:<ListIcon/>
  },
  {
    path: "/inventory/warehouses",
    component: Warehouses,
    exact: true,
    parent: "INVENTORY",
    title: "Warehouses",
    showInNav: true,
    permissions:'u_read',
    icon:<CottageIcon />
  },
  {
    path: "/inventory/stocklogreport",
    component: StockLog,
    exact: true,
    parent: "INVENTORY",
    title: "Stock Log",
    //showInNav: true,
    //permissions:'u_read',
    //icon:<InventoryIcon />
  },
  {
    path: "/inventory/Storestock",
    component: StoreStock,
    exact: true,
    parent: "INVENTORY",
    title: "Stock",
    showInNav: false,
    //permissions:'u_read',
    //icon:<BalanceIcon />
  },

  {
    path: "/inventory/stock/adjust",
    component: StockAdjustReport,
    exact: true,
    parent: "INVENTORY",
    title: "Stock Adjust",
    showInNav: false,
    //permissions:'u_read',
    
  },
  {
    path: "/inventory/stock/transfer",
    component: StockTransferReport,
    exact: true,
    parent: "INVENTORY",
    title: "Stock Transfer",
    showInNav: false,
    //permissions:'u_read',
    
  },
  {
    path: "/inventory/Stockreporttab",
    component: StockReportTab,
    exact: true,
    parent: "INVENTORY",
    title: "Reports",
    showInNav: false,
    //permissions:'u_read',
    icon:<AnalyticsIcon/>
  },
  {
    path: "/inventory/dailyProd",
    component: Productionform,
    exact: true,
    parent: "INVENTORY",
    title: "Production House",
    showInNav: true,
    //permissions:'u_read',
    icon:<AnalyticsIcon/>
  },

  {
    path: "/inventory/StockDetailreport",
    component: StockDetailReport,
    exact: true,
    parent: "INVENTORY",
    title: "Stock Detail Report",
    //showInNav: true,
    //permissions:'u_read',
   // icon:<WysiwygIcon  />
  },
  
  // {
  //   path: "/inventory/addWarehouse",
  //   component: WareHouseForm,
  //   exact: true,
  //   parent: "INVENTORY",
  //   title: "Warehouse Form",
  //   showInNav: false,

  // },
  {
    path: "/inventory/baseconvert",
    component: Baseconverter,
    exact: true,
    parent: "INVENTORY",
    title: "Converter Form",
    showInNav: false,
  },

  {
    path: "/settting/unitmeasurement",
    component: UnitPageSummary ,
    exact: true,
    parent: "INVENTORY",
    title: "Unit Measurement",
    showInNav: true,
permissions:'u_read',
icon:<BalanceIcon />
  },
  {
    path: "/confirm",
    component: ConfirmDialog,
    exact: true,
    parent: "ACCOUNTING",
    title: "Confirm Dialog",
    showInNav: false,
  },
 
  {
    path: "/company/pay",
    component: DigitalPay,
    exact: true,
    parent: "SETTINGS",
    title: "Pay",
    showInNav: true,
  },
  {
    path: "/company/purchasepdf",
    component: Purchasepdf,
    exact: true,
    parent: "SETTINGS",
    title: "PDF",
    showInNav: false,

  },
  //Report Center


  {
    path: "/reports/purchase/report",
    component: PurchaseReportDate,
    exact: true,
    parent: "REPORTS",
    title: "Accounting Reports",
    showInNav: false,
  
  },
  {
    path: "/reports/purchase/detailreport",
    component: PurchaseDetailReportByDate,
    exact: true,
    parent: "REPORTS",
    title: "Accounting Reports",
    showInNav: false,
  
  },

  {
    path: "/reports/voidreport",
    component: Voidreport,
    exact: true,
    parent: "REPORTS",
    title: "Sales Reports",
    showInNav: false,
    //permissions:'u_read'
    icon:<AssessmentIcon/>
  },
 
  {
    path: "/reports/report",
    component: ReportPage,
    exact: true,
    parent: "REPORTS",
    title: "Report Center",
    showInNav: true,
    icon:<AssessmentIcon/>
  },
  {
    path: "/reports/posreport",
    component: POSReportCenter,
    exact: true,
    parent: "REPORTS",
    title: "POS Report",
    showInNav: true,
    icon:<AssessmentIcon/>
  },
  {
    path: "/reports/posdayend",
    component: Daybook,
    exact: true,
    parent: "REPORTS",
    title: "Daybook",
    showInNav: false,
    //icon:<AssessmentIcon/>
  },
  {
    path: "/reports/matrix",
    component: MatrixReportPOS,
    exact: true,
    parent: "REPORTS",
    title: "Matrix",
    showInNav: false,
    //icon:<AssessmentIcon/>
  }
];

export default routes;
