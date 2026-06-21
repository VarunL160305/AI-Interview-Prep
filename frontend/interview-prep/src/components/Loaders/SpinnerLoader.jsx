import React from "react";

const SpinnerLoader = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      role="status"
    >
      <div
        className="spinner-border"
        style={{
          width: "1.5rem",
          height: "1.5rem",
          color: "#f7f0eb",
          marginRight:"10px"
        }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default SpinnerLoader;