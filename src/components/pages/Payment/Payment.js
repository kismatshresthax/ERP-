import { Card, CardContent, Grid } from "@mui/material";
import { BsFilter } from "react-icons/bs";
import PaymentDashboard from "./PaymentDashboard";
import PaymentMethodCard from "./PaymentMethodCard";
import PaymentTable from "./PaymentTable";
import { AiFillCloseCircle } from "react-icons/ai";
import { useState } from "react";
// import DateRange from "./Daterangs";
import DatePickers from "../../controls/DatePicker"

const Payment = () => {
  const [value, setValue] = useState(null);

  return (
    <>
      <Card className="d-flex flex-column gap-2 w-100">
        <CardContent className="d-flex flex-row justify-content-between align-items-center">
          <span className="d-fkex flex-column  mx-auto justify-content-center">
            <h3 className="mx-auto">Payment Dashoard</h3>
            <p className="ms-1'" style={{ marginTop: "-10px" }}>
              Insight on payment activities
            </p>
          </span>
          <div className="dropdown">
            <button
              className="bg-info text-white border-0 rounded fs-4"
              type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"
              style={{ cursor: "pointer" }}
            >
              <BsFilter />
            </button>
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
              <hr />
              <button
                className="border-0 bg-transparent mb-2 d-flex ms-2"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Custom Date
              </button>
            </ui>
          </div>
        </CardContent>

        <div className="d-flex flex-column gap-2 mb-2">
          <Grid container rowSpacing={1} spacing={2}>
            <Grid item xs={12} sm={6} md={6}>
              <PaymentDashboard />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <PaymentTable />
            </Grid>
          </Grid>
        </div>
      </Card>

      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog ">
          <div className="modal-content ">
            <div className="modal-head d-flex flex-row justify-content-between px-3 py-2 align-middle">
              <h5 className="my-auto">Date</h5>
              <button
                className="border-0 bg-white text-dark fs-4 "
                data-bs-dismiss="modal"
              >
                <AiFillCloseCircle className="rounded-circle" />
              </button>
            </div>
            <div className="modal-body">
              <DatePickers />
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-info text-white fw-semibold"
                data-bs-dismiss="modal"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Payment;
