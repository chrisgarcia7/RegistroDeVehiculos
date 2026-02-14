import React, { useState } from "react";
import Nav from "../components/Nav";
import { Button } from "primereact/button";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const [abrir, setAbrir] = useState<boolean>(false);
  return (
    <>
      <div className="flex">
        {/* Sidebar */}
        <Nav abrir={abrir} setAbrir={setAbrir} />

        {/* Contenedor principal */}
        <main className="flex-1 relative">
          {/* Botón encima del contenido */}
          <Button
            icon="pi pi-bars"
            onClick={() => setAbrir(true)}
            rounded
            text
            raised
            severity="secondary"
            style={{
              position: "absolute",
              top: "20px", // Ajusta la distancia desde arriba
              right: "20px", // Ajusta la distancia desde la derecha
              zIndex: 1000, // Asegura que esté por encima del Outlet
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }} // z muy alto
          />

          <Outlet />
        </main>
      </div>
    </>
  );
}
