import React from "react";

const Spinner = (props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div className="spinner-border" role="status"></div>
      <div className="">{props.msg || "Loading..."}</div>
    </div>
  );
};

export default Spinner;
