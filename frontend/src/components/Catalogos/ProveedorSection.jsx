// components/catalogos/ProveedorSection.jsx
import React, { useState } from "react";
import { useProveedores } from "../../hooks/useProveedores";

function ProveedorSection() {
  const { data: proveedores, isLoading } = useProveedores();

  return (
    <div className="catalog-section catalog-all">
      <div className="section-header">
        <div className="header-top">
          <h3>Proveedores</h3>
        </div>
      </div>

      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <ul className="list">
          {proveedores?.map((p) => (
            <li key={p.idProveedor} className="list-item">
              <span>{p.nombre}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProveedorSection;
