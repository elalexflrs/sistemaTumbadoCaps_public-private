import React from "react";
import StockTable from "../components/Stock/StockTable";
import "./Stock.css";

function Stock() {
  return (
    <div className="stock-page">
      <h2 className="page-title">Inventario de Stock</h2>
      <StockTable />
    </div>
  );
}

export default Stock;
