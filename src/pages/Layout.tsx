import React, { useState } from "react";
import Nav from "../components/Nav";
import { Button } from "primereact/button";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const [abrir, setAbrir] = useState<boolean>(false);
  return (
    <>
      <Button
        icon="pi pi-bars"
        onClick={() => {
          setAbrir(true);
        }}
        rounded
        text
        raised
        severity="secondary"
        className="m-3"
      />
      <Nav abrir={abrir} setAbrir={setAbrir} />
      <Outlet />
    </>
  );
}
