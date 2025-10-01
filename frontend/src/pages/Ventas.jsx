import React, { useState } from "react";
import DateFilter from "../components/Ventas/DateFilter";
import SalesTable from "../components/Ventas/SalesTable"; // ⬅️ Importamos el nuevo componente
import "./Ventas.css";

function Ventas() {
  const [filterDates, setFilterDates] = useState({ startDate: "", endDate: "" });

  const handleFilter = (dates) => {
    setFilterDates(dates);
  };

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
