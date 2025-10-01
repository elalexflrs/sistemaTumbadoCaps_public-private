import React, { useState } from "react";
import "./BrandFilter.css";
import { useMarcas } from "../../hooks/useMarcas";

function BrandFilter({ onFilter }) {
  const [selectedMarca, setSelectedMarca] = useState("");
  const { data: marcas, isLoading, isError } = useMarcas();

  const handleFilter = () => {
    if (onFilter) {
      onFilter({ marca: selectedMarca });
    }
  };

  return (
    <div className="brand-filter">
      <label>
        Marca:
        {isLoading ? (
          <span>Cargando...</span>
        ) : isError ? (
          <span>Error al cargar</span>
        ) : (
          <select
            value={selectedMarca}
            onChange={(e) => setSelectedMarca(e.target.value)}
          >
            <option value="">Todas</option>
            {marcas?.map((m) => (
              <option key={m.idMarca} value={m.idMarca}>
                {m.marca}
              </option>
            ))}
          </select>
        )}
      </label>
      <button onClick={handleFilter}>Aplicar filtro</button>
    </div>
  );
}

export default BrandFilter;
