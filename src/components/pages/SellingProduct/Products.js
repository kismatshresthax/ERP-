import { styled } from "@mui/material/styles";
import React from "react";
import jsonData from "./data.json";
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
import "./table.css";

const Products = () => {
  const data = jsonData.slice(0, 10);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#FAFAFA",
      fontWeight: "bold",
      color:'#10597B'
    },
    [`&.${tableCellClasses.body}`]: {}
  }));

  return (
    <>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell className="text">Id</StyledTableCell>
              <StyledTableCell className="text">Name</StyledTableCell>
              <StyledTableCell className="text">Quantity</StyledTableCell>
              <StyledTableCell className="text">Amount</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((product, index) => {
              return (
                <TableRow key={index}>
                  <TableCell className="text">{product.id}</TableCell>
                  <TableCell className="text-truncate text">
                    {product.Name}
                  </TableCell>
                  <TableCell className="text">{product.Quantity}</TableCell>
                  <TableCell className="text">{product.Amount}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Products;
