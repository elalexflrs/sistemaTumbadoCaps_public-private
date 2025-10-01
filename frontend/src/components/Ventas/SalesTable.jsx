import React, { useEffect, useState } from "react";
import { getVentas } from "../../services/api";
import SaleCard from "./SaleCard";
import "./SalesTable.css";

function SalesTable() {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    const fetchVentas = async () => {
      const data = await getVentas();
      setVentas(data);
    };
    fetchVentas();
  });

  return (
    <div className="sales-table">
      {/* Encabezado fijo con los títulos */}

      {/* Ventas */}
      <div className="sales-body">
        {ventas.map((venta) => (
          <SaleCard key={venta.NoVenta} venta={venta} />
        ))}
      </div>
    </div>
  );
}

export default SalesTable;
