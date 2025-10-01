// components/catalogos/ModeloSection.jsx
import React, { useState } from "react";
import { useModelos } from "../../hooks/useModelos";
import { useMarcas } from "../../hooks/useMarcas";

function ModeloSection() {
  const { data: modelos, isLoading } = useModelos();
  const { data: marcas } = useMarcas();

  const [filtroMarca, setFiltroMarca] = useState("");

  const modelosFiltrados = filtroMarca
    ? modelos?.filter((m) => m.idMarca === parseInt(filtroMarca))
    : modelos;

  return (
    <div className="catalog-section catalog-all">
      <div className="section-header">
        <div className="header-top">
          <h3>Modelos</h3>
          <select value={filtroMarca} onChange={(e) => setFiltroMarca(e.target.value)}>
            <option value="">Todas las marcas</option>
            {marcas?.map((m) => (
              <option key={m.idMarca} value={m.idMarca}>
                {m.marca}
              </option>
            ))}
          </select>
        </div>
      </div>


      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <ul className="list">
          {modelosFiltrados?.map((m) => (
            <li key={m.idModelo} className="list-item">
              <span>
                {m.modelo} — <span className="marca">{m.marca}</span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ModeloSection;
