import { Card, CardContent, CardMedia } from "@mui/material";
import StockTable from "./StockTable";

const Stock = () => {
  return (
    <Card className="d-flex flex-column ">
      <CardContent className="mx-auto">
        <h5>Product and Inventory Management</h5>
      </CardContent>
      <CardMedia className="">
      <StockTable />
      </CardMedia>
    </Card>
  );
};
export default Stock;
