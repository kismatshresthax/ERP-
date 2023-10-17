
import { Card } from '@material-ui/core'
import { Box, CardContent } from '@mui/material'
import React, { useState } from 'react'
import jsonData from "./category.json";
import { AiOutlinePieChart } from "react-icons/ai";
import { BsTable } from "react-icons/bs";
import CategoryTable from "./CategoyTable";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import "./chart.css"
ChartJS.register(ArcElement, Tooltip, Legend);

const Category = () => {
  const [pie, setPie] = useState(false);
  const pieHandler = (e) => {
    e.preventDefault();
    setPie(true);
  };
  const tableHandler = (e) => {
    e.preventDefault();
    setPie(false);
  };
  const data = [
        {
          id: "haskell",
          label: "haskell",
          value: 36,
          color: "#ad7aa8	"
        },
        {
          id: "python",
          label: "python",
          value: 161,
          color: "#ad7aa8"
        },
        {
          id: "java",
          label: "java",
          value: 485,
          color: "#178300	"
        },
        {
          id: "c",
          label: "c",
          value: 457,
          color: "#78bf90"
        },
        {
          id: "go",
          label: "go",
          value: 56,
          color: "#12b096	"
        }
      ];
      const datasets = {
        labels: data.map(items=>items.label),
        datasets: [
          {
            label: 'Data Collection',
            data: data.map((items)=>items.value),
            backgroundColor: data.map(items=>items.color),
            borderColor: data.map((items)=>items.color),
            borderWidth: 1,
          },
        ],
      };
  return (
    <Card >
      <CardContent sx={{ display: 'flex', justifyContent: "space-between" }}>
        <span className="d-flex flex-column  ">
          <h3 style={{ color: "#1D3557" }}>Top Category</h3>
          <span
            className="d-flex flex-row gap-2"
            style={{ color: "#457B9D", marginTop: "-.25rem" }}
          >
            <p>Total Category:</p>
            <p>{jsonData.length}</p>
          </span>
        </span>

        <span
          className="d-flex flex-row gap-2 fs-3 pe-auto my-auto"
          style={{ cursor: "pointer" }}

        >
          <AiOutlinePieChart
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="Pie Chart"
            onClick={(e) => pieHandler(e)}
            className={pie === true ? "text-info" : "text-info opacity-50"}
          style={{ cursor: "pointer" }}

          />

          <BsTable
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="Table"
            onClick={(e) => tableHandler(e)}
            className={pie === false ? "text-info" : "text-info opacity-50"}
          style={{ cursor: "pointer" }}

          />
        </span>
      </CardContent>
      <Box className={pie === true ? "d-none" : "d-inline "}>
        <CategoryTable />
      </Box>

      <Box
        backgroundColor="#ffff"
        className={pie === false ? "d-none" : "d-flex chart-container"}
        
      >
        
           <Pie className='d-block' style={{height:'200px'}}  data={datasets}/>
  
      </Box>

    </Card>
  )
}

export default Category