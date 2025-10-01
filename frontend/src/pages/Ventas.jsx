import React, { useState } from "react";
import SalesTable from "../components/Ventas/SalesTable"; // ⬅️ Importamos el nuevo componente
import "./Ventas.css";

function Ventas() {
  return (
    <div className="ventas-page">
      <DateFilter onFilter={handleFilter} />
      <div className="sales-header">
        <span>N° venta</span>
        <span>Producto</span>
        <span>Cantidad</span>
        <span>Precio</span>
        <span>Total</span>
      </div>
      <SalesTable filterDates={filterDates} className='scroll'/>
    </div>
  );
}

export default Ventas;
