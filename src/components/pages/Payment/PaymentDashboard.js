import jsonData from "./PaymentData.json";
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
const product = {};
for (let i = 0; i < jsonData.length; i++) {
  const item = jsonData[i];
  const { Amount, Card } = item;
  if (!product[Card]) {
    product[Card] = { total: 0, items: [] };
  }
  product[Card].total += Amount;
}
const productArray = Object.keys(product).map((Card) => ({
  Card,
  total: product[Card].total
}));

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const PaymentDashboard = () => {
  const data = {
    labels: productArray.map((items) => items.Card),
    datasets: [
      {
        label: "Payment Method",
        data: productArray.map((items) => items.total),
        backgroundColor: "#2596be",
        borderColor: "#2596be"
      }
    ]
  };
  return (
    <Box height={'full'}>
      <Bar data={data} />
    </Box>
  );
};
export default PaymentDashboard;
