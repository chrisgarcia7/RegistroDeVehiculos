import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Carousel } from "primereact/carousel";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div
        className="p-5 shadow-4 flex align-items-center gap-4"
        style={{
          background: "linear-gradient(135deg, #1e3c72, #2a5298)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div className="bg-white bg-opacity-20 border-circle p-3 flex align-items-center justify-content-center">
          <i className="pi pi-car text-black text-3xl"></i>
        </div>

        <div>
          <h1 className="text-4xl font-bold m-0 text-white">
            Registro Vehicular
          </h1>
          <span className="text-200 text-lg text-white">
            Sistema de gestión y control vehicular
          </span>
        </div>
      </div>

      <Carousel
        value={[
          {
            src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
            alt: "Vehículo 1",
          },
          {
            src: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8",
            alt: "Vehículo 2",
          },
          {
            src: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c",
            alt: "Vehículo 3",
          },
        ]}
        itemTemplate={(item: any) => {
          return (
            <div className="flex justify-content-center">
              <img
                src={item.src}
                alt="vehiculo"
                style={{
                  width: "100%",
                  height: "500px",
                  objectFit: "cover",
                }}
              />
            </div>
          );
        }}
        numVisible={1}
        numScroll={1}
        circular
        autoplayInterval={3000}
        showIndicators={false}
        showNavigators={false}
        className="w-full"
      />

      <div className="mt-7 flex justify-content-center">
        <div className="grid">
          <div className="col-12 md:col-6 lg:col-4">
            <Card
              title="Agregar Vehículo"
              footer={
                <Link
                  to="/Layout/Agregar"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="flex flex-column justify-content-between h-full">
                    <Button label="Agregar" icon="pi pi-plus" />
                  </div>
                </Link>
              }
              header={
                <img
                  alt="Card"
                  src="https://static.thenounproject.com/png/621382-200.png"
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "contain",
                  }}
                />
              }
              className="h-full shadow-2"
              style={{ minHeight: "420px" }}
            >
              <div className="flex flex-column justify-content-between h-full">
                <p>Agrega un nuevo vehículo a la lista</p>
              </div>
            </Card>
          </div>
          <div className="col-12 md:col-6 lg:col-4">
            <Card
              title="Lista de Vehículos"
              footer={
                <Link
                  to="/Layout/Listado"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="flex flex-column justify-content-between h-full">
                    <Button label="Ver listado" icon="pi pi-list" />
                  </div>
                </Link>
              }
              header={
                <img
                  alt="Lista"
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "contain",
                  }}
                  src="https://img.freepik.com/vector-premium/icono-mantenimiento-automoviles-icono-vector-lista-servicio-coche-mantenimiento-vehiculos-diseno-informes_820464-26.jpg"
                />
              }
              className="h-full shadow-2"
              style={{ minHeight: "420px" }}
            >
              <div className="flex flex-column justify-content-between h-full">
                <p>Ver el listado de vehículos registrados</p>
              </div>
            </Card>
          </div>
          <div className="col-12 md:col-6 lg:col-4">
            <Card
              title="Registro de Entrada y Salida de Vehículos"
              className="h-full shadow-2"
              style={{ minHeight: "420px" }}
              footer={
                <Link
                  to="/Layout/Registro"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="flex flex-column justify-content-between h-full">
                    <Button label="Ver registro" icon="pi pi-sign-in" />
                  </div>
                </Link>
              }
              header={
                <img
                  alt="Card"
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "contain",
                  }}
                  src="https://static.vecteezy.com/system/resources/previews/007/126/764/non_2x/enter-and-exit-icon-vector.jpg"
                />
              }
            >
              <div className="flex flex-column justify-content-between h-full">
                <p>Ver registro de entrada y salida de vehículos</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
