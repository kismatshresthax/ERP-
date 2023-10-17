import jsonData from "./data.json";
import Products from "./Products";
import { BsFilter } from "react-icons/bs";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@mui/material";

const TopProduct = () => {
  return (
    <Card className="d-flex flex-column w-100" sx={{ minWidth: 345 }}>
      <CardContent className="d-flex flex-row justify-content-between align-items-center">
        <span className="d-flex flex-column " style={{ color: "#1D3557" }}>
          <h3>Top Selling Product</h3>
          <span
            className="d-flex flex-row gap-1 "
            style={{ color: "#457B9D", marginTop: "-.25rem" }}
          >
            <p>Total Product:</p>
            <p>{jsonData.length}</p>
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
          {/* <DateRangePicker
          ranges = {{selectionRange}}
          onChange ={handleDate}/> */}
          <ui
            className="dropdown-menu px-2 "
            aria-labelledby="dropdownMenuButton1"
          >
            <li className="dropdown-item" style={{ cursor: "pointer" }}>
              Yesterday
            </li>
            <li className="dropdown-item" style={{ cursor: "pointer" }}>
              This Week
            </li>
            <li className="dropdown-item" style={{ cursor: "pointer" }}>
              This Month
            </li>
          </ui>
        </span>
      </CardContent>

      <Products />
    </Card>
  );
};
export default TopProduct;
