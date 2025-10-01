// pages/Compras.jsx
import React from "react";
import ComprasTable from "../components/Compras/ComprasTable";
import "./Compras.css";

function Compras() {
  return (
    <div className="compras-page">
      <div className="compras-header">
        <h2 className="page-title">Registro de Compras</h2>
      </div>
      <ComprasTable />
    </div>
  );
}

export default Compras;
