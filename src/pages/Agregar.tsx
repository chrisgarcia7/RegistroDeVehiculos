import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import React, { useRef, useState } from "react";

export default function Agregar() {
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [placa, setPlaca] = useState("");
  const toast = useRef<Toast>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      let res;

      res = await fetch(`${process.env.REACT_APP_API_URL}/vehiculo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ marca, modelo, placa }),
      });
      console.log(res);

      if (res.ok) {
        toast.current?.show({
          severity: "success",
          summary: "Registrado Correctamente",
          detail: "Su vehículo ha sido registrado correctamente",
          life: 3000,
        });
        setMarca("");
        setModelo("");
        setPlaca("");
      } else {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Ha ocurrido un error al registrar su vehículo",
          life: 3000,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="flex justify-content-center mt-5">
        <Card title="Registro de Vehículo" className="w-25rem">
          <div className="field mb-3">
            <label className="block mb-2">Marca</label>
            <InputText
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
              placeholder="Ej: Toyota"
              className="w-full"
            />
          </div>

          <div className="field mb-3">
            <label className="block mb-2">Modelo</label>
            <InputText
              value={modelo}
              onChange={(e) => setModelo(e.target.value)}
              placeholder="Ej: Corolla"
              className="w-full"
            />
          </div>

          <div className="field mb-4">
            <label className="block mb-2">Placa</label>
            <InputText
              value={placa}
              onChange={(e) => setPlaca(e.target.value)}
              placeholder="Ej: ABC-1234"
              className="w-full"
            />
          </div>

          {/* Botón de Envío */}
          <Button
            label="Registrar"
            icon="pi pi-check"
            className="w-full"
            disabled={!marca || !modelo || !placa ? true : false}
            onClick={handleSubmit}
          />
        </Card>
      </div>
      <Toast ref={toast} />
    </>
  );
}
