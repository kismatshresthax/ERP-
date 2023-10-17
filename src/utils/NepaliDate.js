import React from "react";
import { format } from "date-fns";
var adbs = require("ad-bs-converter");
const NepaliDate = (value) => adbs.ad2bs(
        format(new Date(value), "yyyy/MM/dd")
      ).en["year"] +
        "/" +
        adbs.ad2bs(
          format(new Date(value), "yyyy/MM/dd")
        ).en["month"] +
        "/" +
        adbs.ad2bs(
          format(new Date(value), "yyyy/MM/dd")
        ).en["day"]

export default NepaliDate;