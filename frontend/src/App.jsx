import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css"
import Navbar from "./components/Navbar";
import Ventas from "./pages/Ventas.jsx";
import Stock from "./pages/Stock";
import Catalogos from "./pages/Catalogos";
import Compras from "./pages/Compras";
import Apartados from "./pages/Apartados.jsx";


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route index element={<Ventas />} />
          <Route path='/' element={<Ventas />} />
          <Route path='/stock' element={<Stock />} />
          <Route path='/catalogos' element={<Catalogos />} />
          <Route path='/compras' element={<Compras />} />
          <Route path='/apartados' element={<Apartados />} />
        </Routes>
      </Router>
    </>

  );
}

export default App;
