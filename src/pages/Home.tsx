import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

export default function Home() {
  const footer = (
    <>
      <Button label="Save" icon="pi pi-check" />
      <Button
        label="Cancel"
        severity="secondary"
        icon="pi pi-times"
        style={{ marginLeft: "0.5em" }}
      />
    </>
  );
  return (
    <>
      <h1>Sistema de Registro de Vehiculos</h1>
      <div className="card flex justify-content-center">
        <Card
          title="Agregar Vehiculo"
          footer={footer}
          header={
            <img
              alt="Card"
              src="https://static.thenounproject.com/png/621382-200.png"
            />
          }
          className="md:w-25rem"
        >
          <p className="m-0">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
            sed consequuntur error repudiandae numquam deserunt quisquam
            repellat libero asperiores earum nam nobis, culpa ratione quam
            perferendis esse, cupiditate neque quas!
          </p>
        </Card>
      </div>
    </>
  );
}
