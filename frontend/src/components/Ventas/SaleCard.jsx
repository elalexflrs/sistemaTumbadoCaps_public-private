import React from "react";
import "./SaleCard.css";

function SaleCard({ venta }) {
  return (
    <div className="sale-card">
      {/* Línea superior divisora */}
      <div className="sale-divider"></div>

      {/* Cabecera (NoVenta como primera columna de la fila) */}
      <div className="sale-detail-row header-row">
        <span className="no-venta">{venta.NoVenta}</span>
        <span className="producto"></span>
        <span className="cantidad"></span>
        <span className="precio"></span>
        <span className="total"></span>
      </div>

      {/* Detalles de productos */}
      <div className="sale-details">
        {venta.Detalles.map((item, index) => (
          <div key={index} className="sale-detail-row">
            <span className="no-venta"></span> {/* vacío, para alinear con la columna */}
            <span className="producto">
              {item.Modelo} - {item.Marca}
            </span>
            <span className="cantidad">{item.Cantidad}</span>
            <span className="precio">{item.Precio}</span>
            
            <span className="total">{item.TotalProducto}</span>
          </div>
        ))}
      </div>

      {/* Totales */}
      <div className="sale-footer">
        <div className="totales">
          <span>Total: {venta.TotalVenta}</span>
        </div>
        <div className="totales">
          <span>Ganancia: {venta.GananciaVenta}</span>
        </div>
        <p className="fecha">Fecha: {new Date(venta.FechaVenta).toLocaleDateString()}</p>
      </div>

      {/* Línea inferior divisora */}
      <div className="sale-divider"></div>
    </div>
  );
}

export default SaleCard;
