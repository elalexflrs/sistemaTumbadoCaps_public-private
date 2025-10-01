import axios from "axios";

const API_URL = "https://sistematumbadocapsbackend.onrender.com/api";
//const API_URL = "http://localhost:3001/api";

// Obtener cosas basicas para la cache
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const getMarcas = async () => {
  const { data } = await axios.get(`${API_URL}/marcas`);
  return data;
};

export const getModelos = async (idMarca) => {
  let url = `${API_URL}/gorras`;
  if (idMarca) url += `?idMarca=${idMarca}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Error al obtener modelos");
  return res.json();
};

export const getProveedores = async () => {
  const { data } = await axios.get(`${API_URL}/proveedores`);
  return data;
};

export const getCompras = async () => {
  const { data } = await axios.get(`${API_URL}/compras`);
  return data;
};


export const getApartados = async() => {
  const estado = 'reservado';
  const { data } = await axios.get(`${API_URL}/apartados?estado=${estado}`);
  return data;
}
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


//Obtener VENTAS con filtro opcional. (HOME)
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const getVentas = async (fechaInicio, fechaFinal) => {
  const params = {};
  if (fechaInicio) params.fechaInicio = fechaInicio;
  if (fechaFinal) params.fechaFinal = fechaFinal;

  const res = await axios.get(`${API_URL}/stock&ventas/gananciasPorProducto`, { params });
  return res.data;
};
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++




//PARA OBTENER EL STOCK
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export async function getStock(idMarca = null) {
  try {
    const url = idMarca
      ? `${API_URL}/stock?idMarca=${idMarca}`
      : `${API_URL}/stock`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error al obtener el stock");
    }
    return await response.json();
  } catch (error) {
    console.error("getStock error:", error);
    throw error;
  }
};
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


