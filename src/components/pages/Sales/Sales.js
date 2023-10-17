import { Card } from '@material-ui/core'
import {CardContent } from '@mui/material'
import Salesbar from "./SalesBar";
import { BiLineChart, BiBarChart } from "react-icons/bi";
import { useState } from "react";
import SalesChart from "./SalesChart";

const Sales = () => {
  const [view, setView] = useState(false);

  const viewHandler = (e) => {
    e.preventDefault();
    setView(!view);
  };
  return (
    <Card className="d-flex flex-column w-100" sx={{ minWidth: 345 }}>
      <CardContent className="d-flex flex-row justify-content-between">
        <h3 className="">Weekly Sales Chart</h3>
        <div className="flex gap-3" style={{ cursor: "pointer" }}>
          <BiLineChart
            onClick={(e) => viewHandler(e)}
            className={
              view === false ? "text-info fs-3" : "text-info fs-3 opacity-50"
            }
          />
          <BiBarChart
            onClick={(e) => viewHandler(e)}
            className={
              view === true ? "text-info fs-3" : "text-info fs-3 opacity-50"
            }
          />
        </div>
      </CardContent>

      <div className={view === true ? "d-none" : "d-inline"}>
        <Salesbar />
      </div>
      <div className={view === false ? "d-none" : "d-inline"}>
        <SalesChart />
      </div>
    </Card>
  );
};

export default Sales;
