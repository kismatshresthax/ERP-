 import React, {useEffect, useState} from 'react';
 import { styled } from "@mui/material/styles";
// import {Card, Row, Table, OverlayTrigger, Tooltip} from 'react-bootstrap';
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
import { BsFilter } from "react-icons/bs";
const data_p=[{
    id:"10",
    "Name": "Wine - Bourgogne 2002, La",
    "Quantity": 70,
    "Date": "3/2/2023",
    "Amount": 122
  },
  {
    "id": 11,
    "Name": "Vegetable - Base",
    "Quantity": 42,
    "Date": "10/19/2022",
    "Amount": 680
  },
  {
    "id": 12,
    "Name": "Bread - Pita, Mini",
    "Quantity": 65,
    "Date": "3/11/2023",
    "Amount": 993
  },
  {
    "id": 13,
    "Name": "Mousse - Banana Chocolate",
    "Quantity": 36,
    "Date": "1/28/2023",
    "Amount": 847
  },
  {
    "id": 14,
    "Name": "Veal - Leg, Provimi - 50 Lb Max",
    "Quantity": 67,
    "Date": "2/6/2023",
    "Amount": 970
  },
  {
    "id": 15,
    "Name": "Apple - Fuji",
    "Quantity": 79,
    "Date": "7/21/2022",
    "Amount": 778
  },
  {
    "id": 16,
    "Name": "Lid Tray - 12in Dome",
    "Quantity": 8,
    "Date": "10/7/2022",
    "Amount": 808
  },
  {
    "id": 17,
    "Name": "Ham - Black Forest",
    "Quantity": 2,
    "Date": "2/13/2023",
    "Amount": 815
  },
  {
    "id": 18,
    "Name": "Maple Syrup",
    "Quantity": 66,
    "Date": "7/5/2023",
    "Amount": 650
  },
  {
    "id": 19,
    "Name": "Bay Leaf Ground",
    "Quantity": 76,
    "Date": "4/20/2023",
    "Amount": 962
  },
  {
    "id": 20,
    "Name": "Bread - Pullman, Sliced",
    "Quantity": 5,
    "Date": "4/2/2023",
    "Amount": 264
  },
  {
    "id": 21,
    "Name": "Creme De Menthe Green",
    "Quantity": 28,
    "Date": "8/24/2022",
    "Amount": 173
  },
  {
    "id": 22,
    "Name": "Beans - Navy, Dry",
    "Quantity": 86,
    "Date": "7/25/2023",
    "Amount": 313
  },
  {
    "id": 23,
    "Name": "Ice - Clear, 300 Lb For Carving",
    "Quantity": 91,
    "Date": "11/17/2022",
    "Amount": 849
  },
  {
    "id": 24,
    "Name": "Juice - Clam, 46 Oz",
    "Quantity": 11,
    "Date": "11/11/2022",
    "Amount": 362
  },
  {
    "id": 25,
    "Name": "Papadam",
    "Quantity": 84,
    "Date": "3/19/2023",
    "Amount": 127
  
}]







 const TopSellingProduct = (props) => {
   
  
    const [data, setData] = useState(data_p||[]);
    const [filter, setFilter] = useState("");
  
    const currentDate = new Date();
  
    const Products = () => {
        const data = data.slice(0, 10);
      
        const StyledTableCell = styled(TableCell)(({ theme }) => ({
          [`&.${tableCellClasses.head}`]: {
            backgroundColor: "#F3F6F9",
            fontSize: 15,
            fontWeight: "bold"
          }
        }));
        return (
          <>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Id</StyledTableCell>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell>Quantity</StyledTableCell>
                    <StyledTableCell>Amount</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((product, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>{product.id}</TableCell>
                        <TableCell className="text-truncate">
                          {product.Name}
                        </TableCell>
                        <TableCell>{product.Quantity}</TableCell>
                        <TableCell>{product.Amount}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
  
    if (filter === "week") {
      const oneWeekAgo = new Date(currentDate);
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 6);
  
      const filteredData = data.filter((item) => {
        const itemDate = new Date(item.Date);
        return itemDate >= oneWeekAgo && itemDate <= currentDate;
      });
      setData(filteredData);
    }

    const weekHandler = (e) => {
      e.preventDefault();
      setFilter("week");
    };
  
   
     
   


 
    return (
        <div className="d-flex flex-column w-100">
        <span className="d-flex flex-row justify-content-between align-items-center">
          <span className="d-flex flex-column " style={{ color: "#1D3557" }}>
            <h3>Top Selling Product</h3>
            <span
              className="d-flex flex-row gap-1 "
              style={{ color: "#457B9D", marginTop: "-.25rem" }}
            >
              <p>Total Product:</p>
              <p>{data.length}</p>
            </span>
          </span>
  
          <span className="dropdown">
            <button
              className="btn btn-info text-light "
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <BsFilter />
            </button>
  
            <ui
              className="dropdown-menu px-2 "
              aria-labelledby="dropdownMenuButton1"
            >
              <li
                className="dropdown-item"
                style={{ cursor: "pointer" }}
                onClick={() => setFilter("day")}
              >
                Yesterday
              </li>
              <li
                className="dropdown-item"
                onClick={(e) => weekHandler(e)}
                style={{ cursor: "pointer" }}
              >
                This Week
              </li>
              <li
                className="dropdown-item"
                style={{ cursor: "pointer" }}
                onClick={() => setFilter("month")}
              >
                This Month
              </li>
            </ui>
          </span>
        </span>
  
        <Products />
      </div>
  

    )
};
export default TopSellingProduct;

