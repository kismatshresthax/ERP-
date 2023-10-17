import { Box } from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from "chart.js";
import jsonData from "./Salesdata.json";
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

// import { plugins } from "chart.js/dist/core";

const Salesbar = () => {
  const data = {
    labels: jsonData.map((items) => items.date),
    datasets: [
      {
        label:"Sales",
        data: jsonData.map((items) => items.amount),
        backgroundColor: "#be4d25",
        borderColor: "#be4d25"
      }
    ]
  };

  return (
    <Box width="auto">
      <Line data={data} />
    </Box>
  );
};

export default Salesbar;
