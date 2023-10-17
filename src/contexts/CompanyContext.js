import { createContext } from "react";

const CompanyContext = createContext({
  companies: "",
  company:"",
  fiscal:"",
  setCompany: () => {}
});

export default CompanyContext;
