import {
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import { styled } from "@mui/material/styles";
import jsonData from "./StockData.json";
import './Stock.css'
const StockTable = () => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#F3F6F9",
      fontWeight: "bold",
      height: '20px',
      fontSize: '10px',
      '@media (min-width:600px)': {
        fontSize: '13px',
      }
    }
  }));
  const data = jsonData.slice(0, 8);

  return (
    <TableContainer components={Paper}>
      <Table size={"small"} >
        <TableHead >
          <TableRow sx={{ fontSize: '10px' }}>
            <StyledTableCell  >Product</StyledTableCell>
            <StyledTableCell >Quanity-In</StyledTableCell>
            <StyledTableCell >Quanity-Out</StyledTableCell>
            <StyledTableCell >Stock</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((product,idx) => {
            return (
              <TableRow   key={idx} className="align-self-center my-auto">
                <StyledTableCell >{product.stock}</StyledTableCell>
                <StyledTableCell >{product.quantity}</StyledTableCell>
                <StyledTableCell >{product.quantityout}</StyledTableCell>
                <StyledTableCell >
                  {product.quantity - product.quantityout >= 0 ? (
                    product.quantity - product.quantityout
                  ) : (
                    <button
                      className={
                        " py-1 bg-danger  px-2 py-1 fw-bold rounded-2 shadow-lg text-white border-0 my-auto  "
                      } style={{fontSize:'10px', '@media (min-width:600px)': {
                        fontSize: '13px',
                      }}}
                    >Out of Stock</button>
                  )}
                </StyledTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default StockTable;
