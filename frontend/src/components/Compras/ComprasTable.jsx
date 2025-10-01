// components/Compras/ComprasTable.jsx
import React from "react";
import { useCompras } from "../../hooks/useCompras"; 
import "./ComprasTable.css";
import { format } from "date-fns";
import { es } from "date-fns/locale";

function ComprasTable() {
  const { data: compras = [], isLoading, isError } = useCompras();

  return (
    <div className="compras-table-wrapper">
      {isLoading ? (
        <p className="loading">Cargando compras...</p>
      ) : isError ? (
        <p className="error">Ocurrió un error cargando las compras</p>
      ) : compras.length === 0 ? (
        <p className="no-data">No hay compras registradas</p>
      ) : (
        <div className="compras-table-container">
          <table className="compras-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Modelo</th>
                <th>Marca</th>
                <th>Proveedor</th>
                <th>Stock Lote</th>
                <th>Cantidad Inicial</th>
                <th>Costo Compra</th>
                <th>Costo Sugerido Venta</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {compras.map((item, i) => {
                const total = item.cantidadInicial * item.costoUnitarioCompra;
                return (
                  <tr key={i}>
                    <td>{format(new Date(item.fechaCompra), "dd/MM/yyyy", { locale: es })}</td>
                    <td>{item.modelo}</td>
                    <td>{item.marca}</td>
                    <td>{item.proveedor}</td>
                    <td>{item.stockLote}</td>
                    <td>{item.cantidadInicial}</td>
                    <td>${item.costoUnitarioCompra}</td>
                    <td>${item.costoUnitarioSugeridoVenta}</td>
                    <td>${total}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ComprasTable;
