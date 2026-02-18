import React, { useState } from "react";
import Nav from "../components/Nav";
import { Button } from "primereact/button";
import { Outlet, useLocation } from "react-router-dom";

export default function Layout() {
  const [abrir, setAbrir] = useState<boolean>(false);
  const location = useLocation();

  const getTitle = () => {
    switch (location.pathname) {
      case "/Layout/Agregar":
        return "Adición de Vehículos";
      case "/Layout/Listado":
        return "Listado de Vehículos";
      case "/Layout/Registro":
        return "Registro de Entrada y Salida";
      default:
        return "Adición de Vehículos";
    }
  };
  return (
    <>
      <Nav abrir={abrir} setAbrir={setAbrir} />
      <div className="flex">
        <main className="flex-1">
          <div
            className="flex align-items-center shadow-4 p-4"
            style={{
              background: "linear-gradient(135deg, #1e3c72, #2a5298)",
              backdropFilter: "blur(8px)",
            }}
          >
            <div className="flex align-items-center flex-1">
              <Button
                icon="pi pi-bars"
                onClick={() => setAbrir(true)}
                text
                className="text-white"
              />
            </div>
            <div className="flex justify-content-center flex-1">
              <h2 className="text-4xl font-bold m-0 text-white text-center">
                {getTitle()}
              </h2>
            </div>
            <div className="flex-1"></div>
          </div>
        </main>
      </div>
      <Outlet />
    </>
  );
}
