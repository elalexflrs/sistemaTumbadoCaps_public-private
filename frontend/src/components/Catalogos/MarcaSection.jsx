// components/catalogos/MarcaSection.jsx
import React, { useState } from "react";
import { useMarcas} from "../../hooks/useMarcas";

function MarcaSection() {
  const { data: marcas, isLoading } = useMarcas();

  return (
    <div className="catalog-section catalog-all">
      <div className="section-header">
        <div className="header-top">
          <h3>Marcas</h3>
        </div>
      </div>

      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <ul className="list">
          {marcas?.map((m) => (
            <li key={m.idMarca} className="list-item">
              <span>{m.marca}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MarcaSection;
