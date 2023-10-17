import React from "react";
import "../accounting/ReportingPage.css";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

import { Link } from "react-router-dom";
import  Typography from "@mui/material/Typography";
export default function SalesReports() {
  return (
    <div
      className="content-wrapper iframe-mode"
      data-widget="iframe"
      data-loading-screen={750}
    >
      <div className="container">
        <div className="cardBox">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <Link
              to="/sales/report"
              style={{ textDecoration: "none" }}
            >
              <div
                className="card"
                style={{ textAlign: "center", padding: "10px" }}
              >
                <div className="Iconbox">
                  <ReceiptLongIcon style={{ fontSize: "80px" }} />
                </div>
                <div>
                  <Typography style={{ color: "black", fontSize: "15px" }}>
                    Sales Report
                  </Typography>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <Link
              to="/sales/materializedreport"
              style={{ textDecoration: "none" }}
            >
              <div
                className="card"
                style={{ textAlign: "center", padding: "10px" }}
              >
                <div className="Iconbox">
                  <WysiwygIcon style={{ fontSize: "80px" }} />
                </div>
                <div>
                  <Typography style={{ color: "black", fontSize: "15px" }}>
                  Materialized Report
                  </Typography>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <Link
              to="/reports/voidreport"
              style={{ textDecoration: "none" }}
            >
              <div
                className="card"
                style={{ textAlign: "center", padding: "10px" }}
              >
                <div className="Iconbox">
                  <AccountBalanceWalletIcon style={{ fontSize: "80px" }} />
                </div>
                <div>
                  <Typography style={{ color: "black", fontSize: "15px" }}>
                  Void Report
                  </Typography>
                </div>
              </div>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
