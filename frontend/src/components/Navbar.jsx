import React, { useState } from "react";
import "./Navbar.css";
import logo from "../images/tumbado_logo.png";
import { Link } from 'react-router-dom';

function Navbar() {


  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo-box">
          <img src={logo} alt="Mi Logo" className="logo-img" />
        </div>
        <nav className="navbar-links">
          <Link to='/'>Ventas</Link>
          <Link to='/stock'>Stock</Link>
          <Link to='/catalogos'>Catalogos</Link>
          <Link to='/compras'>Compras</Link>
          <Link to='/apartados'>Apartados</Link>
        </nav>
      </div>
    </nav>
  );
}

export default Navbar;
