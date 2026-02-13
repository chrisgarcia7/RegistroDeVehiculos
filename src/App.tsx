import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Agregar from "./pages/Agregar";
import Listado from "./pages/Listado";
import Registro from "./pages/Registro";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Layout" element={<Layout />} />
        <Route path="/Agregar" element={<Agregar />} />
        <Route path="/Listado" element={<Listado />} />
        <Route path="/Registro" element={<Registro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
