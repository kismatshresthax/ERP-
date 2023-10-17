import { Box } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";
import jsonData from "./Salesdata.json";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SalesChart = () => {
  const data = {
    labels: jsonData.map((items) => items.date),
    datasets: [
      {label:"Sales",
        data: jsonData.map((items) => items.amount),
        backgroundColor: "#be4d25",
        borderColor: "#be4d25"
      }
    ]
  };
  return (
    <Box width="auto">
      <Bar data={data} />
    </Box>
  );
};
export default SalesChart;
