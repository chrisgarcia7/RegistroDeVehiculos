import React, { useState } from "react";
import Nav from "../components/Nav";
import { Button } from "primereact/button";

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
      />
      <h1>{abrir ? <b>es verdadero</b> : <b>es falso</b>}</h1>
      <Nav abrir={abrir} setAbrir={setAbrir} />
    </>
  );
}
