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
import jsonData from "./Purchasedata.json";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PurchaseChart = () => {
  const data = {
    labels: jsonData.map((items) => items.date),
    datasets: [
      {label: "Purchase",
        data: jsonData.map((items) => items.amount),
        backgroundColor: "#2596be",
        borderColor: "#2596be"
      }
    ]
  };
  return (
    <Box width="auto">
      <Bar data={data} />
    </Box>
  );
};
export default PurchaseChart;
