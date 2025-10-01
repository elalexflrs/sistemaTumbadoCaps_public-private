// components/StockTable.jsx
import React, { useState } from "react";
import { useStock } from "../../hooks/useStock"; // usa el hook
import BrandFilter from "./BrandFilter";
import "./StockTable.css";

function StockTable() {
  const [selectedBrand, setSelectedBrand] = useState(null);

  const { data: stock = [], isLoading, isError } = useStock(selectedBrand);

  const handleFilter = (filter) => {
    setSelectedBrand(filter.marca || null);
  };

  return (
    <div className="stock-table-wrapper">
      <BrandFilter onFilter={handleFilter} />

      {isLoading ? (
        <p className="loading">Cargando stock...</p>
      ) : isError ? (
        <p className="error">Ocurrió un error cargando el stock</p>
      ) : stock.length === 0 ? (
        <p className="no-data">No hay datos disponibles</p>
      ) : (
        <div className="stock-table-container">
          <table className="stock-table">
            <thead>
              <tr>
                <th>Modelo</th>
                <th>Marca</th>
                <th>Stock</th>
                <th>Cantidad Acumulada</th>
                <th>Precio Venta</th>
              </tr>
            </thead>
            <tbody>
              {stock.map((item, i) => (
                <tr key={i}>
                  <td>{item.Modelo}</td>
                  <td>{item.Marca}</td>
                  <td>{item.stockDisponible}</td>
                  <td>{item.Stock_Acumulado}</td>
                  <td>${item.Precio_Venta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default StockTable;
