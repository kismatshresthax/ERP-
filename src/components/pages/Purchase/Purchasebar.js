import { Box } from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title
} from "chart.js";
import jsonData from "./Purchasedata.json";
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement,  Title  );

const Purchasebar = () => {
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
    <Box width="auto ">
      <Line data={data} />
    </Box>
  );
};

export default Purchasebar;
