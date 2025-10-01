// pages/Catalogos.jsx
import React from "react";
import MarcaSection from "../components/Catalogos/MarcaSection";
import ModeloSection from "../components/Catalogos/ModeloSection";
import ProveedorSection from "../components/Catalogos/ProveedorSection";
import "./Catalogos.css";

function Catalogos() {
  return (
    <div className="catalogos-page">
      <h2 className="page-title">Catálogos</h2>

      <div className="catalogos-grid">
        <MarcaSection />
        <ModeloSection />
        <ProveedorSection />
      </div>
    </div>
  );
}

export default Catalogos;
