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
import jsonData from "./PaymentData.json";
const PaymentTable = () => {
  const data = jsonData.slice(0, 10);
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#FAFAFA",
      fontWeight: "bold",
      color: "#10597B"
    }
  }));
  return (
    <TableContainer component={Paper} >
      <Table size="small" >
        <TableHead>
          <TableRow>
            <StyledTableCell className="text">Transfer Method</StyledTableCell>
            <StyledTableCell className="text">Amount</StyledTableCell>
            <StyledTableCell className="text">Date</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((payment, index) => {
            return (
              <TableRow key={index}>
                <TableCell className="text-truncate text">
                  {payment.Card}
                </TableCell>
                <TableCell className="text">{payment.Amount}</TableCell>
                <TableCell className="text">{payment.Date}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default PaymentTable;
