import { Card } from '@material-ui/core'
import {  CardContent } from '@mui/material'
import Purchasebar from "./Purchasebar";
import { BiLineChart, BiBarChart } from "react-icons/bi";
import { FaChartBar } from "react-icons/fa";
import { useState } from "react";
import PurchaseChart from "./PurschaseChart";

const Purchase = () => {
  const [view, setView] = useState(false);

  const viewHandler = (e) => {
    e.preventDefault();
    setView(!view);
  };

  return (
    <Card className="d-flex flex-column w-100" >
      <CardContent className="d-flex flex-row align-items-center justify-content-between">
        <h3 className="">Weekly Purchase Chart</h3>
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
        <Purchasebar />
      </div>
      <div className={view === false ? "d-none" : "d-inline"}>
        <PurchaseChart />
      </div>
    </Card>
  );
};

export default Purchase;
