import React, { useState } from "react";
import { useApartados } from "../../hooks/useApartados"; 
import "./ApartadosTable.css";
import { format } from "date-fns";
import { es } from "date-fns/locale";



function ApartadosTable() {
  const { data: apartados = [], isLoading, isError } = useApartados();


  return (
    <div className="apartados-table-wrapper">
      {isLoading ? (
        <p className="loading">Cargando apartados...</p>
      ) : isError ? (
        <p className="error">Ocurrió un error cargando los apartados</p>
      ) : apartados.length === 0 ? (
        <p className="no-data">No hay apartados registrados</p>
      ) : (
        <div className="apartados-table-container">
          <table className="apartados-table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Fecha</th>
                <th>Modelo</th>
                <th>Marca</th>
                <th>Abonado</th>
                <th>Restante</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {apartados.map((item, i) => (
                <tr key={i}>
                  <td>{item.nombreCliente}</td>
                  <td>{format(new Date(item.fecha), "dd/MM/yyyy", { locale: es })}</td>
                  <td>{item.modelo}</td>
                  <td>{item.marca}</td>
                  <td>${item.abonado}</td>
                  <td>${item.restante}</td>
                  <td>${item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ApartadosTable;
