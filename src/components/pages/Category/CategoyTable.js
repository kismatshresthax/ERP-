import jsonData from "./category.json";
import "../SellingProduct/table.css";
import { styled } from "@mui/material/styles";

import {
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  TableBody,
  Paper,
  Table,
  tableCellClasses
} from "@mui/material";
const CategoryTable = () => {
  const sortedData = jsonData
    .slice()
    .sort((a, b) => b.Quantity - a.Quantity)
    .slice(0, 10);
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#FAFAFA",
      fontWeight: "bold",
      color:'#10597B'
    }
  }));
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <StyledTableCell className="text">Category</StyledTableCell>
            <StyledTableCell className="text">Quantity</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((product, index) => {
            return (
              <TableRow key={index}>
                <TableCell className="text-truncate text">
                  {product.Category}
                </TableCell>
                <TableCell className="text">{product.Quantity}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default CategoryTable;
