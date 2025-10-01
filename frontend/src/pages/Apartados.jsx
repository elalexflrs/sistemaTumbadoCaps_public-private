// pages/Apartados.jsx
import React from "react";
import ApartadosTable from "../components/Apartados/ApartadosTable";
import "./Apartados.css";

function Apartados() {
  return (
    <div className="apartados-page">
      <div className="apartados-header">
        <h2 className="page-title">Registro de Apartados</h2>
      </div>
      <ApartadosTable />
    </div>
  );
}

export default Apartados;
